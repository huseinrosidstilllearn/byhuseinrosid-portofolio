# Architecture Decision Records (ADR)

Dokumen ini mencatat keputusan-keputusan arsitektur dan teknologi penting yang diambil dalam proyek ini.

---

## ADR-001: Menggunakan React 19 + Vite + TypeScript
- **Keputusan:** Menggunakan Vite + React 19 dengan TypeScript sebagai fondasi aplikasi web.
- **Alasan:** Proyek ini adalah portofolio visual kaya interaksi (lightbox layar penuh, modal animasi, filter cepat tanpa refresh). Vite memberikan development server instan, build bundler teroptimasi, bebas dari potensi *hydration mismatch* SSR pada interaksi modal, dan dapat di-hosting secara gratis di Vercel, Netlify, maupun GitHub Pages.

---

## ADR-002: Arsitektur Data Terpusat (`portfolioData.ts`) Tanpa Database Eksternal untuk V1
- **Keputusan:** Seluruh konten foto, deskripsi, data EXIF, cerita foto, dan informasi kontak dikelola dalam file terpusat bervalidasi tipe data (`src/data/portfolioData.ts`).
- **Alasan:** Menjamin performa loading super cepat tanpa jeda API (*zero cold-starts*), menghilangkan ketergantungan biaya database bulanan, dan memberikan kemudahan maksimal bagi Husein Rosid untuk mengubah konten fotonya kapan saja.

---

## ADR-003: Dual Theme (Dark Luxury & Clean Light) dengan Tailwind Class Strategy
- **Keputusan:** Mendukung mode Gelap dan Terang secara dinamis dengan default Gelap (*Dark Luxury Editorial*).
- **Alasan:** Latar belakang gelap memberikan kontras terbaik untuk saturasi warna foto profesional, sedangkan mode terang mengakomodasi pengunjung yang menyukai estetika majalah galeri bersih. Status tema disimpan di `localStorage`.

---

## ADR-004: Alur Konversi Booking Langsung ke WhatsApp
- **Keputusan:** Mengintegrasikan tombol dan formulir pemesanan cerdas yang memformat data ke tautan WhatsApp API resmi (`wa.me`).
- **Alasan:** Di Indonesia, komunikasi dan penawaran jasa fotografi memiliki tingkat konversi dan respon tertinggi melalui chat personal WhatsApp.
