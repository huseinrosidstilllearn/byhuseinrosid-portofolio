import React, { useState, useRef } from 'react';
import {
  X,
  UploadCloud,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Copy,
  Plus,
  Sparkles,
} from 'lucide-react';
import { compressImage } from '../utils/imageCompressor';
import { supabase } from '../lib/supabase';
import { PHOTO_CATEGORIES } from '../data/portfolioData';
import type { PhotoItem, PhotoAspectRatio } from '../types/portfolio';

export interface QueuedPhotoItem {
  id: string;
  file?: File;
  previewUrl: string;
  compressedFile?: File;
  width: number;
  height: number;
  aspectRatio: PhotoAspectRatio;
  originalSizeKb: number;
  compressedSizeKb: number;
  title: string;
  category: string;
  location: string;
  year: string;
  description: string;
  featured: boolean;
}

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPhotoAdded?: (newPhoto: PhotoItem) => void;
  onPhotosAdded?: (newPhotos: PhotoItem[]) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onPhotoAdded,
  onPhotosAdded,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [queuedPhotos, setQueuedPhotos] = useState<QueuedPhotoItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isCompressingBatch, setIsCompressingBatch] = useState(false);
  const [compressionProgress, setCompressionProgress] = useState<{ current: number; total: number } | null>(null);

  // Single URL upload fallback state
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [urlTitle, setUrlTitle] = useState('');
  const [urlCategory, setUrlCategory] = useState<string>('Event Documentation');
  const [urlLocation, setUrlLocation] = useState('Surabaya, Jawa Timur');
  const [urlYear, setUrlYear] = useState(new Date().getFullYear().toString());
  const [urlDescription, setUrlDescription] = useState('');
  const [urlAspectRatio, setUrlAspectRatio] = useState<PhotoAspectRatio>('landscape');
  const [urlFeatured, setUrlFeatured] = useState(false);

  // Upload progress state
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ current: number; total: number } | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const appendFileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const activePhoto = queuedPhotos[currentIndex] || null;

  // Handler proses file banyak sekaligus
  const handleFilesSelect = async (fileList: FileList | File[]) => {
    const filesArray = Array.from(fileList).filter((f) => f.type.startsWith('image/'));
    if (filesArray.length === 0) {
      setStatusMessage({
        type: 'error',
        text: 'Harap pilih file gambar yang valid (JPEG, PNG, WEBP, atau format foto lainnya).',
      });
      return;
    }

    setStatusMessage(null);
    setIsCompressingBatch(true);
    setCompressionProgress({ current: 0, total: filesArray.length });

    const newItems: QueuedPhotoItem[] = [];

    for (let i = 0; i < filesArray.length; i++) {
      const file = filesArray[i];
      setCompressionProgress({ current: i + 1, total: filesArray.length });
      try {
        const result = await compressImage(file, 2400, 0.88);
        const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        const formattedTitle = cleanName
          .split(' ')
          .filter(Boolean)
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ');

        newItems.push({
          id: `q-${Date.now()}-${i}-${Math.random().toString(36).slice(2, 7)}`,
          file,
          previewUrl: result.previewUrl,
          compressedFile: result.file,
          width: result.width,
          height: result.height,
          aspectRatio: result.aspectRatio,
          originalSizeKb: result.originalSizeKb,
          compressedSizeKb: result.compressedSizeKb,
          title: formattedTitle || `Karya Foto ${queuedPhotos.length + i + 1}`,
          category: 'Event Documentation',
          location: 'Surabaya, Jawa Timur',
          year: new Date().getFullYear().toString(),
          description: '',
          featured: false,
        });
      } catch (err: any) {
        console.warn('Gagal memproses foto:', file.name, err);
      }
    }

    setIsCompressingBatch(false);
    setCompressionProgress(null);

    if (newItems.length > 0) {
      setQueuedPhotos((prev) => {
        const combined = [...prev, ...newItems];
        return combined;
      });
      if (queuedPhotos.length === 0) {
        setCurrentIndex(0);
      }
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

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesSelect(e.dataTransfer.files);
    }
  };

  // Update field metadata pada foto yang sedang aktif
  const updateActivePhoto = <K extends keyof QueuedPhotoItem>(field: K, value: QueuedPhotoItem[K]) => {
    setQueuedPhotos((prev) =>
      prev.map((item, idx) => (idx === currentIndex ? { ...item, [field]: value } : item))
    );
  };

  // Hapus foto tertentu dari antrean
  const handleRemovePhoto = (indexToRemove: number) => {
    setQueuedPhotos((prev) => {
      const updated = prev.filter((_, idx) => idx !== indexToRemove);
      if (currentIndex >= updated.length) {
        setCurrentIndex(Math.max(0, updated.length - 1));
      }
      return updated;
    });
  };

  // Terapkan Kategori & Lokasi dari foto aktif ke semua foto dalam antrean
  const applyCommonMetadataToAll = () => {
    if (!activePhoto) return;
    setQueuedPhotos((prev) =>
      prev.map((item) => ({
        ...item,
        category: activePhoto.category,
        location: activePhoto.location,
        year: activePhoto.year,
      }))
    );
    setStatusMessage({
      type: 'success',
      text: `Kategori "${activePhoto.category}" dan Lokasi "${activePhoto.location}" diterapkan ke semua ${queuedPhotos.length} foto. Anda dapat melanjutkan menulis deskripsi unik tiap foto!`,
    });
  };

  // Submit batch foto atau single URL
  const handleSubmitAll = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    // Kasus 1: Antrean foto dari file upload
    if (queuedPhotos.length > 0) {
      // Validasi semua judul wajib ada
      const untitledIdx = queuedPhotos.findIndex((p) => !p.title.trim());
      if (untitledIdx !== -1) {
        setCurrentIndex(untitledIdx);
        setStatusMessage({
          type: 'error',
          text: `Foto ke-${untitledIdx + 1} belum memiliki Judul Karya. Harap lengkapi judul sebelum mengunggah.`,
        });
        return;
      }

      setUploading(true);
      setUploadProgress({ current: 0, total: queuedPhotos.length });
      const savedPhotos: PhotoItem[] = [];

      for (let i = 0; i < queuedPhotos.length; i++) {
        const item = queuedPhotos[i];
        setUploadProgress({ current: i + 1, total: queuedPhotos.length });

        let finalImageUrl = item.previewUrl;

        // 1. Unggah WebP ke Cloudflare R2
        if (item.compressedFile) {
          try {
            const formData = new FormData();
            formData.append('file', item.compressedFile);
            const uploadRes = await fetch('/api/upload', {
              method: 'POST',
              body: formData,
            });
            if (uploadRes.ok) {
              const uploadData = await uploadRes.json();
              if (uploadData.url) finalImageUrl = uploadData.url;
            }
          } catch {
            // Mode dev offline
          }

          // 1b. Fallback ke Supabase Storage
          if (finalImageUrl === item.previewUrl && supabase) {
            try {
              const cleanName = item.compressedFile.name.replace(/[^a-zA-Z0-9.-]/g, '_');
              const storagePath = `${Date.now()}-${i}-${cleanName}`;
              const { data: sData, error: sError } = await supabase.storage
                .from('photos')
                .upload(storagePath, item.compressedFile, {
                  contentType: 'image/webp',
                  upsert: true,
                });
              if (!sError && sData) {
                const { data: pubData } = supabase.storage.from('photos').getPublicUrl(storagePath);
                if (pubData?.publicUrl) finalImageUrl = pubData.publicUrl;
              }
            } catch (storageErr) {
              console.warn('Supabase storage fallback error:', storageErr);
            }
          }
        }

        // 2. Simpan metadata ke Supabase
        const newPhotoData: PhotoItem = {
          id: `local-${Date.now()}-${i}`,
          title: item.title,
          category: item.category,
          imageUrl: finalImageUrl,
          aspectRatio: item.aspectRatio,
          location: item.location || 'Surabaya, Jawa Timur',
          year: item.year || new Date().getFullYear().toString(),
          description: item.description,
          featured: item.featured,
        };

        if (supabase) {
          try {
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

            if (!error && data) {
              newPhotoData.id = data.id;
            }
          } catch (dbErr) {
            console.warn('Gagal menyimpan ke Supabase:', dbErr);
          }
        }

        savedPhotos.push(newPhotoData);
      }

      setUploading(false);
      setUploadProgress(null);
      setStatusMessage({
        type: 'success',
        text: `Berhasil mengunggah dan mempublikasikan ${savedPhotos.length} karya foto!`,
      });

      if (onPhotosAdded) {
        onPhotosAdded(savedPhotos);
      } else if (onPhotoAdded && savedPhotos[0]) {
        savedPhotos.forEach((p) => onPhotoAdded(p));
      }

      setTimeout(() => {
        onClose();
      }, 1000);
      return;
    }

    // Kasus 2: Upload foto via URL manual
    if (customImageUrl) {
      if (!urlTitle.trim()) {
        setStatusMessage({ type: 'error', text: 'Judul karya wajib diisi.' });
        return;
      }

      setUploading(true);
      const newPhotoData: PhotoItem = {
        id: `local-${Date.now()}`,
        title: urlTitle,
        category: urlCategory,
        imageUrl: customImageUrl,
        aspectRatio: urlAspectRatio,
        location: urlLocation || 'Surabaya, Jawa Timur',
        year: urlYear || new Date().getFullYear().toString(),
        description: urlDescription,
        featured: urlFeatured,
      };

      if (supabase) {
        try {
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

          if (!error && data) {
            newPhotoData.id = data.id;
          }
        } catch (dbErr) {
          console.warn('Gagal menyimpan ke Supabase:', dbErr);
        }
      }

      setUploading(false);
      setStatusMessage({ type: 'success', text: 'Karya foto berhasil disimpan!' });

      if (onPhotoAdded) {
        onPhotoAdded(newPhotoData);
      } else if (onPhotosAdded) {
        onPhotosAdded([newPhotoData]);
      }

      setTimeout(() => {
        onClose();
      }, 1000);
      return;
    }

    setStatusMessage({ type: 'error', text: 'Silakan pilih foto terlebih dahulu atau masukkan URL gambar.' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300">
      <div className={`relative w-full ${queuedPhotos.length > 0 ? 'max-w-5xl' : 'max-w-2xl'} max-h-[92vh] overflow-y-auto bento-card p-5 sm:p-8 border border-white/15 shadow-2xl no-scrollbar flex flex-col`}>
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10 shrink-0">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 font-semibold block">
              {queuedPhotos.length > 0
                ? `Antrean Multi-Unggah (${queuedPhotos.length} Foto)`
                : 'Studio Unggah Foto'}
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-white mt-0.5">
              {queuedPhotos.length > 0 ? 'Tinjau & Lengkapi Informasi Foto' : 'Tambah Karya ke Portofolio'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            title="Tutup Modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Status Message */}
        {statusMessage && (
          <div
            className={`mb-5 p-3.5 rounded-xl flex items-start gap-3 text-xs shrink-0 ${
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

        {/* ── TAMPILAN 1: BELUM ADA FOTO DALAM ANTREAN (DROPZONE MULTI-FILE) ── */}
        {queuedPhotos.length === 0 && (
          <div className="space-y-6">
            {/* Multi-file dropzone */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition-all ${
                dragActive
                  ? 'border-amber-400 bg-amber-500/10 scale-[1.01]'
                  : 'border-white/20 hover:border-amber-400/60 bg-black/40'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    handleFilesSelect(e.target.files);
                  }
                }}
                className="hidden"
              />

              {isCompressingBatch ? (
                <div className="py-8 flex flex-col items-center gap-3">
                  <RefreshCw className="w-10 h-10 text-amber-400 animate-spin" />
                  <span className="text-sm font-semibold text-white">
                    Memproses & Mengompresi Foto ke WebP...
                  </span>
                  {compressionProgress && (
                    <span className="text-xs text-amber-300 font-mono">
                      Foto {compressionProgress.current} dari {compressionProgress.total} selesai
                    </span>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
                    <UploadCloud className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-editorial text-xl font-medium text-white">
                      Pilih atau Tarik Banyak Foto Sekaligus
                    </h3>
                    <p className="text-xs text-slate-400 font-light mt-1 max-w-md mx-auto leading-relaxed">
                      Bisa langsung memilih 5, 10, hingga 20+ foto. Foto akan otomatis dikompresi ke WebP resolusi tinggi, lalu Anda dapat mengisi judul dan deskripsi tiap foto satu per satu.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="mt-2 px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(245,158,11,0.25)]"
                  >
                    Buka File Manager (Pilih Banyak Foto)
                  </button>
                </div>
              )}
            </div>

            {/* Separator / Alternative URL input */}
            <div className="pt-4 border-t border-white/[0.08]">
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block mb-3">
                Atau Masukkan 1 URL Gambar Eksternal / Cloudflare R2:
              </span>
              <div className="space-y-4">
                <input
                  type="url"
                  value={customImageUrl}
                  onChange={(e) => setCustomImageUrl(e.target.value)}
                  placeholder="https://photos.byhuseinrosid.my.id/photos/karya-01.webp"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-slate-600 text-xs focus:outline-none focus:border-amber-400 transition-colors"
                />

                {customImageUrl && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1">
                        Judul Karya *
                      </label>
                      <input
                        type="text"
                        value={urlTitle}
                        onChange={(e) => setUrlTitle(e.target.value)}
                        placeholder="Contoh: Senyap di Kaki Bromo"
                        className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1">
                        Kategori
                      </label>
                      <select
                        value={urlCategory}
                        onChange={(e) => setUrlCategory(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs"
                      >
                        {PHOTO_CATEGORIES.filter((c) => c !== 'Semua').map((cat) => (
                          <option key={cat} value={cat} className="bg-[#0E1118]">
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1">
                        Lokasi
                      </label>
                      <input
                        type="text"
                        value={urlLocation}
                        onChange={(e) => setUrlLocation(e.target.value)}
                        placeholder="Contoh: Surabaya, Jawa Timur"
                        className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1">
                        Tahun
                      </label>
                      <input
                        type="text"
                        value={urlYear}
                        onChange={(e) => setUrlYear(e.target.value)}
                        placeholder="2024"
                        className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1">
                        Orientasi
                      </label>
                      <select
                        value={urlAspectRatio}
                        onChange={(e) => setUrlAspectRatio(e.target.value as PhotoAspectRatio)}
                        className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs"
                      >
                        <option value="landscape" className="bg-[#0E1118]">Landscape (Horisontal)</option>
                        <option value="portrait" className="bg-[#0E1118]">Portrait (Vertikal)</option>
                        <option value="square" className="bg-[#0E1118]">Square (1:1)</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={urlFeatured}
                          onChange={(e) => setUrlFeatured(e.target.checked)}
                          className="rounded border-white/20 text-amber-500 focus:ring-0"
                        />
                        <span className="text-xs text-slate-300">Tampilkan sebagai Unggulan (Hero Section)</span>
                      </label>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1">
                        Deskripsi Karya
                      </label>
                      <textarea
                        rows={2}
                        value={urlDescription}
                        onChange={(e) => setUrlDescription(e.target.value)}
                        placeholder="Catatan atau cerita di balik foto ini..."
                        className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs"
                      />
                    </div>
                    <div className="sm:col-span-2 flex justify-end">
                      <button
                        type="button"
                        onClick={handleSubmitAll}
                        disabled={uploading}
                        className="px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                      >
                        {uploading ? 'Menyimpan...' : 'Simpan Foto URL'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── TAMPILAN 2: ADA ANTREAN FOTO (INSPEKTOR PER FOTO SATU PER SATU) ── */}
        {queuedPhotos.length > 0 && activePhoto && (
          <form onSubmit={handleSubmitAll} className="space-y-6 flex-1 flex flex-col justify-between">
            {/* 1. TOP THUMBNAIL RAIL STRIP */}
            <div className="space-y-2 pb-3 border-b border-white/10">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium flex items-center gap-1.5">
                  <span>Antrean Foto:</span>
                  <strong className="text-amber-400 font-mono">
                    Foto {currentIndex + 1} dari {queuedPhotos.length}
                  </strong>
                </span>

                <div className="flex items-center gap-2">
                  <input
                    ref={appendFileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        handleFilesSelect(e.target.files);
                      }
                    }}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => appendFileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-[11px] text-slate-300 hover:text-white transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-amber-400" />
                    <span>Tambah Foto Lagi</span>
                  </button>
                </div>
              </div>

              {/* Horizontal Thumbnail Slider */}
              <div className="flex items-center gap-2.5 overflow-x-auto pb-2 pt-1 no-scrollbar">
                {queuedPhotos.map((photo, idx) => {
                  const isActive = idx === currentIndex;
                  const hasDetails = photo.description.trim().length > 0;
                  return (
                    <button
                      key={photo.id}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      className={`relative shrink-0 w-20 h-16 sm:w-24 sm:h-18 rounded-xl overflow-hidden border-2 transition-all cursor-pointer group ${
                        isActive
                          ? 'border-amber-400 scale-105 shadow-[0_0_15px_rgba(245,158,11,0.3)] ring-2 ring-amber-400/40'
                          : 'border-white/15 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={photo.previewUrl} alt={photo.title} className="w-full h-full object-cover" />
                      {/* Number badge */}
                      <span className="absolute top-1 left-1 px-1.5 py-0.2 rounded-md bg-black/70 backdrop-blur-sm text-[9px] font-mono text-white">
                        {idx + 1}
                      </span>
                      {/* Indicator if user already provided description */}
                      {hasDetails && (
                        <span className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm" title="Deskripsi terisi" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. SUB-HEADER: QUICK ACTIONS & PREV/NEXT TABS */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/[0.02] p-3 rounded-2xl border border-white/[0.06]">
              {/* Prev / Next buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] disabled:opacity-30 disabled:pointer-events-none text-xs text-white transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Foto Sebelumnya</span>
                </button>

                <span className="text-xs font-mono text-amber-300 font-bold px-2">
                  {currentIndex + 1} / {queuedPhotos.length}
                </span>

                <button
                  type="button"
                  onClick={() => setCurrentIndex((prev) => Math.min(queuedPhotos.length - 1, prev + 1))}
                  disabled={currentIndex === queuedPhotos.length - 1}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] disabled:opacity-30 disabled:pointer-events-none text-xs text-white transition-all cursor-pointer"
                >
                  <span>Foto Berikutnya</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Helper Tools */}
              <div className="flex items-center gap-2">
                {queuedPhotos.length > 1 && (
                  <button
                    type="button"
                    onClick={applyCommonMetadataToAll}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-medium transition-all cursor-pointer"
                    title="Terapkan Kategori & Lokasi foto ini ke semua foto lain"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Samakan Kategori &amp; Lokasi ke Semua</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => handleRemovePhoto(currentIndex)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-300 text-xs transition-all cursor-pointer"
                  title="Hapus foto ini dari antrean"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Hapus Foto Ini</span>
                </button>
              </div>
            </div>

            {/* 3. MAIN INSPECTOR AREA: PREVIEW + PER-PHOTO METADATA FORM */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column (5 cols): Photo Preview & Specs */}
              <div className="lg:col-span-5 space-y-3">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-black/60 border border-white/15 shadow-xl flex items-center justify-center">
                  <img
                    src={activePhoto.previewUrl}
                    alt={activePhoto.title}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono font-bold uppercase">
                      WebP Siap ({activePhoto.compressedSizeKb} KB)
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08] text-[11px] text-slate-400 space-y-1.5">
                  <div className="flex justify-between">
                    <span>Dimensi Asli:</span>
                    <span className="font-mono text-white">{activePhoto.width} &times; {activePhoto.height} px</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ukuran Kompresi:</span>
                    <span className="font-mono text-emerald-400">
                      {activePhoto.compressedSizeKb} KB (Hemat {Math.round(((activePhoto.originalSizeKb - activePhoto.compressedSizeKb) / activePhoto.originalSizeKb) * 100)}%)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Orientasi Terdeteksi:</span>
                    <span className="font-mono text-amber-300 uppercase">{activePhoto.aspectRatio}</span>
                  </div>
                </div>
              </div>

              {/* Right Column (7 cols): Per-Photo Detail Form */}
              <div className="lg:col-span-7 space-y-4">
                {/* Judul Karya */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-slate-300 mb-1.5">
                    Judul Karya Foto #{currentIndex + 1} *
                  </label>
                  <input
                    type="text"
                    required
                    value={activePhoto.title}
                    onChange={(e) => updateActivePhoto('title', e.target.value)}
                    placeholder="Contoh: Gemerlap Panggung Festival"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                {/* Kategori & Orientasi */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-slate-300 mb-1.5">
                      Kategori
                    </label>
                    <select
                      value={activePhoto.category}
                      onChange={(e) => updateActivePhoto('category', e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400 transition-colors"
                    >
                      {PHOTO_CATEGORIES.filter((c) => c !== 'Semua').map((cat) => (
                        <option key={cat} value={cat} className="bg-[#0E1118]">
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-slate-300 mb-1.5">
                      Orientasi Bingkai
                    </label>
                    <select
                      value={activePhoto.aspectRatio}
                      onChange={(e) => updateActivePhoto('aspectRatio', e.target.value as PhotoAspectRatio)}
                      className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400 transition-colors"
                    >
                      <option value="landscape" className="bg-[#0E1118]">Landscape (Horisontal)</option>
                      <option value="portrait" className="bg-[#0E1118]">Portrait (Vertikal)</option>
                      <option value="square" className="bg-[#0E1118]">Square (1:1 Kotak)</option>
                    </select>
                  </div>
                </div>

                {/* Lokasi & Tahun */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-slate-300 mb-1.5">
                      Lokasi Pengambilan
                    </label>
                    <input
                      type="text"
                      value={activePhoto.location}
                      onChange={(e) => updateActivePhoto('location', e.target.value)}
                      placeholder="Surabaya, Jawa Timur"
                      className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-slate-300 mb-1.5">
                      Tahun Karya
                    </label>
                    <input
                      type="text"
                      value={activePhoto.year}
                      onChange={(e) => updateActivePhoto('year', e.target.value)}
                      placeholder="2025"
                      className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Deskripsi Khusus Foto Ini */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-slate-300">
                      Deskripsi &amp; Narasi Foto Ini
                    </label>
                    <span className="text-[10px] text-amber-400/80 font-light">
                      Cerita unik foto #{currentIndex + 1}
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    value={activePhoto.description}
                    onChange={(e) => updateActivePhoto('description', e.target.value)}
                    placeholder="Tuliskan cerita, momen di balik lensa, pencahayaan, atau emosi yang ingin disampaikan pada foto ini..."
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-slate-600 text-xs focus:outline-none focus:border-amber-400 transition-colors leading-relaxed"
                  />
                </div>

                {/* Toggle Unggulan Hero */}
                <div className="pt-2">
                  <label className="inline-flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={activePhoto.featured}
                      onChange={(e) => updateActivePhoto('featured', e.target.checked)}
                      className="w-4 h-4 rounded accent-amber-500 cursor-pointer"
                    />
                    <span>Tandai sebagai Unggulan (Tampil di Showcase Utama &amp; Hero Carousel)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* 4. FOOTER ACTIONS & BATCH SUBMIT */}
            <div className="pt-5 mt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Kosongkan semua antrean foto?')) {
                    setQueuedPhotos([]);
                    setCurrentIndex(0);
                  }
                }}
                disabled={uploading}
                className="text-xs text-slate-400 hover:text-red-400 transition-colors cursor-pointer text-center sm:text-left"
              >
                Batalkan Antrean
              </button>

              <div className="flex items-center gap-3">
                {uploading && uploadProgress && (
                  <div className="flex items-center gap-2 text-xs text-amber-300">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Mengunggah {uploadProgress.current} dari {uploadProgress.total}...</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={uploading || queuedPhotos.length === 0}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(245,158,11,0.3)] hover:scale-105 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>
                    {uploading
                      ? 'Sedang Mempublikasikan...'
                      : `Unggah & Publikasikan Semua (${queuedPhotos.length} Foto)`}
                  </span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
