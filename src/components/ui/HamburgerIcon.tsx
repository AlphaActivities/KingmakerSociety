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
          className={`absolute w-full h-0.5 bg-white transition-[transform,top,background-color] duration-200 ease-out ${
            isOpen
              ? 'top-1/2 rotate-45 bg-[#FFC300]'
              : 'top-0 group-hover:bg-[#FFC300]'
          }`}
          style={{
            transformOrigin: 'center',
          }}
        />
        <span
          className={`absolute w-full h-0.5 bg-white top-1/2 -translate-y-1/2 transition-[opacity,transform,background-color] duration-200 ease-out ${
            isOpen
              ? 'opacity-0 scale-0'
              : 'opacity-100 scale-100 group-hover:bg-[#FFC300]'
          }`}
        />
        <span
          className={`absolute w-full h-0.5 bg-white transition-[transform,bottom,background-color] duration-200 ease-out ${
            isOpen
              ? 'bottom-1/2 -rotate-45 bg-[#FFC300]'
              : 'bottom-0 group-hover:bg-[#FFC300]'
          }`}
          style={{
            transformOrigin: 'center',
          }}
        />
      </div>
      <div
        className={`absolute inset-0 rounded-full transition-[background-color,transform] duration-200 ${
          isOpen
            ? 'bg-[#FFC300]/10 scale-110'
            : 'bg-transparent scale-100 group-hover:bg-[#FFC300]/5 group-hover:scale-110'
        }`}
      />
    </button>
  );
}
