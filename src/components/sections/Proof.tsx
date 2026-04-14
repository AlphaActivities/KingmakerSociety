import { useState } from 'react';
import { Trophy } from 'lucide-react';
import Section from '../ui/Section';
import Card from '../ui/Card';
import LuxFadeIn from '../ui/LuxFadeIn';
import MediaImage from '../ui/MediaImage';
import VideoPoster from '../ui/VideoPoster';
import VideoModal from '../ui/VideoModal';

export default function Proof() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [activeTitle, setActiveTitle] = useState<string>('');

  const handlePlayVideo = (videoUrl: string, title: string) => {
    setActiveVideo(videoUrl);
    setActiveTitle(title);
  };

  const handleCloseVideo = () => {
    setActiveVideo(null);
    setActiveTitle('');
  };

  const proofGallery = [
    {
      type: 'image' as const,
      src: 'https://images.pexels.com/photos/3838937/pexels-photo-3838937.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'Bodybuilding training showcasing strength and physique development',
      category: 'Bodybuilding',
    },
    {
      type: 'image' as const,
      src: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'MMA fighter training session showing combat discipline',
      category: 'MMA Training',
    },
    {
      type: 'image' as const,
      src: 'https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'Calisthenics athlete demonstrating bodyweight mastery',
      category: 'Calisthenics',
    },
    {
      type: 'image' as const,
      src: 'https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'MMA championship moment showing warrior mentality and victory',
      category: 'Championship',
    },
    {
      type: 'image' as const,
      src: 'https://images.pexels.com/photos/4944421/pexels-photo-4944421.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'Kingmaker Society disciplines showcasing transformation across multiple areas',
      category: 'Disciplines',
    },
    {
      type: 'image' as const,
      src: 'https://images.pexels.com/photos/3490348/pexels-photo-3490348.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'Transformation progress showing dedication and results',
      category: 'Transformation',
    },
  ];

  const videoShowcases = [
    {
      title: 'Jordan Ali | The Kingmaker Brotherhood',
      description: 'A direct look into the energy, structure, and mission behind the brotherhood.',
      posterImage: '/images/founders/jordan-ali-founder-selfie-portrait.jpg',
      videoUrl: '/videos/jordan-ali-brotherhood-promo-reel-01.mp4',
    },
    {
      title: 'Jordan Ali | Founder of Kingmaker Society',
      description: 'Founder-led authority, vision, and movement positioning for the brand.',
      posterImage: '/images/founders/jordan-ali-founder-gym-portrait.jpg',
      videoUrl: '/videos/jordan-ali-founder-promo-reel-01.mp4',
    },
    {
      title: 'Kingmaker Society | Men\'s Bible Study Brotherhood',
      description: 'A real glimpse into the faith-centered community and brotherhood environment.',
      posterImage: '/images/posters/kingmaker-bible-study-brotherhood-poster.jpg',
      videoUrl: '/videos/kingmaker-bible-study-zoom-promo-01.mp4',
    },
  ];

  return (
    <Section id="proof" background="gradient">
      <LuxFadeIn>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-[#FFC300]/10 border border-[#FFC300]/30 rounded-full mb-6 shadow-lg shadow-[#FFC300]/20">
            <Trophy className="w-4 h-4 text-[#FFC300]" />
            <span className="text-sm font-semibold text-[#FFC300]">Proof & Results</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">Real Men.</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC300] via-[#FFD033] to-[#D4A000] drop-shadow-[0_0_30px_rgba(255,195,0,0.4)]">Real Results.</span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Don't take our word for it. See the transformations happening every day inside Kingmaker Society.
          </p>
        </div>
      </LuxFadeIn>

      <div className="mb-16">
        <LuxFadeIn delay={0.1}>
          <h3 className="text-2xl font-bold text-[#FFC300] mb-8 text-center drop-shadow-[0_0_20px_rgba(255,195,0,0.3)]">Video Proof</h3>
        </LuxFadeIn>
        <div className="grid md:grid-cols-3 gap-6">
          {videoShowcases.map((video, index) => (
            <LuxFadeIn key={index} delay={0.2 + index * 0.1}>
              <VideoPoster
                title={video.title}
                description={video.description}
                posterImage={video.posterImage}
                onPlay={() => handlePlayVideo(video.videoUrl, video.title)}
                aspectRatio="portrait"
                className="shadow-2xl shadow-black/50"
              />
            </LuxFadeIn>
          ))}
        </div>
      </div>

      <VideoModal
        videoUrl={activeVideo || ''}
        title={activeTitle}
        isOpen={!!activeVideo}
        onClose={handleCloseVideo}
      />

      <div>
        <LuxFadeIn delay={0.5}>
          <h3 className="text-2xl font-bold text-[#FFC300] mb-8 text-center drop-shadow-[0_0_20px_rgba(255,195,0,0.3)]">Training & Results Gallery</h3>
        </LuxFadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {proofGallery.map((item, index) => (
            <LuxFadeIn key={index} delay={0.6 + index * 0.08}>
              <Card variant="premium" className="aspect-square overflow-hidden hover:scale-105 transition-all duration-500 group">
                <div className="relative w-full h-full">
                  <MediaImage
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full group-hover:scale-110 transition-transform duration-700"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FFC300]/20 via-transparent to-[#D11F2A]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-lg font-bold text-[#FFC300] drop-shadow-[0_0_15px_rgba(255,195,0,0.5)]">{item.category}</p>
                  </div>
                </div>
              </Card>
            </LuxFadeIn>
          ))}
        </div>
      </div>
    </Section>
  );
}
