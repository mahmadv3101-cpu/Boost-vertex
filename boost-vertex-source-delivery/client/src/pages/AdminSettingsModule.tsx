import { Eye, EyeOff, Mail, Pencil, X } from "lucide-react";
import { useState } from "react";
import "./AdminSettingsModule.css";

type SettingsTab = "general" | "security" | "notifications" | "profile";

const tabs: Array<{ id: SettingsTab; label: string }> = [
  { id: "general", label: "General" },
  { id: "security", label: "Security" },
  { id: "notifications", label: "Notifications" },
  { id: "profile", label: "Admin Profile" },
];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="settings-field"><span>{label}</span>{children}</label>;
}

function SaveBar() {
  return <footer className="settings-savebar"><button type="button" className="settings-btn settings-btn--ghost">Cancel</button><button type="button" className="settings-btn settings-btn--primary">Save Changes</button></footer>;
}

function GeneralSettings() {
  return <>
    <section className="settings-card">
      <header><h2>Website Information</h2><p>Core details used to identify your web presence.</p></header>
      <div className="settings-card__divider" />
      <div className="settings-grid settings-grid--two">
        <Field label="Website Name"><input defaultValue="Boost Vertex" /></Field>
        <Field label="Website URL"><input defaultValue="https://boostvertex.agency" /></Field>
        <Field label="Contact Email"><input defaultValue="hello@boostvertex.agency" /></Field>
        <Field label="Phone Number"><input defaultValue="+1 (555) 019-8472" /></Field>
      </div>
    </section>

    <section className="settings-card">
      <header><h2>Business Information</h2><p>Your physical location and operational timezone.</p></header>
      <div className="settings-card__divider" />
      <div className="settings-grid settings-grid--two">
        <Field label="Legal Business Name"><input defaultValue="Boost Vertex LLC" /></Field>
        <Field label="Street Address"><input defaultValue="100 Innovation Way, Suite 400" /></Field>
        <Field label="City"><input defaultValue="San Francisco" /></Field>
        <Field label="Country"><select defaultValue="United States"><option>United States</option><option>Pakistan</option><option>United Kingdom</option></select></Field>
        <Field label="Timezone"><select defaultValue="Pacific"><option value="Pacific">(GMT-08:00) Pacific Time (US & Canada)</option><option value="Eastern">Eastern Time (ET)</option></select></Field>
      </div>
    </section>

    <section className="settings-card">
      <header><h2>Social Media Links</h2><p>Connect your brand across platforms.</p></header>
      <div className="settings-card__divider" />
      <div className="settings-grid settings-grid--two settings-social-grid">
        <Field label="LinkedIn"><div className="settings-prefix-input"><span>linkedin.com/company/</span><input defaultValue="boostvertex" /></div></Field>
        <Field label="X / Twitter"><div className="settings-prefix-input"><span>x.com/</span><input defaultValue="boostvertex" /></div></Field>
        <Field label="Facebook"><div className="settings-prefix-input"><span>facebook.com/</span><input defaultValue="boostvertex" /></div></Field>
        <Field label="Instagram"><div className="settings-prefix-input"><span>instagram.com/</span><input defaultValue="boostvertex" /></div></Field>
      </div>
    </section>
    <SaveBar />
  </>;
}

function SecuritySettings() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("mismatchedpass");
  const mismatch = Boolean(confirmPassword) && newPassword !== confirmPassword;
  return <>
    <section className="settings-card settings-card--security">
      <div className="settings-security-inner">
        <header><h2>Change Password</h2><p>Update your administrative credentials to maintain account security.</p></header>
        <Field label="Current Password"><div className="settings-password"><input type={showCurrent ? "text" : "password"} placeholder="Enter current password" /><button type="button" onClick={() => setShowCurrent((value) => !value)}>{showCurrent ? <EyeOff /> : <Eye />}</button></div></Field>
        <Field label="New Password"><div className="settings-password"><input type={showNew ? "text" : "password"} placeholder="Enter new password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} /><button type="button" onClick={() => setShowNew((value) => !value)}>{showNew ? <EyeOff /> : <Eye />}</button></div></Field>
        <div className="settings-password-rules"><span className="is-valid">✓ At least 8 characters</span><span>○ One uppercase letter</span><span className="is-valid">✓ One lowercase letter</span><span>○ One number</span><span>○ One special character</span></div>
        <Field label="Confirm New Password"><div className={`settings-password ${mismatch ? "is-error" : ""}`}><input type={showConfirm ? "text" : "password"} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} /><button type="button" onClick={() => setShowConfirm((value) => !value)}>{showConfirm ? <EyeOff /> : <Eye />}</button></div>{mismatch ? <small className="settings-field-error">ⓘ Passwords do not match</small> : null}</Field>
      </div>
    </section>
    <SaveBar />
  </>;
}

const initialNotifications = [
  ["New Contact Message", "Receive an alert when a user submits a contact form.", true],
  ["New Lead", "Get notified when a new lead is captured.", true],
  ["Lead Updated", "Receive updates when lead information is modified.", true],
  ["Lead Deleted", "Notification when a lead is removed from the system.", false],
  ["Service Updated", "Alert when a service page is modified.", true],
] as const;

function NotificationsSettings() {
  const [values, setValues] = useState<boolean[]>(initialNotifications.map((item) => item[2]));
  return <>
    <section className="settings-card settings-card--notifications">
      <header><h2>Email Notifications</h2><p>Control which events trigger an email alert to your admin inbox.</p></header>
      <div className="settings-notification-list">
        {initialNotifications.map(([title, copy], index) => <div className="settings-notification-row" key={title}><div><strong>{title}</strong><p>{copy}</p></div><button type="button" className={`settings-toggle ${values[index] ? "is-on" : ""}`} aria-pressed={values[index]} onClick={() => setValues((current) => current.map((value, itemIndex) => itemIndex === index ? !value : value))}><span /></button></div>)}
      </div>
    </section>
    <section className="settings-card settings-card--email">
      <header><h2>Notification Email</h2><p>System alerts will be sent to the following address.</p></header>
      <div className="settings-email-display"><Mail /><span>admin@boostvertex.com</span><button type="button"><Pencil /> EDIT</button></div>
    </section>
    <SaveBar />
  </>;
}

function AdminProfileSettings() {
  const [editing, setEditing] = useState(false);
  return <>
    <div className={`settings-profile-grid ${editing ? "is-editing" : ""}`}>
      <div className="settings-profile-left">
        <section className="settings-profile-card settings-profile-picture"><h2>Profile Picture</h2><div className="settings-profile-avatar">JD</div>{editing ? <div className="settings-profile-photo-actions"><button type="button">Change Photo</button><button type="button">Remove</button></div> : null}</section>
        <section className="settings-profile-card settings-profile-preferences"><h2>Account<br />Preferences</h2>{editing ? <><Field label="Language"><select defaultValue="English (US)"><option>English (US)</option></select></Field><Field label="Timezone"><select defaultValue="Eastern Time (ET)"><option>Eastern Time (ET)</option></select></Field></> : <dl><div><dt>Language</dt><dd>English (US)</dd></div><div><dt>Timezone</dt><dd>English (US)</dd></div></dl>}</section>
      </div>
      <section className="settings-profile-card settings-profile-info">
        <header><h2>Profile Information</h2>{!editing ? <button type="button" onClick={() => setEditing(true)}>Edit Profile</button> : null}</header>
        {editing ? <div className="settings-profile-form"><Field label="Full Name"><input defaultValue="Jane Doe" /></Field><Field label="Email Address"><input defaultValue="jane.doe@boostvertex.com" /></Field><Field label="Job Title"><input defaultValue="Senior Marketing Strategist" /></Field><Field label="Department"><input defaultValue="Strategy & Growth" /></Field><Field label="Bio / Description"><textarea placeholder="Enter a short professional summary..." /></Field></div> : <div className="settings-profile-view"><dl><div><dt>Full Name</dt><dd>Jane Doe</dd></div><div><dt>Email Address</dt><dd>jane.doe@boostvertex.com</dd></div><div><dt>Job Title</dt><dd>Senior Marketing Strategist</dd></div><div><dt>Department</dt><dd>Strategy & Growth</dd></div><div className="settings-profile-view__bio"><dt>Bio / Description</dt><dd>Senior Marketing Strategist with over 10 years of experience in driving growth<br />for B2B tech companies. Specialized in data-driven campaign optimization<br />and brand positioning.</dd></div></dl></div>}
      </section>
    </div>
    {editing ? <footer className="settings-savebar"><button type="button" className="settings-btn settings-btn--ghost" onClick={() => setEditing(false)}>Cancel</button><button type="button" className="settings-btn settings-btn--primary" onClick={() => setEditing(false)}>Save Changes</button></footer> : null}
  </>;
}

export function SettingsWorkspace() {
  const [tab, setTab] = useState<SettingsTab>("general");
  return <div className="settings-workspace">
    <header className="settings-page-heading"><h1>Settings</h1><p>Manage your website and general configuration.</p></header>
    <div className="settings-accent-band" aria-hidden="true" />
    <nav className="settings-tabs" aria-label="Settings sections">{tabs.map((item) => <button key={item.id} type="button" className={tab === item.id ? "is-active" : ""} onClick={() => setTab(item.id)}>{item.label}</button>)}</nav>
    <div className="settings-content">{tab === "general" ? <GeneralSettings /> : tab === "security" ? <SecuritySettings /> : tab === "notifications" ? <NotificationsSettings /> : <AdminProfileSettings />}</div>
  </div>;
}
