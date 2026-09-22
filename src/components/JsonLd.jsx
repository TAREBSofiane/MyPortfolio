import { useData } from '../context/DataContext.jsx';

export default function JsonLd() {
  const { profile, skills } = useData();

  if (!profile) {
    return null;
  }

  const identity = profile.identity || {};
  const siteUrl = (profile.site?.url || '').replace(/\/$/, '');
  const imageUrl = siteUrl && profile.site?.ogImage ? `${siteUrl}/${profile.site.ogImage}` : undefined;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: identity.name,
    jobTitle: identity.role,
    email: identity.email ? `mailto:${identity.email}` : undefined,
    image: imageUrl,
    url: siteUrl || undefined,
    sameAs: (profile.social || [])
      .map((social) => social.url)
      .filter((url) => url.startsWith('http')),
    knowsAbout: (skills || []).map((skill) => skill.name)
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
