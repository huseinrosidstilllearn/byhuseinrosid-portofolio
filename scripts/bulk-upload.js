import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Konfigurasi Supabase & Cloudflare R2
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://bvghcotenyvbembvgvck.supabase.co';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_YFTuWVf3f5A-VJ0nAMwxKQ_NoV350T7';
const UPLOAD_ENDPOINT = 'https://byhuseinrosid.my.id/api/upload';

const VALID_CATEGORIES = [
  'Event Documentation',
  'Graduation',
  'Behind The Scene Production',
  'Couple Session',
  'Street Photography',
  'Commercial & Brand Campaign',
  'Solo Potrait',
];

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function uploadFileToR2(filePath) {
  const fileName = path.basename(filePath);
  const fileBuffer = fs.readFileSync(filePath);
  const blob = new Blob([fileBuffer], { type: 'image/jpeg' });
  const formData = new FormData();
  formData.append('file', blob, fileName);

  const res = await fetch(UPLOAD_ENDPOINT, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Upload gagal (${res.status}): ${text}`);
  }

  const data = await res.json();
  if (!data.url) {
    throw new Error('Upload endpoint tidak mengembalikan URL foto.');
  }

  return data.url;
}

async function run() {
  const args = process.argv.slice(2);
  const folderPath = args[0];
  const category = args[1] || 'Event Documentation';
  const location = args[2] || 'Surabaya, Jawa Timur';
  const year = args[3] || new Date().getFullYear().toString();

  if (!folderPath) {
    console.log(`
Penggunaan Bulk Uploader Cepat:
  node scripts/bulk-upload.js "<folder_foto>" "<kategori>" "[lokasi]" "[tahun]"

Contoh:
  node scripts/bulk-upload.js "D:\\Foto\\Wisuda Unair" "Graduation" "Surabaya" "2026"

Daftar Kategori Resmi:
${VALID_CATEGORIES.map((c) => `  - ${c}`).join('\n')}
    `);
    process.exit(1);
  }

  if (!fs.existsSync(folderPath)) {
    console.error(`Error: Folder tidak ditemukan di: ${folderPath}`);
    process.exit(1);
  }

  const files = fs
    .readdirSync(folderPath)
    .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f));

  if (files.length === 0) {
    console.log(`Tidak ada file foto (JPG, PNG, WEBP) di folder: ${folderPath}`);
    process.exit(0);
  }

  console.log(`\n========================================`);
  console.log(`Memulai Bulk Upload untuk ${files.length} Foto`);
  console.log(`Folder   : ${folderPath}`);
  console.log(`Kategori : ${category}`);
  console.log(`Lokasi   : ${location}`);
  console.log(`Tahun    : ${year}`);
  console.log(`========================================\n`);

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < files.length; i++) {
    const fileName = files[i];
    const fullPath = path.join(folderPath, fileName);
    const progress = `[${i + 1}/${files.length}]`;

    // Rapikan judul dari nama file
    const cleanTitle = path
      .parse(fileName)
      .name.replace(/[-_]/g, ' ')
      .split(' ')
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    const title = cleanTitle || `${category} #${i + 1}`;

    process.stdout.write(`${progress} Mengunggah: ${fileName}... `);

    try {
      // 1. Upload ke Cloudflare R2
      const imageUrl = await uploadFileToR2(fullPath);

      // 2. Simpan ke Supabase
      const { data, error } = await supabase
        .from('photos')
        .insert([
          {
            title,
            category,
            image_url: imageUrl,
            aspect_ratio: 'landscape',
            location,
            year,
            description: '',
            featured: i < 2, // 2 foto pertama otomatis featured
          },
        ])
        .select()
        .single();

      if (error) {
        throw error;
      }

      console.log(`Berhasil! (ID: ${data.id})`);
      successCount++;
    } catch (err) {
      console.log(`GAGAL: ${err.message}`);
      failCount++;
    }
  }

  console.log(`\n========================================`);
  console.log(`Selesai!`);
  console.log(`Berhasil : ${successCount} foto`);
  console.log(`Gagal    : ${failCount} foto`);
  console.log(`Kunjungi : https://byhuseinrosid.my.id`);
  console.log(`========================================\n`);
}

run().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
