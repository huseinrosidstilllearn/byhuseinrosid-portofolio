import React, { useState, useEffect, useRef } from 'react';
import {
  User,
  Phone,
  Clock,
  Sparkles,
  Briefcase,
  BarChart3,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  Star,
  ExternalLink,
  Upload,
  Image as ImageIcon,
  Loader2,
  FileText,
} from 'lucide-react';
import {
  getSiteContent,
  saveSiteContentSection,
  DEFAULT_SITE_CONTENT,
} from '../lib/supabase';
import { compressImage } from '../utils/imageCompressor';
import { CustomSelect } from '../components/ui/CustomSelect';
import type {
  SiteContentData,
  TimelineMilestone,
  SkillItem,
} from '../types/portfolio';

type SectionKey = 'profile' | 'contact' | 'timeline' | 'skills' | 'services' | 'stats';

interface SectionMenu {
  id: SectionKey;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const SECTIONS: SectionMenu[] = [
  { id: 'profile', label: 'Profil & Filosofi', icon: User, description: 'Nama, bio, headline & pesan artistik' },
  { id: 'contact', label: 'Kontak & Media', icon: Phone, description: 'WhatsApp, Instagram, email & domisili' },
  { id: 'timeline', label: 'Garis Waktu (CV)', icon: Clock, description: 'Milestone perjalanan dari 2017-sekarang' },
  { id: 'skills', label: 'Keahlian & Gear', icon: Sparkles, description: 'Teknis, editing, soft skill & kamera' },
  { id: 'services', label: 'Fokus Kategori', icon: Briefcase, description: '3 pilar: Dokumentasi, Wisuda & Couple' },
  { id: 'stats', label: 'Statistik Metrik', icon: BarChart3, description: 'Jumlah proyek, tahun & klien' },
];

export const ContentEditor: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionKey>('profile');
  const [content, setContent] = useState<SiteContentData>(DEFAULT_SITE_CONTENT);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const avatarFileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState<boolean>(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getSiteContent();
      setContent(data);
      setLoading(false);
    }
    load();
  }, []);

  const showToast = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const handleSaveSection = async (section: SectionKey) => {
    setSaving(true);
    try {
      const res = await saveSiteContentSection(section, content[section]);
      if (res.success) {
        showToast('success', `Perubahan pada "${SECTIONS.find((s) => s.id === section)?.label}" berhasil disimpan!`);
      } else {
        showToast('error', res.error || 'Gagal menyimpan.');
      }
    } catch (err: any) {
      showToast('error', err.message || 'Terjadi kesalahan sistem.');
    } finally {
      setSaving(false);
    }
  };

  const handleResetSection = (section: SectionKey) => {
    if (!window.confirm(`Kembalikan isi "${SECTIONS.find((s) => s.id === section)?.label}" ke pengaturan default bawaan?`)) {
      return;
    }
    setContent((prev) => ({
      ...prev,
      [section]: JSON.parse(JSON.stringify(DEFAULT_SITE_CONTENT[section])),
    }));
    showToast('success', `Nilai ${section} dikembalikan ke default.`);
  };

  // Helper untuk update nested profile
  const updateProfile = (field: keyof SiteContentData['profile'], val: any) => {
    setContent((prev) => ({
      ...prev,
      profile: { ...prev.profile, [field]: val },
    }));
  };

  // Handler unggah avatar langsung ke Cloudflare R2
  const handleAvatarFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) {
      showToast('error', 'Pilih file foto potret yang valid (JPG, PNG, WEBP).');
      return;
    }

    try {
      setIsUploadingAvatar(true);
      const compressed = await compressImage(file, 1200, 0.9);

      const formData = new FormData();
      formData.append('file', compressed.file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        updateProfile('avatarUrl', data.url);
        showToast('success', 'Foto profil berhasil diunggah ke Cloudflare R2!');
      } else {
        throw new Error(data.error || 'Server gagal menyimpan foto profil.');
      }
    } catch (err: any) {
      showToast('error', err.message || 'Gagal memproses unggahan foto profil.');
    } finally {
      setIsUploadingAvatar(false);
      if (avatarFileInputRef.current) {
        avatarFileInputRef.current.value = '';
      }
    }
  };

  // Helper untuk paragraf biografi lengkap (bioFull)
  const bioFullList: string[] = Array.isArray(content.profile?.bioFull) && content.profile.bioFull.length > 0
    ? content.profile.bioFull
    : (DEFAULT_SITE_CONTENT.profile.bioFull || []);

  const updateBioFullParagraph = (index: number, val: string) => {
    const updated = [...bioFullList];
    updated[index] = val;
    updateProfile('bioFull', updated);
  };

  const addBioFullParagraph = () => {
    const updated = [...bioFullList, ''];
    updateProfile('bioFull', updated);
  };

  const removeBioFullParagraph = (index: number) => {
    if (bioFullList.length <= 1) {
      showToast('error', 'Minimal harus ada 1 paragraf biografi.');
      return;
    }
    const updated = bioFullList.filter((_, i) => i !== index);
    updateProfile('bioFull', updated);
  };

  // Helper untuk update nested contact
  const updateContact = (field: keyof SiteContentData['contact'], val: any) => {
    setContent((prev) => ({
      ...prev,
      contact: { ...prev.contact, [field]: val },
    }));
  };

  // Helper untuk update stats
  const updateStats = (field: keyof SiteContentData['stats'], val: number) => {
    setContent((prev) => ({
      ...prev,
      stats: { ...prev.stats, [field]: val },
    }));
  };

  if (loading) {
    return (
      <div className="py-24 text-center text-slate-400">
        <Sparkles className="w-8 h-8 text-amber-400 animate-spin mx-auto mb-3" />
        <p className="text-sm">Memuat data konten situs...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {message && (
        <div
          className={`p-4 rounded-2xl flex items-center justify-between gap-3 text-xs border animate-in slide-in-from-top duration-300 ${
            message.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-red-500/10 border-red-500/30 text-red-300'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {message.type === 'success' ? (
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            )}
            <span>{message.text}</span>
          </div>
          <button
            onClick={() => setMessage(null)}
            className="text-white/40 hover:text-white text-xs cursor-pointer"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Sidebar Menu */}
        <aside className="lg:col-span-4 bento-card p-3 rounded-3xl border border-white/10 space-y-1.5 sticky top-24">
          <div className="px-4 py-3 border-b border-white/[0.08] mb-2">
            <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 font-semibold block">
              Daftar Seksi Teks
            </span>
            <h3 className="font-editorial text-lg text-white font-medium">Editor Konten Web</h3>
          </div>

          {SECTIONS.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`w-full flex items-start gap-3 p-3.5 rounded-2xl text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-semibold shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <div
                  className={`p-2 rounded-xl shrink-0 ${
                    isActive ? 'bg-black/20 text-slate-950' : 'bg-white/5 text-amber-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold leading-tight">{sec.label}</div>
                  <div
                    className={`text-[11px] leading-snug truncate mt-0.5 ${
                      isActive ? 'text-slate-900/80 font-normal' : 'text-slate-400'
                    }`}
                  >
                    {sec.description}
                  </div>
                </div>
              </button>
            );
          })}

          <div className="pt-3 px-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 hover:border-amber-400/40 text-xs text-slate-300 hover:text-amber-300 transition-colors"
            >
              <span>Pratinjau Web Langsung</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </aside>

        {/* Right Form Editor Panel */}
        <section className="lg:col-span-8 bento-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-8">
          {/* Action Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/[0.08]">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400">
                Seksi Terpilih
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl text-white font-medium mt-0.5">
                {SECTIONS.find((s) => s.id === activeSection)?.label}
              </h2>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => handleResetSection(activeSection)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-white/15 hover:bg-white/10 text-xs text-slate-300 font-medium transition-colors cursor-pointer"
                title="Kembalikan ke teks bawaan"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>

              <button
                onClick={() => handleSaveSection(activeSection)}
                disabled={saving}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] cursor-pointer hover:scale-105"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Menyimpan...' : 'Simpan Seksi'}</span>
              </button>
            </div>
          </div>

          {/* =============================================================== */}
          {/* 1. SEKSI PROFIL & FILOSOFI */}
          {/* =============================================================== */}
          {activeSection === 'profile' && (
            <div className="space-y-8">
              {/* Bento 1: Identitas, Brand & Ketersediaan */}
              <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-5">
                <div className="flex items-center gap-3 pb-3 border-b border-white/[0.08]">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Identitas, Brand & Ketersediaan</h3>
                    <p className="text-[11px] text-slate-400 font-light">
                      Nama fotografer, identitas brand panggung, domisili, dan status kesiapan menerima klien.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Nama Fotografer
                    </label>
                    <input
                      type="text"
                      value={content.profile.name}
                      onChange={(e) => updateProfile('name', e.target.value)}
                      placeholder="Contoh: Husein Rosid"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">Tampil di judul utama Hero & Mode Perjalanan</span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Nama Brand / Judul Situs
                    </label>
                    <input
                      type="text"
                      value={content.profile.brandName}
                      onChange={(e) => updateProfile('brandName', e.target.value)}
                      placeholder="Contoh: The Journey of Husein Rosid"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">Tampil di Navbar, Footer, & Landing Gate</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Domisili Operasional
                    </label>
                    <input
                      type="text"
                      value={content.profile.location}
                      onChange={(e) => updateProfile('location', e.target.value)}
                      placeholder="Contoh: Surabaya, Jawa Timur, Indonesia"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">Tampil di Eyebrow Hero & Badge Lokasi</span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Keterangan Pengalaman
                    </label>
                    <input
                      type="text"
                      value={content.profile.experienceYears}
                      onChange={(e) => updateProfile('experienceYears', e.target.value)}
                      placeholder="Contoh: 7+ Tahun Pengalaman Visual"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">Tampil di Eyebrow Mode Perjalanan</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Status Ketersediaan Penugasan
                  </label>
                  <input
                    type="text"
                    value={content.profile.availability || ''}
                    onChange={(e) => updateProfile('availability', e.target.value)}
                    placeholder="Contoh: Menerima penugasan di Surabaya & siap bepergian ke seluruh Indonesia."
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-emerald-300 text-xs focus:outline-none focus:border-amber-400 font-medium"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">Informasi kesiapan penugasan yang dilihat klien saat ingin booking</span>
                </div>
              </div>

              {/* Bento 2: Headline Hero & Pesan Artistik */}
              <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-5">
                <div className="flex items-center gap-3 pb-3 border-b border-white/[0.08]">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Headline Hero & Filosofi Karya</h3>
                    <p className="text-[11px] text-slate-400 font-light">
                      Judul besar panggung Hero, kalimat narasi pembuka, dan kutipan filosofi visual.
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Headline Utama (Hero Showcase)
                  </label>
                  <input
                    type="text"
                    value={content.profile.headline}
                    onChange={(e) => updateProfile('headline', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400 font-medium"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">Judul arsitektural di atas panggung utama web</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Subheadline Naratif (Hero & Kanvas)
                  </label>
                  <textarea
                    rows={2}
                    value={content.profile.subheadline}
                    onChange={(e) => updateProfile('subheadline', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">Maksimal 20 kata sesuai kaidah editorial presisi</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Filosofi Karya (Quote Artistik)
                  </label>
                  <input
                    type="text"
                    value={content.profile.philosophy}
                    onChange={(e) => updateProfile('philosophy', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-amber-300 text-xs italic focus:outline-none focus:border-amber-400"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">Kutipan filosofi yang tampil di Mode Perjalanan & Footer</span>
                </div>
              </div>

              {/* Bento 3: Biografi Naratif (Bio Singkat & Paragraf Lengkap) */}
              <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-5">
                <div className="flex items-center gap-3 pb-3 border-b border-white/[0.08]">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Biografi Fotografer</h3>
                    <p className="text-[11px] text-slate-400 font-light">
                      Bio pengantar singkat serta deskripsi profil yang ditampilkan di web (Mode Perjalanan).
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Bio Singkat (Lead Intro)
                  </label>
                  <textarea
                    rows={2}
                    value={content.profile.bioShort}
                    onChange={(e) => updateProfile('bioShort', e.target.value)}
                    placeholder="Ringkasan 1-2 kalimat tentang profil fotografer..."
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">Pengantar ringkas sebelum profil lengkap</span>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300">
                        Paragraf Profil / Perjalanan Lengkap ({bioFullList.length} Paragraf)
                      </label>
                      <span className="text-[10px] text-slate-500">
                        Setiap paragraf ditampilkan berurutan di kartu profil Mode Perjalanan
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={addBioFullParagraph}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-[11px] font-semibold transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Tambah Paragraf</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {bioFullList.map((paragraph, pIdx) => (
                      <div
                        key={pIdx}
                        className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-2 group hover:border-white/20 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider font-semibold">
                            Paragraf 0{pIdx + 1}
                          </span>
                          {bioFullList.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeBioFullParagraph(pIdx)}
                              className="text-slate-500 hover:text-red-400 p-1 transition-colors cursor-pointer"
                              title="Hapus paragraf ini"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                        <textarea
                          rows={3}
                          value={paragraph}
                          onChange={(e) => updateBioFullParagraph(pIdx, e.target.value)}
                          placeholder="Tuliskan catatan perjalanan visual Anda..."
                          className="w-full px-3.5 py-2 rounded-lg bg-black/40 border border-white/10 text-slate-200 text-xs leading-relaxed focus:outline-none focus:border-amber-400 font-light"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bento 4: Foto Profil (Avatar) */}
              <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-5">
                <div className="flex items-center gap-3 pb-3 border-b border-white/[0.08]">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Foto Profil (Avatar)</h3>
                    <p className="text-[11px] text-slate-400 font-light">
                      Foto potret yang tampil di kartu profil Mode Perjalanan dan seksi profil web.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  {/* Avatar Visual Preview */}
                  <div className="relative group shrink-0">
                    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-amber-500/30 bg-black/60 shadow-[0_0_25px_rgba(245,158,11,0.15)] flex items-center justify-center">
                      {content.profile.avatarUrl ? (
                        <img
                          src={content.profile.avatarUrl}
                          alt={content.profile.name || 'Avatar'}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <User className="w-10 h-10 text-slate-600" />
                      )}
                    </div>
                  </div>

                  {/* Upload Controls */}
                  <div className="flex-1 space-y-3 w-full">
                    <input
                      ref={avatarFileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarFileSelect}
                      className="hidden"
                    />

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => avatarFileInputRef.current?.click()}
                        disabled={isUploadingAvatar}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(245,158,11,0.25)] cursor-pointer"
                      >
                        {isUploadingAvatar ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Mengunggah ke R2...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4" />
                            <span>Pilih & Unggah Foto Baru</span>
                          </>
                        )}
                      </button>

                      {content.profile.avatarUrl && (
                        <a
                          href={content.profile.avatarUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-white/10 hover:border-white/25 text-xs text-slate-400 hover:text-white transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Lihat Asli</span>
                        </a>
                      )}
                    </div>

                    <p className="text-[11px] text-slate-400 font-light">
                      Foto akan otomatis dikonversi ke WebP terkompresi dan diunggah langsung ke bucket Cloudflare R2 Anda.
                    </p>

                    <div className="pt-2">
                      <label className="block text-[11px] text-slate-400 mb-1">
                        Atau tautan URL Foto Profil manual:
                      </label>
                      <input
                        type="url"
                        value={content.profile.avatarUrl}
                        onChange={(e) => updateProfile('avatarUrl', e.target.value)}
                        placeholder="https://..."
                        className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* 2. SEKSI KONTAK & MEDIA */}
          {/* =============================================================== */}
          {activeSection === 'contact' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    Nomor WhatsApp (Format: 628xxxx)
                  </label>
                  <input
                    type="text"
                    value={content.contact.whatsappNumber}
                    onChange={(e) => updateContact('whatsappNumber', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    Tampilan Teks WhatsApp
                  </label>
                  <input
                    type="text"
                    value={content.contact.whatsappDisplay}
                    onChange={(e) => updateContact('whatsappDisplay', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    Username Instagram (contoh: @byhuseinrosid)
                  </label>
                  <input
                    type="text"
                    value={content.contact.instagram}
                    onChange={(e) => updateContact('instagram', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    URL Lengkap Instagram
                  </label>
                  <input
                    type="url"
                    value={content.contact.instagramUrl}
                    onChange={(e) => updateContact('instagramUrl', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    value={content.contact.email}
                    onChange={(e) => updateContact('email', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    Display Lokasi Studio
                  </label>
                  <input
                    type="text"
                    value={content.contact.locationDisplay}
                    onChange={(e) => updateContact('locationDisplay', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* 3. SEKSI GARIS WAKTU / TIMELINE */}
          {/* =============================================================== */}
          {activeSection === 'timeline' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-2">
                <span className="text-xs text-slate-400">
                  Total {content.timeline.length} tonggak peristiwa dalam perjalanan
                </span>
                <button
                  onClick={() => {
                    const newMilestone: TimelineMilestone = {
                      id: 'tm-' + Date.now(),
                      year: new Date().getFullYear().toString(),
                      title: 'Milestone Baru',
                      description: 'Tuliskan deskripsi peristiwa atau pencapaian...',
                      icon: 'sparkles',
                      tags: ['Perjalanan'],
                      highlight: false,
                    };
                    setContent((prev) => ({
                      ...prev,
                      timeline: [newMilestone, ...prev.timeline],
                    }));
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500 text-slate-950 font-bold text-xs uppercase"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Milestone</span>
                </button>
              </div>

              <div className="space-y-4">
                {content.timeline.map((item, idx) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={item.icon}
                          onChange={(e) => {
                            const updated = [...content.timeline];
                            updated[idx].icon = e.target.value;
                            setContent((prev) => ({ ...prev, timeline: updated }));
                          }}
                          className="w-10 text-center py-1 rounded-lg bg-white/10 border border-white/10 text-lg"
                        />
                        <input
                          type="text"
                          value={item.year}
                          onChange={(e) => {
                            const updated = [...content.timeline];
                            updated[idx].year = e.target.value;
                            setContent((prev) => ({ ...prev, timeline: updated }));
                          }}
                          placeholder="Tahun"
                          className="w-24 px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs font-mono text-amber-400"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...content.timeline];
                            updated[idx].highlight = !updated[idx].highlight;
                            setContent((prev) => ({ ...prev, timeline: updated }));
                          }}
                          className={`p-1.5 rounded-lg text-xs flex items-center gap-1 cursor-pointer ${
                            item.highlight
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              : 'text-slate-500 hover:text-white'
                          }`}
                          title="Tandai sebagai tonggak penting (highlight)"
                        >
                          <Star className="w-3.5 h-3.5" fill={item.highlight ? 'currentColor' : 'none'} />
                          <span className="text-[10px] hidden sm:inline">Penting</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Hapus milestone "${item.title}"?`)) {
                              setContent((prev) => ({
                                ...prev,
                                timeline: prev.timeline.filter((m) => m.id !== item.id),
                              }));
                            }
                          }}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Judul Peristiwa</label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const updated = [...content.timeline];
                          updated[idx].title = e.target.value;
                          setContent((prev) => ({ ...prev, timeline: updated }));
                        }}
                        className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/10 text-white text-xs font-medium focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Deskripsi Naratif</label>
                      <textarea
                        rows={2}
                        value={item.description}
                        onChange={(e) => {
                          const updated = [...content.timeline];
                          updated[idx].description = e.target.value;
                          setContent((prev) => ({ ...prev, timeline: updated }));
                        }}
                        className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">
                        Tags (Pisahkan dengan koma)
                      </label>
                      <input
                        type="text"
                        value={item.tags?.join(', ') || ''}
                        onChange={(e) => {
                          const updated = [...content.timeline];
                          updated[idx].tags = e.target.value
                            .split(',')
                            .map((t) => t.trim())
                            .filter(Boolean);
                          setContent((prev) => ({ ...prev, timeline: updated }));
                        }}
                        placeholder="Contoh: Surabaya, Dokumenter, Awal Mula"
                        className="w-full px-3.5 py-1.5 rounded-xl bg-black/60 border border-white/10 text-slate-300 text-xs font-mono"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* 4. SEKSI KEAHLIAN (SKILLS) */}
          {/* =============================================================== */}
          {activeSection === 'skills' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-2">
                <span className="text-xs text-slate-400">
                  Total {content.skills.length} keahlian terdaftar
                </span>
                <button
                  onClick={() => {
                    const newSkill: SkillItem = {
                      name: 'Keahlian Baru',
                      category: 'teknis',
                      level: 'Mahir',
                      icon: 'camera',
                      description: 'Keterangan kompetensi...',
                    };
                    setContent((prev) => ({
                      ...prev,
                      skills: [...prev.skills, newSkill],
                    }));
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500 text-slate-950 font-bold text-xs uppercase"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Skill</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {content.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-1">
                        <input
                          type="text"
                          value={skill.icon}
                          onChange={(e) => {
                            const updated = [...content.skills];
                            updated[idx].icon = e.target.value;
                            setContent((prev) => ({ ...prev, skills: updated }));
                          }}
                          className="w-8 text-center py-1 rounded bg-white/10 text-base"
                        />
                        <input
                          type="text"
                          value={skill.name}
                          onChange={(e) => {
                            const updated = [...content.skills];
                            updated[idx].name = e.target.value;
                            setContent((prev) => ({ ...prev, skills: updated }));
                          }}
                          className="flex-1 px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-white text-xs font-semibold"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setContent((prev) => ({
                            ...prev,
                            skills: prev.skills.filter((_, i) => i !== idx),
                          }));
                        }}
                        className="text-slate-500 hover:text-red-400 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] text-slate-400 mb-1">Kategori</label>
                        <CustomSelect
                          value={skill.category}
                          onChange={(val) => {
                            const updated = [...content.skills];
                            updated[idx].category = val as any;
                            setContent((prev) => ({ ...prev, skills: updated }));
                          }}
                          options={[
                            { value: 'teknis', label: 'Teknis Fotografi' },
                            { value: 'editing', label: 'Post-Processing' },
                            { value: 'softskill', label: 'Keahlian Lunak' },
                            { value: 'gear', label: 'Peralatan' },
                          ]}
                          variant="compact"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-slate-400 mb-1">Level</label>
                        <CustomSelect
                          value={skill.level}
                          onChange={(val) => {
                            const updated = [...content.skills];
                            updated[idx].level = val as any;
                            setContent((prev) => ({ ...prev, skills: updated }));
                          }}
                          options={[
                            { value: 'Terampil', label: 'Terampil' },
                            { value: 'Mahir', label: 'Mahir' },
                            { value: 'Ahli', label: 'Ahli' },
                          ]}
                          variant="compact"
                        />
                      </div>
                    </div>

                    <div>
                      <input
                        type="text"
                        value={skill.description || ''}
                        onChange={(e) => {
                          const updated = [...content.skills];
                          updated[idx].description = e.target.value;
                          setContent((prev) => ({ ...prev, skills: updated }));
                        }}
                        placeholder="Deskripsi singkat kompetensi..."
                        className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-slate-300 text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* 5. SEKSI FOKUS KATEGORI & LAYANAN */}
          {/* =============================================================== */}
          {activeSection === 'services' && (
            <div className="space-y-6">
              <p className="text-xs text-slate-400">
                Ubah informasi dan cakupan 3 pilar kategori utama (Dokumentasi, Wisuda & Graduation, Couple Session) yang ditampilkan di web:
              </p>

              {content.services.map((pkg, idx) => (
                <div
                  key={pkg.id}
                  className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-amber-400 font-bold">
                      Pilar Kategori 0{idx + 1}
                    </span>
                    <input
                      type="text"
                      value={pkg.category}
                      onChange={(e) => {
                        const updated = [...content.services];
                        updated[idx].category = e.target.value;
                        setContent((prev) => ({ ...prev, services: updated }));
                      }}
                      className="px-3 py-1 rounded-lg bg-black/60 border border-white/10 text-slate-400 text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Judul Layanan</label>
                      <input
                        type="text"
                        value={pkg.title}
                        onChange={(e) => {
                          const updated = [...content.services];
                          updated[idx].title = e.target.value;
                          setContent((prev) => ({ ...prev, services: updated }));
                        }}
                        className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/10 text-white text-xs font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Tagline</label>
                      <input
                        type="text"
                        value={pkg.tagline}
                        onChange={(e) => {
                          const updated = [...content.services];
                          updated[idx].tagline = e.target.value;
                          setContent((prev) => ({ ...prev, services: updated }));
                        }}
                        className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/10 text-white text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">
                      Fitur / Cakupan (Satu baris per poin fitur)
                    </label>
                    <textarea
                      rows={4}
                      value={pkg.features.join('\n')}
                      onChange={(e) => {
                        const updated = [...content.services];
                        updated[idx].features = e.target.value
                          .split('\n')
                          .map((line) => line.trim())
                          .filter(Boolean);
                        setContent((prev) => ({ ...prev, services: updated }));
                      }}
                      className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/10 text-slate-200 text-xs font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Ideal Untuk</label>
                      <input
                        type="text"
                        value={pkg.idealFor}
                        onChange={(e) => {
                          const updated = [...content.services];
                          updated[idx].idealFor = e.target.value;
                          setContent((prev) => ({ ...prev, services: updated }));
                        }}
                        className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/10 text-slate-300 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Catatan Tambahan</label>
                      <input
                        type="text"
                        value={pkg.note}
                        onChange={(e) => {
                          const updated = [...content.services];
                          updated[idx].note = e.target.value;
                          setContent((prev) => ({ ...prev, services: updated }));
                        }}
                        className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/10 text-slate-300 text-xs"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* =============================================================== */}
          {/* 6. SEKSI STATISTIK METRIK */}
          {/* =============================================================== */}
          {activeSection === 'stats' && (
            <div className="space-y-6">
              <p className="text-xs text-slate-400">
                Angka metrik ringkasan pencapaian yang tampil di kartu stats Mode Perjalanan:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                  <label className="block text-xs font-semibold text-slate-300">
                    Tahun Pengalaman Berkarya
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={content.stats.yearsExperience}
                    onChange={(e) => updateStats('yearsExperience', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-amber-400 text-xl font-bold font-headline"
                  />
                  <span className="text-[11px] text-slate-400">Ditampilkan sebagai "7+ Tahun Berkarya"</span>
                </div>

                <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                  <label className="block text-xs font-semibold text-slate-300">
                    Total Proyek Terselesaikan
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={content.stats.totalProjects}
                    onChange={(e) => updateStats('totalProjects', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-amber-400 text-xl font-bold font-headline"
                  />
                  <span className="text-[11px] text-slate-400">Ditampilkan sebagai "120+ Proyek Selesai"</span>
                </div>

                <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                  <label className="block text-xs font-semibold text-slate-300">
                    Kota / Wilayah yang Dijelajahi
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={content.stats.citiesVisited}
                    onChange={(e) => updateStats('citiesVisited', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-amber-400 text-xl font-bold font-headline"
                  />
                  <span className="text-[11px] text-slate-400">Ditampilkan sebagai "18 Kota Dijelajahi"</span>
                </div>

                <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                  <label className="block text-xs font-semibold text-slate-300">
                    Jumlah Klien yang Telah Dipercaya
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={content.stats.clientsServed}
                    onChange={(e) => updateStats('clientsServed', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-amber-400 text-xl font-bold font-headline"
                  />
                  <span className="text-[11px] text-slate-400">Ditampilkan sebagai "65+ Klien Dipercaya"</span>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
