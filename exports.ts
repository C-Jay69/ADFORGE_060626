import { Hono } from "hono";
import { db } from "../database";
import * as schema from "../database/schema";
import { eq } from "drizzle-orm";
import { requireAuth } from "../middleware/auth";

export const exports = new Hono()
  .get("/", requireAuth, async (c) => {
    const user = c.get("user")!;
    const rows = await db
      .select({ export: schema.exports, ad: schema.ads })
      .from(schema.exports)
      .innerJoin(schema.ads, eq(schema.exports.adId, schema.ads.id))
      .innerJoin(schema.campaigns, eq(schema.ads.campaignId, schema.campaigns.id))
      .innerJoin(schema.projects, eq(schema.campaigns.projectId, schema.projects.id))
      .where(eq(schema.projects.userId, user.id));
    return c.json({ exports: rows }, 200);
  })
  .post("/", requireAuth, async (c) => {
    const { adId, format, url, fileSize } = await c.req.json();
    const [exp] = await db.insert(schema.exports).values({ adId, format, url, fileSize }).returning();
    return c.json({ export: exp }, 201);
  });
