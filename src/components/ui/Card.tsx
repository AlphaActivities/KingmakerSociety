import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'premium' | 'gold';
  hover?: boolean;
}

export default function Card({ children, className = '', variant = 'default', hover = false }: CardProps) {
  const baseStyles = 'rounded-xl transition-all duration-500 ease-out backdrop-blur-sm relative';

  const variants = {
    default: 'bg-[#2B2B2B] border border-[#3B3B3B] shadow-[0_4px_12px_rgba(0,0,0,0.3)]',
    premium: 'bg-gradient-to-br from-[#1B1B1B]/95 to-[#2B2B2B]/95 border border-[#FFC300]/20 shadow-[0_8px_24px_rgba(0,0,0,0.4),0_2px_8px_rgba(255,195,0,0.1)]',
    gold: 'bg-gradient-to-br from-[#2B2B2B]/95 to-[#1B1B1B]/95 border-2 border-[#FFC300]/60 shadow-[0_12px_32px_rgba(0,0,0,0.5),0_4px_16px_rgba(255,195,0,0.2)]',
  };

  const hoverStyles = hover
    ? 'hover:-translate-y-3 hover:translate-z-4 hover:shadow-[0_20px_48px_rgba(0,0,0,0.6),0_8px_24px_rgba(255,195,0,0.4)] hover:border-[#FFC300]/80 cursor-pointer hover:backdrop-blur-md hover:scale-[1.02] transform-gpu'
    : '';

  return (
    <div className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
}
