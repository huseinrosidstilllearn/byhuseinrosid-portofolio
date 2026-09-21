import React, { useState } from 'react';
import { MessageCircle, Mail, MapPin, Send, ArrowUpRight } from 'lucide-react';
import { CONTACT_CONFIG, SERVICE_PACKAGES } from '../data/portfolioData';
import { createWhatsAppLink } from '../utils/whatsapp';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [sessionLocation, setSessionLocation] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let message = `Halo Husein Rosid, perkenalkan nama saya *${name || 'Klien'}*.`;
    if (selectedService) {
      message += `\nLayanan: *${selectedService}*`;
    }
    if (sessionLocation) {
      message += `\nLokasi / Jadwal Rencana: *${sessionLocation}*`;
    }
    if (notes) {
      message += `\nKonsep / Ide: ${notes}`;
    }
    const url = createWhatsAppLink(selectedService, message);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="kontak" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-28">
      {/* Header */}
      <div className="mb-10 pb-6 border-b border-white/[0.08]">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-400 mb-2">
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Mulai Terhubung</span>
        </div>
        <h2 className="font-editorial text-3xl sm:text-5xl text-white font-medium">
          Mari Menenun Cerita Bersama
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Contact Channels Bento (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* WhatsApp Card */}
          <a
            href={`https://wa.me/${CONTACT_CONFIG.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bento-card p-5 flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">
                  WhatsApp Resmi
                </span>
                <span className="text-sm sm:text-base font-semibold text-white group-hover:text-amber-400 transition-colors">
                  {CONTACT_CONFIG.whatsappDisplay}
                </span>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>

          {/* Instagram Card */}
          <a
            href={CONTACT_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bento-card p-5 flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-2xl bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <InstagramIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">
                  Instagram Portofolio
                </span>
                <span className="text-sm sm:text-base font-semibold text-white group-hover:text-amber-400 transition-colors">
                  {CONTACT_CONFIG.instagram}
                </span>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>

          {/* Email Card */}
          <a
            href={`mailto:${CONTACT_CONFIG.email}`}
            className="bento-card p-5 flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">
                  Surat Elektronik
                </span>
                <span className="text-sm sm:text-base font-semibold text-white group-hover:text-amber-400 transition-colors">
                  {CONTACT_CONFIG.email}
                </span>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>

          {/* Domisili Bento Card */}
          <div className="bento-card p-5 flex items-start gap-3.5 mt-auto">
            <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center shrink-0 text-amber-400">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-semibold text-white block">
                Studio & Domisili
              </span>
              <p className="text-xs text-slate-400 font-light mt-0.5 leading-relaxed">
                {CONTACT_CONFIG.locationDisplay} &bull; Melayani sesi penugasan ke seluruh nusantara.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Structured Booking Form Bento (7 cols) */}
        <div className="lg:col-span-7 bento-card p-6 sm:p-10">
          <h3 className="font-editorial text-2xl sm:text-3xl text-white font-medium mb-1.5">
            Formulir Penawaran Sesi
          </h3>
          <p className="text-xs text-slate-400 font-light mb-8">
            Isi rincian rencana visual Anda untuk langsung tersambung ke WhatsApp dengan pesan terstruktur.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-300 mb-2">
                Nama Anda / Entitas Brand *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Contoh: Rian & Sarah / Brand Lokal"
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-300 mb-2">
                Pilihan Layanan
              </label>
              <select
                value={selectedService}
                onChange={e => setSelectedService(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
              >
                <option value="" className="bg-[#0E1118]">-- Pilih Kategori Layanan --</option>
                {SERVICE_PACKAGES.map(svc => (
                  <option key={svc.id} value={svc.title} className="bg-[#0E1118]">
                    {svc.title}
                  </option>
                ))}
                <option value="Proyek Kustom / Kolaborasi Visual" className="bg-[#0E1118]">
                  Proyek Kustom / Kolaborasi Visual
                </option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-300 mb-2">
                Rencana Lokasi & Perkiraan Tanggal
              </label>
              <input
                type="text"
                value={sessionLocation}
                onChange={e => setSessionLocation(e.target.value)}
                placeholder="Contoh: Surabaya / Bali &mdash; Bulan depan"
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-300 mb-2">
                Ceritakan Konsep atau Ekspektasi Visual
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Gambarkan suasana foto, referensi moodboard, atau cerita yang ingin Anda abadikan..."
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-amber-400 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.35)] transition-all cursor-pointer hover:scale-[1.01]"
            >
              <Send className="w-4 h-4" />
              <span>Kirim Pesan ke WhatsApp</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
