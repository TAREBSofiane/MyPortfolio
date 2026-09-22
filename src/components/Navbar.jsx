import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useData } from '../context/DataContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { toAssetPath } from '../lib/api.js';

const NAV_LINKS = [
  { to: '/', key: 'nav.home' },
  { to: '/experiences', key: 'nav.experiences' },
  { to: '/education', key: 'nav.education' },
  { to: '/projects', key: 'nav.projects' },
  { to: '/contact', key: 'nav.contact' }
];

const NAV_ICONS = {
  'nav.home': 'bx-home',
  'nav.experiences': 'bx-briefcase-alt-2',
  'nav.education': 'bx-book-open',
  'nav.projects': 'bx-folder-open',
  'nav.contact': 'bx-envelope'
};

export default function Navbar({ dark, onToggleDark }) {
  const { profile } = useData();
  const { lang, toggleLang, t } = useLanguage();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  const firstName = (profile?.identity?.name || 'Portfolio').split(' ')[0];
  const brand = `${firstName}'s Portfolio`;

  const desktopLinkClass = ({ isActive }) =>
    `nav-link hover:text-primary-600 dark:hover:text-primary-400 transition-colors${isActive ? ' active' : ''}`;

  const themeToggle = () => (
    <button
      type="button"
      onClick={onToggleDark}
      aria-label={dark ? t('theme.toLight') : t('theme.toDark')}
      className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none transition-colors"
    >
      <i className="bx bx-sun text-xl dark:hidden" aria-hidden="true"></i>
      <i className="bx bx-moon text-xl hidden dark:block" aria-hidden="true"></i>
    </button>
  );

  const langToggle = (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={t('lang.switch')}
      className="px-2 py-0.5 text-sm font-semibold rounded-md border border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
    >
      {lang === 'fr' ? 'EN' : 'FR'}
    </button>
  );

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg fixed w-full z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <span className="text-primary-600 dark:text-primary-400">{brand}</span>
        </Link>

        <div className="hidden md:flex space-x-6 items-center">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={desktopLinkClass}>
              {t(link.key)}
            </NavLink>
          ))}
          {themeToggle()}
          {langToggle}
        </div>

        <div className="md:hidden flex items-center space-x-2">
          {langToggle}
          {themeToggle()}
          <button
            type="button"
            className="focus:outline-none text-2xl"
            aria-label={t('nav.openMenu')}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
            >
            <i className="bx bx-menu" aria-hidden="true"></i>
          </button>
        </div>
      </div>

      <div
        id="overlay"
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 backdrop-blur-sm${menuOpen ? '' : ' hidden'}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      ></div>

      <div
        id="mobile-menu"
        className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white dark:bg-gray-800 shadow-2xl rounded-l-3xl overflow-y-auto transform-gpu transition-transform duration-500 ease-out z-30 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="sticky top-0 flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <span className="text-lg font-bold text-primary-600 dark:text-primary-400">{brand}</span>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label={t('nav.closeMenu')}
            className="w-9 h-9 flex items-center justify-center rounded-full text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <i className="bx bx-x text-2xl" aria-hidden="true"></i>
          </button>
        </div>

        <nav className="p-4 grid gap-1">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `mobile-nav-link flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors duration-200 ${
                  isActive
                    ? 'active text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-gray-700/60'
                    : 'text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400'
                }`
              }
            >
              <i className={`bx ${NAV_ICONS[link.key]} text-lg`} aria-hidden="true"></i>
              {t(link.key)}
            </NavLink>
          ))}
        </nav>

        <div className="px-4 pb-6">
          {profile?.cv?.path && (
            <a
              href={toAssetPath(profile.cv.path)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
            >
              <i className="bx bx-download text-lg" aria-hidden="true"></i>
              {profile?.cv?.label || ''}
            </a>
          )}

          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="flex space-x-4">
              {(profile?.social || []).map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target={social.url.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="text-xl text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                >
                  <i className={`bx ${social.icon}`} aria-hidden="true"></i>
                </a>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              {langToggle}
              {themeToggle()}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
