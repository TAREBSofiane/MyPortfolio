import { useEffect } from 'react';
import { useData } from '../context/DataContext.jsx';

function setMeta(selector, attribute, value) {
  const element = document.querySelector(selector);
  if (element) {
    element.setAttribute(attribute, value);
  }
}

export function usePageMeta(title, description) {
  const { profile } = useData();

  useEffect(() => {
    if (!profile) return undefined;

    const siteUrl = profile.site?.url || '';
    const fullTitle = title || profile.site?.title || '';
    const metaDescription = description || profile.site?.description || '';
    const currentUrl = `${siteUrl}${window.location.pathname}`;

    document.title = fullTitle;
    setMeta('meta[name="description"]', 'content', metaDescription);
    setMeta('meta[property="og:title"]', 'content', fullTitle);
    setMeta('meta[property="og:description"]', 'content', metaDescription);
    setMeta('meta[property="og:url"]', 'content', currentUrl);
    setMeta('meta[name="twitter:title"]', 'content', fullTitle);
    setMeta('meta[name="twitter:description"]', 'content', metaDescription);
    setMeta('link[rel="canonical"]', 'href', currentUrl);

    return undefined;
  }, [profile, title, description]);
}
