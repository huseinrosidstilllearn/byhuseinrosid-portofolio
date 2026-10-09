import React, { useState, useMemo } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import type { ProductionScheduleSlot, SlotStatus } from '../../types/portfolio';
import { formatLocalDateString, DEFAULT_SCHEDULE_SLOTS } from '../../data/scheduleData';
import { createWhatsAppLink } from '../../utils/whatsapp';

interface ProductionCalendarProps {
  schedule?: ProductionScheduleSlot[];
  googleCalendarUrl?: string;
  onBookDate?: (date: string, title?: string) => void;
}

const MONTH_NAMES = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

const DAY_NAMES = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

export const ProductionCalendar: React.FC<ProductionCalendarProps> = ({
  schedule = DEFAULT_SCHEDULE_SLOTS,
  googleCalendarUrl,
}) => {
  const today = useMemo(() => new Date(), []);
  const todayStr = useMemo(() => formatLocalDateString(today), [today]);

  const [currentDate, setCurrentDate] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDateStr, setSelectedDateStr] = useState<string>(todayStr);

  const activeSlots = schedule && schedule.length > 0 ? schedule : DEFAULT_SCHEDULE_SLOTS;

  // Peta jadwal tanggal -> ProductionScheduleSlot untuk akses instan O(1)
  const slotMap = useMemo(() => {
    const map = new Map<string, ProductionScheduleSlot>();
    activeSlots.forEach((slot) => {
      map.set(slot.date, slot);
    });
    return map;
  }, [activeSlots]);

  // Kalkulasi Status Cepat Hari Ini, Besok & Lusa
  const quickDays = useMemo(() => {
    const getOffsetDate = (offset: number) => {
      const d = new Date(today);
      d.setDate(today.getDate() + offset);
      return d;
    };

    const days = [
      { label: 'Hari Ini', date: getOffsetDate(0) },
      { label: 'Besok', date: getOffsetDate(1) },
      { label: 'Lusa', date: getOffsetDate(2) },
    ];

    return days.map((item) => {
      const dateStr = formatLocalDateString(item.date);
      const slot = slotMap.get(dateStr);
      const dayName = DAY_NAMES[item.date.getDay()];
      const dayNum = item.date.getDate();
      const monthName = MONTH_NAMES[item.date.getMonth()].slice(0, 3);

      return {
        label: item.label,
        dateStr,
        formattedDate: `${dayName}, ${dayNum} ${monthName}`,
        slot: slot || {
          id: `auto-${dateStr}`,
          date: dateStr,
          status: 'available' as SlotStatus,
          title: 'Slot Terbuka untuk Penugasan',
          category: 'Foto & Video',
          timeSlot: 'Fleksibel',
          location: 'Surabaya',
        },
      };
    });
  }, [today, slotMap]);

  // Kalkulasi matriks grid kalender bulanan
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Minggu
    const totalDays = new Date(year, month + 1, 0).getDate();
    const prevMonthTotalDays = new Date(year, month, 0).getDate();

    const days: Array<{
      dateStr: string;
      dayNum: number;
      isCurrentMonth: boolean;
      isToday: boolean;
      slot?: ProductionScheduleSlot;
    }> = [];

    // Hari bulan sebelumnya (padding)
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const dayNum = prevMonthTotalDays - i;
      const prevDate = new Date(year, month - 1, dayNum);
      const dateStr = formatLocalDateString(prevDate);
      days.push({
        dateStr,
        dayNum,
        isCurrentMonth: false,
        isToday: dateStr === todayStr,
        slot: slotMap.get(dateStr),
      });
    }

    // Hari bulan saat ini
    for (let day = 1; day <= totalDays; day++) {
      const d = new Date(year, month, day);
      const dateStr = formatLocalDateString(d);
      days.push({
        dateStr,
        dayNum: day,
        isCurrentMonth: true,
        isToday: dateStr === todayStr,
        slot: slotMap.get(dateStr),
      });
    }

    // Hari bulan berikutnya (padding pelengkap kelipatan 7)
    const remaining = (7 - (days.length % 7)) % 7;
    for (let nextDay = 1; nextDay <= remaining; nextDay++) {
      const nextDate = new Date(year, month + 1, nextDay);
      const dateStr = formatLocalDateString(nextDate);
      days.push({
        dateStr,
        dayNum: nextDay,
        isCurrentMonth: false,
        isToday: dateStr === todayStr,
        slot: slotMap.get(dateStr),
      });
    }

    return days;
  }, [currentDate, todayStr, slotMap]);

  const handlePrevMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleResetToCurrentMonth = () => {
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDateStr(todayStr);
  };

  // Data slot tanggal yang sedang dipilih
  const selectedSlot = useMemo(() => {
    return (
      slotMap.get(selectedDateStr) || {
        id: `auto-${selectedDateStr}`,
        date: selectedDateStr,
        status: 'available' as SlotStatus,
        title: 'Slot Terbuka untuk Penugasan',
        category: 'Audio Visual & Fotografi',
        timeSlot: 'Fleksibel / Sesuai Kesepakatan',
        location: 'Surabaya & Sekitarnya',
        notes: 'Belum ada agenda produksi terdaftar pada tanggal ini. Siap untuk penugasan wisuda, komersial, maupun liputan acara.',
      }
    );
  }, [selectedDateStr, slotMap]);

  const getStatusBadge = (status: SlotStatus) => {
    switch (status) {
      case 'available':
        return {
          label: 'Slot Tersedia',
          bg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-700 dark:text-emerald-300',
          dot: 'bg-emerald-500',
        };
      case 'limited':
        return {
          label: 'Slot Terbatas',
          bg: 'bg-amber-500/15 border-amber-500/30 text-amber-700 dark:text-amber-300',
          dot: 'bg-amber-500',
        };
      case 'in_production':
        return {
          label: 'Dalam Produksi',
          bg: 'bg-sky-500/15 border-sky-500/30 text-sky-700 dark:text-sky-300',
          dot: 'bg-sky-500',
        };
      case 'booked':
      default:
        return {
          label: 'Jadwal Penuh',
          bg: 'bg-slate-500/15 border-slate-500/30 text-slate-700 dark:text-slate-300',
          dot: 'bg-slate-500',
        };
    }
  };

  // Buat tautan WhatsApp khusus booking tanggal terpilih
  const bookingWaLink = useMemo(() => {
    const formattedDate = new Date(selectedDateStr).toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const text = `Halo Mas Husein Rosid, saya melihat kalender jadwal produksi audio visual Anda di website untuk tanggal ${formattedDate}. Apakah slot pada tanggal tersebut masih bisa dibooking untuk proyek dokumentasi / wisuda saya?`;
    return createWhatsAppLink(text);
  }, [selectedDateStr]);

  return (
    <section id="jadwal" className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20 max-w-[1920px] mx-auto py-12 scroll-mt-28">
      {/* ── HEADER SECTION ── */}
      <div className="mb-8 sm:mb-10 pb-6 border-b border-black/[0.08] dark:border-white/[0.08] flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-600 dark:text-amber-400 mb-2 font-mono">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Jadwal Produksi &amp; Slot Audio Visual</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl text-slate-900 dark:text-white font-bold tracking-tight">
            Agenda Kerja &amp; Ketersediaan Slot
          </h2>
          <p className="max-w-2xl text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed mt-2.5">
            Pantau status ketersediaan liputan wisuda, dokumentasi acara, dan shooting video. Cek slot hari ini, besok, atau rencanakan tanggal penugasan Anda dengan mudah.
          </p>
        </div>

        {/* Legend status indicators */}
        <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Tersedia</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>Terbatas</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sky-500" />
            <span>Produksi / Set</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-500" />
            <span>Penuh</span>
          </div>
        </div>
      </div>

      {/* ── 1. STRIP STATUS CEPAT: HARI INI, BESOK & LUSA ── */}
      <div className="mb-10">
        <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 font-semibold">
          Status Ketersediaan Waktu Dekat
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
          {quickDays.map((item) => {
            const badge = getStatusBadge(item.slot.status);
            const isSelected = selectedDateStr === item.dateStr;

            return (
              <div
                key={item.label}
                onClick={() => setSelectedDateStr(item.dateStr)}
                className={`bento-card p-5 rounded-2xl cursor-pointer transition-all border ${
                  isSelected
                    ? 'border-amber-500 ring-1 ring-amber-500/40 shadow-lg'
                    : 'border-black/10 dark:border-white/10 hover:border-amber-500/40'
                } flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-amber-600 dark:text-amber-400">
                      {item.label}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono border ${badge.bg}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                      <span>{badge.label}</span>
                    </span>
                  </div>

                  <h4 className="font-editorial text-lg text-slate-900 dark:text-white font-semibold">
                    {item.formattedDate}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-1 line-clamp-1">
                    {item.slot.title}
                  </p>
                  {item.slot.location && (
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 font-light mt-1">
                      <MapPin className="w-3 h-3 text-amber-500 dark:text-amber-400 shrink-0" />
                      <span className="truncate">{item.slot.location}</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 mt-3 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 dark:text-slate-400 font-mono">
                    {item.slot.timeSlot || 'Slot Jam'}
                  </span>
                  <span className="text-amber-600 dark:text-amber-400 font-semibold hover:underline">
                    Pilih Tanggal &rarr;
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 2. KALENDER BULANAN & PANEL DETAIL TANGGAL ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Kolom Kiri: Grid Kalender Interaktif (7 cols) */}
        <div className="lg:col-span-7 bento-card p-5 sm:p-7 rounded-3xl border border-black/10 dark:border-white/10 shadow-lg">
          {/* Header Kontrol Bulan */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/[0.06] dark:border-white/[0.08]">
            <div className="flex items-center gap-3">
              <h3 className="font-editorial text-xl sm:text-2xl text-slate-900 dark:text-white font-bold">
                {MONTH_NAMES[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h3>
              <button
                onClick={handleResetToCurrentMonth}
                className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 transition-colors cursor-pointer"
              >
                Hari Ini
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrevMonth}
                aria-label="Bulan Sebelumnya"
                className="p-2 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextMonth}
                aria-label="Bulan Selanjutnya"
                className="p-2 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Baris Nama Hari */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 text-center text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
            {DAY_NAMES.map((d) => (
              <div key={d} className="py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Grid Tanggal Kalender */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {calendarDays.map((item, idx) => {
              const isSelected = selectedDateStr === item.dateStr;
              const hasSlot = !!item.slot;
              const status = item.slot?.status || (item.isCurrentMonth ? 'available' : undefined);

              return (
                <button
                  key={`${item.dateStr}-${idx}`}
                  type="button"
                  onClick={() => setSelectedDateStr(item.dateStr)}
                  className={`relative p-2 sm:p-2.5 min-h-[52px] sm:min-h-[64px] rounded-xl flex flex-col items-center justify-between transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-500 font-bold text-amber-700 dark:text-amber-300 shadow-md'
                      : item.isToday
                      ? 'bg-black/[0.04] dark:bg-white/[0.06] border-black/20 dark:border-white/20 text-slate-900 dark:text-white font-bold'
                      : item.isCurrentMonth
                      ? 'bg-transparent border-transparent hover:bg-black/[0.02] dark:hover:bg-white/[0.03] text-slate-800 dark:text-slate-200'
                      : 'bg-transparent border-transparent text-slate-400/40 dark:text-slate-600/40'
                  }`}
                >
                  <span className="text-xs sm:text-sm leading-none">{item.dayNum}</span>

                  {/* Indicator Dot */}
                  <div className="flex items-center gap-1 mt-1">
                    {status === 'available' && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="Slot Tersedia" />
                    )}
                    {status === 'limited' && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" title="Slot Terbatas" />
                    )}
                    {status === 'in_production' && (
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500" title="Dalam Produksi" />
                    )}
                    {status === 'booked' && (
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-500" title="Jadwal Penuh" />
                    )}
                  </div>

                  {/* Micro Badge Title on Desktop */}
                  {hasSlot && item.slot && item.isCurrentMonth && (
                    <span className="hidden sm:block text-[9px] font-mono truncate max-w-full text-slate-500 dark:text-slate-400 mt-0.5">
                      {item.slot.category ? item.slot.category.slice(0, 8) : item.slot.title.slice(0, 8)}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Kolom Kanan: Detail Slot Tanggal Terpilih (5 cols) */}
        <div className="lg:col-span-5 bento-card p-6 sm:p-7 rounded-3xl border border-black/10 dark:border-white/10 shadow-lg space-y-5">
          <div className="flex items-center justify-between gap-3 pb-4 border-b border-black/[0.06] dark:border-white/[0.08]">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 block font-semibold">
                Detail Tanggal Terpilih
              </span>
              <h4 className="font-editorial text-xl sm:text-2xl text-slate-900 dark:text-white font-bold mt-0.5">
                {new Date(selectedDateStr).toLocaleDateString('id-ID', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </h4>
            </div>

            {/* Status Pill */}
            {(() => {
              const b = getStatusBadge(selectedSlot.status);
              return (
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono border ${b.bg}`}>
                  <span className={`w-2 h-2 rounded-full ${b.dot}`} />
                  <span className="font-semibold">{b.label}</span>
                </span>
              );
            })()}
          </div>

          {/* Isi Agenda & Informasi Produksi */}
          <div className="space-y-3.5">
            <div>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block mb-1">
                Agenda / Deskripsi Kerja
              </span>
              <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                {selectedSlot.title}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.06] dark:border-white/[0.06]">
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                  <span>Waktu Slot</span>
                </span>
                <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                  {selectedSlot.timeSlot || 'Fleksibel'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.06] dark:border-white/[0.06]">
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                  <span>Lokasi</span>
                </span>
                <span className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate block">
                  {selectedSlot.location || 'Surabaya'}
                </span>
              </div>
            </div>

            {selectedSlot.notes && (
              <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <span className="font-bold text-amber-700 dark:text-amber-400 block mb-0.5">Catatan Produksi:</span>
                {selectedSlot.notes}
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.08] flex flex-col gap-2.5">
            <a
              href={bookingWaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 rounded-full bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-500/20 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Amankan / Booking Tanggal Ini</span>
            </a>

            {googleCalendarUrl && (
              <a
                href={googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-full bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 font-medium text-xs transition-all cursor-pointer border border-black/10 dark:border-white/10"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Buka di Google Calendar Resmi</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
