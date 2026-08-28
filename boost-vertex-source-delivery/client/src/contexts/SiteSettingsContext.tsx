import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { contentService, type SiteSettingsContent } from "@/services/contentService";

interface SiteSettingsContextValue {
  settings: SiteSettingsContent | null;
  isLoading: boolean;
  error: string | null;
}

const SiteSettingsContext = createContext<SiteSettingsContextValue>({ settings: null, isLoading: true, error: null });

export function SiteSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettingsContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    contentService.getSiteSettings().then((response) => {
      if (!active) return;
      setSettings(response);
      setError(null);
    }).catch((requestError: unknown) => {
      if (!active) return;
      setError(requestError instanceof Error ? requestError.message : "Site settings could not be loaded.");
    }).finally(() => {
      if (active) setIsLoading(false);
    });
    return () => { active = false; };
  }, []);

  const value = useMemo(() => ({ settings, isLoading, error }), [settings, isLoading, error]);
  return <SiteSettingsContext.Provider value={value}>{children}</SiteSettingsContext.Provider>;
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}
