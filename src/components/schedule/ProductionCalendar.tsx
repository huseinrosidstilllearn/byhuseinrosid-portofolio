import React, { useState, useMemo, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  ExternalLink,
  MessageCircle,
  X,
} from 'lucide-react';
import type { ProductionScheduleSlot, SlotStatus } from '../../types/portfolio';
import { formatLocalDateString, DEFAULT_SCHEDULE_SLOTS } from '../../data/scheduleData';
import { createWhatsAppLink } from '../../utils/whatsapp';

interface ProductionCalendarProps {
  schedule?: ProductionScheduleSlot[];
  googleCalendarUrl?: string;
  onBookDate?: (date: string, title?: string) => void;
  hideHeader?: boolean;
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

const DAY_NAMES = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

export const ProductionCalendar: React.FC<ProductionCalendarProps> = ({
  schedule = DEFAULT_SCHEDULE_SLOTS,
  googleCalendarUrl,
  hideHeader = false,
}) => {
  const today = useMemo(() => new Date(), []);
  const todayStr = useMemo(() => formatLocalDateString(today), [today]);

  const [currentDate, setCurrentDate] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDateStr, setSelectedDateStr] = useState<string>(todayStr);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const activeSlots = schedule && schedule.length > 0 ? schedule : DEFAULT_SCHEDULE_SLOTS;

  // Peta jadwal tanggal -> ProductionScheduleSlot untuk akses cepat O(1)
  const slotMap = useMemo(() => {
    const map = new Map<string, ProductionScheduleSlot>();
    activeSlots.forEach((slot) => {
      map.set(slot.date, slot);
    });
    return map;
  }, [activeSlots]);

  // Listener keyboard ESC dan pengunci scroll saat modal aktif
  useEffect(() => {
    if (!isModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  // Kalkulasi matriks grid kalender bulanan penuh (Mulai hari Senin)
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const rawFirstDay = new Date(year, month, 1).getDay(); // 0 = Minggu
    const firstDayIndex = (rawFirstDay + 6) % 7; // 0 = Senin, 6 = Minggu
    const totalDays = new Date(year, month + 1, 0).getDate();
    const prevMonthTotalDays = new Date(year, month, 0).getDate();

    const days: Array<{
      dateStr: string;
      dayNum: number;
      isCurrentMonth: boolean;
      isToday: boolean;
      slot?: ProductionScheduleSlot;
    }> = [];

    // Hari bulan sebelumnya (padding awal)
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

  const parseDateString = (dateStr: string) => {
    const [y, m, d] = dateStr.split('-').map(Number);
    return new Date(y, m - 1, d);
  };

  const formatDateFull = (dateStr: string) => {
    const dateObj = parseDateString(dateStr);
    return dateObj.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
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
      case 'busy':
        return {
          label: 'Kesibukan Lain',
          bg: 'bg-purple-500/15 border-purple-500/30 text-purple-700 dark:text-purple-300',
          dot: 'bg-purple-500',
        };
      case 'other_event':
        return {
          label: 'Acara Lain',
          bg: 'bg-indigo-500/15 border-indigo-500/30 text-indigo-700 dark:text-indigo-300',
          dot: 'bg-indigo-400',
        };
      case 'booked':
      default:
        return {
          label: 'Jadwal Penuh',
          bg: 'bg-rose-500/15 border-rose-500/30 text-rose-700 dark:text-rose-400',
          dot: 'bg-rose-500',
        };
    }
  };

  // Tautan WhatsApp booking khusus tanggal terpilih
  const bookingWaLink = useMemo(() => {
    const formattedDate = formatDateFull(selectedDateStr);

    if (selectedSlot.status === 'booked' || selectedSlot.status === 'busy') {
      const statusText = selectedSlot.status === 'busy' ? 'Kesibukan Lain' : 'Penuh';
      const text = `Halo Mas Husein Rosid, saya melihat kalender jadwal Anda di website untuk tanggal ${formattedDate} berstatus ${statusText}. Apakah memungkinkan untuk penambahan slot atau antrean cadangan untuk proyek dokumentasi / wisuda saya?`;
      return createWhatsAppLink(text);
    }

    if (selectedSlot.status === 'other_event') {
      const text = `Halo Mas Husein Rosid, saya melihat kalender jadwal Anda di website untuk tanggal ${formattedDate} tercatat ada Acara Lain. Apakah memungkinkan untuk penyesuaian waktu atau sesi di jam lain pada tanggal tersebut?`;
      return createWhatsAppLink(text);
    }

    const text = `Halo Mas Husein Rosid, saya melihat kalender jadwal produksi audio visual Anda di website untuk tanggal ${formattedDate}. Apakah slot pada tanggal tersebut masih bisa dibooking untuk proyek dokumentasi / wisuda saya?`;
    return createWhatsAppLink(text);
  }, [selectedDateStr, selectedSlot.status]);

  const handleDateClick = (dateStr: string) => {
    setSelectedDateStr(dateStr);
    setIsModalOpen(true);
  };

  const statusBadge = getStatusBadge(selectedSlot.status);

  return (
    <section id="jadwal" className={`w-full ${hideHeader ? 'px-0 py-0' : 'px-4 sm:px-6 lg:px-10 max-w-6xl mx-auto py-8'} scroll-mt-28`}>
      {/* ── HEADER SECTION (Opsional jika bukan di halaman terisolasi) ── */}
      {!hideHeader && (
        <div className="mb-8 pb-6 border-b border-black/[0.08] dark:border-white/[0.08] flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-600 dark:text-amber-400 mb-2 font-mono">
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>Jadwal Produksi &amp; Slot Audio Visual</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl text-slate-900 dark:text-white font-bold tracking-tight">
              Agenda Kerja &amp; Ketersediaan Slot
            </h2>
            <p className="max-w-2xl text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed mt-2.5">
              Pantau jadwal liputan wisuda, dokumentasi acara, dan shooting video. Pilih tanggal pada kalender untuk melihat rincian detail.
            </p>
          </div>
        </div>
      )}

      {/* ── KALENDER BULANAN PENUH (FULL WIDTH 1 BULAN PENUH) ── */}
      <div className="w-full bento-card p-4 sm:p-7 md:p-8 rounded-3xl border border-black/10 dark:border-white/10 shadow-xl space-y-6">
        {/* Header Kalender: Bulan, Navigasi & Legenda */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-black/[0.06] dark:border-white/[0.08]">
          {/* Kontrol Bulan & Navigasi */}
          <div className="flex items-center gap-3">
            <h3 className="font-editorial text-2xl sm:text-3xl text-slate-900 dark:text-white font-bold tracking-tight">
              {MONTH_NAMES[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>

            <button
              type="button"
              onClick={handleResetToCurrentMonth}
              className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              Hari Ini
            </button>

            <div className="flex items-center gap-1 ml-1">
              <button
                type="button"
                onClick={handlePrevMonth}
                aria-label="Bulan Sebelumnya"
                className="p-2 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                aria-label="Bulan Selanjutnya"
                className="p-2 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Legenda Indikator Status Warna */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-mono text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
              <span>Tersedia</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.5)]" />
              <span>Terbatas</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500 shadow-[0_0_6px_rgba(14,165,233,0.5)]" />
              <span>Produksi</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.5)]" />
              <span>Penuh</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_6px_rgba(168,85,247,0.5)]" />
              <span>Kesibukan Lain</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 shadow-[0_0_6px_rgba(129,140,248,0.5)]" />
              <span>Acara lain</span>
            </div>
          </div>
        </div>

        {/* Petunjuk Penggunaan Singkat */}
        <div className="text-[11px] sm:text-xs font-mono text-slate-500 dark:text-slate-400">
          <span>Klik satu hari untuk melihat rincian agenda &amp; reservasi.</span>
        </div>

        {/* Baris Nama Hari (Senin sampai Minggu) */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2.5 text-center text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold pb-2 border-b border-black/[0.06] dark:border-white/[0.06]">
          {DAY_NAMES.map((d) => (
            <div key={d} className="py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Matriks Kalender 1 Bulan Penuh (Hanya Angka & Titik Status) */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2.5 md:gap-3">
          {calendarDays.map((item, idx) => {
            const status = item.slot?.status || (item.isCurrentMonth ? 'available' : undefined);

            return (
              <button
                key={`${item.dateStr}-${idx}`}
                type="button"
                onClick={() => handleDateClick(item.dateStr)}
                className={`relative min-h-[68px] sm:min-h-[88px] md:min-h-[104px] p-2 sm:p-3 rounded-2xl flex flex-col justify-between items-center sm:items-start transition-all cursor-pointer border ${
                  item.isCurrentMonth
                    ? 'bg-black/[0.015] dark:bg-white/[0.02] border-black/[0.06] dark:border-white/[0.08] hover:border-amber-500/60 hover:bg-black/[0.04] dark:hover:bg-white/[0.05] hover:shadow-md'
                    : 'bg-transparent border-transparent opacity-25 hover:opacity-50'
                }`}
                title={
                  item.slot
                    ? `${item.dateStr}: ${
                        item.slot.status === 'booked'
                          ? 'Jadwal Penuh'
                          : item.slot.status === 'busy'
                          ? 'Kesibukan Lain'
                          : item.slot.status === 'other_event'
                          ? 'Acara Lain'
                          : item.slot.status === 'limited'
                          ? 'Slot Terbatas'
                          : item.slot.status === 'in_production'
                          ? 'Dalam Produksi'
                          : 'Slot Tersedia'
                      }`
                    : `${item.dateStr}: Slot Tersedia (Klik untuk rincian)`
                }
              >
                {/* Tanggal Angka */}
                <div className="w-full flex justify-between items-start">
                  {item.isToday ? (
                    <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-amber-500 text-slate-950 font-bold text-xs sm:text-sm font-mono flex items-center justify-center shadow-sm">
                      {item.dayNum}
                    </span>
                  ) : (
                    <span
                      className={`text-xs sm:text-sm font-mono leading-none ${
                        item.isCurrentMonth
                          ? 'text-slate-800 dark:text-slate-200 font-medium'
                          : 'text-slate-400 dark:text-slate-600'
                      }`}
                    >
                      {item.dayNum}
                    </span>
                  )}
                </div>

                {/* Titik Status (Hanya Titik Bulat Tanpa Tulisan) */}
                <div className="w-full flex items-center justify-center sm:justify-start h-3">
                  {status === 'available' && (
                    <span
                      className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)]"
                      title="Slot Tersedia"
                    />
                  )}
                  {status === 'limited' && (
                    <span
                      className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.6)]"
                      title="Slot Terbatas"
                    />
                  )}
                  {status === 'in_production' && (
                    <span
                      className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-sky-500 shadow-[0_0_6px_rgba(14,165,233,0.6)]"
                      title="Dalam Produksi"
                    />
                  )}
                  {status === 'booked' && (
                    <span
                      className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.6)]"
                      title="Jadwal Penuh"
                    />
                  )}
                  {status === 'busy' && (
                    <span
                      className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-purple-500 shadow-[0_0_6px_rgba(168,85,247,0.6)]"
                      title="Kesibukan Lain"
                    />
                  )}
                  {status === 'other_event' && (
                    <span
                      className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-indigo-400 shadow-[0_0_6px_rgba(129,140,248,0.6)]"
                      title="Acara Lain"
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── MODAL DETAIL TANGGAL (MIRIP DENGAN WEB UTM TV) ── */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className="relative w-full max-w-lg bg-white dark:bg-[#0E1118] border border-black/10 dark:border-white/15 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 sm:p-6 border-b border-black/[0.08] dark:border-white/[0.08]">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 font-semibold block">
                  Rincian Jadwal &amp; Slot Produksi
                </span>
                <h3 id="modal-title" className="font-editorial text-xl sm:text-2xl text-slate-900 dark:text-white font-bold mt-1">
                  {formatDateFull(selectedDateStr)}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full bg-black/[0.05] dark:bg-white/[0.08] hover:bg-black/[0.1] dark:hover:bg-white/[0.15] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                aria-label="Tutup rincian"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 space-y-5">
              {/* Status Badge */}
              <div className="flex items-center justify-between pb-1">
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Status Ketersediaan:</span>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold border ${statusBadge.bg}`}>
                  <span className={`w-2 h-2 rounded-full ${statusBadge.dot}`} />
                  <span>{statusBadge.label}</span>
                </span>
              </div>

              {/* Agenda / Deskripsi */}
              <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.06] dark:border-white/[0.06]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                  Agenda / Deskripsi Kerja
                </span>
                <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                  {selectedSlot.title}
                </p>
              </div>

              {/* Grid Waktu & Lokasi */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.06] dark:border-white/[0.06]">
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>Waktu Slot</span>
                  </span>
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {selectedSlot.timeSlot || 'Fleksibel'}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.06] dark:border-white/[0.06]">
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    <span>Lokasi</span>
                  </span>
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate block">
                    {selectedSlot.location || 'Surabaya'}
                  </span>
                </div>
              </div>

              {/* Catatan Produksi (Jika Ada) */}
              {selectedSlot.notes && (
                <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  <span className="font-bold text-amber-700 dark:text-amber-400 block mb-1 font-mono uppercase tracking-wider text-[10px]">
                    Catatan Produksi:
                  </span>
                  {selectedSlot.notes}
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="p-5 sm:p-6 border-t border-black/[0.08] dark:border-white/[0.08] bg-black/[0.01] dark:bg-white/[0.01] flex flex-col gap-2.5">
              <a
                href={bookingWaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-5 rounded-full bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-500/20 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>
                  {selectedSlot.status === 'booked' || selectedSlot.status === 'busy'
                    ? 'Tanyakan Slot Cadangan via WhatsApp'
                    : selectedSlot.status === 'other_event'
                    ? 'Tanyakan Ketersediaan Waktu via WhatsApp'
                    : 'Amankan / Booking Tanggal Ini via WhatsApp'}
                </span>
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
      )}
    </section>
  );
};
