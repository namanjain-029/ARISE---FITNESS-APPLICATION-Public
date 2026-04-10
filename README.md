# ⚔️ ARISE — Solo Leveling Fitness Application

A gamified fitness tracking web app inspired by the **Solo Leveling** manhwa universe. Train like a Shadow Monarch — log workouts, track nutrition, earn XP, and level up your real-world stats.

---

## 🖥️ Live Preview

> Run locally with the setup instructions below.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🧬 **Status Window** | Real-time dashboard showing Strength, Vitality, Intelligence & Agility stats |
| ⚔️ **Training Log** | Log workouts with type, duration, calories burned & water intake |
| 🍱 **Resource Log** | Track meals with calories and macros |
| 📈 **XP & Leveling** | Earn XP by logging workouts; level up and rank from E-Rank → S-Rank |
| 👹 **Dungeon Raid** | Weekly boss whose HP depletes as you accumulate XP |
| 📋 **Daily Quests** | Auto-completing quests based on real activity data |
| 🗡️ **System Training Quests** | Accept quests that auto-log to your stats on completion |
| 🍛 **Resource Blueprints** | Indian meal plans with per-meal logging |
| 🧠 **Premium AI Analyzer** | AI diagnostics with personalized quest recommendations |
| 🛒 **System Store** | Buy gear & unlock Premium subscription (stored in MongoDB) |
| 🗓️ **Activity Heatmap** | GitHub-style heatmap of your training history |
| 🔐 **Auth System** | JWT-based register/login with MongoDB persistence |

---

## 🛠️ Tech Stack

**Frontend**
- React 18 + Vite
- TailwindCSS
- React Router v6
- React Hook Form
- Lucide React Icons

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JSON Web Tokens (JWT)

---

## 📁 Project Structure

```
ARISE---FITNESS-APPLICATION/
├── client/                  # React frontend (Vite)
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # AuthContext, LevelingContext
│   │   ├── pages/           # Dashboard, Login, LogWorkout, etc.
│   │   └── utils/           # API utility
│   └── package.json
│
├── server/                  # Express backend
│   ├── src/
│   │   ├── controllers/     # Auth, Workouts, Meals, Analytics, User
│   │   ├── middleware/      # JWT auth middleware
│   │   ├── models/          # User, Workout, Meal schemas
│   │   └── routes/          # API route definitions
│   ├── app.js
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

### 1. Clone the repository

```bash
git clone https://github.com/namanjain-029/ARISE---FITNESS-APPLICATION-Public.git
cd ARISE---FITNESS-APPLICATION-Public
```

### 2. Setup the Server

```bash
cd server
npm install
```

Create a `.env` file inside `/server`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sololeveling
JWT_SECRET=your_secret_key_here
```

Start the server:

```bash
npm run dev
```

### 3. Setup the Client

```bash
cd client
npm install
npm run dev
```

### 4. Open the app

Visit **http://localhost:5173** in your browser.

---

## 🗃️ API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/workouts` | Get user workouts |
| POST | `/api/workouts` | Log a workout |
| GET | `/api/meals` | Get user meals |
| POST | `/api/meals` | Log a meal |
| GET | `/api/analytics/summary` | Today's stats summary |
| GET | `/api/analytics/suggestions` | AI-powered suggestions |
| GET | `/api/analytics/heatmap` | Activity heatmap data |
| POST | `/api/user/checkout` | Process premium/store purchase |

---

## 👤 Author

**Naman Jain**  
[github.com/namanjain-029](https://github.com/namanjain-029)

---

## 📜 License

This project is for educational purposes. Solo Leveling is owned by Chugong / D&C Media.
