import { Link } from "wouter";
import { Zap, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border)" }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "var(--gradient-1)" }}>
                <Zap size={16} className="text-white" fill="white" />
              </div>
              <span className="font-bold text-lg" style={{ fontFamily: "Syne, sans-serif" }}>AdForge</span>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-muted)", maxWidth: "280px" }}>
              The complete AI ad studio. Script, generate, edit, and publish — without opening another tab.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Twitter, label: "Twitter" },
                { icon: Linkedin, label: "LinkedIn" },
              ].map(({ icon: Icon, label }) => (
                <button key={label} className="w-9 h-9 rounded-lg flex items-center justify-center transition-all"
                  style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent-blue)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}>
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: "Product",
              links: [
                { href: "/features/script-studio", label: "Script Studio" },
                { href: "/features/video-editor", label: "Video Editor" },
                { href: "/features/actor-library", label: "Actor Library" },
                { href: "/features/product-overlay", label: "Product Overlay" },
                { href: "/pricing", label: "Pricing" },
              ],
            },
            {
              title: "Company",
              links: [
                { href: "/about", label: "About" },
                { href: "/changelog", label: "Changelog" },
                { href: "/blog", label: "Blog" },
              ],
            },
            {
              title: "Legal",
              links: [
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
                { href: "/cookies", label: "Cookie Policy" },
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "var(--text-muted)" }}>
                {col.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link to={l.href} className="text-sm transition-colors"
                      style={{ color: "var(--text-muted)" }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--text-primary)")}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--text-muted)")}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid var(--border)" }}>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            © 2025 AdForge AI Ltd. Built by a solo founder who was tired of the same tools.
          </p>
          <p className="text-sm" style={{ color: "var(--text-subtle)" }}>
            Ship it. Then listen.
          </p>
        </div>
      </div>
    </footer>
  );
}
