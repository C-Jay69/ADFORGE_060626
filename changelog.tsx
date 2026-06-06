import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { Zap, Bug, Star, ArrowUpRight } from "lucide-react";

const ENTRIES = [
  {
    date: "June 5, 2026",
    version: "v0.9.0",
    type: "major",
    title: "Public Beta Launch",
    items: [
      { type: "new", text: "AI ad creation wizard with 4-step flow" },
      { type: "new", text: "25 AI actors across 6 languages" },
      { type: "new", text: "Script Studio with AI hook generation" },
      { type: "new", text: "Video editor with multi-track timeline" },
      { type: "new", text: "Project and campaign organization" },
      { type: "new", text: "Exports dashboard with download management" },
    ],
  },
  {
    date: "May 20, 2026",
    version: "v0.8.2",
    type: "minor",
    title: "Performance & Polish",
    items: [
      { type: "fix", text: "Fixed render queue getting stuck on long scripts" },
      { type: "fix", text: "Caption timing offset corrected for 60s+ videos" },
      { type: "improvement", text: "Actor preview loads 2x faster" },
      { type: "improvement", text: "Dashboard overview stats now update in real-time" },
    ],
  },
  {
    date: "May 8, 2026",
    version: "v0.8.0",
    type: "minor",
    title: "Team Workspaces",
    items: [
      { type: "new", text: "Invite teammates to your workspace (Growth+ plan)" },
      { type: "new", text: "Role-based permissions: Owner, Admin, Member" },
      { type: "new", text: "Shared project and script libraries" },
      { type: "improvement", text: "Billing page now shows per-seat usage breakdown" },
    ],
  },
  {
    date: "April 22, 2026",
    version: "v0.7.1",
    type: "patch",
    title: "Bug Fixes",
    items: [
      { type: "fix", text: "Fixed sign-up email verification not sending on some providers" },
      { type: "fix", text: "Resolved white screen on onboarding step 2" },
      { type: "fix", text: "Actor filter reset on page navigation" },
    ],
  },
];

const TYPE_CONFIG = {
  new: { label: "New", color: "var(--accent-blue)", bg: "rgba(59,130,246,0.08)", icon: Star },
  fix: { label: "Fix", color: "#EF4444", bg: "rgba(239,68,68,0.08)", icon: Bug },
  improvement: { label: "Improved", color: "#22C55E", bg: "rgba(34,197,94,0.08)", icon: ArrowUpRight },
};

const VERSION_TYPE_CONFIG = {
  major: { label: "Major", color: "var(--accent-purple)", bg: "rgba(139,92,246,0.1)" },
  minor: { label: "Minor", color: "var(--accent-blue)", bg: "rgba(59,130,246,0.1)" },
  patch: { label: "Patch", color: "var(--text-muted)", bg: "var(--bg-surface-alt)" },
};

export default function ChangelogPage() {
  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh", color: "var(--text-primary)" }}>
      <Navbar />
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "80px 24px 120px" }}>
        <div style={{ marginBottom: 56 }}>
          <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: 40, fontWeight: 800, margin: "0 0 8px" }}>Changelog</h1>
          <p style={{ color: "var(--text-muted)", fontSize: 16, margin: 0 }}>What's new in AdForge</p>
        </div>

        <div style={{ position: "relative" }}>
          {/* Timeline line */}
          <div style={{ position: "absolute", left: 7, top: 8, bottom: 0, width: 2, background: "var(--border)" }} />

          <div className="flex flex-col gap-12">
            {ENTRIES.map((entry) => {
              const vConfig = VERSION_TYPE_CONFIG[entry.type as keyof typeof VERSION_TYPE_CONFIG];
              return (
                <div key={entry.version} style={{ paddingLeft: 32, position: "relative" }}>
                  {/* Dot */}
                  <div style={{ position: "absolute", left: 0, top: 6, width: 16, height: 16, borderRadius: "50%", background: "var(--bg-surface)", border: `3px solid ${vConfig.color}` }} />

                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <span style={{ fontFamily: "Syne, sans-serif", fontSize: 18, fontWeight: 700, color: "var(--text-primary)" }}>{entry.title}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 99, background: vConfig.bg, color: vConfig.color }}>{entry.version}</span>
                    <span style={{ fontSize: 12, color: "var(--text-subtle)" }}>{entry.date}</span>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    {entry.items.map((item, i) => {
                      const tConfig = TYPE_CONFIG[item.type as keyof typeof TYPE_CONFIG];
                      const Icon = tConfig.icon;
                      return (
                        <div key={i} className="flex items-start gap-3">
                          <span style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 99, background: tConfig.bg, color: tConfig.color, marginTop: 1, whiteSpace: "nowrap" }}>
                            <Icon size={10} /> {tConfig.label}
                          </span>
                          <span style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.6 }}>{item.text}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
