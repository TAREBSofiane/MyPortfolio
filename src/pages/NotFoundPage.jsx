import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { usePageMeta } from '../hooks/usePageMeta.js';

export default function NotFoundPage() {
  const { profile } = useData();
  const { t } = useLanguage();

  usePageMeta(`${t('notfound.docTitle')} | ${profile?.identity?.name || ''}`, t('notfound.text'));

  return (
    <section className="bg-gradient-to-b from-gray-300 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center" data-aos="fade-up">
        <p className="text-6xl md:text-7xl font-extrabold text-primary-600 dark:text-primary-400 mb-6">404</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('notfound.title')}</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          {t('notfound.text')}
        </p>
        <Link
          to="/"
          className="px-8 py-4 bg-white dark:bg-gray-800 border border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors duration-300 shadow-lg hover:shadow-xl inline-block"
        >
          {t('notfound.back')}
        </Link>
      </div>
    </section>
  );
}
