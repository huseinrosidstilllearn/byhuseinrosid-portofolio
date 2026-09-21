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
    <section id="kontak" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Column: Direct Official Contact Info */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-amber-500 mb-3 block">
              Mulai Terhubung
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl text-slate-900 dark:text-white font-medium leading-tight">
              Mari Menenun <br />
              <span className="italic text-amber-500/90 dark:text-amber-400">Cerita Bersama.</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-light mt-4 leading-relaxed">
              Apakah Anda merencanakan kampanye brand, dokumentasi intim, atau sekadar ingin bertukar ide visual, saya selalu menyambut setiap pesan dengan antusias.
            </p>

            {/* Contact Channels List */}
            <div className="space-y-4 mt-8">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/${CONTACT_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111827] hover:border-amber-500/50 group transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                    WhatsApp Resmi
                  </div>
                  <div className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                    {CONTACT_CONFIG.whatsappDisplay}
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500 transition-colors" />
              </a>

              {/* Instagram */}
              <a
                href={CONTACT_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111827] hover:border-amber-500/50 group transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <InstagramIcon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                    Instagram Portofolio
                  </div>
                  <div className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                    {CONTACT_CONFIG.instagram}
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500 transition-colors" />
              </a>

              {/* Email */}
              <a
                href={`mailto:${CONTACT_CONFIG.email}`}
                className="flex items-center gap-4 p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111827] hover:border-amber-500/50 group transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                    Email Bisnis
                  </div>
                  <div className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                    {CONTACT_CONFIG.email}
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500 transition-colors" />
              </a>
            </div>
          </div>

          {/* Base of Operations Callout */}
          <div className="mt-8 p-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 flex items-center gap-3">
            <MapPin className="w-5 h-5 text-amber-500 shrink-0" />
            <div className="text-xs text-slate-600 dark:text-slate-300">
              <strong className="text-slate-900 dark:text-white block font-medium">Studio & Domisili:</strong>
              {CONTACT_CONFIG.locationDisplay} &mdash; Siap melayani sesi pemotretan ke luar kota dan pulau.
            </div>
          </div>
        </div>

        {/* Right Column: Smart Booking Form */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111827] shadow-xl">
            <h3 className="font-editorial text-2xl text-slate-900 dark:text-white font-medium mb-2">
              Formulir Penawaran Sesi
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-light mb-8">
              Isi preferensi Anda di bawah ini, lalu klik kirim untuk langsung tersambung ke WhatsApp saya dengan pesan terstruktur.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Nama Anda / Brand *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Contoh: Rian & Sarah / Brand Lokal"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/30 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Pilihan Layanan
                </label>
                <select
                  value={selectedService}
                  onChange={e => setSelectedService(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/30 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-amber-500 transition-colors"
                >
                  <option value="">-- Pilih Kategori Layanan --</option>
                  {SERVICE_PACKAGES.map(svc => (
                    <option key={svc.id} value={svc.title}>
                      {svc.title}
                    </option>
                  ))}
                  <option value="Proyek Kustom / Kolaborasi Visual">Proyek Kustom / Kolaborasi Visual</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Rencana Lokasi & Perkiraan Tanggal
                </label>
                <input
                  type="text"
                  value={sessionLocation}
                  onChange={e => setSessionLocation(e.target.value)}
                  placeholder="Contoh: Surabaya / Bali &mdash; Bulan depan"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/30 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Ceritakan Konsep atau Ekspektasi Visual
                </label>
                <textarea
                  rows={4}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Gambarkan suasana foto, referensi moodboard, atau cerita yang ingin Anda abadikan..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/30 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-amber-500 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg hover:shadow-[0_0_25px_rgba(245,158,11,0.35)] transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Pesan ke WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
