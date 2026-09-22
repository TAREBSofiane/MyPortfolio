import { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function DetailModal({ title, onClose, children }) {
  const modalRef = useRef(null);
  const previouslyFocused = useRef(null);
  const { t } = useLanguage();

  useEffect(() => {
    previouslyFocused.current = document.activeElement;
    document.body.style.overflow = 'hidden';

    const modal = modalRef.current;
    const getFocusableElements = () =>
      Array.from(modal.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
        (element) => element.offsetParent !== null
      );

    const closeButton = modal.querySelector('.close-modal');
    if (closeButton) {
      closeButton.focus();
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusableElements = getFocusableElements();
      if (!focusableElements.length) {
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      if (previouslyFocused.current && previouslyFocused.current.focus) {
        previouslyFocused.current.focus();
      }
    };
  }, [onClose]);

  return (
    <div
      ref={modalRef}
      className="modal show"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="modal-content">
        <div className="modal-header">
          <h2 id="modal-title" className="text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          <button type="button" onClick={onClose} className="close-modal" aria-label={t('modal.close')}>
            <i className="bx bx-x" aria-hidden="true"></i>
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
