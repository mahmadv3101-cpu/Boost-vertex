import { LogOut, LockKeyhole } from "lucide-react";
import { useEffect, useState } from "react";
import "./AdminLogoutModule.css";

type LogoutPhase = "confirm" | "logging-out";

type AdminLogoutModuleProps = {
  open: boolean;
  onCancel: () => void;
  onComplete: () => void;
};

export function AdminLogoutModule({ open, onCancel, onComplete }: AdminLogoutModuleProps) {
  const [phase, setPhase] = useState<LogoutPhase>("confirm");

  useEffect(() => {
    if (!open) setPhase("confirm");
  }, [open]);

  useEffect(() => {
    if (!open || phase !== "logging-out") return;
    const timer = window.setTimeout(onComplete, 1450);
    return () => window.clearTimeout(timer);
  }, [open, phase, onComplete]);

  if (!open) return null;

  if (phase === "logging-out") {
    return <div className="admin-logout-screen admin-logout-screen--loading" role="status" aria-live="polite">
      <div className="admin-logout-loading">
        <div className="admin-logout-spinner" aria-hidden="true"><LockKeyhole /></div>
        <h2>Logging out...</h2>
        <p>Please wait while we securely sign you out of BOOST<br />VERTEX.</p>
      </div>
    </div>;
  }

  return <div className="admin-logout-screen" role="dialog" aria-modal="true" aria-labelledby="logout-title">
    <div className="admin-logout-backdrop" onClick={onCancel} aria-hidden="true" />
    <section className="admin-logout-modal">
      <div className="admin-logout-icon"><LogOut /></div>
      <h2 id="logout-title">Log out?</h2>
      <p>Are you sure you want to log out of your admin<br />account?</p>
      <div className="admin-logout-actions">
        <button type="button" className="admin-logout-cancel" onClick={onCancel}>Cancel</button>
        <button type="button" className="admin-logout-confirm" onClick={() => setPhase("logging-out")}>Log Out</button>
      </div>
    </section>
  </div>;
}
