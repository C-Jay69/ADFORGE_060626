import { Link } from "wouter";
import { ArrowRight, Users, Globe, Mic, Zap, Star, ShieldCheck } from "lucide-react";
import { Navbar } from "../../components/navbar";
import { Footer } from "../../components/footer";

const ACTOR_SAMPLES = [
  { name: "Jordan M.", style: "Energetic", lang: "EN", tags: ["TikTok", "Meta"], gradient: "linear-gradient(135deg, #3B82F6, #6366F1)" },
  { name: "Sofia L.", style: "Calm & Trust", lang: "EN/ES", tags: ["YouTube", "LinkedIn"], gradient: "linear-gradient(135deg, #EC4899, #8B5CF6)" },
  { name: "Marcus T.", style: "Professional", lang: "EN", tags: ["B2B", "SaaS"], gradient: "linear-gradient(135deg, #06B6D4, #3B82F6)" },
  { name: "Yuki A.", style: "Gen-Z", lang: "EN/JP", tags: ["TikTok", "Reels"], gradient: "linear-gradient(135deg, #F59E0B, #EF4444)" },
  { name: "Priya N.", style: "Luxury", lang: "EN", tags: ["Fashion", "Beauty"], gradient: "linear-gradient(135deg, #8B5CF6, #EC4899)" },
  { name: "Carlos R.", style: "Conversational", lang: "ES/EN", tags: ["All platforms"], gradient: "linear-gradient(135deg, #22C55E, #06B6D4)" },
];

const FEATURES = [
  { icon: Users, title: "25+ unique actors", desc: "Diverse cast across ages, styles, and backgrounds — someone for every brand." },
  { icon: Globe, title: "Multilingual", desc: "Actors that speak English, Spanish, French, Portuguese, and more natively." },
  { icon: Mic, title: "Cloned voices", desc: "Every actor has a unique synthetic voice trained for ad delivery, not just reading." },
  { icon: Zap, title: "Instant preview", desc: "30-second voice preview before committing to a render." },
  { icon: Star, title: "Style matching", desc: "Filter by energy, tone, and content type to find the perfect fit." },
  { icon: ShieldCheck, title: "Licensed & cleared", desc: "All actors are fully licensed for commercial advertising use. No legal surprises." },
];

export default function ActorLibraryFeaturePage() {
  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh", color: "var(--text-primary)" }}>
      <Navbar />
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px 120px" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <span style={{ display: "inline-block", fontSize: 12, fontWeight: 700, padding: "4px 14px", borderRadius: 99, background: "rgba(236,72,153,0.1)", color: "var(--accent-pink)", border: "1px solid rgba(236,72,153,0.2)", marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>
            Actor Library
          </span>
          <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 800, margin: "0 0 16px", lineHeight: 1.1 }}>
            AI actors that <span className="gradient-text-2">feel real</span>
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: 18, maxWidth: 520, margin: "0 auto 32px", lineHeight: 1.7 }}>
            25+ AI-powered actors, ready to deliver your script with the energy, tone, and style your brand needs.
          </p>
          <Link to="/signup">
            <button className="flex items-center gap-2 mx-auto"
              style={{ padding: "13px 28px", background: "var(--gradient-2)", border: "none", borderRadius: 10, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
              Browse Actors <ArrowRight size={16} />
            </button>
          </Link>
        </div>

        {/* Actor grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 16, marginBottom: 80 }}>
          {ACTOR_SAMPLES.map((a) => (
            <div key={a.name} style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", transition: "border-color 0.2s, transform 0.2s", cursor: "pointer" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-pink)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.transform = "none"; }}>
              <div style={{ aspectRatio: "3/4", background: a.gradient, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Users size={32} color="rgba(255,255,255,0.4)" />
              </div>
              <div style={{ padding: 12 }}>
                <p style={{ fontWeight: 700, fontSize: 13, color: "var(--text-primary)", margin: "0 0 2px" }}>{a.name}</p>
                <p style={{ fontSize: 11, color: "var(--text-muted)", margin: "0 0 8px" }}>{a.style} · {a.lang}</p>
                <div className="flex flex-wrap gap-1">
                  {a.tags.map((t) => (
                    <span key={t} style={{ fontSize: 9, padding: "2px 6px", borderRadius: 99, background: "var(--bg-surface-alt)", border: "1px solid var(--border)", color: "var(--text-subtle)" }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 80 }}>
          {FEATURES.map((f) => (
            <div key={f.title} style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 24, transition: "border-color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent-pink)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(236,72,153,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                <f.icon size={18} style={{ color: "var(--accent-pink)" }} />
              </div>
              <p style={{ fontWeight: 700, fontSize: 15, color: "var(--text-primary)", margin: "0 0 6px" }}>{f.title}</p>
              <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0, lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", padding: "60px 24px", background: "var(--bg-surface)", borderRadius: 20, border: "1px solid var(--border)" }}>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Meet your new brand spokesperson</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: 28, fontSize: 15 }}>No hiring. No shoots. No revisions back-and-forth.</p>
          <Link to="/signup">
            <button style={{ padding: "13px 32px", background: "var(--gradient-2)", border: "none", borderRadius: 10, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
              Start Free
            </button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
