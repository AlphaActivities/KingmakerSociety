interface HamburgerIconProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function HamburgerIcon({ isOpen, onClick }: HamburgerIconProps) {
  return (
    <button
      onClick={onClick}
      className="md:hidden relative w-10 h-10 flex items-center justify-center group z-[110]"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
    >
      <div className="relative w-6 h-5 flex flex-col justify-center">
        <span
          className={`absolute w-full h-0.5 bg-white ${
            isOpen
              ? 'top-1/2 rotate-45 bg-[#FFC300]'
              : 'top-0 group-hover:bg-[#FFC300]'
          }`}
          style={{
            transformOrigin: 'center',
            transition: isOpen
              ? 'top 220ms cubic-bezier(0.4,0,0.2,1), transform 280ms cubic-bezier(0.34,1.2,0.64,1) 60ms, background-color 200ms ease-out'
              : 'top 240ms cubic-bezier(0.4,0,0.2,1) 40ms, transform 260ms cubic-bezier(0.4,0,0.2,1), background-color 200ms ease-out',
          }}
        />
        <span
          className={`absolute w-full h-0.5 bg-white top-1/2 -translate-y-1/2 ${
            isOpen
              ? 'opacity-0 scale-x-0'
              : 'opacity-100 scale-x-100 group-hover:bg-[#FFC300]'
          }`}
          style={{
            transformOrigin: 'center',
            transition: isOpen
              ? 'opacity 140ms ease-out, transform 160ms cubic-bezier(0.4,0,1,1), background-color 200ms ease-out'
              : 'opacity 200ms ease-out 120ms, transform 220ms cubic-bezier(0,0,0.2,1) 100ms, background-color 200ms ease-out',
          }}
        />
        <span
          className={`absolute w-full h-0.5 bg-white ${
            isOpen
              ? 'bottom-1/2 -rotate-45 bg-[#FFC300]'
              : 'bottom-0 group-hover:bg-[#FFC300]'
          }`}
          style={{
            transformOrigin: 'center',
            transition: isOpen
              ? 'bottom 220ms cubic-bezier(0.4,0,0.2,1), transform 280ms cubic-bezier(0.34,1.2,0.64,1) 60ms, background-color 200ms ease-out'
              : 'bottom 240ms cubic-bezier(0.4,0,0.2,1) 40ms, transform 260ms cubic-bezier(0.4,0,0.2,1), background-color 200ms ease-out',
          }}
        />
      </div>
      <div
        className={`absolute inset-0 rounded-full ${
          isOpen
            ? 'bg-[#FFC300]/10 scale-110'
            : 'bg-transparent scale-100 group-hover:bg-[#FFC300]/5 group-hover:scale-110'
        }`}
        style={{
          transition: 'background-color 300ms ease-out, transform 300ms cubic-bezier(0.34,1.2,0.64,1)',
        }}
      />
    </button>
  );
}
