import {
  sqliteTable,
  text,
  integer,
  real,
} from "drizzle-orm/sqlite-core";

// ─── Plans & Enums (as string literals) ─────────────────────────────────────

// plan: FREE | STARTER | GROWTH | AGENCY
// role: OWNER | ADMIN | MEMBER
// adStatus: QUEUED | PROCESSING | COMPLETE | FAILED
// videoFormat: VERTICAL | SQUARE | LANDSCAPE
// platform: TIKTOK | META | YOUTUBE | INSTAGRAM | LINKEDIN | PINTEREST

// ─── Users ───────────────────────────────────────────────────────────────────

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  avatarUrl: text("avatar_url"),
  stripeCustomerId: text("stripe_customer_id").unique(),
  plan: text("plan").notNull().default("FREE"), // FREE | STARTER | GROWTH | AGENCY
  minutesUsed: real("minutes_used").notNull().default(0),
  minutesLimit: real("minutes_limit").notNull().default(3),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// ─── Workspaces ───────────────────────────────────────────────────────────────

export const workspaces = sqliteTable("workspaces", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  plan: text("plan").notNull().default("FREE"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const workspaceMembers = sqliteTable("workspace_members", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id").notNull().references(() => users.id),
  workspaceId: text("workspace_id").notNull().references(() => workspaces.id),
  role: text("role").notNull().default("MEMBER"), // OWNER | ADMIN | MEMBER
});

// ─── Projects ────────────────────────────────────────────────────────────────

export const projects = sqliteTable("projects", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  description: text("description"),
  workspaceId: text("workspace_id").notNull().references(() => workspaces.id),
  userId: text("user_id").notNull().references(() => users.id),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// ─── Campaigns ───────────────────────────────────────────────────────────────

export const campaigns = sqliteTable("campaigns", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  objective: text("objective"),
  platforms: text("platforms").notNull().default("[]"), // JSON array
  projectId: text("project_id").notNull().references(() => projects.id),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// ─── Scripts ─────────────────────────────────────────────────────────────────

export const scripts = sqliteTable("scripts", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  campaignId: text("campaign_id").notNull().references(() => campaigns.id),
  hook: text("hook").notNull(),
  body: text("body").notNull(),
  cta: text("cta").notNull(),
  angle: text("angle"),
  tone: text("tone"),
  language: text("language").notNull().default("en"),
  aiGenerated: integer("ai_generated", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// ─── Actors ──────────────────────────────────────────────────────────────────

export const actors = sqliteTable("actors", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  previewUrl: text("preview_url").notNull(),
  thumbnailUrl: text("thumbnail_url").notNull(),
  gender: text("gender").notNull(),
  ageRange: text("age_range").notNull(),
  ethnicity: text("ethnicity").notNull(),
  style: text("style").notNull(),
  accent: text("accent").notNull(),
  voiceId: text("voice_id").notNull(),
  hedraActorId: text("hedra_actor_id"),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
});

// ─── Ads ─────────────────────────────────────────────────────────────────────

export const ads = sqliteTable("ads", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  campaignId: text("campaign_id").notNull().references(() => campaigns.id),
  scriptId: text("script_id").notNull().references(() => scripts.id),
  actorId: text("actor_id").notNull().references(() => actors.id),
  status: text("status").notNull().default("QUEUED"), // QUEUED | PROCESSING | COMPLETE | FAILED
  emotionTag: text("emotion_tag"),
  outputUrl: text("output_url"),
  thumbnailUrl: text("thumbnail_url"),
  durationSeconds: real("duration_seconds"),
  minutesConsumed: real("minutes_consumed"),
  format: text("format").notNull().default("VERTICAL"), // VERTICAL | SQUARE | LANDSCAPE
  hasSubtitles: integer("has_subtitles", { mode: "boolean" }).notNull().default(false),
  hasBRoll: integer("has_b_roll", { mode: "boolean" }).notNull().default(false),
  hasMusic: integer("has_music", { mode: "boolean" }).notNull().default(false),
  language: text("language").notNull().default("en"),
  jobId: text("job_id"),
  editState: text("edit_state"), // JSON Fabric.js canvas state
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// ─── Exports ─────────────────────────────────────────────────────────────────

export const exports = sqliteTable("exports", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  adId: text("ad_id").notNull().references(() => ads.id),
  format: text("format").notNull(), // mp4_9x16 | mp4_1x1 | mp4_16x9
  url: text("url").notNull(),
  fileSize: integer("file_size"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// ─── Performance Logs ────────────────────────────────────────────────────────

export const performanceLogs = sqliteTable("performance_logs", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  adId: text("ad_id").notNull().references(() => ads.id),
  ctr: real("ctr"),
  hookRate: real("hook_rate"),
  roas: real("roas"),
  platform: text("platform"),
  notes: text("notes"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// ─── Auth Schema re-export ────────────────────────────────────────────────────
export * from "./auth-schema";
