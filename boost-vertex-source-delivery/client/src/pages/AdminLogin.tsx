/**
 * Admin Login reference style: dark industrial editorial split-screen, electric-lime actions,
 * squared grid texture, and intentional dense desktop geometry from the supplied Figma frames.
 */
import { Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { useLocation } from "wouter";
import { authService } from "@/services/authService";
import "./AdminLogin.css";

const logoUrl = "/assets/managed/boost-vertex-logo-2026_bf191d1a.jpeg";
const industrialHeroUrl = "/assets/managed/admin-login-industrial-figma_d4552363.png";

function AdminBrand({ centered = false }: { centered?: boolean }) {
  return (
    <div className={`admin-brand${centered ? " admin-brand--centered" : ""}`}>
      <span className="admin-brand__mark"><img src={logoUrl} alt="" /></span>
      <span>Boost Vertex</span>
    </div>
  );
}

function Footer({ compact = false }: { compact?: boolean }) {
  return (
    <footer className={`admin-auth__footer${compact ? " admin-auth__footer--compact" : ""}`}>
      {!compact ? <p>© 2024 Boost Vertex Digital. All rights reserved.</p> : <span />}
      <div>
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="#terms" onClick={(event) => { event.preventDefault(); toast.info("Terms of Service will be managed from the Admin CMS."); }}>Terms of Service</a>
      </div>
    </footer>
  );
}

export default function AdminLogin() {
  const [location, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isForgotPassword = location === "/admin/forgot-password";
  const isResetPassword = location === "/admin/reset-password";

  async function submitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email || !password) {
      toast.error("Enter your administrator email and password.");
      return;
    }
    setIsSubmitting(true);
    try {
      const session = await authService.login(email.trim(), password);
      toast.success(`Welcome back, ${session.name}.`);
      setLocation("/admin/dashboard");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to sign in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function submitReset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email) {
      toast.error("Enter your administrator email address.");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await authService.forgotPassword(email.trim());
      toast.success(response.message || "If an account exists for this email, a reset link has been sent.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to request a password reset right now.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function submitNewPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = new URLSearchParams(window.location.search).get("token");
    if (!token) {
      toast.error("This password reset link is invalid or incomplete.");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await authService.resetPassword(token, password);
      toast.success(response.message || "Password reset successfully. Please sign in.");
      setLocation("/admin/login");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to reset the password right now.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isForgotPassword) {
    return (
      <main className="admin-auth admin-auth--forgot">
        <div className="admin-auth__grid" aria-hidden="true" />
        <section className="admin-forgot">
          <AdminBrand centered />
          <form className="admin-forgot__card" onSubmit={submitReset} noValidate>
            <h1>Forgot Password?</h1>
            <p>Enter your administrator email address below.<br />We&apos;ll send you a secure link to reset your<br />credentials.</p>
            <label className="admin-form__field admin-form__field--labeled">
              <span>EMAIL ADDRESS</span>
              <div>
                <Mail aria-hidden="true" />
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="admin@boostvertex.com" autoComplete="email" />
              </div>
            </label>
            <button className="admin-form__submit" type="submit" disabled={isSubmitting}>SEND RESET LINK</button>
            <div className="admin-forgot__divider" />
            <button className="admin-forgot__back" type="button" onClick={() => setLocation("/admin/login")}>Back to Login</button>
          </form>
        </section>
      </main>
    );
  }

  if (isResetPassword) {
    return (
      <main className="admin-auth admin-auth--forgot">
        <div className="admin-auth__grid" aria-hidden="true" />
        <section className="admin-forgot">
          <AdminBrand centered />
          <form className="admin-forgot__card" onSubmit={submitNewPassword} noValidate>
            <h1>Set New Password</h1>
            <p>Create a secure new password for your<br />Boost Vertex administrator account.</p>
            <label className="admin-form__field admin-form__field--labeled"><span>NEW PASSWORD</span><div><LockKeyhole aria-hidden="true" /><input type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 8 characters" autoComplete="new-password" /></div></label>
            <label className="admin-form__field admin-form__field--labeled"><span>CONFIRM PASSWORD</span><div><LockKeyhole aria-hidden="true" /><input type={showPassword ? "text" : "password"} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Repeat new password" autoComplete="new-password" /></div></label>
            <button className="admin-form__submit" type="submit" disabled={isSubmitting}>{isSubmitting ? "RESETTING..." : "RESET PASSWORD"}</button>
            <div className="admin-forgot__divider" />
            <button className="admin-forgot__back" type="button" onClick={() => setLocation("/admin/login")}>Back to Login</button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="admin-auth admin-auth--login">
      <section className="admin-auth__hero">
        <div className="admin-auth__hero-image" style={{ backgroundImage: `url(${industrialHeroUrl})` }} />
        <div className="admin-auth__hero-overlay" />
        <div className="admin-auth__hero-content">
          <AdminBrand />
          <div className="admin-auth__hero-copy">
            <h1>Accelerate your<br />marketing performance.</h1>
            <p>Secure access to the advanced analytics and<br />campaign management portal.</p>
          </div>
        </div>
      </section>

      <section className="admin-auth__panel">
        <div className="admin-auth__grid" aria-hidden="true" />
        <form className="admin-login-form" onSubmit={submitLogin} noValidate>
          <div className="admin-login-form__heading"><span>Admin Dashboard</span></div>
          <label className="admin-form__field">
            <UserRound aria-hidden="true" />
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Please enter email" autoComplete="email" />
          </label>
          <label className="admin-form__field">
            <LockKeyhole aria-hidden="true" />
            <input type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Please enter password" autoComplete="current-password" />
            <button className="admin-form__password-toggle" type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Hide password" : "Show password"}>
              {showPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
            </button>
          </label>
          <div className="admin-login-form__options">
            <label><input type="checkbox" /> <span>Remember me</span></label>
            <button type="button" onClick={() => setLocation("/admin/forgot-password")}>Forgot password?</button>
          </div>
          <button className="admin-form__submit" type="submit" disabled={isSubmitting}>{isSubmitting ? "SIGNING IN..." : "LOGIN"}</button>
        </form>
      </section>
      <Footer />
    </main>
  );
}
