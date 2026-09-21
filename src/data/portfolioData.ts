import type { ContactConfig, PhotographerProfile, PhotoItem, PhotoStory, ServicePackage } from '../types/portfolio';

export const PHOTOGRAPHER_PROFILE: PhotographerProfile = {
  name: "Husein Rosid",
  brandName: "By Husein Rosid",
  headline: "Stories Told in the Quiet Spaces Between Moments",
  subheadline: "Kumpulan rekaman visual, emosi jujur, dan keabadian cahaya yang tertangkap di antara detak waktu.",
  bioShort: "Fotografer berbasis di Surabaya yang mendedikasikan lensa untuk menangkap keheningan, keaslian manusia, dan emosi yang tak terucap.",
  bioFull: [
    "Bagi saya, fotografi bukanlah sekadar menekan tombol rana pada saat yang tepat, melainkan seni mendengarkan sebelum melihat. Di balik setiap bingkai visual terdapat jeda waktu yang sarat makna—sebuah momen hening di mana manusia dan semesta saling bercerita tanpa kepura-puraan.",
    "Berakar di Surabaya, Jawa Timur, perjalanan visual saya bergerak melintasi spektrum luas: dari intensitas kampanye komersial, keintiman potret personal, hingga kejujuran dokumenter jalanan dan lanskap nusantara.",
    "Saya percaya bahwa karya visual terbaik lahir ketika kita menghormati subjek dan membiarkan cahaya alami menenun narasi autentik yang abadi melewati zaman."
  ],
  philosophy: "Setiap frame adalah penghormatan terhadap emosi yang jujur dan cahaya yang fana.",
  location: "Surabaya, Jawa Timur, Indonesia",
  availability: "Menerima penugasan di Surabaya & siap bepergian ke seluruh Indonesia.",
  experienceYears: "7+ Tahun Pengalaman Visual",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80"
};

export const CONTACT_CONFIG: ContactConfig = {
  whatsappNumber: "6288992806757",
  whatsappDisplay: "+62 889-9280-6757",
  instagram: "@byhuseinrosid",
  instagramUrl: "https://instagram.com/byhuseinrosid",
  email: "byhuseinrosid@gmail.com",
  locationDisplay: "Surabaya, Jawa Timur, Indonesia"
};

export const PHOTO_CATEGORIES = [
  'Semua',
  'Komersial',
  'Portrait',
  'Dokumenter',
  'Lanskap',
  'Pernikahan'
] as const;

export const PORTFOLIO_PHOTOS: PhotoItem[] = [
  {
    id: 'p-01',
    title: 'Garis Bayang di Sudut Kota',
    category: 'Dokumenter',
    imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=1200&q=85',
    aspectRatio: 'portrait',
    location: 'Surabaya, Jawa Timur',
    year: '2025',
    description: 'Permainan siluet dan cahaya pagi yang membelah koridor arsitektur klasik di kawasan Surabaya Utara.',
    featured: true,
    glowColor: '#f59e0b' // amber gold
  },
  {
    id: 'p-02',
    title: 'Refleksi Keanggunan Minimalis',
    category: 'Komersial',
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85',
    aspectRatio: 'landscape',
    location: 'Studio Surabaya',
    year: '2025',
    description: 'Kampanye editorial fashion lokal dengan pendekatan warna monokrom dan aksen tekstur alami kain tenun.',
    featured: true,
    glowColor: '#94a3b8' // cool slate pearl
  },
  {
    id: 'p-03',
    title: 'Tatapan yang Menyimpan Laut',
    category: 'Portrait',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=85',
    aspectRatio: 'portrait',
    location: 'Kenjeran, Surabaya',
    year: '2024',
    description: 'Potret seorang nelayan sepuh dengan kerutan wajah yang menjadi arsip hidup puluhan tahun berlayar.',
    featured: true,
    glowColor: '#06b6d4' // ocean cyan
  },
  {
    id: 'p-04',
    title: 'Senyap di Kaki Bromo',
    category: 'Lanskap',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85',
    aspectRatio: 'landscape',
    location: 'Taman Nasional Bromo Tengger Semeru',
    year: '2024',
    description: 'Kabut fajar yang merayap di lautan pasir kaldera sebelum matahari pertama menyentuh punggung gunung.',
    featured: true,
    glowColor: '#3b82f6' // mountain blue
  },
  {
    id: 'p-05',
    title: 'Janji dalam Pelukan Senja',
    category: 'Pernikahan',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
    aspectRatio: 'portrait',
    location: 'Batu, Jawa Timur',
    year: '2025',
    description: 'Momen hening sepasang kekasih di penghujung hari resepsi, dirayakan tanpa kepalsuan di alam terbuka.',
    featured: true,
    glowColor: '#f43f5e' // rose twilight
  },
  {
    id: 'p-06',
    title: 'Esensi Tekstur Kayu & Kopi',
    category: 'Komersial',
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=85',
    aspectRatio: 'square',
    location: 'Surabaya Barat',
    year: '2024',
    description: 'Pemotretan produk artisanal roastery dengan pencahayaan samping terarah untuk menonjolkan karakter biji kopi.',
    featured: false,
    glowColor: '#d97706' // warm caramel
  },
  {
    id: 'p-07',
    title: 'Langkah Pulang Penarik Gerobak',
    category: 'Dokumenter',
    imageUrl: 'https://images.unsplash.com/photo-1517732306149-e8f829eb588a?auto=format&fit=crop&w=1200&q=85',
    aspectRatio: 'landscape',
    location: 'Jembatan Merah, Surabaya',
    year: '2024',
    description: 'Ritme senja perkotaan ketika para pejuang nafkah menyusuri trotoar tua saat lampu kota mulai menyala.',
    featured: false,
    glowColor: '#f97316' // sunset orange
  },
  {
    id: 'p-08',
    title: 'Keteguhan dalam Diam',
    category: 'Portrait',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
    aspectRatio: 'portrait',
    location: 'Surabaya',
    year: '2025',
    description: 'Eksplorasi potret wajah dengan pencahayaan chiaroscuro lembut yang membiarkan separuh bayang berbicara.',
    featured: true,
    glowColor: '#a855f7' // royal shadow purple
  },
  {
    id: 'p-09',
    title: 'Hening di Tepi Waduk',
    category: 'Lanskap',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85',
    aspectRatio: 'landscape',
    location: 'Mojokerto, Jawa Timur',
    year: '2024',
    description: 'Gradasi cermin air yang tak bergerak di bawah langit fajar yang lembut membiru.',
    featured: false,
    glowColor: '#10b981' // emerald water
  },
  {
    id: 'p-10',
    title: 'Tawa di Bawah Tirai Renda',
    category: 'Pernikahan',
    imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85',
    aspectRatio: 'portrait',
    location: 'Surabaya',
    year: '2024',
    description: 'Tawa lepas mempelai wanita saat bersiap-siap, ditangkap dari celah pintu tanpa rekayasa pose.',
    featured: false,
    glowColor: '#ec4899' // warm magenta
  },
  {
    id: 'p-11',
    title: 'Bentuk & Proporsi Arsitektural',
    category: 'Komersial',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85',
    aspectRatio: 'portrait',
    location: 'Surabaya Pusat',
    year: '2025',
    description: 'Studi garis simetris fasad bangunan perkantoran modern dalam pancaran sinar matahari siang yang tegas.',
    featured: false,
    glowColor: '#38bdf8' // sky azure
  },
  {
    id: 'p-12',
    title: 'Gerimis Sore di Halte Trem',
    category: 'Dokumenter',
    imageUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=85',
    aspectRatio: 'square',
    location: 'Surabaya',
    year: '2024',
    description: 'Bias lampu kendaraan di atas aspal basah, membingkai kesendirian di tengah riuh kota pahlawan.',
    featured: false,
    glowColor: '#eab308' // amber street lamp
  }
];

export const PHOTO_STORIES: PhotoStory[] = [
  {
    id: 'story-01',
    title: 'Napas di Pesisir Kenjeran',
    subtitle: 'Merekam denyut para penjaga tradisi pesisir di antara pasang surut Selat Madura',
    category: 'Kisah Dokumenter',
    coverImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=85',
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1000&q=80'
    ],
    location: 'Kenjeran, Surabaya',
    year: '2024 — 2025',
    narrative: 'Di sudut timur Surabaya, kehidupan berputar pada jam yang berbeda. Ketika kota masih terlelap, perahu-perahu kayu kecil telah membelah kabut laut mencari rezeki. Esai foto ini adalah tribut kepada keteguhan tangan-tangan kasar yang tak pernah mengeluh kepada ombak.',
    quote: "Laut tidak pernah berjanji pada siapa pun, namun mereka selalu datang setiap fajar dengan rasa hormat yang sama."
  },
  {
    id: 'story-02',
    title: 'Jejak Arsitektur Kota Lama',
    subtitle: 'Menatap kembali memori dinding tua dan jendela kolonial yang menjadi saksi bisu waktu',
    category: 'Eksplorasi Visual',
    coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85',
    images: [
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80'
    ],
    location: 'Kawasan Kota Lama Surabaya',
    year: '2025',
    narrative: 'Bangunan tua menyimpan resonansi suara orang-orang yang pernah melangkah di lorongnya. Melalui permainan bayang-bayang dramatis dan sudut pandang rendah, seri foto ini menghidupkan kembali elegansi masa lampau di tengah kepungan era serba cepat.',
    quote: "Dinding tua bukan sekadar batu bata lapuk, ia adalah kanvas waktu yang melukiskan ketabahan."
  }
];

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: 'svc-01',
    title: 'Kampanye Komersial & Brand',
    category: 'Commercial & Editorial',
    tagline: 'Membangun identitas visual yang bernilai tinggi dan berkesan bagi brand Anda.',
    features: [
      'Konsultasi konsep visual & moodboard mendalam',
      'Sesi pemotretan studio atau on-location',
      'Pengarahan gaya, pencahayaan, dan komposisi artistik',
      'Color grading presisi berstandar publikasi komersial',
      'Lisensi penggunaan hak cipta komersial penuh'
    ],
    idealFor: 'Brand produk, agensi kreatif, korporat, lookbook fashion, dan bisnis kuliner.',
    note: 'Cakupan sesi dan jumlah output disesuaikan dengan skala kampanye visual Anda.'
  },
  {
    id: 'svc-02',
    title: 'Potret Personal & Artistik',
    category: 'Personal & Editorial Portrait',
    tagline: 'Menangkap esensi autentik dan kepribadian jujur dalam satu bingkai abadi.',
    features: [
      'Sesi potret intim & santai tanpa beban pose kaku',
      'Panduan pemilihan busana & lokasi pemotretan',
      'Sentuhan editing natural yang menjaga tekstur asli kulit',
      'Pilihan galeri digital resolusi tinggi & format web',
      'Dukungan arahan emosi dan ekspresi alami'
    ],
    idealFor: 'Personal branding, seniman, kreator, wisuda, profesional, dan koleksi pribadi.',
    note: 'Dirancang untuk Anda yang menghargai potret diri yang berjiwa dan berbicara.'
  },
  {
    id: 'svc-03',
    title: 'Dokumentasi Intim & Pernikahan',
    category: 'Wedding & Intimate Story',
    tagline: 'Mengabadikan getar cinta dan kehangatan keluarga tanpa interupsi rekayasa.',
    features: [
      'Pendekatan fotojurnalistik dokumenter yang jujur',
      'Cakupan momen persiapan, akad/pemberkatan, hingga resepsi',
      'Dokumentasi emosi spontan para tamu dan keluarga',
      'Seluruh foto terkurasi dalam color palette hangat & sinematik',
      'Highlight visual cerita foto siap bagikan'
    ],
    idealFor: 'Pasangan pengantin, prewedding bersahaja, lamaran, dan perayaan keluarga intim.',
    note: 'Fokus kami adalah menangkap apa yang dirasakan, bukan sekadar apa yang dilihat.'
  }
];
