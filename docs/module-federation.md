# Module Federation (Micro-Frontend) plan

This repo is currently a **host shell** (App Shell) with local modules (Home, Hotels, Auth). Routes for Flights/Cabs/Bus/etc render a shared **ComingSoon** placeholder until their micro-frontends are integrated.

## Goals

- **Independent deploy** for Flights/Hotels domains
- **Shared shell**: header/footer/theme/routing/auth tokens
- **Consistent UI**: shared Tailwind tokens + shared component library
- **Route-based loading**: only load a remote when user navigates to that module

## Recommended structure (host)

- `src/app/` — providers, layout, routing
- `src/shared/` — shared UI components, hooks, utils, design tokens
- `src/mfe/` — federation glue (remote manifests, typing, route adapters)
- `src/pages/` — local pages (only for modules owned by the host)

## How Flights/Hotels remotes will be integrated later

1. **Add Module Federation plugin** to Vite host + remotes
2. Expose each remote's root component (example: `flights/App`)
3. In the host, lazy-load the remote per route:

```tsx
const FlightsApp = React.lazy(() => import('flights/App'));

<Route
  path="/flights/*"
  element={
    <React.Suspense fallback={<ComingSoon moduleName="Flights" description="Loading Flights…" />}>
      <FlightsApp />
    </React.Suspense>
  }
/>
```

4. Make remotes consume shared singletons:

- `react`, `react-dom`, `react-router-dom`
- shared design system components (optional)

## Contract between host and remotes

- Remotes should use **host routing base path** (`/flights/*`, `/hotels/*`)
- Remotes should accept **auth token** (from `localStorage` or via props/context later)
- Remotes should use the same **API base path** (`/api`) to stay environment-agnostic

## Notes about Vite + Module Federation

There are multiple community plugins for Vite module federation. The integration step will require selecting one that supports your Vite version/build tooling. Keep this document as the source-of-truth for the architecture; tooling choice can change without changing app structure.

