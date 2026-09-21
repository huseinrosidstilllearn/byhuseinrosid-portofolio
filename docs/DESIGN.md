# Design System

## 1. Style & Aesthetic
- **Konsep Visual:** *Cinematic Editorial & Humanist Visual Gallery*
- **Karakter:** Hangat, puitis, jujur, dan berkelas. Menghormati setiap bingkai foto sebagai karya seni yang bernyawa.
- **Dynamic Dual Theme:**
  - **Dark Mode (Default):** Deep Obsidian Charcoal (`#090d16`) dengan kontras tinggi yang menonjolkan warna, saturasi, dan cahaya asli foto layaknya bioskop atau pameran galeri malam.
  - **Light Mode:** Ultra-light Slate White (`#f8fafc`) dengan nuansa majalah seni rupa modern.

## 2. Typography
- **Heading & Judul Editorial:** Serif elegan (*Playfair Display* / *Cinzel* / Serif luxury fallback) dengan bobot medium-semibold, memberikan kesan berbobot dan sinematik.
- **Body Text & Narasi:** Modern Humanist Sans-Serif (*Plus Jakarta Sans* / *Inter*) dengan *line-height* longgar (1.6 - 1.8) untuk kenyamanan membaca esai foto yang mendalam.
- **Label Teknis & EXIF Data:** Monospace / Sans-Serif presisi (*tracking-wider / uppercase / text-xs*) untuk menampilkan spesifikasi kamera secara profesional.

## 3. Color Palette

### Dark Mode (Default)
- **Background Utama:** `#090d16` (Deep Obsidian Charcoal)
- **Surface / Cards:** `#111827` (Rich Slate Gray)
- **Card Hover Overlay:** `linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)`
- **Borders & Subtle Lines:** `rgba(255, 255, 255, 0.08)`
- **Teks Utama:** `#f8fafc` (Snow / Bright Ivory)
- **Teks Narasi / Muted:** `#94a3b8` (Muted Slate)
- **Aksen Mewah (Highlights/Gold):** `#f59e0b` / `#fbbf24` (Warm Amber Gold)

### Light Mode
- **Background Utama:** `#f8fafc` (Ultra-light Slate White)
- **Surface / Cards:** `#ffffff` (Pure White)
- **Card Hover Overlay:** `linear-gradient(to top, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.2) 60%, transparent 100%)`
- **Borders & Subtle Lines:** `#e2e8f0` (Light Slate Border)
- **Teks Utama:** `#0f172a` (Deep Slate Black)
- **Teks Narasi / Muted:** `#64748b` (Slate Gray)
- **Aksen Mewah:** `#b45309` / `#d97706` (Refined Ochre Gold)

## 4. UI Components & Micro-Interactions

### Masonry Grid Dinamis
- Kolom multi-kolom yang mengalir secara alami (1 kolom di mobile, 2 kolom di tablet, 3-4 kolom di desktop).
- Mempertahankan rasio asli foto (portrait 4:5 / 2:3, landscape 3:2 / 16:9, square 1:1) tanpa memotong konten visual.

### Micro-Interaction pada Kartu Foto
- **Smooth Zoom:** Foto membesar perlahan (`scale-105 transition-transform duration-500 ease-out`).
- **Info Overlay Reveal:** Lapisan gradien gelap muncul perlahan dari bawah menampilkan judul foto, kategori, dan ikon panah/eksplorasi.

### Rich Lightbox Modal
- Backdrop gelap blur (`backdrop-blur-md bg-black/95`).
- Panel informasi foto yang proporsional (Judul, lokasi, tahun, narasi cerita).
- Badge spesifikasi teknis kamera (EXIF: Shutter Speed, Aperture, ISO, Lensa).
- Kontrol sentuh dan keyboard (ESC untuk keluar, panah kiri/kanan untuk navigasi).

### Layanan & Tombol Penawaran WhatsApp
- Kartu layanan berdesain kartu editorial yang merinci cakupan kerja (durasi, output file, konsep).
- Tombol aksi utama "Minta Rate Card via WhatsApp" dengan animasi hover subtle glow.
- Tombol mengambang (Floating Action Button) WhatsApp di pojok kanan bawah yang selalu siap membantu pengunjung.

## 5. Responsiveness Requirements
- **Mobile (375px):** Pengalaman gulir satu kolom yang mulus, modal responsif layar sentuh, menu navigasi slide-out elegan.
- **Tablet (768px):** Tata letak 2 kolom seimbang.
- **Desktop (1280px+):** Tampilan sinematik penuh dengan grid masonry 3 kolom dan tipografi besar yang impresif.
