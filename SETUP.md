# Plokka App - Setup and Development Guide

## Overview
This is the MVP (Minimum Viable Product) implementation of the Plokka app with:
- **Backend**: TypeScript + Express with in-memory data store
- **Frontend**: React + TypeScript with Vite, React Query, and React Leaflet

## Prerequisites
- Node.js 18+ and npm installed
- Git installed

## Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/JonBHelgason/Plokk.git
cd Plokk
```

### 2. Backend Setup
```bash
cd backend
npm install
npm run dev
```
The backend API will be available at `http://localhost:3001`

### 3. Frontend Setup (in a new terminal)
```bash
cd frontend
npm install
npm run dev
```
The frontend will be available at `http://localhost:5173`

## Available Scripts

### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Run production build
- `npm test` - Run tests

### Frontend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests
- `npm run lint` - Lint code

## API Endpoints

### GET /health
Health check endpoint

### GET /areas
Get all cleanup areas with their status (clean/moderate/dirty)

### GET /areas/:id
Get a specific area by ID

### GET /profiles
Get all user profiles with points and cleanup counts

### GET /profiles/:id
Get a specific user profile by ID

### GET /events
Get all cleanup events (sorted by newest first)

### POST /events
Create a new cleanup event
```json
{
  "areaId": "area1",
  "profileId": "profile1",
  "location": {
    "lat": 64.145,
    "lng": -21.94
  }
}
```

## Frontend Features
- **Interactive Map**: Color-coded areas showing cleanup status
  - 🟢 Green: Recently cleaned
  - 🟡 Yellow: Needs attention soon
  - 🔴 Red: Needs immediate cleaning
- **Profile Cards**: Display user statistics and points
- **Recent Events**: List of recent cleanup activities

## Testing
All tests pass with 0 vulnerabilities:
- Backend: 11 tests covering all API endpoints
- Frontend: 5 tests covering components and API client

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test
```

## Security
- ✅ 0 npm vulnerabilities in both backend and frontend
- ✅ CodeQL security analysis passed with 0 alerts
- ✅ No sensitive data exposed in code

## Architecture

### Backend Structure
```
backend/
├── src/
│   ├── app.ts          # Express app factory
│   ├── data.ts         # In-memory data store and logic
│   └── server.ts       # Server entry point
├── tests/
│   └── app.test.ts     # API endpoint tests
└── package.json
```

### Frontend Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── MapView.tsx       # Interactive map with Leaflet
│   │   ├── ProfileCard.tsx   # User profile display
│   │   └── EventsList.tsx    # Recent events list
│   ├── tests/
│   │   ├── App.test.tsx      # App component tests
│   │   └── api.test.ts       # API client tests
│   ├── api.ts          # API client functions
│   ├── types.ts        # TypeScript interfaces
│   └── App.tsx         # Main app component
└── package.json
```

## Next Steps for Production
1. Replace in-memory data store with PostgreSQL + PostGIS
2. Add authentication and user management
3. Implement image upload functionality
4. Add real GPS validation
5. Deploy backend to cloud provider (Heroku, AWS, etc.)
6. Deploy frontend to Vercel or Netlify

## Troubleshooting

### Port Already in Use
If port 3001 or 5173 is already in use:
```bash
# Backend - set PORT environment variable
PORT=3002 npm run dev

# Frontend - Vite will automatically try the next available port
```

### CORS Issues
The backend has CORS enabled by default. If you deploy to production, update the CORS configuration in `backend/src/app.ts`.

### Map Not Displaying
Make sure you have an active internet connection as the map tiles are loaded from OpenStreetMap.

## Contributing
See the main README.md for contribution guidelines.

## License
MIT License - See LICENSE.txt for details
