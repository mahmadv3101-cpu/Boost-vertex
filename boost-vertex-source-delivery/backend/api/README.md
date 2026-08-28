# Planned API Contract

The frontend service adapters are prepared for the following backend routes:

| Method | Route | Purpose |
| --- | --- | --- |
| `POST` | `/api/leads` | Submit the Accelerate Growth form |
| `POST` | `/api/newsletter` | Subscribe to Insights |
| `POST` | `/api/fast-track` | Record or dispatch Call, Chat, Book, and Inquiry actions |
| `GET` | `/api/health` | Return service health information |

Add authentication, rate limiting, schema validation, persistence, and provider integrations here when the backend is implemented. Do not place secrets in the frontend or commit real credentials.

