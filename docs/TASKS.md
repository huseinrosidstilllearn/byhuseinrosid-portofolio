# Tasks Breakdown

Proyek dipecah menjadi tugas-tugas mikro terstruktur (*vertical slices*) agar teruji dan rapi pada setiap tahapan.

---

## Phase 1: Setup Fondasi Proyek
- [ ] **TASK-001:** Inisialisasi proyek React 19 + TypeScript menggunakan Vite, instalasi Tailwind CSS, Lucide React, dan Framer Motion.
- [ ] **TASK-002:** Konfigurasi `.gitignore`, `.env.example`, dan `README.md`.

## Phase 2: Core Data & Theme System
- [ ] **TASK-003:** Buat definisi tipe data TypeScript di `src/types/portfolio.ts` (PhotoItem, PhotoStory, ServicePackage, ContactInfo).
- [ ] **TASK-004:** Buat data terpusat di `src/data/portfolioData.ts` (Headline *"Stories Told in the Quiet Spaces Between Moments"*, profil Husein Rosid, domisili Surabaya, foto resolusi tinggi, cerita di balik karya, dan kontak resmi).
- [ ] **TASK-005:** Implementasikan `ThemeContext.tsx` untuk toggle mode Gelap (*Dark Luxury*) & Terang (*Clean Gallery*) dengan sinkronisasi `localStorage`.

## Phase 3: Navigasi & Hero Section
- [ ] **TASK-006:** Buat komponen `Navbar.tsx` berbahasa Indonesia dengan logo "By Husein Rosid", tautan seksi, tombol toggle tema, dan tombol kontak.
- [ ] **TASK-007:** Buat komponen `Hero.tsx` sinematik dengan headline *"Stories Told in the Quiet Spaces Between Moments"*, sub-teks puitis, info domisili Surabaya, dan tombol CTA.

## Phase 4: Galeri Masonry Interaktif & Lightbox Modal
- [ ] **TASK-008:** Buat komponen `Gallery.tsx` dengan tata letak Masonry dinamis, filter kategori dinamis, serta efek hover smooth zoom & overlay judul karya.
- [ ] **TASK-009:** Buat komponen `LightboxModal.tsx` dengan tampilan layar penuh, zoom, navigasi next/prev, pintasan keyboard (ESC, panah kiri/kanan), dan narasi karya.

## Phase 5: Kisah Visual (Photo Essays)
- [ ] **TASK-010:** Buat komponen `PhotoStories.tsx` untuk menyajikan editorial photo essay mendalam dengan narasi di balik layar.

## Phase 6: Profil & Filosofi Fotografi
- [ ] **TASK-011:** Buat komponen `About.tsx` berisi profil Husein Rosid bernada humanis sinematik, filosofi berkarya, dan basis di Surabaya.

## Phase 7: Layanan & Konversi WhatsApp
- [ ] **TASK-012:** Buat komponen `Services.tsx` berisi kartu cakupan layanan pemotretan profesional dengan tombol "Minta Penawaran via WhatsApp".
- [ ] **TASK-013:** Buat komponen `ContactSection.tsx` dan utilitas WhatsApp dengan generator pesan cerdas ke nomor `088992806757`.
- [ ] **TASK-014:** Buat komponen `Footer.tsx` (Instagram `@byhuseinrosid`, email `byhuseinrosid@gmail.com`) dan floating WhatsApp button.

## Phase 8: Pengujian, Review & Finalisasi
- [ ] **TASK-015:** Jalankan typecheck, build production (`npm run build`), verifikasi responsivitas layar (375px, 768px, 1440px), dan update dokumentasi status akhir.
