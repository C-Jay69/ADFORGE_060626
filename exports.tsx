import { useQuery } from "@tanstack/react-query";
import { Download, Film, Clock, CheckCircle, AlertCircle, Loader, RefreshCw } from "lucide-react";
import { DashboardLayout } from "../../components/dashboard-layout";
import { api } from "../../lib/api";

const STATUS_CONFIG = {
  pending: { label: "Pending", icon: Clock, color: "#94A3B8", bg: "rgba(148,163,184,0.1)" },
  processing: { label: "Rendering", icon: Loader, color: "#F59E0B", bg: "rgba(245,158,11,0.1)" },
  completed: { label: "Ready", icon: CheckCircle, color: "#22C55E", bg: "rgba(34,197,94,0.1)" },
  failed: { label: "Failed", icon: AlertCircle, color: "#EF4444", bg: "rgba(239,68,68,0.1)" },
};

export default function ExportsPage() {
  const { data: exports, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["exports"],
    queryFn: async () => { const r = await api.exports.$get(); return r.json(); },
    refetchInterval: 10000,
  });

  return (
    <DashboardLayout>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: 24, fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>Exports</h1>
            <p style={{ color: "var(--text-muted)", fontSize: 14, marginTop: 4 }}>Your rendered ads, ready to download</p>
          </div>
          <button onClick={() => refetch()} disabled={isFetching}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)", fontSize: 13, cursor: "pointer" }}>
            <RefreshCw size={14} className={isFetching ? "animate-spin" : ""} /> Refresh
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
              style={{ borderColor: "var(--accent-blue)", borderTopColor: "transparent" }} />
          </div>
        ) : !Array.isArray(exports) || exports.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4"
            style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16 }}>
            <Download size={48} style={{ color: "var(--text-subtle)" }} />
            <p style={{ color: "var(--text-muted)", fontSize: 15 }}>No exports yet</p>
            <p style={{ color: "var(--text-subtle)", fontSize: 13 }}>Create your first ad to see exports here</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {(exports as any[]).map((ex: any) => {
              const status = STATUS_CONFIG[ex.status as keyof typeof STATUS_CONFIG] ?? STATUS_CONFIG.pending;
              const Icon = status.icon;
              return (
                <div key={ex.id} style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 20 }}>
                  <div className="flex items-center gap-4">
                    <div style={{ width: 52, height: 52, borderRadius: 10, background: "var(--bg-surface-alt)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Film size={22} style={{ color: "var(--text-subtle)" }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontWeight: 600, fontSize: 14, color: "var(--text-primary)", margin: "0 0 2px" }}>
                        Ad Export — {ex.id?.slice(0, 8)}
                      </p>
                      <p style={{ fontSize: 12, color: "var(--text-muted)", margin: 0 }}>
                        {ex.aspectRatio ?? "9:16"} · {new Date(ex.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1.5"
                        style={{ fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 99, background: status.bg, color: status.color }}>
                        <Icon size={12} className={ex.status === "processing" ? "animate-spin" : ""} />
                        {status.label}
                      </span>
                      {ex.status === "completed" && ex.outputUrl && (
                        <a href={ex.outputUrl} download target="_blank" rel="noreferrer">
                          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "var(--gradient-1)", border: "none", borderRadius: 8, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                            <Download size={13} /> Download
                          </button>
                        </a>
                      )}
                    </div>
                  </div>
                  {ex.status === "processing" && (
                    <div style={{ marginTop: 12 }}>
                      <div style={{ background: "var(--bg-surface-alt)", borderRadius: 999, height: 4, overflow: "hidden" }}>
                        <div style={{ width: "60%", height: "100%", background: "var(--gradient-1)", borderRadius: 999, animation: "pulse 2s infinite" }} />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
