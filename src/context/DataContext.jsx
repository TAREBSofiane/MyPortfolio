import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { fetchJson } from '../lib/api.js';
import { useLanguage } from './LanguageContext.jsx';

const DataContext = createContext(null);

const SHARED_DATA_PATHS = {
  skills: '/data/skills.json',
  skillIcons: '/data/skill-icons.json'
};

function getLocalizedDataPaths(lang) {
  const base = lang === 'en' ? '/data/en' : '/data';
  return {
    profile: `${base}/profile.json`,
    education: `${base}/education.json`,
    experiences: `${base}/experiences.json`,
    projects: `${base}/projects.json`,
    ...SHARED_DATA_PATHS
  };
}

export function DataProvider({ children }) {
  const { lang } = useLanguage();
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setStatus('loading');
    setError(null);
    try {
      const paths = getLocalizedDataPaths(lang);
      const entries = await Promise.all(
        Object.entries(paths).map(async ([key, path]) => [key, await fetchJson(path)])
      );
      setData(Object.fromEntries(entries));
      setStatus('ready');
    } catch (err) {
      console.error('Erreur lors du chargement des donnees :', err);
      setError(err);
      setStatus('error');
    }
  }, [lang]);

  useEffect(() => {
    load();
  }, [load]);

  const value = { ...data, status, error, retry: load };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData doit etre utilise a l\'interieur d\'un DataProvider');
  }
  return context;
}
