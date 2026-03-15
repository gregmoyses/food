# AI Meal Planning & Grocery Assistant

A full-stack starter project for an AI-powered assistant that automates meal planning and grocery shopping.

## Stack
- **Mobile**: React Native (Expo-ready structure)
- **Backend**: Node.js + Express
- **Database**: MongoDB (Mongoose)

## Monorepo Layout
- `frontend/` React Native app scaffold with chat, meal planner, and shopping list screens.
- `backend/` Express API with authentication, meal planning logic, shopping parsing, and retailer integration adapters.
- `docs/` Architecture and API usage examples.

## Quick Start

### 1) Backend
```bash
cd backend
npm install
npm run dev
```

### 2) Frontend
```bash
cd frontend
npm install
npm start
```

### 3) Run tests (backend)
```bash
cd backend
npm test
```

## Key Features Implemented
- Secure user auth (JWT + hashed passwords)
- Shopping list ingestion via text endpoint (voice-ready API contract)
- Meal plan generation with dietary constraints and nutrient targets
- Grocery retailer integration service (adapter pattern for Tesco/Walmart)
- User preferences + past purchase storage models
- Interactive chat endpoint scaffold for meal ideation
- Robust API error handling and input validation

See `docs/API_EXAMPLES.md` for request/response samples.
