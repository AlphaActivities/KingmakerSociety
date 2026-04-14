import { useState } from 'react';

interface MediaImageProps {
  src: string;
  alt: string;
  className?: string;
  objectFit?: 'cover' | 'contain';
  lazy?: boolean;
  priority?: boolean;
}

export default function MediaImage({
  src,
  alt,
  className = '',
  objectFit = 'cover',
  lazy = true,
  priority = false,
}: MediaImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const objectFitClass = objectFit === 'cover' ? 'object-cover' : 'object-contain';

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#2B2B2B] to-[#1B1B1B] animate-pulse" />
      )}
      {hasError ? (
        <div className="absolute inset-0 bg-gradient-to-br from-[#2B2B2B] to-[#1B1B1B] flex items-center justify-center">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-[#FFC300]/20 rounded-full flex items-center justify-center mx-auto">
              <span className="text-[#FFC300] text-2xl">📷</span>
            </div>
            <p className="text-gray-500 text-sm">Image unavailable</p>
          </div>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : lazy ? 'lazy' : 'eager'}
          className={`w-full h-full ${objectFitClass} transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
}
