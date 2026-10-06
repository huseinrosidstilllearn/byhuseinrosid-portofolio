import React from 'react';
import { Check } from 'lucide-react';

interface CustomCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: React.ReactNode;
  description?: string;
  className?: string;
  disabled?: boolean;
}

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onChange,
  label,
  description,
  className = '',
  disabled = false,
}) => {
  return (
    <label
      className={`inline-flex items-start gap-3 select-none cursor-pointer transition-opacity ${
        disabled ? 'opacity-40 cursor-not-allowed' : 'group'
      } ${className}`}
    >
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        disabled={disabled}
        onClick={(e) => {
          e.preventDefault();
          if (!disabled) onChange(!checked);
        }}
        className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all duration-200 mt-0.5 shrink-0 focus:outline-none cursor-pointer active:scale-95 ${
          checked
            ? 'bg-amber-500 border-amber-400 text-slate-950 font-bold shadow-[0_0_12px_rgba(245,158,11,0.35)]'
            : 'bg-black/50 border-white/20 text-transparent hover:border-amber-400/60 hover:bg-black/70'
        }`}
      >
        <Check
          className={`w-3.5 h-3.5 stroke-[3] transition-transform duration-150 ${
            checked ? 'scale-100' : 'scale-50 opacity-0'
          }`}
        />
      </button>

      {(label || description) && (
        <div className="flex flex-col text-left">
          {label && (
            <span
              className={`text-xs transition-colors ${
                checked
                  ? 'text-white font-medium'
                  : 'text-slate-300 group-hover:text-white'
              }`}
            >
              {label}
            </span>
          )}
          {description && (
            <span className="text-[11px] text-slate-400 font-light mt-0.5 leading-relaxed">
              {description}
            </span>
          )}
        </div>
      )}
    </label>
  );
};
