import { Hono } from "hono";
import { db } from "../database";
import * as schema from "../database/schema";
import { eq } from "drizzle-orm";
import { requireAuth } from "../middleware/auth";

export const users = new Hono()
  .get("/me", requireAuth, async (c) => {
    const user = c.get("user")!;
    const [dbUser] = await db.select().from(schema.users).where(eq(schema.users.id, user.id));
    // Create user record if doesn't exist (first login)
    if (!dbUser) {
      const [created] = await db.insert(schema.users).values({
        id: user.id,
        email: user.email,
        name: user.name ?? null,
      }).returning();
      return c.json({ user: created }, 200);
    }
    return c.json({ user: dbUser }, 200);
  })
  .patch("/me", requireAuth, async (c) => {
    const user = c.get("user")!;
    const body = await c.req.json();
    const [updated] = await db
      .update(schema.users)
      .set({ ...body, updatedAt: new Date() })
      .where(eq(schema.users.id, user.id))
      .returning();
    return c.json({ user: updated }, 200);
  });
