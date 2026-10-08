import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Calendar, MapPin, Sparkles, Check, ChevronRight } from 'lucide-react';
import { createDetailedInquiryLink, type ProjectInquiryData } from '../../utils/whatsapp';

interface ProjectEstimatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
  initialPhotoTitle?: string;
}

const CATEGORY_OPTIONS = [
  { id: 'Event Documentation', label: 'Dokumentasi Acara', desc: 'Konser, seminar, festival, gathering' },
  { id: 'Graduation', label: 'Wisuda & Akademik', desc: 'Sesi outdoor / studio wisuda personal & grup' },
  { id: 'Couple Session', label: 'Couple & Pre-Wedding', desc: 'Momen romantis, tunangan, pre-wedding' },
  { id: 'Commercial & Brand Campaign', label: 'Komersial & Brand', desc: 'Editorial produk, fashion lookbook, brand' },
  { id: 'Behind The Scene Production', label: 'BTS Produksi Film', desc: 'Dokumentasi set shooting, film, klip' },
  { id: 'Solo Portrait', label: 'Potret Individu', desc: 'Personal branding, profil profesional' },
];

const SERVICE_OPTIONS = [
  { id: 'Foto + Video (Paket Lengkap)', label: 'Foto + Video Lengkap', badge: 'Rekomendasi', desc: 'Dokumentasi visual komprehensif foto resolusi tinggi dan reel video' },
  { id: 'Fotografi Saja', label: 'Fotografi Saja', desc: 'Fokus jepretan still photography dan retouching warna' },
  { id: 'Videografi Saja', label: 'Videografi Saja', desc: 'Liputan sinematik, video teaser, dan reel highlights' },
];

const LOCATION_OPTIONS = [
  'Surabaya & Sidoarjo (Domisili)',
  'Malang & Sekitarnya',
  'Solo / Jogja / Jawa Tengah',
  'Jakarta & Jabodetabek',
  'Luar Jawa / Destinasi Lain',
];

const SCHEDULE_OPTIONS = [
  { id: 'flexible', label: 'Jadwal Masih Fleksibel' },
  { id: 'fixed', label: 'Sudah Ada Tanggal Pasti' },
  { id: 'urgent', label: 'Segera / Dalam Waktu Dekat' },
];

export const ProjectEstimatorModal: React.FC<ProjectEstimatorModalProps> = ({
  isOpen,
  onClose,
  initialCategory,
  initialPhotoTitle,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory || 'Event Documentation'
  );
  const [selectedService, setSelectedService] = useState<string>(
    'Foto + Video (Paket Lengkap)'
  );
  const [selectedLocation, setSelectedLocation] = useState<string>(
    'Surabaya & Sidoarjo (Domisili)'
  );
  const [scheduleOption, setScheduleOption] = useState<string>('flexible');
  const [customDate, setCustomDate] = useState<string>('');
  const [notes, setNotes] = useState<string>(
    initialPhotoTitle ? `Tertarik dengan gaya karya: "${initialPhotoTitle}"` : ''
  );

  // Sinkronisasi kategori atau foto jika prop berubah saat dibuka
  useEffect(() => {
    if (initialCategory) {
      const match = CATEGORY_OPTIONS.find(c => c.id === initialCategory || c.label.includes(initialCategory));
      if (match) setSelectedCategory(match.id);
    }
    if (initialPhotoTitle) {
      setNotes(`Tertarik dengan gaya visual karya: "${initialPhotoTitle}"`);
    }
  }, [initialCategory, initialPhotoTitle, isOpen]);

  // Kunci scroll body saat modal aktif
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const scheduleLabel =
    scheduleOption === 'fixed' && customDate
      ? customDate
      : scheduleOption === 'fixed'
      ? 'Tanggal ditentukan kemudian'
      : scheduleOption === 'urgent'
      ? 'Segera (Minggu Ini / Bulan Ini)'
      : 'Fleksibel / Diskusi Terlebih Dahulu';

  const inquiryData: ProjectInquiryData = {
    category: selectedCategory,
    serviceType: selectedService,
    location: selectedLocation,
    scheduleOption: scheduleLabel,
    notes: notes,
  };

  const generatedWhatsAppUrl = createDetailedInquiryLink(inquiryData);

  const handleSendInquiry = () => {
    window.open(generatedWhatsAppUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Sheet / Modal Container */}
        <motion.div
          initial={{ y: '100%', opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          className="relative w-full max-w-2xl max-h-[92vh] sm:max-h-[88vh] bg-[#0A0D14] border border-white/10 rounded-t-[2rem] sm:rounded-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col z-10"
        >
          {/* Mobile Drag Indicator Bar */}
          <div className="pt-3 pb-1 flex justify-center sm:hidden">
            <div className="w-12 h-1.5 rounded-full bg-white/20" />
          </div>

          {/* Header */}
          <div className="px-5 sm:px-7 py-4 border-b border-white/[0.08] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-editorial text-lg sm:text-xl text-white font-semibold leading-tight">
                  Konsultasi Sesi Foto & Video
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-400 font-light">
                  Rancang kebutuhan produksi visual dan dapatkan draf pesan terstruktur
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Tutup Lembar Konsultasi"
              className="p-2 rounded-full bg-white/[0.05] hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Form Body */}
          <div className="px-5 sm:px-7 py-5 overflow-y-auto space-y-6 overscroll-contain">
            {/* Step 1: Kategori Proyek */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-amber-400 font-mono font-semibold mb-2.5">
                1. Pilih Kategori Proyek
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {CATEGORY_OPTIONS.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`text-left p-3 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-2 ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-500/60 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                          : 'bg-white/[0.02] border-white/10 hover:border-white/20 text-slate-300'
                      }`}
                    >
                      <div>
                        <span className={`text-xs sm:text-sm font-medium block ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                          {cat.label}
                        </span>
                        <span className="text-[10px] sm:text-[11px] text-slate-400 leading-snug line-clamp-1 mt-0.5">
                          {cat.desc}
                        </span>
                      </div>
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Format Layanan */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-amber-400 font-mono font-semibold mb-2.5">
                2. Format Layanan yang Dibutuhkan
              </label>
              <div className="grid grid-cols-1 gap-2">
                {SERVICE_OPTIONS.map((srv) => {
                  const isSelected = selectedService === srv.id;
                  return (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => setSelectedService(srv.id)}
                      className={`text-left p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-500/60 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                          : 'bg-white/[0.02] border-white/10 hover:border-white/20 text-slate-300'
                      }`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs sm:text-sm font-medium ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                            {srv.label}
                          </span>
                          {srv.badge && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-400 text-slate-950">
                              {srv.badge}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] sm:text-[11px] text-slate-400 leading-snug block mt-0.5">
                          {srv.desc}
                        </span>
                      </div>
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Cakupan Lokasi */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-amber-400 font-mono font-semibold mb-2.5">
                3. Cakupan Wilayah / Lokasi Acara
              </label>
              <div className="flex flex-wrap gap-2">
                {LOCATION_OPTIONS.map((loc) => {
                  const isSelected = selectedLocation === loc;
                  return (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => setSelectedLocation(loc)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-amber-500/20 border-amber-500/60 text-amber-300'
                          : 'bg-white/[0.02] border-white/10 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      <MapPin className="w-3 h-3 text-amber-400/80" />
                      <span>{loc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Estimasi Waktu / Jadwal */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-amber-400 font-mono font-semibold mb-2.5">
                4. Rencana Jadwal Sesi
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2.5">
                {SCHEDULE_OPTIONS.map((sch) => {
                  const isSelected = scheduleOption === sch.id;
                  return (
                    <button
                      key={sch.id}
                      type="button"
                      onClick={() => setScheduleOption(sch.id)}
                      className={`p-2.5 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500/20 border-amber-500/60 text-amber-300'
                          : 'bg-white/[0.02] border-white/10 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      {sch.label}
                    </button>
                  );
                })}
              </div>

              {scheduleOption === 'fixed' && (
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/10">
                  <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                  <input
                    type="date"
                    value={customDate}
                    onChange={(e) => setCustomDate(e.target.value)}
                    className="bg-transparent text-white text-xs sm:text-sm w-full outline-none focus:ring-0"
                  />
                </div>
              )}
            </div>

            {/* Step 5: Catatan / Deskripsi Tambahan */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 font-mono mb-2">
                Catatan Tambahan (Opsional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Contoh: Acara berlangsung outdoor sore hari, butuh liputan highlight 1 menit dan foto edit 50 frame..."
                rows={2}
                className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/10 text-slate-200 text-xs sm:text-sm placeholder:text-slate-500 outline-none focus:border-amber-400/50 transition-colors resize-none"
              />
            </div>

            {/* Live Preview Box */}
            <div className="p-3.5 rounded-2xl bg-black/40 border border-amber-500/20 text-xs font-mono space-y-1.5 text-slate-300">
              <div className="text-[11px] text-amber-400 uppercase tracking-wider font-bold mb-1 flex items-center justify-between">
                <span>Pratinjau Pesan WhatsApp</span>
                <span className="text-[10px] text-slate-400 font-normal">Format Otomatis</span>
              </div>
              <p className="text-slate-400">Halo Husein Rosid, saya ingin konsultasi rencana proyek visual:</p>
              <p><span className="text-amber-400">&bull;</span> Kategori: <span className="text-white font-semibold">{selectedCategory}</span></p>
              <p><span className="text-amber-400">&bull;</span> Layanan: <span className="text-white font-semibold">{selectedService}</span></p>
              <p><span className="text-amber-400">&bull;</span> Lokasi: <span className="text-white font-semibold">{selectedLocation}</span></p>
              <p><span className="text-amber-400">&bull;</span> Jadwal: <span className="text-white font-semibold">{scheduleLabel}</span></p>
              {notes && <p className="line-clamp-2 text-slate-400"><span className="text-amber-400">&bull;</span> Catatan: {notes}</p>}
            </div>
          </div>

          {/* Footer Action Bar */}
          <div className="px-5 sm:px-7 py-4 border-t border-white/[0.08] bg-[#0A0D14]/90 backdrop-blur-md flex items-center justify-between gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-full text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.05] transition-all cursor-pointer"
            >
              Batal
            </button>

            <button
              type="button"
              onClick={handleSendInquiry}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm tracking-wide shadow-[0_4px_20px_rgba(245,158,11,0.35)] transition-all cursor-pointer group"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950 group-hover:scale-110 transition-transform" />
              <span>Kirim ke WhatsApp Resmi</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
