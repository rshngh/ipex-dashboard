# Ipex Dashboard

A full-stack web application with a React + Vite frontend and an Express backend. The backend serves the frontend's static build and provides API endpoints for user authentication and order confirmation (with PDF and barcode generation).

## Project Structure

- `frontend/` — React + Vite app (with Tailwind CSS and DaisyUI)
- `backend/` — Express server (serves API and static frontend build)

---

## Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

---

## Setup Instructions

### 1. Clone the repository
```bash
git clone <repo-url>
cd Ipex-dashboard
```

### 2. Install dependencies
#### Backend
```bash
cd backend
npm install
```
#### Frontend
```bash
cd ../frontend
npm install
```

---

## Running the Application

### 1. Start the Frontend (Development Mode)
```bash
cd frontend
npm run dev
```
- The frontend will be available at [http://localhost:5173](http://localhost:5173) by default.

### 2. Start the Backend
```bash
cd ../backend
npm start
```
- The backend will run on [http://localhost:8080](http://localhost:8080) by default.
- It serves the production frontend build from `frontend/dist` if present.

---

## Building for Production

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```
   This outputs static files to `frontend/dist`.

2. Start the backend (as above). It will serve the static frontend build and the API.

---

## API Endpoints

- `POST /api/user/login` — User login (expects `{ username, password }`)
- `POST /api/order/confirm-order` — Confirm order and generate PDF with barcode (expects sender/receiver info)

---

## Notes
- No environment variables are required for default setup.
- To change the backend port, set the `PORT` environment variable before starting the backend.
- For production, deploy the backend and serve the built frontend from `frontend/dist`.

---

## License
MIT # ipex-dashboard
# ipex-dashboard
# ipex-dashboard
