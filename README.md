# Quran Radio – Tahqiq & Tartil  
> *A beautiful way to listen to the Qur’an online, anywhere, anytime.*

<img width="3004" height="1715" alt="Quran Radio Screenshot" src="https://github.com/user-attachments/assets/8156a479-ef47-45d7-9d73-858818711714" />

**Quran Radio** is an elegant, mobile-first web application for streaming Qur’anic recitations in two classic styles — *Tahqiq* (slow and precise) and *Tartil* (measured and melodious). Built with **Nuxt 4** and **Tailwind CSS**, it offers a smooth, modern experience while staying rooted in a timeless tradition.

---

## ✨ Features
- 🎙 **Two Live Stations** –  
  - **Tahqiq**: slow-paced, clear pronunciation for study and reflection.  
  - **Tartil**: flowing and melodious recitation for immersive listening.  
- 🌙 **Modern Dark UI** with subtle Islamic design accents.  
- 📡 **Realtime Listener Count** powered by **Socket.IO**.  
- 🔍 **SEO-Optimized** meta tags for phrases like “Quran Radio” and “Online Quran Radio”.  
- 📱 **Mobile-First Design** – perfect on any device.  

---

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



