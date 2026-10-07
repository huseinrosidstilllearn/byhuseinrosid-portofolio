import type { ContactConfig, PhotographerProfile, PhotoItem, ServicePackage } from '../types/portfolio';

export const PHOTOGRAPHER_PROFILE: PhotographerProfile = {
  name: "Husein Rosid",
  brandName: "The Journey of Husein Rosid",
  headline: "Stories Told in the Quiet Spaces Between Moments",
  subheadline: "Kumpulan rekaman visual, emosi jujur, dan keabadian cahaya yang tertangkap di antara detak waktu.",
  bioShort: "Fotografer berbasis di Surabaya yang mendedikasikan lensa untuk menangkap keheningan, keaslian manusia, dan emosi yang tak terucap.",
  bioFull: [
    "Bagi saya, fotografi bukanlah sekadar menekan tombol rana pada saat yang tepat, melainkan seni mendengarkan sebelum melihat. Di balik setiap bingkai visual terdapat jeda waktu yang sarat makna, sebuah momen hening di mana manusia dan semesta saling bercerita tanpa kepura-puraan.",
    "Berakar di Surabaya, Jawa Timur, perjalanan visual saya bergerak melintasi spektrum luas: dari intensitas kampanye komersial, keintiman potret personal, hingga kejujuran dokumenter jalanan dan lanskap nusantara.",
    "Saya percaya bahwa karya visual terbaik lahir ketika kita menghormati subjek dan membiarkan cahaya alami menenun narasi autentik yang abadi melewati zaman."
  ],
  philosophy: "Setiap frame adalah penghormatan terhadap emosi yang jujur dan cahaya yang fana.",
  location: "Surabaya, Jawa Timur, Indonesia",
  availability: "Menerima penugasan di Surabaya & siap bepergian ke seluruh Indonesia.",
  experienceYears: "6 Tahun Pengalaman Visual",
  avatarUrl: "https://photos.byhuseinrosid.my.id/photos/1791304082503-1AN02313-2.webp"
};

export const CONTACT_CONFIG: ContactConfig = {
  whatsappNumber: "6288992806757",
  whatsappDisplay: "+62 889-9280-6757",
  instagram: "@huseinrosid",
  instagramUrl: "https://instagram.com/huseinrosid",
  email: "byhuseinrosid@gmail.com",
  locationDisplay: "Surabaya, Jawa Timur, Indonesia"
};

export const PHOTO_CATEGORIES = [
  'Semua',
  'Event Documentation',
  'Graduation',
  'Couple Session',
  'Behind The Scene Production',
  'Street Photography',
  'Commercial & Brand Campaign',
  'Solo Potrait',
] as const;

export const PORTFOLIO_PHOTOS: PhotoItem[] = [
  {
    "id": "ecf472bb-d919-4b81-8a64-5e1bd08cb6a8",
    "title": "Graduation of Salma #32",
    "category": "Graduation",
    "imageUrl": "https://photos.byhuseinrosid.my.id/photos/1791378464560-DSC00164.webp",
    "aspectRatio": "portrait",
    "location": "UIN Sunan Ampel Surabaya",
    "year": "2025",
    "description": "Graduation of Salma #32",
    "featured": true,
    "glowColor": "rgba(245, 158, 11, 0.4)"
  },
  {
    "id": "b89d4c73-99d8-4986-ac34-1598eb51b48a",
    "title": "Graduation of Salma #28",
    "category": "Graduation",
    "imageUrl": "https://photos.byhuseinrosid.my.id/photos/1791378459217-DSC00143.webp",
    "aspectRatio": "portrait",
    "location": "UIN Sunan Ampel Surabaya",
    "year": "2025",
    "description": "Graduation of Salma #28",
    "featured": true,
    "glowColor": "rgba(245, 158, 11, 0.4)"
  },
  {
    "id": "6c72d661-2910-420a-a7a7-06b1b88f40f5",
    "title": "Graduation of Salma #23",
    "category": "Graduation",
    "imageUrl": "https://photos.byhuseinrosid.my.id/photos/1791378452624-DSC00132.webp",
    "aspectRatio": "landscape",
    "location": "UIN Sunan Ampel Surabaya",
    "year": "2025",
    "description": "Graduation of Salma #23",
    "featured": true,
    "glowColor": "rgba(245, 158, 11, 0.4)"
  },
  {
    "id": "0f939f5c-7e28-4415-a8b9-1dbcb6cd37cc",
    "title": "Graduation of Salma #12",
    "category": "Graduation",
    "imageUrl": "https://photos.byhuseinrosid.my.id/photos/1791378437126-DSC00068.webp",
    "aspectRatio": "portrait",
    "location": "UIN Sunan Ampel Surabaya",
    "year": "2025",
    "description": "Graduation of Salma #12",
    "featured": true,
    "glowColor": "rgba(245, 158, 11, 0.4)"
  },
  {
    "id": "76651439-75b2-4459-9e0e-820153e75121",
    "title": "Graduation of Salma #11",
    "category": "Graduation",
    "imageUrl": "https://photos.byhuseinrosid.my.id/photos/1791378435875-DSC00066.webp",
    "aspectRatio": "portrait",
    "location": "UIN Sunan Ampel Surabaya",
    "year": "2025",
    "description": "Graduation of Salma #11",
    "featured": true,
    "glowColor": "rgba(245, 158, 11, 0.4)"
  },
  {
    "id": "389ecd70-5d41-4322-bafc-6e784a4cefac",
    "title": "Graduation of Salma #9",
    "category": "Graduation",
    "imageUrl": "https://photos.byhuseinrosid.my.id/photos/1791378432781-DSC00062.webp",
    "aspectRatio": "landscape",
    "location": "UIN Sunan Ampel Surabaya",
    "year": "2025",
    "description": "Graduation of Salma #9",
    "featured": true,
    "glowColor": "rgba(245, 158, 11, 0.4)"
  },
  {
    "id": "5dde58be-ed20-42ba-8ee8-25a8ac6a8070",
    "title": "Graduation of Salma #6",
    "category": "Graduation",
    "imageUrl": "https://photos.byhuseinrosid.my.id/photos/1791378428129-DSC00047.webp",
    "aspectRatio": "landscape",
    "location": "UIN Sunan Ampel Surabaya",
    "year": "2025",
    "description": "Graduation of Salma #6",
    "featured": true,
    "glowColor": "rgba(245, 158, 11, 0.4)"
  },
  {
    "id": "2a147dbc-fd63-4845-a013-ac6b9f80838d",
    "title": "RIKO The Series - Pesantren Kilat 2025 #137",
    "category": "Event Documentation",
    "imageUrl": "https://photos.byhuseinrosid.my.id/photos/1791358408677-DSC04359-Enhanced-NR.webp",
    "aspectRatio": "landscape",
    "location": "Masjid Al-Akbar Surabaya",
    "year": "2025",
    "description": "RIKO The Series - Pesantren Kilat 2025 #137",
    "featured": true,
    "glowColor": "rgba(245, 158, 11, 0.4)"
  },
  {
    "id": "eb788e8f-519e-4607-8d7e-55c12ddf41ed",
    "title": "RIKO The Series - Pesantren Kilat 2025 #124",
    "category": "Event Documentation",
    "imageUrl": "https://photos.byhuseinrosid.my.id/photos/1791358393820-DSC04325-Enhanced-NR.webp",
    "aspectRatio": "landscape",
    "location": "Masjid Al-Akbar Surabaya",
    "year": "2025",
    "description": "RIKO The Series - Pesantren Kilat 2025 #124",
    "featured": true,
    "glowColor": "rgba(245, 158, 11, 0.4)"
  },
  {
    "id": "5a7188bf-d17c-42f1-aba6-a96f52c67dca",
    "title": "RIKO The Series - Pesantren Kilat 2025 #113",
    "category": "Event Documentation",
    "imageUrl": "https://photos.byhuseinrosid.my.id/photos/1791358381551-DSC04291-Enhanced-NR.webp",
    "aspectRatio": "landscape",
    "location": "Masjid Al-Akbar Surabaya",
    "year": "2025",
    "description": "RIKO The Series - Pesantren Kilat 2025 #113",
    "featured": true,
    "glowColor": "rgba(245, 158, 11, 0.4)"
  },
  {
    "id": "4e74ee9f-715f-41de-b7e9-deaf2679c805",
    "title": "RIKO The Series - Pesantren Kilat 2025 #56",
    "category": "Event Documentation",
    "imageUrl": "https://photos.byhuseinrosid.my.id/photos/1791358316964-DSC04076-Enhanced-NR.webp",
    "aspectRatio": "landscape",
    "location": "Masjid Al-Akbar Surabaya",
    "year": "2025",
    "description": "RIKO The Series - Pesantren Kilat 2025 #56",
    "featured": true,
    "glowColor": "rgba(245, 158, 11, 0.4)"
  },
  {
    "id": "6bac4891-3341-42be-aa46-e6722e6f5904",
    "title": "RIKO The Series - Pesantren Kilat 2025 #48",
    "category": "Event Documentation",
    "imageUrl": "https://photos.byhuseinrosid.my.id/photos/1791358307892-DSC04050-Enhanced-NR.webp",
    "aspectRatio": "landscape",
    "location": "Masjid Al-Akbar Surabaya",
    "year": "2025",
    "description": "RIKO The Series - Pesantren Kilat 2025 #48",
    "featured": true,
    "glowColor": "rgba(245, 158, 11, 0.4)"
  },
  {
    "id": "afaf376f-e2c4-447e-a5f8-8dda662eccae",
    "title": "RIKO The Series - Pesantren Kilat 2025 #42",
    "category": "Event Documentation",
    "imageUrl": "https://photos.byhuseinrosid.my.id/photos/1791358301324-DSC04036-Enhanced-NR.webp",
    "aspectRatio": "landscape",
    "location": "Masjid Al-Akbar Surabaya",
    "year": "2025",
    "description": "RIKO The Series - Pesantren Kilat 2025 #42",
    "featured": true,
    "glowColor": "rgba(245, 158, 11, 0.4)"
  },
  {
    "id": "73392518-a287-44d0-9ac3-2de6fd166e9b",
    "title": "Couple of Kiky& Bagus #19",
    "category": "Couple Session",
    "imageUrl": "https://photos.byhuseinrosid.my.id/photos/1791308694950-DSC04880.webp",
    "aspectRatio": "landscape",
    "location": "Ranu Gumbolo Tulungagung",
    "year": "2022",
    "description": "Couple of Kiky& Bagus #19",
    "featured": true,
    "glowColor": "rgba(245, 158, 11, 0.4)"
  },
  {
    "id": "dab1ceb6-e8dd-4686-8eb4-160421fb3c97",
    "title": "Couple of Kiky& Bagus #15",
    "category": "Couple Session",
    "imageUrl": "https://photos.byhuseinrosid.my.id/photos/1791308688815-DSC04870.webp",
    "aspectRatio": "landscape",
    "location": "Ranu Gumbolo Tulungagung",
    "year": "2022",
    "description": "Couple of Kiky& Bagus #15",
    "featured": true,
    "glowColor": "rgba(245, 158, 11, 0.4)"
  },
  {
    "id": "64f88f33-18d5-4ec5-abeb-eb1848f33991",
    "title": "Couple of Kiky& Bagus #11",
    "category": "Couple Session",
    "imageUrl": "https://photos.byhuseinrosid.my.id/photos/1791308682689-DSC04852.webp",
    "aspectRatio": "landscape",
    "location": "Ranu Gumbolo Tulungagung",
    "year": "2022",
    "description": "Couple of Kiky& Bagus #11",
    "featured": true,
    "glowColor": "rgba(245, 158, 11, 0.4)"
  },
  {
    "id": "d760231b-b07a-41ba-a773-9fdbdb0adf14",
    "title": "Couple of Kiky& Bagus #1",
    "category": "Couple Session",
    "imageUrl": "https://photos.byhuseinrosid.my.id/photos/1791308664197-DSC04720.webp",
    "aspectRatio": "landscape",
    "location": "Ranu Gumbolo Tulungagung",
    "year": "2022",
    "description": "Couple of Kiky& Bagus #1",
    "featured": true,
    "glowColor": "rgba(245, 158, 11, 0.4)"
  },
  {
    "id": "b9dcf62a-1721-4f4a-a764-ddea3bb83630",
    "title": "Couple of Claudia & Elbert #21",
    "category": "Couple Session",
    "imageUrl": "https://photos.byhuseinrosid.my.id/photos/1791308408668-DSC02823.webp",
    "aspectRatio": "landscape",
    "location": "Plaza Kamera Surabaya",
    "year": "2023",
    "description": "Couple of Claudia & Elbert #21",
    "featured": true,
    "glowColor": "rgba(245, 158, 11, 0.4)"
  },
  {
    "id": "01d9f494-0b0f-4018-8e0e-b1d14507a489",
    "title": "Couple of Claudia & Elbert #18",
    "category": "Couple Session",
    "imageUrl": "https://photos.byhuseinrosid.my.id/photos/1791308405340-DSC02806.webp",
    "aspectRatio": "portrait",
    "location": "Plaza Kamera Surabaya",
    "year": "2023",
    "description": "Couple of Claudia & Elbert #18",
    "featured": true,
    "glowColor": "rgba(245, 158, 11, 0.4)"
  },
  {
    "id": "34bad71c-dc63-4870-bfe8-84120e64c815",
    "title": "Couple of Claudia & Elbert #14",
    "category": "Couple Session",
    "imageUrl": "https://photos.byhuseinrosid.my.id/photos/1791308401148-DSC02788.webp",
    "aspectRatio": "landscape",
    "location": "Plaza Kamera Surabaya",
    "year": "2023",
    "description": "Couple of Claudia & Elbert #14",
    "featured": true,
    "glowColor": "rgba(245, 158, 11, 0.4)"
  },
  {
    "id": "28c20215-1a9e-47fa-aed4-249a5840c12f",
    "title": "Couple of Claudia & Elbert #8",
    "category": "Couple Session",
    "imageUrl": "https://photos.byhuseinrosid.my.id/photos/1791308394311-DSC09975.webp",
    "aspectRatio": "portrait",
    "location": "Plaza Kamera Surabaya",
    "year": "2023",
    "description": "Couple of Claudia & Elbert #8",
    "featured": true,
    "glowColor": "rgba(245, 158, 11, 0.4)"
  },
  {
    "id": "574c5fb9-0b55-42ba-8987-a9c2e0effebb",
    "title": "Couple of Claudia & Elbert #2",
    "category": "Couple Session",
    "imageUrl": "https://photos.byhuseinrosid.my.id/photos/1791308387587-DSC02836.webp",
    "aspectRatio": "landscape",
    "location": "Plaza Kamera Surabaya",
    "year": "2023",
    "description": "Couple of Claudia & Elbert #2",
    "featured": true,
    "glowColor": "rgba(245, 158, 11, 0.4)"
  },
  {
    "id": "ede79805-7dc6-4107-8bc6-2727a3ae78b1",
    "title": "BTS Dr. ISKAK Tulungagung #65",
    "category": "Behind The Scene Production",
    "imageUrl": "https://photos.byhuseinrosid.my.id/photos/1791307013718-DSC06370.webp",
    "aspectRatio": "landscape",
    "location": "Tulungagung, Jawa Timur",
    "year": "2021",
    "description": "BTS Dr. ISKAK Tulungagung #65",
    "featured": true,
    "glowColor": "rgba(245, 158, 11, 0.4)"
  },
  {
    "id": "5ae8f530-3d0a-4201-b9e3-c15de89878f0",
    "title": "BTS Dr. ISKAK Tulungagung #60",
    "category": "Behind The Scene Production",
    "imageUrl": "https://photos.byhuseinrosid.my.id/photos/1791307008017-DSC06331.webp",
    "aspectRatio": "landscape",
    "location": "Tulungagung, Jawa Timur",
    "year": "2021",
    "description": "BTS Dr. ISKAK Tulungagung #60",
    "featured": true,
    "glowColor": "rgba(245, 158, 11, 0.4)"
  },
  {
    "id": "05d090f4-acdb-4ac6-8733-995f3cf8920f",
    "title": "BTS Dr. ISKAK Tulungagung #53",
    "category": "Behind The Scene Production",
    "imageUrl": "https://photos.byhuseinrosid.my.id/photos/1791306999207-DSC06246.webp",
    "aspectRatio": "landscape",
    "location": "Tulungagung, Jawa Timur",
    "year": "2021",
    "description": "BTS Dr. ISKAK Tulungagung #53",
    "featured": true,
    "glowColor": "rgba(245, 158, 11, 0.4)"
  },
  {
    "id": "6d7c2b25-3f76-4881-8999-009902593ee8",
    "title": "BTS Dr. ISKAK Tulungagung #49",
    "category": "Behind The Scene Production",
    "imageUrl": "https://photos.byhuseinrosid.my.id/photos/1791306994205-DSC06190.webp",
    "aspectRatio": "landscape",
    "location": "Tulungagung, Jawa Timur",
    "year": "2021",
    "description": "BTS Dr. ISKAK Tulungagung #49",
    "featured": true,
    "glowColor": "rgba(245, 158, 11, 0.4)"
  },
  {
    "id": "d70d1fe1-e0bf-4ee3-9a7d-f6f410b4bb00",
    "title": "BTS Dr. ISKAK Tulungagung #47",
    "category": "Behind The Scene Production",
    "imageUrl": "https://photos.byhuseinrosid.my.id/photos/1791306992016-DSC06176.webp",
    "aspectRatio": "landscape",
    "location": "Tulungagung, Jawa Timur",
    "year": "2021",
    "description": "BTS Dr. ISKAK Tulungagung #47",
    "featured": true,
    "glowColor": "rgba(245, 158, 11, 0.4)"
  },
  {
    "id": "f59152f9-d488-44c3-b37a-51b6164f4758",
    "title": "BTS Dr. ISKAK Tulungagung #46",
    "category": "Behind The Scene Production",
    "imageUrl": "https://photos.byhuseinrosid.my.id/photos/1791306990179-DSC06154.webp",
    "aspectRatio": "landscape",
    "location": "Tulungagung, Jawa Timur",
    "year": "2021",
    "description": "BTS Dr. ISKAK Tulungagung #46",
    "featured": true,
    "glowColor": "rgba(245, 158, 11, 0.4)"
  },
  {
    "id": "9e49bae9-5d69-45cf-861a-76608327b03c",
    "title": "BTS Dr. ISKAK Tulungagung #44",
    "category": "Behind The Scene Production",
    "imageUrl": "https://photos.byhuseinrosid.my.id/photos/1791306987826-DSC06146.webp",
    "aspectRatio": "landscape",
    "location": "Tulungagung, Jawa Timur",
    "year": "2021",
    "description": "BTS Dr. ISKAK Tulungagung #44",
    "featured": true,
    "glowColor": "rgba(245, 158, 11, 0.4)"
  },
  {
    "id": "1d80a3d0-d462-47a2-9920-583b1098ea75",
    "title": "BTS Dr. ISKAK Tulungagung #39",
    "category": "Behind The Scene Production",
    "imageUrl": "https://photos.byhuseinrosid.my.id/photos/1791306982285-DSC06130.webp",
    "aspectRatio": "landscape",
    "location": "Tulungagung, Jawa Timur",
    "year": "2021",
    "description": "BTS Dr. ISKAK Tulungagung #39",
    "featured": true,
    "glowColor": "rgba(245, 158, 11, 0.4)"
  },
  {
    "id": "00349c10-3d01-4eba-9b4c-5294178abfe0",
    "title": "BTS Dr. ISKAK Tulungagung #36",
    "category": "Behind The Scene Production",
    "imageUrl": "https://photos.byhuseinrosid.my.id/photos/1791306978619-DSC06114.webp",
    "aspectRatio": "landscape",
    "location": "Tulungagung, Jawa Timur",
    "year": "2021",
    "description": "BTS Dr. ISKAK Tulungagung #36",
    "featured": true,
    "glowColor": "rgba(245, 158, 11, 0.4)"
  },
  {
    "id": "2fb107c3-9527-448d-b52e-b12990681c38",
    "title": "BTS Dr. ISKAK Tulungagung #33",
    "category": "Behind The Scene Production",
    "imageUrl": "https://photos.byhuseinrosid.my.id/photos/1791306974879-DSC06084.webp",
    "aspectRatio": "landscape",
    "location": "Tulungagung, Jawa Timur",
    "year": "2021",
    "description": "BTS Dr. ISKAK Tulungagung #33",
    "featured": true,
    "glowColor": "rgba(245, 158, 11, 0.4)"
  },
  {
    "id": "9ae6d1d4-329e-4876-b113-9f001a021f86",
    "title": "BTS Dr. ISKAK Tulungagung #32",
    "category": "Behind The Scene Production",
    "imageUrl": "https://photos.byhuseinrosid.my.id/photos/1791306973743-DSC06066.webp",
    "aspectRatio": "landscape",
    "location": "Tulungagung, Jawa Timur",
    "year": "2021",
    "description": "BTS Dr. ISKAK Tulungagung #32",
    "featured": true,
    "glowColor": "rgba(245, 158, 11, 0.4)"
  },
  {
    "id": "a9d04b6d-4f19-4fae-9ca0-5b14bbe29373",
    "title": "BTS Dr. ISKAK Tulungagung #29",
    "category": "Behind The Scene Production",
    "imageUrl": "https://photos.byhuseinrosid.my.id/photos/1791306970410-DSC06011.webp",
    "aspectRatio": "landscape",
    "location": "Tulungagung, Jawa Timur",
    "year": "2021",
    "description": "BTS Dr. ISKAK Tulungagung #29",
    "featured": true,
    "glowColor": "rgba(245, 158, 11, 0.4)"
  },
  {
    "id": "1c38e547-134a-4001-950b-85b9d5375b10",
    "title": "BTS Dr. ISKAK Tulungagung #27",
    "category": "Behind The Scene Production",
    "imageUrl": "https://photos.byhuseinrosid.my.id/photos/1791306968276-DSC06003.webp",
    "aspectRatio": "landscape",
    "location": "Tulungagung, Jawa Timur",
    "year": "2021",
    "description": "BTS Dr. ISKAK Tulungagung #27",
    "featured": true,
    "glowColor": "rgba(245, 158, 11, 0.4)"
  },
  {
    "id": "bde25df1-f4e8-418b-a0c5-7e2c05075ce5",
    "title": "BTS Dr. ISKAK Tulungagung #25",
    "category": "Behind The Scene Production",
    "imageUrl": "https://photos.byhuseinrosid.my.id/photos/1791306966017-DSC05995.webp",
    "aspectRatio": "landscape",
    "location": "Tulungagung, Jawa Timur",
    "year": "2021",
    "description": "BTS Dr. ISKAK Tulungagung #25",
    "featured": true,
    "glowColor": "rgba(245, 158, 11, 0.4)"
  }
];

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: 'svc-01',
    title: 'Dokumentasi Acara & Event',
    category: 'Event Documentation',
    tagline: 'Merekam atmosfer, dinamika panggung, dan momen berharga perhelatan acara secara utuh.',
    features: [
      'Liputan konser musik, festival panggung, seminar & gathering korporat',
      'Dokumentasi interaksi spontan dan momen jujur tanpa interupsi',
      'Cakupan menyeluruh dari pra-acara hingga seremoni penutupan',
      'Color grading hangat, kontras seimbang & siap rilis media sosial',
      'Penyerahan arsip foto beresolusi tinggi tepat waktu'
    ],
    idealFor: 'Penyelenggara acara, korporat, komunitas, festival kampus, dan konser musik.',
    note: 'Tersedia untuk sesi half-day, full-day, maupun liputan multi-hari di berbagai kota.'
  },
  {
    id: 'svc-02',
    title: 'Wisuda & Graduation',
    category: 'Graduation',
    tagline: 'Mengabadikan kebanggaan kelulusan dan kehangatan selebrasi bersama keluarga serta sahabat.',
    features: [
      'Sesi potret personal wisudawan dengan arahan pose natural & luwes',
      'Momen hangat bersama keluarga tercinta dan lingkaran sahabat',
      'Eksplorasi spot arsitektur kampus dan pencahayaan optimal',
      'Retouching natural yang mempertahankan warna asli kulit',
      'Galeri digital siap unduh resolusi penuh & format cetak'
    ],
    idealFor: 'Wisudawan sarjana, magister, doktoral, dan keluarga wisudawan.',
    note: 'Jadwal fleksibel di area kampus Surabaya maupun lokasi outdoor pilihan.'
  },
  {
    id: 'svc-03',
    title: 'Couple Session & Prewedding',
    category: 'Couple Session',
    tagline: 'Menangkap romansa jujur, kehangatan interaksi, dan getaran rasa tanpa kepura-puraan.',
    features: [
      'Sesi intim santai berdua tanpa tekanan pose yang kaku',
      'Konsultasi mood visual, pemilihan busana & rute pemotretan',
      'Eksplorasi lokasi bernuansa alam, jalanan kota, atau indoor',
      'Tone warna sinematik hangat yang bertahan melintasi masa',
      'Kurasi highlight foto terbaik untuk undangan digital & cetak'
    ],
    idealFor: 'Pasangan prewedding, perayaan anniversary, lamaran, dan dokumentasi berdua.',
    note: 'Fokus utama adalah menangkap keintiman yang autentik dan berbicara dari hati.'
  }
];
