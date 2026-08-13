import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Film, Plus, Zap, TrendingUp, Clock, Play, ArrowRight } from "lucide-react";
import { DashboardLayout } from "../../components/dashboard-layout";
import { api } from "../../lib/api";
import { authClient } from "../../lib/auth";

function UsageMeter({ used, total }: { used: number; total: number }) {
  const pct = total > 0 ? Math.min((used / total) * 100, 100) : 0;
  const color = pct > 80 ? "var(--accent-pink)" : pct > 60 ? "#F59E0B" : "var(--accent-blue)";
  return (
    <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 20 }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Zap size={16} style={{ color: "var(--accent-blue)" }} />
          <span style={{ color: "var(--text-muted)", fontSize: 13 }}>Video Minutes</span>
        </div>
        <span style={{ color: "var(--text-primary)", fontWeight: 600, fontSize: 14 }}>
          {used} / {total === -1 ? "∞" : total} min
        </span>
      </div>
      <div style={{ background: "var(--bg-surface-alt)", borderRadius: 999, height: 6, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 999, transition: "width 0.5s ease" }} />
      </div>
      {pct > 80 && (
        <p style={{ color: "var(--accent-pink)", fontSize: 12, marginTop: 8 }}>
          Running low — <Link to="/dashboard/billing" style={{ color: "var(--accent-blue)" }}>upgrade plan</Link>
        </p>
      )}
    </div>
  );
}

const RECENT_ADS_MOCK = [
  { id: "1", name: "Summer Sale Hook v3", project: "Nike Campaign", status: "ready", duration: "0:28", thumbnail: null },
  { id: "2", name: "Product Reveal 60s", project: "Launch Week", status: "rendering", duration: "1:02", thumbnail: null },
  { id: "3", name: "Testimonial Cut A", project: "Trust Series", status: "ready", duration: "0:45", thumbnail: null },
];

const QUICK_ACTIONS = [
  { label: "New Ad", href: "/dashboard/create", icon: Film, gradient: "var(--gradient-1)" },
  { label: "Browse Actors", href: "/dashboard/actors", icon: Play, gradient: "var(--gradient-2)" },
  { label: "My Scripts", href: "/dashboard/scripts", icon: Zap, gradient: "linear-gradient(135deg, #06B6D4, #3B82F6)" },
];

export default function DashboardOverview() {
  const { data: session } = authClient.useSession();
  const { data: projects } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => { const r = await api.projects.$get(); return r.json(); },
  });

  const firstName = session?.user?.name?.split(" ")[0] ?? "there";

  return (
    <DashboardLayout>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: 26, fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>
              Good to see you, {firstName} 👋
            </h1>
            <p style={{ color: "var(--text-muted)", marginTop: 4, fontSize: 14 }}>Here's what's happening with your ads.</p>
          </div>
          <Link to="/dashboard/create">
            <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", background: "var(--gradient-1)", border: "none", borderRadius: 8, color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
              <Plus size={16} /> New Ad
            </button>
          </Link>
        </div>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
          {[
            { label: "Projects", value: Array.isArray(projects) ? projects.length : 0, icon: Film, color: "var(--accent-blue)" },
            { label: "Ads Created", value: 14, icon: Play, color: "var(--accent-purple)" },
            { label: "Exports This Month", value: 9, icon: TrendingUp, color: "var(--accent-cyan)" },
            { label: "Avg. Render Time", value: "2.4m", icon: Clock, color: "#F59E0B" },
          ].map((s) => (
            <div key={s.label} style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 20 }}>
              <div className="flex items-center gap-2 mb-3">
                <s.icon size={16} style={{ color: s.color }} />
                <span style={{ color: "var(--text-muted)", fontSize: 13 }}>{s.label}</span>
              </div>
              <p style={{ fontSize: 28, fontWeight: 700, fontFamily: "Syne, sans-serif", color: "var(--text-primary)", margin: 0 }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Usage + Quick Actions */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
          <UsageMeter used={12} total={30} />
          <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 20 }}>
            <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 12 }}>Quick Actions</p>
            <div className="flex flex-col gap-2">
              {QUICK_ACTIONS.map((a) => (
                <Link key={a.href} to={a.href}>
                  <div className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all"
                    style={{ background: "var(--bg-surface-alt)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--border)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "var(--bg-surface-alt)")}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: a.gradient, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <a.icon size={14} color="#fff" />
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 500, color: "var(--text-primary)" }}>{a.label}</span>
                    <ArrowRight size={14} style={{ marginLeft: "auto", color: "var(--text-muted)" }} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Ads */}
        <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 20 }}>
          <div className="flex items-center justify-between mb-4">
            <p style={{ fontWeight: 600, fontSize: 15, color: "var(--text-primary)", margin: 0 }}>Recent Ads</p>
            <Link to="/dashboard/exports" style={{ color: "var(--accent-blue)", fontSize: 13 }}>View all</Link>
          </div>
          {RECENT_ADS_MOCK.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <Film size={32} style={{ color: "var(--text-subtle)" }} />
              <p style={{ color: "var(--text-muted)", fontSize: 14 }}>No ads yet. Create your first one!</p>
              <Link to="/dashboard/create">
                <button style={{ padding: "8px 16px", background: "var(--gradient-1)", border: "none", borderRadius: 8, color: "#fff", fontSize: 13, cursor: "pointer" }}>
                  Get Started
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {RECENT_ADS_MOCK.map((ad) => (
                <div key={ad.id} className="flex items-center gap-4 p-3 rounded-lg"
                  style={{ background: "var(--bg-surface-alt)" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 8, background: "var(--bg-primary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Film size={18} style={{ color: "var(--text-subtle)" }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 500, fontSize: 14, color: "var(--text-primary)", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{ad.name}</p>
                    <p style={{ fontSize: 12, color: "var(--text-muted)", margin: 0 }}>{ad.project} · {ad.duration}</p>
                  </div>
                  <span style={{
                    fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 99,
                    background: ad.status === "ready" ? "rgba(34,197,94,0.1)" : "rgba(251,146,60,0.1)",
                    color: ad.status === "ready" ? "#22C55E" : "#FB923C"
                  }}>{ad.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
