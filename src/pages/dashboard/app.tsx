import { Route, Switch } from "wouter";
import { Provider } from "./components/provider";
import { ProtectedRoute } from "./components/protected-route";
import { AgentFeedback, RunableBadge } from "@runablehq/website-runtime";

// Public pages
import Index from "./pages/index";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import OnboardingPage from "./pages/onboarding";
import PricingPage from "./pages/pricing";
import ChangelogPage from "./pages/changelog";

// Feature pages
import ScriptStudioFeaturePage from "./pages/features/script-studio";
import VideoEditorFeaturePage from "./pages/features/video-editor";
import ActorLibraryFeaturePage from "./pages/features/actor-library";
import ProductOverlayFeaturePage from "./pages/features/product-overlay";

// Dashboard pages
import DashboardOverview from "./pages/dashboard/index";
import ProjectsPage from "./pages/dashboard/projects";
import ProjectDetailPage from "./pages/dashboard/project-detail";
import CampaignPage from "./pages/dashboard/campaign";
import CreateAdPage from "./pages/dashboard/create";
import ActorsPage from "./pages/dashboard/actors";
import ScriptsPage from "./pages/dashboard/scripts";
import ExportsPage from "./pages/dashboard/exports";
import SettingsPage from "./pages/dashboard/settings";
import BillingPage from "./pages/dashboard/billing";
import TeamPage from "./pages/dashboard/team";
import EditorPage from "./pages/dashboard/editor";

function App() {
  return (
    <Provider>
      <Switch>
        {/* Public */}
        <Route path="/" component={Index} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/pricing" component={PricingPage} />
        <Route path="/changelog" component={ChangelogPage} />
        <Route path="/features/script-studio" component={ScriptStudioFeaturePage} />
        <Route path="/features/video-editor" component={VideoEditorFeaturePage} />
        <Route path="/features/actor-library" component={ActorLibraryFeaturePage} />
        <Route path="/features/product-overlay" component={ProductOverlayFeaturePage} />

        {/* Onboarding */}
        <Route path="/onboarding">
          <ProtectedRoute><OnboardingPage /></ProtectedRoute>
        </Route>

        {/* Dashboard */}
        <Route path="/dashboard">
          <ProtectedRoute><DashboardOverview /></ProtectedRoute>
        </Route>
        <Route path="/dashboard/projects">
          <ProtectedRoute><ProjectsPage /></ProtectedRoute>
        </Route>
        <Route path="/dashboard/projects/:id">
          <ProtectedRoute><ProjectDetailPage /></ProtectedRoute>
        </Route>
        <Route path="/dashboard/campaign/:id">
          <ProtectedRoute><CampaignPage /></ProtectedRoute>
        </Route>
        <Route path="/dashboard/create">
          <ProtectedRoute><CreateAdPage /></ProtectedRoute>
        </Route>
        <Route path="/dashboard/actors">
          <ProtectedRoute><ActorsPage /></ProtectedRoute>
        </Route>
        <Route path="/dashboard/scripts">
          <ProtectedRoute><ScriptsPage /></ProtectedRoute>
        </Route>
        <Route path="/dashboard/exports">
          <ProtectedRoute><ExportsPage /></ProtectedRoute>
        </Route>
        <Route path="/dashboard/settings">
          <ProtectedRoute><SettingsPage /></ProtectedRoute>
        </Route>
        <Route path="/dashboard/billing">
          <ProtectedRoute><BillingPage /></ProtectedRoute>
        </Route>
        <Route path="/dashboard/team">
          <ProtectedRoute><TeamPage /></ProtectedRoute>
        </Route>
        <Route path="/dashboard/editor">
          <ProtectedRoute><EditorPage /></ProtectedRoute>
        </Route>
      </Switch>

      {/* Do not remove — off by default, activated by parent iframe via postMessage */}
      {import.meta.env.DEV && <AgentFeedback />}
      {/* "Made with Runable" badge - if user asks to remove the runable badge, remove this code as well as comment */}
      {<RunableBadge />}
    </Provider>
  );
}

export default App;
