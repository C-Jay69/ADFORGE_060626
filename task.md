# AdForge Build Task

## Status
- [x] App scaffolded
- [x] Dependencies installed (better-auth, autumn-js, atmn)
- [x] DB schema written
- [x] Auth schema generated
- [x] DB pushed
- [ ] Auth middleware + API routes
- [ ] Autumn config
- [ ] API routes (scripts, actors, ads, campaigns, projects, workspaces)
- [ ] Frontend auth pages (login, signup)
- [ ] Marketing pages (home, pricing, features)
- [ ] Dashboard pages (overview, projects, campaigns, create, actors, editor, scripts, exports, settings, billing, team)
- [ ] Fonts + design system CSS
- [ ] Build verify

## Key Decisions
- Stack: Managed Bun/Vite/React/Hono/Drizzle
- Design: Dark/cinematic (deep navy/slate, gradient accents)
- Auth: Better Auth email/password
- Payments: Autumn (FREE/STARTER/GROWTH/AGENCY)
- Feature gating: video_minutes feature (3/30/90/300)

## Pages to build
### Public
- / (homepage - long scroll conversion page)
- /pricing
- /features/script-studio
- /features/video-editor
- /features/actor-library
- /features/product-overlay
- /login
- /signup

### Protected /dashboard
- /dashboard (overview)
- /dashboard/projects
- /dashboard/projects/:id
- /dashboard/campaigns/:id
- /dashboard/create
- /dashboard/actors
- /dashboard/editor/:adId
- /dashboard/scripts
- /dashboard/exports
- /dashboard/settings
- /dashboard/billing
- /dashboard/team
