# Development Rules

Ini adalah buku panduan aturan main (rulebook) proyek untuk pengembangan AI dan developer.

## 1. Aturan Umum (General)
- **TypeScript Only:** Seluruh file logika dan komponen wajib menggunakan TypeScript dengan tipe data yang ketat (*strict types*), hindari `any`.
- **Gunakan Kembali Komponen:** Utamakan menggunakan ulang (*reuse*) komponen yang sudah ada sebelum membuat yang baru.
- **Pemisahan Tanggung Jawab:** Pisahkan data statis ke `src/data/portfolioData.ts`, jangan menaruh data foto langsung di komponen UI.
- **Fungsi Ramping & Fokus:** Buat fungsi dan komponen modular dengan panjang yang terukur dan mudah dibaca.
- **Jangan Mengubah File yang Tidak Terkait:** Batasi perubahan hanya pada file yang relevan dengan tugas (`TASK`) yang sedang dikerjakan.

## 2. Sebelum Melakukan Coding
- Baca dokumen referensi proyek (`docs/PRD.md`, `docs/ARCHITECTURE.md`, `docs/DESIGN.md`).
- Pahami tujuan tugas (`TASK-xxx`) sebelum menulis kode.
- Pastikan tidak merusak fitur yang sudah berjalan sebelumnya.

## 3. Standar Desain & UI
- Wajib mengikuti panduan token warna, tipografi, dan radius pada `docs/DESIGN.md`.
- Wajib memastikan tampilan responsif di 3 breakpoint utama:
  - Mobile (375px)
  - Tablet (768px)
  - Desktop (1280px+)
- Sediakan state transisi yang mulus saat berganti tema (Dark/Light mode).

## 4. Keamanan & Sanitasi
- Jangan pernah menyimpan API key, password, atau credential sensitif di dalam repositori Git.
- Validasi data input pengguna (misal formulir kontak) sebelum memprosesnya ke URL WhatsApp.

## 5. Disiplin Git & Tugas
- Kerjakan satu fitur/tugas dalam satu waktu (*vertical slice*).
- Jalankan verifikasi lint/typecheck sebelum melakukan commit.
- Gunakan pesan commit yang deskriptif berstandar Conventional Commits (misal: `feat: implement lightbox modal with EXIF data`).
