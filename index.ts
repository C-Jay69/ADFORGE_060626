import { Hono } from "hono";
import { cors } from "hono/cors";
import { auth } from "./auth";
import { authMiddleware } from "./middleware/auth";
import { workspaces } from "./routes/workspaces";
import { projects } from "./routes/projects";
import { campaigns } from "./routes/campaigns";
import { scripts } from "./routes/scripts";
import { actors } from "./routes/actors";
import { ads } from "./routes/ads";
import { exports as exportsRoute } from "./routes/exports";
import { users } from "./routes/users";

const app = new Hono()
  .use(cors({ origin: (origin) => origin ?? "*", credentials: true, exposeHeaders: ["set-auth-token"] }))
  .on(["GET", "POST"], "/api/auth/*", (c) => auth.handler(c.req.raw))
  .basePath("api")
  .use("*", authMiddleware)
  .get("/health", (c) => c.json({ status: "ok" }, 200))
  .route("/users", users)
  .route("/workspaces", workspaces)
  .route("/projects", projects)
  .route("/campaigns", campaigns)
  .route("/scripts", scripts)
  .route("/actors", actors)
  .route("/ads", ads)
  .route("/exports", exportsRoute);

export type AppType = typeof app;
export default app;
