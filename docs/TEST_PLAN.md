# Test Plan

Dokumen ini mendefinisikan kriteria pengujian untuk memastikan setiap fitur berfungsi sesuai standar sebelum dianggap selesai.

---

## 1. Navigasi & Sistem Tema (Theme System)
- [ ] Navbar dapat meluncur mulus (*smooth scroll*) ke seksi terkait saat tautan diklik.
- [ ] Tombol toggle tema beralih antara Dark Mode dan Light Mode seketika tanpa flicker warna.
- [ ] Pilihan tema tersimpan di `localStorage` dan tidak tereset saat halaman di-refresh.
- [ ] Tampilan menu hamburger di layar ponsel (*mobile*) membuka dan menutup dengan responsif.

---

## 2. Galeri Foto & Filter Kategori
- [ ] Tab filter kategori (All, Commercial, Portrait, Documentary, Landscape, Wedding) memfilter koleksi foto secara akurat.
- [ ] Animasi transisi pergantian filter berjalan mulus tanpa lag.
- [ ] Foto mempertahankan rasio aspek alaminya (portrait, landscape, square) tanpa terpotong paksa.
- [ ] Efek hover pada kartu foto menampilkan judul dan kategori dengan elegan.

---

## 3. Lightbox Modal & Data EXIF
- [ ] Mengklik foto membuka modal tampilan layar penuh dengan backdrop blur.
- [ ] Menampilkan data lengkap: Judul foto, lokasi, tahun pengambilan, narasi cerita.
- [ ] Menampilkan badge data teknis kamera (EXIF): Tipe Kamera, Lensa, Shutter Speed, Aperture, dan ISO.
- [ ] Tombol navigasi Next dan Previous dapat memindahkan foto sesuai urutan kategori yang sedang aktif.
- [ ] Mendukung navigasi keyboard: Tombol panah kiri/kanan untuk geser foto, tombol `ESC` untuk menutup.
- [ ] Modal dapat ditutup dengan mengklik tombol silang (X) atau area luar foto.

---

## 4. Photo Essays (Cerita di Balik Karya)
- [ ] Bagian photo essay menampilkan narasi mendalam dengan tata letak editorial majalah visual.

---

## 5. Profil Fotografer & Gear Kit
- [ ] Profil Husein Rosid menampilkan foto fotografer, biografi singkat, dan filosofi artistik.
- [ ] Seksi "What's in my bag" menampilkan daftar gear kamera dan lensa yang digunakan.

---

## 6. Layanan & Integrasi WhatsApp
- [ ] Kartu paket layanan fotografi menampilkan rincian cakupan sesi dengan jelas.
- [ ] Tombol "Book via WhatsApp" membuat URL WhatsApp resmi (`https://wa.me/...`) dengan pesan otomatis yang rapi dan terformat.
- [ ] Tombol mengambang (floating button) WhatsApp di pojok layar mudah diakses kapan saja.

---

## 7. Responsivitas Layar (Responsive Breakpoints)
- [ ] **Mobile (375px):** Tidak ada elemen yang terpotong atau menimbulkan scroll horizontal liar.
- [ ] **Tablet (768px):** Grid tertata proporsional 2 kolom, teks mudah dibaca.
- [ ] **Desktop (1280px - 1440px):** Tampilan editorial sinematik maksimal dengan visual resolusi tinggi.

---

## 8. Verifikasi Kode & Build
- [ ] `npm run build` berhasil tanpa error TypeScript (`tsc --noEmit`) maupun error bundler.
