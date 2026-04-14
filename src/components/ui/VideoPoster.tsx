import { Play } from 'lucide-react';
import { useState } from 'react';

interface VideoPosterProps {
  title: string;
  description?: string;
  posterImage?: string;
  videoUrl?: string;
  className?: string;
  aspectRatio?: 'video' | 'square' | 'portrait';
  onPlay?: () => void;
}

export default function VideoPoster({
  title,
  description,
  posterImage,
  videoUrl,
  className = '',
  aspectRatio = 'video',
  onPlay,
}: VideoPosterProps) {
  const [isHovered, setIsHovered] = useState(false);

  const aspectClasses = {
    video: 'aspect-video',
    square: 'aspect-square',
    portrait: 'aspect-[9/16]',
  };

  const handleClick = () => {
    if (videoUrl) {
      window.open(videoUrl, '_blank', 'noopener,noreferrer');
    }
    if (onPlay) {
      onPlay();
    }
  };

  return (
    <div
      className={`relative ${aspectClasses[aspectRatio]} rounded-xl overflow-hidden cursor-pointer group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`Play video: ${title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {posterImage ? (
        <img
          src={posterImage}
          alt={`Video thumbnail: ${title}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-[#2B2B2B] to-[#1B1B1B]" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300" />

      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
          isHovered ? 'scale-110' : 'scale-100'
        }`}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-[#D11F2A] rounded-full blur-2xl opacity-50 animate-pulse" />
          <div className="relative w-20 h-20 bg-gradient-to-br from-[#D11F2A] to-[#A01620] rounded-full flex items-center justify-center shadow-2xl shadow-[#D11F2A]/50 border-4 border-white/20 transition-all duration-300 group-hover:scale-110 group-hover:border-[#FFC300]/50">
            <Play className="w-8 h-8 text-white ml-1" fill="white" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-300 group-hover:translate-y-0 translate-y-2">
        <h3 className="text-xl font-bold mb-1 line-clamp-2">{title}</h3>
        {description && (
          <p className="text-sm text-gray-300 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {description}
          </p>
        )}
      </div>

      <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full border border-white/20">
        <span className="text-xs font-semibold text-white">Video</span>
      </div>
    </div>
  );
}
