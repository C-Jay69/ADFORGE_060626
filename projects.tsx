import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "wouter";
import { Plus, FolderOpen, ChevronRight, Trash2, X } from "lucide-react";
import { DashboardLayout } from "../../components/dashboard-layout";
import { api } from "../../lib/api";

function CreateProjectModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const qc = useQueryClient();
  const create = useMutation({
    mutationFn: async () => {
      const r = await api.projects.$post({ json: { name } });
      return r.json();
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["projects"] }); onClose(); },
  });

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 }}>
      <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 28, width: 400, maxWidth: "90vw" }}>
        <div className="flex items-center justify-between mb-5">
          <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 18, color: "var(--text-primary)", margin: 0 }}>New Project</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}><X size={20} /></button>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <label style={{ fontSize: 13, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>Project Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Q3 Nike Campaign"
              onKeyDown={(e) => e.key === "Enter" && name.trim() && create.mutate()}
              style={{ width: "100%", padding: "10px 14px", background: "var(--bg-surface-alt)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)", fontSize: 14, outline: "none", boxSizing: "border-box" }}
            />
          </div>
          <button
            onClick={() => name.trim() && create.mutate()}
            disabled={create.isPending || !name.trim()}
            style={{ padding: "11px", background: "var(--gradient-1)", border: "none", borderRadius: 8, color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer", opacity: (create.isPending || !name.trim()) ? 0.5 : 1 }}>
            {create.isPending ? "Creating..." : "Create Project"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [showCreate, setShowCreate] = useState(false);
  const qc = useQueryClient();
  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => { const r = await api.projects.$get(); return r.json(); },
  });
  const remove = useMutation({
    mutationFn: async (id: string) => {
      const r = await (api.projects as any)[":id"].$delete({ param: { id } });
      return r.json();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });

  return (
    <DashboardLayout>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: 24, fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>Projects</h1>
            <p style={{ color: "var(--text-muted)", marginTop: 4, fontSize: 14 }}>Organize your ad campaigns by project.</p>
          </div>
          <button onClick={() => setShowCreate(true)}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", background: "var(--gradient-1)", border: "none", borderRadius: 8, color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
            <Plus size={16} /> New Project
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
              style={{ borderColor: "var(--accent-blue)", borderTopColor: "transparent" }} />
          </div>
        ) : !Array.isArray(projects) || projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4"
            style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16 }}>
            <FolderOpen size={48} style={{ color: "var(--text-subtle)" }} />
            <p style={{ color: "var(--text-muted)", fontSize: 15 }}>No projects yet</p>
            <button onClick={() => setShowCreate(true)}
              style={{ padding: "10px 24px", background: "var(--gradient-1)", border: "none", borderRadius: 8, color: "#fff", fontWeight: 600, cursor: "pointer" }}>
              Create First Project
            </button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
            {(projects as any[]).map((p: any) => (
              <div key={p.id} style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 20, position: "relative", transition: "border-color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent-blue)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}>
                <div className="flex items-start justify-between mb-3">
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--gradient-1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <FolderOpen size={18} color="#fff" />
                  </div>
                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (confirm("Delete this project?")) remove.mutate(p.id); }}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 4 }}>
                    <Trash2 size={14} />
                  </button>
                </div>
                <p style={{ fontWeight: 600, fontSize: 15, color: "var(--text-primary)", margin: "0 0 4px" }}>{p.name}</p>
                <p style={{ fontSize: 12, color: "var(--text-muted)", margin: "0 0 16px" }}>
                  Created {new Date(p.createdAt).toLocaleDateString()}
                </p>
                <Link to={`/dashboard/projects/${p.id}`}>
                  <button className="flex items-center gap-1 w-full justify-center"
                    style={{ padding: "8px 0", background: "var(--bg-surface-alt)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)", fontSize: 13, cursor: "pointer", fontWeight: 500 }}>
                    Open <ChevronRight size={14} />
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
      {showCreate && <CreateProjectModal onClose={() => setShowCreate(false)} />}
    </DashboardLayout>
  );
}
