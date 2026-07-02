# Fly Away — Sistema de Reserva de Vuelos

Aplicación de reserva de vuelos: un **frontend en React + TypeScript** que consume una **API REST en Spring Boot** con autenticación JWT.

- **Frontend:** React 18 + TypeScript + Vite + Tailwind CSS → carpeta [`frontend/`](./frontend)
- **Backend:** Spring Boot 3.5 + Spring Security (JWT) + H2 en memoria → carpeta [`src/`](./src)

---

## Cómo correr el proyecto

Necesitas **dos terminales** (el frontend consume el backend).

### 1. Backend (`http://localhost:8080`)

```bash
./mvnw spring-boot:run
```

Al iniciar se siembran automáticamente 5 usuarios y 15 vuelos de prueba. Usuarios de ejemplo (contraseña `Password1`): `ana.garcia@utec.edu.pe`, `carlos.lopez@utec.edu.pe`, etc.

> La base de datos H2 es en memoria: al reiniciar el backend se borra y se vuelve a sembrar.

### 2. Frontend (`http://localhost:5173`)

```bash
cd frontend
npm install
npm run dev
```

Abre `http://localhost:5173` en el navegador.

---

## Funcionalidades del frontend

| Funcionalidad | Endpoint | Tipo |
|---------------|----------|------|
| Registro con validación y redirección a login | `POST /users/register` | must have |
| Login + guardado de JWT en `localStorage` | `POST /auth/login` | must have |
| Nombre del usuario autenticado en la barra de navegación | `GET /users/current` | nice to have |
| Búsqueda por número de vuelo y aerolínea | `GET /flights/search` | must have |
| Filtro por rango de fechas de salida | `GET /flights/search` | nice to have |
| Reservar vuelo (solo autenticados) con mensaje de éxito | `POST /flights/book` | must have |
| Ver detalle de la reserva creada | `GET /flights/book/{id}` | nice to have |
| Mis reservas (IDs guardados en `localStorage`) | `GET /flights/book/{id}` | nice to have |
| Logout + rutas protegidas + navegación | — | must have |

Detalles de arquitectura y notas de implementación del frontend: [`frontend/README.md`](./frontend/README.md).

---

## Documentación de la API

La referencia completa de endpoints (rutas, cuerpos, respuestas, autenticación y reglas de negocio) está en **[BACKEND_API.md](./BACKEND_API.md)**.

## Tecnologías

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Axios, React Router
- **Backend:** Java 21, Spring Boot 3.5, Spring Security 6 + JWT, Spring Data JPA, H2, Lombok, ModelMapper, Maven
