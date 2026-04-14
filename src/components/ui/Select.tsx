import { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export default function Select({ label, error, options, className = '', id, ...props }: SelectProps) {
  const selectId = id || `select-${label?.toLowerCase().replace(/\s+/g, '-')}`;
  const errorId = `${selectId}-error`;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className="block text-sm font-semibold text-[#FFC300] mb-2">
          {label}
        </label>
      )}
      <select
        id={selectId}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? errorId : undefined}
        className={`w-full px-4 py-3 bg-[#2B2B2B] border border-[#3B3B3B] rounded-lg text-white focus:outline-none focus:border-[#FFC300] focus:ring-2 focus:ring-[#FFC300]/20 transition-all duration-200 ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={errorId} className="mt-1 text-sm text-[#D11F2A]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
