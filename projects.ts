import { Hono } from "hono";
import { db } from "../database";
import * as schema from "../database/schema";
import { eq } from "drizzle-orm";
import { requireAuth } from "../middleware/auth";

export const projects = new Hono()
  .get("/", requireAuth, async (c) => {
    const user = c.get("user")!;
    const rows = await db.select().from(schema.projects).where(eq(schema.projects.userId, user.id));
    return c.json({ projects: rows }, 200);
  })
  .post("/", requireAuth, async (c) => {
    const user = c.get("user")!;
    const { name, description, workspaceId } = await c.req.json();
    const [project] = await db
      .insert(schema.projects)
      .values({ name, description, workspaceId, userId: user.id })
      .returning();
    return c.json({ project }, 201);
  })
  .get("/:id", requireAuth, async (c) => {
    const user = c.get("user")!;
    const [project] = await db
      .select()
      .from(schema.projects)
      .where(eq(schema.projects.id, c.req.param("id")));
    if (!project || project.userId !== user.id) return c.json({ message: "Not found" }, 404);
    const camps = await db.select().from(schema.campaigns).where(eq(schema.campaigns.projectId, project.id));
    return c.json({ project, campaigns: camps }, 200);
  })
  .delete("/:id", requireAuth, async (c) => {
    const user = c.get("user")!;
    const [project] = await db
      .select()
      .from(schema.projects)
      .where(eq(schema.projects.id, c.req.param("id")));
    if (!project || project.userId !== user.id) return c.json({ message: "Not found" }, 404);
    await db.delete(schema.projects).where(eq(schema.projects.id, project.id));
    return c.json({ success: true }, 200);
  });
