# Architecture Decision Records (ADR)

Dokumen ini mencatat keputusan-keputusan arsitektur dan teknologi penting yang diambil dalam proyek ini.

---

## ADR-001: Menggunakan React 19 + Vite + TypeScript
- **Keputusan:** Menggunakan Vite + React 19 dengan TypeScript sebagai fondasi aplikasi web.
- **Alasan:** Proyek ini adalah portofolio visual kaya interaksi (lightbox layar penuh, modal animasi, filter cepat tanpa refresh). Vite memberikan development server instan, build bundler teroptimasi, bebas dari potensi *hydration mismatch* SSR pada interaksi modal, dan dapat di-hosting secara gratis di Vercel, Netlify, maupun GitHub Pages.

---

## ADR-002: Arsitektur Data Terpusat (`portfolioData.ts`) Tanpa Database Eksternal untuk V1
- **Keputusan:** Seluruh konten foto, deskripsi, cerita foto, dan informasi kontak dikelola dalam file terpusat bervalidasi tipe data (`src/data/portfolioData.ts`).
- **Alasan:** Menjamin performa loading super cepat tanpa jeda API (*zero cold-starts*), menghilangkan ketergantungan biaya database bulanan, dan memberikan kemudahan maksimal bagi Husein Rosid untuk mengubah konten fotonya kapan saja.

---

## ADR-003: Dual Theme (Dark Luxury & Clean Light) dengan Tailwind Class Strategy
- **Keputusan:** Mendukung mode Gelap dan Terang secara dinamis dengan default Gelap (*Dark Luxury Editorial*).
- **Alasan:** Latar belakang gelap memberikan kontras terbaik untuk saturasi warna foto profesional, sedangkan mode terang mengakomodasi pengunjung yang menyukai estetika majalah galeri bersih. Status tema disimpan di `localStorage`.

---

## ADR-004: Alur Konversi Booking Langsung ke WhatsApp
- **Keputusan:** Mengintegrasikan tombol dan formulir pemesanan cerdas yang memformat data ke tautan WhatsApp API resmi (`wa.me`) menuju nomor `088992806757`.
- **Alasan:** Di Indonesia, komunikasi dan penawaran jasa fotografi memiliki tingkat konversi dan respon tertinggi melalui chat personal WhatsApp.

---

## ADR-005: Tata Letak Galeri Masonry Dinamis
- **Keputusan:** Menggunakan tata letak kolom Masonry yang mempertahankan orientasi alami foto (portrait, landscape, square) daripada grid berbingkai seragam yang memotong foto.
- **Alasan:** Fotografi profesional sangat bergantung pada komposisi bingkai aslinya; memotong foto secara paksa akan merusak nilai estetika karya.

---

## ADR-006: Model Penawaran Berbasis Konsultasi (Inquiry-Based Rate Card)
- **Keputusan:** Menampilkan katalog rincian cakupan layanan tanpa mempublikasikan angka nominal harga kaku secara publik, melainkan mengarahkan klien ke tombol "Minta Penawaran via WhatsApp".
- **Alasan:** Pendekatan standar fotografer komersial dan editorial kelas atas untuk menjaga nilai tawar, mengakomodasi kebutuhan kustom tiap klien, dan membangun relasi personal secara langsung.

---

## ADR-007: Bahasa Pengantar 100% Bahasa Indonesia
- **Keputusan:** Seluruh teks navigasi, headline, biografi, narasi kisah visual, dan pesan WhatsApp menggunakan Bahasa Indonesia baku dan puitis.
- **Alasan:** Sesuai arahan eksplisit dari fotografer agar portofolio menyatu secara emosional dan lugas bagi audiens dan klien di Indonesia.

---

## ADR-008: Peniadaan Seksi Perlengkapan Kamera (Gear Kit)
- **Keputusan:** Tidak menampilkan seksi gear / daftar kamera & lensa ("What's in my bag") di website.
- **Alasan:** Sesuai arahan fotografer untuk memusatkan seluruh atensi pengunjung pada kekuatan komposisi, emosi, dan cerita visual, bukan pada alat teknis yang digunakan.
