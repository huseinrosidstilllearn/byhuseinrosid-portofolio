# Design System

## 1. Style & Aesthetic
- **Konsep Visual:** *Cinematic Editorial & Humanist Visual Gallery*
- **Karakter:** Hangat, puitis, jujur, dan berkelas. Menghormati setiap foto sebagai rekaman momen hidup yang bernyawa.
- **Bahasa Desain & Teks:** 100% Bahasa Indonesia baku dan puitis.
- **Dynamic Dual Theme:**
  - **Dark Mode (Default):** Deep Obsidian Charcoal (`#090d16`) dengan kontras tinggi yang menonjolkan saturasi warna foto dan emosi cahaya.
  - **Light Mode:** Ultra-light Slate White (`#f8fafc`) dengan atmosfer pameran galeri kontemporer yang bersih.

## 2. Typography
- **Heading & Judul Editorial:** Serif elegan (*Playfair Display* / *Cinzel* / Serif luxury fallback) untuk kesan berbobot, sinematik, dan artistik.
- **Body Text & Narasi:** Modern Humanist Sans-Serif (*Plus Jakarta Sans* / *Inter*) dengan jarak baris longgar (1.6 - 1.8) agar esai foto nyaman dinikmati.
- **Mikro-teks / Navigasi:** Huruf kapital dengan spasi lebar (*tracking-wider / tracking-widest / text-xs*) untuk menu dan kategori karya.

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
- Kolom multi-kolom yang mengalir alami (1 kolom di mobile, 2 kolom di tablet, 3 kolom di desktop).
- Menampilkan foto portrait, landscape, dan square dalam proporsi alaminya tanpa pemotongan kaku.

### Micro-Interaction pada Kartu Foto
- **Smooth Zoom:** Pembesaran foto secara halus saat kursor melayang (`scale-105 transition-transform duration-500 ease-out`).
- **Info Overlay Reveal:** Lapisan bayangan gelap muncul lembut dari bawah menampilkan judul karya dan kategori foto.

### Rich Lightbox Modal
- Latar belakang layar penuh gelap blur (`backdrop-blur-md bg-black/95`).
- Panel narasi cerita karya dan lokasi pemotretan.
- Kontrol ramah sentuhan dan keyboard (ESC untuk keluar, panah kiri/kanan untuk navigasi).

### Layanan & Tombol WhatsApp
- Kartu layanan berdesain editorial yang merinci cakupan pemotretan.
- Tombol aksi utama "Minta Penawaran via WhatsApp" yang langsung terhubung ke nomor `088992806757`.
- Tombol mengambang (Floating Action Button) WhatsApp di pojok kanan bawah layar.

## 5. Responsiveness
- **Mobile (375px):** Tampilan satu kolom yang mengalir nyaman, drawer menu samping responsif.
- **Tablet (768px):** Grid 2 kolom seimbang.
- **Desktop (1280px+):** Tampilan sinematik 3 kolom penuh dengan tipografi editorial megah.
