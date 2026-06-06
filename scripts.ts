import { Hono } from "hono";
import { db } from "../database";
import * as schema from "../database/schema";
import { eq } from "drizzle-orm";
import { requireAuth } from "../middleware/auth";

export const scripts = new Hono()
  .get("/", requireAuth, async (c) => {
    const user = c.get("user")!;
    // Get all scripts through campaigns → projects → user
    const rows = await db
      .select({ script: schema.scripts })
      .from(schema.scripts)
      .innerJoin(schema.campaigns, eq(schema.scripts.campaignId, schema.campaigns.id))
      .innerJoin(schema.projects, eq(schema.campaigns.projectId, schema.projects.id))
      .where(eq(schema.projects.userId, user.id));
    return c.json({ scripts: rows.map((r) => r.script) }, 200);
  })
  .post("/", requireAuth, async (c) => {
    const body = await c.req.json();
    const [script] = await db.insert(schema.scripts).values({ ...body, aiGenerated: false }).returning();
    return c.json({ script }, 201);
  })
  .post("/generate", requireAuth, async (c) => {
    const {
      productName, description, targetAudience, painPoint,
      platform, tone, objective, videoLength, campaignId,
    } = await c.req.json();

    // Build GPT-4o prompt
    const systemPrompt = `You are an expert performance marketing copywriter. Generate 3 complete ad script variants. 
Return a valid JSON array with exactly 3 objects, each having: hook, body, cta, angle, tone, watchThroughRate (High/Medium/Low).
Be specific, punchy, and conversion-focused. No fluff.`;

    const userPrompt = `Product: ${productName}
Description: ${description}
Target Audience: ${targetAudience}
Pain Point: ${painPoint}
Platform: ${platform}
Tone: ${tone}
Objective: ${objective}
Video Length: ${videoLength}s

Generate 3 complete script variants.`;

    try {
      const response = await fetch(`${process.env.AI_GATEWAY_BASE_URL}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.AI_GATEWAY_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          response_format: { type: "json_object" },
        }),
      });

      const data = await response.json() as any;
      const content = data.choices?.[0]?.message?.content ?? "{}";
      let variants: any[] = [];
      try {
        const parsed = JSON.parse(content);
        variants = Array.isArray(parsed) ? parsed : (parsed.scripts ?? parsed.variants ?? []);
      } catch {
        variants = [];
      }

      // Save to DB if campaignId provided
      if (campaignId && variants.length > 0) {
        const saved = await Promise.all(
          variants.map((v) =>
            db.insert(schema.scripts).values({
              campaignId,
              hook: v.hook ?? "",
              body: v.body ?? "",
              cta: v.cta ?? "",
              angle: v.angle,
              tone: v.tone ?? tone,
              aiGenerated: true,
            }).returning()
          )
        );
        return c.json({ variants, saved: saved.map((s) => s[0]) }, 200);
      }

      return c.json({ variants }, 200);
    } catch (err) {
      console.error("[scripts/generate]", err);
      return c.json({ error: "Generation failed" }, 500);
    }
  })
  .post("/:id/hooks", requireAuth, async (c) => {
    const [script] = await db.select().from(schema.scripts).where(eq(schema.scripts.id, c.req.param("id")));
    if (!script) return c.json({ message: "Not found" }, 404);

    try {
      const response = await fetch(`${process.env.AI_GATEWAY_BASE_URL}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.AI_GATEWAY_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: "Generate 5 alternative hook variations for the same ad script. Return JSON array of strings.",
            },
            {
              role: "user",
              content: `Original hook: "${script.hook}"\nScript body: "${script.body}"\nCTA: "${script.cta}"\n\nGenerate 5 alternative hooks.`,
            },
          ],
          response_format: { type: "json_object" },
        }),
      });
      const data = await response.json() as any;
      const content = data.choices?.[0]?.message?.content ?? "{}";
      let hooks: string[] = [];
      try {
        const parsed = JSON.parse(content);
        hooks = Array.isArray(parsed) ? parsed : (parsed.hooks ?? []);
      } catch {
        hooks = [];
      }
      return c.json({ hooks }, 200);
    } catch {
      return c.json({ error: "Hook generation failed" }, 500);
    }
  });
