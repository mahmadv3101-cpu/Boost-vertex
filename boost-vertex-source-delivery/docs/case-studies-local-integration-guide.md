# Case Studies Page: Local Project Integration Guide

## Purpose

This guide explains how to add the completed **Case Studies** page to your existing Boost Vertex React project. It assumes that your local project already contains the completed Home, About, and Services Overview pages. The Case Studies page is a frontend-only React route with local filter/search behavior, responsive desktop/mobile layouts, backend-ready CTA attributes, and the approved Home-style mobile hero curve.

> **Important:** Do not add a second React project inside your current project. Copy the listed files into the matching folders of the project you already run with `npm run dev`.

## Files to Add

Add the following new page file. It renders the Case Studies hero, filters, case-study cards, metrics band, industry cards, quote, conversion panel, and mobile layout. It expects the shared files listed in the next section to be present.

| Local destination | Action | Why it is needed |
|---|---|---|
| `client/src/pages/CaseStudies.tsx` | **Add** | The complete `/case-studies` page component. |
| `client/public/45-2.svg` | **Add if missing** | The approved 390px Home-style green curve used in the Case Studies mobile hero. |
| `client/public/46-1622.svg` | **Add if missing** | The desktop Case Studies/Home hero curve. |
| `client/public/46-537.svg` | **Add if missing** | Fast Track Call icon. |
| `client/public/46-542.svg` | **Add if missing** | Fast Track Chat icon. |
| `client/public/46-547.svg` | **Add if missing** | Fast Track Book icon. |
| `client/public/46-552.svg` | **Add if missing** | Fast Track Inquiry icon. |

## Files to Replace or Merge

The following files are shared integration points. If you have already added the Services Overview page from this project, most of these files already exist locally. In that case, **replace them with the supplied versions only if your local versions are older**; otherwise merge the Case Studies additions carefully.

| Local destination | Action | Required Case Studies change |
|---|---|---|
| `client/src/App.tsx` | **Replace or merge** | Add `CaseStudies` import, the `/case-studies` route, and the `RouteScrollReset` component. The scroll reset ensures mobile menu navigation opens the new route at the top. |
| `client/src/pages/Home.tsx` | **Replace or merge** | Change both Home desktop and mobile Case Studies links from `#case-studies` to `/case-studies`. |
| `client/src/components/MarketingChrome.tsx` | **Replace or merge** | Shared desktop navigation, mobile hamburger menu, footer, and mobile Fast Track controls. Its Case Studies links point to `/case-studies`. |
| `client/src/data/marketingContent.ts` | **Replace or merge** | Adds the nine static `caseStudies` records used by cards, filters, and search. Keep the existing `services` data in this file. |
| `client/src/index.css` | **Replace or merge** | Contains the shared `mv-*` shell styles plus the Case Studies desktop/mobile styles, hero curve behavior, and mobile green-line removal. |

The page uses `lucide-react` for the six industry icons and `wouter` for client-side routes. Ensure both packages are installed in your local project before starting the development server.

```bash
npm install wouter lucide-react
```

## Conditional Support Files

Keep these files if your current `marketingContent.ts` imports the typed content contracts exactly as supplied. They are normally already present when the Services Overview page has been added.

| Local destination | Action | When it is required |
|---|---|---|
| `client/src/services/contentService.ts` | Add/keep | Required because `marketingContent.ts` imports `CaseStudyCardContent` from it. |
| `client/src/services/apiClient.ts` | Add/keep | Required by `contentService.ts` for the future API connection. |
| `client/src/types/api.ts` | Add/keep | Required by `apiClient.ts` for typed API errors. |

## Required Route Code

In `client/src/App.tsx`, ensure the page import and route exist. Place the specific route **before** any broad fallback route.

```tsx
import CaseStudies from "./pages/CaseStudies";

// Inside <Switch>
<Route path={"/case-studies"} component={CaseStudies} />
```

Also retain the route scroll reset from the supplied `App.tsx`:

```tsx
function RouteScrollReset() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

  return null;
}
```

This is important because it prevents the mobile hamburger menu from opening Case Studies at an old scroll position.

## Required Navigation Change

If you merge manually, search your Home page for both Case Studies anchors and replace this:

```tsx
href="#case-studies"
```

with this:

```tsx
href="/case-studies"
```

The shared mobile menu in `MarketingChrome.tsx` must also contain:

```tsx
<Link href="/case-studies" onClick={closeMenu}>Case Studies</Link>
```

## Final Local Verification

After copying the files, run the following commands from the folder containing `package.json`.

```bash
npm install
npm run check
npm run dev
```

Then open `http://localhost:3000/case-studies`. At a 390px-wide mobile viewport, open the hamburger menu on Home and select **Case Studies**. You should land at the top of the Case Studies hero, see the same green background curve used by the Home mobile hero, and see no thin green decorative line. At desktop width, confirm the page retains its large hero curve and Fast Track rail.

## Included Integration Package

The accompanying ZIP contains the current versions of the Case Studies page, shared route/navigation/data files, styles, support contracts, and required SVG assets. Use it as your source of truth when copying files into your own project.

## References

[1]: file:///home/ubuntu/figma-desktop-recreation-v2/client/src/pages/CaseStudies.tsx "Case Studies page component"
[2]: file:///home/ubuntu/figma-desktop-recreation-v2/client/src/App.tsx "Application routes and scroll reset"
[3]: file:///home/ubuntu/figma-desktop-recreation-v2/client/src/components/MarketingChrome.tsx "Shared marketing navigation and mobile menu"
[4]: file:///home/ubuntu/figma-desktop-recreation-v2/client/src/data/marketingContent.ts "Case Studies static content"
[5]: file:///home/ubuntu/figma-desktop-recreation-v2/client/src/index.css "Shared and Case Studies responsive styles"
