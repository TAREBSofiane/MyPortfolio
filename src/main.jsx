import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'boxicons/css/boxicons.min.css';
import 'aos/dist/aos.css';
import './index.css';
import './style.css';
import App from './App.jsx';
import { LanguageProvider } from './context/LanguageContext.jsx';
import { DataProvider } from './context/DataContext.jsx';

const preloader = document.getElementById('preloader');
if (preloader) {
  const hidePreloader = () => {
    preloader.classList.add('fade-out');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  };

  if (document.readyState === 'complete') {
    hidePreloader();
  } else {
    window.addEventListener('load', hidePreloader, { once: true });
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <DataProvider>
          <App />
        </DataProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>
);
