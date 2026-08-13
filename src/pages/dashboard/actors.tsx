import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Users, Play, Filter } from "lucide-react";
import { DashboardLayout } from "../../components/dashboard-layout";
import { api } from "../../lib/api";

const STYLE_FILTERS = ["All", "Energetic", "Calm", "Professional", "Conversational", "Luxury", "Gen-Z"];
const GENDER_FILTERS = ["All", "Male", "Female", "Non-binary"];
const LANGUAGE_FILTERS = ["All", "English", "Spanish", "French", "German", "Portuguese"];

export default function ActorsPage() {
  const [search, setSearch] = useState("");
  const [style, setStyle] = useState("All");
  const [gender, setGender] = useState("All");
  const [language, setLanguage] = useState("All");
  const [previewing, setPreviewing] = useState<string | null>(null);

  const { data: actors, isLoading } = useQuery({
    queryKey: ["actors"],
    queryFn: async () => { const r = await api.actors.$get(); return r.json(); },
  });

  const filtered = Array.isArray(actors)
    ? (actors as any[]).filter((a: any) => {
        const matchSearch = !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.style?.toLowerCase().includes(search.toLowerCase());
        const matchStyle = style === "All" || a.style === style;
        const matchGender = gender === "All" || a.gender === gender.toLowerCase();
        const matchLang = language === "All" || a.language === language;
        return matchSearch && matchStyle && matchGender && matchLang;
      })
    : [];

  const chipStyle = (active: boolean) => ({
    padding: "5px 12px", borderRadius: 99, fontSize: 12, cursor: "pointer", transition: "all 0.15s",
    border: "1px solid",
    borderColor: active ? "var(--accent-blue)" : "var(--border)",
    background: active ? "rgba(59,130,246,0.1)" : "var(--bg-surface-alt)",
    color: active ? "var(--accent-blue)" : "var(--text-muted)",
  });

  return (
    <DashboardLayout>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="mb-6">
          <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: 24, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 4px" }}>Actor Library</h1>
          <p style={{ color: "var(--text-muted)", fontSize: 14, margin: 0 }}>Browse AI actors for your ads</p>
        </div>

        {/* Search + Filters */}
        <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ position: "relative", marginBottom: 16 }}>
            <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search actors..."
              style={{ width: "100%", padding: "10px 14px 10px 38px", background: "var(--bg-surface-alt)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
          </div>
          <div className="flex flex-wrap gap-3">
            <div>
              <p style={{ fontSize: 11, color: "var(--text-subtle)", marginBottom: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Style</p>
              <div className="flex flex-wrap gap-1.5">
                {STYLE_FILTERS.map((f) => <button key={f} style={chipStyle(style === f)} onClick={() => setStyle(f)}>{f}</button>)}
              </div>
            </div>
            <div>
              <p style={{ fontSize: 11, color: "var(--text-subtle)", marginBottom: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Gender</p>
              <div className="flex flex-wrap gap-1.5">
                {GENDER_FILTERS.map((f) => <button key={f} style={chipStyle(gender === f)} onClick={() => setGender(f)}>{f}</button>)}
              </div>
            </div>
            <div>
              <p style={{ fontSize: 11, color: "var(--text-subtle)", marginBottom: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Language</p>
              <div className="flex flex-wrap gap-1.5">
                {LANGUAGE_FILTERS.map((f) => <button key={f} style={chipStyle(language === f)} onClick={() => setLanguage(f)}>{f}</button>)}
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
              style={{ borderColor: "var(--accent-blue)", borderTopColor: "transparent" }} />
          </div>
        ) : (
          <>
            <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 16 }}>{filtered.length} actors</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16 }}>
              {filtered.map((actor: any) => (
                <div key={actor.id} style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", transition: "all 0.2s", cursor: "pointer" }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent-blue)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}>
                  <div style={{ aspectRatio: "3/4", background: `linear-gradient(135deg, #1E2D45, #0F1623)`, overflow: "hidden", position: "relative" }}>
                    <img src={actor.thumbnailUrl} alt={actor.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
                    <button
                      onClick={() => setPreviewing(previewing === actor.id ? null : actor.id)}
                      style={{ position: "absolute", bottom: 8, right: 8, width: 32, height: 32, borderRadius: "50%", background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Play size={12} color="#fff" />
                    </button>
                    {actor.tags?.includes("new") && (
                      <span style={{ position: "absolute", top: 8, left: 8, fontSize: 10, padding: "2px 8px", borderRadius: 99, background: "var(--accent-blue)", color: "#fff", fontWeight: 700 }}>NEW</span>
                    )}
                  </div>
                  <div style={{ padding: 12 }}>
                    <p style={{ fontWeight: 600, fontSize: 14, color: "var(--text-primary)", margin: "0 0 2px" }}>{actor.name}</p>
                    <p style={{ fontSize: 11, color: "var(--text-muted)", margin: "0 0 8px" }}>{actor.style} · {actor.language ?? "English"}</p>
                    <button style={{ width: "100%", padding: "7px 0", background: "var(--gradient-1)", border: "none", borderRadius: 7, color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                      Use Actor
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
