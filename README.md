# 🌿 Flora & Roots — Botanical Encyclopedia PWA

A full offline-capable Progressive Web App (PWA) encyclopedia of **fruits, plants, trees, herbs, mushrooms, vines & more** — with cultivation guides, recipes, nutrition data, history, ecology, and a botanical quiz.

---

## 📦 Files in this folder

```
flora-roots-github/
├── index.html       ← Main app (the entire PWA in one file)
├── manifest.json    ← PWA manifest (name, icons, theme)
├── sw.js            ← Service worker (offline caching)
├── icons/           ← App icons for all devices
│   ├── icon-72.png
│   ├── icon-96.png
│   ├── icon-128.png
│   ├── icon-144.png
│   ├── icon-152.png
│   ├── icon-192.png  ← Used for Android home screen
│   ├── icon-384.png
│   └── icon-512.png  ← Used for splash screens
└── README.md        ← This file
```

---

## 🚀 How to Deploy on GitHub Pages (Step by Step)

### Step 1 — Create a GitHub Account
Go to **https://github.com/signup** and create a free account if you don't have one.

### Step 2 — Create a New Repository
1. Go to **https://github.com/new**
2. Name it: `flora-roots` (or any name you like)
3. Set it to **Public** ✅
4. Do NOT check "Initialize with README"
5. Click **Create repository**

### Step 3 — Upload the Files
1. On your new repo page, click **"uploading an existing file"** (or "Add file → Upload files")
2. Drag and drop ALL these files and folders:
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - The entire `icons/` folder
3. Scroll down, write a commit message like `Initial PWA deployment`
4. Click **Commit changes**

### Step 4 — Enable GitHub Pages
1. Go to your repo → click **Settings** (top tab)
2. In the left sidebar, click **Pages**
3. Under "Branch", select **main** and folder **/ (root)**
4. Click **Save**

### Step 5 — Wait & Visit Your App
- GitHub will show a green banner: **"Your site is live at https://YOUR-USERNAME.github.io/flora-roots/"**
- This usually takes **1–3 minutes**
- Visit that URL on your phone or desktop 🎉

---

## 📲 How to Install on Your Phone's Home Screen

### Android (Chrome):
1. Open your GitHub Pages URL in **Chrome**
2. Wait for the **"Install app"** banner at the bottom
3. Tap **Install** → tap **Add to Home Screen**
4. Done! Flora & Roots appears as an app icon ✅

### iPhone / iPad (Safari):
1. Open your GitHub Pages URL in **Safari** (must be Safari, not Chrome)
2. Tap the **Share** button (box with arrow pointing up)
3. Scroll down and tap **"Add to Home Screen"**
4. Tap **Add** in the top right
5. Done! The app icon appears on your home screen ✅

### Desktop (Chrome / Edge):
1. Open the URL in Chrome or Edge
2. Look for the **install icon** (⊕) in the address bar
3. Click it → click **Install**
4. Flora & Roots opens as a standalone desktop app ✅

---

## ✈️ Offline Use

Once installed, **Flora & Roots works completely offline**:
- All encyclopedia data is built into the app
- Service worker caches the app on first visit
- Open the app with no internet — everything still works
- Favorites and notes are saved on your device

---

## 🛠 Customizing Your App

To add your name or change the repo name in the manifest:

Open `manifest.json` and update:
```json
{
  "start_url": "./index.html",
  "scope": "./"
}
```

If GitHub Pages is serving from a subfolder (e.g. `/flora-roots/`), update to:
```json
{
  "start_url": "/flora-roots/index.html",
  "scope": "/flora-roots/"
}
```
And in `sw.js`, update the scope in the register call accordingly.

---

## 📋 Features

| Feature | Status |
|---|---|
| 🌿 100+ botanical entries | ✅ |
| 🔍 Search & filter by category | ✅ |
| ⊞ Grid & list view | ✅ |
| 🥗 Nutrition info (per 100g) | ✅ |
| 🌱 Step-by-step cultivation | ✅ |
| 🍽 Recipes with tips | ✅ |
| 🌍 Ecology & conservation | ✅ |
| ⭐ Favorites + personal notes | ✅ |
| 🧠 Botanical quiz | ✅ |
| 📅 Seasonal calendar | ✅ |
| 🌐 Multi-language (EN/TL/ES/ZH/JA) | ✅ |
| 💡 Did You Know? facts | ✅ |
| 📴 Full offline use | ✅ |
| 📲 Installable to home screen | ✅ |

---

## 📄 License

Free to use for personal and educational purposes.
Built with ❤️ using vanilla HTML, CSS & JavaScript — no frameworks needed.
