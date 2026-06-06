import { useQuery } from "@tanstack/react-query";
import { Zap, CreditCard, TrendingUp, Check, ExternalLink } from "lucide-react";
import { DashboardLayout } from "../../components/dashboard-layout";

const PLANS = [
  {
    id: "free", name: "Free", price: 0, period: "forever",
    features: ["3 video minutes/month", "5 AI actors", "720p exports", "Community support"],
    gradient: "var(--border)", cta: "Current Plan",
  },
  {
    id: "starter", name: "Starter", price: 29, period: "month",
    features: ["30 video minutes/month", "All AI actors", "1080p exports", "Email support", "Script AI generator"],
    gradient: "var(--gradient-1)", cta: "Upgrade",
  },
  {
    id: "growth", name: "Growth", price: 79, period: "month",
    features: ["90 video minutes/month", "All AI actors", "4K exports", "Priority support", "Custom branding", "Team workspace (3 seats)"],
    gradient: "var(--gradient-2)", cta: "Upgrade", popular: true,
  },
  {
    id: "agency", name: "Agency", price: 199, period: "month",
    features: ["300 video minutes/month", "All AI actors", "4K exports", "Dedicated support", "White-label exports", "Unlimited team seats", "API access"],
    gradient: "linear-gradient(135deg, #06B6D4, #6366F1)", cta: "Upgrade",
  },
];

export default function BillingPage() {
  return (
    <DashboardLayout>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div className="mb-8">
          <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: 24, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 4px" }}>Billing</h1>
          <p style={{ color: "var(--text-muted)", fontSize: 14, margin: 0 }}>Manage your plan and usage</p>
        </div>

        {/* Current usage */}
        <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p style={{ fontWeight: 600, fontSize: 15, color: "var(--text-primary)", margin: "0 0 2px" }}>Current Plan: <span style={{ color: "var(--accent-blue)" }}>Free</span></p>
              <p style={{ color: "var(--text-muted)", fontSize: 13, margin: 0 }}>Resets on July 1, 2026</p>
            </div>
            <span style={{ padding: "4px 12px", borderRadius: 99, background: "rgba(59,130,246,0.1)", color: "var(--accent-blue)", fontSize: 12, fontWeight: 600, border: "1px solid rgba(59,130,246,0.2)" }}>
              FREE
            </span>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <Zap size={15} style={{ color: "var(--accent-blue)" }} />
            <span style={{ fontSize: 13, color: "var(--text-muted)" }}>Video minutes: <strong style={{ color: "var(--text-primary)" }}>1 / 3</strong></span>
          </div>
          <div style={{ background: "var(--bg-surface-alt)", borderRadius: 999, height: 6 }}>
            <div style={{ width: "33%", height: "100%", background: "var(--gradient-1)", borderRadius: 999 }} />
          </div>
        </div>

        {/* Invoices stub */}
        <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div className="flex items-center justify-between mb-4">
            <p style={{ fontWeight: 600, fontSize: 15, color: "var(--text-primary)", margin: 0 }}>Payment History</p>
          </div>
          <div className="flex flex-col items-center py-8 gap-2">
            <CreditCard size={32} style={{ color: "var(--text-subtle)" }} />
            <p style={{ color: "var(--text-muted)", fontSize: 14, margin: 0 }}>No invoices yet — you're on the free plan</p>
          </div>
        </div>

        {/* Plans grid */}
        <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 17, fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>Upgrade Plan</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          {PLANS.map((plan) => (
            <div key={plan.id}
              style={{ background: "var(--bg-surface)", border: `2px solid ${plan.popular ? "var(--accent-blue)" : "var(--border)"}`, borderRadius: 14, padding: 20, position: "relative" }}>
              {plan.popular && (
                <span style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)", fontSize: 11, fontWeight: 700, padding: "3px 12px", borderRadius: 99, background: "var(--accent-blue)", color: "#fff", whiteSpace: "nowrap" }}>
                  MOST POPULAR
                </span>
              )}
              <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 16, color: "var(--text-primary)", margin: "0 0 4px" }}>{plan.name}</p>
              <div className="flex items-end gap-1 mb-4">
                <span style={{ fontSize: 26, fontWeight: 800, fontFamily: "Syne, sans-serif", color: "var(--text-primary)" }}>
                  {plan.price === 0 ? "Free" : `$${plan.price}`}
                </span>
                {plan.price > 0 && <span style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 4 }}>/{plan.period}</span>}
              </div>
              <div className="flex flex-col gap-2 mb-5">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <Check size={12} style={{ color: "var(--accent-blue)", flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{f}</span>
                  </div>
                ))}
              </div>
              <button
                disabled={plan.id === "free"}
                style={{ width: "100%", padding: "9px 0", background: plan.id === "free" ? "var(--bg-surface-alt)" : plan.gradient, border: plan.id === "free" ? "1px solid var(--border)" : "none", borderRadius: 8, color: plan.id === "free" ? "var(--text-muted)" : "#fff", fontSize: 13, fontWeight: 600, cursor: plan.id === "free" ? "default" : "pointer", transition: "opacity 0.2s" }}
                onMouseEnter={(e) => { if (plan.id !== "free") (e.currentTarget as HTMLButtonElement).style.opacity = "0.85"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
