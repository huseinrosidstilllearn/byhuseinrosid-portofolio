import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  badge?: string;
  icon?: React.ReactNode;
  description?: string;
  disabled?: boolean;
}

export type SelectOptionItem = string | SelectOption;

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOptionItem[];
  placeholder?: string;
  className?: string;
  buttonClassName?: string;
  dropdownClassName?: string;
  variant?: 'default' | 'amber' | 'compact' | 'subtle';
  disabled?: boolean;
  align?: 'left' | 'right';
  icon?: React.ReactNode;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Pilih salah satu...',
  className = '',
  buttonClassName = '',
  dropdownClassName = '',
  variant = 'default',
  disabled = false,
  align = 'left',
  icon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalisasi opsi array baik berupa string[] maupun SelectOption[]
  const normalizedOptions: SelectOption[] = options.map((opt) => {
    if (typeof opt === 'string') {
      return { value: opt, label: opt };
    }
    return opt;
  });

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);

  // Tutup dropdown saat klik di luar komponen atau tekan ESC
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Styling varian tombol
  const getButtonVariantStyle = () => {
    switch (variant) {
      case 'amber':
        return 'bg-amber-500/10 dark:bg-black/85 border-amber-500/40 dark:border-amber-500/60 text-amber-700 dark:text-amber-300 font-bold hover:border-amber-400 focus:border-amber-400 shadow-sm dark:shadow-lg';
      case 'compact':
        return 'bg-black/[0.04] dark:bg-white/[0.04] border-black/10 dark:border-white/10 text-slate-800 dark:text-white font-medium hover:border-black/20 dark:hover:border-white/20 hover:bg-black/[0.08] dark:hover:bg-white/[0.08] py-1.5 px-3 text-xs';
      case 'subtle':
        return 'bg-black/[0.03] dark:bg-black/30 border-black/10 dark:border-white/10 text-slate-700 dark:text-slate-300 font-medium hover:border-amber-500/40 hover:text-slate-900 dark:hover:text-white py-2 px-3 text-xs';
      case 'default':
      default:
        return 'bg-white dark:bg-black/50 border-black/15 dark:border-white/15 text-slate-900 dark:text-white font-medium hover:border-amber-500/50 focus:border-amber-400 shadow-sm dark:shadow-inner';
    }
  };

  return (
    <div ref={containerRef} className={`relative select-none ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between gap-2.5 px-3.5 py-2.5 rounded-xl border text-xs transition-all duration-200 cursor-pointer focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed ${getButtonVariantStyle()} ${
          isOpen ? 'ring-2 ring-amber-500/30 border-amber-500/80' : ''
        } ${buttonClassName}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2 truncate text-left">
          {icon && <span className="shrink-0 text-amber-500 dark:text-amber-400">{icon}</span>}
          {selectedOption?.icon && (
            <span className="shrink-0">{selectedOption.icon}</span>
          )}
          <span className={`truncate ${!selectedOption ? 'text-slate-400 dark:text-slate-500' : ''}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          {selectedOption?.badge && (
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 font-mono font-bold border border-amber-500/30 shrink-0">
              {selectedOption.badge}
            </span>
          )}
        </div>

        <ChevronDown
          className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
            variant === 'amber' ? 'text-amber-500 dark:text-amber-400' : 'text-slate-400'
          } ${isOpen ? 'rotate-180 text-amber-500 dark:text-amber-400' : ''}`}
        />
      </button>

      {/* Floating Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          className={`absolute z-50 mt-1.5 w-full min-w-[200px] max-h-60 overflow-y-auto rounded-2xl bg-white/95 dark:bg-[#0E1118]/95 backdrop-blur-xl border border-black/10 dark:border-amber-500/30 p-1.5 shadow-[0_12px_36px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.85)] animate-in fade-in zoom-in-95 duration-150 custom-scrollbar ${
            align === 'right' ? 'right-0' : 'left-0'
          } ${dropdownClassName}`}
        >
          {normalizedOptions.length === 0 ? (
            <div className="px-3 py-2 text-center text-xs text-slate-500">
              Tidak ada opsi tersedia
            </div>
          ) : (
            normalizedOptions.map((option) => {
              const isSelected = option.value === value;
              return (
                <div
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    if (option.disabled) return;
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`flex items-center justify-between gap-2.5 px-3 py-2 rounded-xl text-xs transition-all duration-150 ${
                    option.disabled
                      ? 'opacity-40 cursor-not-allowed text-slate-500'
                      : isSelected
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md cursor-pointer'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-black/[0.05] dark:hover:bg-white/[0.08] hover:text-slate-950 dark:hover:text-white cursor-pointer'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    {option.icon && (
                      <span className="shrink-0">{option.icon}</span>
                    )}
                    <div className="truncate text-left">
                      <span className="block truncate">{option.label}</span>
                      {option.description && (
                        <span
                          className={`text-[10px] block truncate ${
                            isSelected ? 'text-slate-900/80 font-normal' : 'text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          {option.description}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {option.badge && (
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-bold ${
                          isSelected
                            ? 'bg-slate-950 text-amber-300'
                            : 'bg-black/5 dark:bg-white/10 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {option.badge}
                      </span>
                    )}
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 stroke-[2.5] shrink-0" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
