import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Zap, ChevronDown } from "lucide-react";
import { authClient, clearToken } from "../lib/auth";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [location] = useLocation();
  const { data: session } = authClient.useSession();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const features = [
    { href: "/features/script-studio", label: "Script Studio" },
    { href: "/features/video-editor", label: "Video Editor" },
    { href: "/features/actor-library", label: "Actor Library" },
    { href: "/features/product-overlay", label: "Product Overlay" },
  ];

  const handleSignOut = async () => {
    await authClient.signOut();
    clearToken();
    window.location.href = "/";
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(8, 12, 20, 0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "var(--gradient-1)" }}>
            <Zap size={16} className="text-white" fill="white" />
          </div>
          <span className="font-bold text-lg" style={{ fontFamily: "Syne, sans-serif", color: "var(--text-primary)" }}>
            AdForge
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {/* Features dropdown */}
          <div className="relative" onMouseEnter={() => setFeaturesOpen(true)} onMouseLeave={() => setFeaturesOpen(false)}>
            <button className="flex items-center gap-1 text-sm transition-colors"
              style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}>
              Features <ChevronDown size={14} />
            </button>
            {featuresOpen && (
              <div className="absolute top-full left-0 mt-2 w-52 rounded-xl p-2"
                style={{ background: "var(--bg-surface-alt)", border: "1px solid var(--border)" }}>
                {features.map((f) => (
                  <Link key={f.href} to={f.href}
                    className="block px-3 py-2 rounded-lg text-sm transition-colors"
                    style={{ color: "var(--text-muted)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; (e.currentTarget as HTMLElement).style.background = "var(--bg-surface)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                    {f.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {[{ href: "/pricing", label: "Pricing" }, { href: "/changelog", label: "Changelog" }].map((item) => (
            <Link key={item.href} to={item.href}
              className="text-sm transition-colors"
              style={{ color: location === item.href ? "var(--text-primary)" : "var(--text-muted)" }}>
              {item.label}
            </Link>
          ))}
        </div>

        {/* Auth CTA */}
        <div className="hidden md:flex items-center gap-3">
          {session ? (
            <>
              <Link to="/dashboard"
                className="px-4 py-2 text-sm rounded-lg transition-all"
                style={{ color: "var(--text-muted)" }}>
                Dashboard
              </Link>
              <button onClick={handleSignOut}
                className="px-4 py-2 text-sm rounded-lg transition-all"
                style={{ color: "var(--text-muted)", border: "1px solid var(--border)" }}>
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login"
                className="px-4 py-2 text-sm rounded-lg transition-all"
                style={{ color: "var(--text-muted)" }}>
                Log In
              </Link>
              <Link to="/signup"
                className="px-5 py-2 text-sm font-semibold rounded-lg transition-all"
                style={{ background: "var(--gradient-1)", color: "white" }}>
                Start Free
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}
          style={{ color: "var(--text-primary)" }}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-4"
          style={{ background: "var(--bg-surface)", borderBottom: "1px solid var(--border)" }}>
          {features.map((f) => (
            <Link key={f.href} to={f.href} onClick={() => setMenuOpen(false)}
              className="text-sm" style={{ color: "var(--text-muted)" }}>
              {f.label}
            </Link>
          ))}
          <Link to="/pricing" onClick={() => setMenuOpen(false)} className="text-sm" style={{ color: "var(--text-muted)" }}>Pricing</Link>
          <Link to="/changelog" onClick={() => setMenuOpen(false)} className="text-sm" style={{ color: "var(--text-muted)" }}>Changelog</Link>
          <div className="pt-4 flex flex-col gap-3 border-t" style={{ borderColor: "var(--border)" }}>
            {session ? (
              <Link to="/dashboard" className="text-center px-5 py-2.5 text-sm font-semibold rounded-lg"
                style={{ background: "var(--gradient-1)", color: "white" }}>
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="text-center px-5 py-2.5 text-sm rounded-lg"
                  style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}>
                  Log In
                </Link>
                <Link to="/signup" onClick={() => setMenuOpen(false)} className="text-center px-5 py-2.5 text-sm font-semibold rounded-lg"
                  style={{ background: "var(--gradient-1)", color: "white" }}>
                  Start Free — No Credit Card
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
