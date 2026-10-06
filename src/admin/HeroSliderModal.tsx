import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  Star,
  Search,
  ArrowUp,
  ArrowDown,
  Plus,
  Trash2,
  Image as ImageIcon,
  Clock,
  Save,
  Loader2,
  RotateCcw,
  SlidersHorizontal,
} from 'lucide-react';
import {
  getSiteContent,
  saveSiteContentSection,
  DEFAULT_HERO_SLIDER_CONFIG,
} from '../lib/supabase';
import { PHOTO_CATEGORIES } from '../data/portfolioData';
import type { PhotoItem, HeroSliderConfig, HeroSlideConfig } from '../types/portfolio';

interface HeroSliderModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: PhotoItem[];
  showToast: (msg: string) => void;
}

export const HeroSliderModal: React.FC<HeroSliderModalProps> = ({
  isOpen,
  onClose,
  photos,
  showToast,
}) => {
  const [config, setConfig] = useState<HeroSliderConfig>(DEFAULT_HERO_SLIDER_CONFIG);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  // State untuk dialog pemilih foto spesifik per kategori
  const [pickingForSlideId, setPickingForSlideId] = useState<string | null>(null);
  const [pickerSearchQuery, setPickerSearchQuery] = useState<string>('');

  // Muat konfigurasi tersimpan saat modal dibuka
  useEffect(() => {
    if (!isOpen) return;

    async function loadConfig() {
      setLoading(true);
      try {
        const content = await getSiteContent();
        const conf: HeroSliderConfig = content.heroSlider || DEFAULT_HERO_SLIDER_CONFIG;
        setConfig(conf);
      } catch (err) {
        console.warn('Gagal memuat konfigurasi hero slider:', err);
        setConfig(DEFAULT_HERO_SLIDER_CONFIG);
      } finally {
        setLoading(false);
      }
    }

    loadConfig();
    setPickingForSlideId(null);
    setPickerSearchQuery('');
  }, [isOpen]);

  if (!isOpen) return null;

  // Daftar seluruh kategori yang tersedia di portofolio
  const allAvailableCategories = Array.from(
    new Set([
      ...PHOTO_CATEGORIES.filter((c) => c !== 'Semua'),
      ...photos.map((p) => p.category).filter(Boolean),
    ])
  );

  // Kategori yang belum ada di daftar slide saat ini
  const unaddedCategories = allAvailableCategories.filter(
    (cat) => !config.slides.some((s) => s.category === cat)
  );

  // Fungsi toggle aktif/nonaktif slide
  const handleToggleSlideEnabled = (slideId: string) => {
    setConfig((prev) => ({
      ...prev,
      slides: prev.slides.map((s) =>
        s.id === slideId ? { ...s, enabled: !s.enabled } : s
      ),
    }));
  };

  // Fungsi hapus slide
  const handleRemoveSlide = (slideId: string) => {
    if (config.slides.length <= 1) {
      showToast('Minimal harus ada 1 slide kategori di slider.');
      return;
    }
    setConfig((prev) => ({
      ...prev,
      slides: prev.slides.filter((s) => s.id !== slideId),
    }));
  };

  // Fungsi pindah posisi urutan slide ke atas
  const handleMoveSlideUp = (index: number) => {
    if (index === 0) return;
    setConfig((prev) => {
      const nextSlides = [...prev.slides];
      const temp = nextSlides[index];
      nextSlides[index] = nextSlides[index - 1];
      nextSlides[index - 1] = temp;
      return { ...prev, slides: nextSlides };
    });
  };

  // Fungsi pindah posisi urutan slide ke bawah
  const handleMoveSlideDown = (index: number) => {
    if (index === config.slides.length - 1) return;
    setConfig((prev) => {
      const nextSlides = [...prev.slides];
      const temp = nextSlides[index];
      nextSlides[index] = nextSlides[index + 1];
      nextSlides[index + 1] = temp;
      return { ...prev, slides: nextSlides };
    });
  };

  // Fungsi tambah kategori baru sebagai slide
  const handleAddCategorySlide = (category: string) => {
    const newSlide: HeroSlideConfig = {
      id: `slide-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      category,
      photoId: 'auto',
      enabled: true,
    };
    setConfig((prev) => ({
      ...prev,
      slides: [...prev.slides, newSlide],
    }));
  };

  // Fungsi pilih foto spesifik untuk slide tertentu
  const handleSelectPhotoForSlide = (slideId: string, photoId: string) => {
    setConfig((prev) => ({
      ...prev,
      slides: prev.slides.map((s) =>
        s.id === slideId ? { ...s, photoId } : s
      ),
    }));
    setPickingForSlideId(null);
    setPickerSearchQuery('');
  };

  // Reset ke foto otomatis untuk slide tertentu
  const handleResetPhotoToAuto = (slideId: string) => {
    setConfig((prev) => ({
      ...prev,
      slides: prev.slides.map((s) =>
        s.id === slideId ? { ...s, photoId: 'auto' } : s
      ),
    }));
  };

  // Reset seluruh konfigurasi ke default bawaan
  const handleResetToDefault = () => {
    if (window.confirm('Kembalikan konfigurasi hero slider ke susunan standar awal?')) {
      setConfig(DEFAULT_HERO_SLIDER_CONFIG);
      showToast('Konfigurasi dikembalikan ke standar.');
    }
  };

  // Simpan konfigurasi ke Supabase dan LocalStorage
  const handleSave = async () => {
    setSaving(true);
    try {
      const result = await saveSiteContentSection('heroSlider', config);
      if (result.success) {
        showToast('Pengaturan Hero Slider berhasil disimpan dan diterapkan!');
        onClose();
      } else {
        showToast(`Gagal menyimpan: ${result.error || 'Terjadi kesalahan'}`);
      }
    } catch (err: any) {
      console.error('Error saat menyimpan pengaturan hero slider:', err);
      showToast(`Gagal menyimpan: ${err.message || 'Terjadi galat'}`);
    } finally {
      setSaving(false);
    }
  };

  // Temukan objek slide yang sedang dibuka pemilih fotonya
  const activePickingSlide = config.slides.find((s) => s.id === pickingForSlideId);
  const photosForActivePickingCategory = activePickingSlide
    ? photos.filter(
        (p) =>
          p.category === activePickingSlide.category &&
          (pickerSearchQuery.trim() === '' ||
            p.title.toLowerCase().includes(pickerSearchQuery.toLowerCase()) ||
            p.location.toLowerCase().includes(pickerSearchQuery.toLowerCase()))
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#0E1118] border border-white/15 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-[#F8FAFC]">
        {/* MODAL HEADER */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-editorial text-lg sm:text-xl text-white font-bold leading-tight">
                  Pengaturan Hero Showcase Slider
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-[9px] font-mono font-bold text-amber-300 uppercase">
                  Layar Utama
                </span>
              </div>
              <p className="text-xs text-slate-400 font-light mt-0.5">
                Pilih kategori apa saja yang tampil di slider utama dan tentukan karya foto spesifik per kategori.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-white/10 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-7 custom-scrollbar">
          {loading ? (
            <div className="py-20 text-center text-slate-400">
              <Loader2 className="w-7 h-7 text-amber-400 animate-spin mx-auto mb-2" />
              <span className="text-xs">Memuat pengaturan hero slider...</span>
            </div>
          ) : (
            <>
              {/* OPSI GLOBAL: ROTASI OTOMATIS & DURASI */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Pergantian Slide Otomatis (Auto Rotate)
                    </h4>
                    <p className="text-[11px] text-slate-400 font-light mt-0.5">
                      Slider akan otomatis berganti ke kategori berikutnya secara berkala saat pengunjung tidak menyentuh layar.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  {/* Durasi Detik */}
                  <div className="flex items-center p-1 rounded-full bg-black/40 border border-white/10 text-xs">
                    {[5, 7, 10].map((sec) => (
                      <button
                        key={sec}
                        type="button"
                        onClick={() => setConfig((p) => ({ ...p, intervalSeconds: sec }))}
                        className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer ${
                          config.intervalSeconds === sec
                            ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {sec}s
                      </button>
                    ))}
                  </div>

                  {/* Toggle Aktif */}
                  <button
                    type="button"
                    onClick={() =>
                      setConfig((p) => ({ ...p, autoRotate: !p.autoRotate }))
                    }
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer border ${
                      config.autoRotate
                        ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                        : 'bg-white/5 border-white/10 text-slate-400'
                    }`}
                  >
                    {config.autoRotate ? 'Aktif' : 'Nonaktif'}
                  </button>
                </div>
              </div>

              {/* DAFTAR SLIDE KATEGORI */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Susunan Slide Kategori
                    </h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300 font-mono">
                      {config.slides.filter((s) => s.enabled).length} Aktif dari {config.slides.length} Slide
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-light">
                    Urutan di bawah menentukan nomor slide 01, 02, dst di halaman depan
                  </span>
                </div>

                <div className="space-y-3">
                  {config.slides.map((slide, index) => {
                    // Cari foto yang sedang terpilih untuk slide ini
                    const categoryPhotos = photos.filter((p) => p.category === slide.category);
                    let currentSelectedPhoto: PhotoItem | undefined;

                    if (slide.photoId && slide.photoId !== 'auto') {
                      currentSelectedPhoto = photos.find((p) => p.id === slide.photoId);
                    }
                    if (!currentSelectedPhoto && categoryPhotos.length > 0) {
                      currentSelectedPhoto =
                        categoryPhotos.find((p) => p.featured) || categoryPhotos[0];
                    }

                    const isAuto = !slide.photoId || slide.photoId === 'auto';

                    return (
                      <div
                        key={slide.id}
                        className={`p-4 rounded-2xl border transition-all ${
                          slide.enabled
                            ? 'bg-[#121622] border-white/15'
                            : 'bg-black/30 border-white/5 opacity-60'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          {/* Sisi Kiri: Nomor, Status Centang & Nama Kategori */}
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => handleToggleSlideEnabled(slide.id)}
                              className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                                slide.enabled
                                  ? 'bg-amber-500 border-amber-500 text-slate-950 font-bold'
                                  : 'border-white/20 bg-transparent text-transparent hover:border-white/40'
                              }`}
                              title={slide.enabled ? 'Nonaktifkan slide ini' : 'Aktifkan slide ini'}
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>

                            <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center font-mono font-bold text-xs text-amber-400 shrink-0">
                              {String(index + 1).padStart(2, '0')}
                            </div>

                            <div>
                              <div className="flex items-center gap-2">
                                <h5 className="font-editorial text-base text-white font-bold leading-tight">
                                  {slide.category}
                                </h5>
                                {!slide.enabled && (
                                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                                    (Nonaktif)
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-slate-400 font-light block mt-0.5">
                                Tersedia {categoryPhotos.length} karya di kategori ini
                              </span>
                            </div>
                          </div>

                          {/* Sisi Kanan: Pratinjau Foto & Aksi Pemilihan */}
                          <div className="flex items-center gap-2.5 sm:self-center flex-wrap sm:flex-nowrap justify-between sm:justify-end">
                            {/* Kotak Preview Thumbnail Foto Terpilih */}
                            {currentSelectedPhoto ? (
                              <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-black/40 border border-white/10">
                                <img
                                  src={currentSelectedPhoto.imageUrl}
                                  alt={currentSelectedPhoto.title}
                                  className="w-10 h-10 rounded-lg object-cover border border-white/10 shrink-0"
                                />
                                <div className="max-w-[140px] sm:max-w-[180px] text-left">
                                  <span className="text-xs text-white font-medium block truncate leading-tight">
                                    {currentSelectedPhoto.title}
                                  </span>
                                  <span className="text-[10px] text-amber-300/80 font-mono block mt-0.5">
                                    {isAuto ? 'Otomatis (Unggulan)' : 'Foto Spesifik'}
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-500">
                                <ImageIcon className="w-4 h-4" />
                                <span>Belum ada foto</span>
                              </div>
                            )}

                            {/* Tombol Pilih Foto Spesifik */}
                            <button
                              type="button"
                              onClick={() => {
                                setPickingForSlideId(slide.id);
                                setPickerSearchQuery('');
                              }}
                              className="px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider transition-all cursor-pointer hover:border-amber-400 active:scale-95"
                              title="Pilih foto khusus dari kategori ini"
                            >
                              Ganti Foto
                            </button>

                            {/* Tombol Reset ke Otomatis jika foto spesifik aktif */}
                            {!isAuto && (
                              <button
                                type="button"
                                onClick={() => handleResetPhotoToAuto(slide.id)}
                                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                                title="Kembalikan ke pemilihan foto otomatis"
                              >
                                <RotateCcw className="w-3.5 h-3.5" />
                              </button>
                            )}

                            {/* Tombol Urutan (Naik / Turun) */}
                            <div className="flex items-center border border-white/10 rounded-xl overflow-hidden bg-white/[0.02]">
                              <button
                                type="button"
                                onClick={() => handleMoveSlideUp(index)}
                                disabled={index === 0}
                                className="p-1.5 hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
                                title="Geser ke atas"
                              >
                                <ArrowUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleMoveSlideDown(index)}
                                disabled={index === config.slides.length - 1}
                                className="p-1.5 hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer border-l border-white/10"
                                title="Geser ke bawah"
                              >
                                <ArrowDown className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Tombol Hapus Slide */}
                            <button
                              type="button"
                              onClick={() => handleRemoveSlide(slide.id)}
                              className="p-1.5 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                              title="Hapus kategori ini dari slider"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* TOMBOL TAMBAH KATEGORI BARU KE SLIDER */}
                {unaddedCategories.length > 0 && (
                  <div className="pt-2">
                    <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider block mb-2">
                      Tambahkan Kategori Lain ke Slider:
                    </span>
                    <div className="flex items-center gap-2 flex-wrap">
                      {unaddedCategories.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => handleAddCategorySlide(cat)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/40 text-xs text-slate-300 hover:text-amber-300 transition-all cursor-pointer font-medium"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>{cat}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* MODAL FOOTER */}
        <div className="px-6 py-4 border-t border-white/10 bg-white/[0.02] flex items-center justify-between">
          <button
            type="button"
            onClick={handleResetToDefault}
            className="text-xs text-slate-400 hover:text-white hover:underline transition-colors cursor-pointer"
          >
            Reset ke Susunan Bawaan
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-white/15 hover:bg-white/10 text-xs font-semibold tracking-wider text-slate-300 transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] cursor-pointer disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Simpan Pengaturan Slider</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* POPUP DRAWER: PEMILIH FOTO VISUAL UNTUK KATEGORI TERTENTU */}
        {activePickingSlide && (
          <div className="absolute inset-0 z-50 bg-[#0A0D14]/95 backdrop-blur-md flex flex-col p-6 animate-in fade-in duration-200">
            {/* Header Drawer */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-mono text-amber-400 font-bold">
                    Pilih Karya Representatif
                  </span>
                  <span className="text-xs text-slate-400">&bull;</span>
                  <h4 className="font-editorial text-lg text-white font-bold">
                    {activePickingSlide.category}
                  </h4>
                </div>
                <p className="text-xs text-slate-400 font-light mt-0.5">
                  Klik foto di bawah untuk menetapkannya sebagai tampilan slide utama pada kategori ini.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleResetPhotoToAuto(activePickingSlide.id)}
                  className="px-3.5 py-1.5 rounded-xl border border-white/15 hover:bg-white/10 text-xs text-slate-300 font-medium transition-colors cursor-pointer"
                >
                  Gunakan Otomatis (Unggulan)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPickingForSlideId(null);
                    setPickerSearchQuery('');
                  }}
                  className="w-8 h-8 rounded-full border border-white/15 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Kotak Pencarian Foto */}
            <div className="py-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={pickerSearchQuery}
                  onChange={(e) => setPickerSearchQuery(e.target.value)}
                  placeholder={`Cari judul atau lokasi dalam kategori ${activePickingSlide.category}...`}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/50 border border-white/10 text-white placeholder:text-slate-600 text-xs focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
            </div>

            {/* Grid Foto dalam Kategori Terpilih */}
            <div className="flex-1 overflow-y-auto pt-2 pb-4 custom-scrollbar">
              {photosForActivePickingCategory.length === 0 ? (
                <div className="py-16 text-center text-slate-500">
                  <ImageIcon className="w-10 h-10 mx-auto mb-2 opacity-40" />
                  <p className="text-xs">
                    Tidak ada foto yang ditemukan untuk kata kunci ini di kategori {activePickingSlide.category}.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
                  {photosForActivePickingCategory.map((photo) => {
                    const isSelected = activePickingSlide.photoId === photo.id;
                    return (
                      <div
                        key={photo.id}
                        onClick={() => handleSelectPhotoForSlide(activePickingSlide.id, photo.id)}
                        className={`group relative rounded-2xl overflow-hidden border transition-all cursor-pointer aspect-[4/3] bg-black/40 ${
                          isSelected
                            ? 'border-amber-400 ring-2 ring-amber-400/30 scale-[1.02]'
                            : 'border-white/10 hover:border-amber-400/60 hover:scale-[1.01]'
                        }`}
                      >
                        <img
                          src={photo.imageUrl}
                          alt={photo.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-3 flex flex-col justify-between">
                          <div className="flex items-center justify-between">
                            {photo.featured ? (
                              <span className="p-1 rounded-md bg-amber-500/80 text-slate-950">
                                <Star className="w-3 h-3 fill-current" />
                              </span>
                            ) : <span />}

                            {isSelected && (
                              <span className="p-1 rounded-md bg-amber-400 text-slate-950 font-bold shadow-md">
                                <Check className="w-3.5 h-3.5" />
                              </span>
                            )}
                          </div>

                          <div>
                            <span className="text-xs text-white font-medium block truncate">
                              {photo.title}
                            </span>
                            <span className="text-[10px] text-slate-400 block truncate">
                              {photo.location} &bull; {photo.year}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
