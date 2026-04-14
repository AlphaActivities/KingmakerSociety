export interface SEOMetadata {
  title: string;
  description: string;
  canonical: string;
  ogType: string;
  ogImage?: string;
  twitterCard: string;
}

export const defaultSEO: SEOMetadata = {
  title: 'Kingmaker Society | Build Your Body, Business & Brotherhood',
  description: 'Kingmaker Society is a structured brotherhood for faith-driven men who want to build discipline, fitness, purpose, and future business through accountability, mentorship, and daily structure.',
  canonical: 'https://kingmakersociety.com',
  ogType: 'website',
  ogImage: 'https://kingmakersociety.com/images/logos/OG-photo.jpg',
  twitterCard: 'summary_large_image'
};

export const generateOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Kingmaker Society',
    url: 'https://kingmakersociety.com',
    logo: 'https://kingmakersociety.com/logo.png',
    description: 'A structured brotherhood for faith-driven men building discipline, fitness, purpose, and future business through accountability and mentorship.',
    founder: {
      '@type': 'Person',
      name: 'Jordan Ali',
      jobTitle: 'Founder',
      description: 'Professional MMA fighter, business owner, and man of God'
    },
    sameAs: [
      'https://www.facebook.com/share/1AjDsJoufe/?mibextid=wwXIfr',
      'https://www.instagram.com/kingmakersocial?igsh=YXdveTkyczZkazgy',
      'https://www.tiktok.com/@kingmaker.society?_r=1&_t=ZP-946vWbtdl9S',
      'https://www.youtube.com/@KINGMAKERSOCIETY'
    ]
  };
};

export const generateWebsiteSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Kingmaker Society',
    url: 'https://kingmakersociety.com',
    description: 'Structured brotherhood for faith-driven men',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://kingmakersociety.com/?s={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };
};

export const generateMembershipSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'MemberProgram',
    name: 'Kingmaker Society Membership',
    description: 'Faith-driven brotherhood with structured accountability, mentorship, and daily live calls',
    provider: {
      '@type': 'Organization',
      name: 'Kingmaker Society'
    },
    offers: [
      {
        '@type': 'Offer',
        name: 'General Access',
        price: '30.00',
        priceCurrency: 'USD',
        description: '24/7 private member community access and live Zoom calls'
      },
      {
        '@type': 'Offer',
        name: 'VIP Access',
        price: '60.00',
        priceCurrency: 'USD',
        description: 'General Access plus private VIP channel and priority support'
      },
      {
        '@type': 'Offer',
        name: 'Elite Access',
        price: '90.00',
        priceCurrency: 'USD',
        description: 'VIP Access plus monthly 1-on-1 coaching and direct mentor access'
      }
    ]
  };
};

export const generateFAQSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Kingmaker Society?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Kingmaker Society is a structured brotherhood for faith-driven men who want to build discipline, fitness, purpose, and future business through accountability, mentorship, and daily structure.'
        }
      },
      {
        '@type': 'Question',
        name: 'Who is the founder?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Kingmaker Society was founded by Jordan Ali, a professional MMA fighter, business owner, and man of God who created a high-accountability environment where men sharpen men through structure, brotherhood, and real action.'
        }
      },
      {
        '@type': 'Question',
        name: 'What are the membership tiers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We offer three membership tiers: General Access ($30/month), VIP Access ($60/month), and Elite Access ($90/month). Each tier includes increasing levels of access, support, and mentorship.'
        }
      },
      {
        '@type': 'Question',
        name: 'When are the live calls?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Live Zoom calls are held daily from 12:00 PM to 1:00 PM CST, covering topics including Faith, Fitness, Health, Mindset, and Goals.'
        }
      }
    ]
  };
};
