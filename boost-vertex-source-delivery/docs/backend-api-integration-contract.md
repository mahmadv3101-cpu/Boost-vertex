# Boost Vertex Backend API Integration Contract

## Source and Availability

The supplied integration guide defines a development API base of `http://localhost:5000/api` and recommends the configurable frontend value `VITE_API_URL`. It lists `https://boostvertex.com/api` as the production base. A health check of that production URL on 24 August 2026 returned a domain-for-sale page rather than API data, so it is **not a usable deployed backend endpoint** for this project. The frontend must therefore use a configurable environment value until the backend team provides the actual public API URL and permits this deployed frontend origin through CORS.

## Temporary Tunnel Validation — 24 August 2026

The supplied HTTPS tunnel was reachable through the configured local-only `VITE_API_URL` and passed the documented health check. The frontend transport also supports the temporary ngrok warning-bypass header through a local-only environment variable; neither temporary value belongs in production source or final deployment settings.

| Endpoint group | Result | Frontend behavior |
|---|---|---|
| `GET /services`, `/blogs`, `/case-studies`, `/testimonials` | Reachable; each list is currently empty | Approved Figma content remains the visible fallback until CMS data is added. |
| `GET /site-settings` | Reachable with published contact metadata | Contact page fetches the settings and retains approved local details if the request fails. |
| `POST /auth/login`, `GET /auth/me` | Reachable with the documented development administrator account | Admin Login stores the JWT session; the header uses the returned profile and a 401 clears the session before routing to Login. |
| `GET /leads` | Reachable; current list is empty | Authenticated desktop Leads switches to the Figma empty-state presentation; direct Figma review URLs retain their fixtures. |
| `GET /admin/analytics` | Reachable | Available for a future analytics-specific dashboard view. |
| `GET /admin/dashboard` | Did not respond within the validation timeout | The dashboard overview retains the approved Figma fixture data until this endpoint is corrected or made responsive. |

Temporary browser testing required both the external preview origin and the local browser origin in the backend CORS allow-list. The deployed backend must later replace those temporary test origins with the final production frontend domain only.

## Public Endpoints

| Frontend responsibility | Endpoint | Method | Expected model |
|---|---|---|---|
| Service listing / featured services | `/services?page&limit&sort` | GET | `{ data, pagination }` |
| Service detail | `/services/:slug` | GET | Service resource |
| Blog listing / detail | `/blogs`, `/blogs/:slug` | GET | Blog list / resource |
| Case-study listing / detail | `/case-studies`, `/case-studies/:slug` | GET | Case-study list / resource |
| Testimonials | `/testimonials` | GET | `{ data, pagination }` |
| Global contact settings | `/site-settings` | GET | Settings resource |
| Contact / CTA form | `/leads` | POST | Lead submission payload |

## Admin Endpoints

The login endpoint is `POST /auth/login`, returning an admin resource with a JWT token. Store it as `adminToken`; all protected calls send `Authorization: Bearer <token>`. A 401 must clear local state and return to `/admin/login`.

| Responsibility | Endpoint | Method |
|---|---|---|
| Current profile | `/auth/me` | GET |
| Dashboard summary | `/admin/dashboard` | GET |
| Analytics | `/admin/analytics` | GET |
| Lead list | `/leads?status&isRead&source&q&page&limit` | GET |
| Lead status | `/leads/:id/status` | PATCH |
| Lead read state | `/leads/:id/read` | PATCH |
| Admin content list | `/:resource/admin/list` | GET |
| Content create / update / delete | `/:resource`, `/:resource/:id` | POST / PUT / DELETE |
| Site settings update | `/site-settings` | PUT |

## Integration Constraints

The documented public response format is `{ data, pagination }`; errors are `{ statusCode, message }`. The protected admin and CMS screens require API work beyond visual state transitions. The guide does not document endpoints for media uploads, industry pages, contact-message listing, newsletter subscriptions, blog comments, notifications, or separate lead create/edit/delete operations. Those parts remain frontend-only until the backend contract is extended.

## Existing Frontend Mapping

| Current frontend surface | Existing source | Backend integration action |
|---|---|---|
| Home service, case-study, testimonial sections | `marketingContent.ts` | Hydrate from public list endpoints while retaining approved Figma fallback content if CMS data is unavailable. |
| Services Overview and Service Detail | `marketingContent.ts`, service routes | Use `/services` and `/services/:slug`. |
| Blog List and Blog Detail | `blogContent.ts` | Use `/blogs` and `/blogs/:slug`; preserve rich Figma-only fields as local presentation fallback where the API does not provide imagery or reading metadata. |
| Case Studies and detail | `marketingContent.ts` | Use `/case-studies` and `/case-studies/:slug`; normalize `results` / `capabilities`. |
| Contact and CTA forms | `Contact.tsx` and form placeholders | Translate UI fields into the documented `POST /leads` payload. |
| Admin Login | `AdminLogin.tsx` local-only form | Replace local navigation with JWT login; store `adminToken`, route only on success, and clear on 401. |
| Admin Dashboard and Leads | `AdminDashboard.tsx` static fixtures | Fetch `/admin/dashboard`, `/auth/me`, and protected `/leads`; retain Figma-only presentation fallbacks until API is reachable. |
| Header, footer, contact metadata | `approvedContact` in local content | Contact-page settings fetch is connected to `/site-settings`; shared header/footer hydration remains a future extension, while approved local values remain the safe fallback. |

## Documented API Gaps Blocking Full Feature Parity

Industry pages, CMS media, newsletter signup, blog comments, Fast Track action logging, contact-message inboxes, notification feeds, password reset, and full lead creation/edit/delete are not covered by the guide. Those UI states cannot perform real backend actions until the backend team exposes endpoint contracts for them.
