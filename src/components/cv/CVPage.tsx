import React, { useState } from 'react';
import {
  Printer,
  ArrowLeft,
  Mail,
  MessageCircle,
  MapPin,
  Globe,
  Camera,
  Video,
  Wrench,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  Sliders,
  Share2,
  Check,
} from 'lucide-react';
import { CV_DATA } from '../../data/cvData';
import { createWhatsAppLink } from '../../utils/whatsapp';

interface CVPageProps {
  onBackToMain: () => void;
  onSwitchMode: (mode: 'karya' | 'perjalanan') => void;
}

export const CVPage: React.FC<CVPageProps> = ({ onBackToMain, onSwitchMode }) => {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleShareLink = async () => {
    const url =
      typeof window !== 'undefined'
        ? `${window.location.origin}${window.location.pathname}#cv`
        : 'https://byhuseinrosid.my.id/#cv';

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'Curriculum Vitae Husein Rosid : Fotografer & Videografer',
          text: 'Lihat profil profesional, rekam jejak, dan kompetensi visual Husein Rosid.',
          url: url,
        });
        return;
      } catch {
        // Fallback ke clipboard jika user membatalkan share sheet
      }
    }

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const waLink = createWhatsAppLink(
    'Halo Mas Husein Rosid, saya melihat Curriculum Vitae (CV) Anda dan tertarik untuk menawarkan proyek/kerja sama visual.'
  );

  return (
    <div className="w-full min-h-screen pt-20 sm:pt-28 pb-28 sm:pb-20 animate-in fade-in duration-300">
      {/* Print-specific style overrides */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 12mm 15mm;
          }
          body {
            background-color: #ffffff !important;
            color: #0f172a !important;
          }
          .no-print {
            display: none !important;
          }
          .print-clean {
            background: #ffffff !important;
            color: #0f172a !important;
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
            max-width: 100% !important;
          }
          .print-avoid-break {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }
          .print-border {
            border-color: #e2e8f0 !important;
          }
          .print-text-dark {
            color: #0f172a !important;
          }
          .print-text-muted {
            color: #475569 !important;
          }
          .print-badge {
            background-color: #f8fafc !important;
            color: #1e293b !important;
            border: 1px solid #cbd5e1 !important;
          }
        }
      `}</style>

      {/* Top Action Bar (Screen Only) */}
      <div className="no-print sticky top-16 sm:top-20 z-40 bg-white/90 dark:bg-[#050505]/90 backdrop-blur-xl border-y border-black/[0.08] dark:border-white/[0.08] py-3 px-4 sm:px-6 lg:px-10 mb-8 transition-colors">
        <div className="w-full max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={onBackToMain}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] active:scale-95 border border-black/10 dark:border-white/10 text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Showcase Karya</span>
            </button>
            <span className="text-black/20 dark:text-white/20">/</span>
            <button
              onClick={() => onSwitchMode('perjalanan')}
              className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-300 transition-colors cursor-pointer"
            >
              Mode Perjalanan
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <button
              onClick={handleShareLink}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/15 active:scale-95 border border-black/10 dark:border-white/15 text-xs font-medium text-slate-800 dark:text-white transition-all cursor-pointer"
              title="Bagikan atau Salin Tautan CV"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                  <span className="text-emerald-600 dark:text-emerald-300 font-semibold">Tersalin!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>Salin Tautan</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/15 active:scale-95 border border-black/10 dark:border-white/15 text-xs font-medium text-slate-800 dark:text-white transition-all cursor-pointer"
              title="Cetak atau Simpan sebagai PDF"
            >
              <Printer className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Cetak / PDF</span>
            </button>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-amber-500/20"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Kontak Kerja Sama</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Resume Sheet Container */}
      <div className="w-full max-w-5xl px-4 sm:px-6 mx-auto">
        <div className="print-clean bento-card rounded-3xl p-6 sm:p-12 border border-black/10 dark:border-white/10 shadow-xl dark:shadow-2xl relative overflow-hidden bg-white dark:bg-[#0a0d14]/90 transition-colors">
          {/* Subtle Amber Glow Accent in Background */}
          <div className="no-print absolute top-0 right-0 w-96 h-96 bg-amber-500/5 dark:bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* ── HEADER IDENTITAS RESUME ── */}
          <header className="border-b border-black/10 dark:border-white/10 pb-8 mb-8 print-border">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
              <div>
                <span className="inline-block text-[11px] font-mono uppercase tracking-[0.25em] text-amber-600 dark:text-amber-400 mb-2 font-semibold">
                  Curriculum Vitae Profesional
                </span>
                <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-slate-950 dark:text-white font-bold tracking-tight print-text-dark">
                  {CV_DATA.fullName}
                </h1>
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-light mt-1.5 print-text-muted">
                  {CV_DATA.professionalTitle}
                </p>
              </div>

              {/* Contact Information Badges */}
              <div className="flex flex-col gap-2 text-xs text-slate-600 dark:text-slate-300 font-light print-text-muted">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>{CV_DATA.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                  <a href={`mailto:${CV_DATA.email}`} className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors">
                    {CV_DATA.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <a href={waLink} target="_blank" rel="noopener noreferrer" className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors">
                    {CV_DATA.whatsappDisplay}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0" />
                  <span>byhuseinrosid.my.id</span>
                </div>
              </div>
            </div>

            {/* Ringkasan Eksekutif */}
            <div className="mt-6 pt-6 border-t border-black/[0.06] dark:border-white/[0.06] print-border">
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 mb-2.5 font-semibold">
                Ringkasan Profil &amp; Filosofi Kerja
              </h2>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-light leading-relaxed print-text-dark">
                {CV_DATA.summary}
              </p>

              {/* Executive Highlights Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-black/[0.06] dark:border-white/[0.06] print-border">
                <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.08] dark:border-white/10 print-badge">
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Jam Terbang</span>
                  <span className="font-editorial text-xl sm:text-2xl text-amber-600 dark:text-amber-400 font-bold">7+ Tahun</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5 font-light">Sejak 2017</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.08] dark:border-white/10 print-badge">
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Portofolio Produksi</span>
                  <span className="font-editorial text-xl sm:text-2xl text-slate-900 dark:text-white font-bold">120+ Proyek</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5 font-light">Komersial & Dok</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.08] dark:border-white/10 print-badge">
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Fokus Disiplin</span>
                  <span className="font-editorial text-xl sm:text-2xl text-amber-600 dark:text-amber-400 font-bold">Hybrid</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5 font-light">Foto & Sinematografi</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.08] dark:border-white/10 print-badge">
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Jangkauan Layanan</span>
                  <span className="font-editorial text-xl sm:text-2xl text-slate-900 dark:text-white font-bold">Surabaya</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5 font-light">&amp; Seluruh Indonesia</span>
                </div>
              </div>
            </div>
          </header>

          {/* ── SECTION 1: PENGALAMAN PRODUKSI (FOTO & VIDEO) ── */}
          <section className="mb-10">
            <div className="flex items-center gap-2.5 mb-6">
              <Briefcase className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <h2 className="font-editorial text-2xl text-slate-950 dark:text-white font-semibold print-text-dark">
                Pengalaman Produksi &amp; Karir Visual
              </h2>
            </div>

            <div className="space-y-6">
              {CV_DATA.experiences.map((exp, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl p-5 sm:p-6 bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.08] dark:border-white/[0.08] hover:border-amber-500/30 transition-all print-badge"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white print-text-dark">
                        {exp.role}
                      </h3>
                      <p className="text-xs sm:text-sm text-amber-600 dark:text-amber-400 font-medium print-text-muted">
                        {exp.entity}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/25 dark:border-amber-500/30 text-amber-700 dark:text-amber-300 print-badge">
                        {exp.type === 'hybrid'
                          ? 'Foto & Video'
                          : exp.type === 'videografi'
                          ? 'Videografi'
                          : 'Fotografi'}
                      </span>
                      <span className="text-xs font-mono text-slate-500 dark:text-slate-400 print-text-muted">
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light mb-3 leading-relaxed print-text-muted">
                    {exp.description}
                  </p>

                  <ul className="space-y-1.5">
                    {exp.highlights.map((item, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 print-text-dark">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600/80 dark:text-amber-400/80 shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* ── SECTION 2: DUA PILAR SPESIALISASI (FOTO & VIDEO) ── */}
          <section className="mb-10">
            <div className="flex items-center gap-2.5 mb-6">
              <Sliders className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <h2 className="font-editorial text-2xl text-slate-950 dark:text-white font-semibold print-text-dark">
                Spesialisasi Teknis (Fotografi &amp; Videografi)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Pilar Fotografi */}
              <div className="rounded-2xl p-5 sm:p-6 bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.08] dark:border-white/[0.08] print-badge">
                <div className="flex items-center gap-2 mb-3 text-amber-600 dark:text-amber-400">
                  <Camera className="w-4 h-4" />
                  <h3 className="text-sm font-bold uppercase tracking-wider">Kompetensi Fotografi</h3>
                </div>
                <ul className="space-y-2">
                  {CV_DATA.photoSkills.map((skill, sIdx) => (
                    <li key={sIdx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 print-text-dark">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400 shrink-0" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pilar Videografi */}
              <div className="rounded-2xl p-5 sm:p-6 bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.08] dark:border-white/[0.08] print-badge">
                <div className="flex items-center gap-2 mb-3 text-amber-600 dark:text-amber-400">
                  <Video className="w-4 h-4" />
                  <h3 className="text-sm font-bold uppercase tracking-wider">Kompetensi Videografi</h3>
                </div>
                <ul className="space-y-2">
                  {CV_DATA.videoSkills.map((skill, vIdx) => (
                    <li key={vIdx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 print-text-dark">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400 shrink-0" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Perangkat Lunak Pascaproduksi */}
            <div className="mt-5 rounded-2xl p-4 sm:p-5 bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.08] dark:border-white/[0.08] print-badge">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2 font-semibold">
                Alat &amp; Perangkat Lunak Pascaproduksi (Post-Processing)
              </span>
              <div className="flex flex-wrap gap-2">
                {CV_DATA.softwareSkills.map((sw, swIdx) => (
                  <span
                    key={swIdx}
                    className="px-3 py-1 rounded-lg text-xs font-mono bg-black/[0.04] dark:bg-white/[0.05] border border-black/10 dark:border-white/10 text-slate-700 dark:text-slate-200 print-badge"
                  >
                    {sw}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* ── SECTION 3: PERALATAN PRODUKSI (GEAR ARSENAL) ── */}
          <section className="mb-10">
            <div className="flex items-center gap-2.5 mb-6">
              <Wrench className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <h2 className="font-editorial text-2xl text-slate-950 dark:text-white font-semibold print-text-dark">
                Perangkat Kerja Produksi Utama
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CV_DATA.equipmentList.map((eq, eqIdx) => (
                <div
                  key={eqIdx}
                  className="rounded-2xl p-4 sm:p-5 bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.08] dark:border-white/[0.08] print-badge"
                >
                  <h3 className="text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2 font-bold">
                    {eq.category}
                  </h3>
                  <ul className="space-y-1.5">
                    {eq.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="text-xs text-slate-600 dark:text-slate-300 font-light flex items-start gap-1.5 print-text-dark">
                        <span className="text-amber-600/80 dark:text-amber-400/80 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* ── SECTION 4: PENDIDIKAN & REKAM JEJAK ── */}
          <section className="border-t border-black/10 dark:border-white/10 pt-8 print-border">
            <div className="flex items-center gap-2.5 mb-6">
              <GraduationCap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <h2 className="font-editorial text-2xl text-slate-950 dark:text-white font-semibold print-text-dark">
                Latar Belakang Pendidikan &amp; Pelatihan
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CV_DATA.education.map((edu, eduIdx) => (
                <div key={eduIdx} className="rounded-2xl p-4 sm:p-5 bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.08] dark:border-white/[0.08] print-badge">
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white print-text-dark">{edu.degree}</h3>
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 print-text-muted">{edu.year}</span>
                  </div>
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-medium mb-1.5 print-text-muted">{edu.institution}</p>
                  {edu.description && (
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-light leading-relaxed print-text-muted">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ── FOOTER CALLOUT RESUME (SCREEN ONLY) ── */}
          <footer className="no-print mt-12 pt-8 border-t border-black/10 dark:border-white/10 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 dark:text-slate-400 font-light text-center sm:text-left">
              Dokumen ini adalah ringkasan resmi Curriculum Vitae By Husein Rosid. Siap untuk dicetak atau diunduh sebagai berkas PDF.
            </p>
            <div className="flex items-center gap-2.5">
              <button
                onClick={handleShareLink}
                className="px-3.5 py-2 rounded-full bg-black/[0.04] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/15 active:scale-95 text-xs text-slate-800 dark:text-white transition-all cursor-pointer border border-black/10 dark:border-white/10 flex items-center gap-1.5"
                title="Bagikan atau Salin Tautan CV"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                    <span className="text-emerald-600 dark:text-emerald-300 font-semibold">Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>Salin Tautan</span>
                  </>
                )}
              </button>

              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-full bg-black/[0.04] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/15 active:scale-95 text-xs text-slate-800 dark:text-white transition-all cursor-pointer border border-black/10 dark:border-white/10 flex items-center gap-2"
              >
                <Printer className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Simpan PDF</span>
              </button>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-full bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-amber-500/20"
              >
                Diskusi Proyek
              </a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
