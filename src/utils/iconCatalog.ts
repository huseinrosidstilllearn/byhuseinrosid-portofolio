import React from 'react';
import {
  Camera,
  Waves,
  Sun,
  Lightbulb,
  Sparkles,
  Palette,
  Clapperboard,
  Crop,
  Aperture,
  Film,
  Video,
  Mountain,
  Compass,
  Plane,
  Globe,
  MapPin,
  Users,
  Heart,
  Coffee,
  BookOpen,
  Eye,
  Wrench,
  Package,
  Award,
  Star,
  Building2,
  Briefcase,
  Edit3,
  Music,
  Flame,
  Shield,
  Target,
  Smile,
  Feather,
} from 'lucide-react';

export interface IconItem {
  key: string;
  label: string;
  category: 'fotografi' | 'kreatif' | 'alam' | 'sosial' | 'umum';
  icon: React.ComponentType<{ className?: string }>;
}

export const AVAILABLE_ICONS: IconItem[] = [
  // Fotografi dan Produksi
  { key: 'camera', label: 'Kamera', category: 'fotografi', icon: Camera },
  { key: 'aperture', label: 'Aperture', category: 'fotografi', icon: Aperture },
  { key: 'framing', label: 'Komposisi / Crop', category: 'fotografi', icon: Crop },
  { key: 'film', label: 'Film Seluloid', category: 'fotografi', icon: Film },
  { key: 'video', label: 'Video / Cinema', category: 'fotografi', icon: Video },
  { key: 'clapperboard', label: 'Set Produksi', category: 'fotografi', icon: Clapperboard },
  { key: 'wrench', label: 'Gear & Alat', category: 'fotografi', icon: Wrench },

  // Alam dan Elemen
  { key: 'waves', label: 'Ombak / Gelombang', category: 'alam', icon: Waves },
  { key: 'sun', label: 'Matahari / Cahaya', category: 'alam', icon: Sun },
  { key: 'mountain', label: 'Gunung / Lanskap', category: 'alam', icon: Mountain },
  { key: 'flame', label: 'Api / Energi', category: 'alam', icon: Flame },
  { key: 'feather', label: 'Bulu / Kehalusan', category: 'alam', icon: Feather },

  // Kreatif dan Visi
  { key: 'lightbulb', label: 'Ide / Konsep', category: 'kreatif', icon: Lightbulb },
  { key: 'sparkles', label: 'Kilau / Estetika', category: 'kreatif', icon: Sparkles },
  { key: 'palette', label: 'Warna / Color Grading', category: 'kreatif', icon: Palette },
  { key: 'edit', label: 'Penyuntingan', category: 'kreatif', icon: Edit3 },
  { key: 'eye', label: 'Visi / Pengamatan', category: 'kreatif', icon: Eye },
  { key: 'book', label: 'Buku / Narasi', category: 'kreatif', icon: BookOpen },

  // Sosial dan Hubungan
  { key: 'users', label: 'Komunitas / Orang', category: 'sosial', icon: Users },
  { key: 'heart', label: 'Cinta / Emosi', category: 'sosial', icon: Heart },
  { key: 'coffee', label: 'Kopi / Pertemuan', category: 'sosial', icon: Coffee },
  { key: 'smile', label: 'Senyum / Potret', category: 'sosial', icon: Smile },

  // Perjalanan, Tempat, dan Lainnya
  { key: 'compass', label: 'Kompas / Arah', category: 'umum', icon: Compass },
  { key: 'plane', label: 'Pesawat / Travel', category: 'umum', icon: Plane },
  { key: 'globe', label: 'Dunia / Global', category: 'umum', icon: Globe },
  { key: 'map-pin', label: 'Pin Lokasi', category: 'umum', icon: MapPin },
  { key: 'building', label: 'Gedung / Kota', category: 'umum', icon: Building2 },
  { key: 'briefcase', label: 'Komersial / Bisnis', category: 'umum', icon: Briefcase },
  { key: 'package', label: 'Paket / Produk', category: 'umum', icon: Package },
  { key: 'award', label: 'Penghargaan', category: 'umum', icon: Award },
  { key: 'star', label: 'Bintang / Favorit', category: 'umum', icon: Star },
  { key: 'target', label: 'Target / Presisi', category: 'umum', icon: Target },
  { key: 'shield', label: 'Perlindungan / Garansi', category: 'umum', icon: Shield },
  { key: 'music', label: 'Musik / Panggung', category: 'umum', icon: Music },
];

export const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  ...Object.fromEntries(AVAILABLE_ICONS.map((i) => [i.key, i.icon])),
  // Alias tambahan untuk toleransi variasi penamaan
  wave: Waves,
  waves: Waves,
  building2: Building2,
  crop: Crop,
  edit3: Edit3,
  mappin: MapPin,
  bookopen: BookOpen,
};

export function resolveIconComponent(key: string): React.ComponentType<{ className?: string }> {
  const normalized = (key || '').toLowerCase().trim();
  return ICON_MAP[normalized] || Camera;
}
