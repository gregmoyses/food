# Architecture Overview

## Frontend (React Native)
- Screens for meal planning, shopping parsing, and interactive chat.
- API client abstraction in `frontend/src/services/apiClient.js`.
- Auth context for secure token propagation.

## Backend (Express)
- **Routes**: `auth`, `meals`, `shopping`, `chat`.
- **Controllers**: handle request validation + responses.
- **Services**: contain business logic (meal generation, retailer adapters, parser).
- **Models**: MongoDB schema for users, preferences, and purchase history.
- **Middleware**: JWT auth, centralized error handling.

## Data Flow
1. User submits preferences / shopping text from mobile.
2. Backend validates payloads and applies domain logic.
3. Retailer service converts normalized items into adapter-specific API calls.
4. Purchase actions and preferences persist in MongoDB.

## Security
- Passwords hashed with bcrypt.
- JWT bearer auth for protected endpoints.
- Validation via `express-validator`.
- Centralized error handling avoids leaking stack details to clients.
