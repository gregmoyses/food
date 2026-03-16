# Build & Test on a Physical Phone (iOS and Android)

This guide shows how to run the app on your phone using Expo + your local Node/Express backend.

## 0) Prerequisites
- Node.js 18+
- npm 9+
- MongoDB running locally or in the cloud (Atlas)
- A phone with **Expo Go** installed
  - iOS: App Store
  - Android: Play Store

## 1) Start backend API
From repository root:

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Expected output:
- `Backend listening on port 4000`

### Backend sanity checks
Use a second terminal:

```bash
curl http://localhost:4000/health
```

Expected JSON:

```json
{"status":"ok"}
```

Test shopping parsing quickly:

```bash
curl -X POST http://localhost:4000/api/shopping/parse \
  -H 'Content-Type: application/json' \
  -d '{"inputText":"Shopping list: milk, eggs, spinach"}'
```

## 2) Configure frontend for phone-to-backend connectivity
Your phone cannot use `localhost` to reach your laptop backend. It must use your laptop's LAN IP.

Find your laptop's local IP:
- macOS/Linux:
  ```bash
  ipconfig getifaddr en0 || hostname -I
  ```
- Windows (PowerShell):
  ```powershell
  ipconfig
  ```
  Use your Wi-Fi IPv4 address.

Then configure frontend env:

```bash
cd ../frontend
cp .env.example .env
```

Edit `frontend/.env` and set:

```env
EXPO_PUBLIC_API_BASE_URL=http://<YOUR_LAN_IP>:4000/api
```

Example:

```env
EXPO_PUBLIC_API_BASE_URL=http://192.168.1.25:4000/api
```

## 3) Start mobile app with Expo

```bash
cd frontend
npm install
npm start
```

Then:
1. Keep phone + laptop on same Wi-Fi.
2. Open Expo Go on phone.
3. Scan the QR code from terminal/browser.

## 4) Manual test plan on phone

### A) Shopping parsing
1. Open **Shopping** screen.
2. Use input: `Shopping list: milk, eggs, spinach`.
3. Tap **Parse List**.
4. Verify bullets show `milk`, `eggs`, `spinach`.

### B) Meal planning
1. Open **Meal Planner**.
2. Set Calories `1800`, Protein `100`, Restriction `vegetarian`.
3. Tap **Generate Meal Plan**.
4. Verify meal suggestions appear.

### C) Error behavior
1. Stop backend server.
2. Trigger **Parse List** or **Generate Meal Plan** again.
3. Verify an error text appears in red (frontend API error handling).
4. Restart backend.

## 5) Backend automated tests

```bash
cd backend
npm test
```

Current critical tests cover:
- User registration token flow
- Shopping text parsing endpoint
- Meal plan generation endpoint

## 6) Optional: testing from outside home network
If your phone is not on the same LAN as your backend, expose your backend securely via a tunnel:
- ngrok / Cloudflare Tunnel / similar
- Update `EXPO_PUBLIC_API_BASE_URL` to the HTTPS tunnel URL

Example:

```env
EXPO_PUBLIC_API_BASE_URL=https://abc123.ngrok-free.app/api
```

## 7) Troubleshooting
- **`Network request failed` on phone**
  - Confirm backend is running on `0.0.0.0`/reachable host
  - Confirm firewall allows inbound `4000`
  - Confirm phone and laptop are on same Wi-Fi
  - Confirm `.env` has correct IP and port
- **Expo app loads but API fails**
  - Confirm `EXPO_PUBLIC_API_BASE_URL` starts with `http://` (or `https://` for tunnels)
  - Restart Expo after changing `.env`
- **MongoDB errors**
  - Verify `MONGO_URI` in `backend/.env`
  - Ensure database user/network rules are correct (Atlas)
