# Product Requirements Document (PRD)

## 1. Product
**Website Portofolio Fotografi Profesional "Husein Rosid"**

## 2. Problem
Fotografer profesional memerlukan wadah digital resmi yang kredibel, estetis, dan berkinerja tinggi untuk:
- Memamerkan portofolio karya visual lintas genre (komersial, personal, dokumenter).
- Menampilkan karya dalam rasio aslinya (portrait, landscape, square) tanpa terpotong secara kaku.
- Menunjukkan kedalaman artistik melalui narasi di balik layar (*photo essays*) dan pembuktian teknis (*EXIF camera data*).
- Membuka jalur komunikasi bernilai tinggi dengan calon klien melalui sistem penawaran *rate card* / *custom quote* langsung ke WhatsApp.

## 3. Target Users
1. **Klien Komersial & Agensi:** Brand, agensi kreatif, dan media yang mencari fotografer dengan visi kuat dan eksekusi teknis presisi.
2. **Klien Personal & Pasangan:** Individu dan calon pengantin yang mencari karya bernuansa humanis, hangat, dan sinematik.
3. **Kurator & Editor Visual:** Penikmat seni dan editor yang mencari cerita visual autentik (*photo essays*).

## 4. Goal
Menciptakan website portofolio interaktif dengan estetika editorial sinematik, tata letak dinamis *masonry*, dual-theme (Dark/Light), profil bercerita humanis, serta tombol permintaan *rate card* instan via WhatsApp.

## 5. Core Features (MVP V1)
1. **Hero Section Sinematik:** Sambutan visual dengan visual hero, identitas fotografer, tagline humanis sinematik, dan tombol CTA.
2. **Masonry Gallery Dinamis:** Tata letak grid dinamis yang mempertahankan proporsi asli gambar (portrait, landscape, square) dengan filter kategori dinamis (*All, Commercial, Portrait, Documentary, Landscape, Wedding*).
3. **Micro-Interaction Hover:** Animasi pembesaran halus (*smooth zoom*) dan overlay informasi (judul karya & kategori) saat kursor diarahkan ke kartu foto.
4. **Rich Lightbox Modal:** Tampilan layar penuh, zoom gambar, navigasi next/prev (klik & tombol keyboard panah), tombol escape, narasi foto, serta badge metadata teknis kamera (*EXIF: Kamera, Lensa, Aperture, Shutter Speed, ISO*).
5. **Editorial Case Studies (Photo Essays):** Seksi khusus yang membedah proyek foto berseri lengkap dengan narasi di balik layar, lokasi, dan pesan visual mendalam.
6. **Profil & Filosofi Humanis:** Biografi Husein Rosid dengan gaya narasi hangat dan reflektif, serta seksi perlengkapan andalan (*What's in my bag*).
7. **Katalog Layanan & Penawaran:** Showcase cakupan layanan pemotretan profesional (tanpa mencantumkan harga kaku), dengan tombol "Tanyakan Penawaran / Minta Rate Card via WhatsApp".
8. **Direct WhatsApp Smart Booking:** Tombol pemesanan langsung yang otomatis merangkai pesan terstruktur ke nomor WhatsApp resmi Husein Rosid.
9. **Dynamic Dual Theme:** Pengubah tema (*Dark Luxury Editorial* sebagai default & *Clean Minimalist Light Mode*) dengan persistensi di `localStorage`.

## 6. Out of Scope (Bukan Bagian dari V1)
- Toko online cetakan fisik dengan cart checkout dan payment gateway otomatis.
- Client proofing portal dengan autentikasi kata sandi untuk download file RAW.
- Database CMS eksternal yang rumit (seluruh data dikelola terstruktur di `src/data/portfolioData.ts`).

## 7. Success Criteria
1. Pengunjung dapat melihat foto resolusi tinggi dengan layout masonry dinamis tanpa distorsi rasio.
2. Filter kategori dan animasi hover berjalan mulus tanpa lag.
3. Lightbox menampilkan visual jernih lengkap dengan data EXIF teknis.
4. Pengunjung dapat membaca editorial case study dengan tata letak majalah visual yang imersif.
5. Pengunjung dapat beralih antara Dark Mode dan Light Mode dengan satu klik.
6. Tombol "Minta Rate Card via WhatsApp" langsung membuka aplikasi WhatsApp dengan pesan terformat rapi.
