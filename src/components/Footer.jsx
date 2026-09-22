import { Link, useLocation } from 'react-router-dom';
import { useData } from '../context/DataContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { toAssetPath } from '../lib/api.js';

export default function Footer() {
  const { profile } = useData();
  const { t } = useLanguage();
  const location = useLocation();

  const cvPath = profile?.cv?.path;
  const showCv =
    (location.pathname === '/' || location.pathname === '/contact') && Boolean(cvPath);

  return (
    <footer
      className="py-7 px-6 bg-gradient-to-b from-gray-300 to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300"
      data-aos="fade-up"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
          <div className="flex flex-col items-center md:items-start">
            <p className="text-lg font-semibold">{profile?.identity?.name || ''}</p>
            <p className="text-gray-600 dark:text-gray-400">{profile?.footer?.tagline || ''}</p>
          </div>

          <div className="flex justify-center">
            {showCv ? (
              <a
                href={toAssetPath(profile?.cv?.path)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 inline-flex items-center"
              >
                <i className="bx bx-download mr-2" aria-hidden="true"></i>
                {profile?.cv?.label || ''}
              </a>
            ) : (
              <Link
                to="/contact"
                className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                {t('footer.contact')}
              </Link>
            )}
          </div>

          <div className="flex justify-center md:justify-end space-x-4">
            {(profile?.social || []).map((social) => (
              <a
                key={social.name}
                href={social.url}
                target={social.url.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={social.name}
                className="text-2xl hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <i className={`bx ${social.icon}`} aria-hidden="true"></i>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center text-gray-600 dark:text-gray-400">
          &copy; {profile?.footer?.copyright || ''}
        </div>
      </div>
    </footer>
  );
}
