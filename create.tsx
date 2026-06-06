import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ChevronRight, ChevronLeft, Zap, Users, FileText, Settings, Check } from "lucide-react";
import { DashboardLayout } from "../../components/dashboard-layout";
import { api } from "../../lib/api";

const STEPS = [
  { id: 1, label: "Product", icon: Settings },
  { id: 2, label: "Script", icon: FileText },
  { id: 3, label: "Actor", icon: Users },
  { id: 4, label: "Generate", icon: Zap },
];

const ASPECT_RATIOS = ["9:16", "16:9", "1:1", "4:5"];
const TONES = ["Energetic", "Calm", "Professional", "Humorous", "Emotional", "Direct"];
const PLATFORMS = ["TikTok", "Meta", "YouTube", "Instagram", "LinkedIn"];
const DURATIONS = ["15s", "30s", "60s", "90s"];

function StepBar({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {STEPS.map((s, i) => (
        <div key={s.id} className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div style={{
              width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
              background: step > s.id ? "var(--accent-blue)" : step === s.id ? "var(--gradient-1)" : "var(--bg-surface-alt)",
              border: step === s.id ? "none" : "1px solid var(--border)",
              transition: "all 0.3s"
            }}>
              {step > s.id ? <Check size={14} color="#fff" /> : <s.icon size={14} color={step >= s.id ? "#fff" : "var(--text-muted)"} />}
            </div>
            <span style={{ fontSize: 13, color: step >= s.id ? "var(--text-primary)" : "var(--text-muted)", fontWeight: step === s.id ? 600 : 400 }}>
              {s.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div style={{ width: 32, height: 1, background: step > s.id ? "var(--accent-blue)" : "var(--border)", marginLeft: 4 }} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function CreateAdPage() {
  const [step, setStep] = useState(1);
  const [, navigate] = useLocation();

  // Step 1
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [platform, setPlatform] = useState("TikTok");
  const [duration, setDuration] = useState("30s");

  // Step 2
  const [scriptText, setScriptText] = useState("");
  const [tone, setTone] = useState("Energetic");
  const [generating, setGenerating] = useState(false);

  // Step 3
  const [selectedActor, setSelectedActor] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState("9:16");

  const { data: actors } = useQuery({
    queryKey: ["actors"],
    queryFn: async () => { const r = await api.actors.$get(); return r.json(); },
  });

  // Fetch user's projects so we can attach the ad to the first one
  const { data: projectsData } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => { const r = await api.projects.$get(); return r.json(); },
  });

  const [generateError, setGenerateError] = useState<string | null>(null);

  const generate = useMutation({
    mutationFn: async () => {
      setGenerateError(null);

      // 1. Grab or use first available project
      const projects = (projectsData as any)?.projects ?? [];
      let projectId: string | null = projects[0]?.id ?? null;

      // 2. Create a throw-away campaign under that project (or without one)
      const campRes = await api.campaigns.$post({
        json: {
          name: `${productName || "Ad"} — ${new Date().toLocaleDateString()}`,
          objective: "CONVERSIONS",
          platforms: [platform],
          projectId,
        },
      });
      const campData = await campRes.json() as any;
      if (!campRes.ok) throw new Error(campData?.error ?? "Failed to create campaign");
      const campaignId: string = campData.campaign.id;

      // 3. Save the script
      const scriptRes = await api.scripts.$post({
        json: {
          campaignId,
          hook: scriptText.split("\n")[0] ?? scriptText.slice(0, 120),
          body: scriptText,
          cta: "",
          tone,
          aiGenerated: false,
        },
      });
      const scriptData = await scriptRes.json() as any;
      if (!scriptRes.ok) throw new Error(scriptData?.error ?? "Failed to save script");
      const scriptId: string = scriptData.script.id;

      // 4. Create the ad
      const adRes = await api.ads.$post({
        json: {
          campaignId,
          scriptId,
          actorId: selectedActor!,
          format: aspectRatio === "9:16" ? "VERTICAL" : aspectRatio === "16:9" ? "HORIZONTAL" : "SQUARE",
          hasSubtitles: false,
          hasBRoll: false,
          hasMusic: false,
          language: "en",
        },
      });
      const adData = await adRes.json() as any;
      if (!adRes.ok) throw new Error(adData?.error ?? "Failed to queue ad");
      return adData;
    },
    onSuccess: () => navigate("/dashboard/exports"),
    onError: (err: any) => setGenerateError(err?.message ?? "Something went wrong"),
  });

  const handleGenerateScript = () => {
    setGenerating(true);
    setTimeout(() => {
      setScriptText(`[HOOK]\n${productName ? `Are you tired of struggling without ${productName}?` : "Stop everything — you need to see this."}\n\n[BODY]\n${productDesc || "This product has completely changed the game. Here's why everyone is talking about it..."}\n\n[CTA]\nClick the link in bio to get yours before it's gone.`);
      setGenerating(false);
    }, 1200);
  };

  const inputStyle = { width: "100%", padding: "10px 14px", background: "var(--bg-surface-alt)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)", fontSize: 14, outline: "none", boxSizing: "border-box" as const };
  const labelStyle = { fontSize: 13, color: "var(--text-muted)", display: "block" as const, marginBottom: 6, fontWeight: 500 as const };

  return (
    <DashboardLayout>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: 24, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 24px" }}>Create Ad</h1>
        <StepBar step={step} />

        <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 32, minHeight: 360 }}>
          {/* Step 1: Product */}
          {step === 1 && (
            <div className="flex flex-col gap-5">
              <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>Product Info</h2>
              <div>
                <label style={labelStyle}>Product / Brand Name</label>
                <input value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="e.g. AirMax Pro" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Description</label>
                <textarea value={productDesc} onChange={(e) => setProductDesc(e.target.value)} placeholder="What does it do? Who is it for?" rows={3}
                  style={{ ...inputStyle, resize: "vertical" as const }} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={labelStyle}>Platform</label>
                  <select value={platform} onChange={(e) => setPlatform(e.target.value)} style={{ ...inputStyle, appearance: "none" }}>
                    {PLATFORMS.map((p) => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Duration</label>
                  <select value={duration} onChange={(e) => setDuration(e.target.value)} style={{ ...inputStyle, appearance: "none" }}>
                    {DURATIONS.map((d) => <option key={d}>{d}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Script */}
          {step === 2 && (
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>Script</h2>
                <button onClick={handleGenerateScript} disabled={generating}
                  style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "var(--gradient-1)", border: "none", borderRadius: 8, color: "#fff", fontSize: 13, cursor: "pointer", opacity: generating ? 0.7 : 1 }}>
                  <Zap size={13} /> {generating ? "Generating..." : "AI Generate"}
                </button>
              </div>
              <div>
                <label style={labelStyle}>Tone</label>
                <div className="flex flex-wrap gap-2">
                  {TONES.map((t) => (
                    <button key={t} onClick={() => setTone(t)}
                      style={{ padding: "6px 14px", borderRadius: 99, border: "1px solid", fontSize: 13, cursor: "pointer", transition: "all 0.2s",
                        borderColor: tone === t ? "var(--accent-blue)" : "var(--border)",
                        background: tone === t ? "rgba(59,130,246,0.1)" : "var(--bg-surface-alt)",
                        color: tone === t ? "var(--accent-blue)" : "var(--text-muted)" }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label style={labelStyle}>Script</label>
                <textarea value={scriptText} onChange={(e) => setScriptText(e.target.value)}
                  placeholder="Write your ad script here, or use AI Generate above..."
                  rows={10} style={{ ...inputStyle, resize: "vertical" as const, fontFamily: "monospace", lineHeight: 1.6 }} />
              </div>
            </div>
          )}

          {/* Step 3: Actor */}
          {step === 3 && (
            <div className="flex flex-col gap-5">
              <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>Choose Actor</h2>
              <div>
                <label style={labelStyle}>Aspect Ratio</label>
                <div className="flex gap-2">
                  {ASPECT_RATIOS.map((r) => (
                    <button key={r} onClick={() => setAspectRatio(r)}
                      style={{ padding: "6px 14px", borderRadius: 8, border: "1px solid", fontSize: 13, cursor: "pointer",
                        borderColor: aspectRatio === r ? "var(--accent-blue)" : "var(--border)",
                        background: aspectRatio === r ? "rgba(59,130,246,0.1)" : "var(--bg-surface-alt)",
                        color: aspectRatio === r ? "var(--accent-blue)" : "var(--text-muted)" }}>
                      {r}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 12 }}>
                {Array.isArray(actors) && (actors as any[]).slice(0, 12).map((actor: any) => (
                  <div key={actor.id} onClick={() => setSelectedActor(actor.id)}
                    style={{ padding: 12, borderRadius: 10, border: "2px solid", cursor: "pointer", transition: "all 0.2s",
                      borderColor: selectedActor === actor.id ? "var(--accent-blue)" : "var(--border)",
                      background: selectedActor === actor.id ? "rgba(59,130,246,0.05)" : "var(--bg-surface-alt)" }}>
                    <div style={{ width: "100%", aspectRatio: "1", borderRadius: 8, overflow: "hidden", marginBottom: 8, background: "var(--bg-primary)" }}>
                      <img src={actor.thumbnailUrl} alt={actor.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
                    </div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", margin: "0 0 2px" }}>{actor.name}</p>
                    <p style={{ fontSize: 11, color: "var(--text-muted)", margin: 0 }}>{actor.style}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Generate */}
          {step === 4 && (
            <div className="flex flex-col items-center justify-center gap-6 py-8">
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: "var(--gradient-1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Zap size={32} color="#fff" />
              </div>
              <div style={{ textAlign: "center" }}>
                <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 22, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 8px" }}>Ready to Generate</h2>
                <p style={{ color: "var(--text-muted)", fontSize: 14, margin: 0 }}>Your ad will be rendered and available in Exports.</p>
              </div>
              <div style={{ background: "var(--bg-surface-alt)", border: "1px solid var(--border)", borderRadius: 12, padding: 16, width: "100%", maxWidth: 360 }}>
                {[
                  ["Platform", platform],
                  ["Duration", duration],
                  ["Tone", tone],
                  ["Actor", selectedActor ?? "Not selected"],
                  ["Aspect Ratio", aspectRatio],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-1.5" style={{ borderBottom: "1px solid var(--border)" }}>
                    <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{k}</span>
                    <span style={{ fontSize: 13, color: "var(--text-primary)", fontWeight: 500 }}>{v}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => generate.mutate()}
                disabled={generate.isPending || !selectedActor || !scriptText}
                style={{ padding: "14px 48px", background: "var(--gradient-1)", border: "none", borderRadius: 10, color: "#fff", fontWeight: 700, fontSize: 16, cursor: "pointer", opacity: (generate.isPending || !selectedActor || !scriptText) ? 0.6 : 1 }}>
                {generate.isPending ? "Generating…" : "Generate Ad"}
              </button>
              {generateError && (
                <p style={{ color: "#ef4444", fontSize: 13, textAlign: "center", margin: 0, background: "rgba(239,68,68,0.08)", padding: "10px 16px", borderRadius: 8, border: "1px solid rgba(239,68,68,0.2)" }}>
                  {generateError}
                </p>
              )}
              {!selectedActor && (
                <p style={{ color: "var(--text-muted)", fontSize: 12, textAlign: "center", margin: 0 }}>
                  Go back to Step 3 and select an actor
                </p>
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setStep((s) => s - 1)} disabled={step === 1}
            className="flex items-center gap-2"
            style={{ padding: "10px 20px", background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)", fontSize: 14, cursor: "pointer", opacity: step === 1 ? 0.4 : 1 }}>
            <ChevronLeft size={16} /> Back
          </button>
          {step < 4 && (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="flex items-center gap-2"
              style={{ padding: "10px 20px", background: "var(--gradient-1)", border: "none", borderRadius: 8, color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
              Next <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
