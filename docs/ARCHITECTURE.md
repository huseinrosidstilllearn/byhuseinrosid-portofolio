# Architecture

## 1. Tech Stack
- **Frontend Framework:** React 19 + TypeScript
- **Build Tool:** Vite (cepat, HMR instan, bundle ringan teroptimasi)
- **Styling:** Tailwind CSS (utility-first, responsive utilities, seamless dark mode class support)
- **Icons:** Lucide React (ringan, tajam, konsisten)
- **Motion & Transitions:** Framer Motion (reveal animations, layout animations, modal transitions)
- **Bahasa Antarmuka:** 100% Bahasa Indonesia
- **Deployment Target:** Vercel / Netlify / GitHub Pages

## 2. System Flow
```
Pengunjung (User)
  │
  ▼
React Application (Vite Root)
  │
  ├── ThemeContext (State Dark / Light Mode)
  │
  ├── UI Components (Presentation Layer)
  │     ├── Navbar (Navigasi Berbahasa Indonesia & Theme Toggle)
  │     ├── Hero (Visual Hook, Tagline, Domisili Surabaya, & CTA)
  │     ├── Gallery (Masonry Grid Dinamis + Filter Kategori)
  │     ├── LightboxModal (Tampilan Layar Penuh + Narasi Karya)
  │     ├── PhotoStories (Kisah Visual / Editorial Photo Essay)
  │     ├── About (Profil Humanis Husein Rosid & Filosofi Visual)
  │     ├── Services (Katalog Layanan & Tombol Penawaran)
  │     └── ContactSection (Direct WhatsApp 088992806757, IG @byhuseinrosid, Email)
  │
  └── Data Layer (`src/data/portfolioData.ts`)
        ├── Profil & Bio Husein Rosid (Surabaya, Indonesia)
        ├── Foto Galeri Resolusi Tinggi & Data Karya
        ├── Cerita di Balik Karya (Kisah Visual)
        └── Paket Layanan & Konfigurasi Kontak Resmi
```

## 3. Folder Structure
```
By Husein Rosid PORTOFOLIO/
├── docs/
│   ├── PRD.md
│   ├── ARCHITECTURE.md
│   ├── DESIGN.md
│   ├── RULES.md
│   ├── TASKS.md
│   ├── DECISIONS.md
│   ├── MEMORY.md
│   ├── TEST_PLAN.md
│   └── SECURITY.md
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Gallery.tsx
│   │   ├── LightboxModal.tsx
│   │   ├── PhotoStories.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── ContactSection.tsx
│   │   └── Footer.tsx
│   ├── context/
│   │   └── ThemeContext.tsx
│   ├── data/
│   │   └── portfolioData.ts
│   ├── types/
│   │   └── portfolio.ts
│   ├── utils/
│   │   └── whatsapp.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
├── .env.example
├── .gitignore
└── README.md
```

## 4. Architectural Rules
1. **Bahasa Standar Proyek:** Seluruh teks yang tampil di layar wajib menggunakan Bahasa Indonesia yang komunikatif, profesional, dan estetik.
2. **Pemisahan Data & Komponen:** Semua konten foto, teks biografi, kategori layanan, dan tautan sosial media dikelola terpusat di `src/data/portfolioData.ts`.
3. **Kesesuaian Tipe Data (Type-Safety):** Semua data foto dan konfigurasi wajib memiliki interface TypeScript eksplisit di `src/types/portfolio.ts`.
4. **Fokus Visual:** Tidak ada komponen atau kebocoran data gear/kamera; fokus 100% pada karya visual dan cerita di baliknya.
