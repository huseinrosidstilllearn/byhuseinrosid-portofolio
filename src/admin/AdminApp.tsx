import React, { useState, useEffect } from 'react';
import {
  Plus,
  Trash2,
  Star,
  ExternalLink,
  LogOut,
  Image as ImageIcon,
  MapPin,
  Calendar,
  Search,
  Database,
  CheckCircle2,
} from 'lucide-react';
import { AdminLogin } from './AdminLogin';
import { UploadModal } from './UploadModal';
import { supabase, getPhotos } from '../lib/supabase';
import type { PhotoItem } from '../types/portfolio';

export const AdminApp: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>('husein@admin');
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Periksa sesi login Supabase saat pertama dimuat
  useEffect(() => {
    async function checkSession() {
      if (supabase) {
        try {
          const { data } = await supabase.auth.getSession();
          if (data.session) {
            setIsAuthenticated(true);
            setUserEmail(data.session.user.email || 'Admin');
          }
        } catch {
          // ignore error
        }
      }
      loadPhotos();
    }
    checkSession();
  }, []);

  async function loadPhotos() {
    setLoading(true);
    const data = await getPhotos();
    setPhotos(data);
    setLoading(false);
  }

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setIsAuthenticated(false);
  };

  const handleToggleFeatured = async (photo: PhotoItem) => {
    const nextFeatured = !photo.featured;

    // Update state lokal
    setPhotos((prev) =>
      prev.map((p) => (p.id === photo.id ? { ...p, featured: nextFeatured } : p))
    );

    if (supabase && !photo.id.startsWith('local-') && !photo.id.startsWith('p-')) {
      try {
        await supabase
          .from('photos')
          .update({ featured: nextFeatured })
          .eq('id', photo.id);
      } catch (err) {
        console.warn('Gagal sinkron status unggulan ke Supabase:', err);
      }
    }

    showToast(
      nextFeatured
        ? `"${photo.title}" ditandai sebagai Unggulan Hero`
        : `"${photo.title}" dihapus dari Unggulan`
    );
  };

  const handleDeletePhoto = async (photo: PhotoItem) => {
    if (!window.confirm(`Yakin ingin menghapus karya "${photo.title}" dari galeri?`)) {
      return;
    }

    // Hapus dari state lokal
    setPhotos((prev) => prev.filter((p) => p.id !== photo.id));

    if (supabase && !photo.id.startsWith('local-') && !photo.id.startsWith('p-')) {
      try {
        await supabase.from('photos').delete().eq('id', photo.id);
      } catch (err) {
        console.warn('Gagal menghapus dari Supabase:', err);
      }
    }

    showToast(`"${photo.title}" berhasil dihapus.`);
  };

  const handlePhotoAdded = (newPhoto: PhotoItem) => {
    setPhotos((prev) => [newPhoto, ...prev]);
    showToast(`Karya baru "${newPhoto.title}" berhasil ditambahkan!`);
  };

  // Filter & Pencarian
  const filteredPhotos = photos.filter((p) => {
    const matchCategory =
      selectedCategory === 'Semua'
        ? true
        : selectedCategory === 'Unggulan'
        ? p.featured
        : p.category === selectedCategory;

    const matchSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.year.toLowerCase().includes(searchQuery.toLowerCase());

    return matchCategory && matchSearch;
  });

  // Hitung Statistik
  const stats = {
    total: photos.length,
    lanskap: photos.filter((p) => p.category === 'Lanskap').length,
    dokumenter: photos.filter((p) => p.category === 'Dokumenter').length,
    portrait: photos.filter((p) => p.category === 'Portrait').length,
    komersial: photos.filter((p) => p.category === 'Komersial').length,
    featured: photos.filter((p) => p.featured).length,
  };

  // Jika belum login, tampilkan layar login
  if (!isAuthenticated) {
    return (
      <AdminLogin
        onLoginSuccess={(email) => {
          setUserEmail(email);
          setIsAuthenticated(true);
        }}
        onBypassDemo={() => {
          setUserEmail('demo@byhuseinrosid.my.id');
          setIsAuthenticated(true);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-[#F8FAFC] flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      {/* Background Architectural Grid Pattern */}
      <div className="fixed inset-0 bg-grid-pattern opacity-25 pointer-events-none z-0" />

      {/* TOPBAR */}
      <header className="sticky top-0 z-40 bg-[#0E1118]/85 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-editorial font-bold text-sm">
            HR
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-editorial text-base font-bold text-white tracking-tight leading-none">
                By Husein Rosid
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-[9px] font-mono uppercase font-bold text-amber-300">
                Portal Admin
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-light block leading-none mt-1">
              Login: {userEmail}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] cursor-pointer hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Unggah Karya</span>
          </button>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-white/15 hover:bg-white/10 text-xs text-slate-300 font-medium transition-all"
            title="Buka Website Publik di Tab Baru"
          >
            <span>Lihat Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={handleLogout}
            className="w-9 h-9 rounded-full border border-white/10 hover:bg-red-500/20 hover:border-red-500/40 text-slate-400 hover:text-red-300 flex items-center justify-center transition-colors cursor-pointer"
            title="Keluar (Logout)"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0E1118] border border-amber-500/40 shadow-2xl px-5 py-3 rounded-2xl flex items-center gap-3 text-xs text-white animate-in slide-in-from-bottom duration-300">
          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        {/* STATS METRIC SUMMARY */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          <div className="bento-card p-4 text-center">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">
              Total Arsip
            </span>
            <span className="font-editorial text-2xl font-bold text-white mt-1 block">
              {stats.total}
            </span>
          </div>

          <div className="bento-card p-4 text-center">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">
              Lanskap
            </span>
            <span className="font-editorial text-2xl font-bold text-amber-400 mt-1 block">
              {stats.lanskap}
            </span>
          </div>

          <div className="bento-card p-4 text-center">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">
              Dokumenter
            </span>
            <span className="font-editorial text-2xl font-bold text-slate-200 mt-1 block">
              {stats.dokumenter}
            </span>
          </div>

          <div className="bento-card p-4 text-center">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">
              Portrait
            </span>
            <span className="font-editorial text-2xl font-bold text-slate-200 mt-1 block">
              {stats.portrait}
            </span>
          </div>

          <div className="bento-card p-4 text-center">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">
              Komersial
            </span>
            <span className="font-editorial text-2xl font-bold text-slate-200 mt-1 block">
              {stats.komersial}
            </span>
          </div>

          <div className="bento-card p-4 text-center border-amber-500/30">
            <span className="text-[10px] uppercase tracking-wider text-amber-400 font-semibold block">
              Unggulan Hero
            </span>
            <span className="font-editorial text-2xl font-bold text-amber-400 mt-1 block">
              {stats.featured}
            </span>
          </div>
        </div>

        {/* CONTROLS: CATEGORIES, SEARCH & REFRESH */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.08]">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar p-1 rounded-full bg-white/[0.03] border border-white/10 w-fit max-w-full">
            {['Semua', 'Lanskap', 'Dokumenter', 'Portrait', 'Komersial', 'Unggulan'].map(
              (cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                        : 'text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                );
              }
            )}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari judul, lokasi, tahun..."
              className="w-full pl-9 pr-4 py-2 rounded-full bg-black/40 border border-white/10 text-white placeholder:text-slate-600 text-xs focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>
        </div>

        {/* PHOTO GALLERY GRID */}
        {loading ? (
          <div className="py-20 text-center text-slate-400">
            <Database className="w-8 h-8 text-amber-400 animate-pulse mx-auto mb-2" />
            <span className="text-xs">Memuat arsip foto dari Supabase...</span>
          </div>
        ) : filteredPhotos.length === 0 ? (
          <div className="py-16 text-center bento-card p-12">
            <ImageIcon className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="font-editorial text-lg text-white font-medium">
              Tidak ada foto ditemukan
            </h3>
            <p className="text-xs text-slate-400 font-light mt-1 mb-6">
              Tidak ada karya yang sesuai dengan kategori atau pencarian ini.
            </p>
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider"
            >
              <Plus className="w-4 h-4" />
              <span>Unggah Foto Baru</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                className="bento-card overflow-hidden group flex flex-col justify-between border border-white/10 hover:border-amber-400/40 transition-all duration-300"
              >
                {/* Photo Thumbnail */}
                <div className="relative aspect-[4/3] overflow-hidden bg-black/50">
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Badges on Top */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[9px] font-bold uppercase tracking-wider text-amber-300">
                      {photo.category}
                    </span>

                    <button
                      onClick={() => handleToggleFeatured(photo)}
                      className={`w-7 h-7 rounded-full backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer ${
                        photo.featured
                          ? 'bg-amber-500 text-slate-950 shadow-md'
                          : 'bg-black/60 text-white/60 hover:text-amber-400'
                      }`}
                      title={
                        photo.featured
                          ? 'Foto Unggulan Hero (Klik untuk batalkan)'
                          : 'Jadikan Foto Unggulan Hero'
                      }
                    >
                      <Star
                        className="w-3.5 h-3.5"
                        fill={photo.featured ? 'currentColor' : 'none'}
                      />
                    </button>
                  </div>
                </div>

                {/* Metadata Details */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-editorial text-base text-white font-medium truncate mb-1">
                      {photo.title}
                    </h4>

                    <div className="space-y-1 text-xs text-slate-400 font-light">
                      <div className="flex items-center gap-1.5 truncate">
                        <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                        <span className="truncate">{photo.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-slate-500 shrink-0" />
                        <span>{photo.year}</span>
                        <span>&bull;</span>
                        <span className="uppercase font-mono text-[10px] text-slate-400">
                          {photo.aspectRatio}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between">
                    <a
                      href={photo.imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-amber-400 hover:underline flex items-center gap-1"
                    >
                      <span>Lihat Asli</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>

                    <button
                      onClick={() => handleDeletePhoto(photo)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                      title="Hapus foto dari galeri"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* UPLOAD MODAL */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onPhotoAdded={handlePhotoAdded}
      />
    </div>
  );
};
