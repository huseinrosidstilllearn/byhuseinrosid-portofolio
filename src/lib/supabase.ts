import { createClient } from '@supabase/supabase-js';
import type { PhotoItem, PhotoStory } from '../types/portfolio';
import { PORTFOLIO_PHOTOS, PHOTO_STORIES } from '../data/portfolioData';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bvghcotenyvbembvgvck.supabase.co';
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_YFTuWVf3f5A-VJ0nAMwxKQ_NoV350T7';

// Inisialisasi Klien Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Mengambil daftar foto galeri dari database Supabase
 * Jika database belum terkoneksi atau kosong, otomatis fallback ke data lokal
 */
export async function getPhotos(): Promise<PhotoItem[]> {
  if (!supabase) {
    return PORTFOLIO_PHOTOS;
  }

  try {
    const { data, error } = await supabase
      .from('photos')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return PORTFOLIO_PHOTOS;
    }

    return data.map((item) => ({
      id: item.id,
      title: item.title,
      category: item.category,
      imageUrl: item.image_url,
      aspectRatio: (item.aspect_ratio as PhotoItem['aspectRatio']) || 'landscape',
      location: item.location || '',
      year: item.year || '',
      description: item.description || '',
      featured: item.featured ?? false,
      glowColor: item.glow_color || undefined,
    }));
  } catch (err) {
    console.warn('Gagal memuat foto dari Supabase, menggunakan data lokal:', err);
    return PORTFOLIO_PHOTOS;
  }
}

/**
 * Mengambil daftar esai foto dari database Supabase
 */
export async function getPhotoStories(): Promise<PhotoStory[]> {
  if (!supabase) {
    return PHOTO_STORIES;
  }

  try {
    const { data, error } = await supabase
      .from('photo_stories')
      .select('*')
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return PHOTO_STORIES;
    }

    return data.map((item) => ({
      id: item.id,
      title: item.title,
      subtitle: item.subtitle || '',
      category: item.category || '',
      coverImage: item.cover_image,
      images: Array.isArray(item.images) ? item.images : [],
      location: item.location || '',
      year: item.year || '',
      narrative: item.narrative || '',
      quote: item.quote || '',
    }));
  } catch (err) {
    console.warn('Gagal memuat cerita foto dari Supabase, menggunakan data lokal:', err);
    return PHOTO_STORIES;
  }
}
