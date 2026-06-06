import { useState, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward, Download, Scissors, Type, Image, Volume2, ZoomIn, ZoomOut, Save } from "lucide-react";
import { DashboardLayout } from "../../components/dashboard-layout";

const TIMELINE_TRACKS = [
  { id: "video", label: "Video", color: "var(--accent-blue)", clips: [{ start: 0, end: 28, label: "Actor clip" }] },
  { id: "audio", label: "Audio", color: "var(--accent-purple)", clips: [{ start: 0, end: 28, label: "Voiceover" }] },
  { id: "captions", label: "Captions", color: "var(--accent-cyan)", clips: [{ start: 2, end: 12, label: "Hook text" }, { start: 14, end: 26, label: "CTA text" }] },
  { id: "overlay", label: "Overlay", color: "#22C55E", clips: [{ start: 20, end: 28, label: "Logo" }] },
];

const TOOLS = [
  { icon: Scissors, label: "Cut" },
  { icon: Type, label: "Text" },
  { icon: Image, label: "Image" },
  { icon: Volume2, label: "Audio" },
];

const TOTAL_SECONDS = 30;

export default function EditorPage() {
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <DashboardLayout>
      <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 80px)", maxWidth: "100%", overflow: "hidden" }}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
          <div>
            <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: 16, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 1px" }}>Video Editor</h1>
            <p style={{ fontSize: 12, color: "var(--text-muted)", margin: 0 }}>Summer Sale Hook v3</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2"
              style={{ padding: "8px 14px", background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)", fontSize: 13, cursor: "pointer" }}>
              <Save size={13} /> Save
            </button>
            <button className="flex items-center gap-2"
              style={{ padding: "8px 14px", background: "var(--gradient-1)", border: "none", borderRadius: 8, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
              <Download size={13} /> Export
            </button>
          </div>
        </div>

        {/* Main area */}
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          {/* Tools sidebar */}
          <div style={{ width: 52, background: "var(--bg-surface)", borderRight: "1px solid var(--border)", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "8px 0", flexShrink: 0 }}>
            {TOOLS.map((t) => (
              <button key={t.label} onClick={() => setActiveTool(activeTool === t.label ? null : t.label)}
                title={t.label}
                style={{ width: 36, height: 36, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", background: activeTool === t.label ? "var(--bg-surface-alt)" : "transparent",
                  border: activeTool === t.label ? "1px solid var(--accent-blue)" : "1px solid transparent", cursor: "pointer", color: activeTool === t.label ? "var(--accent-blue)" : "var(--text-muted)" }}>
                <t.icon size={16} />
              </button>
            ))}
          </div>

          {/* Canvas preview */}
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#000", position: "relative" }}>
            <div style={{ width: 200, height: 355, background: "var(--bg-surface)", borderRadius: 12, border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.8) 100%)" }} />
              <p style={{ color: "var(--text-subtle)", fontSize: 12, zIndex: 1 }}>9:16 Preview</p>
              {/* Playhead indicator */}
              <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", color: "#fff", fontSize: 12, fontWeight: 600 }}>
                {formatTime(currentTime)}
              </div>
            </div>
          </div>

          {/* Properties panel */}
          <div style={{ width: 220, background: "var(--bg-surface)", borderLeft: "1px solid var(--border)", padding: 16, flexShrink: 0 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: 1, margin: "0 0 12px" }}>Properties</p>
            {activeTool ? (
              <div className="flex flex-col gap-3">
                <p style={{ fontSize: 13, color: "var(--text-primary)", fontWeight: 500, margin: 0 }}>{activeTool} Tool</p>
                {activeTool === "Text" && (
                  <>
                    <div>
                      <label style={{ fontSize: 11, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>Text</label>
                      <input defaultValue="Your text here" style={{ width: "100%", padding: "8px 10px", background: "var(--bg-surface-alt)", border: "1px solid var(--border)", borderRadius: 6, color: "var(--text-primary)", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
                    </div>
                    <div>
                      <label style={{ fontSize: 11, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>Font size</label>
                      <input type="range" min={12} max={72} defaultValue={24} style={{ width: "100%" }} />
                    </div>
                  </>
                )}
              </div>
            ) : (
              <p style={{ fontSize: 12, color: "var(--text-subtle)" }}>Select a tool to see options</p>
            )}
          </div>
        </div>

        {/* Timeline */}
        <div style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border)", flexShrink: 0 }}>
          {/* Playback controls */}
          <div className="flex items-center gap-3 px-4 py-2" style={{ borderBottom: "1px solid var(--border)" }}>
            <button onClick={() => setCurrentTime(0)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: 4 }}><SkipBack size={16} /></button>
            <button onClick={() => setPlaying(!playing)}
              style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--gradient-1)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              {playing ? <Pause size={14} color="#fff" /> : <Play size={14} color="#fff" style={{ marginLeft: 2 }} />}
            </button>
            <button style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: 4 }}><SkipForward size={16} /></button>
            <span style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "monospace", marginLeft: 4 }}>{formatTime(currentTime)} / {formatTime(TOTAL_SECONDS)}</span>
            <div style={{ flex: 1 }}>
              <input type="range" min={0} max={TOTAL_SECONDS} value={currentTime} onChange={(e) => setCurrentTime(Number(e.target.value))} style={{ width: "100%" }} />
            </div>
            <div className="flex gap-1">
              <button onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><ZoomOut size={14} /></button>
              <span style={{ fontSize: 11, color: "var(--text-muted)", minWidth: 36, textAlign: "center" }}>{zoom}x</span>
              <button onClick={() => setZoom((z) => Math.min(4, z + 0.25))} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><ZoomIn size={14} /></button>
            </div>
          </div>

          {/* Tracks */}
          <div style={{ padding: "8px 0", maxHeight: 180, overflowY: "auto" }}>
            {TIMELINE_TRACKS.map((track) => (
              <div key={track.id} className="flex items-center" style={{ height: 36, marginBottom: 4 }}>
                <div style={{ width: 80, paddingLeft: 16, flexShrink: 0 }}>
                  <span style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 500 }}>{track.label}</span>
                </div>
                <div style={{ flex: 1, height: 28, position: "relative", marginRight: 16 }}>
                  {track.clips.map((clip, ci) => (
                    <div key={ci}
                      style={{
                        position: "absolute",
                        left: `${(clip.start / TOTAL_SECONDS) * 100 * zoom}%`,
                        width: `${((clip.end - clip.start) / TOTAL_SECONDS) * 100 * zoom}%`,
                        height: "100%",
                        background: track.color + "33",
                        border: `1px solid ${track.color}`,
                        borderRadius: 4,
                        display: "flex", alignItems: "center",
                        paddingLeft: 6,
                        cursor: "pointer",
                        overflow: "hidden",
                        boxSizing: "border-box",
                      }}>
                      <span style={{ fontSize: 10, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{clip.label}</span>
                    </div>
                  ))}
                  {/* Playhead */}
                  <div style={{ position: "absolute", left: `${(currentTime / TOTAL_SECONDS) * 100 * zoom}%`, top: -2, bottom: -2, width: 2, background: "#EF4444", borderRadius: 1, pointerEvents: "none" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
