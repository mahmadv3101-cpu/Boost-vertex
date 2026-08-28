# Boost Vertex Project Architecture

The project is intentionally split into clear boundaries so the current visual front end can be connected to services later without rewriting the page.

| Area | Location | Responsibility |
| --- | --- | --- |
| React UI | `client/src/` | Page markup, interaction state, responsive styling, and animation |
| Static assets | `client/public/` | Local Figma-exported SVG, WebP, and PNG files |
| API adapters | `client/src/services/` | Browser-side request functions and backend boundary |
| Shared contracts | `client/src/types/` | Stable request/response payload types |
| Backend plan | `backend/` | Future route, integration, and persistence structure |
| Project tooling | `package.json`, `vite.config.ts`, `tsconfig.json` | Install, development, checking, and build configuration |

The page remains usable without a backend. Once services are available, set `VITE_API_BASE_URL` and connect the existing UI event boundaries to the service adapters.

