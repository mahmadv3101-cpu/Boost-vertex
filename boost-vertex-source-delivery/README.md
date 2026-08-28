# Boost Vertex Website

This repository contains the complete Boost Vertex website source, including the React/Vite frontend, server application, authentication scaffolding, database schema, API transport layer, administrative dashboard, public marketing pages, and responsive module implementations.

## Requirements

Use Node.js 20 or newer and pnpm 9 or newer. npm is also supported after dependencies are installed.

## Installation

From the project root, install dependencies with:

```bash
pnpm install
```

To use npm instead, run `npm install`.

Copy the values in `docs/env.example` into a local environment file and fill in the values supplied for the target environment. Never commit local environment files or private credentials.

## Development

Start the complete application locally with:

```bash
pnpm dev
```

The development server serves the website and server routes together. Set `VITE_API_URL` or `VITE_API_BASE_URL` to the deployed backend API when the backend is hosted separately. For local backend testing, use the API URL and port supplied by the backend developer.

## Validation and production build

Run the automated tests with:

```bash
pnpm test
```

Run the TypeScript check with:

```bash
pnpm exec tsc --noEmit
```

Create a production build with:

```bash
pnpm build
```

## Project structure

- `client/` contains the React pages, components, styles, frontend services, and public assets.
- `server/` contains the server entrypoint, authentication integration, API procedures, storage helpers, and database access.
- `drizzle/` contains the database schema and migration directory.
- `shared/` contains shared types and constants.
- `docs/` contains API, environment, and implementation handoff references.
- `backend/` contains backend integration handoff references supplied with the project.
- `client/public/assets/managed/` contains the image and artwork files previously referenced through deployment storage.

All application image references use local `/assets/managed/...` or `/...` paths, so the website assets render when the ZIP is run on a separate computer.

## Backend connection

The frontend uses the configured API base URL for public content, lead submissions, authentication, settings, and administrative operations. Approved design fallbacks remain available where a backend record is unavailable, keeping the website reviewable before deployment data is seeded.

The deployed backend URL, CORS origin, database credentials, mail configuration, and server-side reCAPTCHA secret must be supplied by the backend deployment owner. The browser receives only the public reCAPTCHA site key; private keys belong in the backend environment.
