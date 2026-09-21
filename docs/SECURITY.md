# Security Requirements

Dokumen ini memuat standar keamanan yang diterapkan pada aplikasi web portofolio ini.

---

## 1. Perlindungan Rahasia (Secrets & Credentials)
- Jangan pernah menuliskan API key, token otentikasi, atau kredensial privat langsung di dalam repositori kode.
- Seluruh variabel lingkungan yang diperlukan harus dikelola via `.env.local` dan didokumentasikan di `.env.example`.

## 2. Sanitasi Input & Parameter URL
- Pada integrasi pemesanan WhatsApp, teks nama, pilihan paket, dan pesan kustom wajib di-encode secara aman menggunakan `encodeURIComponent()` guna mencegah manipulasi parameter tautan (*URL injection / malformed URI*).

## 3. Protokol & Sumber Daya Eksternal
- Seluruh gambar dan font eksternal wajib dimuat melalui protokol terenkripsi aman (`HTTPS`).
- Gunakan atribut `rel="noopener noreferrer"` pada semua tautan eksternal yang membuka tab baru (`target="_blank"`) guna mencegah kerentanan *reverse tabnabbing*.

## 4. Keamanan Dependensi
- Pastikan dependensi npm selalu menggunakan versi stabil dan aman dari ancaman CVE yang diketahui (`npm audit`).
