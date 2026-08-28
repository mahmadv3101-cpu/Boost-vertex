import { useEffect, useRef } from "react";

declare global {
  interface Window {
    grecaptcha?: {
      render: (container: HTMLElement, parameters: Record<string, unknown>) => number;
      reset: (widgetId?: number) => void;
    };
  }
}

const scriptId = "boost-vertex-recaptcha-v2";

function loadRecaptcha() {
  if (window.grecaptcha) return Promise.resolve();
  const existing = document.getElementById(scriptId) as HTMLScriptElement | null;
  if (existing) {
    return new Promise<void>((resolve, reject) => {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Security verification could not be loaded.")), { once: true });
    });
  }
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://www.google.com/recaptcha/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Security verification could not be loaded."));
    document.head.appendChild(script);
  });
}

interface RecaptchaCheckboxProps {
  onTokenChange: (token: string) => void;
  onLoadError: (message: string) => void;
  resetKey: number;
}

export function RecaptchaCheckbox({ onTokenChange, onLoadError, resetKey }: RecaptchaCheckboxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    if (!siteKey || !containerRef.current || widgetIdRef.current !== null) return;
    let active = true;
    loadRecaptcha().then(() => {
      if (!active || !containerRef.current || !window.grecaptcha || widgetIdRef.current !== null) return;
      widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
        sitekey: siteKey,
        callback: (token: string) => onTokenChange(token),
        "expired-callback": () => onTokenChange(""),
        "error-callback": () => {
          onTokenChange("");
          onLoadError("Security verification could not be completed. Please try again.");
        },
      });
    }).catch((error: Error) => onLoadError(error.message));
    return () => { active = false; };
  }, [onLoadError, onTokenChange, siteKey]);

  useEffect(() => {
    if (resetKey > 0 && widgetIdRef.current !== null && window.grecaptcha) window.grecaptcha.reset(widgetIdRef.current);
  }, [resetKey]);

  if (!siteKey) return null;

  return <div className="mv-recaptcha" aria-label="Security verification"><div ref={containerRef} /></div>;
}
