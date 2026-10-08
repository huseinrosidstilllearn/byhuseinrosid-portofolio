import type { CVExperience, CVEducation, CVPastClient } from '../types/portfolio';

export interface CVData {
  fullName: string;
  professionalTitle: string;
  location: string;
  email: string;
  whatsapp: string;
  whatsappDisplay: string;
  instagram: string;
  website: string;
  summary: string;
  experiences: CVExperience[];
  education: CVEducation[];
  photoSkills: string[];
  videoSkills: string[];
  softwareSkills: string[];
  equipmentList: {
    category: string;
    items: string[];
  }[];
  clients: CVPastClient[];
}

export const CV_DATA: CVData = {
  fullName: 'Husein Rosid',
  professionalTitle: 'Fotografer & Videografer Profesional',
  location: 'Surabaya, Jawa Timur, Indonesia',
  email: 'byhuseinrosid@gmail.com',
  whatsapp: '6288992806757',
  whatsappDisplay: '+62 889-9280-6757',
  instagram: '@huseinrosid',
  website: 'https://byhuseinrosid.my.id',
  summary:
    'Praktisi visual berbasis di Surabaya dengan pengalaman lebih dari 7 tahun dalam produksi fotografi profesional dan sinematografi video. Memiliki keahlian ganda dalam menangkap keaslian emosi manusia melalui foto dan merangkai alur cerita sinematik melalui video bergerak. Berpengalaman menangani 120+ proyek lintas genre meliputi kampanye komersial brand, dokumenter naratif, liputan acara korporat, dokumentasi wisuda, hingga pernikahan fotojurnalistik.',
  experiences: [
    {
      role: 'Lead Visual Storyteller & Founder',
      entity: 'By Husein Rosid Studio',
      period: '2021 : Sekarang',
      type: 'hybrid',
      description:
        'Memimpin studio independen dalam memproduksi penugasan fotografi dan videografi profesional untuk klien individu, korporasi, dan brand kreatif di seluruh Indonesia.',
      highlights: [
        'Memproduksi 70+ proyek foto dan video komersial, pernikahan, wisuda, dan dokumentasi korporat.',
        'Mengembangkan alur kerja pascaproduksi berstandar tinggi: color grading video 10-bit dan kurasi foto editorial.',
        'Memimpin directing lapangan, penataan pencahayaan multi-titik, dan manajemen audio nirkabel berkejernihan tinggi.',
        'Membangun arsip digital dan relasi klien jangka panjang dengan kepuasan hasil akhir yang konsisten.',
      ],
    },
    {
      role: 'Freelance Photographer & Cinematographer',
      entity: 'Penugasan Independen & Kolaborasi Kreatif',
      period: '2018 : 2021',
      type: 'hybrid',
      description:
        'Menangani penugasan visual mandiri dan berkolaborasi dengan art director serta tim kreatif untuk kebutuhan periklanan digital, kuliner, dan dokumentasi acara.',
      highlights: [
        'Mengerjakan dokumentasi video recap dan foto liputan untuk konser, pameran seni, dan acara kampus.',
        'Memotret kampanye visual produk UMKM dan brand lokal Surabaya untuk kebutuhan media sosial dan katalog.',
        'Mengasah teknik pencahayaan studio (strobe) dan sinematografi kamera genggam (handheld) yang dinamis.',
      ],
    },
    {
      role: 'Documentary Contributor & Street Visualist',
      entity: 'Komunitas Visual Jawa Timur',
      period: '2017 : 2018',
      type: 'fotografi',
      description:
        'Mengawali perjalanan visual melalui eksplorasi fotografi jalanan dan proyek dokumenter sosial independen di pesisir dan sudut bersejarah Surabaya.',
      highlights: [
        'Menciptakan seri foto dokumenter pesisir Kenjeran selama 3 bulan penelitian visual mandiri.',
        'Menjadi kontributor foto arsip bangunan kolonial untuk publikasi sejarah cagar budaya lokal.',
        'Menanamkan filosofi visual inti: mendengarkan esensi subjek sebelum menekan tombol rana.',
      ],
    },
  ],
  education: [
    {
      institution: 'Pendidikan Tinggi Terakreditasi',
      degree: 'Sarjana / Studi Visual & Komunikasi',
      year: 'Lulusan Terpilih',
      description: 'Fokus pada komunikasi visual, psikologi persepsi citra, dan manajemen produksi media digital.',
    },
    {
      institution: 'Masterclass Fotografi & Color Grading',
      degree: 'Sertifikasi / Pelatihan Profesional',
      year: 'Berkelanjutan',
      description: 'Pendalaman alur kerja DaVinci Resolve Color Science, lighting studio komersial, dan penulisan naskah dokumenter.',
    },
  ],
  photoSkills: [
    'Komposisi Visual & Framing Editorial',
    'Pencahayaan Studio & Alami (Natural Lighting)',
    'Pengarahan Pose & Interaksi Emosional Subjek',
    'Fotojurnalistik Dokumenter & Human Interest',
    'Dokumentasi Acara Cepat (Fast-Paced Event)',
    'Fotografi Produk & Detail Komersial',
  ],
  videoSkills: [
    'Sinematografi & Pergerakan Kamera Dinamis',
    'Storyboarding & Penyusunan Shot List Terarah',
    'Perekaman Audio Lapangan (Lavalier & Shotgun)',
    'Pencahayaan Video Sinematik (3-Point Lighting)',
    'Penyutradaraan Video Highlight & Teaser',
    'Drone Aerial Filming & Sudut Pandang Lanskap',
  ],
  softwareSkills: [
    'Adobe Lightroom Classic (Katalog & Presets)',
    'Adobe Photoshop (Retouching & Compositing)',
    'DaVinci Resolve (Color Science & Grading)',
    'Adobe Premiere Pro (Editing & Sound Design)',
  ],
  equipmentList: [
    {
      category: 'Sistem Kamera & Sensor',
      items: [
        'Bodi Kamera Full-Frame Resolusi Tinggi (Dual Slot SD)',
        'Kemampuan Rekam 4K 10-bit Log Profile untuk Dinamika Warna Maksimal',
      ],
    },
    {
      category: 'Optik & Lensa Pilihan',
      items: [
        'Lensa Prime 35mm f/1.4 : Sudut Alami & Sinematik Dokumenter',
        'Lensa Prime 50mm f/1.8 : Isolasi Subjek & Bokeh Halus',
        'Lensa Zoom 24-70mm f/2.8 : Fleksibilitas Liputan Cepat',
        'Lensa Telephoto 70-200mm : Detail Jarak Jauh & Kompresi Latar',
      ],
    },
    {
      category: 'Pencahayaan & Stabilisasi',
      items: [
        'Lampu Studio Flash (Strobe) dengan Sistem Trigger Nirkabel',
        'Continuous Bi-Color LED Video Light + Softbox Dome',
        'Gimbal Stabilizer Motorized 3-Axis untuk Pergerakan Kamera Mulus',
      ],
    },
    {
      category: 'Audio & Rekaman Suara',
      items: [
        'Sistem Mikrofon Nirkabel Dual Transmitter (Klip Kerah)',
        'Mikrofon Shotgun Direksional dengan Pelindung Angin Lapangan',
      ],
    },
  ],
  clients: [
    { name: 'Klien Dokumentasi Wisuda & Komunitas', category: 'Pendidikan & Personal' },
    { name: 'Pasangan Pengantin Fotojurnalistik', category: 'Pernikahan & Pre-Wedding' },
    { name: 'Brand F&B dan Kopi Lokal Surabaya', category: 'Komersial & Brand Campaign' },
    { name: 'Penyelenggara Event Musik & Korporat', category: 'Event & Festival' },
    { name: 'Produksi Media Independen', category: 'Behind The Scene & Dokumenter' },
  ],
};
