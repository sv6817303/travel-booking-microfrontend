# Travel Booking Frontend — Application Workflow

This document describes how the app is structured, how users move through it, and how data flows from the UI to the backend.

---

## 1. Tech stack

| Layer | Technology |
|--------|------------|
| UI | React 19, TypeScript |
| Styling | Tailwind CSS v4, `index.css` theme tokens |
| Routing | React Router v7 (`BrowserRouter`) |
| Server state / caching | TanStack React Query (5 min stale, 10 min gc) |
| Client state | Redux Toolkit (`store/index.ts`) — mostly placeholder slices |
| HTTP | Axios (`baseURL: /api`) |
| Build | Vite (React plugin) |

---

## 2. App bootstrap

```
main.tsx
  └── StrictMode
        └── App (App.tsx)
              ├── Redux Provider (store)
              ├── QueryClientProvider
              └── Router
                    ├── SimpleHeader (fixed top)
                    ├── <main> (routes + top padding for header)
                    └── Footer
```

Every screen sits inside this shell: **header → page content → footer**.

---

## 3. Routes (URL → page)

| Path | Page | Role |
|------|------|------|
| `/` | `HomePage` | Hero, featured destinations, **SearchWidget** |
| `/search` | `SearchPage` | Hotel results + filters (reads query string) |
| `/destinations` | `DestinationPage` | Browse destinations |
| `/destinations/:id` | `DestinationPage` | Single destination |
| `/cabs` | `CabsPage` | Cabs |
| `/bus-ticket` | `BusTicketPage` | Buses |
| `/travel` | `TravelPage` | Trains / general travel |
| `/login` | `LoginPage` | Auth |
| `/signup` | `SignUpPage` | Registration |
| `/profile` | `ProfilePage` | “My Trips” / account (header link) |
| `/business-travel` | `BusinessTravelPage` | B2B |
| `/insurance` | `InsurancePage` | Insurance |
| `/itinerary`, `/itinerary/:id` | `ItineraryPage` | Trip planning |
| `/weather` | `WeatherPage` | Weather |
| `/gallery` | `GalleryPage` | Gallery |

---

## 4. Primary user workflows

### 4.1 Home → hotel search → results

1. User opens **`/`** (`HomePage`).
2. In **`SearchWidget`**, user chooses **Hotels**, fills city/dates/guests, clicks **SEARCH**.
3. App navigates to **`/search?destination=…&checkIn=…&checkOut=…&adults=…&children=…&rooms=…`**.
4. **`SearchPage`**:
   - Parses `location.search` with `URLSearchParams`.
   - Updates local filter state.
   - Calls **`searchService.searchHotels({ location: destination })`** → `GET /api/search/hotels?location=…`.
5. Results render as property cards; **Modify search** links back to **`/`** to change criteria.

**Note:** Flight-style URLs (`from`, `to`, `date`) also go to **`/search`**, but the page currently runs **hotel** search from `destination` / dates. Flight-specific listing would be a future extension (API already exposes `searchFlights`).

### 4.2 Home → flight form (navigation only)

1. User selects **Flights** in **`SearchWidget`**, enters From / To / Departure, clicks **SEARCH**.
2. Navigates to **`/search?from=…&to=…&date=…`**.
3. Same **`SearchPage`** mount logic: without `destination`, hotel search may run with an empty location (backend still returns mock hotels). Treat this as **UI + routing ready**, **flight results UI** not fully wired.

### 4.3 Destinations

- **`/destinations`**: list/browse (uses mock/static data where implemented).
- **`/destinations/:id`**: detail for one id from routing.

### 4.4 Authentication

1. **`/login`** or **`/signup`** → forms call **`authService.login`** / **`authService.signup`**.
2. On success: **`token`** and **`user`** JSON go to **`localStorage`**.
3. Axios interceptor attaches **`Authorization: Bearer <token>`** on later **`/api`** calls.
4. **`authService.logout`** clears storage (where used).

### 4.5 Header navigation

- Category links (Flights, Hotels, etc.) mostly route to **`/search`**, **`/cabs`**, **`/bus-ticket`**, **`/travel`**, **`/insurance`**, **`/destinations`**.
- **My Trips** → **`/profile`**.
- Mobile menu includes extra items (itinerary, weather, gallery, business).

---

## 5. API & development proxy

- Frontend calls **`/api/*`** (relative URLs).
- **Vite** (`vite.config.ts`) proxies **`/api`** → **`http://localhost:5000`** in dev.
- For production, you need the same origin or reverse proxy so **`/api`** reaches your backend.

**Implemented client services** (`src/services/api.ts`):

| Service | Methods | Backend path (typical) |
|---------|---------|-------------------------|
| `authService` | `login`, `signup`, `logout`, `getCurrentUser` | `POST /api/auth/login`, `POST /api/auth/signup` |
| `searchService` | `searchFlights`, `searchHotels` | `GET /api/search/flights`, `GET /api/search/hotels` |

---

## 6. State management (what is used where)

| Mechanism | Usage |
|-----------|--------|
| **React component state** | Forms, modals, `SearchWidget` tabs/dates/guests |
| **URL query params** | Search criteria shared with **`SearchPage`** (`useLocation` / `useSearchParams` in header) |
| **localStorage** | JWT + user snapshot after login/signup |
| **React Query** | Configured globally; individual pages may add `useQuery` as needed |
| **Redux** | Store is mounted; **`searchSlice.updateFilters`** exists but much of the app uses URL + local state instead of dispatching |

---

## 7. Important UI building blocks

| Component | Role |
|-----------|------|
| **`SimpleHeader`** | Global nav, auth CTAs, active state for search intent |
| **`SearchWidget`** | Tabbed flights/hotels/cabs/buses; navigates to `/search` with query |
| **`GuestSelector`** | Rooms / adults / children popover for hotel search |
| **`Footer`** | Links to main routes |
| **`pages/SearchPage`** | Hotel search results, sidebar filters, sort row |

Static/marketing content on home often comes from **`src/data/mockData.ts`**.

---

## 8. Alternate entry (legacy)

The repo may still contain **`SimpleApp.tsx`** and **`SimpleHomePage.tsx`**. The **live** entry point is **`main.tsx` → `App.tsx`**, not `SimpleApp`.

---

## 9. Typical local run order

1. Start backend on **port 5000** (or change Vite proxy + Axios base URL).
2. **`npm run dev`** — frontend requests **`/api/...`** get proxied to the backend.
3. Open **`/`**, run a **hotel** search to verify **`GET /search/hotels`** end-to-end.

---

## 10. API integration status (what actually calls the backend)

The UI has many routes, but **only three screens talk to `axios` / `services/api.ts`**. Everything else is **static React + `mockData`** (it works in the browser without a server).

### Backend routes that exist (`backend/server.js`)

| Method | Path | Handler |
|--------|------|--------|
| `POST` | `/api/auth/login` | Mock login (in-memory user list) |
| `POST` | `/api/auth/signup` | Mock signup (pushes to in-memory array) |
| `GET` | `/api/search/hotels` | Mock hotel JSON |
| `GET` | `/api/search/flights` | Mock flight JSON |

### Wired on the frontend (works only if backend is running)

| Feature | Frontend | Backend | Notes |
|---------|----------|---------|--------|
| **Hotel search results** | `SearchPage` → `searchService.searchHotels` | `GET /api/search/hotels` | Needs **`npm run dev`** (proxy) or production proxy to same host. If the server is **off**, the request fails → **`catch` logs only** → list stays **empty** (no fallback data). |
| **Sign up** | `SignUpPage` → `authService.signup` | `POST /api/auth/signup` | Users stored in **`users = []` in memory** — **lost when the Node process restarts**. |
| **Login** | `LoginPage` → `authService.login` | `POST /api/auth/login` | Works only for emails that exist in that **same running** server instance (usually after signup in the same session). |

### Defined in `api.ts` but not used by any page

| Client method | Backend | Problem |
|---------------|---------|---------|
| `searchService.searchFlights` | `GET /api/search/flights` exists | **No component imports or calls it.** |

### Flight search from the home widget (gap)

- **Hotels:** `SearchWidget` → `/search?destination&checkIn&…` → `SearchPage` calls **`searchHotels`** — **correct path.**
- **Flights:** `SearchWidget` → `/search?from&to&date` → `SearchPage` still only uses **`destination`** and **`searchHotels`**. Flight query params are **ignored** for API purposes — so **flight search is front-end navigation only**, not a real flight API call.

### Pages with **no** API usage (UI / mock only)

Home hero, destinations, cabs, buses, travel, insurance, business travel, profile, itinerary, weather, gallery — **no** `fetch`/`axios` to your Express app in `src/pages` (aside from the three above). Data comes from **`mockData`**, placeholders, or empty state.

### React Query

`QueryClientProvider` is mounted in **`App.tsx`**, but **`useQuery` is not used anywhere** — all live requests today are **manual** `async` in `SearchPage` / form submits for auth.

### Why “only the front works”

Common cases:

1. **Backend not started** — `http://localhost:5000` down → hotel search and auth **fail**; rest of the site still renders.
2. **`vite preview` / static hosting** — there is **no** dev proxy → `/api` returns **404** unless you configure the host or set **`axios` `baseURL`** to your API URL.
3. **Login after server restart** — mock DB is empty until someone **signs up again**.

---

*Generated for the `travel-booking-frontend` project — adjust this file if you add routes, change the proxy, or wire flight results on `/search`.*
