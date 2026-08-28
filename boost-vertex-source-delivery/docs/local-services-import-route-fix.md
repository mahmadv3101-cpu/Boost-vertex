# Local Services Import and Route Fix

In `client/src/pages/ServicesOverview.tsx`, remove the `.tsx` and `.ts` endings from the first two local imports. Use relative imports to avoid any `@/` alias configuration issue:

```tsx
import { Link } from "wouter";
import { MarketingFooter, MarketingHeader, MobileFastTrack } from "../components/MarketingChrome";
import { services } from "../data/marketingContent";
```

Ensure the file in `client/src/data/` is named exactly `marketingContent.ts` with a capital `C`. Then add the `/services` route to `client/src/App.tsx`:

```tsx
import ServicesOverview from "./pages/ServicesOverview";

<Route path={"/services"} component={ServicesOverview} />
```

Restart the development server after saving:

```bash
npm run dev
```
