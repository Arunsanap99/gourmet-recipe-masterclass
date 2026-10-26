# TastyNest — Modern Gourmet Recipe Studio & Smart Culinary Suite 🍳✨

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)](#)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?logo=tailwindcss&logoColor=white)](#)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?logo=firebase&logoColor=black)](#)
[![YouTube](https://img.shields.io/badge/YouTube-API%20Enabled-FF0000?logo=youtube&logoColor=white)](#)

A modern, responsive culinary web application featuring 20+ authentic chef-crafted recipes, integrated YouTube video masterclasses, dynamic ingredient quantity scaling, automated cooking countdown timers, interactive weekly meal scheduling with an in-page dish picker, aisle-categorized grocery checklists, and a personalized chef profile studio with cloud sync.

---

## 🌟 Key Features

- **🎬 Video Masterclass Cinema:** Dual-mode theater player streaming full HD YouTube recipe masterclasses and studio 1080p demos with step timeline markers and variable playback speed.
- **⚖️ Dynamic Servings Scaler:** Adjust portions from 1 to 20 servings with real-time recalculation of all ingredient weights and measurements.
- **⏱️ Live Cooking Timers:** Integrated countdown timers for every recipe step with sound/visual notifications and confetti celebrations.
- **📅 7-Day Interactive Meal Planner:** Schedule Breakfast, Lunch, Dinner, and Snacks across all 7 days with live nutrition analytics, 1-click in-page dish picker, day shuffle, and auto-balancing.
- **🛒 Smart Aisle Grocery Checklist:** Automatically converts your planned week into a grouped shopping list by supermarket aisles (`Produce`, `Dairy`, `Meat`, `Pantry`, `Spices`) with 1-click duplicate consolidation.
- **👤 Chef Profile & Backup Studio:** Manage your culinary identity, dietary preferences, and export full JSON backups or formatted grocery TXT files.
- **🌓 Seamless Theme Engine:** Beautiful, high-contrast dark and light modes tailored for kitchen readability.
- **☁️ Firebase Cloud Sync Ready:** Real-time persistence with Cloud Firestore and Firebase Authentication.

---

## 🚀 Quick Deployment Guide

### Option 1: GitHub Pages (Free & Instant)

1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - TastyNest Gourmet Studio"
   git branch -M main
   git remote add origin https://github.com/<YOUR-USERNAME>/tastynest.git
   git push -u origin main
   ```
2. In your GitHub repository, navigate to **Settings** → **Pages**.
3. Under **Branch**, select `main` and `/ (root)`, then click **Save**.
4. Your application will be live at: `https://<YOUR-USERNAME>.github.io/tastynest/`

### Option 2: Vercel (1-Click Deployment)

1. Install Vercel CLI or connect your GitHub repository via [vercel.com](https://vercel.com).
2. Run in terminal:
   ```bash
   npx vercel
   ```
3. Follow prompts to deploy with zero configuration.

### Option 3: Netlify (Drag & Drop or Git)

1. Run in terminal:
   ```bash
   npx netlify deploy --prod
   ```
   Or drag-and-drop the project folder directly into the Netlify dashboard.

---

## 💻 Local Development

No build step or heavy bundlers required! Simply run any local static server:

```bash
# Python 3
python -m http.server 3000

# Or Node.js serve
npx serve .
```

Open `http://localhost:3000` in your browser.

---

## 📄 License

MIT License — Feel free to customize and build your own culinary portfolio!
