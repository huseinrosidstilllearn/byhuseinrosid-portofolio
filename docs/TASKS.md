# Tasks Breakdown

Proyek dipecah menjadi tugas-tugas mikro terstruktur (*vertical slices*) agar teruji dan rapi pada setiap tahapan.

---

## Phase 1: Setup Fondasi Proyek
- [ ] **TASK-001:** Inisialisasi proyek React 19 + TypeScript menggunakan Vite, instalasi Tailwind CSS, Lucide React, dan Framer Motion.
- [ ] **TASK-002:** Konfigurasi `.gitignore`, `.env.example`, dan `README.md`.

## Phase 2: Core Data & Theme System
- [ ] **TASK-003:** Buat definisi tipe data TypeScript di `src/types/portfolio.ts` (termasuk PhotoItem, EXIFData, PhotoStory, ServicePackage).
- [ ] **TASK-004:** Buat data terpusat di `src/data/portfolioData.ts` (Profil fotografer, foto resolusi tinggi beragam rasio, metadata EXIF, cerita foto editorial, daftar gear, dan paket layanan inquiry-based).
- [ ] **TASK-005:** Implementasikan `ThemeContext.tsx` untuk toggle mode Gelap (*Dark Luxury*) & Terang (*Clean Gallery*) dengan sinkronisasi `localStorage`.

## Phase 3: Navigasi & Hero Section
- [ ] **TASK-006:** Buat komponen `Navbar.tsx` yang responsif dengan logo editorial, tautan seksi, tombol toggle tema, dan tombol kontak.
- [ ] **TASK-007:** Buat komponen `Hero.tsx` sinematik dengan visual unggulan, tagline puitis humanis, dan tombol CTA.

## Phase 4: Galeri Masonry Interaktif & Lightbox Modal
- [ ] **TASK-008:** Buat komponen `Gallery.tsx` dengan tata letak Masonry dinamis, filter kategori (All, Commercial, Portrait, Documentary, Landscape, Wedding), serta hover zoom & overlay info.
- [ ] **TASK-009:** Buat komponen `LightboxModal.tsx` dengan tampilan layar penuh, zoom, navigasi next/prev, pintasan keyboard (ESC, panah kiri/kanan), narasi cerita, dan baris informasi EXIF kamera.

## Phase 5: Photo Essays (Editorial Case Studies)
- [ ] **TASK-010:** Buat komponen `PhotoStories.tsx` untuk menyajikan editorial photo essay mendalam dengan narasi di balik layar.

## Phase 6: Profil, Filosofi Humanis & Gear Kit
- [ ] **TASK-011:** Buat komponen `About.tsx` berisi biografi Husein Rosid bernada humanis sinematik, visi artistik, dan filosofi menangkap momen.
- [ ] **TASK-012:** Buat komponen `GearSection.tsx` ("What's in my bag") untuk menampilkan kamera dan lensa andalan.

## Phase 7: Layanan & Konversi WhatsApp
- [ ] **TASK-013:** Buat komponen `Services.tsx` berisi kartu paket layanan pemotretan profesional dengan tombol "Minta Rate Card via WhatsApp".
- [ ] **TASK-014:** Buat komponen `ContactSection.tsx` dan utilitas WhatsApp dengan generator template pesan pemesanan otomatis.
- [ ] **TASK-015:** Buat komponen `Footer.tsx` dan floating action button WhatsApp.

## Phase 8: Pengujian, Review & Finalisasi
- [ ] **TASK-016:** Jalankan typecheck, build production (`npm run build`), verifikasi responsivitas layar (375px, 768px, 1440px), dan update dokumentasi status akhir.
