# Boost Vertex Contact Page — Local npm Integration Guide

This guide installs the completed Contact page—including its desktop and mobile Figma layouts—into an existing React, TypeScript, Vite, and npm project. The supplied package contains the page source, its backend-ready service contracts, the four Fast Track icons, and a stylesheet fragment. It does **not** contain `node_modules`, build output, environment secrets, or any database credentials.

## 1. Files to Add

Copy the following files from the supplied package into the same paths in your local project. Create the folders if they do not already exist.

| Package file | Destination in your local project | Purpose |
|---|---|---|
| `client/src/pages/Contact.tsx` | `client/src/pages/Contact.tsx` | The complete Contact page, including form validation and responsive content variants. |
| `client/src/services/contactService.ts` | `client/src/services/contactService.ts` | Future API adapter for `POST /contact`. It is safe to add now; the visual form runs without a backend. |
| `client/src/services/apiClient.ts` | `client/src/services/apiClient.ts` | Shared API request helper used by `contactService.ts`. Add it only if it is not already present. |
| `client/src/types/contact-api-snippet.ts` | Merge into `client/src/types/api.ts` | The Contact request/API response interfaces. Do **not** replace an existing larger `api.ts`; merge the snippet. |
| `client/public/46-537.svg` | `client/public/46-537.svg` | Fast Track Call icon. |
| `client/public/46-542.svg` | `client/public/46-542.svg` | Fast Track Chat icon. |
| `client/public/46-547.svg` | `client/public/46-547.svg` | Fast Track Book icon. |
| `client/public/46-552.svg` | `client/public/46-552.svg` | Fast Track Inquiry icon. |
| `client/public/contact-figma-hero-background-clean.png` | `client/public/contact-figma-hero-background-clean.png` | The Figma-derived technical dashboard/network background for the Contact mobile hero. |

> The Contact page imports `MarketingHeader` and `MarketingFooter` from `client/src/components/MarketingChrome.tsx`. If your local project does not already contain this shared component, copy the supplied `MarketingChrome.tsx` as a replacement for that component before starting the app.

## 2. Existing Files to Update

The following files already exist in a typical Boost Vertex local project. **Merge** the listed changes rather than deleting page-specific changes you made for Home, About, Services, Case Studies, or Blog.

| Existing file | Required change | Exact source to use |
|---|---|---|
| `client/src/App.tsx` | Import `Contact`, add the `/contact` route, and keep the `RouteScrollReset` helper. | `client/src/snippets/contact-app-route-snippet.tsx` |
| `client/src/components/MarketingChrome.tsx` | Include `contact` in `ActiveRoute`, add the desktop/mobile Contact links, and retain the shared header/footer. | The supplied full replacement file. |
| `client/src/index.css` | Append the entire Contact CSS section at the **very end** of the file. | `client/src/styles/contact-styles.css` |
| `client/src/pages/Home.tsx` | Change every Contact link to `href="/contact"`. | Search for `#contact`, `#footer-contact`, or a Contact button and replace only its destination. |
| `client/src/pages/About.tsx` | Change every Contact link to `href="/contact"`. | Search for `#contact` or Contact buttons and replace only their destination. |
| `client/src/types/api.ts` | Merge the four interfaces from the supplied type snippet if they are missing. | `client/src/types/contact-api-snippet.ts` |

## 3. Exact Route Code

In `client/src/App.tsx`, add this import with the other page imports:

```tsx
import Contact from "./pages/Contact";
```

Then add this route **before** the `/404` route and the final fallback route:

```tsx
<Route path={"/contact"} component={Contact} />
```

If your `App.tsx` does not already reset scroll after navigation, add this import:

```tsx
import { useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
```

Then add this helper above `Router()` and render `<RouteScrollReset />` immediately inside `Router()`:

```tsx
function RouteScrollReset() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

  return null;
}
```

## 4. Shared Navigation Code

In `MarketingChrome.tsx`, the route type must include Contact:

```tsx
type ActiveRoute = "services" | "case-studies" | "about" | "blog" | "contact";
```

Add the following desktop navigation item beside the other `Link` items:

```tsx
<Link href="/contact" aria-current={active === "contact" ? "page" : undefined}>
  Contact
</Link>
```

Add the following mobile navigation item inside the mobile menu. The `onClick={closeMenu}` part is important because it closes the hamburger menu after navigation:

```tsx
<Link href="/contact" onClick={closeMenu}>Contact</Link>
```

## 5. Styling Instructions

Open `client/src/index.css`, scroll to its last line, and paste the **complete** contents of `client/src/styles/contact-styles.css`. Do not paste it inside another `@media` rule. It contains the desktop Contact layout and the scoped `@media (max-width: 640px)` mobile Figma overrides. The local package stylesheet already points to `/contact-figma-hero-background-clean.png`; do not replace that URL with a Manus storage URL in your local project.

The stylesheet expects the existing shared styles for these classes: `.mv-wrap`, `.mv-header`, `.mv-footer`, `.mv-mobile-nav`, `.mv-button`, `.mv-sr-status`, and `.mv-action-feedback`. These come from the supplied `MarketingChrome.tsx`/site-wide implementation. Keep your existing shared styles if you have already installed Home, About, Services, Case Studies, or Blog.

## 6. API Contract for the Backend Later

The visual form validates fields locally today. When the backend is ready, call `contactService.submitContactRequest(form)` inside the valid branch of the `submit` function in `Contact.tsx`.

| Field | Type | Required |
|---|---|---|
| `fullName` | string | Yes |
| `phoneNumber` | string | Yes |
| `emailAddress` | string | Yes; valid email format |
| `company` | string | Yes |
| `strategicQuery` | string | Yes |

The supplied API adapter sends a JSON `POST` request to `/api/contact` by default. Set `VITE_API_BASE_URL` in a local `.env` file later if the backend uses another base URL:

```env
VITE_API_BASE_URL=https://your-api-domain.example/api
```

## 7. Install and Test Locally

From the project root in VS Code Terminal, run:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, then test `http://localhost:3000/contact` or the port Vite shows. Test the following points before you continue:

| Check | Expected result |
|---|---|
| Desktop `/contact` | Olive hero, right-side Fast Track rail, two-column message/form area, three status cards, horizontal protocol, operations panel, and footer. |
| Mobile `/contact` at 390px width | Compact hamburger header, Figma-derived dashboard/network hero with dark overlay, single-column form, vertical status cards and protocol, fixed Call/Chat/Book/Inquiry Fast Track tray, and compact footer. |
| Empty form submission | A visible validation message asks the user to complete required fields. |
| Hamburger menu | Opens all routes and closes after selecting Contact. |
| Build | `npm run check` and `npm run build` complete without errors. |

If your local project does not support the `@/` import alias, replace the two imports in `Contact.tsx` with relative paths:

```tsx
import { MarketingFooter, MarketingHeader } from "../components/MarketingChrome";
```

Do the same for `@/types/api` and `@/services/...` imports in the service files, if you add them.

## 8. Important Safety Note

Do not put database usernames, passwords, or MongoDB connection strings in the frontend files or in a Vite `VITE_*` variable. Database access belongs only in the future backend environment. The Contact page source in this package contains no credentials.
