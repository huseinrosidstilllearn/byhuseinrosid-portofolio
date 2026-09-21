# Tasks Breakdown

Proyek dipecah menjadi tugas-tugas mikro terstruktur (*vertical slices*) agar teruji dan rapi pada setiap tahapan.

---

## Phase 1: Setup Fondasi Proyek
- [ ] **TASK-001:** Inisialisasi proyek React 19 + TypeScript menggunakan Vite, instal dependensi Tailwind CSS, Lucide React, dan Framer Motion.
- [ ] **TASK-002:** Konfigurasi `.gitignore`, `.env.example`, dan `README.md`.

## Phase 2: Core Data & Theme System
- [ ] **TASK-003:** Buat definisi tipe data TypeScript di `src/types/portfolio.ts`.
- [ ] **TASK-004:** Buat data terpusat di `src/data/portfolioData.ts` (Profil fotografer, foto resolusi tinggi, metadata EXIF, cerita foto, daftar gear, dan paket layanan).
- [ ] **TASK-005:** Implementasikan `ThemeContext.tsx` untuk toggle mode Gelap & Terang dengan penyimpanan di `localStorage`.

## Phase 3: Navigasi & Hero Section
- [ ] **TASK-006:** Buat komponen `Navbar.tsx` yang responsif dengan logo editorial, tautan seksi, dan tombol toggle tema.
- [ ] **TASK-007:** Buat komponen `Hero.tsx` sinematik dengan visual unggulan, tagline artistik, dan tombol CTA.

## Phase 4: Galeri Interaktif & Lightbox Modal
- [ ] **TASK-008:** Buat komponen `Gallery.tsx` dengan filter kategori dinamis (All, Commercial, Portrait, Documentary/Street, Landscape, Wedding).
- [ ] **TASK-009:** Buat komponen `LightboxModal.tsx` dengan tampilan layar penuh, navigasi next/prev, zoom, narasi cerita, dan baris informasi EXIF kamera.

## Phase 5: Photo Essays (Cerita di Balik Karya)
- [ ] **TASK-010:** Buat komponen `PhotoStories.tsx` untuk menyajikan editorial photo essay mendalam.

## Phase 6: Profil, Filosofi & Gear
- [ ] **TASK-011:** Buat komponen `About.tsx` berisi biografi Husein Rosid, visi artistik, dan filosofi fotografi.
- [ ] **TASK-012:** Buat komponen `GearSection.tsx` ("What's in my bag") untuk menampilkan kamera dan lensa andalan.

## Phase 7: Layanan & Konversi WhatsApp
- [ ] **TASK-013:** Buat komponen `Services.tsx` berisi kartu paket layanan pemotretan.
- [ ] **TASK-014:** Buat komponen `ContactSection.tsx` dan utilitas WhatsApp dengan generator template pesan pemesanan otomatis.
- [ ] **TASK-015:** Buat komponen `Footer.tsx` dan floating button WhatsApp.

## Phase 8: Pengujian, Review & Finalisasi
- [ ] **TASK-016:** Jalankan typecheck, build production (`npm run build`), verifikasi responsivitas layar (375px, 768px, 1440px), dan update dokumentasi status akhir.
