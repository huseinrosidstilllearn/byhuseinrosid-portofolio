import React from 'react';
import {
  Briefcase,
  User,
  Camera,
  Mountain,
  Heart,
} from 'lucide-react';

export interface CategoryInfo {
  name: string;
  slug: string;
  title: string;
  subtitle: string;
  statement: string;
  philosophyQuote: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  glowColor: string;
  coverImage: string;
  tags: string[];
  waTemplate: string;
}

export const CATEGORY_DETAILS: Record<string, CategoryInfo> = {
  'Dokumenter': {
    name: 'Dokumenter',
    slug: 'dokumenter',
    title: 'Dokumenter & Realitas Sosial',
    subtitle: 'Napas Jalanan, Jejak Tradisi & Momen Kemanusiaan',
    statement:
      'Mendokumentasikan realitas adalah latihan kerendahan hati. Bergerak di lorong kota tua, pesisir nelayan, dan denyut jalanan Surabaya, saya hadir sebagai saksi sunyi atas dinamika manusia. Setiap foto adalah potongan arsip sejarah emosional yang menolak dilupakan oleh percepatan modernitas.',
    philosophyQuote:
      'Fotografi dokumenter bukan tentang mencari keindahan semata, melainkan menemukan kebenaran yang tak bersuara.',
    icon: Camera,
    accentColor: 'text-amber-400',
    glowColor: '#f59e0b',
    coverImage:
      'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=1600&q=85',
    tags: ['Street Photography', 'Esai Nelayan', 'Arsip Kota Lama', 'Human Interest'],
    waTemplate:
      'Halo Mas Husein Rosid, saya tertarik dengan karya dokumenter Anda dan ingin berdiskusi mengenai penugasan / proyek esai visual.',
  },

  'Komersial': {
    name: 'Komersial',
    slug: 'komersial',
    title: 'Komersial & Brand',
    subtitle: 'Kampanye Visual, Produk Artisanal & Desain Arsitektural',
    statement:
      'Di ranah komersial, fotografi bukan sekadar menampilkan produk, melainkan mengartikulasikan nilai, identitas, dan prestise brand ke dalam bahasa visual yang tak terbantahkan. Dengan pencahayaan terukur dan arahan gaya yang presisi, setiap bingkai dirancang untuk memikat indra dan membangun loyalitas audiens.',
    philosophyQuote:
      'Estetika visual adalah jembatan paling intim antara esensi sebuah produk dan hasrat penikmatnya.',
    icon: Briefcase,
    accentColor: 'text-amber-400',
    glowColor: '#f59e0b',
    coverImage:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=85',
    tags: ['Brand Campaign', 'Editorial Fashion', 'Artisanal Roastery', 'Arsitektur Modern'],
    waTemplate:
      'Halo Mas Husein Rosid, saya tertarik untuk mendiskusikan proyek fotografi komersial / kampanye brand bersama Anda.',
  },

  'Portrait': {
    name: 'Portrait',
    slug: 'portrait',
    title: 'Potret Personal & Karakter',
    subtitle: 'Keaslian Emosi, Chiaroscuro & Karakter Manusia',
    statement:
      'Setiap manusia menyimpan semesta tak terucap di balik sorot matanya. Pendekatan potret saya menjauh dari kepalsuan pose mekanis; saya menciptakan ruang hening yang aman bagi subjek untuk hadir seutuhnya, membiarkan gradasi bayangan dan cahaya alami memahat karakter yang jujur dan berwibawa.',
    philosophyQuote:
      'Potret yang baik tidak menelanjangi wajah, melainkan menghormati rahasia di kedalaman jiwa.',
    icon: User,
    accentColor: 'text-sky-400',
    glowColor: '#0ea5e9',
    coverImage:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=85',
    tags: ['Personal Branding', 'Editorial Portrait', 'Chiaroscuro', 'Artistik & Karakter'],
    waTemplate:
      'Halo Mas Husein Rosid, saya ingin menjadwalkan sesi pemotretan potret personal / artistik bersama Anda.',
  },

  'Lanskap': {
    name: 'Lanskap',
    slug: 'lanskap',
    title: 'Lanskap & Alam Nusantara',
    subtitle: 'Keagungan Semesta, Kaldera Bromo & Keheningan Fajar',
    statement:
      'Menatap alam mengajarkan kita akan kecilnya diri di hadapan waktu. Dari kabut hening lautan pasir Bromo hingga riak tenang waduk di pedalaman Jawa Timur, seri lanskap ini mengejar cahaya fajar dan senja yang fana—membekukan keagungan yang hanya tercipta dalam hitungan detik.',
    philosophyQuote:
      'Di hadapan lanskap yang megah, keheningan adalah musik terindah yang bisa ditangkap oleh lensa.',
    icon: Mountain,
    accentColor: 'text-emerald-400',
    glowColor: '#10b981',
    coverImage:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85',
    tags: ['Bromo Tengger', 'Fajar & Kabut', 'Lanskap Nusantara', 'Fine Art Nature'],
    waTemplate:
      'Halo Mas Husein Rosid, saya tertarik dengan karya lanskap Anda untuk kebutuhan lisensi / print fine art / proyek visual.',
  },

  'Pernikahan': {
    name: 'Pernikahan',
    slug: 'pernikahan',
    title: 'Pernikahan & Kisah Intim',
    subtitle: 'Sentuhan Kasih, Janji Suci & Tangis Bahagia Apa Adanya',
    statement:
      'Hari pernikahan adalah perayaan cinta yang penuh getaran tulus. Dengan pendekatan fotojurnalistik yang tidak menginterupsi jalannya momen, saya mengabadikan pelukan hangat keluarga, senyum sembunyi-sembunyi, dan janji suci tanpa rekayasa—menghasilkan kenangan berharga yang tetap hidup selamanya.',
    philosophyQuote:
      'Cinta sejati tidak membutuhkan pose yang berlebihan; getarannya sudah terpancar dari kejujuran tatapan.',
    icon: Heart,
    accentColor: 'text-rose-400',
    glowColor: '#f43f5e',
    coverImage:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85',
    tags: ['Intimate Wedding', 'Fotojurnalistik', 'Janji Suci', 'Momen Keluarga'],
    waTemplate:
      'Halo Mas Husein Rosid, saya ingin berkonsultasi mengenai dokumentasi foto untuk hari pernikahan / momen sakral kami.',
  },
};

export const CATEGORY_ORDER = [
  'Dokumenter',
  'Komersial',
  'Portrait',
  'Lanskap',
  'Pernikahan',
] as const;

export function getCategoryInfo(categoryName: string): CategoryInfo {
  if (CATEGORY_DETAILS[categoryName]) {
    return CATEGORY_DETAILS[categoryName];
  }
  // Fallback for custom or unmapped categories
  return {
    name: categoryName,
    slug: categoryName.toLowerCase().replace(/\s+/g, '-'),
    title: categoryName,
    subtitle: `Koleksi kurasi khusus ${categoryName}`,
    statement: `Kumpulan karya visual terkurasi dalam kategori ${categoryName}, ditangkap dengan kepekaan rasa dan ketajaman teknis Husein Rosid.`,
    philosophyQuote: 'Setiap bingkai visual adalah cermin dedikasi dan penghormatan pada momen yang abadi.',
    icon: Camera,
    accentColor: 'text-amber-400',
    glowColor: '#f59e0b',
    coverImage:
      'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=1600&q=85',
    tags: [categoryName, 'Terkurasi', 'Husein Rosid'],
    waTemplate: `Halo Mas Husein Rosid, saya tertarik untuk mendiskusikan sesi fotografi untuk kategori ${categoryName}.`,
  };
}

export function getCategoryBySlug(slug: string): CategoryInfo | null {
  const found = Object.values(CATEGORY_DETAILS).find(
    (c) => c.slug.toLowerCase() === slug.toLowerCase()
  );
  return found || null;
}

export function getNextCategory(currentName: string): CategoryInfo {
  const currentIndex = CATEGORY_ORDER.indexOf(currentName as typeof CATEGORY_ORDER[number]);
  if (currentIndex === -1 || currentIndex === CATEGORY_ORDER.length - 1) {
    return CATEGORY_DETAILS[CATEGORY_ORDER[0]];
  }
  return CATEGORY_DETAILS[CATEGORY_ORDER[currentIndex + 1]];
}
