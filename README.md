# Udumalpet Software Solutions Website

Full-stack website for service enquiries and portfolio display.

## Tech Stack

- Frontend: React + Vite
- Backend: Spring Boot
- Database: MongoDB Atlas
- Hosting: Cloudflare Pages + Render

## Project Structure

- `frontend/` - customer-facing React website
- `backend/` - Spring Boot API for service requests

## Local Setup

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Create `frontend/.env.local`:

```env
VITE_API_BASE_URL=http://localhost:8080
```

### Backend

```bash
cd backend
mvn spring-boot:run
```

Create `backend/.env` or set environment variables:

```env
MONGODB_URI=mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/udumalpet_solutions
FRONTEND_ORIGIN=http://localhost:5173
```

## Deployment

### Cloudflare Pages

- Root directory: `frontend`
- Build command: `npm run build`
- Build output directory: `dist`
- Environment variable: `VITE_API_BASE_URL=https://your-render-service.onrender.com`

### Render

- Root directory: `backend`
- Build command: `mvn clean package -DskipTests`
- Start command: `java -jar target/udumalpet-solutions-api-0.0.1-SNAPSHOT.jar`
- Environment variables:
  - `MONGODB_URI`
  - `FRONTEND_ORIGIN`

