import { createClient } from '@supabase/supabase-js';
import type { PhotoItem, PhotoStory, SiteContentData, HeroSliderConfig } from '../types/portfolio';
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

export const DEFAULT_MARQUEE_CONFIG = {
  speed: 'normal' as const,
  selectionMode: 'featured' as const,
  maxItems: 24,
  customPhotoIds: [],
};

export const DEFAULT_HERO_SLIDER_CONFIG: HeroSliderConfig = {
  autoRotate: true,
  intervalSeconds: 7,
  slides: [
    {
      id: 'slide-event',
      category: 'Event Documentation',
      photoId: 'auto',
      enabled: true,
    },
    {
      id: 'slide-graduation',
      category: 'Graduation',
      photoId: 'auto',
      enabled: true,
    },
    {
      id: 'slide-couple',
      category: 'Couple Session',
      photoId: 'auto',
      enabled: true,
    },
  ],
};

export const DEFAULT_SITE_CONTENT: SiteContentData = {
  profile: PHOTOGRAPHER_PROFILE,
  contact: CONTACT_CONFIG,
  timeline: TIMELINE_MILESTONES,
  skills: SKILLS,
  services: SERVICE_PACKAGES,
  stats: JOURNEY_STATS,
  marquee: DEFAULT_MARQUEE_CONFIG,
  heroSlider: DEFAULT_HERO_SLIDER_CONFIG,
};

const LOCAL_STORAGE_CONTENT_KEY = 'bhr_site_content_cache';

/**
 * Mengambil daftar foto galeri dari database Supabase
 * Jika database belum terkoneksi atau kosong, otomatis fallback ke data lokal
 */
export async function getPhotos(fallbackToLocal = true): Promise<PhotoItem[]> {
  if (!supabase) {
    return fallbackToLocal ? PORTFOLIO_PHOTOS : [];
  }

  try {
    const { data, error } = await supabase
      .from('photos')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return fallbackToLocal ? PORTFOLIO_PHOTOS : [];
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
    console.warn('Gagal memuat foto dari Supabase:', err);
    return fallbackToLocal ? PORTFOLIO_PHOTOS : [];
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
      if (
        parsed.services &&
        Array.isArray(parsed.services) &&
        parsed.services.some(
          (s: any) =>
            s.category === 'Commercial & Editorial' ||
            s.title?.includes('Komersial')
        )
      ) {
        parsed.services = SERVICE_PACKAGES;
      }
      if (
        parsed.heroSlider &&
        Array.isArray(parsed.heroSlider.slides) &&
        parsed.heroSlider.slides.some(
          (s: any) =>
            s.category === 'Behind The Scene Production' ||
            s.category === 'Solo Potrait' ||
            s.category === 'Solo Portrait' ||
            s.category === 'Commercial & Brand Campaign' ||
            s.category === 'Street Photography'
        )
      ) {
        parsed.heroSlider = DEFAULT_HERO_SLIDER_CONFIG;
      }
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
            if (row.id === 'heroSlider' && row.value?.slides && Array.isArray(row.value.slides)) {
              const hasStaleCategories = row.value.slides.some(
                (s: any) =>
                  s.category === 'Behind The Scene Production' ||
                  s.category === 'Solo Potrait' ||
                  s.category === 'Solo Portrait'
              );
              if (hasStaleCategories) {
                (result as any).heroSlider = DEFAULT_HERO_SLIDER_CONFIG;
                return;
              }
            }
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
