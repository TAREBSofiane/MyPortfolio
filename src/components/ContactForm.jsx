import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useData } from '../context/DataContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import ContactField from './ContactField.jsx';

const INITIAL_VALUES = { name: '', email: '', subject: '', message: '' };
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const { profile } = useData();
  const { t } = useLanguage();
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [formStatus, setFormStatus] = useState({ message: '', type: '' });
  const statusTimer = useRef(null);

  useEffect(() => () => clearTimeout(statusTimer.current), []);

  const validateField = (name, value) => {
    if (!value.trim()) {
      return t('form.required');
    }
    if (name === 'email' && value.trim() && !EMAIL_REGEX.test(value)) {
      return t('form.invalidEmail');
    }
    return '';
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: '' }));
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setErrors((previous) => ({ ...previous, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = {};
    Object.keys(INITIAL_VALUES).forEach((name) => {
      const message = validateField(name, values[name]);
      if (message) {
        newErrors[name] = message;
      }
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const emailPublicKey = import.meta.env.VITE_EMAIL_JS;
    if (!emailPublicKey) {
      setFormStatus({ message: t('form.missingConfig'), type: 'error' });
      return;
    }

    setIsSending(true);
    try {
      await emailjs.send(
        profile?.emailjs?.serviceId,
        profile?.emailjs?.templateId,
        {
          from_name: values.name,
          from_email: values.email,
          subject: values.subject,
          message: values.message
        },
        { publicKey: emailPublicKey }
      );

      setFormStatus({ message: t('form.success'), type: 'success' });
      setValues(INITIAL_VALUES);
    } catch (error) {
      console.error(error);
      setFormStatus({ message: t('form.error'), type: 'error' });
    } finally {
      setIsSending(false);
      clearTimeout(statusTimer.current);
      statusTimer.current = setTimeout(() => setFormStatus({ message: '', type: '' }), 4000);
    }
  };

  const statusClass =
    formStatus.type === 'success'
      ? 'text-green-600 dark:text-green-400'
      : formStatus.type === 'error'
        ? 'text-red-600 dark:text-red-400'
        : '';

  return (
    <form className="space-y-6" noValidate onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 gap-6">
        <ContactField name="name" type="text" value={values.name} error={errors.name} onChange={handleChange} onBlur={handleBlur} />
        <ContactField name="email" type="email" value={values.email} error={errors.email} onChange={handleChange} onBlur={handleBlur} />
      </div>

      <ContactField name="subject" type="text" value={values.subject} error={errors.subject} onChange={handleChange} onBlur={handleBlur} />
      <ContactField name="message" rows={5} value={values.message} error={errors.message} onChange={handleChange} onBlur={handleBlur} />

      <div className="flex items-center justify-between pt-2">
        <div id="form-status" className={`text-sm ${statusClass}`} aria-live="polite">
          {formStatus.message}
        </div>
        <button
          type="submit"
          disabled={isSending}
          className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <span>{t('form.send')}</span>
          <i className="bx bx-send ml-2" aria-hidden="true"></i>
          <div
            className={`ml-2 w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin ${
              isSending ? '' : 'hidden'
            }`}
          ></div>
        </button>
      </div>
    </form>
  );
}
