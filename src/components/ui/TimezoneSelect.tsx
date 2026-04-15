import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Search, Clock } from 'lucide-react';

interface TimezoneOption {
  value: string;
  label: string;
  offset: string;
  cities: string;
}

const TIMEZONES: TimezoneOption[] = [
  { value: 'Pacific/Honolulu', label: 'Hawaii Time', offset: 'UTC-10', cities: 'Honolulu, Hilo' },
  { value: 'America/Anchorage', label: 'Alaska Time', offset: 'UTC-9', cities: 'Anchorage, Fairbanks, Juneau' },
  { value: 'America/Los_Angeles', label: 'Pacific Time', offset: 'UTC-8/-7', cities: 'Los Angeles, San Francisco, Seattle, Las Vegas, Portland, San Diego' },
  { value: 'America/Denver', label: 'Mountain Time', offset: 'UTC-7/-6', cities: 'Denver, Salt Lake City, Phoenix, Albuquerque, Boise' },
  { value: 'America/Chicago', label: 'Central Time', offset: 'UTC-6/-5', cities: 'Chicago, Houston, Dallas, Nashville, Minneapolis, New Orleans, Kansas City' },
  { value: 'America/New_York', label: 'Eastern Time', offset: 'UTC-5/-4', cities: 'New York, Miami, Atlanta, Boston, Philadelphia, Detroit, Charlotte' },
  { value: 'America/Halifax', label: 'Atlantic Time', offset: 'UTC-4/-3', cities: 'Halifax, Moncton, Saint John' },
  { value: 'America/St_Johns', label: 'Newfoundland Time', offset: 'UTC-3:30', cities: "St. John's" },
  { value: 'America/Sao_Paulo', label: 'Brazil Time', offset: 'UTC-3', cities: 'São Paulo, Rio de Janeiro, Brasília, Fortaleza' },
  { value: 'America/Argentina/Buenos_Aires', label: 'Argentina Time', offset: 'UTC-3', cities: 'Buenos Aires, Córdoba, Rosario' },
  { value: 'Atlantic/Azores', label: 'Azores Time', offset: 'UTC-1', cities: 'Ponta Delgada' },
  { value: 'Europe/London', label: 'GMT / London', offset: 'UTC+0/+1', cities: 'London, Dublin, Lisbon, Edinburgh, Cardiff' },
  { value: 'Europe/Paris', label: 'Central European Time', offset: 'UTC+1/+2', cities: 'Paris, Berlin, Rome, Madrid, Amsterdam, Brussels, Vienna, Warsaw' },
  { value: 'Europe/Athens', label: 'Eastern European Time', offset: 'UTC+2/+3', cities: 'Athens, Bucharest, Helsinki, Kiev, Riga, Tallinn' },
  { value: 'Europe/Moscow', label: 'Moscow Time', offset: 'UTC+3', cities: 'Moscow, Saint Petersburg, Kazan' },
  { value: 'Asia/Dubai', label: 'Gulf Time', offset: 'UTC+4', cities: 'Dubai, Abu Dhabi, Muscat, Baku, Tbilisi' },
  { value: 'Asia/Karachi', label: 'Pakistan Time', offset: 'UTC+5', cities: 'Karachi, Lahore, Islamabad' },
  { value: 'Asia/Kolkata', label: 'India Standard Time', offset: 'UTC+5:30', cities: 'Mumbai, Delhi, Bangalore, Chennai, Kolkata, Hyderabad' },
  { value: 'Asia/Dhaka', label: 'Bangladesh Time', offset: 'UTC+6', cities: 'Dhaka, Chittagong' },
  { value: 'Asia/Bangkok', label: 'Indochina Time', offset: 'UTC+7', cities: 'Bangkok, Ho Chi Minh City, Jakarta, Hanoi' },
  { value: 'Asia/Shanghai', label: 'China Standard Time', offset: 'UTC+8', cities: 'Shanghai, Beijing, Guangzhou, Shenzhen, Chengdu' },
  { value: 'Asia/Singapore', label: 'Singapore Time', offset: 'UTC+8', cities: 'Singapore, Kuala Lumpur, Manila, Perth' },
  { value: 'Asia/Tokyo', label: 'Japan Time', offset: 'UTC+9', cities: 'Tokyo, Osaka, Yokohama, Nagoya, Sapporo, Seoul' },
  { value: 'Australia/Adelaide', label: 'Australia Central Time', offset: 'UTC+9:30', cities: 'Adelaide, Darwin' },
  { value: 'Australia/Sydney', label: 'Australia Eastern Time', offset: 'UTC+10/+11', cities: 'Sydney, Melbourne, Brisbane, Canberra' },
  { value: 'Pacific/Auckland', label: 'New Zealand Time', offset: 'UTC+12/+13', cities: 'Auckland, Wellington, Christchurch' },
];

interface DropdownPos {
  top: number;
  left: number;
  width: number;
}

interface TimezoneSelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}

export default function TimezoneSelect({ label, value, onChange, error, required }: TimezoneSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [dropdownPos, setDropdownPos] = useState<DropdownPos | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputId = 'input-time-zone';

  const selected = TIMEZONES.find((tz) => tz.value === value);

  const filtered = search.trim()
    ? TIMEZONES.filter((tz) =>
        [tz.label, tz.offset, tz.cities]
          .join(' ')
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    : TIMEZONES;

  const calculatePosition = () => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setDropdownPos({
      top: rect.bottom + window.scrollY + 8,
      left: rect.left + window.scrollX,
      width: rect.width,
    });
  };

  const handleToggle = () => {
    if (open) {
      setOpen(false);
      setSearch('');
    } else {
      calculatePosition();
      setOpen(true);
      setTimeout(() => {
        if (buttonRef.current) {
          buttonRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 50);
    }
  };

  useEffect(() => {
    if (open && searchRef.current) {
      searchRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const insideContainer = containerRef.current?.contains(target);
      const insideDropdown = dropdownRef.current?.contains(target);
      if (!insideContainer && !insideDropdown) {
        setOpen(false);
        setSearch('');
      }
    };

    const handleScroll = () => calculatePosition();

    document.addEventListener('mousedown', handleOutside);
    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleOutside);
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleScroll);
    };
  }, [open]);

  const handleSelect = (tz: TimezoneOption) => {
    onChange(tz.value);
    setOpen(false);
    setSearch('');
  };

  return (
    <div className="w-full" ref={containerRef}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-semibold text-[#FFC300] mb-2">
          {label}
          {required && <span className="text-[#D11F2A] ml-1">*</span>}
        </label>
      )}

      <button
        ref={buttonRef}
        id={inputId}
        type="button"
        onClick={handleToggle}
        className={`w-full px-4 py-3 bg-[#2B2B2B]/80 border-2 rounded-lg text-left flex items-center justify-between transition-all duration-300 focus:outline-none ${
          open
            ? 'border-[#FFC300] ring-4 ring-[#FFC300]/30 bg-[#2B2B2B] shadow-[0_0_20px_rgba(255,195,0,0.15)]'
            : error
            ? 'border-[#D11F2A]'
            : 'border-[#3B3B3B] hover:border-[#FFC300]/50'
        }`}
      >
        <span className="flex items-center gap-2 min-w-0">
          <Clock className="w-4 h-4 text-[#FFC300] shrink-0" />
          {selected ? (
            <span className="text-white truncate">
              <span className="font-medium">{selected.label}</span>
              <span className="text-gray-400 ml-2 text-sm">{selected.offset}</span>
            </span>
          ) : (
            <span className="text-gray-500">Select your time zone</span>
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
            }}
            className="bg-[#1B1B1B] border-2 border-[#FFC300]/30 rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.85)] overflow-hidden"
          >
            <div className="p-3 border-b border-[#2B2B2B]">
              <div className="flex items-center gap-2 px-3 py-2 bg-[#2B2B2B] rounded-lg border border-[#3B3B3B] focus-within:border-[#FFC300]/60">
                <Search className="w-4 h-4 text-gray-400 shrink-0" />
                <input
                  ref={searchRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search city or zone..."
                  className="flex-1 bg-transparent text-white text-sm placeholder-gray-500 focus:outline-none"
                />
              </div>
            </div>

            <ul className="max-h-64 overflow-y-auto overscroll-contain dropdown-scroll">
              {filtered.length === 0 ? (
                <li className="px-4 py-3 text-gray-500 text-sm text-center">No results found</li>
              ) : (
                filtered.map((tz, idx) => (
                  <li key={tz.value} className={idx !== 0 ? 'border-t border-white/[0.05]' : ''}>
                    <button
                      type="button"
                      onClick={() => handleSelect(tz)}
                      className={`w-full text-left px-4 py-3.5 transition-all duration-150 flex items-start justify-between gap-3 group ${
                        value === tz.value
                          ? 'bg-gradient-to-r from-[#FFC300]/15 to-transparent border-l-2 border-[#FFC300]'
                          : 'border-l-2 border-transparent hover:bg-white/[0.04] hover:border-l-2 hover:border-[#FFC300]/40'
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-semibold leading-snug ${value === tz.value ? 'text-[#FFC300]' : 'text-white group-hover:text-[#FFC300]/90 transition-colors duration-150'}`}>
                          {tz.label}
                        </p>
                        <p className="text-gray-400 text-xs leading-relaxed mt-1 whitespace-normal">{tz.cities}</p>
                      </div>
                      <span className="text-[#FFC300] text-xs font-mono shrink-0 pt-0.5">{tz.offset}</span>
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
