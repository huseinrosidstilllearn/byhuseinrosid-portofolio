import { PHOTOGRAPHER_PROFILE, CONTACT_CONFIG } from '../../data/portfolioData';
import type { SiteMode } from '../../types/portfolio';
import { createWhatsAppLink } from '../../utils/whatsapp';

interface KaryaFooterProps {
  onSwitchToSpatial: () => void;
  onSwitchSiteMode: (mode: SiteMode) => void;
}

export function KaryaFooter({ onSwitchToSpatial, onSwitchSiteMode }: KaryaFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 py-10 px-4 sm:px-8">
      <div className="w-full max-w-[1920px] px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20 mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">

        {/* Brand */}
        <div className="text-center sm:text-left">
          <p className="font-headline text-lg font-black text-white">{PHOTOGRAPHER_PROFILE.brandName}</p>
          <p className="text-white/30 text-xs mt-0.5">{PHOTOGRAPHER_PROFILE.location}</p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* Spatial canvas */}
          <button
            onClick={onSwitchToSpatial}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-amber-500/40 text-white/40 hover:text-amber-400 text-xs transition-all duration-300 group"
          >
            <span>🗺</span>
            <span>Kanvas 360°</span>
          </button>

          {/* Switch to Perjalanan */}
          <button
            onClick={() => onSwitchSiteMode('perjalanan')}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-sky-500/40 text-white/40 hover:text-sky-400 text-xs transition-all duration-300"
          >
            <span>🧭</span>
            <span>Lihat Perjalanan Saya</span>
          </button>

          {/* WhatsApp */}
          <a
            href={createWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs transition-all duration-300 hover:scale-105"
          >
            <span>💬</span>
            <span>Minta Sesi</span>
          </a>
        </div>

        {/* Copyright */}
        <p className="text-white/20 text-xs font-mono text-center sm:text-right">
          © {year} {PHOTOGRAPHER_PROFILE.brandName}
          <br />
          <a href={CONTACT_CONFIG.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
            {CONTACT_CONFIG.instagram}
          </a>
        </p>
      </div>

      {/* Floating WhatsApp */}
      <a
        href={createWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hubungi via WhatsApp"
        className="fixed bottom-6 right-6 z-40 w-12 h-12 flex items-center justify-center rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-110 text-xl"
      >
        💬
      </a>
    </footer>
  );
}
