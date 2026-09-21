import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CONTACT_CONFIG, SERVICE_PACKAGES } from '../data/portfolioData';
import { createWhatsAppLink } from '../utils/whatsapp';

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
    <section id="kontak" className="py-28 sm:py-36 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto scroll-mt-24 border-t border-[#1A1A1A]/10 dark:border-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">
        {/* Left Column: Direct Contacts */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#8B7355] font-semibold block mb-3">
              05 &bull; Mulai Terhubung
            </span>
            <h2 className="font-editorial text-4xl sm:text-6xl text-[#1A1A1A] dark:text-[#F3EFEA] font-normal tracking-tight leading-[1.1]">
              Mari Menenun <br />
              <span className="italic font-normal text-[#8B7355] dark:text-[#C4A47C]">
                Cerita Bersama.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-[#1A1A1A]/70 dark:text-[#F3EFEA]/70 font-light mt-6 leading-relaxed">
              Apakah Anda merencanakan kampanye brand, dokumentasi intim, atau sekadar ingin bertukar gagasan visual, saya selalu menyambut setiap dialog dengan terbuka.
            </p>

            {/* Editorial Contact Links */}
            <div className="space-y-6 mt-12 pt-8 border-t border-[#1A1A1A]/10 dark:border-white/10">
              <div>
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#8A857D] block mb-1">
                  WhatsApp Resmi
                </span>
                <a
                  href={`https://wa.me/${CONTACT_CONFIG.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-editorial text-xl sm:text-2xl text-[#1A1A1A] dark:text-[#F3EFEA] hover:text-[#8B7355] transition-colors inline-flex items-center gap-2"
                >
                  <span>{CONTACT_CONFIG.whatsappDisplay}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#8A857D] block mb-1">
                  Instagram Portofolio
                </span>
                <a
                  href={CONTACT_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-editorial text-xl sm:text-2xl text-[#1A1A1A] dark:text-[#F3EFEA] hover:text-[#8B7355] transition-colors inline-flex items-center gap-2"
                >
                  <span>{CONTACT_CONFIG.instagram}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#8A857D] block mb-1">
                  Surat Elektronik
                </span>
                <a
                  href={`mailto:${CONTACT_CONFIG.email}`}
                  className="font-editorial text-xl sm:text-2xl text-[#1A1A1A] dark:text-[#F3EFEA] hover:text-[#8B7355] transition-colors inline-flex items-center gap-2"
                >
                  <span>{CONTACT_CONFIG.email}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 text-xs text-[#8A857D] font-light">
            <span className="uppercase tracking-widest text-[10px] block font-medium mb-1">
              Domisili & Jangkauan:
            </span>
            {CONTACT_CONFIG.locationDisplay} &bull; Melayani sesi penugasan ke seluruh nusantara.
          </div>
        </div>

        {/* Right Column: Underline-Only Minimal Form */}
        <div className="lg:col-span-7">
          <div className="bg-[#F3EFEA]/40 dark:bg-white/[0.02] p-8 sm:p-12 border border-[#1A1A1A]/10 dark:border-white/10">
            <h3 className="font-editorial text-2xl sm:text-3xl text-[#1A1A1A] dark:text-[#F3EFEA] font-normal mb-2">
              Formulir Penawaran Sesi
            </h3>
            <p className="text-xs sm:text-sm text-[#8A857D] font-light mb-10">
              Isi kebutuhan Anda untuk langsung tersambung ke WhatsApp dengan pesan terstruktur.
            </p>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.25em] font-medium text-[#8A857D] mb-1">
                  Nama Anda / Entitas Brand *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Contoh: Rian & Sarah / Brand Mode"
                  className="w-full bg-transparent border-0 border-b border-[#1A1A1A]/20 dark:border-white/20 px-0 py-3 text-sm sm:text-base text-[#1A1A1A] dark:text-[#F3EFEA] placeholder:text-[#8A857D]/50 focus:outline-none focus:border-[#8B7355] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.25em] font-medium text-[#8A857D] mb-1">
                  Pilihan Layanan
                </label>
                <select
                  value={selectedService}
                  onChange={e => setSelectedService(e.target.value)}
                  className="w-full bg-transparent border-0 border-b border-[#1A1A1A]/20 dark:border-white/20 px-0 py-3 text-sm sm:text-base text-[#1A1A1A] dark:text-[#F3EFEA] focus:outline-none focus:border-[#8B7355] transition-colors cursor-pointer"
                >
                  <option value="" className="bg-[#FAF8F5] dark:bg-[#1A1A1A]">-- Pilih Kategori Layanan --</option>
                  {SERVICE_PACKAGES.map(svc => (
                    <option key={svc.id} value={svc.title} className="bg-[#FAF8F5] dark:bg-[#1A1A1A]">
                      {svc.title}
                    </option>
                  ))}
                  <option value="Proyek Kustom / Kolaborasi Visual" className="bg-[#FAF8F5] dark:bg-[#1A1A1A]">
                    Proyek Kustom / Kolaborasi Visual
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.25em] font-medium text-[#8A857D] mb-1">
                  Rencana Lokasi & Perkiraan Jadwal
                </label>
                <input
                  type="text"
                  value={sessionLocation}
                  onChange={e => setSessionLocation(e.target.value)}
                  placeholder="Contoh: Surabaya / Bali &mdash; Bulan depan"
                  className="w-full bg-transparent border-0 border-b border-[#1A1A1A]/20 dark:border-white/20 px-0 py-3 text-sm sm:text-base text-[#1A1A1A] dark:text-[#F3EFEA] placeholder:text-[#8A857D]/50 focus:outline-none focus:border-[#8B7355] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.25em] font-medium text-[#8A857D] mb-1">
                  Konsep Visual / Ekspektasi
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Gambarkan suasana foto, moodboard, atau narasi yang ingin Anda abadikan..."
                  className="w-full bg-transparent border-0 border-b border-[#1A1A1A]/20 dark:border-white/20 px-0 py-3 text-sm sm:text-base text-[#1A1A1A] dark:text-[#F3EFEA] placeholder:text-[#8A857D]/50 focus:outline-none focus:border-[#8B7355] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 bg-[#1A1A1A] dark:bg-white text-[#FAF8F5] dark:text-black text-xs font-semibold uppercase tracking-[0.25em] hover:bg-[#8B7355] dark:hover:bg-[#8B7355] dark:hover:text-white transition-colors cursor-pointer"
              >
                <span>Kirim Pesan via WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
