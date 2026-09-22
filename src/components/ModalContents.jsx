import { useData } from '../context/DataContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { getSkillIcon } from '../lib/api.js';

export function EducationModalContent({ edu }) {
  const { skillIcons } = useData();
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">{edu.institution}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          <i className="bx bx-calendar mr-1" aria-hidden="true"></i>
          {edu.period}
        </p>
      </div>

      {edu.formation && (
        <div>
          <h5 className="font-semibold text-gray-900 dark:text-white mb-2">{t('modal.formation')}</h5>
          <p className="text-gray-600 dark:text-gray-300">{edu.formation}</p>
        </div>
      )}

      {edu.parcours && (
        <div>
          <h5 className="font-semibold text-gray-900 dark:text-white mb-2">{t('modal.parcours')}</h5>
          <p className="text-gray-600 dark:text-gray-300">{edu.parcours}</p>
        </div>
      )}

      <div>
        <h5 className="font-semibold text-gray-900 dark:text-white mb-3">{t('card.skillsAcquired')}</h5>
        <div className="flex flex-wrap gap-2">
          {edu.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-sm rounded-full flex items-center"
            >
              <i className={`bx ${getSkillIcon(skillIcons, skill)} mr-2`} aria-hidden="true"></i>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ExperienceModalContent({ exp }) {
  const { skillIcons } = useData();
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">{exp.institution}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          <i className="bx bx-calendar mr-1" aria-hidden="true"></i>
          {exp.period}
        </p>
      </div>

      <div>
        <h5 className="font-semibold text-gray-900 dark:text-white mb-2">{t('modal.description')}</h5>
        <p className="text-gray-600 dark:text-gray-300">{exp.description}</p>
      </div>

      {exp.missions?.length > 0 && (
        <div>
          <h5 className="font-semibold text-gray-900 dark:text-white mb-3">{t('modal.missions')}</h5>
          <ul className="space-y-2">
            {exp.missions.map((mission) => (
              <li key={mission} className="flex items-start text-gray-600 dark:text-gray-300">
                <i
                  className="bx bx-check-circle text-primary-600 dark:text-primary-400 mr-2 mt-1 flex-shrink-0"
                  aria-hidden="true"
                ></i>
                <span>{mission}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h5 className="font-semibold text-gray-900 dark:text-white mb-3">{t('card.skillsTools')}</h5>
        <div className="flex flex-wrap gap-2">
          {exp.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-sm rounded-full flex items-center"
            >
              <i className={`bx ${getSkillIcon(skillIcons, skill)} mr-2`} aria-hidden="true"></i>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProjectModalContent({ project }) {
  const { skillIcons } = useData();
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      <div>
        <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-sm rounded-full">
          {project.category.name}
        </span>
      </div>

      <div>
        <h5 className="font-semibold text-gray-900 dark:text-white mb-2">{t('modal.description')}</h5>
        <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
      </div>

      <div>
        <h5 className="font-semibold text-gray-900 dark:text-white mb-3">{t('card.technologies')}</h5>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-sm rounded-full flex items-center"
            >
              <i className={`bx ${getSkillIcon(skillIcons, tech)} mr-2`} aria-hidden="true"></i>
              {tech}
            </span>
          ))}
        </div>
      </div>

      {project.link && (
        <div className="pt-4">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <i className="bx bxl-github text-2xl mr-2" aria-hidden="true"></i>
            {t('modal.github')}
          </a>
        </div>
      )}
    </div>
  );
}
