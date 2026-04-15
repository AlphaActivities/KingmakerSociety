interface HamburgerIconProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function HamburgerIcon({ isOpen, onClick }: HamburgerIconProps) {
  return (
    <button
      onClick={onClick}
      className="md:hidden relative w-11 h-11 flex items-center justify-center group z-[110]"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
    >
      {/* Subtle circular background — closed: invisible, open: faint gold wash */}
      <div
        className="absolute inset-0 rounded-full transition-[background-color,transform] duration-250 ease-out"
        style={{
          backgroundColor: isOpen ? 'rgba(255,195,0,0.08)' : 'transparent',
          transform: isOpen ? 'scale(1.05)' : 'scale(1)',
          transition: 'background-color 220ms ease-out, transform 220ms ease-out',
        }}
      />

      {/* Icon canvas */}
      <div className="relative w-[22px] h-[18px]">

        {/* Top bar → top arm of X */}
        <span
          style={{
            position: 'absolute',
            left: 0,
            width: '100%',
            height: isOpen ? '1.5px' : '1.5px',
            top: isOpen ? '50%' : '0px',
            marginTop: isOpen ? '-0.75px' : '0px',
            backgroundColor: isOpen ? '#FFC300' : '#FFFFFF',
            borderRadius: '2px',
            transformOrigin: 'center center',
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'top 200ms ease-out, margin-top 200ms ease-out, transform 220ms ease-out, background-color 180ms ease-out',
            boxShadow: isOpen ? '0 0 6px rgba(255,195,0,0.55)' : '0 0 0px transparent',
          }}
        />

        {/* Middle bar — hidden when open */}
        <span
          style={{
            position: 'absolute',
            left: '10%',
            width: '80%',
            height: '1.5px',
            top: '50%',
            marginTop: '-0.75px',
            backgroundColor: '#FFFFFF',
            borderRadius: '2px',
            opacity: isOpen ? 0 : 1,
            transform: isOpen ? 'scaleX(0)' : 'scaleX(1)',
            transformOrigin: 'center center',
            transition: 'opacity 150ms ease-out, transform 160ms ease-out',
          }}
        />

        {/* Bottom bar → bottom arm of X */}
        <span
          style={{
            position: 'absolute',
            left: 0,
            width: '100%',
            height: '1.5px',
            bottom: isOpen ? '50%' : '0px',
            marginBottom: isOpen ? '-0.75px' : '0px',
            backgroundColor: isOpen ? '#FFC300' : '#FFFFFF',
            borderRadius: '2px',
            transformOrigin: 'center center',
            transform: isOpen ? 'rotate(-45deg)' : 'rotate(0deg)',
            transition: 'bottom 200ms ease-out, margin-bottom 200ms ease-out, transform 220ms ease-out, background-color 180ms ease-out',
            boxShadow: isOpen ? '0 0 6px rgba(255,195,0,0.55)' : '0 0 0px transparent',
          }}
        />
      </div>

      {/* Hover ring — closed state only */}
      {!isOpen && (
        <div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ border: '1px solid rgba(255,195,0,0.18)' }}
        />
      )}
    </button>
  );
}
