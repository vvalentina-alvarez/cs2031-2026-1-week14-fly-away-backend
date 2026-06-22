# Laboratorio Semana 14 – Fly Away ✈️

Construye un frontend en React + TypeScript para la API de reserva de vuelos **Fly Away**.

El backend ya está funcionando y completamente documentado — tu trabajo es construir la aplicación web que lo consume.

---

## La tarea

Construye una aplicación de una sola página (SPA) con las siguientes funcionalidades:

### 1. Autenticación
- Registrar una nueva cuenta (`POST /users/register`)
- Iniciar sesión y almacenar el token JWT (`POST /auth/login`)
- Cerrar sesión (limpiar el token del almacenamiento)
- Mostrar el nombre del usuario autenticado en algún lugar de la pantalla (`GET /users/current`)

### 2. Búsqueda de vuelos
- Buscar vuelos por nombre de aerolínea, número de vuelo o rango de fechas de salida (`GET /flights/search`)
- Mostrar los resultados en una lista o tabla con: número de vuelo, aerolínea, hora de salida, hora de llegada, asientos disponibles

### 3. Reservar un vuelo
- Desde los resultados de búsqueda, permitir al usuario autenticado reservar un vuelo (`POST /flights/book`)
- Mostrar un mensaje de éxito o error (ej. "vuelo superpuesto", "vuelo pasado")

### 4. Mis reservas *(meta adicional)*
- Mostrar las reservas del usuario autenticado (necesitarás guardar los IDs de reservas en el cliente o extender el backend)

---

## Stack tecnológico

| Capa | Elección |
|------|----------|
| Framework | React 18 |
| Lenguaje | TypeScript |
| Build tool | Vite |
| Cliente HTTP | Axios (recomendado) o `fetch` |
| Estilos | A tu elección — CSS plano, Tailwind, MUI, etc. |

Inicializa el proyecto con:

```bash
npm create vite@latest fly-away-frontend -- --template react-ts
cd fly-away-frontend
npm install
npm install axios
npm run dev
```

---

## Conectarse al backend

El backend corre localmente en `http://localhost:8080`. Debes iniciarlo antes de correr tu frontend.

```bash
# En la carpeta del backend (este repositorio):
./mvnw spring-boot:run
```

Configura la URL base de Axios:

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

> **CORS:** El backend no restringe CORS en su configuración actual, por lo que las solicitudes desde `localhost:5173` (puerto por defecto de Vite) funcionarán sin problemas.

---

## Referencia de la API del backend

Toda la documentación de endpoints — rutas, cuerpos de solicitud, estructura de respuestas, requisitos de autenticación y reglas de negocio — está en **[README.md](./README.md)**.

---

## Entregables

- Una app React + TypeScript funcional que cubra como mínimo las funcionalidades 1–3
- Código limpio y legible (componentes separados por responsabilidad)
- Un `README.md` corto dentro de tu carpeta de frontend explicando cómo correrlo

---

## Consejos

- Guarda el JWT en `localStorage` por simplicidad
- Usa inputs de tipo `date`/`datetime-local` y convierte a formato ISO para los filtros de hora de salida (`2026-12-01T00:00:00Z`)
- El backend retorna `ProblemDetail` en los errores — revisa `error.response.data.detail` para obtener el mensaje
- Las horas de los vuelos usan ISO-8601 con offset de zona horaria — `new Date(str).toLocaleString()` las muestra de forma legible
