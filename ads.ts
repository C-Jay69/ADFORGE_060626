import { Hono } from "hono";
import { db } from "../database";
import * as schema from "../database/schema";
import { eq } from "drizzle-orm";
import { requireAuth } from "../middleware/auth";

export const ads = new Hono()
  .get("/", requireAuth, async (c) => {
    const user = c.get("user")!;
    const rows = await db
      .select({ ad: schema.ads })
      .from(schema.ads)
      .innerJoin(schema.campaigns, eq(schema.ads.campaignId, schema.campaigns.id))
      .innerJoin(schema.projects, eq(schema.campaigns.projectId, schema.projects.id))
      .where(eq(schema.projects.userId, user.id));
    return c.json({ ads: rows.map((r) => r.ad) }, 200);
  })
  .post("/", requireAuth, async (c) => {
    const user = c.get("user")!;
    const { campaignId, scriptId, actorId, format, hasSubtitles, hasBRoll, hasMusic, language } = await c.req.json();

    // Check user's minute limit
    const [dbUser] = await db.select().from(schema.users).where(eq(schema.users.id, user.id));
    if (dbUser && dbUser.minutesUsed >= dbUser.minutesLimit) {
      return c.json({ error: "Minute limit reached. Please upgrade your plan." }, 403);
    }

    const [ad] = await db.insert(schema.ads).values({
      campaignId, scriptId, actorId,
      format: format ?? "VERTICAL",
      hasSubtitles: hasSubtitles ?? false,
      hasBRoll: hasBRoll ?? false,
      hasMusic: hasMusic ?? false,
      language: language ?? "en",
      status: "QUEUED",
    }).returning();

    return c.json({ ad }, 201);
  })
  .get("/:id", requireAuth, async (c) => {
    const [ad] = await db.select().from(schema.ads).where(eq(schema.ads.id, c.req.param("id")));
    if (!ad) return c.json({ message: "Not found" }, 404);
    const [script] = await db.select().from(schema.scripts).where(eq(schema.scripts.id, ad.scriptId));
    const exports = await db.select().from(schema.exports).where(eq(schema.exports.adId, ad.id));
    return c.json({ ad, script, exports }, 200);
  })
  .patch("/:id", requireAuth, async (c) => {
    const body = await c.req.json();
    const [updated] = await db
      .update(schema.ads)
      .set({ ...body, updatedAt: new Date() })
      .where(eq(schema.ads.id, c.req.param("id")))
      .returning();
    return c.json({ ad: updated }, 200);
  })
  .delete("/:id", requireAuth, async (c) => {
    await db.delete(schema.ads).where(eq(schema.ads.id, c.req.param("id")));
    return c.json({ success: true }, 200);
  });
