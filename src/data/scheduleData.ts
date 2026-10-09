import type { ProductionScheduleSlot } from '../types/portfolio';

// Helper pembuat string tanggal YYYY-MM-DD lokal
export function formatLocalDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// Menghasilkan daftar jadwal default yang dinamis mengikuti tanggal saat ini
export function generateDefaultScheduleSlots(): ProductionScheduleSlot[] {
  const today = new Date();

  const addDays = (days: number) => {
    const d = new Date(today);
    d.setDate(today.getDate() + days);
    return formatLocalDateString(d);
  };

  return [
    {
      id: 'slot-today',
      date: addDays(0),
      status: 'available',
      title: 'Slot Konsultasi & Briefing Proyek',
      category: 'Audio Visual & Foto',
      location: 'Surabaya / Online',
      timeSlot: 'Tersedia Seharian',
      notes: 'Bisa diskusi via WhatsApp atau tatap muka di Surabaya untuk penawaran sesi mendatang.',
    },
    {
      id: 'slot-tomorrow',
      date: addDays(1),
      status: 'booked',
      title: 'Produksi Wisuda & Potret Akademik',
      category: 'Graduation',
      location: 'UIN Sunan Ampel Surabaya',
      timeSlot: 'Pagi - Siang (08:00 - 13:00)',
      notes: 'Sesi wisuda outdoor & grup keluarga. Slot pagi penuh.',
    },
    {
      id: 'slot-day-after',
      date: addDays(2),
      status: 'limited',
      title: 'Slot Sore Terbuka (1 Sesi Tersedia)',
      category: 'Wisuda / Potret',
      location: 'Surabaya',
      timeSlot: 'Sore (15:00 - 17:30)',
      notes: 'Hanya tersisa 1 slot golden hour sore untuk area Surabaya.',
    },
    {
      id: 'slot-plus-4',
      date: addDays(4),
      status: 'in_production',
      title: 'Liputan Dokumentasi Acara & Video Teaser',
      category: 'Event Documentation',
      location: 'Surabaya Pusat',
      timeSlot: 'Full Day (09:00 - 18:00)',
      notes: 'Produksi video reel multi-kamera dan dokumentasi foto panggung.',
    },
    {
      id: 'slot-plus-6',
      date: addDays(6),
      status: 'booked',
      title: 'Sesi Wisuda & Dokumentasi Studio',
      category: 'Graduation',
      location: 'Surabaya',
      timeSlot: 'Pagi - Sore',
      notes: 'Jadwal wisudawan batch akhir pekan penuh.',
    },
    {
      id: 'slot-plus-9',
      date: addDays(9),
      status: 'limited',
      title: 'Sesi Couple & Pre-Wedding Sunset',
      category: 'Couple Session',
      location: 'Kenjeran / Surabaya Timur',
      timeSlot: 'Sore (15:30 - 17:45)',
      notes: 'Sesi foto pasangan outdoor golden hour.',
    },
    {
      id: 'slot-plus-12',
      date: addDays(12),
      status: 'in_production',
      title: 'BTS Produksi Film Pendek / Komersial',
      category: 'Behind The Scene Production',
      location: 'Sidoarjo / Surabaya',
      timeSlot: 'Full Day',
      notes: 'Dokumentasi still dan teaser video shooting di set produksi.',
    },
  ];
}

export const DEFAULT_SCHEDULE_SLOTS: ProductionScheduleSlot[] = generateDefaultScheduleSlots();
