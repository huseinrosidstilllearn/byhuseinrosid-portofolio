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
