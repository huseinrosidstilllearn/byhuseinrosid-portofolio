import { motion } from 'framer-motion';
import { CONTACT_CONFIG, PHOTOGRAPHER_PROFILE } from '../../data/portfolioData';
import type { SiteMode } from '../../types/portfolio';

interface JourneyFooterProps {
  onSwitchMode: (mode: SiteMode) => void;
}

export function JourneyFooter({ onSwitchMode }: JourneyFooterProps) {
  const year = new Date().getFullYear();
  const waLink = `https://wa.me/${CONTACT_CONFIG.whatsappNumber}?text=Halo%20Mas%20Husein%2C%20saya%20tertarik%20untuk%20berkolaborasi!`;

  return (
    <footer className="relative border-t border-white/5 pt-16 pb-8 px-4 sm:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="relative w-full max-w-[1920px] px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20 mx-auto">
        {/* CTA Band */}
        <motion.div
          className="bento-card p-8 sm:p-12 rounded-3xl border border-amber-500/20 mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-amber-400/60 text-xs font-mono tracking-[0.3em] uppercase mb-4">Mari Berkolaborasi</p>
          <h3 className="font-headline text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            Ada Proyek yang<br />
            <span className="text-amber-400">Ingin Diwujudkan?</span>
          </h3>
          <p className="text-white/40 text-sm max-w-md mx-auto mb-8 leading-relaxed">
            Saya terbuka untuk penugasan komersial, dokumenter, potret, dan pernikahan. Mari bicara tentang visi Anda.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-semibold text-sm transition-all duration-300 hover:scale-105"
            >
              <span>💬</span>
              <span>Mulai via WhatsApp</span>
            </a>
            <a
              href={`mailto:${CONTACT_CONFIG.email}`}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-white/20 hover:border-amber-500/50 text-white/70 hover:text-white text-sm transition-all duration-300"
            >
              <span>📧</span>
              <span>Kirim Email</span>
            </a>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5">
          {/* Brand */}
          <div>
            <p className="font-headline text-lg font-black text-white">{PHOTOGRAPHER_PROFILE.brandName}</p>
            <p className="text-white/30 text-xs mt-0.5">{PHOTOGRAPHER_PROFILE.location}</p>
          </div>

          {/* Switch mode */}
          <button
            onClick={() => onSwitchMode('karya')}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-amber-500/40 text-white/40 hover:text-amber-400 text-xs transition-all duration-300 group"
          >
            <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
            <span>Lihat Mode Karya</span>
          </button>

          {/* Copyright */}
          <p className="text-white/20 text-xs font-mono">
            © {year} {PHOTOGRAPHER_PROFILE.brandName}
          </p>
        </div>
      </div>

      {/* Floating WhatsApp */}
      <a
        href={waLink}
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
