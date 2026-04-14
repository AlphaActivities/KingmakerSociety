import { useEffect, useState } from 'react';

const HERO_IMAGES_DESKTOP = [
  '/images/hero/bodybuilder-portrait.jpg',
  'https://images.pexels.com/photos/3490348/pexels-photo-3490348.jpeg?auto=compress&cs=tinysrgb&w=1920',
  '/images/hero/training-action.jpg',
  'https://images.pexels.com/photos/3837757/pexels-photo-3837757.jpeg?auto=compress&cs=tinysrgb&w=1920',
];

const HERO_IMAGES_MOBILE = [
  '/images/hero/training-action-mobile.jpg',
];

export default function HeroBackgroundSlider() {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const imagesToLoad = isMobile ? HERO_IMAGES_MOBILE : HERO_IMAGES_DESKTOP;

    const imagePromises = imagesToLoad.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = src;
      });
    });

    Promise.all(imagePromises)
      .then(() => setImagesLoaded(true))
      .catch(() => setImagesLoaded(true));
  }, [isMobile]);

  const heroImages = isMobile ? HERO_IMAGES_MOBILE : HERO_IMAGES_DESKTOP;

  return (
    <>
      <div className="absolute inset-0 z-0" style={{ transform: 'translateZ(0)' }}>
        {imagesLoaded ? (
          <div className="absolute inset-0">
            {heroImages.map((image) => (
              <div
                key={image}
                className="hero-bg-slide absolute inset-0 opacity-0"
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  willChange: 'transform, opacity',
                  WebkitTransform: 'translateZ(0)',
                  transform: 'translateZ(0)',
                }}
              />
            ))}
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-black" />
        )}
      </div>

      <div className="absolute inset-0 z-[5]">
        <div
          className="absolute inset-0"
          style={{
            background: isMobile ? 'rgba(0, 0, 0, 0.60)' : 'rgba(0, 0, 0, 0.55)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.5) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.3) 100%)',
          }}
        />
      </div>
    </>
  );
}
