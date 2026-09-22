-- ==============================================================================
-- SKEMA DATABASE PORTOFOLIO FOTOGRAFI: BY HUSEIN ROSID
-- Jalankan skrip ini di: Supabase Dashboard -> SQL Editor (ikon >_ di sidebar)
-- ==============================================================================

-- 1. Buat Tabel Koleksi Foto (photos)
create table if not exists public.photos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null, -- 'Lanskap' | 'Dokumenter' | 'Portrait' | 'Komersial'
  image_url text not null,
  aspect_ratio text not null default 'landscape', -- 'portrait' | 'landscape' | 'square'
  location text,
  year text,
  description text,
  featured boolean default false,
  glow_color text default 'rgba(245, 158, 11, 0.4)',
  display_order int default 0,
  created_at timestamptz default now()
);

-- 2. Buat Tabel Esai Foto (photo_stories)
create table if not exists public.photo_stories (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  category text,
  cover_image text not null,
  images jsonb default '[]'::jsonb,
  location text,
  year text,
  narrative text,
  quote text,
  display_order int default 0,
  created_at timestamptz default now()
);

-- 3. Aktifkan Row Level Security (RLS) untuk Keamanan Tingkat Lanjut
alter table public.photos enable row level security;
alter table public.photo_stories enable row level security;

-- Hapus policy lama jika ada
drop policy if exists "Publik dapat membaca foto" on public.photos;
drop policy if exists "Admin dapat mengelola foto" on public.photos;
drop policy if exists "Publik dapat membaca esai foto" on public.photo_stories;
drop policy if exists "Admin dapat mengelola esai foto" on public.photo_stories;

-- 4. Kebijakan Keamanan (Policies)
-- Publik (Pengunjung Web): Boleh membaca (SELECT) data
create policy "Publik dapat membaca foto"
  on public.photos for select
  using (true);

create policy "Publik dapat membaca esai foto"
  on public.photo_stories for select
  using (true);

-- Admin (Pengguna Login Supabase Auth): Bebas Tambah, Edit, Hapus (ALL)
create policy "Admin dapat mengelola foto"
  on public.photos for all
  to authenticated
  using (true)
  with check (true);

create policy "Admin dapat mengelola esai foto"
  on public.photo_stories for all
  to authenticated
  using (true)
  with check (true);

-- 5. Masukkan Data Awal (Seed Data) dari Portofolio Kurasi Husein Rosid
insert into public.photos (title, category, image_url, aspect_ratio, location, year, description, featured, display_order)
values
  ('Senyap di Kaki Bromo', 'Lanskap', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=85', 'landscape', 'Taman Nasional Bromo Tengger Semeru', '2024', 'Keheningan kabut fajar yang merayap di lautan pasir kaldera sebelum fajar merekah.', true, 1),
  ('Garis Bayang di Sudut Kota', 'Dokumenter', 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=1920&q=85', 'portrait', 'Surabaya, Jawa Timur', '2025', 'Permainan siluet dan cahaya kontras yang membelah geometri arsitektur kota tua.', true, 2),
  ('Keteguhan dalam Diam', 'Portrait', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1920&q=85', 'portrait', 'Surabaya', '2025', 'Eksplorasi potret wajah dengan pencahayaan chiaroscuro yang menghormati karakter subjek.', true, 3),
  ('Refleksi Keanggunan Minimalis', 'Komersial', 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1920&q=85', 'landscape', 'Studio Surabaya', '2025', 'Kampanye editorial busana dengan tekstur kain alami dan pencahayaan studio terarah.', true, 4),
  ('Gembala dan Padang Sunyi', 'Dokumenter', 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=85', 'landscape', 'Sumba Timur, Nusa Tenggara Timur', '2024', 'Potret ketenangan padang savana saat ternak dipulangkan menuju peraduan senja.', false, 5),
  ('Monokrom Arsitektur Kolonial', 'Dokumenter', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85', 'portrait', 'Kawasan Kota Lama Surabaya', '2024', 'Detail pilar dan lengkungan bangunan bersejarah peninggalan era lampau dalam balutan hitam putih.', false, 6),
  ('Karakter dalam Cahaya Alami', 'Portrait', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1600&q=85', 'portrait', 'Surabaya', '2025', 'Potret close-up dengan penonjolan tekstur kulit dan tatapan mata yang bercerita.', false, 7),
  ('Pendar Kopi dan Ruang Temu', 'Komersial', 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1600&q=85', 'landscape', 'Surabaya', '2025', 'Katalog visual untuk ruang hospitality modern yang mengedepankan kehangatan atmosfer.', false, 8),
  ('Kabut Lembah Ijen', 'Lanskap', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85', 'landscape', 'Kawah Ijen, Banyuwangi', '2024', 'Dinding kaldera belerang yang diselimuti kabut tebal pada jam-jam pertama matahari terbit.', false, 9),
  ('Langkah Petang di Pesisir Kenjeran', 'Dokumenter', 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1600&q=85', 'landscape', 'Kenjeran, Surabaya', '2024', 'Aktivitas nelayan pesisir Surabaya saat air surut di bawah langit senja keemasan.', false, 10);

-- 6. Masukkan Data Esai Foto Awal
insert into public.photo_stories (title, subtitle, category, cover_image, images, location, year, narrative, quote, display_order)
values
  (
    'Napas Sunyi Nelayan Kenjeran',
    'Menyusuri rutinitas fajar para pencari nafkah laut di pesisir utara Surabaya',
    'Dokumenter Sosial',
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=85',
    '["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
    'Pesisir Kenjeran, Surabaya',
    '2024',
    'Di sudut timur Surabaya, kehidupan berputar pada jam yang berbeda. Ketika kota masih terlelap, perahu-perahu kayu kecil telah membelah kabut laut mencari rezeki. Esai foto ini adalah tribut kepada keteguhan tangan-tangan kasar yang tak pernah mengeluh kepada ombak.',
    'Laut tidak pernah berjanji pada siapa pun, namun mereka selalu datang setiap fajar dengan rasa hormat yang sama.',
    1
  ),
  (
    'Jejak Arsitektur Kota Lama',
    'Menatap kembali memori dinding tua dan jendela kolonial yang menjadi saksi bisu waktu',
    'Eksplorasi Visual',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85',
    '["https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
    'Kawasan Kota Lama Surabaya',
    '2025',
    'Bangunan tua menyimpan resonansi suara orang-orang yang pernah melangkah di lorongnya. Melalui permainan bayang-bayang dramatis dan sudut pandang rendah, seri foto ini menghidupkan kembali elegansi masa lampau di tengah kepungan era serba cepat.',
    'Dinding tua bukan sekadar batu bata lapuk, ia adalah kanvas waktu yang melukiskan ketabahan.',
    2
  );
