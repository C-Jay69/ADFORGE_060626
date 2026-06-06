import { Link } from "wouter";
import { Zap, FileText, ArrowRight, CheckCircle, Sparkles, RefreshCw, Copy } from "lucide-react";
import { Navbar } from "../../components/navbar";
import { Footer } from "../../components/footer";

const FEATURES = [
  { icon: Sparkles, title: "AI Hook Generator", desc: "Generate dozens of scroll-stopping opening lines tuned for your niche, product, and platform." },
  { icon: RefreshCw, title: "Tone Variants", desc: "One product brief → multiple scripts in Energetic, Calm, Professional, or Gen-Z voice modes." },
  { icon: Copy, title: "Script Templates", desc: "Start from proven structures: Problem/Agitate/Solve, Testimonial, Before & After, and more." },
  { icon: FileText, title: "Script Library", desc: "Save, organize, and reuse scripts across campaigns. Never start from scratch again." },
  { icon: Zap, title: "Real-time Editing", desc: "Edit scripts inline and preview timing estimates before committing to a render." },
  { icon: CheckCircle, title: "Platform Compliance", desc: "Automatic checks for platform-specific word limits, CTA placement, and forbidden phrases." },
];

export default function ScriptStudioFeaturePage() {
  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh", color: "var(--text-primary)" }}>
      <Navbar />
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px 120px" }}>
        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <span style={{ display: "inline-block", fontSize: 12, fontWeight: 700, padding: "4px 14px", borderRadius: 99, background: "rgba(99,102,241,0.1)", color: "var(--accent-purple)", border: "1px solid rgba(99,102,241,0.2)", marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>
            Script Studio
          </span>
          <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 800, margin: "0 0 16px", lineHeight: 1.1 }}>
            Write scripts that <span className="gradient-text">actually convert</span>
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: 18, maxWidth: 520, margin: "0 auto 32px", lineHeight: 1.7 }}>
            AI-powered script writing built specifically for performance ads. From hook to CTA in seconds.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/signup">
              <button className="flex items-center gap-2"
                style={{ padding: "13px 28px", background: "var(--gradient-1)", border: "none", borderRadius: 10, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
                Try Script Studio <ArrowRight size={16} />
              </button>
            </Link>
          </div>
        </div>

        {/* Mock UI */}
        <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden", marginBottom: 80 }}>
          <div style={{ background: "var(--bg-surface-alt)", borderBottom: "1px solid var(--border)", padding: "12px 20px", display: "flex", gap: 6 }}>
            {["#EF4444", "#F59E0B", "#22C55E"].map((c) => (
              <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 280 }}>
            <div style={{ padding: 24, borderRight: "1px solid var(--border)" }}>
              <p style={{ fontSize: 11, color: "var(--text-subtle)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 12px" }}>Product Brief</p>
              <div className="flex flex-col gap-3">
                {[["Product", "AirMax Pro Running Shoes"], ["Platform", "TikTok"], ["Tone", "Energetic"], ["Duration", "30s"]].map(([l, v]) => (
                  <div key={l}>
                    <p style={{ fontSize: 11, color: "var(--text-muted)", margin: "0 0 4px" }}>{l}</p>
                    <div style={{ padding: "8px 12px", background: "var(--bg-surface-alt)", borderRadius: 6, border: "1px solid var(--border)", fontSize: 13, color: "var(--text-primary)" }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding: 24 }}>
              <div className="flex items-center justify-between mb-3">
                <p style={{ fontSize: 11, color: "var(--text-subtle)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, margin: 0 }}>Generated Script</p>
                <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 99, background: "rgba(34,197,94,0.1)", color: "#22C55E" }}>AI</span>
              </div>
              <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.8, fontFamily: "monospace" }}>
                <p style={{ color: "var(--accent-blue)", margin: "0 0 8px" }}>[HOOK]</p>
                <p style={{ margin: "0 0 12px" }}>POV: You finally stopped making excuses and laced up.</p>
                <p style={{ color: "var(--accent-purple)", margin: "0 0 8px" }}>[BODY]</p>
                <p style={{ margin: "0 0 12px" }}>AirMax Pro isn't just a shoe — it's the last excuse you'll need to get out there. Carbon-fiber plate, zero-drop heel, and they look clean enough to wear off the track.</p>
                <p style={{ color: "var(--accent-cyan)", margin: "0 0 8px" }}>[CTA]</p>
                <p style={{ margin: 0 }}>Link in bio. 20% off this week only.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 80 }}>
          {FEATURES.map((f) => (
            <div key={f.title} style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 24, transition: "border-color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent-purple)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(139,92,246,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                <f.icon size={18} style={{ color: "var(--accent-purple)" }} />
              </div>
              <p style={{ fontWeight: 700, fontSize: 15, color: "var(--text-primary)", margin: "0 0 6px" }}>{f.title}</p>
              <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0, lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", padding: "60px 24px", background: "var(--bg-surface)", borderRadius: 20, border: "1px solid var(--border)" }}>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Stop staring at blank pages</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: 28, fontSize: 15 }}>Your first 3 video minutes are free. No card required.</p>
          <Link to="/signup">
            <button style={{ padding: "13px 32px", background: "var(--gradient-1)", border: "none", borderRadius: 10, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
              Get Started Free
            </button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
