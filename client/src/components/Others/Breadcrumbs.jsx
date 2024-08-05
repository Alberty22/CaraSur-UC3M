import './Breadcrumbs.css'
import { Link, useLocation, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);

    const { t } = useTranslation()
    const { lng } = useParams()

    const formatValue = (value) => {
      const formattedValue = value.replace(/^\d+-/, '');
      
      return decodeURIComponent(formattedValue).replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
    };
  
    const breadcrumb = pathnames.map((value, index) => {
      const isFirst = index === 0
      const isLast = index === pathnames.length - 1;
      const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;

      if (isFirst) return 
      else if (isLast) {
        return <span key={routeTo}><Link to={routeTo}> {t(`breadcrums.${value}`, { defaultValue: formatValue(value.charAt(0).toUpperCase() + value.slice(1)) })} </Link></span>;
      }

      return (
        <span key={routeTo}>
          <Link to={routeTo}>{t(`breadcrums.${value}`, { defaultValue: formatValue(value.charAt(0).toUpperCase() + value.slice(1)) })}</Link> → &nbsp;
        </span>
      );
    });
    

    

    return (
    <section className='breadcrumbs-section'>
        <h3>
            {breadcrumb.length > 0 ? <Link to={`/${lng}/`}>{t('breadcrums.home')}</Link> : t('breadcrums.home')}
            {breadcrumb.length > 0 && " → "}
            {breadcrumb}
        </h3>
    </section>
      
    );
  };