# Paidly Backend

Production-ready Next.js 14 authentication API for the Paidly SaaS application.

## Stack

- **Framework**: Next.js 14 (App Router, API Routes)
- **Database**: MongoDB with Mongoose
- **Auth**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/paidly?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-min-32-chars-long
ALLOWED_ORIGIN=http://localhost:3001   # your frontend URL
```

### 3. Run development server

```bash
npm run dev
```

Server runs at `http://localhost:3000`

---

## API Reference

### POST `/api/auth/signup`

Create a new user account.

**Request body:**
```json
{
  "name": "Alex Lee",
  "email": "alex@example.com",
  "password": "securepassword123"
}
```

**Success response (201):**
```json
{
  "success": true,
  "message": "Account created successfully",
  "token": "<jwt>",
  "user": {
    "id": "...",
    "name": "Alex Lee",
    "email": "alex@example.com",
    "plan": "free",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

**Validation rules:**
- `name`: required, min 2 chars
- `email`: required, valid format, must be unique
- `password`: required, min 8 characters

---

### POST `/api/auth/login`

Authenticate an existing user.

**Request body:**
```json
{
  "email": "alex@example.com",
  "password": "securepassword123"
}
```

**Success response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "<jwt>",
  "user": {
    "id": "...",
    "name": "Alex Lee",
    "email": "alex@example.com",
    "plan": "free",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

---

### GET `/api/auth/me`

Get the currently authenticated user. Requires a valid JWT.

**Headers:**
```
Authorization: Bearer <token>
```

**Success response (200):**
```json
{
  "success": true,
  "user": {
    "id": "...",
    "name": "Alex Lee",
    "email": "alex@example.com",
    "plan": "free",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

---

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "error": "Human-readable error message"
}
```

| Status | Meaning |
|--------|---------|
| 400 | Bad request / validation error |
| 401 | Unauthorized / invalid credentials or token |
| 404 | Resource not found |
| 409 | Conflict (e.g., email already exists) |
| 500 | Internal server error |

---

## Project Structure

```
paidly-backend/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── signup/
│   │       │   └── route.ts      # POST /api/auth/signup
│   │       ├── login/
│   │       │   └── route.ts      # POST /api/auth/login
│   │       └── me/
│   │           └── route.ts      # GET /api/auth/me
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   ├── db.ts                     # MongoDB connection (singleton)
│   └── jwt.ts                    # JWT sign/verify helpers
├── models/
│   └── User.ts                   # Mongoose User schema
├── middleware.ts                  # CORS + security headers
├── .env.example
├── .gitignore
├── next.config.js
├── package.json
└── tsconfig.json
```

## Security

- Passwords hashed with bcryptjs (12 salt rounds)
- Password field never returned in API responses
- JWT tokens expire after 7 days
- Generic error messages for auth failures (prevents user enumeration)
- CORS configured via middleware
- Security headers: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection

## Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Set `MONGODB_URI`, `JWT_SECRET`, and `ALLOWED_ORIGIN` in the Vercel dashboard under Project → Settings → Environment Variables.
