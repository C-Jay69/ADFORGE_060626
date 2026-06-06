import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Users2, Mail, Trash2, Crown, X } from "lucide-react";
import { DashboardLayout } from "../../components/dashboard-layout";
import { authClient } from "../../lib/auth";

const ROLE_COLORS: Record<string, { bg: string; color: string }> = {
  owner: { bg: "rgba(251,146,60,0.1)", color: "#FB923C" },
  admin: { bg: "rgba(139,92,246,0.1)", color: "var(--accent-purple)" },
  member: { bg: "rgba(59,130,246,0.1)", color: "var(--accent-blue)" },
};

function InviteModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("member");

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 }}>
      <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 28, width: 420, maxWidth: "90vw" }}>
        <div className="flex items-center justify-between mb-5">
          <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 18, color: "var(--text-primary)", margin: 0 }}>Invite Member</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}><X size={20} /></button>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <label style={{ fontSize: 13, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>Email address</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="teammate@company.com" type="email"
              style={{ width: "100%", padding: "10px 14px", background: "var(--bg-surface-alt)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
          </div>
          <div>
            <label style={{ fontSize: 13, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}
              style={{ width: "100%", padding: "10px 14px", background: "var(--bg-surface-alt)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)", fontSize: 14, outline: "none", appearance: "none" }}>
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div style={{ background: "rgba(59,130,246,0.05)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 8, padding: 12 }}>
            <p style={{ fontSize: 12, color: "var(--text-muted)", margin: 0 }}>
              Team invitations require the <strong style={{ color: "var(--accent-blue)" }}>Growth plan</strong> or higher.
              <a href="/dashboard/billing" style={{ color: "var(--accent-blue)", marginLeft: 4 }}>Upgrade →</a>
            </p>
          </div>
          <button
            onClick={() => alert("Upgrade to Growth plan to invite teammates.")}
            style={{ padding: 11, background: "var(--gradient-1)", border: "none", borderRadius: 8, color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
            Send Invite
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TeamPage() {
  const [showInvite, setShowInvite] = useState(false);
  const { data: session } = authClient.useSession();

  const currentUser = {
    id: session?.user?.id ?? "1",
    name: session?.user?.name ?? "You",
    email: session?.user?.email ?? "",
    role: "owner",
    joinedAt: new Date().toISOString(),
  };

  return (
    <DashboardLayout>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: 24, fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>Team</h1>
            <p style={{ color: "var(--text-muted)", fontSize: 14, marginTop: 4 }}>Manage workspace members</p>
          </div>
          <button onClick={() => setShowInvite(true)}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", background: "var(--gradient-1)", border: "none", borderRadius: 8, color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
            <Plus size={16} /> Invite Member
          </button>
        </div>

        {/* Plan note */}
        <div style={{ background: "rgba(59,130,246,0.05)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 12, padding: 16, marginBottom: 24 }}>
          <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0 }}>
            You're on the <strong style={{ color: "var(--text-primary)" }}>Free plan</strong> — upgrade to Growth or Agency to add team members.
            <a href="/dashboard/billing" style={{ color: "var(--accent-blue)", marginLeft: 6 }}>View plans →</a>
          </p>
        </div>

        {/* Members list */}
        <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)" }}>
            <p style={{ fontWeight: 600, fontSize: 14, color: "var(--text-primary)", margin: 0 }}>Members (1)</p>
          </div>
          <div style={{ padding: 20 }}>
            <div className="flex items-center gap-4">
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--gradient-1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>{currentUser.name[0]?.toUpperCase()}</span>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 600, fontSize: 14, color: "var(--text-primary)", margin: "0 0 1px" }}>
                  {currentUser.name} <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 400 }}>(you)</span>
                </p>
                <p style={{ fontSize: 12, color: "var(--text-muted)", margin: 0 }}>{currentUser.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <Crown size={13} style={{ color: "#FB923C" }} />
                <span style={{ fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 99, background: ROLE_COLORS.owner.bg, color: ROLE_COLORS.owner.color }}>
                  Owner
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Invite link section */}
        <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 20, marginTop: 16 }}>
          <p style={{ fontWeight: 600, fontSize: 14, color: "var(--text-primary)", margin: "0 0 4px" }}>Invite Link</p>
          <p style={{ fontSize: 13, color: "var(--text-muted)", margin: "0 0 12px" }}>Share a link to invite people to your workspace (Growth+ only)</p>
          <div className="flex gap-2">
            <input readOnly value="https://adforge.io/invite/abc123" style={{ flex: 1, padding: "9px 14px", background: "var(--bg-surface-alt)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-muted)", fontSize: 13, outline: "none" }} />
            <button onClick={() => alert("Upgrade to unlock invite links.")}
              style={{ padding: "9px 16px", background: "var(--gradient-1)", border: "none", borderRadius: 8, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
              Copy
            </button>
          </div>
        </div>
      </div>
      {showInvite && <InviteModal onClose={() => setShowInvite(false)} />}
    </DashboardLayout>
  );
}
