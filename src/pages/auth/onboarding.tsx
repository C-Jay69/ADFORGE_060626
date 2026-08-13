import { useState } from "react";
import { useLocation } from "wouter";
import { Zap, ArrowRight } from "lucide-react";
import { authClient } from "../lib/auth";
import { useMutation } from "@tanstack/react-query";
import { api } from "../lib/api";

const AD_TYPES = [
  { value: "ecommerce", label: "Physical product / E-commerce", icon: "📦" },
  { value: "saas", label: "SaaS / App", icon: "💻" },
  { value: "course", label: "Course / Digital product", icon: "🎓" },
  { value: "service", label: "Service / Agency", icon: "🏢" },
  { value: "other", label: "Other", icon: "✨" },
];

const PLATFORMS = ["TikTok", "Meta", "YouTube", "Instagram", "LinkedIn", "Pinterest"];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [workspaceName, setWorkspaceName] = useState("");
  const [adType, setAdType] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [, navigate] = useLocation();
  const { data: session } = authClient.useSession();

  const createWorkspace = useMutation({
    mutationFn: async () => {
      const res = await api.workspaces.$post({ json: { name: workspaceName || `${session?.user?.name ?? "My"}'s Workspace` } });
      return res.json();
    },
    onSuccess: async (data: any) => {
      // Create first project
      if (data.workspace) {
        await api.projects.$post({
          json: {
            name: `${workspaceName || "My Brand"} — First Project`,
            workspaceId: data.workspace.id,
          },
        });
      }
      navigate("/dashboard");
    },
  });

  const togglePlatform = (p: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 hero-mesh">
      <div className="w-full max-w-lg">
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "var(--gradient-1)" }}>
            <Zap size={18} className="text-white" fill="white" />
          </div>
          <span className="font-black text-xl" style={{ fontFamily: "Syne, sans-serif" }}>AdForge</span>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-2 justify-center mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  background: step >= s ? "var(--gradient-1)" : "var(--bg-surface-alt)",
                  color: step >= s ? "white" : "var(--text-muted)",
                  border: step >= s ? "none" : "1px solid var(--border)",
                }}>
                {s}
              </div>
              {s < 3 && <div className="w-8 h-px" style={{ background: step > s ? "var(--accent-blue)" : "var(--border)" }} />}
            </div>
          ))}
        </div>

        <div className="rounded-2xl p-8" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
          {step === 1 && (
            <>
              <h2 className="text-2xl font-black mb-2" style={{ fontFamily: "Syne, sans-serif" }}>
                Set up your workspace
              </h2>
              <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>This takes 30 seconds.</p>
              <div className="mb-6">
                <label className="block text-xs font-medium mb-2" style={{ color: "var(--text-muted)" }}>
                  Workspace name (your brand or company)
                </label>
                <input
                  type="text"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  placeholder={`${session?.user?.name ?? "My"}'s Brand`}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: "var(--bg-surface-alt)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--accent-blue)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
              </div>
              <button onClick={() => setStep(2)}
                className="w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
                style={{ background: "var(--gradient-1)", color: "white" }}>
                Continue <ArrowRight size={16} />
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-2xl font-black mb-2" style={{ fontFamily: "Syne, sans-serif" }}>
                What are you advertising?
              </h2>
              <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>We'll optimize your experience.</p>
              <div className="flex flex-col gap-3 mb-8">
                {AD_TYPES.map((t) => (
                  <button key={t.value} onClick={() => setAdType(t.value)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-left transition-all"
                    style={{
                      background: adType === t.value ? "rgba(59,130,246,0.1)" : "var(--bg-surface-alt)",
                      border: adType === t.value ? "1px solid var(--accent-blue)" : "1px solid var(--border)",
                      color: "var(--text-primary)",
                    }}>
                    <span>{t.icon}</span>
                    {t.label}
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="px-4 py-3 rounded-xl text-sm"
                  style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}>
                  Back
                </button>
                <button onClick={() => setStep(3)}
                  className="flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
                  style={{ background: "var(--gradient-1)", color: "white" }}>
                  Continue <ArrowRight size={16} />
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-2xl font-black mb-2" style={{ fontFamily: "Syne, sans-serif" }}>
                Which platforms do you run ads on?
              </h2>
              <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>Select all that apply.</p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {PLATFORMS.map((p) => (
                  <button key={p} onClick={() => togglePlatform(p)}
                    className="px-4 py-3 rounded-xl text-sm font-medium transition-all"
                    style={{
                      background: selectedPlatforms.includes(p) ? "rgba(59,130,246,0.1)" : "var(--bg-surface-alt)",
                      border: selectedPlatforms.includes(p) ? "1px solid var(--accent-blue)" : "1px solid var(--border)",
                      color: selectedPlatforms.includes(p) ? "var(--text-primary)" : "var(--text-muted)",
                    }}>
                    {p}
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="px-4 py-3 rounded-xl text-sm"
                  style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}>
                  Back
                </button>
                <button
                  onClick={() => createWorkspace.mutate()}
                  disabled={createWorkspace.isPending}
                  className="flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-60"
                  style={{ background: "var(--gradient-1)", color: "white" }}>
                  {createWorkspace.isPending ? "Setting up..." : "Go to Dashboard →"}
                </button>
              </div>
              <button onClick={() => navigate("/dashboard")}
                className="w-full text-center text-xs mt-3"
                style={{ color: "var(--text-subtle)" }}>
                Skip setup, take me to dashboard
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
