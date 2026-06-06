import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Zap, LayoutDashboard, FolderOpen, Film, Users, FileText,
  Download, Settings, CreditCard, Users2, ChevronLeft, Menu, X
} from "lucide-react";
import { authClient, clearToken } from "../lib/auth";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { href: "/dashboard/projects", icon: FolderOpen, label: "Projects" },
  { href: "/dashboard/create", icon: Film, label: "Create Ad" },
  { href: "/dashboard/actors", icon: Users, label: "Actors" },
  { href: "/dashboard/scripts", icon: FileText, label: "Scripts" },
  { href: "/dashboard/exports", icon: Download, label: "Exports" },
];

const bottomItems = [
  { href: "/dashboard/team", icon: Users2, label: "Team" },
  { href: "/dashboard/billing", icon: CreditCard, label: "Billing" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();
  const { data: session } = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut();
    clearToken();
    window.location.href = "/";
  };

  const NavItem = ({ item }: { item: typeof navItems[0] }) => {
    const isActive = location === item.href || (item.href !== "/dashboard" && location.startsWith(item.href));
    return (
      <Link to={item.href}
        onClick={() => setMobileOpen(false)}
        className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium"
        style={{
          color: isActive ? "var(--text-primary)" : "var(--text-muted)",
          background: isActive ? "var(--bg-surface-alt)" : "transparent",
        }}
        onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "rgba(30,45,69,0.5)"; }}
        onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
        <item.icon size={16} style={{ flexShrink: 0 }} />
        {!collapsed && <span>{item.label}</span>}
      </Link>
    );
  };

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className="flex flex-col h-full"
      style={{
        width: mobile ? "280px" : (collapsed ? "64px" : "240px"),
        background: "var(--bg-surface)",
        borderRight: "1px solid var(--border)",
        transition: "width 0.2s ease",
        flexShrink: 0,
      }}>
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 h-16" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "var(--gradient-1)" }}>
          <Zap size={14} className="text-white" fill="white" />
        </div>
        {(!collapsed || mobile) && (
          <span className="font-bold text-base" style={{ fontFamily: "Syne, sans-serif" }}>AdForge</span>
        )}
        {!mobile && (
          <button onClick={() => setCollapsed(!collapsed)} className="ml-auto p-1 rounded transition-colors"
            style={{ color: "var(--text-muted)" }}>
            <ChevronLeft size={14} style={{ transform: collapsed ? "rotate(180deg)" : "none", transition: "0.2s" }} />
          </button>
        )}
      </div>

      {/* Nav */}
      <div className="flex-1 px-2 py-4 overflow-y-auto">
        <div className="flex flex-col gap-1">
          {navItems.map((item) => <NavItem key={item.href} item={item} />)}
        </div>
      </div>

      {/* Bottom */}
      <div className="px-2 pb-4 flex flex-col gap-1" style={{ borderTop: "1px solid var(--border)", paddingTop: "12px" }}>
        {bottomItems.map((item) => <NavItem key={item.href} item={item} />)}

        {/* User */}
        <div className="mt-2 p-3 rounded-lg flex items-center gap-3"
          style={{ background: "var(--bg-surface-alt)" }}>
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
            style={{ background: "var(--gradient-1)", color: "white" }}>
            {session?.user?.name?.[0]?.toUpperCase() ?? session?.user?.email?.[0]?.toUpperCase() ?? "U"}
          </div>
          {(!collapsed || mobile) && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">{session?.user?.name ?? "User"}</p>
              <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>{session?.user?.email}</p>
            </div>
          )}
        </div>

        {(!collapsed || mobile) && (
          <button onClick={handleSignOut}
            className="w-full text-xs py-2 px-3 rounded-lg text-left transition-colors"
            style={{ color: "var(--text-muted)" }}>
            Sign out
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--bg-primary)" }}>
      {/* Desktop sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="relative flex h-full">
            <Sidebar mobile />
            <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4 p-1 rounded"
              style={{ color: "var(--text-muted)" }}>
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile topbar */}
        <div className="md:hidden flex items-center px-4 h-14"
          style={{ background: "var(--bg-surface)", borderBottom: "1px solid var(--border)" }}>
          <button onClick={() => setMobileOpen(true)} style={{ color: "var(--text-primary)" }}>
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2 mx-auto">
            <div className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{ background: "var(--gradient-1)" }}>
              <Zap size={12} className="text-white" fill="white" />
            </div>
            <span className="font-bold" style={{ fontFamily: "Syne, sans-serif" }}>AdForge</span>
          </div>
        </div>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
