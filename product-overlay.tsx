import { Link } from "wouter";
import { ArrowRight, Layers, Package, Wand2, Palette, ShoppingCart, Zap } from "lucide-react";
import { Navbar } from "../../components/navbar";
import { Footer } from "../../components/footer";

const FEATURES = [
  { icon: Package, title: "Smart Product Insertion", desc: "Drop your product into any scene — AI handles lighting, shadows, and perspective matching." },
  { icon: Palette, title: "Brand Kit Integration", desc: "Upload your logo, colors, and fonts once. They auto-apply to every ad you create." },
  { icon: Wand2, title: "Background Removal", desc: "Automatic background removal for product images. Clean cutouts in one click." },
  { icon: Layers, title: "Layer Compositing", desc: "Stack product shots, text, actor, and background on separate layers with full control." },
  { icon: ShoppingCart, title: "Price Tags & CTAs", desc: "Dynamic overlays for pricing, discounts, and call-to-action buttons that animate in." },
  { icon: Zap, title: "Template Library", desc: "Start from 50+ ad overlay templates optimized for each platform and product type." },
];

export default function ProductOverlayFeaturePage() {
  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh", color: "var(--text-primary)" }}>
      <Navbar />
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px 120px" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <span style={{ display: "inline-block", fontSize: 12, fontWeight: 700, padding: "4px 14px", borderRadius: 99, background: "rgba(34,197,94,0.1)", color: "#22C55E", border: "1px solid rgba(34,197,94,0.2)", marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>
            Product Overlays
          </span>
          <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 800, margin: "0 0 16px", lineHeight: 1.1 }}>
            Your product, <span className="gradient-text">front and center</span>
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: 18, maxWidth: 520, margin: "0 auto 32px", lineHeight: 1.7 }}>
            Seamlessly blend your product into every ad frame. No Photoshop, no designer needed.
          </p>
          <Link to="/signup">
            <button className="flex items-center gap-2 mx-auto"
              style={{ padding: "13px 28px", background: "var(--gradient-1)", border: "none", borderRadius: 10, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
              Try Product Overlays <ArrowRight size={16} />
            </button>
          </Link>
        </div>

        {/* Visual demo */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 80 }}>
          {[
            { label: "Product image", sublabel: "Your upload", bg: "var(--bg-surface-alt)" },
            { label: "+", sublabel: "AI compositing", bg: "transparent" },
            { label: "Final ad frame", sublabel: "Ready to render", bg: "var(--gradient-1)" },
          ].map((card, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ height: 160, background: card.bg, border: i !== 1 ? "1px solid var(--border)" : "none", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                {i === 1 ? (
                  <span style={{ fontSize: 36, color: "var(--text-muted)" }}>→</span>
                ) : (
                  <Package size={40} style={{ color: i === 2 ? "rgba(255,255,255,0.6)" : "var(--text-subtle)" }} />
                )}
              </div>
              <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", margin: "0 0 2px" }}>{card.label}</p>
              <p style={{ fontSize: 11, color: "var(--text-muted)", margin: 0 }}>{card.sublabel}</p>
            </div>
          ))}
        </div>

        {/* Features */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 80 }}>
          {FEATURES.map((f) => (
            <div key={f.title} style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 24, transition: "border-color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#22C55E")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(34,197,94,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                <f.icon size={18} style={{ color: "#22C55E" }} />
              </div>
              <p style={{ fontWeight: 700, fontSize: 15, color: "var(--text-primary)", margin: "0 0 6px" }}>{f.title}</p>
              <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0, lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", padding: "60px 24px", background: "var(--bg-surface)", borderRadius: 20, border: "1px solid var(--border)" }}>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Make your product the star</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: 28, fontSize: 15 }}>Upload your product, pick an actor, and generate in minutes.</p>
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
