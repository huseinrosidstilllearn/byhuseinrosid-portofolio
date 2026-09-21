# Product Requirements Document (PRD)

## 1. Product
**Website Portofolio Fotografi Profesional "By Husein Rosid"**

## 2. Problem
Fotografer profesional Husein Rosid memerlukan wadah digital resmi yang kredibel, estetis, dan berkinerja tinggi untuk:
- Memamerkan portofolio karya visual lintas genre dalam rasio aslinya (portrait, landscape, square) tanpa terpotong kaku.
- Berkomunikasi sepenuhnya dalam **Bahasa Indonesia** yang hangat, puitis, dan profesional bagi audiens dan klien lokal maupun nasional.
- Menunjukkan kedalaman artistik melalui narasi cerita di balik foto (*Esai Foto / Kisah Visual*).
- Menghubungkan calon klien secara langsung dan tanpa hambatan ke kontak resmi: WhatsApp `088992806757`, Instagram `@byhuseinrosid`, dan Email `byhuseinrosid@gmail.com`.
- Berbasis di **Surabaya**, dengan fleksibilitas menerima penugasan di seluruh nusantara.

## 3. Target Users
1. **Klien Komersial & Brand:** Brand lokal dan nasional yang mencari fotografer dengan visi artistik kuat.
2. **Klien Personal & Keluarga:** Individu, pasangan, dan keluarga untuk pemotretan portrait, prewedding, wedding, dan momen berharga.
3. **Kurator & Editor Media:** Penikmat seni visual dan editor yang mencari cerita dokumenter autentik.

## 4. Goal
Menciptakan website portofolio interaktif berbahasa Indonesia dengan estetika editorial sinematik, tata letak dinamis *masonry*, dual-theme (Dark/Light), profil bercerita humanis, serta tombol kontak & pemesanan instan ke WhatsApp.

## 5. Core Features (MVP V1)
1. **Hero Section Sinematik (Bahasa Indonesia):** Visual pembuka dengan identitas "By Husein Rosid", headline *"Menangkap Emosi Jujur & Keabadian Cahaya"* (*Capturing Honest Emotions & Ephemeral Light*), domisili Surabaya, dan tombol ajakan aksi (*Jelajahi Karya* & *Hubungi Saya*).
2. **Galeri Masonry Dinamis:** Tata letak multi-kolom yang mempertahankan proporsi asli foto dengan filter kategori dinamis berbahasa Indonesia.
3. **Interaksi Mikro Foto:** Efek pembesaran lembut (*smooth zoom*) dan lapisan informasi muncul halus saat kursor diarahkan ke foto.
4. **Lightbox Modal Sinematik:** Tampilan layar penuh, navigasi next/prev (klik & tombol keyboard panah), tombol escape, narasi cerita karya, dan data teknis kamera (EXIF opsional).
5. **Kisah Visual / Esai Foto:** Seksi editorial khusus yang membedah proyek foto berseri lengkap dengan narasi reflektif di balik layar.
6. **Tentang & Filosofi Fotografi:** Profil Husein Rosid bernuansa humanis, filosofi menangkap momen hidup, dan domisili Surabaya. *(Catatan: Seksi gear/kamera ditiadakan sesuai keputusan fotografer untuk memusatkan perhatian murni pada keindahan karya visual)*.
7. **Katalog Layanan & Penawaran:** Struktur katalog layanan berbahasa Indonesia (cakupan sesi, hasil karya), dengan tombol "Minta Penawaran via WhatsApp".
8. **Integrasi Kontak Resmi:**
   - WhatsApp langsung: `088992806757`
   - Instagram: `@byhuseinrosid`
   - Email: `byhuseinrosid@gmail.com`
9. **Dynamic Dual Theme:** Pengubah tema (*Dark Luxury Editorial* sebagai default & *Clean Minimalist Light Mode*) dengan preferensi tersimpan di `localStorage`.

## 6. Out of Scope (Bukan Bagian dari V1)
- Toko online penjualan cetakan fisik otomatis (*e-commerce*).
- Portal download klien dengan login/password.
- Seksi gear/perlengkapan kamera ("What's in my bag") ditiadakan sesuai arahan fotografer.
- Database eksternal yang rumit (seluruh data dikelola terpusat di `src/data/portfolioData.ts`).

## 7. Success Criteria
1. Seluruh teks antarmuka dan konten disajikan 100% dalam Bahasa Indonesia yang baku, elegan, dan estetik.
2. Galeri masonry menampilkan foto resolusi tinggi secara proporsional di mobile (375px), tablet (768px), dan desktop (1440px).
3. Tombol WhatsApp secara instan membuka obrolan ke `088992806757` dengan pesan pembuka otomatis yang sopan dan terstruktur.
4. Pengunjung dapat beralih antara tema Gelap dan Terang secara instan.
