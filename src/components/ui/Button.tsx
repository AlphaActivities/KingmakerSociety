import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'font-semibold transition-[background,box-shadow,transform,opacity,color] duration-400 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-[#0B0B0B] transform-gpu active:scale-95';

  const variants = {
    primary: 'bg-gradient-to-r from-[#D11F2A] to-[#A01620] text-white hover:from-[#E02030] hover:to-[#B01828] shadow-[0_4px_20px_rgba(209,31,42,0.3)] hover:shadow-[0_8px_32px_rgba(209,31,42,0.5)] hover:-translate-y-1 hover:scale-105 focus:ring-[#D11F2A]/60',
    secondary: 'bg-gradient-to-r from-[#FFC300] via-[#FFD033] to-[#D4A000] text-[#0B0B0B] hover:from-[#FFD033] hover:via-[#FFE066] hover:to-[#E5B100] shadow-[0_4px_20px_rgba(255,195,0,0.4)] hover:shadow-[0_8px_32px_rgba(255,195,0,0.6)] font-bold hover:-translate-y-1 hover:scale-105 focus:ring-[#FFC300]/60',
    outline: 'border-2 border-[#FFC300]/60 text-[#FFC300] hover:bg-[#FFC300] hover:text-[#0B0B0B] hover:border-[#FFC300] shadow-[0_2px_12px_rgba(255,195,0,0.2)] hover:shadow-[0_4px_24px_rgba(255,195,0,0.4)] hover:-translate-y-1 hover:scale-105 focus:ring-[#FFC300]/60',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center">{children}</span>
      <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-300"></span>
    </button>
  );
}
