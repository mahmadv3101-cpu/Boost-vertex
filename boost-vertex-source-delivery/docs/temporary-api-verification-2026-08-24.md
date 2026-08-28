# Temporary API Verification — 24 August 2026

## Tested Endpoint Results

| Endpoint | Latest result | Notes |
|---|---|---|
| `GET /api/services` | HTTP 200 | Returns an empty paginated list. |
| `GET /api/blogs` | HTTP 200 | Returns an empty paginated list. |
| `GET /api/case-studies` | HTTP 200 | Returns an empty paginated list. |
| `GET /api/testimonials` | HTTP 200 | Returns an empty paginated list. |
| `GET /api/site-settings` | Browser success previously confirmed | Contact page browser request returned current company/contact/social settings after CORS configuration. A later direct tunnel request timed out, indicating temporary-tunnel/backend intermittency. |
| `GET /api/health` | Timed out in latest direct check | Other endpoints continued responding, so this endpoint needs backend investigation. |
| `POST /api/auth/login` | HTTP 200 | Documented development administrator account returned a session. Token values are not recorded here. |
| `GET /api/auth/me` | Previously HTTP 200; latest fresh request timed out | A prior response returned the expected administrator profile. The latest tunnel request was intermittent. |
| Invalid Bearer token on `GET /api/auth/me` | HTTP 401 | Confirms unauthorized response behavior used by frontend logout/redirect handling. |
| `GET /api/leads` | HTTP 200 | Returns an empty paginated list. |
| `GET /api/admin/analytics` | HTTP 200 | Returns analytics data. |
| `GET /api/admin/dashboard` | HTTP 200 | Latest response returned a summary payload with zero published CMS counts. |
| CORS preflight for `POST /api/leads` from `http://localhost:3000` | HTTP 204 | Allows origin, methods, `content-type`, and temporary ngrok request header. |

## Frontend Verification

The Contact page loads without current browser-console errors and its previous browser-side `GET /api/site-settings` request completed successfully. The frontend build and TypeScript validation pass after adding Google reCAPTCHA v2 Checkbox rendering, token forwarding, and documented lead payload mapping.

## Reliability Diagnosis

Repeated direct requests through the temporary tunnel showed fast connection establishment but an approximately 2.4–3.2 second time to first byte when successful. `GET /api/health` and `GET /api/auth/me` subsequently returned HTTP 200 in repeated checks. `GET /api/site-settings` returned HTTP 200 twice but one request timed out after 10 seconds with no response bytes. The same behavior occurs outside the frontend, so the frontend API transport is not the root cause. The transport has no client-side timeout or retry configuration that would cause this backend-side timeout.

The backend developer should inspect the local server and database logs while repeatedly requesting `/api/site-settings`, confirm the ngrok process stays connected, and check database query latency or event-loop blocking. A frontend fallback continues to preserve the Contact page layout, but it cannot make an unresponsive temporary backend route return data.

## Not Tested by Design

No lead was submitted or modified because the available backend does not provide a safe test-data cleanup contract. reCAPTCHA live verification is blocked until `localhost` is allowed in the Google reCAPTCHA settings and the rotated secret is configured on the backend. CMS page hydration and lead-table mapping cannot be verified with real records because all current content and lead lists are empty.
