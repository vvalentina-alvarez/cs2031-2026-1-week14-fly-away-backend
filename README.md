# CS2031 Week 07 – Flight Booking System API

REST API for a flight booking system built with Spring Boot, JWT authentication, and an event-driven notification layer. Developed as part of the CS2031 course at UTEC.

## Technologies

- Java 21 / Spring Boot 3.5.6
- Spring Security + JWT (Auth0 java-jwt)
- Spring Data JPA / Hibernate
- H2 in-memory database
- Lombok, ModelMapper, Jakarta Validation
- Maven

## Getting Started

```bash
./mvnw spring-boot:run
```

The server starts on `http://localhost:8080`. The H2 database is created fresh on each run.

## API Endpoints

### Auth

| Method | Path | Description |
|--------|------|-------------|
| POST | `/auth/login` | Login and receive a JWT token |

### Users

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/users/register` | None | Register a new user |
| GET | `/users/me` | USER / ADMIN | Get current user profile |
| GET | `/users` | ADMIN | List all users |

### Flights

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/flights` | USER / ADMIN | List all flights |
| POST | `/flights` | ADMIN | Create a flight |
| POST | `/flights/bulk` | ADMIN | Create multiple flights |
| GET | `/flights/search` | USER / ADMIN | Search by number, airline, or date range |
| POST | `/flights/{id}/book` | USER | Book a flight |

### Utilities

| Method | Path | Description |
|--------|------|-------------|
| DELETE | `/cleanup` | Reset all data (for testing) |

## Business Rules

- **Password**: minimum 8 characters, must contain at least one uppercase letter and one number.
- **Flight number format**: 2–3 letters followed by 3 digits (e.g. `LA123`).
- **Booking validations**:
  - Cannot book a flight that has already departed.
  - Cannot book two flights whose schedules overlap.
  - Booking reduces the available seat count.
- **Notifications**: Creating a flight or booking an existing one triggers a file-based notification via Spring application events.

## Project Structure

```
src/main/java/utec/week07/solution/
├── auth/           # JWT filter, login controller and service
├── users/          # User entity, registration, roles
├── flights/        # Flight & Booking entities, search, booking logic, events
├── cleanup/        # Test-only cleanup endpoint
└── common/         # Shared exceptions and DTOs
```

## Authentication

Send the token returned by `/auth/login` in every protected request:

```
Authorization: Bearer <token>
```
