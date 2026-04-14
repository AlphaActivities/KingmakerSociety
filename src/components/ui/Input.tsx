import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, className = '', id, ...props }: InputProps) {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;
  const errorId = `${inputId}-error`;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-semibold text-[#FFC300] mb-2">
          {label}
        </label>
      )}
      <input
        id={inputId}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? errorId : undefined}
        className={`w-full px-4 py-3 bg-[#2B2B2B]/80 border-2 border-[#3B3B3B] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FFC300] focus:ring-4 focus:ring-[#FFC300]/30 focus:bg-[#2B2B2B] focus:shadow-[0_0_20px_rgba(255,195,0,0.15)] transition-all duration-300 ${className}`}
        {...props}
      />
      {error && (
        <p id={errorId} className="mt-1 text-sm text-[#D11F2A]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
