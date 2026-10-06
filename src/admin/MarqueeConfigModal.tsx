import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  Star,
  Search,
  CheckSquare,
  Sparkles,
  Gauge,
  Film,
  Save,
  Loader2,
} from 'lucide-react';
import {
  getSiteContent,
  saveSiteContentSection,
  DEFAULT_MARQUEE_CONFIG,
  supabase,
} from '../lib/supabase';
import type { PhotoItem, MarqueeConfig } from '../types/portfolio';

interface MarqueeConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: PhotoItem[];
  onUpdatePhotos: (updated: PhotoItem[]) => void;
  showToast: (msg: string) => void;
}

export const MarqueeConfigModal: React.FC<MarqueeConfigModalProps> = ({
  isOpen,
  onClose,
  photos,
  onUpdatePhotos,
  showToast,
}) => {
  const [speed, setSpeed] = useState<'slow' | 'normal' | 'fast'>('normal');
  const [selectionMode, setSelectionMode] = useState<'featured' | 'manual' | 'all'>('featured');
  const [maxItems, setMaxItems] = useState<number>(24);
  const [customPhotoIds, setCustomPhotoIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCat, setSelectedCat] = useState<string>('Semua');
  const [saving, setSaving] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Muat konfigurasi marquee yang tersimpan
  useEffect(() => {
    if (!isOpen) return;
    async function loadConfig() {
      setLoading(true);
      try {
        const content = await getSiteContent();
        const conf: MarqueeConfig = content.marquee || DEFAULT_MARQUEE_CONFIG;
        setSpeed(conf.speed || 'normal');
        setSelectionMode(conf.selectionMode || 'featured');
        setMaxItems(conf.maxItems || 24);
        setCustomPhotoIds(conf.customPhotoIds || []);
      } catch (err) {
        console.warn('Gagal memuat konfigurasi marquee:', err);
      } finally {
        setLoading(false);
      }
    }
    loadConfig();
  }, [isOpen]);

  if (!isOpen) return null;

  // Daftar kategori unik dari foto yang ada
  const categories = ['Semua', ...Array.from(new Set(photos.map((p) => p.category)))];

  // Filter foto untuk mode pemilihan manual
  const filteredPhotos = photos.filter((p) => {
    const matchCat = selectedCat === 'Semua' ? true : p.category === selectedCat;
    const matchSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const featuredCount = photos.filter((p) => p.featured).length;

  const togglePhotoSelection = (photoId: string) => {
    setCustomPhotoIds((prev) =>
      prev.includes(photoId) ? prev.filter((id) => id !== photoId) : [...prev, photoId]
    );
  };

  const selectAllFiltered = () => {
    const idsToAdd = filteredPhotos.map((p) => p.id);
    setCustomPhotoIds((prev) => Array.from(new Set([...prev, ...idsToAdd])));
  };

  const deselectAllFiltered = () => {
    const idsToRemove = new Set(filteredPhotos.map((p) => p.id));
    setCustomPhotoIds((prev) => prev.filter((id) => !idsToRemove.has(id)));
  };

  // Toggle bintang langsung dari dalam modal
  const handleToggleStar = async (photo: PhotoItem) => {
    const nextFeatured = !photo.featured;
    const updated = photos.map((p) => (p.id === photo.id ? { ...p, featured: nextFeatured } : p));
    onUpdatePhotos(updated);

    if (supabase && !photo.id.startsWith('local-') && !photo.id.startsWith('p-')) {
      try {
        await supabase.from('photos').update({ featured: nextFeatured }).eq('id', photo.id);
      } catch (err) {
        console.warn('Gagal update bintang:', err);
      }
    }
  };

  // Simpan pengaturan
  const handleSave = async () => {
    setSaving(true);
    try {
      const configData: MarqueeConfig = {
        speed,
        selectionMode,
        maxItems,
        customPhotoIds,
      };

      const res = await saveSiteContentSection('marquee' as any, configData);
      if (res.success) {
        showToast('Pengaturan galeri marquee berjalan berhasil disimpan!');
        onClose();
      } else {
        showToast(res.error || 'Gagal menyimpan pengaturan.');
      }
    } catch (err: any) {
      showToast(err.message || 'Terjadi kesalahan sistem.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-[#0D1017] border border-white/15 shadow-[0_20px_70px_rgba(0,0,0,0.85)] overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between shrink-0 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-editorial text-lg sm:text-xl text-white font-medium">
                  Kustomisasi Galeri Marquee Berjalan
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono font-semibold">
                  Live Sync
                </span>
              </div>
              <p className="text-xs text-slate-400 font-light mt-0.5">
                Atur kecepatan gerak agar tenang dan pilih karya spesifik yang tampil di panggung berjalan bawah Hero.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {loading ? (
            <div className="py-16 text-center text-slate-400">
              <Loader2 className="w-7 h-7 text-amber-400 animate-spin mx-auto mb-2" />
              <p className="text-xs">Memuat preferensi marquee...</p>
            </div>
          ) : (
            <>
              {/* Bagian 1: Kecepatan Gerak */}
              <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-semibold text-white flex items-center gap-2">
                      <Gauge className="w-4 h-4 text-amber-400" />
                      <span>Kecepatan Pergerakan Galeri</span>
                    </label>
                    <p className="text-[11px] text-slate-400 font-light mt-0.5">
                      Kecepatan dikunci secara konstan per-pixel agar tidak melaju terlalu kencang berapapun jumlah fotonya.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setSpeed('slow')}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      speed === 'slow'
                        ? 'bg-amber-500/15 border-amber-500/60 text-white shadow-md'
                        : 'bg-black/40 border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-amber-300">Sangat Lambat</span>
                      <span className="text-[10px] font-mono text-slate-400">14 px/s</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Gerakan hening & meditatif. Detail foto sangat mudah diamati.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSpeed('normal')}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      speed === 'normal'
                        ? 'bg-amber-500/15 border-amber-500/60 text-white shadow-md'
                        : 'bg-black/40 border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-amber-400">Normal (Rekomendasi)</span>
                      <span className="text-[10px] font-mono text-slate-400">24 px/s</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Tempo ideal, mengalir lembut, mewah, dan nyaman di mata.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSpeed('fast')}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      speed === 'fast'
                        ? 'bg-amber-500/15 border-amber-500/60 text-white shadow-md'
                        : 'bg-black/40 border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-amber-300">Aktif</span>
                      <span className="text-[10px] font-mono text-slate-400">36 px/s</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Tempo sedikit lebih dinamis namun tetap mulus tanpa tersendat.
                    </p>
                  </button>
                </div>
              </div>

              {/* Bagian 2: Mode Pemilihan Foto */}
              <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Mode Pemilihan Foto yang Tampil</span>
                  </label>
                  <p className="text-[11px] text-slate-400 font-light mt-0.5">
                    Tentukan bagaimana foto disaring untuk panggung galeri berjalan.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectionMode('featured')}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      selectionMode === 'featured'
                        ? 'bg-amber-500/15 border-amber-500/60 text-white shadow-md'
                        : 'bg-black/40 border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 text-xs font-bold text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>Foto Berbintang ({featuredCount})</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Otomatis menampilkan foto yang ditandai bintang di arsip.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectionMode('manual')}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      selectionMode === 'manual'
                        ? 'bg-amber-500/15 border-amber-500/60 text-white shadow-md'
                        : 'bg-black/40 border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 text-xs font-bold text-amber-400">
                      <CheckSquare className="w-3.5 h-3.5" />
                      <span>Pilih Manual ({customPhotoIds.length})</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Centang satu per satu foto pilihan spesifik dari 309 arsip.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectionMode('all')}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      selectionMode === 'all'
                        ? 'bg-amber-500/15 border-amber-500/60 text-white shadow-md'
                        : 'bg-black/40 border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 text-xs font-bold text-amber-400">
                      <Film className="w-3.5 h-3.5" />
                      <span>Semua Kategori</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Mengambil kurasi merata dari seluruh genre yang ada.
                    </p>
                  </button>
                </div>

                {/* Batas Maksimal Foto */}
                <div className="pt-2 flex items-center justify-between border-t border-white/[0.08]">
                  <span className="text-xs text-slate-300">Batas Maksimal Karya di Marquee:</span>
                  <div className="flex items-center gap-2">
                    {[12, 16, 20, 24, 30].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setMaxItems(num)}
                        className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                          maxItems === num
                            ? 'bg-amber-500 text-slate-950 font-bold'
                            : 'bg-white/5 text-slate-400 hover:text-white'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bagian 3: Checklist Pemilihan Foto (Khusus Mode Manual) */}
              {selectionMode === 'manual' && (
                <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-semibold text-white">
                        Daftar Pilihan Foto ({customPhotoIds.length} Karya Terpilih)
                      </h4>
                      <p className="text-[11px] text-slate-400 font-light">
                        Klik pada kartu foto untuk memilih atau membatalkan pilihan.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={selectAllFiltered}
                        className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 transition-colors"
                      >
                        Pilih Semua Filter ({filteredPhotos.length})
                      </button>
                      <button
                        type="button"
                        onClick={deselectAllFiltered}
                        className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-400 transition-colors"
                      >
                        Reset Filter
                      </button>
                    </div>
                  </div>

                  {/* Filter & Search Bar */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                    <div className="relative flex-1">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari judul foto..."
                        className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-black/60 border border-white/10 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setSelectedCat(cat)}
                          className={`px-3 py-1 rounded-lg text-[11px] whitespace-nowrap transition-colors cursor-pointer ${
                            selectedCat === cat
                              ? 'bg-amber-500 text-slate-950 font-semibold'
                              : 'bg-white/5 text-slate-400 hover:text-white'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Photo Grid Checklist */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-[380px] overflow-y-auto pr-1">
                    {filteredPhotos.map((photo) => {
                      const isSelected = customPhotoIds.includes(photo.id);
                      return (
                        <div
                          key={photo.id}
                          onClick={() => togglePhotoSelection(photo.id)}
                          className={`relative rounded-xl overflow-hidden aspect-[4/3] group cursor-pointer border transition-all ${
                            isSelected
                              ? 'border-amber-400 ring-2 ring-amber-400/30'
                              : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/30'
                          }`}
                        >
                          <img
                            src={photo.imageUrl}
                            alt={photo.title}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 flex flex-col justify-between p-2">
                            <div className="flex items-center justify-between">
                              <span
                                className={`w-5 h-5 rounded-md flex items-center justify-center text-xs ${
                                  isSelected
                                    ? 'bg-amber-500 text-slate-950 font-bold'
                                    : 'bg-black/60 text-white/40'
                                }`}
                              >
                                {isSelected ? <Check className="w-3.5 h-3.5" /> : null}
                              </span>
                            </div>

                            <div className="truncate">
                              <span className="text-[10px] text-white font-medium truncate block leading-tight">
                                {photo.title}
                              </span>
                              <span className="text-[9px] text-amber-300/80 font-mono truncate block">
                                {photo.category}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Bagian 4: Preview Foto Berbintang Saat Ini (Jika Mode Featured) */}
              {selectionMode === 'featured' && (
                <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-semibold text-white flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
                        <span>Koleksi Foto Berbintang Saat Ini ({featuredCount} Foto)</span>
                      </h4>
                      <p className="text-[11px] text-slate-400 font-light mt-0.5">
                        Foto berikut otomatis menjadi panggung marquee berjalan. Klik bintang pada foto untuk membatalkan atau menambah.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5 max-h-[220px] overflow-y-auto pr-1">
                    {photos
                      .filter((p) => p.featured)
                      .map((photo) => (
                        <div
                          key={photo.id}
                          className="relative rounded-xl overflow-hidden aspect-[4/3] group border border-amber-500/40"
                        >
                          <img
                            src={photo.imageUrl}
                            alt={photo.title}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleStar(photo);
                            }}
                            className="absolute top-1 right-1 p-1 rounded-full bg-black/70 text-amber-400 hover:text-red-400 transition-colors"
                            title="Hapus dari Unggulan Marquee"
                          >
                            <Star className="w-3 h-3 fill-current" />
                          </button>
                          <div className="absolute inset-x-0 bottom-0 p-1 bg-black/80 truncate">
                            <span className="text-[9px] text-white truncate block">
                              {photo.title}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between shrink-0 bg-white/[0.02]">
          <span className="text-xs text-slate-400 font-light">
            Pengaturan akan langsung aktif pada website utama setelah disimpan.
          </span>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full border border-white/15 hover:bg-white/10 text-xs text-slate-300 transition-colors cursor-pointer"
            >
              Batal
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] cursor-pointer hover:scale-105"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Simpan Pengaturan</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
