# Architecture

## 1. Tech Stack
- **Frontend Framework:** React 19 + TypeScript
- **Build Tool:** Vite (cepat, modern HMR, output bundler teroptimasi)
- **Styling:** Tailwind CSS (utility-first, responsive utilities, seamless dark mode class support)
- **Icons:** Lucide React (ringan, konsisten, tajam)
- **Motion & Transitions:** Framer Motion (reveal animations, layout animations, modal transitions)
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
  │     ├── Navbar (Navigasi & Theme Toggle)
  │     ├── Hero (Visual Hook & CTA)
  │     ├── Gallery (Filterable Grid Layout)
  │     ├── LightboxModal (Full-screen view + EXIF details)
  │     ├── PhotoStories (Editorial Narrative)
  │     ├── About & Gear (Profil & Camera Kit)
  │     ├── Services (Daftar Paket Jasa)
  │     └── ContactSection (Direct WA CTA & Sosmed)
  │
  └── Data Layer (`src/data/portfolioData.ts`)
        ├── Profil & Bio Husein Rosid
        ├── Foto Galeri & EXIF Metadata
        ├── Cerita Foto (Photo Essays)
        ├── Daftar Gear Kamera
        └── Paket Layanan & Kontak WhatsApp
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
│   │   ├── GearSection.tsx
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
1. **Pemisahan Data & Komponen:** Komponen UI tidak boleh menyematkan data foto mentah secara hardcoded. Seluruh data (foto, deskripsi, EXIF, nomor WA, bio) harus diimpor dari `src/data/portfolioData.ts`.
2. **Kesesuaian Tipe Data (Type-Safety):** Semua data foto dan konfigurasi wajib memiliki interface TypeScript eksplisit di `src/types/portfolio.ts`.
3. **Penyimpanan Preferensi Tema:** Pengaturan Dark/Light mode dikelola melalui `ThemeContext` dan tersimpan di `localStorage` agar pilihan pengunjung bertahan saat refresh.
4. **Komponen Mandiri & Reusable:** Komponen seperti modal lightbox, kartu foto, dan kartu layanan dibuat modular agar mudah di-refactor atau diuji.
