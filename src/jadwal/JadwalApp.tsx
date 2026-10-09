import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Share2,
  Check,
  MessageCircle,
  ExternalLink,
  Sun,
  Moon,
  Info,
  MapPin,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { ProductionCalendar } from '../components/schedule/ProductionCalendar';
import { getSiteContent, DEFAULT_SITE_CONTENT } from '../lib/supabase';
import { createWhatsAppLink } from '../utils/whatsapp';
import type { SiteContentData } from '../types/portfolio';

export const JadwalApp: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [siteContent, setSiteContent] = useState<SiteContentData>(DEFAULT_SITE_CONTENT);
  const [copied, setCopied] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadContent() {
      const data = await getSiteContent();
      if (data) {
        setSiteContent(data);
      }
    }
    loadContent();
  }, []);

  const handleCopyLink = () => {
    try {
      const url = window.location.href;
      navigator.clipboard.writeText(url);
      setCopied(true);
      setToastMessage('Tautan kalender berhasil disalin ke clipboard! Siap dibagikan.');
      setTimeout(() => setCopied(false), 2500);
      setTimeout(() => setToastMessage(null), 3500);
    } catch {
      setToastMessage('Gagal menyalin tautan secara otomatis. Silakan salin URL di browser.');
      setTimeout(() => setToastMessage(null), 3500);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] relative overflow-x-hidden transition-colors duration-200 flex flex-col justify-between selection:bg-amber-500/30 selection:text-amber-800 dark:selection:text-amber-200">
      {/* Background Architectural Grid Pattern */}
      <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none z-0" />
      <div className="fixed top-0 left-0 right-0 h-[500px] radial-vignette pointer-events-none z-0" />

      {/* ── TOPBAR / FLOATING CAPSULE NAVBAR ── */}
      <header className="sticky top-0 z-50 pt-4 sm:pt-6 px-3 sm:px-6 pointer-events-none">
        <div className="w-full max-w-[1920px] mx-auto flex items-center justify-between pointer-events-auto">
          <div className="w-full flex items-center justify-between px-4 sm:px-6 py-3 rounded-full bg-white/85 dark:bg-[#0E1118]/85 backdrop-blur-xl border border-black/[0.08] dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
            {/* Brand Logo & Back to Main Portfolio */}
            <div className="flex items-center gap-3">
              <a
                href="/"
                className="flex items-center gap-2.5 text-left group cursor-pointer"
                title="Kembali ke Portofolio Utama"
              >
                <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 dark:text-amber-400 font-editorial font-bold text-sm group-hover:scale-105 transition-transform shrink-0">
                  HR
                </div>
                <div className="flex flex-col justify-center">
                  <span className="font-editorial text-sm sm:text-base font-semibold text-slate-900 dark:text-white leading-none">
                    Husein Rosid
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-0.5 hidden sm:block">
                    Ketersediaan Slot Audio Visual
                  </span>
                </div>
              </a>

              <span className="text-black/20 dark:text-white/20 text-xs hidden md:inline">•</span>

              <a
                href="/"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Portofolio Utama</span>
              </a>
            </div>

            {/* Right Action: Share Link, Theme Switcher & WhatsApp CTA */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Copy URL Share Button */}
              <button
                type="button"
                onClick={handleCopyLink}
                aria-label="Salin Tautan Jadwal"
                title="Salin Tautan Jadwal untuk Klien"
                className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/10 active:scale-95 text-slate-800 dark:text-slate-200 border border-black/10 dark:border-white/10 text-xs font-mono font-medium transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="hidden sm:inline text-emerald-600 dark:text-emerald-400">Tersalin</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-amber-500" />
                    <span className="hidden sm:inline">Bagikan Link</span>
                  </>
                )}
              </button>

              {/* Theme Toggle Button */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Beralih ke mode terang' : 'Beralih ke mode gelap'}
                title={theme === 'dark' ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
                className="w-9 h-9 rounded-full bg-black/[0.04] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/15 active:scale-95 border border-black/10 dark:border-white/15 flex items-center justify-center text-slate-700 dark:text-amber-400 transition-all cursor-pointer shrink-0"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 hover:rotate-45" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-700 transition-transform duration-300 hover:-rotate-12" />
                )}
              </button>

              {/* WhatsApp CTA */}
              <a
                href={createWhatsAppLink('Halo Mas Husein Rosid, saya ingin menanyakan jadwal dan ketersediaan slot audio visual / wisuda.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-500/20 cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT AREA ── */}
      <main className="relative z-10 flex-grow pt-8 sm:pt-12 pb-16">
        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-2xl border border-white/10 dark:border-black/10 text-xs font-mono flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-3 duration-200">
            <Check className="w-4 h-4 text-emerald-400 dark:text-emerald-600 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Page Title & Context Header */}
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20 mb-8 sm:mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3 h-3" />
              <span>Agenda Resmi &bull; Surabaya &amp; Sekitarnya</span>
            </div>
            <h1 className="font-editorial text-4xl sm:text-6xl text-slate-900 dark:text-white font-extrabold tracking-tight leading-[1.1]">
              Kalender Ketersediaan &amp; Slot Produksi
            </h1>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 font-light leading-relaxed">
              Halaman resmi pemantauan slot kerja audio visual, dokumentasi wisuda, dan liputan acara oleh Husein Rosid. Bagikan atau simpan tautan ini untuk mengecek ketersediaan tanggal penugasan secara langsung.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-6">
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-mono font-semibold transition-all cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? 'Tautan Disalin!' : 'Salin Link Halaman Ini untuk Klien'}</span>
              </button>

              <a
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/10 border border-black/10 dark:border-white/10 text-slate-700 dark:text-slate-300 text-xs font-medium transition-all"
              >
                <span>Lihat Portofolio Lengkap</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>
        </div>

        {/* ── CORE COMPONENT: PRODUCTION CALENDAR ── */}
        <ProductionCalendar
          schedule={siteContent.schedule}
          googleCalendarUrl={siteContent.googleCalendarUrl}
        />

        {/* ── PETUNJUK & INFORMASI PEMESANAN (BENTO GUIDELINES) ── */}
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20 mt-12 sm:mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Panduan 1 */}
            <div className="bento-card p-6 rounded-3xl border border-black/10 dark:border-white/10 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <h3 className="font-editorial text-lg text-slate-900 dark:text-white font-bold">
                Cara Booking Tanggal
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                Pilih tanggal yang berstatus "Tersedia" atau "Terbatas" pada kalender di atas, lalu klik tombol booking WhatsApp. Slot resmi terkunci setelah pembayaran uang muka (DP) disepakati.
              </p>
            </div>

            {/* Panduan 2 */}
            <div className="bento-card p-6 rounded-3xl border border-black/10 dark:border-white/10 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <h3 className="font-editorial text-lg text-slate-900 dark:text-white font-bold">
                Jangkauan Wilayah
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                Berdomisili di Surabaya dan Sidoarjo. Bersedia menerima penugasan luar kota seperti Malang, Gresik, Mojokerto, dan seluruh wilayah Jawa Timur dengan penyesuaian biaya akomodasi.
              </p>
            </div>

            {/* Panduan 3 */}
            <div className="bento-card p-6 rounded-3xl border border-black/10 dark:border-white/10 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Info className="w-4 h-4" />
              </div>
              <h3 className="font-editorial text-lg text-slate-900 dark:text-white font-bold">
                Slot Wisuda &amp; Weekend
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                Musim wisuda kampus dan akhir pekan biasanya cepat penuh. Disarankan untuk berkonsultasi dan mengunci tanggal minimal 2 hingga 4 minggu sebelum agenda kegiatan berlangsung.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 border-t border-black/[0.08] dark:border-white/[0.08] py-8 sm:py-10 px-4 sm:px-6">
        <div className="w-full max-w-[1920px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400 font-light">
          <div className="flex items-center gap-2">
            <span className="font-editorial font-bold text-slate-900 dark:text-white">Husein Rosid</span>
            <span>&bull;</span>
            <span>Fotografer &amp; Videografer &bull; Surabaya, Indonesia</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <a
              href="/"
              className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              Portofolio Utama
            </a>
            <span>&bull;</span>
            <a
              href={createWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              Kontak WhatsApp
            </a>
            <span>&bull;</span>
            <a
              href="/admin.html"
              className="text-slate-400 hover:text-slate-200 transition-colors"
            >
              Admin Portal
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
