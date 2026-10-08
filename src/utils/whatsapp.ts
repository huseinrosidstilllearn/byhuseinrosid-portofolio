import { CONTACT_CONFIG } from '../data/portfolioData';

/**
 * Menghasilkan tautan resmi WhatsApp dengan sanitasi URI aman
 * @param serviceTitle Judul paket layanan yang diminati (opsional)
 * @param customMessage Pesan kustom tambahan (opsional)
 */
export function createWhatsAppLink(serviceTitle?: string, customMessage?: string): string {
  const number = CONTACT_CONFIG.whatsappNumber;
  
  let text = `Halo Husein Rosid, saya melihat portofolio Anda di website dan ingin berdiskusi mengenai proyek fotografi.`;
  
  if (serviceTitle) {
    text += `\n\nSaya tertarik dengan paket: *${serviceTitle}*.`;
  }
  
  if (customMessage && customMessage.trim().length > 0) {
    text += `\n\nCatatan: ${customMessage.trim()}`;
  }
  
  text += `\n\nBisa tolong infokan ketersediaan jadwal dan penawaran detailnya? Terima kasih!`;
  
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

/**
 * Menghasilkan tautan WhatsApp spesifik untuk menanyakan ketersediaan sesi berdasarkan foto tertentu
 * @param photoTitle Judul foto yang dilihat di lightbox
 * @param category Kategori foto
 */
export function createPhotoInquiryLink(photoTitle: string, category: string): string {
  const number = CONTACT_CONFIG.whatsappNumber;
  const text = `Halo Husein Rosid, saya melihat portofolio Anda di website dan tertarik dengan gaya foto *"${photoTitle}"* (Kategori: ${category}).\n\nBisa tolong infokan ketersediaan jadwal serta penawaran paket untuk sesi serupa? Terima kasih!`;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export interface ProjectInquiryData {
  category: string;
  serviceType: string;
  location: string;
  scheduleOption?: string;
  customDate?: string;
  notes?: string;
}

/**
 * Menghasilkan tautan WhatsApp terstruktur dari lembar estimator interaktif
 */
export function createDetailedInquiryLink(data: ProjectInquiryData): string {
  const number = CONTACT_CONFIG.whatsappNumber;
  let text = `Halo Husein Rosid, saya ingin konsultasi rencana proyek visual dari website:`;
  text += `\n\n• Kategori Proyek: *${data.category}*`;
  text += `\n• Format Layanan: *${data.serviceType}*`;
  text += `\n• Cakupan Lokasi: *${data.location}*`;
  if (data.scheduleOption === 'fixed' && data.customDate) {
    text += `\n• Estimasi Tanggal: *${data.customDate}*`;
  } else if (data.scheduleOption) {
    text += `\n• Estimasi Tanggal: *${data.scheduleOption}*`;
  }
  if (data.notes && data.notes.trim().length > 0) {
    text += `\n• Rincian Catatan: ${data.notes.trim()}`;
  }
  text += `\n\nBisa tolong infokan ketersediaan jadwal dan estimasi penawarannya? Terima kasih!`;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
