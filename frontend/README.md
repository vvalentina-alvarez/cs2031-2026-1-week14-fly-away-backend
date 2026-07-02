# Fly Away — Frontend ✈️

SPA en **React 18 + TypeScript + Vite** que consume la API de reserva de vuelos **Fly Away**.
Cubre todas las funcionalidades del laboratorio (must have + nice to have).

## Requisitos

- Node.js 18+ y npm
- El **backend corriendo** en `http://localhost:8080` (ver el `README.md` de la raíz del repo):
  ```bash
  # desde la raíz del repo (backend)
  ./mvnw spring-boot:run
  ```

## Cómo correrlo

```bash
cd frontend
npm install
npm run dev
```

Abre la URL que imprime Vite (por defecto `http://localhost:5173`).

### Otros comandos

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo con hot reload |
| `npm run build` | Compila TypeScript y genera el build de producción en `dist/` |
| `npm run preview` | Sirve el build de producción localmente |

## Configuración

La URL del backend se lee de la variable de entorno `VITE_API_URL` (ver `.env`):

```
VITE_API_URL=http://localhost:8080
```

Si no se define, cae por defecto a `http://localhost:8080`.

## Funcionalidades implementadas

| Funcionalidad | Endpoint | Estado |
|---------------|----------|--------|
| Registro con validación y redirección a login | `POST /users/register` | ✅ must have |
| Login + guardado de JWT en `localStorage` | `POST /auth/login` | ✅ must have |
| Mostrar usuario autenticado en la barra de navegación | `GET /users/current` | ✅ nice to have |
| Búsqueda por número de vuelo y aerolínea | `GET /flights/search` | ✅ must have |
| Filtro por rango de fechas de salida | `GET /flights/search` | ✅ nice to have |
| Reservar vuelo (solo autenticados) con mensaje de éxito | `POST /flights/book` | ✅ must have |
| Ver detalle de la reserva creada | `GET /flights/book/{id}` | ✅ nice to have |
| Mis reservas (IDs guardados en `localStorage`) | `GET /flights/book/{id}` | ✅ nice to have |
| Logout + rutas protegidas + navegación | — | ✅ must have |

## Estructura

```
src/
├── api/            # Cliente axios + servicios tipados (auth, user, flight)
│   ├── client.ts       # instancia axios + interceptores (JWT y 401)
│   ├── authApi.ts
│   ├── userApi.ts
│   └── flightApi.ts
├── components/     # UI reutilizable (NavBar, FlightTable, BookingCard, alertas, ProtectedRoute)
├── context/        # AuthContext (estado global de sesión)
├── hooks/          # useAuth
├── pages/          # RegisterPage, LoginPage, FlightSearchPage, MyBookingsPage
├── types/          # Interfaces TS que reflejan los DTOs del backend
├── utils/          # errorHandler, dateUtils, storage
├── App.tsx         # rutas (react-router-dom)
└── main.tsx
```

## Notas de implementación

- **Autenticación:** el JWT se guarda en `localStorage` y se adjunta automáticamente a cada request
  vía un interceptor de axios. Un `401` limpia la sesión y redirige a `/login`.
- **Manejo de errores:** el backend responde con dos formatos —`ProblemDetail` (`{ detail }`) para
  reglas de negocio y texto plano para errores de validación de Jakarta—. `utils/errorHandler.ts`
  cubre ambos casos.
- **Fechas:** los inputs `datetime-local` se convierten a ISO-8601 UTC (`...Z`) antes de enviarse en
  los filtros; las fechas del backend se muestran con `toLocaleString()`.
- **Mis reservas:** el backend no expone un listado de reservas por usuario, así que los IDs de las
  reservas creadas se guardan en `localStorage` y se resuelven uno a uno con `GET /flights/book/{id}`.
