import { createClient } from '@supabase/supabase-js';
import type { PhotoItem, PhotoStory, SiteContentData } from '../types/portfolio';
import {
  PORTFOLIO_PHOTOS,
  PHOTO_STORIES,
  PHOTOGRAPHER_PROFILE,
  CONTACT_CONFIG,
  SERVICE_PACKAGES,
} from '../data/portfolioData';
import { TIMELINE_MILESTONES, SKILLS, JOURNEY_STATS } from '../data/journeyData';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bvghcotenyvbembvgvck.supabase.co';
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_YFTuWVf3f5A-VJ0nAMwxKQ_NoV350T7';

// Inisialisasi Klien Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const DEFAULT_SITE_CONTENT: SiteContentData = {
  profile: PHOTOGRAPHER_PROFILE,
  contact: CONTACT_CONFIG,
  timeline: TIMELINE_MILESTONES,
  skills: SKILLS,
  services: SERVICE_PACKAGES,
  stats: JOURNEY_STATS,
};

const LOCAL_STORAGE_CONTENT_KEY = 'bhr_site_content_cache';

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

/**
 * Mengambil seluruh data teks & konten situs (profil, timeline, skills, dll)
 * Menggabungkan Supabase -> LocalStorage Cache -> Default Static Data
 */
export async function getSiteContent(): Promise<SiteContentData> {
  const result: SiteContentData = { ...DEFAULT_SITE_CONTENT };

  // 1. Coba baca dari localStorage sebagai cache instan
  try {
    const cached = localStorage.getItem(LOCAL_STORAGE_CONTENT_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      Object.assign(result, parsed);
    }
  } catch {
    // Abaikan error localStorage
  }

  // 2. Coba fetch dari tabel site_content di Supabase
  if (supabase) {
    try {
      const { data, error } = await supabase.from('site_content').select('*');
      if (!error && data && data.length > 0) {
        data.forEach((row: { id: string; value: any }) => {
          if (row.id in result) {
            (result as any)[row.id] = row.value;
          }
        });

        // Update cache lokal
        try {
          localStorage.setItem(LOCAL_STORAGE_CONTENT_KEY, JSON.stringify(result));
        } catch {}
      }
    } catch (err) {
      console.warn('Tabel site_content belum tersedia di Supabase, memakai data lokal:', err);
    }
  }

  return result;
}

/**
 * Menyimpan satu seksi konten situs (e.g. 'profile', 'timeline', 'skills') ke Supabase & LocalStorage
 */
export async function saveSiteContentSection(
  sectionId: keyof SiteContentData,
  value: any
): Promise<{ success: boolean; error?: string }> {
  // 1. Simpan ke LocalStorage agar langsung aktif seketika
  try {
    const current = await getSiteContent();
    current[sectionId] = value;
    localStorage.setItem(LOCAL_STORAGE_CONTENT_KEY, JSON.stringify(current));
  } catch (err) {
    console.warn('Gagal menyimpan cache konten lokal:', err);
  }

  // 2. Simpan ke tabel Supabase jika koneksi aktif
  if (supabase) {
    try {
      const { error } = await supabase.from('site_content').upsert(
        {
          id: sectionId,
          value,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      );

      if (error) {
        console.warn(`Supabase upsert warning for ${sectionId}:`, error.message);
        return { success: true, error: `Tersimpan di browser lokal (${error.message})` };
      }

      return { success: true };
    } catch (err: any) {
      console.warn(`Gagal sinkronisasi ${sectionId} ke Supabase:`, err);
      return { success: true, error: `Tersimpan secara lokal (${err.message})` };
    }
  }

  return { success: true };
}
