import { Link } from "wouter";
import { ArrowRight, Scissors, Type, Image, Layers, Wand2, Download, Play } from "lucide-react";
import { Navbar } from "../../components/navbar";
import { Footer } from "../../components/footer";

const FEATURES = [
  { icon: Scissors, title: "Non-destructive Cutting", desc: "Trim, split, and rearrange clips without ever touching your original footage." },
  { icon: Type, title: "Animated Captions", desc: "Auto-generated captions with 10+ animation presets. Perfectly synced to speech." },
  { icon: Image, title: "B-roll & Overlays", desc: "Drop in product shots, logos, and stock media from your asset library." },
  { icon: Layers, title: "Multi-track Timeline", desc: "Video, audio, captions, and overlays — all on separate tracks for full control." },
  { icon: Wand2, title: "One-click Polish", desc: "Auto color grade, noise reduction, and loudness normalization before export." },
  { icon: Download, title: "Platform-ready Export", desc: "Export in the right specs for TikTok, Meta, YouTube Shorts, and more — in one click." },
];

export default function VideoEditorFeaturePage() {
  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh", color: "var(--text-primary)" }}>
      <Navbar />
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px 120px" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <span style={{ display: "inline-block", fontSize: 12, fontWeight: 700, padding: "4px 14px", borderRadius: 99, background: "rgba(6,182,212,0.1)", color: "var(--accent-cyan)", border: "1px solid rgba(6,182,212,0.2)", marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>
            Video Editor
          </span>
          <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 800, margin: "0 0 16px", lineHeight: 1.1 }}>
            Edit faster than your <span className="gradient-text">competition ships</span>
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: 18, maxWidth: 520, margin: "0 auto 32px", lineHeight: 1.7 }}>
            A timeline editor purpose-built for short-form ads. No bloat, no learning curve.
          </p>
          <Link to="/signup">
            <button className="flex items-center gap-2 mx-auto"
              style={{ padding: "13px 28px", background: "var(--gradient-1)", border: "none", borderRadius: 10, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
              Try the Editor <ArrowRight size={16} />
            </button>
          </Link>
        </div>

        {/* Mock editor screenshot */}
        <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden", marginBottom: 80 }}>
          <div style={{ background: "var(--bg-surface-alt)", borderBottom: "1px solid var(--border)", padding: "12px 20px", display: "flex", alignItems: "center", gap: 12 }}>
            {["#EF4444", "#F59E0B", "#22C55E"].map((c) => <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />)}
            <span style={{ fontSize: 12, color: "var(--text-subtle)", marginLeft: 8 }}>Summer Sale Hook v3 — AdForge Editor</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "48px 1fr 200px", height: 320 }}>
            {/* Tools */}
            <div style={{ background: "var(--bg-surface)", borderRight: "1px solid var(--border)", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "8px 0" }}>
              {[Scissors, Type, Image, Layers].map((Icon, i) => (
                <div key={i} style={{ width: 36, height: 36, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", background: i === 0 ? "var(--bg-surface-alt)" : "transparent", border: i === 0 ? "1px solid var(--accent-blue)" : "none" }}>
                  <Icon size={15} style={{ color: i === 0 ? "var(--accent-blue)" : "var(--text-muted)" }} />
                </div>
              ))}
            </div>
            {/* Canvas */}
            <div style={{ background: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 120, height: 213, background: "var(--bg-surface)", borderRadius: 8, border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <Play size={24} style={{ color: "var(--text-subtle)" }} />
                <div style={{ position: "absolute", bottom: 24, left: 8, right: 8, background: "rgba(0,0,0,0.6)", borderRadius: 4, padding: "3px 6px" }}>
                  <p style={{ fontSize: 9, color: "#fff", margin: 0, textAlign: "center" }}>Stop scrolling — this is for you</p>
                </div>
              </div>
            </div>
            {/* Properties */}
            <div style={{ background: "var(--bg-surface)", borderLeft: "1px solid var(--border)", padding: 16 }}>
              <p style={{ fontSize: 10, color: "var(--text-subtle)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 12px" }}>Caption</p>
              {[["Text", "Stop scrolling"], ["Font", "Syne Bold"], ["Size", "24px"], ["Animation", "Slide Up"]].map(([l, v]) => (
                <div key={l} style={{ marginBottom: 10 }}>
                  <p style={{ fontSize: 10, color: "var(--text-muted)", margin: "0 0 3px" }}>{l}</p>
                  <div style={{ padding: "5px 8px", background: "var(--bg-surface-alt)", borderRadius: 5, border: "1px solid var(--border)", fontSize: 11, color: "var(--text-primary)" }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 80 }}>
          {FEATURES.map((f) => (
            <div key={f.title} style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 24 }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent-cyan)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(6,182,212,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                <f.icon size={18} style={{ color: "var(--accent-cyan)" }} />
              </div>
              <p style={{ fontWeight: 700, fontSize: 15, color: "var(--text-primary)", margin: "0 0 6px" }}>{f.title}</p>
              <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0, lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", padding: "60px 24px", background: "var(--bg-surface)", borderRadius: 20, border: "1px solid var(--border)" }}>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Your first ad is free</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: 28, fontSize: 15 }}>3 video minutes on us, no card required.</p>
          <Link to="/signup">
            <button style={{ padding: "13px 32px", background: "var(--gradient-1)", border: "none", borderRadius: 10, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
              Start Editing Free
            </button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
