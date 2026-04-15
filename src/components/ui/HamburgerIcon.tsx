interface HamburgerIconProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function HamburgerIcon({ isOpen, onClick }: HamburgerIconProps) {
  return (
    <button
      onClick={onClick}
      className="md:hidden relative w-11 h-11 flex items-center justify-center z-[200]"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      {/* Gold ring that materializes when open */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: isOpen ? '1px solid rgba(255,195,0,0.45)' : '1px solid transparent',
          boxShadow: isOpen ? '0 0 14px rgba(255,195,0,0.18), inset 0 0 10px rgba(255,195,0,0.08)' : 'none',
          transition: 'border-color 400ms cubic-bezier(0.4,0,0.2,1), box-shadow 400ms cubic-bezier(0.4,0,0.2,1)',
        }}
      />

      {/* Dark fill that breathes in */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: isOpen ? 'rgba(255,195,0,0.07)' : 'transparent',
          transition: 'background 380ms cubic-bezier(0.4,0,0.2,1)',
        }}
      />

      {/* Lines container — 20px tall, lines at top=0, middle=9px, bottom=18px */}
      <div
        style={{
          position: 'relative',
          width: '22px',
          height: '20px',
        }}
      >
        {/* Top line: rests at top 0, translates to vertical center (9px) then rotates */}
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '0px',
            left: 0,
            right: 0,
            height: '1.5px',
            borderRadius: '2px',
            transformOrigin: 'center center',
            backgroundColor: isOpen ? '#FFC300' : '#ffffff',
            transform: isOpen
              ? 'translateY(9px) rotate(45deg)'
              : 'translateY(0px) rotate(0deg)',
            transition: isOpen
              ? [
                  'transform 380ms cubic-bezier(0.4,0,0.2,1)',
                  'background-color 300ms ease 120ms',
                ].join(', ')
              : [
                  'transform 360ms cubic-bezier(0.4,0,0.2,1)',
                  'background-color 240ms ease',
                ].join(', '),
          }}
        />

        {/* Middle line: always at center, collapses in place */}
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '9px',
            left: 0,
            right: 0,
            height: '1.5px',
            borderRadius: '2px',
            transformOrigin: 'center center',
            backgroundColor: '#ffffff',
            transform: isOpen ? 'scaleX(0)' : 'scaleX(1)',
            opacity: isOpen ? 0 : 1,
            transition: isOpen
              ? 'transform 160ms cubic-bezier(0.4,0,1,1), opacity 140ms ease'
              : 'transform 200ms cubic-bezier(0,0,0.2,1) 180ms, opacity 180ms ease 160ms',
          }}
        />

        {/* Bottom line: rests at bottom 0 (top 18px), translates to center (9px) then rotates */}
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '18px',
            left: 0,
            right: 0,
            height: '1.5px',
            borderRadius: '2px',
            transformOrigin: 'center center',
            backgroundColor: isOpen ? '#FFC300' : '#ffffff',
            transform: isOpen
              ? 'translateY(-9px) rotate(-45deg)'
              : 'translateY(0px) rotate(0deg)',
            transition: isOpen
              ? [
                  'transform 380ms cubic-bezier(0.4,0,0.2,1)',
                  'background-color 300ms ease 120ms',
                ].join(', ')
              : [
                  'transform 360ms cubic-bezier(0.4,0,0.2,1)',
                  'background-color 240ms ease',
                ].join(', '),
          }}
        />
      </div>
    </button>
  );
}
