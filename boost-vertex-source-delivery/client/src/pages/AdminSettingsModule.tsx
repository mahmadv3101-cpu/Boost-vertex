import { Eye, EyeOff, Mail, Pencil } from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { adminService, type SiteSettingsRecord } from "@/services/adminService";
import { authService, type AdminProfile } from "@/services/authService";
import "./AdminSettingsModule.css";

type SettingsTab = "general" | "security" | "notifications" | "profile";

type GeneralForm = {
  websiteName: string;
  websiteUrl: string;
  contactEmail: string;
  phone: string;
  legalName: string;
  streetAddress: string;
  city: string;
  country: string;
  timezone: string;
  linkedin: string;
  twitter: string;
  facebook: string;
  instagram: string;
};

const tabs: Array<{ id: SettingsTab; label: string }> = [
  { id: "general", label: "General" },
  { id: "security", label: "Security" },
  { id: "notifications", label: "Notifications" },
  { id: "profile", label: "Admin Profile" },
];

const defaultGeneral: GeneralForm = {
  websiteName: "Boost Vertex",
  websiteUrl: "https://boostvertex.agency",
  contactEmail: "hello@boostvertex.agency",
  phone: "+1 (555) 019-8472",
  legalName: "Boost Vertex LLC",
  streetAddress: "100 Innovation Way, Suite 400",
  city: "San Francisco",
  country: "United States",
  timezone: "Pacific",
  linkedin: "boostvertex",
  twitter: "boostvertex",
  facebook: "boostvertex",
  instagram: "boostvertex",
};

function socialHandle(value: unknown) {
  if (typeof value !== "string" || !value.trim()) return "boostvertex";
  try {
    const url = new URL(value);
    const parts = url.pathname.split("/").filter(Boolean);
    return parts.at(-1) || "boostvertex";
  } catch {
    return value.replace(/^@/, "");
  }
}

function mapSettings(settings: SiteSettingsRecord): GeneralForm {
  const socials = settings.socialLinks || {};
  return {
    ...defaultGeneral,
    websiteName: settings.companyName || defaultGeneral.websiteName,
    legalName: settings.companyName || defaultGeneral.legalName,
    websiteUrl: settings.websiteUrl || defaultGeneral.websiteUrl,
    contactEmail: settings.email || defaultGeneral.contactEmail,
    phone: settings.phone || defaultGeneral.phone,
    streetAddress: settings.address || defaultGeneral.streetAddress,
    linkedin: socialHandle(socials.linkedin),
    twitter: socialHandle(socials.twitter || socials.x),
    facebook: socialHandle(socials.facebook),
    instagram: socialHandle(socials.instagram),
  };
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="settings-field"><span>{label}</span>{children}</label>;
}

function SaveBar({ onSave, onCancel, saving = false }: { onSave?: () => void; onCancel?: () => void; saving?: boolean }) {
  return <footer className="settings-savebar"><button type="button" className="settings-btn settings-btn--ghost" onClick={onCancel}>Cancel</button><button type="button" className="settings-btn settings-btn--primary" onClick={onSave} disabled={saving}>{saving ? "Saving..." : "Save Changes"}</button></footer>;
}

function GeneralSettings({ form, setForm, onSave, onCancel, saving }: {
  form: GeneralForm;
  setForm: React.Dispatch<React.SetStateAction<GeneralForm>>;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const set = (key: keyof GeneralForm, value: string) => setForm((current) => ({ ...current, [key]: value }));
  return <>
    <section className="settings-card">
      <header><h2>Website Information</h2><p>Core details used to identify your web presence.</p></header>
      <div className="settings-card__divider" />
      <div className="settings-grid settings-grid--two">
        <Field label="Website Name"><input value={form.websiteName} onChange={(event) => set("websiteName", event.target.value)} /></Field>
        <Field label="Website URL"><input value={form.websiteUrl} onChange={(event) => set("websiteUrl", event.target.value)} /></Field>
        <Field label="Contact Email"><input value={form.contactEmail} onChange={(event) => set("contactEmail", event.target.value)} /></Field>
        <Field label="Phone Number"><input value={form.phone} onChange={(event) => set("phone", event.target.value)} /></Field>
      </div>
    </section>

    <section className="settings-card">
      <header><h2>Business Information</h2><p>Your physical location and operational timezone.</p></header>
      <div className="settings-card__divider" />
      <div className="settings-grid settings-grid--two">
        <Field label="Legal Business Name"><input value={form.legalName} onChange={(event) => set("legalName", event.target.value)} /></Field>
        <Field label="Street Address"><input value={form.streetAddress} onChange={(event) => set("streetAddress", event.target.value)} /></Field>
        <Field label="City"><input value={form.city} onChange={(event) => set("city", event.target.value)} /></Field>
        <Field label="Country"><select value={form.country} onChange={(event) => set("country", event.target.value)}><option>United States</option><option>Pakistan</option><option>United Kingdom</option></select></Field>
        <Field label="Timezone"><select value={form.timezone} onChange={(event) => set("timezone", event.target.value)}><option value="Pacific">(GMT-08:00) Pacific Time (US & Canada)</option><option value="Eastern">Eastern Time (ET)</option></select></Field>
      </div>
    </section>

    <section className="settings-card">
      <header><h2>Social Media Links</h2><p>Connect your brand across platforms.</p></header>
      <div className="settings-card__divider" />
      <div className="settings-grid settings-grid--two settings-social-grid">
        <Field label="LinkedIn"><div className="settings-prefix-input"><span>linkedin.com/company/</span><input value={form.linkedin} onChange={(event) => set("linkedin", event.target.value)} /></div></Field>
        <Field label="X / Twitter"><div className="settings-prefix-input"><span>x.com/</span><input value={form.twitter} onChange={(event) => set("twitter", event.target.value)} /></div></Field>
        <Field label="Facebook"><div className="settings-prefix-input"><span>facebook.com/</span><input value={form.facebook} onChange={(event) => set("facebook", event.target.value)} /></div></Field>
        <Field label="Instagram"><div className="settings-prefix-input"><span>instagram.com/</span><input value={form.instagram} onChange={(event) => set("instagram", event.target.value)} /></div></Field>
      </div>
    </section>
    <SaveBar onSave={onSave} onCancel={onCancel} saving={saving} />
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
    <SaveBar onSave={() => toast.error("Change-password API is not available in the supplied backend yet.")} />
  </>;
}

const initialNotifications = [
  ["New Contact Message", "Receive an alert when a user submits a contact form.", true],
  ["New Lead", "Get notified when a new lead is captured.", true],
  ["Lead Updated", "Receive updates when lead information is modified.", true],
  ["Lead Deleted", "Notification when a lead is removed from the system.", false],
  ["Service Updated", "Alert when a service page is modified.", true],
] as const;

function NotificationsSettings({ profile }: { profile: AdminProfile | null }) {
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
      <div className="settings-email-display"><Mail /><span>{profile?.email || "admin@boostvertex.com"}</span><button type="button"><Pencil /> EDIT</button></div>
    </section>
    <SaveBar onSave={() => toast.error("Notification-preferences API is not available in the supplied backend yet.")} />
  </>;
}

function AdminProfileSettings({ profile }: { profile: AdminProfile | null }) {
  const [editing, setEditing] = useState(false);
  const name = profile?.name || "Jane Doe";
  const email = profile?.email || "jane.doe@boostvertex.com";
  return <>
    <div className={`settings-profile-grid ${editing ? "is-editing" : ""}`}>
      <div className="settings-profile-left">
        <section className="settings-profile-card settings-profile-picture"><h2>Profile Picture</h2><div className="settings-profile-avatar">JD</div>{editing ? <div className="settings-profile-photo-actions"><button type="button">Change Photo</button><button type="button">Remove</button></div> : null}</section>
        <section className="settings-profile-card settings-profile-preferences"><h2>Account<br />Preferences</h2>{editing ? <><Field label="Language"><select defaultValue="English (US)"><option>English (US)</option></select></Field><Field label="Timezone"><select defaultValue="Eastern Time (ET)"><option>Eastern Time (ET)</option></select></Field></> : <dl><div><dt>Language</dt><dd>English (US)</dd></div><div><dt>Timezone</dt><dd>English (US)</dd></div></dl>}</section>
      </div>
      <section className="settings-profile-card settings-profile-info">
        <header><h2>Profile Information</h2>{!editing ? <button type="button" onClick={() => setEditing(true)}>Edit Profile</button> : null}</header>
        {editing ? <div className="settings-profile-form"><Field label="Full Name"><input defaultValue={name} /></Field><Field label="Email Address"><input defaultValue={email} /></Field><Field label="Job Title"><input defaultValue="Senior Marketing Strategist" /></Field><Field label="Department"><input defaultValue="Strategy & Growth" /></Field><Field label="Bio / Description"><textarea placeholder="Enter a short professional summary..." /></Field></div> : <div className="settings-profile-view"><dl><div><dt>Full Name</dt><dd>{name}</dd></div><div><dt>Email Address</dt><dd>{email}</dd></div><div><dt>Job Title</dt><dd>Senior Marketing Strategist</dd></div><div><dt>Department</dt><dd>Strategy & Growth</dd></div><div className="settings-profile-view__bio"><dt>Bio / Description</dt><dd>Senior Marketing Strategist with over 10 years of experience in driving growth<br />for B2B tech companies. Specialized in data-driven campaign optimization<br />and brand positioning.</dd></div></dl></div>}
      </section>
    </div>
    {editing ? <footer className="settings-savebar"><button type="button" className="settings-btn settings-btn--ghost" onClick={() => setEditing(false)}>Cancel</button><button type="button" className="settings-btn settings-btn--primary" onClick={() => toast.error("Profile update API is not available in the supplied backend yet.")}>Save Changes</button></footer> : null}
  </>;
}

export function SettingsWorkspace() {
  const [tab, setTab] = useState<SettingsTab>("general");
  const [general, setGeneral] = useState<GeneralForm>(defaultGeneral);
  const [savedGeneral, setSavedGeneral] = useState<GeneralForm>(defaultGeneral);
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;
    Promise.allSettled([adminService.siteSettings(), authService.me()]).then(([settingsResult, profileResult]) => {
      if (!active) return;
      if (settingsResult.status === "fulfilled") {
        const mapped = mapSettings(settingsResult.value);
        setGeneral(mapped);
        setSavedGeneral(mapped);
      }
      if (profileResult.status === "fulfilled") setProfile(profileResult.value);
    });
    return () => { active = false; };
  }, []);

  const generalPayload = useMemo(() => ({
    companyName: general.websiteName || general.legalName,
    websiteUrl: general.websiteUrl,
    email: general.contactEmail,
    phone: general.phone,
    address: general.streetAddress,
    socialLinks: {
      linkedin: `https://linkedin.com/company/${general.linkedin}`,
      twitter: `https://x.com/${general.twitter}`,
      facebook: `https://facebook.com/${general.facebook}`,
      instagram: `https://instagram.com/${general.instagram}`,
    },
  }), [general]);

  const saveGeneral = async () => {
    setSaving(true);
    try {
      const settings = await adminService.updateSiteSettings(generalPayload);
      const mapped = mapSettings(settings);
      setGeneral((current) => ({ ...current, ...mapped, city: current.city, country: current.country, timezone: current.timezone }));
      setSavedGeneral((current) => ({ ...current, ...mapped, city: general.city, country: general.country, timezone: general.timezone }));
      toast.success("Settings saved successfully.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save settings.");
    } finally {
      setSaving(false);
    }
  };

  return <div className="settings-workspace">
    <header className="settings-page-heading"><h1>Settings</h1><p>Manage your website and general configuration.</p></header>
    <div className="settings-accent-band" aria-hidden="true" />
    <nav className="settings-tabs" aria-label="Settings sections">{tabs.map((item) => <button key={item.id} type="button" className={tab === item.id ? "is-active" : ""} onClick={() => setTab(item.id)}>{item.label}</button>)}</nav>
    <div className="settings-content">{tab === "general" ? <GeneralSettings form={general} setForm={setGeneral} onSave={() => void saveGeneral()} onCancel={() => setGeneral(savedGeneral)} saving={saving} /> : tab === "security" ? <SecuritySettings /> : tab === "notifications" ? <NotificationsSettings profile={profile} /> : <AdminProfileSettings profile={profile} />}</div>
  </div>;
}
