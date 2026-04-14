import { ReactNode } from 'react';
import Container from './Container';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: 'dark' | 'darker' | 'gradient';
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export default function Section({
  children,
  className = '',
  id,
  background = 'dark',
  containerSize = 'xl'
}: SectionProps) {
  const backgrounds = {
    dark: 'bg-[#0B0B0B]',
    darker: 'bg-black',
    gradient: 'bg-gradient-to-b from-[#0B0B0B] to-black',
  };

  return (
    <section id={id} className={`pt-20 ${backgrounds[background]} ${className}`}>
      <Container maxWidth={containerSize}>
        <div className="pt-0 md:pt-0 lg:pt-0 pb-16 md:pb-24 lg:pb-32">
          {children}
        </div>
      </Container>
    </section>
  );
}
