import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import i18n from '../i18n/config'

export function useLanguageFromURL() {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    const language = pathname.split('/')[1];

    if (['en', 'es'].includes(language)) {
      i18n.changeLanguage(language)
    } else {
      i18n.changeLanguage('es')
    }
  }, [location])
}