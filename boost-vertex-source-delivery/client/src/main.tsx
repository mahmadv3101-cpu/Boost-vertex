import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./styles/SiteMotion.css";

const analyticsEndpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT?.trim();
const analyticsWebsiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID?.trim();

function loadAnalyticsWhenConfigured() {
  if (!analyticsEndpoint || !analyticsWebsiteId) return;

  let endpoint: URL;
  try {
    endpoint = new URL(analyticsEndpoint);
  } catch {
    return;
  }

  if (endpoint.protocol !== "http:" && endpoint.protocol !== "https:") return;

  const script = document.createElement("script");
  script.defer = true;
  script.src = `${endpoint.toString().replace(/\/$/, "")}/umami`;
  script.dataset.websiteId = analyticsWebsiteId;
  document.body.appendChild(script);
}

loadAnalyticsWhenConfigured();
createRoot(document.getElementById("root")!).render(<App />);
