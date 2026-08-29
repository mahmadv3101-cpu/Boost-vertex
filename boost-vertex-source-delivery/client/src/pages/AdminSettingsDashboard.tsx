import { Bell, BriefcaseBusiness, Building2, FolderKanban, Image, LayoutDashboard, LogOut, Menu, MessageSquare, Newspaper, Search, Settings, UserRound, UsersRound, X } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { authService } from "@/services/authService";
import "./AdminDashboard.css";
import "./AdminDashboardInteraction.css";
import "./AdminDashboardAuditRefinement.css";
import "./AdminSettingsProfileRefinement.css";
import "./AdminSettingsPrecisionFix.css";
import "./AdminSettingsMobile.css";
import { settingsAvatarSrc } from "./SettingsAvatar";
import { SettingsWorkspace } from "./AdminSettingsModule";
import { AdminLogoutModule } from "./AdminLogoutModule";

const logoUrl = "/assets/managed/boost-vertex-logo-2026_bf191d1a.jpeg";

const navigation = [
  ["Dashboard", LayoutDashboard, "/admin/dashboard"],
  ["Leads", UsersRound, "/admin/leads"],
  ["Services", BriefcaseBusiness, "/admin/services"],
  ["Industries", Building2, "/admin/industries"],
  ["Case Studies", FolderKanban, "/admin/case-studies"],
  ["Blog / Resources", Newspaper, "/admin/blog"],
  ["Media Library", Image, "/admin/media"],
  ["Contact Messages", MessageSquare, "/admin/contact-messages"],
  ["Settings", Settings, "/admin/settings"],
] as const;

export function SettingsDashboard() {
  const [, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const settingsStyle = { "--settings-avatar-image": `url("${settingsAvatarSrc}")` } as React.CSSProperties;
  const navigate = (path: string) => { setMobileMenuOpen(false); setLocation(path); };
  const completeLogout = () => { authService.logout(); setLocation("/admin/login"); };

  return <main className={`admin-dashboard industry-detail-shell settings-dashboard-shell ${mobileMenuOpen ? "is-mobile-menu-open" : ""}`} style={settingsStyle}>
    <aside className="dash-sidebar">
      <div className="settings-mobile-drawer-head">
        <div className="dash-brand"><span><img src={logoUrl} alt="" /></span><strong>Boost Vertex</strong></div>
        <button type="button" aria-label="Close menu" onClick={() => setMobileMenuOpen(false)}><X /></button>
      </div>
      <nav aria-label="Admin navigation" className="dash-sidebar__nav">
        {navigation.map(([label, Icon, path]) => <button key={label} className={label === "Settings" ? "is-active" : ""} onClick={() => navigate(path)}><Icon />{label}</button>)}
      </nav>
      <div className="dash-sidebar__bottom">
        <button onClick={() => navigate("/admin/profile")}><UserRound />Admin Profile</button>
        <button onClick={() => { setMobileMenuOpen(false); setLogoutOpen(true); }}><LogOut />Logout</button>
      </div>
    </aside>

    <button className="settings-mobile-menu-backdrop" type="button" aria-label="Close menu" onClick={() => setMobileMenuOpen(false)} />

    <section className="dash-workspace">
      <div className="settings-mobile-topbar">
        <button type="button" aria-label="Open menu" onClick={() => setMobileMenuOpen(true)}><Menu /></button>
        <div className="settings-mobile-brand"><span><img src={logoUrl} alt="" /></span><strong>Boost Vertex</strong></div>
        <div className="settings-mobile-actions">
          <button type="button" aria-label="Search"><Search /></button>
          <button type="button" aria-label="Notifications"><Bell /></button>
          <button type="button" aria-label="Settings"><Settings /></button>
          <span className="settings-mobile-avatar" />
        </div>
      </div>

      <header className="dash-topbar">
        <label className="dash-search"><Search /><input placeholder="Search anything..." /><kbd>⌘ K</kbd></label>
        <div className="dash-topbar__right">
          <button aria-label="Notifications"><Bell /><i><b>3</b></i></button>
          <button aria-label="Contact messages" onClick={() => setLocation("/admin/contact-messages")}><MessageSquare /><i><b>9</b></i></button>
          <span className="dash-avatar">AU</span>
          <div><strong>Admin User</strong><small>Super Admin</small></div>
        </div>
      </header>
      <SettingsWorkspace />
    </section>

    <AdminLogoutModule open={logoutOpen} onCancel={() => setLogoutOpen(false)} onComplete={completeLogout} />
  </main>;
}
