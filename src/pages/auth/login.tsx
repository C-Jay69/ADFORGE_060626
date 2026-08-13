import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Zap, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { authClient, captureToken } from "../lib/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [, navigate] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await authClient.signIn.email({ email, password }, { onSuccess: captureToken });
      if (res.error) {
        setError(res.error.message ?? "Invalid credentials");
      } else {
        navigate("/dashboard");
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
            Welcome back
          </h1>
          <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>
            Sign in to your AdForge account
          </p>

          {error && (
            <div className="mb-6 px-4 py-3 rounded-xl text-sm"
              style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#F87171" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                  style={{
                    background: "var(--bg-surface-alt)",
                    border: "1px solid var(--border)",
                    color: "var(--text-primary)",
                  }}
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
                  placeholder="••••••••"
                  required
                  className="w-full pl-9 pr-10 py-3 rounded-xl text-sm transition-all outline-none"
                  style={{
                    background: "var(--bg-surface-alt)",
                    border: "1px solid var(--border)",
                    color: "var(--text-primary)",
                  }}
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
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm mt-6" style={{ color: "var(--text-muted)" }}>
          Don't have an account?{" "}
          <Link to="/signup" className="font-medium" style={{ color: "var(--accent-blue)" }}>
            Start free — no card required
          </Link>
        </p>
      </div>
    </div>
  );
}
