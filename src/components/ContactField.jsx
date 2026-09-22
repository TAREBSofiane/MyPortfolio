import { useLanguage } from '../context/LanguageContext.jsx';

const FIELD_ICONS = { name: 'bx-user', email: 'bx-envelope', subject: 'bx-chat', message: 'bx-pencil' };

export default function ContactField({ name, type = 'text', rows, value, error, onChange, onBlur }) {
  const { t } = useLanguage();
  const isTextarea = name === 'message';
  const hasError = Boolean(error);

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium mb-2">
        {t(`form.${name}`)}
      </label>
      <div className="relative">
        <div
          className={`absolute left-3 flex pointer-events-none ${
            isTextarea ? 'top-3 items-start' : 'inset-y-0 items-center'
          }`}
        >
          <i className={`bx ${FIELD_ICONS[name]} text-gray-500`} aria-hidden="true"></i>
        </div>
        {isTextarea ? (
          <textarea
            id={name}
            name={name}
            rows={rows}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            aria-invalid={hasError}
            aria-describedby={hasError ? `error-${name}` : undefined}
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 transition-colors duration-300"
          ></textarea>
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            aria-invalid={hasError}
            aria-describedby={hasError ? `error-${name}` : undefined}
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 transition-colors duration-300"
          />
        )}
        {hasError && (
          <p id={`error-${name}`} role="alert" className="mt-1 text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}