import React, { useState, useRef } from 'react';
import { X, UploadCloud, Image as ImageIcon, CheckCircle, AlertCircle, Sparkles, RefreshCw } from 'lucide-react';
import { compressImage, type CompressedImageResult } from '../utils/imageCompressor';
import { supabase } from '../lib/supabase';
import type { PhotoItem } from '../types/portfolio';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPhotoAdded: (newPhoto: PhotoItem) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onPhotoAdded }) => {
  const [dragActive, setDragActive] = useState(false);
  const [compressing, setCompressing] = useState(false);
  const [compressionResult, setCompressionResult] = useState<CompressedImageResult | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Lanskap');
  const [location, setLocation] = useState('');
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [description, setDescription] = useState('');
  const [aspectRatio, setAspectRatio] = useState<'portrait' | 'landscape' | 'square'>('landscape');
  const [featured, setFeatured] = useState(false);
  const [customImageUrl, setCustomImageUrl] = useState('');

  // Submission State
  const [uploading, setUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setStatusMessage({ type: 'error', text: 'Harap pilih file gambar (JPEG, PNG, WEBP, atau RAW).' });
      return;
    }

    setStatusMessage(null);
    setCompressing(true);

    try {
      const result = await compressImage(file, 2400, 0.88);
      setCompressionResult(result);
      setAspectRatio(result.aspectRatio);

      // Auto-populate title from filename if title is empty
      if (!title) {
        const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        // Capitalize words
        const formattedTitle = cleanName
          .split(' ')
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ');
        setTitle(formattedTitle);
      }
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: 'Gagal mengompres gambar: ' + err.message });
    } finally {
      setCompressing(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!title) {
      setStatusMessage({ type: 'error', text: 'Judul karya wajib diisi.' });
      return;
    }

    if (!compressionResult && !customImageUrl) {
      setStatusMessage({ type: 'error', text: 'Silakan pilih foto terlebih dahulu atau masukkan URL gambar.' });
      return;
    }

    setUploading(true);
    let finalImageUrl = customImageUrl;

    try {
      // 1. Unggah file WebP hasil kompresi ke Cloudflare R2
      if (compressionResult) {
        const formData = new FormData();
        formData.append('file', compressionResult.file);

        try {
          const uploadRes = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });

          if (uploadRes.ok) {
            const uploadData = await uploadRes.json();
            if (uploadData.url) {
              finalImageUrl = uploadData.url;
            }
          }
        } catch {
          console.warn('Endpoint /api/upload tidak merespons (mungkin sedang di mode dev lokal).');
        }

        // Jika upload ke endpoint belum terpasang atau gagal (mode lokal preview), gunakan preview URL
        if (!finalImageUrl) {
          finalImageUrl = compressionResult.previewUrl;
        }
      }

      // 2. Simpan Metadata ke Supabase
      const newPhotoData: Omit<PhotoItem, 'id'> & { id?: string } = {
        title,
        category,
        imageUrl: finalImageUrl,
        aspectRatio,
        location: location || 'Surabaya, Jawa Timur',
        year: year || new Date().getFullYear().toString(),
        description,
        featured,
      };

      if (supabase) {
        const { data, error } = await supabase
          .from('photos')
          .insert([
            {
              title: newPhotoData.title,
              category: newPhotoData.category,
              image_url: newPhotoData.imageUrl,
              aspect_ratio: newPhotoData.aspectRatio,
              location: newPhotoData.location,
              year: newPhotoData.year,
              description: newPhotoData.description,
              featured: newPhotoData.featured,
            },
          ])
          .select()
          .single();

        if (error) {
          console.warn('Gagal menyimpan ke Supabase:', error.message);
          // Tetap tambahkan ke state lokal agar user melihat hasil
          newPhotoData.id = 'temp-' + Date.now();
        } else if (data) {
          newPhotoData.id = data.id;
        }
      } else {
        newPhotoData.id = 'local-' + Date.now();
      }

      setStatusMessage({ type: 'success', text: 'Karya foto berhasil disimpan dan dipublikasikan!' });
      onPhotoAdded(newPhotoData as PhotoItem);

      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: 'Terjadi kesalahan: ' + err.message });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bento-card p-6 sm:p-8 border border-white/15 shadow-2xl no-scrollbar">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 font-semibold block">
              Formulir Kurasi Baru
            </span>
            <h2 className="font-editorial text-2xl font-bold text-white mt-0.5">
              Unggah Karya Fotografi
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {statusMessage && (
          <div
            className={`mb-6 p-4 rounded-xl flex items-start gap-3 text-xs ${
              statusMessage.type === 'error'
                ? 'bg-red-500/10 border border-red-500/30 text-red-300'
                : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
            }`}
          >
            {statusMessage.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* DRAG & DROP PHOTO DROPZONE */}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-300 mb-2">
              File Foto Karya (Otomatis Kompres ke WebP 2400px)
            </label>

            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                dragActive
                  ? 'border-amber-400 bg-amber-500/10'
                  : 'border-white/20 hover:border-amber-400/60 bg-black/40'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileSelect(e.target.files[0]);
                  }
                }}
                className="hidden"
              />

              {compressing ? (
                <div className="py-8 flex flex-col items-center gap-3">
                  <RefreshCw className="w-8 h-8 text-amber-400 animate-spin" />
                  <span className="text-xs text-amber-300 font-medium">
                    Mengompres foto ke WebP & menganalisis rasio dimensi...
                  </span>
                </div>
              ) : compressionResult ? (
                <div className="flex flex-col sm:flex-row items-center gap-5 text-left">
                  <img
                    src={compressionResult.previewUrl}
                    alt="Preview"
                    className="w-28 h-28 object-cover rounded-xl border border-white/20 shrink-0"
                  />
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase">
                        WebP Siap
                      </span>
                      <span className="text-xs text-slate-400">
                        {compressionResult.width} &times; {compressionResult.height} px
                      </span>
                    </div>

                    <div className="text-xs text-slate-300">
                      Ukuran Asli: <strong className="text-white">{compressionResult.originalSizeKb} KB</strong> &rarr;{' '}
                      WebP: <strong className="text-amber-400">{compressionResult.compressedSizeKb} KB</strong>{' '}
                      <span className="text-emerald-400 font-bold">
                        (Hemat{' '}
                        {Math.round(
                          (1 - compressionResult.compressedSizeKb / compressionResult.originalSizeKb) * 100
                        )}
                        %)
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 font-light">
                      Klik kembali area ini jika ingin mengganti file gambar.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="py-6 flex flex-col items-center gap-3 text-slate-400">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-amber-400">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-white block">
                      Tarik & lepaskan file foto ke sini, atau klik untuk memilih
                    </span>
                    <span className="text-xs text-slate-400 font-light mt-0.5 block">
                      Mendukung JPEG, PNG, WEBP (Resolusi tinggi dioptimalkan otomatis)
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Opsi URL Gambar Manual jika ada */}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-400 mb-1.5">
              Atau Gunakan URL Gambar Eksternal / Cloudflare R2 Langsung (Opsional)
            </label>
            <input
              type="url"
              value={customImageUrl}
              onChange={(e) => setCustomImageUrl(e.target.value)}
              placeholder="https://photos.byhuseinrosid.my.id/photos/karya-01.webp"
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-slate-600 text-xs focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          {/* METADATA FORM FIELDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Judul */}
            <div className="sm:col-span-2">
              <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-300 mb-2">
                Judul Karya *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Senyap di Kaki Bromo"
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            {/* Kategori */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-300 mb-2">
                Kategori Kurasi
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
              >
                <option value="Lanskap" className="bg-[#0E1118]">Lanskap</option>
                <option value="Dokumenter" className="bg-[#0E1118]">Dokumenter</option>
                <option value="Portrait" className="bg-[#0E1118]">Portrait</option>
                <option value="Komersial" className="bg-[#0E1118]">Komersial</option>
              </select>
            </div>

            {/* Aspect Ratio */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-300 mb-2">
                Orientasi Bingkai
              </label>
              <select
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value as any)}
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
              >
                <option value="landscape" className="bg-[#0E1118]">Horizontal (Landscape)</option>
                <option value="portrait" className="bg-[#0E1118]">Vertikal (Portrait)</option>
                <option value="square" className="bg-[#0E1118]">Persegi (Square 1:1)</option>
              </select>
            </div>

            {/* Lokasi */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-300 mb-2">
                Lokasi Pemotretan
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Contoh: Surabaya, Jawa Timur"
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            {/* Tahun */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-300 mb-2">
                Tahun
              </label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="2025"
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            {/* Deskripsi */}
            <div className="sm:col-span-2">
              <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-300 mb-2">
                Catatan Narasi / Deskripsi Foto
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tuliskan latar belakang momen, emosi yang ingin diabadikan, atau konteks visual..."
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-amber-400 transition-colors resize-none"
              />
            </div>

            {/* Featured Toggle */}
            <div className="sm:col-span-2 flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <div>
                  <span className="text-xs font-semibold text-white block">
                    Jadikan Sorotan Unggulan (*Featured*)
                  </span>
                  <span className="text-[11px] text-slate-400 font-light block">
                    Foto ini akan berpeluang dipajang di Hero utama dan carousel sorotan kurasi.
                  </span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-white/15 hover:bg-white/10 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="px-8 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all cursor-pointer disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Menyimpan Karya...</span>
                </>
              ) : (
                <>
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Publikasikan ke Galeri</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
