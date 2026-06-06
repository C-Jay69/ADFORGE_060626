import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Play, Plus, Users, FileText } from "lucide-react";
import { DashboardLayout } from "../../components/dashboard-layout";
import { api } from "../../lib/api";

const MOCK_HOOKS = [
  "Did you know this changes everything?",
  "Stop scrolling — this is for you",
  "I wasted $10k until I found this",
  "The secret nobody talks about",
];

const MOCK_ACTORS = [
  { id: "1", name: "Jordan M.", avatar: null, style: "energetic" },
  { id: "2", name: "Sofia L.", avatar: null, style: "calm" },
  { id: "3", name: "Alex T.", avatar: null, style: "professional" },
];

function GridCell({ hook, actor }: { hook: string; actor: typeof MOCK_ACTORS[0] }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg cursor-pointer transition-all"
      style={{ background: "var(--bg-surface-alt)", border: "1px solid var(--border)", minHeight: 100, position: "relative" }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent-blue)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}>
      <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--gradient-1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Play size={12} color="#fff" />
      </div>
      <p style={{ fontSize: 11, color: "var(--text-muted)", textAlign: "center", margin: 0, lineHeight: 1.4 }}>
        {hook.slice(0, 28)}…
      </p>
      <span style={{ fontSize: 10, color: "var(--text-subtle)", padding: "2px 6px", background: "var(--bg-surface)", borderRadius: 99, border: "1px solid var(--border)" }}>
        {actor.name}
      </span>
    </div>
  );
}

export default function CampaignPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <DashboardLayout>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="flex items-center gap-3 mb-2">
          <Link to="/dashboard/projects" style={{ color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 4, fontSize: 13 }}>
            <ArrowLeft size={14} /> Back
          </Link>
        </div>

        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: 22, fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>Campaign Matrix</h1>
            <p style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 4 }}>Hooks × Actors — each cell = one ad variant</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2"
              style={{ padding: "9px 16px", background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)", fontSize: 13, cursor: "pointer" }}>
              <FileText size={14} /> Add Hook
            </button>
            <button className="flex items-center gap-2"
              style={{ padding: "9px 16px", background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)", fontSize: 13, cursor: "pointer" }}>
              <Users size={14} /> Add Actor
            </button>
            <Link to="/dashboard/create">
              <button className="flex items-center gap-2"
                style={{ padding: "9px 16px", background: "var(--gradient-1)", border: "none", borderRadius: 8, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                <Plus size={14} /> Generate All
              </button>
            </Link>
          </div>
        </div>

        {/* Matrix grid */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 8 }}>
            <thead>
              <tr>
                <th style={{ width: 140, textAlign: "left", padding: "8px 12px", color: "var(--text-muted)", fontSize: 12, fontWeight: 600 }}>Hook \ Actor</th>
                {MOCK_ACTORS.map((a) => (
                  <th key={a.id} style={{ padding: "8px 4px", color: "var(--text-primary)", fontSize: 13, fontWeight: 600, textAlign: "center" }}>
                    <div className="flex flex-col items-center gap-1">
                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--gradient-2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Users size={14} color="#fff" />
                      </div>
                      {a.name}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCK_HOOKS.map((hook, hi) => (
                <tr key={hi}>
                  <td style={{ padding: "4px 12px", verticalAlign: "middle" }}>
                    <p style={{ fontSize: 12, color: "var(--text-muted)", margin: 0, lineHeight: 1.4 }}>{hook.slice(0, 32)}…</p>
                  </td>
                  {MOCK_ACTORS.map((actor) => (
                    <td key={actor.id} style={{ padding: 4, verticalAlign: "top" }}>
                      <GridCell hook={hook} actor={actor} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={{ color: "var(--text-subtle)", fontSize: 12, marginTop: 16, textAlign: "center" }}>
          {MOCK_HOOKS.length * MOCK_ACTORS.length} variants · click any cell to preview · generate all to render
        </p>
      </div>
    </DashboardLayout>
  );
}
