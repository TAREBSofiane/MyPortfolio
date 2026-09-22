import { useData } from '../../context/DataContext.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { getSkillIcon, toAssetPath } from '../../lib/api.js';

export default function ExperienceCard({ exp, index, onOpen }) {
  const { skillIcons } = useData();
  const { t } = useLanguage();

  return (
    <div
      className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
      data-aos="zoom-in"
      data-aos-delay={(index + 1) * 100}
    >
      <div className="relative overflow-hidden h-48">
        <img
          src={toAssetPath(exp.image)}
          alt={exp.title}
          width="800"
          height="450"
          loading="lazy"
          decoding="async"
          className="w-full h-48 object-cover transform transition-transform duration-500 hover:scale-110"
        />
        <div>
          <span className="absolute top-3 right-3 px-3 py-1 bg-primary-500 text-white text-xs font-medium rounded-full">
            {exp.period}
          </span>
          <h3 className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-4 text-xl font-semibold">
            {exp.title}
          </h3>
        </div>
      </div>

      <div className="p-6">
        <h4 className="text-lg font-medium text-primary-600 dark:text-primary-400 mb-3">{exp.institution}</h4>
        <div className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{exp.description}</div>

        <div className="mb-4">
          <h5 className="text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
            {t('card.skillsTools')}
          </h5>
          <div className="flex flex-wrap gap-2">
            {exp.skills.map((skill) => (
              <span key={skill} className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-xs rounded flex items-center">
                <i className={`bx ${getSkillIcon(skillIcons, skill)} mr-1`} aria-hidden="true"></i>
                {skill}
              </span>
            ))}
          </div>
        </div>

        <button type="button" onClick={() => onOpen(exp)} className="btn-voir-plus">
          <span>{t('card.seeMore')}</span>
          <i className="bx bx-right-arrow-alt" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
}
