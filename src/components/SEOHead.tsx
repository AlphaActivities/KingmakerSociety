import { useEffect } from 'react';
import {
  generateOrganizationSchema,
  generateWebsiteSchema,
  generateMembershipSchema,
  generateFAQSchema
} from '../utils/seo';

export default function SEOHead() {
  useEffect(() => {
    const organizationSchema = generateOrganizationSchema();
    const websiteSchema = generateWebsiteSchema();
    const membershipSchema = generateMembershipSchema();
    const faqSchema = generateFAQSchema();

    const scriptOrg = document.createElement('script');
    scriptOrg.type = 'application/ld+json';
    scriptOrg.text = JSON.stringify(organizationSchema);
    scriptOrg.id = 'schema-organization';

    const scriptWebsite = document.createElement('script');
    scriptWebsite.type = 'application/ld+json';
    scriptWebsite.text = JSON.stringify(websiteSchema);
    scriptWebsite.id = 'schema-website';

    const scriptMembership = document.createElement('script');
    scriptMembership.type = 'application/ld+json';
    scriptMembership.text = JSON.stringify(membershipSchema);
    scriptMembership.id = 'schema-membership';

    const scriptFAQ = document.createElement('script');
    scriptFAQ.type = 'application/ld+json';
    scriptFAQ.text = JSON.stringify(faqSchema);
    scriptFAQ.id = 'schema-faq';

    document.head.appendChild(scriptOrg);
    document.head.appendChild(scriptWebsite);
    document.head.appendChild(scriptMembership);
    document.head.appendChild(scriptFAQ);

    return () => {
      const schemaOrg = document.getElementById('schema-organization');
      const schemaWebsite = document.getElementById('schema-website');
      const schemaMembership = document.getElementById('schema-membership');
      const schemaFAQ = document.getElementById('schema-faq');

      if (schemaOrg) document.head.removeChild(schemaOrg);
      if (schemaWebsite) document.head.removeChild(schemaWebsite);
      if (schemaMembership) document.head.removeChild(schemaMembership);
      if (schemaFAQ) document.head.removeChild(schemaFAQ);
    };
  }, []);

  return null;
}
