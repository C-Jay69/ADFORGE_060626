import { Redirect } from "wouter";
import { authClient } from "../lib/auth";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-primary)" }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: "var(--accent-blue)", borderTopColor: "transparent" }} />
          <p style={{ color: "var(--text-muted)" }} className="text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) return <Redirect to="/login" />;
  return <>{children}</>;
}
