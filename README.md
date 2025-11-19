# Event Ticket Platform — Frontend

A simple single-page app built with React, TypeScript and Vite. Implements OpenID Connect (Keycloak) authentication and provides attendee and organizer flows for publishing events, buying tickets, and validating QR codes.

## Features
- React 19 + TypeScript + Vite
- OIDC auth with `react-oidc-context` (Authorization Code + PKCE)
- Protected routes for dashboard and ticket actions
- Tailwind-based styling

## Quick start

### Prerequisites
- Node 18+ and npm
- Keycloak running locally or accessible

### Install and run
```bash
npm install
npm run dev
# open http://localhost:5173
```

### Build and preview
```bash
npm run build
npm run preview
```

## Keycloak (basic setup)

Create a client with these values:

- Realm: `event-ticket-platform`
- Client ID: `event-ticket-platform-app`
- Access Type: `Public`
- Standard Flow: ON
- Valid Redirect URIs:
    - `http://localhost:5173/callback`
    - `http://localhost:5173/*`
- Web Origins:
    - `http://localhost:5173`
- Home URL: `http://localhost:5173/`

Frontend config (src/main.tsx)
```ts
const oidcConfig = {
  authority: "http://localhost:9090/realms/event-ticket-platform",
  client_id: "event-ticket-platform-app",
  redirect_uri: "http://localhost:5173/callback",
  response_type: "code",
  scope: "openid profile email",
};
```

## How auth works 
- App calls `auth.signinRedirect()` to start login.
- Keycloak returns to `/callback?code=...&state=...`.
- `react-oidc-context` exchanges the code for tokens and sets auth state.
- Callback page waits for the provider to finish, then redirects back to the original page.

## Project layout
- `src/`
    - `pages/` — route pages (login, callback, attendee, organizer, dashboard)
    - `components/` — shared UI and `ProtectedRoute`
    - `main.tsx` — app bootstrap and AuthProvider config
    - `index.css` — styles