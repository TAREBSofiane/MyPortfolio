import { useData } from '../context/DataContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { toAssetPath } from '../lib/api.js';

export default function ContactInfo() {
  const { profile } = useData();
  const { t } = useLanguage();
  const socialLinks = (profile?.social || []).filter(
    (social) => !social.url.startsWith('mailto')
  );

  return (
    <div className="md:w-5/12">
      <div className="bg-gradient-to-bl from-gray-200 to-gray-50 dark:from-gray-800 dark:to-gray-700 py-8 transition-colors duration-300 rounded-2xl shadow-xl p-8 h-full">
        <h3 className="text-2xl font-bold mb-6">{t('contact.info')}</h3>
        <div className="space-y-6">
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-primary-100 dark:bg-primary-900 p-3 rounded-lg">
              <i className="bx bx-envelope text-primary-600 dark:text-primary-400 text-xl" aria-hidden="true"></i>
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-medium">{t('contact.email')}</h4>
              <p className="text-gray-600 dark:text-gray-400">{profile?.identity?.email || ''}</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 bg-primary-100 dark:bg-primary-900 p-3 rounded-lg">
              <i className="bx bx-map text-primary-600 dark:text-primary-400 text-xl" aria-hidden="true"></i>
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-medium">{t('contact.location')}</h4>
              <p className="text-gray-600 dark:text-gray-400">{profile?.identity?.location || ''}</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 bg-primary-100 dark:bg-primary-900 p-3 rounded-lg">
              <i className="bx bx-link text-primary-600 dark:text-primary-400 text-xl" aria-hidden="true"></i>
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-medium">{t('contact.social')}</h4>
              <div className="flex space-x-3 mt-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                  >
                    <i className={`bx ${social.icon} text-2xl`} aria-hidden="true"></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {profile?.contact?.mapImage && (
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg h-48 relative">
            <img
              src={toAssetPath(profile.contact.mapImage)}
              alt="Localisation"
              width="600"
              height="338"
              loading="lazy"
              decoding="async"
              className="w-full h-48 object-cover transform transition-transform duration-500 hover:scale-110"
            />
          </div>
        )}
      </div>
    </div>
  );
}
