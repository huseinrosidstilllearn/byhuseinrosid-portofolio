# Design System

## 1. Style & Aesthetic
- **Konsep Visual:** *Cinematic Editorial & Contemporary Fine-Art Gallery*
- **Karakter:** Mewah, bersih, fokus penuh pada ketajaman dan emosi foto, tanpa distraksi visual yang berlebihan.
- **Dua Mode (Dynamic Dual Theme):**
  - **Dark Mode (Default):** Memberikan kontras maksimal seperti di ruang pameran malam atau teater, warna foto terlihat lebih hidup.
  - **Light Mode:** Suasana galeri seni modern kontemporer yang bersih, cerah, dan berkelas.

## 2. Typography
- **Heading & Judul Editorial:** Serif elegan (*Playfair Display* / *Cinzel* / Serif fallback) untuk kesan puitis, artistik, dan berbobot.
- **Body & Metadata EXIF:** Sans-Serif modern (*Plus Jakarta Sans* / *Inter* / system sans) dengan pembacaan yang jernih dan proporsional.
- **Tag / Micro-copy:** Huruf kapital tipis dengan tracking lebar (*tracking-wider / tracking-widest*).

## 3. Color Palette

### Dark Mode (Default)
- **Background Utama:** `#090d16` (Deep Obsidian Charcoal)
- **Surface / Card:** `#111827` (Rich Slate Gray)
- **Borders & Dividers:** `rgba(255, 255, 255, 0.08)`
- **Teks Utama:** `#f8fafc` (Bright Ivory / Snow White)
- **Teks Sekunder / Muted:** `#94a3b8` (Muted Slate)
- **Aksen Mewah (Highlights/Gold):** `#f59e0b` / `#fbbf24` (Warm Amber Gold)

### Light Mode
- **Background Utama:** `#f8fafc` (Ultra-light Slate White)
- **Surface / Card:** `#ffffff` (Pure White)
- **Borders & Dividers:** `#e2e8f0` (Light Slate Border)
- **Teks Utama:** `#0f172a` (Deep Slate Black)
- **Teks Sekunder / Muted:** `#64748b` (Slate Gray)
- **Aksen Mewah:** `#b45309` / `#d97706` (Refined Ochre Gold)

## 4. UI Components

### Buttons
- **Primary Action (CTA):** Pill button (`rounded-full`), aksen emas/hitam, efek hover glow halus.
- **Secondary / Filter Tabs:** Tombol kapsul dengan transisi warna latar belakang dan teks aktif.
- **Floating WhatsApp:** Tombol melayang di pojok kanan bawah hijau elegan dengan badge notifikasi halus.

### Cards & Grid
- **Border Radius:** `16px` (`rounded-2xl`) untuk kartu konten, `12px` (`rounded-xl`) untuk kartu kecil.
- **Rasio Foto:** Masonry / multi-aspect ratio (3:2, 4:5, 16:9, 1:1) tanpa terpotong kaku.
- **Hover Effect:** Zoom skala halus (`scale-105`), overlay informasi semi-transparan muncul lembut.

### Lightbox Modal
- Latar belakang backdrop gelap blur (`backdrop-blur-md bg-black/90`).
- Panel detail foto di samping atau bawah (Judul, lokasi, tanggal, narasi cerita, dan baris badge EXIF).
- Tombol navigasi (Previous, Next, Close) yang ramah sentuhan (touch-friendly) dan mendukung tombol keyboard (ESC, Panah Kiri, Panah Kanan).

## 5. UX & Responsiveness Requirements
- **Mobile First:** Tata letak fleksibel mulai dari layar 375px (smartphone) hingga 1440px+ (desktop layar lebar).
- **Smooth Scrolling:** Navigasi anchor meluncur lembut antar seksi.
- **Empty States & Fallbacks:** Fallback gambar halus jika koneksi lambat.
- **Accessibility:** Kontras teks terbaca jelas, tombol memiliki label aria (*screen-reader friendly*).
