import { useData } from '../../context/DataContext.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { getSkillIcon, toAssetPath } from '../../lib/api.js';

export default function ProjectCard({ project, index, onOpen }) {
  const { skillIcons } = useData();
  const { t } = useLanguage();

  return (
    <div
      className={`project-card ${project.category.id} bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}
      data-aos="zoom-in"
      data-aos-delay={(index + 1) * 100}
    >
      <div className="relative overflow-hidden h-48">
        <img
          src={toAssetPath(project.image)}
          alt={project.title}
          width="800"
          height="450"
          loading="lazy"
          decoding="async"
          className="w-full h-48 object-cover transform transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1 bg-primary-500 text-white text-xs font-medium rounded-full">
            {project.category.name}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{project.description}</p>

        <div className="mb-4">
          <h5 className="text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
            {t('card.technologies')}
          </h5>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-xs rounded flex items-center">
                <i className={`bx ${getSkillIcon(skillIcons, tech)} mr-1`} aria-hidden="true"></i>
                {tech}
              </span>
            ))}
          </div>
        </div>

        <button type="button" onClick={() => onOpen(project)} className="btn-voir-plus">
          <span>{t('card.seeMore')}</span>
          <i className="bx bx-right-arrow-alt" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
}
