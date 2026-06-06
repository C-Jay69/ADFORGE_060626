import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, FileText, Trash2, Copy, Zap, X, Search } from "lucide-react";
import { DashboardLayout } from "../../components/dashboard-layout";
import { api } from "../../lib/api";

function NewScriptModal({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const qc = useQueryClient();
  const create = useMutation({
    mutationFn: async () => {
      const r = await api.scripts.$post({ json: { title, content, tone: "neutral" } });
      return r.json();
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["scripts"] }); onClose(); },
  });

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 }}>
      <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 28, width: 560, maxWidth: "90vw" }}>
        <div className="flex items-center justify-between mb-5">
          <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 18, color: "var(--text-primary)", margin: 0 }}>New Script</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}><X size={20} /></button>
        </div>
        <div className="flex flex-col gap-4">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Script title..."
            style={{ width: "100%", padding: "10px 14px", background: "var(--bg-surface-alt)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
          <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Script content..." rows={8}
            style={{ width: "100%", padding: "10px 14px", background: "var(--bg-surface-alt)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)", fontSize: 14, outline: "none", resize: "vertical", fontFamily: "monospace", lineHeight: 1.6, boxSizing: "border-box" }} />
          <button onClick={() => title.trim() && create.mutate()} disabled={create.isPending || !title.trim()}
            style={{ padding: 11, background: "var(--gradient-1)", border: "none", borderRadius: 8, color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer", opacity: !title.trim() ? 0.5 : 1 }}>
            {create.isPending ? "Saving..." : "Save Script"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ScriptsPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [search, setSearch] = useState("");
  const qc = useQueryClient();

  const { data: scripts, isLoading } = useQuery({
    queryKey: ["scripts"],
    queryFn: async () => { const r = await api.scripts.$get(); return r.json(); },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const r = await (api.scripts as any)[":id"].$delete({ param: { id } });
      return r.json();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["scripts"] }),
  });

  const filtered = Array.isArray(scripts)
    ? (scripts as any[]).filter((s: any) => !search || s.title?.toLowerCase().includes(search.toLowerCase()) || s.content?.toLowerCase().includes(search.toLowerCase()))
    : [];

  return (
    <DashboardLayout>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: 24, fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>Scripts</h1>
            <p style={{ color: "var(--text-muted)", fontSize: 14, marginTop: 4 }}>Your ad script library</p>
          </div>
          <button onClick={() => setShowCreate(true)}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", background: "var(--gradient-1)", border: "none", borderRadius: 8, color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
            <Plus size={16} /> New Script
          </button>
        </div>

        <div style={{ position: "relative", marginBottom: 20 }}>
          <Search size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search scripts..."
            style={{ width: "100%", padding: "10px 14px 10px 36px", background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
              style={{ borderColor: "var(--accent-blue)", borderTopColor: "transparent" }} />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4"
            style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16 }}>
            <FileText size={48} style={{ color: "var(--text-subtle)" }} />
            <p style={{ color: "var(--text-muted)", fontSize: 15 }}>No scripts yet</p>
            <button onClick={() => setShowCreate(true)}
              style={{ padding: "10px 24px", background: "var(--gradient-1)", border: "none", borderRadius: 8, color: "#fff", fontWeight: 600, cursor: "pointer" }}>
              Write First Script
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((s: any) => (
              <div key={s.id} style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 20, transition: "border-color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent-blue)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}>
                <div className="flex items-start justify-between gap-4">
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="flex items-center gap-2 mb-1">
                      <FileText size={14} style={{ color: "var(--accent-blue)", flexShrink: 0 }} />
                      <p style={{ fontWeight: 600, fontSize: 14, color: "var(--text-primary)", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.title}</p>
                    </div>
                    <p style={{ fontSize: 13, color: "var(--text-muted)", margin: "0 0 8px", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as any }}>
                      {s.content}
                    </p>
                    <span style={{ fontSize: 11, color: "var(--text-subtle)" }}>{new Date(s.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => navigator.clipboard.writeText(s.content)}
                      style={{ padding: "7px 10px", background: "var(--bg-surface-alt)", border: "1px solid var(--border)", borderRadius: 7, color: "var(--text-muted)", cursor: "pointer" }}>
                      <Copy size={13} />
                    </button>
                    <button onClick={() => confirm("Delete?") && remove.mutate(s.id)}
                      style={{ padding: "7px 10px", background: "var(--bg-surface-alt)", border: "1px solid var(--border)", borderRadius: 7, color: "var(--text-muted)", cursor: "pointer" }}>
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {showCreate && <NewScriptModal onClose={() => setShowCreate(false)} />}
    </DashboardLayout>
  );
}
