import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { translate } from '../lib/i18n.js';

const LanguageContext = createContext(null);
const STORAGE_KEY = 'lang';

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() =>
    localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'fr'
  );

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLangState((previous) => {
      const next = previous === 'fr' ? 'en' : 'fr';
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const t = useCallback((key) => translate(lang, key), [lang]);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage doit etre utilise a l'interieur d'un LanguageProvider");
  }
  return context;
}
