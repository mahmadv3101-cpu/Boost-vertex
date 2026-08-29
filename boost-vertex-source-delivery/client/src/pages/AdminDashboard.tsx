import { useLocation } from "wouter";
import LegacyAdminDashboard from "./AdminDashboardLegacy";
import { SettingsDashboard } from "./AdminSettingsDashboard";

export default function AdminDashboardRouter() {
  const [location] = useLocation();
  return location === "/admin/settings" ? <SettingsDashboard /> : <LegacyAdminDashboard />;
}
