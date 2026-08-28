# Services Overview: Local VS Code Handoff

## Scope

This handoff contains the current **Services Overview** implementation at `/services`, including its desktop and mobile layouts, Chivo typography calibration, paired-phone artwork, mobile Fast Track controls, responsive footer treatment, and the typed local service-card content.

> **Important:** This package does **not** build or replace the Service Detail page. The Service Detail design has not been supplied for implementation yet.

## Can this be added to a local computer automatically?

The project in this workspace has already been updated. However, I cannot access or write directly into your personal VS Code folder or computer. Download the ZIP, extract it, and then copy or merge the listed files into the corresponding locations in your local project.

## Included files

| ZIP path | Copy or merge into your local project | Purpose |
|---|---|---|
| `client/src/pages/ServicesOverview.tsx` | `client/src/pages/ServicesOverview.tsx` | The complete `/services` page markup, CTA boundaries, capability-card loop, and mobile conversion variants. |
| `client/src/components/MarketingChrome.tsx` | `client/src/components/MarketingChrome.tsx` | Shared header, mobile menu, Services-aware footer, and mobile Fast Track controls. Replace this only if your current shared marketing component is the same base component; otherwise merge the Services-specific footer additions manually. |
| `client/src/data/marketingContent.ts` | `client/src/data/marketingContent.ts` | Six Services card records and local future-backend content. |
| `client/src/services/contentService.ts` | `client/src/services/contentService.ts` | Type contracts used by the Services content file and future API integration. |
| `client/src/services/apiClient.ts` | `client/src/services/apiClient.ts` | Required support import for the typed content service. |
| `client/src/types/api.ts` | `client/src/types/api.ts` | Shared API envelope types required by `contentService.ts`. |
| `snippets/App.services-route.snippet.tsx` | Merge into your existing `client/src/App.tsx` | The minimal import and `/services` route lines needed without overwriting your unrelated routes. |
| `client/src/index.css` | Merge the Services blocks into `client/src/index.css` | Contains all `.mv-*` shared marketing styles and `.mv-services-page` desktop/mobile refinements. This is a full current stylesheet, so do not overwrite unrelated local work without a backup. |
| `client/index.html` | Merge the Chivo Google Fonts `<link>` into `client/index.html` | Loads normal and true italic Chivo weights used by the Services design. |
| `client/public/services-approach-phones-alpha.png` | `client/public/services-approach-phones-alpha.png` | Sharp paired-phone artwork for local Vite use. |
| `client/public/46-537.svg`, `46-542.svg`, `46-547.svg`, `46-552.svg` | Same `client/public/` folder | Call, Chat, Book, and Inquiry icons used by the fixed mobile Fast Track rail. |

## Required local changes

First, make a backup or commit your existing local project. Then copy the page, content, support-service, public asset, and icon files from the ZIP into the identical paths in your project.

The hosted project uses the persistent artwork path below:

```tsx
src="/manus-storage/services-approach-phones-alpha_d87eba09.png"
```

For a standalone local Vite project, replace that `src` value in `ServicesOverview.tsx` with the packaged local path:

```tsx
src="/services-approach-phones-alpha.png"
```

Next, merge the following Services Overview route into your `App.tsx` file. If you later add the Service Detail page, keep `/services` before `/services/:slug`.

```tsx
import ServicesOverview from "./pages/ServicesOverview";

<Route path={"/services"} component={ServicesOverview} />
```

If your Home page does not already open Services, update both desktop and mobile Services navigation links to `/services`. Do not replace the entire `Home.tsx` unless it is the same version as this project; change only those two route targets.

## Alias and dependency requirements

The files use the alias `@/`, which must resolve to `client/src`. If your project already uses the same Vite/TypeScript configuration, no change is required. If imports fail, either configure that alias or replace imports such as `@/components/MarketingChrome` with correct relative paths.

The routing dependency is **Wouter**. Run the following only if it is not already installed:

```bash
npm install wouter
```

Then install all project dependencies and start the local server:

```bash
npm install
npm run dev
```

## Verification checklist

Open `http://localhost:5173/services` after starting the server. Confirm that the desktop page has the centered channel-to-growth hero board, paired-phone approach artwork, six capability cards, lime conversion panel, and footer. At a **390px** browser width, confirm the solid-lime mobile hero emphasis, full-width stacked CTAs, phone artwork above the approach copy, single-column cards, compact footer, and fixed Fast Track rail.

Finally, run:

```bash
npm run check
npm run build
```

If either command fails because your local structure differs, do not replace unrelated files blindly. Share the specific error and the relevant existing file, and the changes can be adapted as a targeted merge.
