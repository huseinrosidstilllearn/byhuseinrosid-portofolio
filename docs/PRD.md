# Product Requirements Document (PRD)

## 1. Product
**Website Portofolio Fotografi Profesional "Husein Rosid"**

## 2. Problem
Fotografer profesional memerlukan wadah digital resmi yang kredibel, estetis, dan berkinerja tinggi untuk:
- Memamerkan portofolio karya visual lintas genre (komersial, personal, dokumenter).
- Menunjukkan kredibilitas dan keahlian teknis (melalui data gear/EXIF dan narasi cerita karya).
- Memudahkan calon klien (brand, agensi, maupun pasangan/individu) untuk menghubungi dan memesan sesi pemotretan tanpa hambatan rumit.

## 3. Target Users
1. **Klien Komersial & Agensi:** Mencari fotografer untuk kebutuhan kampanye brand, produk, lookbook fashion, dan korporat.
2. **Klien Personal & Pasangan:** Mencari fotografer untuk portrait, wisuda, prewedding, wedding, dan family session.
3. **Kurator & Publikasi:** Mencari karya dokumenter, street, atau visual fine-art untuk editorial/pameran.

## 4. Goal
Menciptakan website portofolio interaktif dengan estetika editorial modern, performa tinggi, navigasi intuitif, dual-theme (Dark/Light), serta konversi pemesanan langsung melalui WhatsApp.

## 5. Core Features (MVP V1)
1. **Hero Section Sinematik:** Sambutan visual dengan visual hero, identitas fotografer, tagline, dan tombol CTA.
2. **Interactive Gallery:** Filter kategori dinamis (All, Commercial, Portrait, Documentary/Street, Landscape, Wedding).
3. **Rich Lightbox Modal:** Tampilan layar penuh, navigasi next/prev, zoom, deskripsi foto, dan data teknis kamera (EXIF).
4. **Photo Essays / Visual Stories:** Bagian cerita mendalam di balik karya atau sesi pemotretan tertentu.
5. **About & Photography Philosophy:** Biografi Husein Rosid, filosofi visual, pengalaman, dan gear kit ("What's in my bag").
6. **Services & Packages:** Penjelasan paket layanan pemotretan terstruktur.
7. **Direct WhatsApp Booking & Contact:** Tombol pesan instan dengan pesan otomatis cerdas serta kartu kontak sosial media.
8. **Dynamic Dual Theme:** Fitur pengubah tema (Dark Luxury Editorial & Clean Minimalist Light) dengan penyimpanan preferensi di local storage.

## 6. Out of Scope (Bukan Bagian dari V1)
- Toko online cetakan foto fisik dengan cart checkout dan payment gateway otomatis.
- Client proofing portal dengan autentikasi akun ber-password untuk unduh file foto mentah/RAW.
- Backend database mandiri yang rumit (seluruh data dikelola melalui file konfigurasi TypeScript terstruktur `portfolioData.ts`).

## 7. Success Criteria
Pengguna dapat:
1. Membuka website dengan waktu muat cepat dan animasi halus di mobile maupun desktop.
2. Menjelajahi galeri dan beralih filter kategori tanpa reload halaman.
3. Membuka modal foto layar penuh untuk melihat detail visual, cerita, dan data EXIF kamera.
4. Membaca photo essay dan memahami gaya naratif fotografer.
5. Mengubah tema visual dari Gelap ke Terang secara instan.
6. Menghubungi Husein Rosid secara langsung ke WhatsApp dengan satu klik untuk reservasi sesi foto.
