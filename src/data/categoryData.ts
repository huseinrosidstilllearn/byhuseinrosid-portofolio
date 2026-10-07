import React from 'react';
import {
  Calendar,
  GraduationCap,
  Clapperboard,
  Heart,
  Camera,
  Briefcase,
  User,
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
  'Event Documentation': {
    name: 'Event Documentation',
    slug: 'event-documentation',
    title: 'Event Documentation',
    subtitle: 'Dokumentasi Acara, Panggung & Momen Kolektif',
    statement:
      'Merekam atmosfer, dinamika, dan energi otentik dari setiap perhelatan acara tanpa kehilangan detail momen penting yang bergulir cepat. Dari gathering korporat hingga festival panggung, setiap bingkai merangkum memori kebersamaan yang hidup.',
    philosophyQuote:
      'Di tengah keramaian acara, ada ribuan cerita kecil yang menunggu untuk dicatat dengan ketajaman rasa.',
    icon: Calendar,
    accentColor: 'text-amber-400',
    glowColor: '#f59e0b',
    coverImage:
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1600&q=85',
    tags: ['Live Event', 'Stage & Concert', 'Corporate Gathering', 'Festival Budaya'],
    waTemplate:
      'Halo Mas Husein Rosid, saya tertarik untuk mendiskusikan dokumentasi event / acara bersama Anda.',
  },

  'Graduation': {
    name: 'Graduation',
    slug: 'graduation',
    title: 'Graduation',
    subtitle: 'Perayaan Kelulusan, Kebanggaan & Babak Baru Kehidupan',
    statement:
      'Mengabadikan senyum kebanggaan, pelukan hangat keluarga, dan tonggak pencapaian akademik dalam potret kelulusan yang berkesan dan abadi. Sebuah momen selebrasi perjuangan yang layak dikenang sepanjang masa.',
    philosophyQuote:
      'Kelulusan bukan sekadar akhir sebuah babak, melainkan gerbang awal menuju jejak langkah yang lebih besar.',
    icon: GraduationCap,
    accentColor: 'text-blue-400',
    glowColor: '#3b82f6',
    coverImage:
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=85',
    tags: ['Wisuda Sarjana', 'Kebanggaan Keluarga', 'Toga & Selebrasi', 'Potret Kelulusan'],
    waTemplate:
      'Halo Mas Husein Rosid, saya ingin memesan sesi foto wisuda / graduation bersama Anda.',
  },

  'Behind The Scene Production': {
    name: 'Behind The Scene Production',
    slug: 'behind-the-scene-production',
    title: 'Behind The Scene Production',
    subtitle: 'Dokumentasi Proses Kreatif, Set Syuting & Di Balik Layar',
    statement:
      'Menangkap dedikasi kru, ketegangan kreatif di balik layar, dan etos kerja produksi film, komersial, maupun seni pertunjukan. Menyingkap keajaiban proses yang jarang terlihat di depan kamera utama.',
    philosophyQuote:
      'Karya besar tidak pernah lahir tiba-tiba; ia ditempa dalam peluh, konsentrasi, dan kolaborasi tanpa batas di balik layar.',
    icon: Clapperboard,
    accentColor: 'text-purple-400',
    glowColor: '#a855f7',
    coverImage:
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=85',
    tags: ['Film Set', 'Shooting Production', 'Etos Kru', 'Proses Kreatif'],
    waTemplate:
      'Halo Mas Husein Rosid, saya membutuhkan fotografer Behind The Scene untuk proyek produksi kami.',
  },

  'Couple Session': {
    name: 'Couple Session',
    slug: 'couple-session',
    title: 'Couple Session',
    subtitle: 'Kisah Kasih Otentik, Prewedding & Kehangatan Bersama',
    statement:
      'Merekam kehangatan tatapan, tawa lepas, dan sentuhan tulus dua insan dalam suasana santai tanpa rekayasa pose yang kaku. Menghadirkan narasi cinta yang apa adanya dan penuh kejujuran emosi.',
    philosophyQuote:
      'Cinta sejati tidak membutuhkan kepalsuan; getarannya sudah terpancar dari kejujuran tatapan.',
    icon: Heart,
    accentColor: 'text-rose-400',
    glowColor: '#f43f5e',
    coverImage:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85',
    tags: ['Prewedding', 'Intimate Story', 'Romansa Alami', 'Cinta Dua Insan'],
    waTemplate:
      'Halo Mas Husein Rosid, saya ingin berkonsultasi mengenai sesi foto couple / prewedding bersama Anda.',
  },

  'Street Photography': {
    name: 'Street Photography',
    slug: 'street-photography',
    title: 'Street Photography',
    subtitle: 'Denyut Jalanan, Realitas Sosial & Momen Spontan Publik',
    statement:
      'Menelusuri lorong dan denyut jalanan untuk menangkap siluet waktu, kebiasaan manusia perkotaan, dan keindahan tak terduga di ruang publik. Setiap jepretan adalah arsip visual tentang kemanusiaan yang berdetak bebas.',
    philosophyQuote:
      'Jalanan adalah panggung teater terbuka tanpa naskah, tempat kehidupan paling murni dipentaskan setiap detik.',
    icon: Camera,
    accentColor: 'text-yellow-400',
    glowColor: '#eab308',
    coverImage:
      'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=1600&q=85',
    tags: ['Urban Geometry', 'Human Interest', 'Kota Tua', 'Siluet & Cahaya'],
    waTemplate:
      'Halo Mas Husein Rosid, saya tertarik dengan karya street photography Anda untuk lisensi / proyek visual.',
  },

  'Commercial & Brand Campaign': {
    name: 'Commercial & Brand Campaign',
    slug: 'commercial-brand-campaign',
    title: 'Commercial & Brand Campaign',
    subtitle: 'Kampanye Komersial, Identitas Brand & Editorial Visual',
    statement:
      'Mengartikulasikan nilai, esensi produk, dan narasi brand ke dalam bahasa visual berkualitas tinggi yang memperkuat positioning pasar. Dengan pencahayaan terukur dan arahan gaya yang presisi, setiap bingkai dirancang memikat audiens.',
    philosophyQuote:
      'Estetika visual adalah jembatan paling intim antara esensi sebuah produk dan hasrat penikmatnya.',
    icon: Briefcase,
    accentColor: 'text-emerald-400',
    glowColor: '#10b981',
    coverImage:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=85',
    tags: ['Brand Campaign', 'Editorial Fashion', 'Artisanal Product', 'Visual Identity'],
    waTemplate:
      'Halo Mas Husein Rosid, saya ingin berdiskusi mengenai proyek komersial & kampanye brand bersama Anda.',
  },

  'Solo Potrait': {
    name: 'Solo Potrait',
    slug: 'solo-potrait',
    title: 'Solo Potrait',
    subtitle: 'Potret Diri Otentik, Karakter & Personal Branding',
    statement:
      'Mengeksplorasi kepribadian dan karakter terdalam subjek melalui pencahayaan terarah, menghasilkan potret diri yang kuat, jujur, dan berwibawa. Membiarkan gradasi bayangan dan cahaya alami memahat karakter tanpa kepura-puraan.',
    philosophyQuote:
      'Potret yang baik tidak menelanjangi wajah, melainkan menghormati rahasia di kedalaman jiwa.',
    icon: User,
    accentColor: 'text-sky-400',
    glowColor: '#0ea5e9',
    coverImage:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=85',
    tags: ['Personal Branding', 'Editorial Portrait', 'Chiaroscuro', 'Karakter Wajah'],
    waTemplate:
      'Halo Mas Husein Rosid, saya ingin menjadwalkan sesi pemotretan solo potret personal bersama Anda.',
  },
};

export const CATEGORY_ORDER = [
  'Event Documentation',
  'Graduation',
  'Couple Session',
  'Behind The Scene Production',
  'Street Photography',
  'Commercial & Brand Campaign',
  'Solo Potrait',
] as const;

export function getCategoryInfo(categoryName: string): CategoryInfo {
  if (CATEGORY_DETAILS[categoryName]) {
    return CATEGORY_DETAILS[categoryName];
  }
  // Gracefully handle 'Solo Portrait' with 'i'
  if (categoryName.toLowerCase() === 'solo portrait') {
    return CATEGORY_DETAILS['Solo Potrait'];
  }
  // Fallback for custom or unmapped categories
  return {
    name: categoryName,
    slug: categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
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
  const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const found = Object.values(CATEGORY_DETAILS).find(
    (c) => c.slug.toLowerCase() === cleanSlug
  );
  if (found) return found;
  if (cleanSlug === 'solo-portrait') return CATEGORY_DETAILS['Solo Potrait'];
  return null;
}

export function getNextCategory(currentName: string): CategoryInfo {
  const currentIndex = CATEGORY_ORDER.indexOf(currentName as typeof CATEGORY_ORDER[number]);
  if (currentIndex === -1 || currentIndex === CATEGORY_ORDER.length - 1) {
    return CATEGORY_DETAILS[CATEGORY_ORDER[0]];
  }
  return CATEGORY_DETAILS[CATEGORY_ORDER[currentIndex + 1]];
}
