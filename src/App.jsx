import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import AOS from 'aos';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import BackToTop from './components/BackToTop.jsx';
import JsonLd from './components/JsonLd.jsx';
import HomePage from './pages/HomePage.jsx';
import ExperiencesPage from './pages/ExperiencesPage.jsx';
import EducationPage from './pages/EducationPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import { useData } from './context/DataContext.jsx';
import { useLanguage } from './context/LanguageContext.jsx';

export default function App() {
  const location = useLocation();
  const { status, error, retry } = useData();
  const { t } = useLanguage();
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }, []);

  useEffect(() => {
    if (window.AOS) {
      window.AOS.refreshHard();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const toggleDark = () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('darkMode', isDark);
    setDark(isDark);
  };

  return (
    <>
      <a href="#main-content" className="skip-link">
        {t('a11y.skipToContent')}
      </a>

      <Navbar dark={dark} onToggleDark={toggleDark} />
      <BackToTop />

      <div className="flex flex-col w-full">
        <main id="main-content" className="flex-grow pt-14">
          {status === 'error' ? (
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('error.title')}</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                {t('error.text')}
                {error?.message ? ` (${error.message})` : ''}.
              </p>
              <button type="button" onClick={retry} className="btn-voir-plus">
                <span>{t('error.retry')}</span>
                <i className="bx bx-refresh" aria-hidden="true"></i>
              </button>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/experiences" element={<ExperiencesPage />} />
              <Route path="/education" element={<EducationPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/index.html" element={<Navigate to="/" replace />} />
              <Route path="/experiences.html" element={<Navigate to="/experiences" replace />} />
              <Route path="/education.html" element={<Navigate to="/education" replace />} />
              <Route path="/projects.html" element={<Navigate to="/projects" replace />} />
              <Route path="/contact.html" element={<Navigate to="/contact" replace />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          )}
        </main>

        <Footer />
      </div>

      <JsonLd />
    </>
  );
}
