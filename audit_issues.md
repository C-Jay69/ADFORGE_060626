AUDIT ISSUES FOUND:

1. ROOT-LEVEL COMPONENTS (login.tsx, signup.tsx, onboarding.tsx, scripts.tsx, actors.tsx, campaigns.tsx, projects.tsx, editor.tsx, video-editor.tsx, script-studio.tsx, product-overlay.tsx, team.tsx, settings.tsx, billing.tsx, project-detail.tsx, export.ts, exports.tsx)
   - These files are in root, not src/pages
   - They import from `../../components` and `../lib`
   - Should import from `src/components/ui` and `src/lib`

2. APP.TSX (in src/):
   - Imports from `../../components/ui/card` (wrong - should be `@/components/ui/card` or `src/components/ui/card`)

3. INDEX.TSX (in root):
   - Imports from `../../components/dashboard-layout` and `../../lib/api`
   - Should import from `src/components/dashboard-layout` and `src/lib/api`

4. ONBOARDING.TSX:
   - Imports from `../lib/auth` and `../lib/api`
   - Should import from `src/lib/auth` and `src/lib/api`

5. SCRIPTS.TSX:
   - Imports from `../../components/dashboard-layout` and `../../lib/api`
   - Should import from `src/components/dashboard-layout` and `src/lib/api`

6. API CLIENT ISSUES:
   - api.ts references "../../api" which doesn't exist
   - Root-level components use `api` from `../../lib/api`
   - Should be `src/lib/api`

7. MISSING PAGES DIRECTORY:
   - App routes reference ./pages/ but no pages directory exists
   - UI components are in root directory, should be in src/pages/

8. SCHEME ISSUES:
   - Database schema.ts exists but may not match the API routes
   - API routes may not be implemented for all models
