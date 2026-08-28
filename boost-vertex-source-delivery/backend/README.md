# Future Backend Boundary

This directory intentionally contains documentation only. The delivered website is currently a front-end project, so no backend server, database, authentication, or third-party API credentials are included.

When the backend is added, keep its implementation behind the service contracts in `client/src/services/` and `client/src/types/api.ts`. The frontend expects an API base URL from `VITE_API_BASE_URL`, defaulting to `/api`.

Recommended future layout:

```text
backend/
├── api/             # route handlers and request validation
├── integrations/    # CRM, email, calendar, analytics, and payment adapters
├── persistence/     # database client, migrations, and repositories
└── README.md
```

