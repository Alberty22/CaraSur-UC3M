import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation} from 'react-router-dom';
import './LanguageSelector.css';

export function LanguageSelector() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const changeLanguage = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
    const newPath = `/${selectedLanguage}${location.pathname.replace(/^\/[a-z]{2}/, '')}`;
    navigate(newPath);
  }

  return (
    <div className="language-selector-wrapper">
      <select className='language-selector' value={i18n.language} onChange={changeLanguage}>
        <option value="es">ES</option>
        <option value="en">EN</option>
      </select>
    </div>
    
  )
}
