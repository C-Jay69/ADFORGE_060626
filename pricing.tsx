import { useState } from "react";
import { Link } from "wouter";
import { Check, Zap, ArrowRight } from "lucide-react";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";

const PLANS = [
  {
    id: "free", name: "Free", monthly: 0, annual: 0, period: "forever",
    description: "Try it out, no card needed",
    features: ["3 video minutes/month", "5 AI actors", "720p exports", "1 project", "Community support"],
    cta: "Start Free", href: "/signup", accent: "var(--border)",
  },
  {
    id: "starter", name: "Starter", monthly: 29, annual: 23, period: "month",
    description: "For solo creators & freelancers",
    features: ["30 video minutes/month", "All 25+ AI actors", "1080p exports", "Unlimited projects", "Script AI generator", "Email support"],
    cta: "Get Started", href: "/signup", accent: "var(--accent-blue)",
  },
  {
    id: "growth", name: "Growth", monthly: 79, annual: 63, period: "month",
    description: "For growing brands & agencies",
    features: ["90 video minutes/month", "All AI actors", "4K exports", "Custom branding", "Team workspace (3 seats)", "Priority support", "Analytics dashboard"],
    cta: "Get Started", href: "/signup", accent: "var(--accent-purple)", popular: true,
  },
  {
    id: "agency", name: "Agency", monthly: 199, annual: 159, period: "month",
    description: "For agencies & large teams",
    features: ["300 video minutes/month", "All AI actors", "4K exports", "White-label exports", "Unlimited team seats", "API access", "Dedicated account manager", "Custom actor training"],
    cta: "Contact Sales", href: "mailto:sales@adforge.io", accent: "var(--accent-cyan)",
  },
];

const FAQ = [
  { q: "What counts as a video minute?", a: "Each minute of rendered ad video counts toward your monthly limit. Rendering a 30-second ad uses 0.5 minutes." },
  { q: "Can I roll over unused minutes?", a: "No — minutes reset on the 1st of each month. Unused minutes don't carry over." },
  { q: "Can I switch plans anytime?", a: "Yes. Upgrades take effect immediately; downgrades apply at your next billing cycle." },
  { q: "Is there a free trial for paid plans?", a: "The Free plan is your trial — no time limit. Upgrade whenever you're ready." },
  { q: "Do you offer refunds?", a: "We offer a 7-day money-back guarantee for new subscribers on any paid plan." },
  { q: "What file formats do you export?", a: "MP4 (H.264) for all plans. Agency plan also supports ProRes for post-production workflows." },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh", color: "var(--text-primary)" }}>
      <Navbar />

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px 120px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span style={{ display: "inline-block", fontSize: 12, fontWeight: 700, padding: "4px 14px", borderRadius: 99, background: "rgba(59,130,246,0.1)", color: "var(--accent-blue)", border: "1px solid rgba(59,130,246,0.2)", marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>
            Pricing
          </span>
          <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 800, margin: "0 0 16px", lineHeight: 1.1 }}>
            Simple, transparent pricing
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: 18, maxWidth: 480, margin: "0 auto 28px" }}>
            Scale your ad production without scaling your team.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-3">
            <span style={{ fontSize: 14, color: annual ? "var(--text-muted)" : "var(--text-primary)", fontWeight: annual ? 400 : 600 }}>Monthly</span>
            <button onClick={() => setAnnual(!annual)}
              style={{ width: 48, height: 26, borderRadius: 99, background: annual ? "var(--accent-blue)" : "var(--bg-surface-alt)", border: "1px solid var(--border)", cursor: "pointer", position: "relative", transition: "background 0.2s" }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: annual ? 25 : 3, transition: "left 0.2s" }} />
            </button>
            <span style={{ fontSize: 14, color: annual ? "var(--text-primary)" : "var(--text-muted)", fontWeight: annual ? 600 : 400 }}>
              Annual <span style={{ color: "#22C55E", fontSize: 12, marginLeft: 4 }}>Save 20%</span>
            </span>
          </div>
        </div>

        {/* Plans */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20, marginBottom: 80 }}>
          {PLANS.map((plan) => (
            <div key={plan.id}
              style={{ background: "var(--bg-surface)", border: `2px solid ${plan.popular ? "var(--accent-blue)" : "var(--border)"}`, borderRadius: 16, padding: 28, position: "relative", transition: "transform 0.2s, border-color 0.2s" }}
              onMouseEnter={(e) => { if (!plan.popular) (e.currentTarget as HTMLElement).style.borderColor = plan.accent; }}
              onMouseLeave={(e) => { if (!plan.popular) (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}>
              {plan.popular && (
                <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: "var(--accent-blue)", color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 14px", borderRadius: 99, whiteSpace: "nowrap" }}>
                  MOST POPULAR
                </div>
              )}
              <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 18, color: "var(--text-primary)", margin: "0 0 4px" }}>{plan.name}</p>
              <p style={{ fontSize: 13, color: "var(--text-muted)", margin: "0 0 16px" }}>{plan.description}</p>
              <div className="flex items-end gap-1 mb-4">
                <span style={{ fontFamily: "Syne, sans-serif", fontSize: 38, fontWeight: 800, color: "var(--text-primary)", lineHeight: 1 }}>
                  {plan.monthly === 0 ? "Free" : `$${annual ? plan.annual : plan.monthly}`}
                </span>
                {plan.monthly > 0 && (
                  <span style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 4 }}>/ {plan.period}</span>
                )}
              </div>
              {annual && plan.monthly > 0 && (
                <p style={{ fontSize: 12, color: "#22C55E", margin: "-8px 0 12px" }}>
                  Save ${(plan.monthly - plan.annual) * 12}/year
                </p>
              )}
              <div className="flex flex-col gap-2.5 mb-6">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-start gap-2">
                    <Check size={14} style={{ color: plan.accent === "var(--border)" ? "var(--accent-blue)" : plan.accent, flexShrink: 0, marginTop: 1 }} />
                    <span style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5 }}>{f}</span>
                  </div>
                ))}
              </div>
              <Link to={plan.href}>
                <button style={{ width: "100%", padding: "12px 0", background: plan.popular ? "var(--gradient-1)" : "transparent", border: `1px solid ${plan.popular ? "transparent" : "var(--border)"}`, borderRadius: 10, color: plan.popular ? "#fff" : "var(--text-primary)", fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={(e) => { if (!plan.popular) (e.currentTarget as HTMLButtonElement).style.borderColor = plan.accent; }}
                  onMouseLeave={(e) => { if (!plan.popular) (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)"; }}>
                  {plan.cta}
                </button>
              </Link>
            </div>
          ))}
        </div>

        {/* Comparison note */}
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <p style={{ color: "var(--text-muted)", fontSize: 14 }}>
            All plans include unlimited script drafts, audio waveform sync, and 24/7 rendering.
            Need a custom plan? <a href="mailto:sales@adforge.io" style={{ color: "var(--accent-blue)" }}>Talk to us →</a>
          </p>
        </div>

        {/* FAQ */}
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 28, fontWeight: 700, textAlign: "center", marginBottom: 36 }}>
            Frequently asked questions
          </h2>
          <div className="flex flex-col gap-4">
            {FAQ.map((item) => (
              <div key={item.q} style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 20 }}>
                <p style={{ fontWeight: 600, fontSize: 15, color: "var(--text-primary)", margin: "0 0 8px" }}>{item.q}</p>
                <p style={{ fontSize: 14, color: "var(--text-muted)", margin: 0, lineHeight: 1.6 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: "center", marginTop: 80 }}>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 32, fontWeight: 800, marginBottom: 12 }}>
            Ready to make more ads, faster?
          </h2>
          <p style={{ color: "var(--text-muted)", marginBottom: 28, fontSize: 16 }}>Start free — no credit card required.</p>
          <Link to="/signup">
            <button className="flex items-center gap-2 mx-auto"
              style={{ padding: "14px 32px", background: "var(--gradient-1)", border: "none", borderRadius: 10, color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>
              Start Free <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
