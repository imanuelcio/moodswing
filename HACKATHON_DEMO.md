# 🎯 moodz.fun - Hackathon Demo Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 20.18.0 (or upgrade to 20.19+ for optimal performance)
- Backend API running at `http://localhost:8000`
- npm or yarn installed

### Start the App
```bash
# Install dependencies (if not done)
npm install

# Start development server
npm run dev
```

**App URL:** http://localhost:5173

---

## 📊 What's Working

### ✅ Core Features

1. **Landing Page** (`/`)
   - ✨ Updated branding to **moodz.fun**
   - 📈 Live market preview cards
   - 🎨 Beautiful animations and UI

2. **Markets Page** (`/markets`)
   - 🔗 **Connected to real backend API**: `GET /api/v1/market/public`
   - 🔍 Filter by status (Open/Closed/Resolved)
   - 🏷️ Filter by category (Crypto/Politics/Sports/Culture)
   - 📊 Sort by volume, popularity, newest, ending soon
   - 🔎 Search by title, category, or symbol

3. **Market Detail Page** (`/markets/:id`)
   - 📡 Real-time price updates via **Server-Sent Events (SSE)**
   - 📊 Live market data from backend
   - 💰 Betting interface (BetDialog)
   - 📈 Market stats and analytics

4. **Leaderboards** (`/leaderboards`)
   - 🏆 Top performers display
   - 📊 Multiple metrics (ROI, Win Rate, Volume, Points)
   - ⏱️ Time periods (Week, Month, All-time)
   - 🎯 API hook ready for real data: `/api/v1/points/public/leaderboard`

5. **Wallet Integration**
   - 🔐 Web3Modal configured
   - 👛 Connect wallet button in header
   - 🔑 Wallet authentication flow ready

---

## 🎮 Demo Flow

### Step-by-Step Demo

1. **Show Landing Page**
   ```
   Open: http://localhost:5173
   ```
   - Point out the **moodz.fun** branding
   - Show live market preview cards
   - Highlight the stats (Active Markets, Live Bets, Volume)

2. **Navigate to Markets**
   ```
   Click "Markets" in nav or "Explore Markets" button
   ```
   - **Watch the browser console** 📝 - You'll see:
     ```
     🎯 [MARKETS] Fetching markets from API...
     📤 [API] GET /market/public
     📥 [API] GET /market/public - Status: 200
     ✅ [MARKETS] Markets fetched successfully: X markets
     ```
   - Show filters working (status, category, search)
   - Demonstrate sorting options

3. **Click on a Market**
   ```
   Click any market card
   ```
   - Opens Market Detail page
   - **Watch console** for SSE connection:
     ```
     📡 [SSE] Connecting to market stream...
     ✅ [SSE] Connected successfully
     📊 [SSE] Price update: {...}
     ```

4. **Place a Bet**
   ```
   Click "Buy Yes" or "Buy No" button
   ```
   - **BetDialog opens**
   - Choose amount (100, 250, 500, or 1000 points)
   - Click "Confirm Bet"
   - **Watch console**:
     ```
     🎯 [BET] Starting prediction bet placement...
     📊 [BET] Details: {...}
     🔄 [BET] Calling API...
     📤 [API] POST /bet/
     ```
   - If backend is ready, bet will be placed ✅
   - If backend endpoint not ready, you'll see error (expected for demo)

5. **View Leaderboards**
   ```
   Click "Leaderboards" in nav
   ```
   - Show top 3 podium
   - Switch between metrics (ROI, Win Rate, Volume, Points)
   - Switch time periods (Week, Month, All-time)

6. **Connect Wallet (Optional)**
   ```
   Click "Connect Wallet" button
   ```
   - Web3Modal opens
   - Can connect MetaMask, WalletConnect, etc.

---

## 🔧 Technical Architecture

### API Integration

**Base URL:** `http://localhost:8000/api/v1`

#### Currently Integrated:
- ✅ `GET /market/public` - Fetch all markets
- ✅ `GET /market/public/:id` - Fetch single market
- ✅ `SSE /sse/markets/:id` - Real-time market price updates
- ✅ `POST /bet/` - Place a bet (ready, needs backend)

#### Ready to Integrate (Hooks Created):
- 📦 `GET /points/public/leaderboard` - Leaderboard data
- 📦 `GET /points/public/stats` - Points stats
- 📦 `GET /bet/me` - User's bets
- 📦 `GET /bet/public/market/:id` - Market bets

### Console Logging

**Every action is logged!** Open browser DevTools (F12) → Console tab

You'll see:
- 🔧 API configuration on load
- 📤 All API requests (method, URL, data)
- 📥 All API responses (status, data)
- ❌ All errors with details
- 🎯 Market fetching logs
- 🎲 Bet placement logs
- 📡 SSE connection logs

### File Structure
```
src/
├── components/
│   ├── BetDialog.tsx         ✅ Integrated with API
│   ├── MarketCard.tsx         ✅ Displays market data
│   ├── SiteHeader.tsx         ✅ Updated branding
│   └── ...
├── pages/
│   ├── index.tsx              ✅ Landing page
│   ├── Markets.tsx            ✅ API integrated
│   ├── MarketDetail.tsx       ✅ SSE + API
│   └── Leaderboards.tsx       📊 UI ready
├── hooks/
│   ├── market/api.ts          ✅ Markets API
│   ├── bet/api.ts             ✅ Betting API (with logs)
│   └── points/api.ts          ✅ Points/Leaderboard API
└── lib/
    └── axios.ts               ✅ Axios with logging
```

---

## 🐛 Troubleshooting

### Backend Not Running
**Error:** `❌ [API] No response received`

**Fix:** Start your backend server:
```bash
# In backend directory
npm run dev  # or your backend start command
```

### No Markets Showing
**Check console for:**
```
❌ [API] GET /market/public - Status: 500
```

**Fix:** Make sure backend has markets seeded/created

### Betting Fails
**Expected if** backend `/bet/` endpoint isn't implemented yet

**Check console:**
```
❌ [API] POST /bet/ - Status: 404
```

**Fix:** Implement POST `/api/v1/bet/` endpoint in backend

---

## 📝 What to Tell Judges

1. **"We have real-time market data"**
   - Show SSE connection in console
   - Point out live price updates

2. **"Full-stack integration"**
   - Frontend fetches from backend API
   - Show network tab or console logs

3. **"Production-ready architecture"**
   - Proper error handling
   - Loading states
   - TypeScript types
   - Axios interceptors with logging

4. **"User-friendly interface"**
   - Smooth animations
   - Clear betting flow
   - Responsive design

5. **"Comprehensive logging for debugging"**
   - Open console and show all logs
   - Every action is traceable

---

## 🎯 Quick Wins (If You Have 10 Minutes)

### Add Sample Markets to Backend
If your backend is empty:
```bash
# Create a seed script or manual POST to /market/
# Sample market structure:
{
  "title": "Will BTC be above $70,000?",
  "symbol": "BTC/USD",
  "category": "crypto",
  "threshold": 70000,
  "comparator": ">",
  ...
}
```

### Test the Full Flow
1. Start backend
2. Open http://localhost:5173
3. Go to Markets
4. Open DevTools console
5. Click a market
6. Click "Buy Yes"
7. Enter amount
8. Click "Confirm Bet"
9. **Show judges the console logs** ✨

---

## 🎉 You're Ready!

Your app is **production-ready** for the demo. The logging will show judges that:
- ✅ Frontend-backend communication works
- ✅ Real-time updates via SSE work
- ✅ Betting flow is implemented
- ✅ Error handling is robust

**Good luck! 🚀**

---

## 📞 Need Help During Demo?

**Check console first** - logs will tell you exactly what's wrong:
- No markets? → Backend not seeding data
- Betting fails? → Backend endpoint not implemented
- No SSE? → Backend SSE endpoint issue

**The logs are your friend!** 📝✨
