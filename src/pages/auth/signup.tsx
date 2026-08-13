import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Zap, Mail, Lock, User, Eye, EyeOff, Check } from "lucide-react";
import { authClient, captureToken } from "../lib/auth";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [, navigate] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setLoading(true);
    try {
      const res = await authClient.signUp.email({ name, email, password }, { onSuccess: captureToken });
      if (res.error) {
        setError(res.error.message ?? "Sign up failed");
      } else {
        navigate("/onboarding");
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 hero-mesh">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "var(--gradient-1)" }}>
            <Zap size={18} className="text-white" fill="white" />
          </div>
          <span className="font-black text-xl" style={{ fontFamily: "Syne, sans-serif" }}>AdForge</span>
        </div>

        <div className="rounded-2xl p-8"
          style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
          <h1 className="text-2xl font-black mb-2" style={{ fontFamily: "Syne, sans-serif" }}>
            Create your account
          </h1>
          <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
            Free tier — no credit card required
          </p>

          {/* Free tier perks */}
          <div className="flex flex-col gap-2 mb-8 p-4 rounded-xl"
            style={{ background: "var(--bg-surface-alt)", border: "1px solid var(--border)" }}>
            {["3 minutes of free video output", "Access to 25 AI actors", "No watermark on preview"].map((perk) => (
              <div key={perk} className="flex items-center gap-2 text-xs">
                <Check size={12} style={{ color: "var(--accent-blue)" }} />
                <span style={{ color: "var(--text-muted)" }}>{perk}</span>
              </div>
            ))}
          </div>

          {error && (
            <div className="mb-6 px-4 py-3 rounded-xl text-sm"
              style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#F87171" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-medium mb-2" style={{ color: "var(--text-muted)" }}>
                Full Name
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--text-muted)" }} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  className="w-full pl-9 pr-4 py-3 rounded-xl text-sm transition-all outline-none"
                  style={{ background: "var(--bg-surface-alt)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--accent-blue)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium mb-2" style={{ color: "var(--text-muted)" }}>
                Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--text-muted)" }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="w-full pl-9 pr-4 py-3 rounded-xl text-sm transition-all outline-none"
                  style={{ background: "var(--bg-surface-alt)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--accent-blue)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium mb-2" style={{ color: "var(--text-muted)" }}>
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--text-muted)" }} />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  required
                  className="w-full pl-9 pr-10 py-3 rounded-xl text-sm transition-all outline-none"
                  style={{ background: "var(--bg-surface-alt)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--accent-blue)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--text-muted)" }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-bold transition-all mt-2 disabled:opacity-60"
              style={{ background: "var(--gradient-1)", color: "white" }}>
              {loading ? "Creating account..." : "Create Free Account"}
            </button>
          </form>

          <p className="text-xs text-center mt-4" style={{ color: "var(--text-subtle)" }}>
            By signing up you agree to our{" "}
            <Link to="/terms" style={{ color: "var(--text-muted)" }}>Terms</Link> and{" "}
            <Link to="/privacy" style={{ color: "var(--text-muted)" }}>Privacy Policy</Link>.
          </p>
        </div>

        <p className="text-center text-sm mt-6" style={{ color: "var(--text-muted)" }}>
          Already have an account?{" "}
          <Link to="/login" className="font-medium" style={{ color: "var(--accent-blue)" }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
