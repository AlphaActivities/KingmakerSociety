import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Search, Check } from 'lucide-react';

export interface PremiumSelectOption {
  value: string;
  label: string;
  description?: string;
  badge?: string;
}

interface DropdownPos {
  top: number;
  left: number;
  width: number;
  openUpward: boolean;
}

interface PremiumSelectProps {
  label?: string;
  placeholder?: string;
  options: PremiumSelectOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  searchable?: boolean;
  id?: string;
}

export default function PremiumSelect({
  label,
  placeholder = 'Select an option',
  options,
  value,
  onChange,
  error,
  required,
  searchable = false,
  id,
}: PremiumSelectProps) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [dropdownPos, setDropdownPos] = useState<DropdownPos | null>(null);
  const revealTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const inputId = id || `premium-select-${label?.toLowerCase().replace(/\s+/g, '-') ?? Math.random()}`;

  const displayOptions = options.filter((o) => o.value !== '');
  const selected = displayOptions.find((o) => o.value === value);

  const filtered = search.trim()
    ? displayOptions.filter((o) =>
        [o.label, o.description ?? '', o.badge ?? '']
          .join(' ')
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    : displayOptions;

  const DROPDOWN_HEIGHT = 280;
  const GAP = 8;

  const calculatePosition = () => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const openUpward = spaceBelow < DROPDOWN_HEIGHT + GAP && spaceAbove > spaceBelow;

    setDropdownPos({
      top: openUpward
        ? rect.top + window.scrollY - DROPDOWN_HEIGHT - GAP
        : rect.bottom + window.scrollY + GAP,
      left: rect.left + window.scrollX,
      width: rect.width,
      openUpward,
    });
  };

  const handleOpen = () => {
    if (revealTimerRef.current) clearTimeout(revealTimerRef.current);

    calculatePosition();
    setOpen(true);
    setVisible(false);

    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const openUpward = spaceBelow < DROPDOWN_HEIGHT + GAP && rect.top > spaceBelow;
    let scrollNeeded = false;

    if (openUpward) {
      const scrollAmount = rect.top - (window.innerHeight / 2) + rect.height / 2;
      if (Math.abs(scrollAmount) > 4) {
        scrollNeeded = true;
        window.scrollBy({ top: scrollAmount - rect.height / 2, behavior: 'smooth' });
      }
    } else {
      const needed = rect.bottom + DROPDOWN_HEIGHT + GAP;
      if (needed > window.innerHeight) {
        scrollNeeded = true;
        window.scrollBy({ top: needed - window.innerHeight + 16, behavior: 'smooth' });
      }
    }

    const delay = scrollNeeded ? 420 : 0;
    revealTimerRef.current = setTimeout(() => {
      calculatePosition();
      setVisible(true);
    }, delay);
  };

  const handleToggle = () => {
    if (open) {
      if (revealTimerRef.current) clearTimeout(revealTimerRef.current);
      setOpen(false);
      setVisible(false);
      setSearch('');
    } else {
      handleOpen();
    }
  };

  useEffect(() => {
    if (open && searchable && searchRef.current) {
      searchRef.current.focus();
    }
  }, [open, searchable]);

  useEffect(() => {
    if (!open) return;

    const handleOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const insideContainer = containerRef.current?.contains(target);
      const insideDropdown = dropdownRef.current?.contains(target);
      if (!insideContainer && !insideDropdown) {
        if (revealTimerRef.current) clearTimeout(revealTimerRef.current);
        setOpen(false);
        setVisible(false);
        setSearch('');
      }
    };

    const handleScroll = () => {
      calculatePosition();
    };

    document.addEventListener('mousedown', handleOutside);
    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleOutside);
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleScroll);
    };
  }, [open]);

  const handleSelect = (opt: PremiumSelectOption) => {
    onChange(opt.value);
    setOpen(false);
    setSearch('');
  };

  return (
    <div className="w-full" ref={containerRef}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-semibold text-[#FFC300] mb-2"
        >
          {label}
          {required && <span className="text-[#D11F2A] ml-1">*</span>}
        </label>
      )}

      <button
        ref={buttonRef}
        id={inputId}
        type="button"
        onClick={handleToggle}
        className={`w-full px-4 py-3 bg-[#2B2B2B]/80 border-2 rounded-lg text-left flex items-center justify-between gap-2 transition-all duration-300 focus:outline-none text-base ${
          open
            ? 'border-[#FFC300] ring-4 ring-[#FFC300]/30 bg-[#2B2B2B] shadow-[0_0_20px_rgba(255,195,0,0.15)]'
            : error
            ? 'border-[#D11F2A]'
            : 'border-[#3B3B3B] hover:border-[#FFC300]/50'
        }`}
      >
        <span className="min-w-0 flex-1">
          {selected ? (
            <span className="flex items-center gap-2">
              <span className="text-white font-medium truncate">{selected.label}</span>
              {selected.badge && (
                <span className="text-[#FFC300] text-xs font-mono shrink-0">{selected.badge}</span>
              )}
            </span>
          ) : (
            <span className="text-gray-500">{placeholder}</span>
          )}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {error && (
        <p className="mt-1 text-sm text-[#D11F2A]" role="alert">
          {error}
        </p>
      )}

      {open && dropdownPos &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: 'absolute',
              top: dropdownPos.top,
              left: dropdownPos.left,
              width: dropdownPos.width,
              zIndex: 9999,
              opacity: visible ? 1 : 0,
              pointerEvents: visible ? 'auto' : 'none',
              transition: visible ? 'opacity 150ms ease' : 'none',
            }}
            className={`bg-[#1B1B1B] border-2 border-[#FFC300]/30 shadow-[0_8px_40px_rgba(0,0,0,0.85)] overflow-hidden ${dropdownPos.openUpward ? 'rounded-t-xl rounded-b-lg' : 'rounded-xl'}`}
          >
            {searchable && (
              <div className="p-3 border-b border-[#2B2B2B]">
                <div className="flex items-center gap-2 px-3 py-2 bg-[#2B2B2B] rounded-lg border border-[#3B3B3B] focus-within:border-[#FFC300]/60">
                  <Search className="w-4 h-4 text-gray-400 shrink-0" />
                  <input
                    ref={searchRef}
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search..."
                    className="flex-1 bg-transparent text-white text-base placeholder-gray-500 focus:outline-none"
                  />
                </div>
              </div>
            )}

            <ul className="max-h-64 overflow-y-auto overscroll-contain dropdown-scroll">
              {filtered.length === 0 ? (
                <li className="px-4 py-3 text-gray-500 text-sm text-center">No results found</li>
              ) : (
                filtered.map((opt, idx) => (
                  <li key={opt.value} className={idx !== 0 ? 'border-t border-white/[0.05]' : ''}>
                    <button
                      type="button"
                      onClick={() => handleSelect(opt)}
                      className={`w-full text-left px-4 py-3.5 transition-all duration-150 flex items-start justify-between gap-3 group ${
                        value === opt.value
                          ? 'bg-gradient-to-r from-[#FFC300]/15 to-transparent border-l-2 border-[#FFC300]'
                          : 'border-l-2 border-transparent hover:bg-white/[0.04] hover:border-l-2 hover:border-[#FFC300]/40'
                      }`}
                    >
                      <div className="flex-1">
                        <p className={`text-sm font-semibold leading-snug ${value === opt.value ? 'text-[#FFC300]' : 'text-white group-hover:text-[#FFC300]/90 transition-colors duration-150'}`}>
                          {opt.label}
                        </p>
                        {opt.description && (
                          <p className="text-gray-400 text-xs leading-relaxed mt-1 whitespace-normal">{opt.description}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0 pt-0.5">
                        {opt.badge && (
                          <span className="text-[#FFC300] text-xs font-mono">{opt.badge}</span>
                        )}
                        {value === opt.value && (
                          <Check className="w-3.5 h-3.5 text-[#FFC300]" />
                        )}
                      </div>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>,
          document.body
        )}
    </div>
  );
}
