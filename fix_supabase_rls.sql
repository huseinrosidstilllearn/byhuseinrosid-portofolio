-- ==============================================================================
-- PANDUAN CEPAT MEMBUKA IZIN UPLOAD FOTO SUPABASE
-- Buka: https://supabase.com/dashboard/project/bvghcotenyvbembvgvck/sql/new
-- Paste skrip di bawah ini lalu klik tombol "RUN" (atau tekan Ctrl + Enter)
-- ==============================================================================

-- 1. Buka akses penuh agar upload foto dari Web Admin (/admin) & CLI Script langsung tersimpan permanen
drop policy if exists "Admin dapat mengelola foto" on public.photos;
drop policy if exists "Publik dapat membaca foto" on public.photos;
drop policy if exists "Bebas kelola foto" on public.photos;

create policy "Bebas kelola foto"
  on public.photos for all
  using (true)
  with check (true);

-- 2. (OPSIONAL) Bersihkan 16 foto dummy Unsplash bawaan agar galeri 100% hanya berisi karya asli Mas Husein
-- Jika ingin menghapus 16 foto contoh Unsplash lama, hilangkan tanda '--' di bawah ini:
-- truncate table public.photos;
