import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Save, User, Lock, Bell, Trash2 } from "lucide-react";
import { DashboardLayout } from "../../components/dashboard-layout";
import { authClient } from "../../lib/auth";

type Tab = "profile" | "password" | "notifications" | "danger";

const TABS: { id: Tab; label: string; icon: any }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "password", label: "Password", icon: Lock },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "danger", label: "Danger Zone", icon: Trash2 },
];

const inputStyle = {
  width: "100%", padding: "10px 14px", background: "var(--bg-surface-alt)", border: "1px solid var(--border)",
  borderRadius: 8, color: "var(--text-primary)", fontSize: 14, outline: "none", boxSizing: "border-box" as const,
};
const labelStyle = { fontSize: 13, color: "var(--text-muted)", display: "block" as const, marginBottom: 6, fontWeight: 500 as const };

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>("profile");
  const { data: session } = authClient.useSession();

  const [name, setName] = useState(session?.user?.name ?? "");
  const [email] = useState(session?.user?.email ?? "");
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [notifs, setNotifs] = useState({ exports: true, billing: true, team: false, marketing: false });

  const updateProfile = useMutation({
    mutationFn: async () => authClient.updateUser({ name }),
  });

  const changePass = useMutation({
    mutationFn: async () => {
      if (newPass !== confirmPass) throw new Error("Passwords don't match");
      return authClient.changePassword({ currentPassword: currentPass, newPassword: newPass });
    },
    onSuccess: () => { setCurrentPass(""); setNewPass(""); setConfirmPass(""); },
  });

  return (
    <DashboardLayout>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: 24, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 24px" }}>Settings</h1>

        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 24, alignItems: "start" }}>
          {/* Sidebar */}
          <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 8 }}>
            {TABS.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className="flex items-center gap-3 w-full text-left"
                style={{ padding: "10px 12px", borderRadius: 8, border: "none", background: tab === t.id ? "var(--bg-surface-alt)" : "transparent",
                  color: tab === t.id ? "var(--text-primary)" : "var(--text-muted)", fontSize: 13, fontWeight: tab === t.id ? 600 : 400, cursor: "pointer" }}>
                <t.icon size={14} /> {t.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 28 }}>
            {tab === "profile" && (
              <div className="flex flex-col gap-5">
                <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 17, fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>Profile</h2>
                <div>
                  <label style={labelStyle}>Full Name</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input value={email} readOnly style={{ ...inputStyle, opacity: 0.6 }} />
                  <p style={{ fontSize: 11, color: "var(--text-subtle)", marginTop: 4 }}>Email changes coming soon</p>
                </div>
                <button onClick={() => updateProfile.mutate()} disabled={updateProfile.isPending}
                  className="flex items-center gap-2 self-start"
                  style={{ padding: "10px 20px", background: "var(--gradient-1)", border: "none", borderRadius: 8, color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
                  <Save size={14} /> {updateProfile.isPending ? "Saving..." : "Save Changes"}
                </button>
                {updateProfile.isSuccess && <p style={{ color: "#22C55E", fontSize: 13 }}>Profile updated!</p>}
              </div>
            )}

            {tab === "password" && (
              <div className="flex flex-col gap-5">
                <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 17, fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>Change Password</h2>
                {[["Current Password", currentPass, setCurrentPass], ["New Password", newPass, setNewPass], ["Confirm New Password", confirmPass, setConfirmPass]].map(([label, val, set]) => (
                  <div key={label as string}>
                    <label style={labelStyle}>{label as string}</label>
                    <input type="password" value={val as string} onChange={(e) => (set as any)(e.target.value)} style={inputStyle} />
                  </div>
                ))}
                <button onClick={() => changePass.mutate()} disabled={changePass.isPending || !currentPass || !newPass}
                  className="flex items-center gap-2 self-start"
                  style={{ padding: "10px 20px", background: "var(--gradient-1)", border: "none", borderRadius: 8, color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer", opacity: !currentPass || !newPass ? 0.5 : 1 }}>
                  <Lock size={14} /> {changePass.isPending ? "Updating..." : "Update Password"}
                </button>
                {changePass.isError && <p style={{ color: "#EF4444", fontSize: 13 }}>{(changePass.error as Error)?.message}</p>}
                {changePass.isSuccess && <p style={{ color: "#22C55E", fontSize: 13 }}>Password updated!</p>}
              </div>
            )}

            {tab === "notifications" && (
              <div className="flex flex-col gap-5">
                <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 17, fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>Notifications</h2>
                {([
                  ["exports", "Export completed", "Get notified when your ads finish rendering"],
                  ["billing", "Billing alerts", "Usage limits and payment reminders"],
                  ["team", "Team activity", "When teammates create or share ads"],
                  ["marketing", "Product updates", "New features and announcements"],
                ] as [keyof typeof notifs, string, string][]).map(([key, label, desc]) => (
                  <div key={key} className="flex items-center justify-between py-3" style={{ borderBottom: "1px solid var(--border)" }}>
                    <div>
                      <p style={{ fontWeight: 500, fontSize: 14, color: "var(--text-primary)", margin: "0 0 2px" }}>{label}</p>
                      <p style={{ fontSize: 12, color: "var(--text-muted)", margin: 0 }}>{desc}</p>
                    </div>
                    <button
                      onClick={() => setNotifs((n) => ({ ...n, [key]: !n[key] }))}
                      style={{ width: 44, height: 24, borderRadius: 99, border: "none", cursor: "pointer", transition: "background 0.2s", position: "relative",
                        background: notifs[key] ? "var(--accent-blue)" : "var(--bg-surface-alt)" }}>
                      <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", position: "absolute", top: 3,
                        left: notifs[key] ? 23 : 3, transition: "left 0.2s" }} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {tab === "danger" && (
              <div className="flex flex-col gap-5">
                <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 17, fontWeight: 700, color: "#EF4444", margin: 0 }}>Danger Zone</h2>
                <div style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 10, padding: 20 }}>
                  <p style={{ fontWeight: 600, fontSize: 14, color: "var(--text-primary)", margin: "0 0 4px" }}>Delete Account</p>
                  <p style={{ fontSize: 13, color: "var(--text-muted)", margin: "0 0 16px" }}>Permanently delete your account and all data. This cannot be undone.</p>
                  <button
                    onClick={() => confirm("Are you absolutely sure? This cannot be undone.") && alert("Please contact support to delete your account.")}
                    style={{ padding: "9px 18px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 8, color: "#EF4444", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
                    <Trash2 size={13} style={{ display: "inline", marginRight: 6 }} />
                    Delete My Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
