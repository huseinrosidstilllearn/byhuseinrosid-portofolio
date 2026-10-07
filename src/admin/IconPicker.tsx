import React, { useState, useMemo } from 'react';
import { Search, X, Check } from 'lucide-react';
import {
  AVAILABLE_ICONS,
  resolveIconComponent,
  type IconItem,
} from '../utils/iconCatalog';

export { AVAILABLE_ICONS, resolveIconComponent, type IconItem };

interface IconPickerProps {
  value: string;
  onChange: (newIconKey: string) => void;
  className?: string;
  size?: 'sm' | 'md';
}

export const IconPicker: React.FC<IconPickerProps> = ({
  value,
  onChange,
  className = '',
  size = 'md',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [customInput, setCustomInput] = useState('');

  const CurrentIcon = resolveIconComponent(value);

  const filteredIcons = useMemo(() => {
    return AVAILABLE_ICONS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        item.key.toLowerCase().includes(query) ||
        item.label.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleSelect = (key: string) => {
    onChange(key);
    setIsOpen(false);
    setSearchQuery('');
  };

  const handleApplyCustom = () => {
    if (customInput.trim()) {
      onChange(customInput.trim().toLowerCase());
      setIsOpen(false);
      setCustomInput('');
    }
  };

  const buttonSizeClass =
    size === 'sm'
      ? 'w-8 h-8 rounded-lg'
      : 'w-10 h-10 rounded-xl';

  return (
    <>
      {/* Tombol Pemicu Pemilih Ikon (menampilkan SVG yang sedang aktif) */}
      <button
        type="button"
        onClick={() => {
          setCustomInput(value || '');
          setIsOpen(true);
        }}
        className={`${buttonSizeClass} bg-white/10 hover:bg-amber-500/20 border border-white/15 hover:border-amber-400/50 flex items-center justify-center transition-all cursor-pointer shadow-sm group relative shrink-0 ${className}`}
        title={`Ganti Ikon SVG (saat ini: ${value || 'camera'})`}
        aria-label={`Pilih Ikon SVG untuk ${value}`}
      >
        <CurrentIcon className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
        <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full border border-black/80" />
      </button>

      {/* Modal Dialog Pemilih Ikon SVG */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div className="w-full max-w-lg bg-[#0E1118] border border-white/15 rounded-3xl shadow-2xl p-6 sm:p-7 flex flex-col max-h-[85vh] space-y-5 animate-in zoom-in-95 duration-200">
            {/* Header Modal */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="font-editorial text-lg sm:text-xl text-white font-medium">
                  Pilih Ikon SVG
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Klik pada ikon visual untuk memilih secara langsung
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Tutup pemilih ikon"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Pencarian dan Filter */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari ikon (misal: camera, wave, sun, book)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400"
                  autoFocus
                />
              </div>

              {/* Kategori Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                {[
                  { id: 'all', label: 'Semua' },
                  { id: 'fotografi', label: 'Fotografi' },
                  { id: 'alam', label: 'Alam' },
                  { id: 'kreatif', label: 'Kreatif' },
                  { id: 'sosial', label: 'Sosial' },
                  { id: 'umum', label: 'Lainnya' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                        : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid Visual Koleksi Ikon SVG */}
            <div className="flex-1 overflow-y-auto pr-1 no-scrollbar min-h-[220px] max-h-[340px]">
              {filteredIcons.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-500">
                  Tidak ada ikon yang cocok dengan kata kunci &quot;{searchQuery}&quot;.
                </div>
              ) : (
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5">
                  {filteredIcons.map((item) => {
                    const IconComp = item.icon;
                    const isSelected =
                      value === item.key ||
                      (item.key === 'waves' && value === 'wave');

                    return (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => handleSelect(item.key)}
                        className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-1.5 border transition-all cursor-pointer group text-center relative ${
                          isSelected
                            ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-md ring-1 ring-amber-400/50'
                            : 'bg-white/[0.04] hover:bg-white/10 border-white/10 hover:border-white/25 text-slate-300 hover:text-white'
                        }`}
                        title={item.label}
                      >
                        <IconComp className="w-5 h-5 group-hover:scale-110 transition-transform text-amber-400" />
                        <span className="text-[10px] leading-tight font-mono truncate max-w-full">
                          {item.key}
                        </span>
                        {isSelected && (
                          <span className="absolute top-1 right-1 w-3 h-3 bg-amber-400 text-slate-950 rounded-full flex items-center justify-center">
                            <Check className="w-2 h-2 stroke-[3]" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Bagian Bawah: Input Manual Alternatif */}
            <div className="pt-3 border-t border-white/10 flex items-center gap-2">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Nama ikon kustom..."
                className="flex-1 px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
              <button
                type="button"
                onClick={handleApplyCustom}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-amber-500 hover:text-slate-950 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Terapkan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
