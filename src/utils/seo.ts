export interface SEOMetadata {
  title: string;
  description: string;
  canonical: string;
  ogType: string;
  ogImage?: string;
  twitterCard: string;
}

export const defaultSEO: SEOMetadata = {
  title: 'Kingmaker Society | Brotherhood for Disciplined, Capable Men',
  description: 'A brotherhood for men committed to discipline, strength, accountability, and becoming capable in every area of life.',
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
    description: 'A structured brotherhood for faith-driven men building discipline, strength, training, and accountability through mentorship.',
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
    description: 'Faith-driven brotherhood with structured accountability, mentorship, and daily live calls. Membership is granted through an application and approval process.',
    provider: {
      '@type': 'Organization',
      name: 'Kingmaker Society'
    }
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
          text: 'Kingmaker Society is a structured brotherhood for men committed to discipline, strength, accountability, and becoming capable in every area of life.'
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
        name: 'How do I join Kingmaker Society?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Membership access is granted through an application and approval process. Qualified applicants are guided to the best next step after review. Submit your application at kingmakersociety.com/apply.'
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
