import { Hono } from "hono";
import { db } from "../database";
import * as schema from "../database/schema";
import { eq } from "drizzle-orm";
import { requireAuth } from "../middleware/auth";

export const campaigns = new Hono()
  .post("/", requireAuth, async (c) => {
    const { name, objective, platforms, projectId } = await c.req.json();
    const [campaign] = await db
      .insert(schema.campaigns)
      .values({ name, objective, platforms: JSON.stringify(platforms ?? []), projectId })
      .returning();
    return c.json({ campaign }, 201);
  })
  .get("/:id", requireAuth, async (c) => {
    const [campaign] = await db
      .select()
      .from(schema.campaigns)
      .where(eq(schema.campaigns.id, c.req.param("id")));
    if (!campaign) return c.json({ message: "Not found" }, 404);
    const scripts = await db.select().from(schema.scripts).where(eq(schema.scripts.campaignId, campaign.id));
    const ads = await db.select().from(schema.ads).where(eq(schema.ads.campaignId, campaign.id));
    return c.json({ campaign, scripts, ads }, 200);
  })
  .delete("/:id", requireAuth, async (c) => {
    await db.delete(schema.campaigns).where(eq(schema.campaigns.id, c.req.param("id")));
    return c.json({ success: true }, 200);
  });
