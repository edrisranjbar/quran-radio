Quran Radio – Tahqiq & Tartil
================================

Elegant, mobile‑first Quran radio built with Nuxt 4 + Tailwind CSS.

Features
--------
- Two stations: Tahqiq (slow, precise) and Tartil (measured, melodious)
- Modern, dark UI with Islamic accents
- Realtime listener count via Socket.IO
- SEO‑optimized meta tags for “Quran Radio” and “Online Quran Radio”

Getting Started
---------------
1. Install deps:
   npm install
2. Start Socket.IO server (port 3001):
   node server.mjs
3. Dev server:
   npm run dev

Build
-----
npm run build
node .output/server/index.mjs

Configuration
-------------
- Public socket URL: `NUXT_PUBLIC_SOCKET_URL` (defaults to http://localhost:3001)
- Favicon: replace `public/quran-icon.svg`

Tech Stack
----------
- Nuxt 4, Vue 3, Tailwind CSS, Socket.IO



