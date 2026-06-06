import { useState } from "react";
import { useParams, Link } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Film, ChevronRight, ArrowLeft, X, Trash2 } from "lucide-react";
import { DashboardLayout } from "../../components/dashboard-layout";
import { api } from "../../lib/api";

function CreateCampaignModal({ projectId, onClose }: { projectId: string; onClose: () => void }) {
  const [name, setName] = useState("");
  const qc = useQueryClient();
  const create = useMutation({
    mutationFn: async () => {
      const r = await api.campaigns.$post({ json: { name, projectId } });
      return r.json();
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["campaigns", projectId] }); onClose(); },
  });

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 }}>
      <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 28, width: 400, maxWidth: "90vw" }}>
        <div className="flex items-center justify-between mb-5">
          <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 18, color: "var(--text-primary)", margin: 0 }}>New Campaign</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}><X size={20} /></button>
        </div>
        <div className="flex flex-col gap-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Campaign name..."
            onKeyDown={(e) => e.key === "Enter" && name.trim() && create.mutate()}
            style={{ width: "100%", padding: "10px 14px", background: "var(--bg-surface-alt)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)", fontSize: 14, outline: "none", boxSizing: "border-box" }}
          />
          <button
            onClick={() => name.trim() && create.mutate()}
            disabled={create.isPending || !name.trim()}
            style={{ padding: 11, background: "var(--gradient-1)", border: "none", borderRadius: 8, color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer", opacity: (create.isPending || !name.trim()) ? 0.5 : 1 }}>
            {create.isPending ? "Creating..." : "Create Campaign"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [showCreate, setShowCreate] = useState(false);
  const qc = useQueryClient();

  const { data: campaigns, isLoading } = useQuery({
    queryKey: ["campaigns", id],
    queryFn: async () => { const r = await api.campaigns.$get({ query: { projectId: id! } }); return r.json(); },
    enabled: !!id,
  });

  const remove = useMutation({
    mutationFn: async (cid: string) => {
      const r = await (api.campaigns as any)[":id"].$delete({ param: { id: cid } });
      return r.json();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["campaigns", id] }),
  });

  return (
    <DashboardLayout>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div className="flex items-center gap-3 mb-2">
          <Link to="/dashboard/projects" style={{ color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 4, fontSize: 13 }}>
            <ArrowLeft size={14} /> Projects
          </Link>
        </div>

        <div className="flex items-center justify-between mb-8">
          <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: 24, fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>Campaigns</h1>
          <button onClick={() => setShowCreate(true)}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", background: "var(--gradient-1)", border: "none", borderRadius: 8, color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
            <Plus size={16} /> New Campaign
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
              style={{ borderColor: "var(--accent-blue)", borderTopColor: "transparent" }} />
          </div>
        ) : !Array.isArray(campaigns) || campaigns.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4"
            style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16 }}>
            <Film size={48} style={{ color: "var(--text-subtle)" }} />
            <p style={{ color: "var(--text-muted)", fontSize: 15 }}>No campaigns yet</p>
            <button onClick={() => setShowCreate(true)}
              style={{ padding: "10px 24px", background: "var(--gradient-1)", border: "none", borderRadius: 8, color: "#fff", fontWeight: 600, cursor: "pointer" }}>
              Create Campaign
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {(campaigns as any[]).map((c: any) => (
              <div key={c.id} className="flex items-center gap-4 p-4 rounded-xl"
                style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", transition: "border-color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent-blue)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--gradient-2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Film size={18} color="#fff" />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, fontSize: 14, color: "var(--text-primary)", margin: 0 }}>{c.name}</p>
                  <p style={{ fontSize: 12, color: "var(--text-muted)", margin: 0 }}>{new Date(c.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Link to={`/dashboard/campaign/${c.id}`}>
                    <button className="flex items-center gap-1"
                      style={{ padding: "7px 14px", background: "var(--bg-surface-alt)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)", fontSize: 13, cursor: "pointer" }}>
                      Open <ChevronRight size={13} />
                    </button>
                  </Link>
                  <button
                    onClick={() => confirm("Delete?") && remove.mutate(c.id)}
                    style={{ padding: 7, background: "none", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-muted)", cursor: "pointer" }}>
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {showCreate && id && <CreateCampaignModal projectId={id} onClose={() => setShowCreate(false)} />}
    </DashboardLayout>
  );
}
