# Product Requirements Document (PRD)

## 1. Product
**Website Portofolio Fotografi Profesional "By Husein Rosid"**

## 2. Problem
Fotografer profesional Husein Rosid memerlukan wadah digital resmi yang kredibel, estetis, dan berkinerja tinggi untuk:
- Memamerkan portofolio karya visual lintas genre dalam rasio aslinya (portrait, landscape, square) tanpa terpotong kaku.
- Menghadirkan headline pembuka berstandar editorial internasional: *"Stories Told in the Quiet Spaces Between Moments"*, dipadukan dengan seluruh antarmuka dan narasi berbahasa Indonesia yang hangat dan puitis.
- Menunjukkan kedalaman artistik melalui narasi cerita di balik foto (*Kisah Visual / Esai Foto*).
- Menghubungkan calon klien secara langsung ke kontak resmi: WhatsApp `088992806757`, Instagram `@byhuseinrosid`, dan Email `byhuseinrosid@gmail.com`.
- Berbasis di **Surabaya**, dengan fleksibilitas menerima penugasan di seluruh nusantara.

## 3. Target Users
1. **Klien Komersial & Brand:** Brand lokal dan nasional yang mencari fotografer dengan visi artistik kuat.
2. **Klien Personal & Pasangan:** Individu, pasangan, dan keluarga untuk pemotretan portrait, prewedding, wedding, dan momen berharga.
3. **Kurator & Editor Media:** Penikmat seni visual dan editor yang mencari cerita dokumenter autentik.

## 4. Goal
Menciptakan website portofolio interaktif dengan estetika editorial sinematik, tata letak dinamis *masonry*, dual-theme (Dark/Light), profil bercerita humanis, serta tombol kontak & pemesanan instan ke WhatsApp.

## 5. Core Features (MVP V1)
1. **Hero Section Sinematik:** Visual pembuka dengan identitas "By Husein Rosid", headline bahasa Inggris puitis *"Stories Told in the Quiet Spaces Between Moments"*, sub-teks pengantar, domisili Surabaya, dan tombol ajakan aksi (*Jelajahi Karya* & *Hubungi Saya*).
2. **Galeri Masonry Dinamis:** Tata letak multi-kolom yang mempertahankan proporsi asli foto dengan filter kategori dinamis.
3. **Interaksi Mikro Foto:** Efek pembesaran lembut (*smooth zoom*) dan lapisan informasi muncul halus saat kursor diarahkan ke foto.
4. **Lightbox Modal Sinematik:** Tampilan layar penuh, navigasi next/prev (klik & tombol keyboard panah), tombol escape, dan narasi cerita karya.
5. **Kisah Visual / Esai Foto:** Seksi editorial khusus yang membedah proyek foto berseri lengkap dengan narasi reflektif di balik layar.
6. **Tentang & Filosofi Fotografi:** Profil Husein Rosid bernuansa humanis, filosofi menangkap momen hidup, dan domisili Surabaya. *(Catatan: Seksi gear/kamera ditiadakan)*.
7. **Katalog Layanan & Penawaran:** Struktur katalog layanan berbahasa Indonesia, dengan tombol "Minta Penawaran via WhatsApp".
8. **Integrasi Kontak Resmi:**
   - WhatsApp langsung: `088992806757`
   - Instagram: `@byhuseinrosid`
   - Email: `byhuseinrosid@gmail.com`
9. **Dynamic Dual Theme:** Pengubah tema (*Dark Luxury Editorial* sebagai default & *Clean Minimalist Light Mode*) dengan preferensi tersimpan di `localStorage`.

## 6. Out of Scope (Bukan Bagian dari V1)
- Toko online penjualan cetakan fisik otomatis (*e-commerce*).
- Portal download klien dengan login/password.
- Seksi gear/perlengkapan kamera ("What's in my bag") ditiadakan.
- Database eksternal yang rumit (seluruh data dikelola terpusat di `src/data/portfolioData.ts`).

## 7. Success Criteria
1. Headline bahasa Inggris *"Stories Told in the Quiet Spaces Between Moments"* tampil megah dan proporsional dengan tipografi editorial di Hero section.
2. Galeri masonry menampilkan foto resolusi tinggi secara proporsional di mobile (375px), tablet (768px), dan desktop (1440px).
3. Tombol WhatsApp secara instan membuka obrolan ke `088992806757` dengan pesan pembuka otomatis yang sopan dan terstruktur.
4. Pengunjung dapat beralih antara tema Gelap dan Terang secara instan.
