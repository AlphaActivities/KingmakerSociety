import { useState } from 'react';
import { Trophy } from 'lucide-react';
import Section from '../ui/Section';
import Card from '../ui/Card';
import LuxFadeIn from '../ui/LuxFadeIn';
import MediaImage from '../ui/MediaImage';
import VideoPoster from '../ui/VideoPoster';
import VideoModal from '../ui/VideoModal';

const featuredVideos = [
  {
    title: 'Jordan Ali | The Kingmaker Brotherhood',
    description: 'A direct look into the energy, structure, and mission behind the brotherhood.',
    posterImage: '/images/proof/largest-martial-artist-brotherhood.webp',
    videoUrl: '/videos/Martial_artist_brotherhood.mp4',
  },
  {
    title: 'Jordan Ali | Founder of Kingmaker Society',
    description: 'Founder-led authority, vision, and movement positioning for the brand.',
    posterImage: '/images/founders/founder-jordan.webp',
    videoUrl: '/videos/Marketing_video_01.mp4',
  },
  {
    title: 'Kingmaker Society | Brotherhood Coaching Call',
    description: 'A real glimpse into live coaching, masculinity, and the brotherhood environment.',
    posterImage: '/images/founders/co-founder-ryan.webp',
    videoUrl: '/videos/jordan-ali-brotherhood-promo-reel-01.mp4',
  },
];

const supportingVideos = [
  {
    title: 'Fight Promo',
    description: 'Combat intensity, discipline, and pressure-tested execution.',
    posterImage: '/images/founders/fitness-mentor-willie.webp',
    videoUrl: '/videos/Fight_promo.MP4',
  },
  {
    title: 'Kingmaker Marketing | Version 2',
    description: 'Additional brand positioning and movement-building proof.',
    posterImage: '/images/founders/co-founder-ryan.webp',
    videoUrl: '/videos/Marketing_video_02.mp4',
  },
  {
    title: 'Kingmaker Marketing | Version 3',
    description: 'Expanded visual proof of the mission, message, and audience.',
    posterImage: '/images/pillars/goal-self-improvement.webp',
    videoUrl: '/videos/Marketing_video_03.mp4',
  },
];

const proofGallery = [
  {
    src: '/images/proof/largest-martial-artist-brotherhood.webp',
    alt: 'Largest Martial Artist Brotherhood collage showing combat training, brotherhood, and competition',
    category: 'Brotherhood',
  },
  {
    src: '/images/proof/mentors-4-9.webp',
    alt: 'Kingmaker mentors and accomplished martial artists from multiple backgrounds',
    category: 'Mentors',
  },
  {
    src: '/images/pillars/fitness-self-improvement.webp',
    alt: 'Masculinity in fitness visual representing body mastery and physical discipline',
    category: 'Fitness',
  },
  {
    src: '/images/founders/co-founder-ryan.webp',
    alt: 'Co-Founder Ryan in a boxing ring showing leadership and fighting presence',
    category: 'Leadership',
  },
  {
    src: '/images/pillars/goal-self-improvement.webp',
    alt: 'Goal-oriented self-improvement visual representing execution and direction',
    category: 'Goal Execution',
  },
  {
    src: '/images/founders/fitness-mentor-willie.webp',
    alt: 'Fitness mentor Willie representing combat mentorship and discipline',
    category: 'Combat Mentor',
  },
];

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
          <h3 className="text-2xl font-bold text-[#FFC300] mb-8 text-center drop-shadow-[0_0_20px_rgba(255,195,0,0.3)]">Kingmaker in Motion</h3>
        </LuxFadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredVideos.map((video, index) => (
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

      <div className="mb-16">
        <LuxFadeIn delay={0.4}>
          <h3 className="text-2xl font-bold text-[#FFC300] mb-8 text-center drop-shadow-[0_0_20px_rgba(255,195,0,0.3)]">Brotherhood in Action</h3>
        </LuxFadeIn>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {supportingVideos.map((video, index) => (
            <LuxFadeIn key={index} delay={0.5 + index * 0.08}>
              <VideoPoster
                title={video.title}
                description={video.description}
                posterImage={video.posterImage}
                onPlay={() => handlePlayVideo(video.videoUrl, video.title)}
                aspectRatio="video"
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
        <LuxFadeIn delay={0.9}>
          <h3 className="text-2xl font-bold text-[#FFC300] mb-8 text-center drop-shadow-[0_0_20px_rgba(255,195,0,0.3)]">Training & Results Gallery</h3>
        </LuxFadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {proofGallery.map((item, index) => (
            <LuxFadeIn key={index} delay={1.0 + index * 0.08}>
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
