# Lab 09: Security, Middleware, Guards and Pipes

A NestJS project implementing authentication, authorization, custom middleware, custom pipes, security headers, and DTO validation.

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Application
```bash
npm run start:dev
```
The application will run on `http://localhost:3000`.

### 3. Run Automated Tests
With the server running in another terminal (or using `node dist/main.js`):
```bash
node test-all.mjs
```

---

## Pre-seeded Credentials
- **Admin User**: `email`: `admin@example.com`, `password`: `Admin1234`
- **Normal User**: `email`: `user@example.com`, `password`: `User1234`

---

## Tasks Overview & Files Changed

### Task 1: Secure Application Bootstrap
- **Files Changed**: `src/main.ts`
- **Why**:
  - Integrated `helmet()` to automatically send secure HTTP response headers (`X-Content-Type-Options: nosniff`, etc.).
  - Restricted CORS to `http://localhost:5173` to prevent unauthorized cross-origin requests.
  - Configured global `ValidationPipe` with `whitelist: true`, `forbidNonWhitelisted: true`, and `transform: true` to strip/reject unauthorized incoming payload fields.

### Task 2: DTO Validation and Update Endpoint
- **Files Changed**:
  - `src/notes/dto/create-note.dto.ts`
  - `src/notes/dto/update-note.dto.ts`
  - `src/notes/note.entity.ts`
  - `src/notes/notes.service.ts`
  - `src/notes/notes.controller.ts`
  - `src/common/pipes/positive-int.pipe.ts`
- **Why**:
  - Added optional `tags` array to `CreateNoteDto` (max 5 items, max 20 characters per tag).
  - Derived `UpdateNoteDto` using `PartialType(CreateNoteDto)` from `@nestjs/mapped-types`.
  - Added `PositiveIntPipe` to validate route parameter IDs (> 0 integer).
  - Added `PATCH /notes/:id` where only the note owner or an admin is allowed to update (otherwise returns 403 Forbidden).

### Task 3: Custom Middleware (Request ID & Logger)
- **Files Changed**:
  - `src/common/middleware/request-id.middleware.ts`
  - `src/common/middleware/logger.middleware.ts`
  - `src/app.module.ts`
- **Why**:
  - `RequestIdMiddleware` generates a unique UUID using `crypto.randomUUID()`, stores it on `req.id`, and attaches it to the response header `X-Request-Id`.
  - `LoggerMiddleware` reads `req.id` and outputs request timing and method in the format `[3f2a...] GET /notes -> 200 (4ms)`.
  - Registered both middleware in `AppModule` so `RequestIdMiddleware` executes before `LoggerMiddleware`.

### Task 4: Custom Pipe (SortOrderPipe)
- **Files Changed**:
  - `src/common/pipes/sort-order.pipe.ts`
  - `src/notes/notes.controller.ts`
  - `src/notes/notes.service.ts`
- **Why**:
  - `SortOrderPipe` normalizes query param `order` to lowercase `'asc'` or `'desc'`.
  - Defaults to `'asc'` if omitted. Throws `BadRequestException` ("order must be asc or desc") if invalid.
  - Used on `GET /notes` to sort the user's notes alphabetically by title.

### Task 5: Authentication (Change Password)
- **Files Changed**:
  - `src/auth/dto/change-password.dto.ts`
  - `src/auth/auth.service.ts`
  - `src/auth/auth.controller.ts`
  - `src/users/users.service.ts`
- **Why**:
  - Created `POST /auth/change-password` protected by `AuthGuard`.
  - Validates `currentPassword` with `bcrypt.compare` (throws 401 if incorrect).
  - Validates `newPassword` (min 8 chars, 1 uppercase, 1 digit) and ensures it is not identical to current password (throws 400 if same).
  - Hashes new password with bcrypt and calls `usersService.updatePassword()`. Returns `{ "message": "Password updated" }` without leaking hash.

### Task 6: Authorization (Admin Users List)
- **Files Changed**:
  - `src/users/users.controller.ts`
  - `src/users/users.module.ts`
  - `src/common/guards/auth.guard.ts`
  - `src/common/guards/roles.guard.ts`
  - `src/common/decorators/roles.decorator.ts`
- **Why**:
  - Added `GET /users` route protected by `@UseGuards(AuthGuard, RolesGuard)` and `@Roles('admin')`.
  - Normal users receive 403 Forbidden; unauthenticated requests receive 401 Unauthorized.
  - Admin receives a mapped list containing `id`, `name`, `email`, and `role` (never `passwordHash`).

---

## Reflection Questions (Viva Preparation)

### 1. What is the difference between a 401 and a 403 response? Give one example from your project for each.
- **Answer**:
  - **401 Unauthorized** means the client has not authenticated or provided invalid authentication credentials (identity is unverified). Example: Calling `GET /users` or `POST /auth/change-password` without a Bearer token or with an expired token.
  - **403 Forbidden** means the client is successfully authenticated, but does not have permission to access the resource. Example: A logged-in regular user trying to access the admin-only `GET /users` route or trying to `PATCH /notes/:id` belonging to another user.

### 2. Why must validation happen on the server even when the front end already validates the form?
- **Answer**:
  Client-side validation is solely for user experience and can easily be bypassed using tools like Postman, curl, browser dev tools, or malicious scripts. The server is the authoritative barrier protecting data integrity and security, so server-side validation is mandatory to prevent invalid, malformed, or injected data.

### 3. A JWT payload is readable by anyone. Why is the token still safe to use for authentication?
- **Answer**:
  A JWT includes a cryptographic signature generated using a secret key held only by the server. Even though anyone can decode and read the base64-encoded payload, any tampering with payload data will invalidate the signature, causing the server's verification step (`jwtService.verifyAsync()`) to fail.

### 4. Why does the login endpoint return the same error message for an unknown email and a wrong password?
- **Answer**:
  Returning distinct errors (such as "user not found" vs "incorrect password") enables **user enumeration**, allowing attackers to discover which email addresses are registered on the platform. A generic "Invalid credentials" message protects user privacy and thwarts credential harvesting.

### 5. In what order do middleware, guards and pipes run? Why must AuthGuard come before RolesGuard?
- **Answer**:
  Execution order:
  1. **Middleware** (e.g. `RequestIdMiddleware`, `LoggerMiddleware`)
  2. **Guards** (e.g. `AuthGuard`, `RolesGuard`)
  3. **Interceptors** (pre-controller)
  4. **Pipes** (e.g. `ValidationPipe`, `SortOrderPipe`, `PositiveIntPipe`)
  5. Controller route handler
  
  `AuthGuard` must run before `RolesGuard` because `AuthGuard` extracts and verifies the JWT and attaches the authenticated user payload (`req.user`) to the request. `RolesGuard` relies on `req.user.role` to determine if the user has permission to access the route.
