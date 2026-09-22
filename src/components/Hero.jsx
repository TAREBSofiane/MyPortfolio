import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext.jsx';
import { toAssetPath } from '../lib/api.js';

export default function Hero() {
  const { profile } = useData();
  const hero = profile?.hero || {};
  const heroTitle = hero.title || '';
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const animationFrame = useRef(null);

  useEffect(() => {
    const title = titleRef.current;
    if (!title || !heroTitle) return undefined;

    let index = 0;
    let timer;
    title.textContent = '';

    const type = () => {
      if (index < heroTitle.length) {
        title.textContent += heroTitle.charAt(index);
        index += 1;
        timer = setTimeout(type, 45);
      }
    };

    type();

    return () => clearTimeout(timer);
  }, [heroTitle]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const translateX = (centerX - event.clientX) / 45;
      const translateY = (centerY - event.clientY) / 45;

      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }

      animationFrame.current = requestAnimationFrame(() => {
        if (imageRef.current) {
          imageRef.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
        }
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  return (
    <section className="bg-gradient-to-b from-gray-300 to-white dark:from-gray-900 dark:to-gray-800 py-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-16" data-aos="fade-right" data-aos-delay="100">
            <h1 ref={titleRef} className="text-4xl md:text-5xl text-center font-extrabold mb-4"></h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 text-center">{hero.role || ''}</p>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 text-center">{hero.tagline || ''}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              {(hero.actions || []).map((action, index) => (
                <Link
                  key={action.path}
                  to={action.path}
                  className={
                    index === 0
                      ? 'px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl transition-colors duration-300 shadow-lg hover:shadow-xl flex items-center'
                      : 'px-6 py-3 bg-white dark:bg-gray-800 border border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors duration-300 shadow-lg hover:shadow-xl flex items-center'
                  }
                >
                  <i className={`bx ${action.icon} mr-2`} aria-hidden="true"></i> {action.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center mb-16" data-aos="fade-left" data-aos-delay="300">
            <div className="w-64 h-64 sm:w-80 sm:h-80 relative">
              <div className="absolute inset-0 bg-primary-500 rounded-full opacity-20 animate-pulse-slow"></div>
              {hero.image && (
                <img
                  ref={imageRef}
                  src={toAssetPath(hero.image)}
                  alt={profile?.identity?.name || 'Photo de profil'}
                  width="320"
                  height="320"
                  fetchPriority="high"
                  className="floating rounded-full w-full h-full object-cover z-10 relative border-4 border-white dark:border-gray-800 shadow-xl"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
