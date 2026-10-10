import React, { useState, useEffect } from 'react';
import { MessageCircle, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { ProductionCalendar } from '../components/schedule/ProductionCalendar';
import { getSiteContent, DEFAULT_SITE_CONTENT } from '../lib/supabase';
import { createWhatsAppLink } from '../utils/whatsapp';
import type { SiteContentData } from '../types/portfolio';

export const JadwalApp: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [siteContent, setSiteContent] = useState<SiteContentData>(DEFAULT_SITE_CONTENT);

  useEffect(() => {
    async function loadContent() {
      const data = await getSiteContent();
      if (data) {
        setSiteContent(data);
      }
    }
    loadContent();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] relative overflow-x-hidden transition-colors duration-200 flex flex-col justify-between selection:bg-amber-500/30 selection:text-amber-800 dark:selection:text-amber-200">
      {/* Background Architectural Grid Pattern */}
      <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none z-0" />
      <div className="fixed top-0 left-0 right-0 h-[400px] radial-vignette pointer-events-none z-0" />

      {/* ── TOPBAR: MINIMALIST & DISTRACTION-FREE ── */}
      <header className="sticky top-0 z-50 pt-4 sm:pt-6 px-3 sm:px-6 pointer-events-none">
        <div className="w-full max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
          <div className="w-full flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white/85 dark:bg-[#0E1118]/85 backdrop-blur-xl border border-black/[0.08] dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
            {/* Minimal Brand Identity */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 dark:text-amber-400 font-editorial font-bold text-xs sm:text-sm shrink-0">
                HR
              </div>
              <div className="flex items-center gap-2">
                <span className="font-editorial text-sm sm:text-base font-semibold text-slate-900 dark:text-white leading-none">
                  Husein Rosid
                </span>
                <span className="text-black/20 dark:text-white/20 text-xs hidden sm:inline">&bull;</span>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 hidden sm:inline">
                  Jadwal Produksi
                </span>
              </div>
            </div>

            {/* Action: Theme Switcher & Direct WhatsApp */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Theme Toggle Button */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Beralih ke mode terang' : 'Beralih ke mode gelap'}
                title={theme === 'dark' ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/[0.04] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/15 active:scale-95 border border-black/10 dark:border-white/15 flex items-center justify-center text-slate-700 dark:text-amber-400 transition-all cursor-pointer shrink-0"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 hover:rotate-45" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-700 transition-transform duration-300 hover:-rotate-12" />
                )}
              </button>

              {/* Direct WhatsApp CTA */}
              <a
                href={createWhatsAppLink('Halo Mas Husein Rosid, saya ingin menanyakan jadwal dan ketersediaan slot audio visual / wisuda.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-500/20 cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT: CALM, SINGLE-FOCUS CALENDAR ── */}
      <main className="relative z-10 flex-grow pt-6 sm:pt-10 pb-16 px-4 sm:px-6">
        <div className="w-full max-w-6xl mx-auto">
          {/* Header Ringkas */}
          <div className="mb-6 sm:mb-8 pb-4 border-b border-black/[0.06] dark:border-white/[0.06] text-center">
            <h1 className="font-editorial text-2xl sm:text-4xl text-slate-900 dark:text-white font-bold tracking-tight">
              Ketersediaan Slot &amp; Jadwal Produksi
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-light max-w-2xl leading-relaxed mx-auto">
              Pantau jadwal liputan wisuda dan shooting video audio visual. Pilih tanggal untuk melihat detail slot atau reservasi langsung via WhatsApp.
            </p>
          </div>

          {/* Core Calendar Component (Tanpa Header Ganda) */}
          <ProductionCalendar
            schedule={siteContent.schedule}
            googleCalendarUrl={siteContent.googleCalendarUrl}
            hideHeader={true}
          />
        </div>
      </main>

      {/* ── FOOTER MINIMALIS ── */}
      <footer className="relative z-10 border-t border-black/[0.06] dark:border-white/[0.06] py-6 sm:py-8 px-4 text-center">
        <p className="text-xs text-slate-500 dark:text-slate-400 font-light">
          Husein Rosid
        </p>
      </footer>
    </div>
  );
};
