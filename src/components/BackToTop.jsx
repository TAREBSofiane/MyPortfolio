import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label={t('a11y.backToTop')}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-2 right-2 p-2 rounded-full bg-primary-600 text-white shadow-lg z-[9999] transition-all duration-300 hover:bg-primary-700 ${
        visible ? '' : 'opacity-0 invisible'
      }`}
    >
      <i className="bx bx-up-arrow-alt text-xl" aria-hidden="true"></i>
    </button>
  );
}
