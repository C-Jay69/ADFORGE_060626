import { Hono } from "hono";
import { db } from "../database";
import * as schema from "../database/schema";
import { eq, and } from "drizzle-orm";
import { requireAuth } from "../middleware/auth";

export const workspaces = new Hono()
  .get("/", requireAuth, async (c) => {
    const user = c.get("user")!;
    const members = await db
      .select({ workspace: schema.workspaces })
      .from(schema.workspaceMembers)
      .innerJoin(schema.workspaces, eq(schema.workspaceMembers.workspaceId, schema.workspaces.id))
      .where(eq(schema.workspaceMembers.userId, user.id));
    return c.json({ workspaces: members.map((m) => m.workspace) }, 200);
  })
  .post("/", requireAuth, async (c) => {
    const user = c.get("user")!;
    const { name } = await c.req.json();
    const slug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") + "-" + Date.now();
    const [ws] = await db.insert(schema.workspaces).values({ name, slug }).returning();
    await db.insert(schema.workspaceMembers).values({ userId: user.id, workspaceId: ws.id, role: "OWNER" });
    return c.json({ workspace: ws }, 201);
  })
  .get("/:id/members", requireAuth, async (c) => {
    const members = await db
      .select({ member: schema.workspaceMembers, user: schema.users })
      .from(schema.workspaceMembers)
      .innerJoin(schema.users, eq(schema.workspaceMembers.userId, schema.users.id))
      .where(eq(schema.workspaceMembers.workspaceId, c.req.param("id")));
    return c.json({ members }, 200);
  });
