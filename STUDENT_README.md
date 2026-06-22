# Week 14 Lab – Fly Away ✈️

Build a React + TypeScript frontend for the **Fly Away** flight booking API.

The backend is already running and fully documented — your job is to build the user-facing web app that consumes it.

---

## The Task

Build a single-page app with the following features:

### 1. Authentication
- Register a new account (`POST /users/register`)
- Log in and store the JWT token (`POST /auth/login`)
- Log out (clear the token from storage)
- Show the logged-in user's name somewhere on screen (`GET /users/current`)

### 2. Flight Search
- Search flights by airline name, flight number, or departure date range (`GET /flights/search`)
- Display results in a list or table showing: flight number, airline, departure time, arrival time, available seats

### 3. Book a Flight
- From the search results, allow the logged-in user to book a flight (`POST /flights/book`)
- Show a success message or error (e.g. "overlapping flight", "past flight")

### 4. My Bookings *(stretch goal)*
- Show the logged-in user's bookings (you'll need to track booking IDs client-side or extend the backend)

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | React 18 |
| Language | TypeScript |
| Build tool | Vite |
| HTTP client | Axios (recommended) or `fetch` |
| Styling | Your choice — plain CSS, Tailwind, MUI, etc. |

Bootstrap with:

```bash
npm create vite@latest fly-away-frontend -- --template react-ts
cd fly-away-frontend
npm install
npm install axios
npm run dev
```

---

## Connecting to the Backend

The backend runs locally on `http://localhost:8080`. You must start it before running your frontend.

```bash
# In the backend folder (this repo):
./mvnw spring-boot:run
```

Set your Axios base URL:

```ts
// src/api.ts
import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:8080' });

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
```

> **CORS:** The backend does not restrict CORS in its current configuration, so requests from `localhost:5173` (Vite's default port) will work.

---

## Backend API Reference

All endpoint documentation — paths, request bodies, response shapes, auth requirements, and business rules — is in **[README.md](./README.md)**.

---

## Deliverables

- A working React + TypeScript app that covers at minimum features 1–3 above
- Clean, readable code (components split by responsibility)
- A short `README.md` inside your frontend folder explaining how to run it

---

## Tips

- Store the JWT in `localStorage` for simplicity
- Use `Date` inputs with ISO format for departure time filters (`2026-12-01T00:00:00Z`)
- The backend returns `ProblemDetail` on errors — check `error.response.data.detail` for the message
- Flight times use ISO-8601 with timezone offset — `new Date(str).toLocaleString()` renders them nicely
