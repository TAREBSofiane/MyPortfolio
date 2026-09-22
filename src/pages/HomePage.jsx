import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext.jsx';
import { usePageMeta } from '../hooks/usePageMeta.js';
import Hero from '../components/Hero.jsx';
import SkillsScroller from '../components/SkillsScroller.jsx';

export default function HomePage() {
  const { profile, skills, status } = useData();

  usePageMeta(profile?.site?.title, profile?.site?.description);

  return (
    <>
      <Hero />

      <section className="bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/2 text-center" data-aos="fade-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 flex justify-center">
                {profile?.about?.title || ''}
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                {profile?.about?.text || ''}
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {(profile?.about?.languages || []).map((language) => (
                  <span
                    key={language}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm font-medium"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:w-1/2 items-center text-center" data-aos="fade-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 flex justify-center">
                {profile?.skillsSection?.title || ''}
              </h2>
              {status === 'loading' ? (
                <div className="skills-container py-3">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {[0, 1, 2].map((n) => (
                      <div
                        key={n}
                        className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden h-32 skeleton"
                      ></div>
                    ))}
                  </div>
                </div>
              ) : (
                <SkillsScroller skills={skills} label={profile?.skillsSection?.title} />
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="md:py-6 mb:pt-0 pt-6 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{profile?.services?.title || ''}</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              {profile?.services?.subtitle || ''}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(profile?.services?.items || []).map((service, index) => (
              <div
                key={service.title}
                className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                data-aos="zoom-in"
                data-aos-delay={300 - index * 100}
              >
                <div className="text-primary-600 dark:text-primary-400 mb-4">
                  <i className={`bx ${service.icon} text-4xl`} aria-hidden="true"></i>
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{profile?.cta?.title || ''}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">{profile?.cta?.text || ''}</p>
          <Link
            to="/contact"
            className="px-8 py-4 bg-white dark:bg-gray-800 border border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            {profile?.cta?.buttonLabel || ''}
          </Link>
        </div>
      </section>
    </>
  );
}
