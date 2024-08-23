import './Breadcrumbs.css';
import { Link, useLocation, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);

    const { t } = useTranslation();
    const { lng } = useParams();

    const formatValue = (value) => {

      const formattedValue = value.split('-')
      if (formattedValue.length > 1){
        const decodedValue = decodeURIComponent(formattedValue[1])
        .replace(/-/g, ' ');

        return decodedValue;
      }
      return value;
    };

    const breadcrumb = pathnames.map((value, index) => {
      const isFirst = index === 0;
      const isLast = index === pathnames.length - 1;
      const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;

      if (isFirst) return null;
      else if (isLast) {
        return (
          <span key={routeTo}>
            <Link to={routeTo}> 
              {t(`breadcrums.${value}`, { defaultValue: formatValue(value) })}
            </Link>
          </span>
        );
      }

      return (
        <span key={routeTo}>
          <Link to={routeTo}>
            {t(`breadcrums.${value}`, { defaultValue: formatValue(value) })}
          </Link> → &nbsp;
        </span>
      );
    });

    return (
      <section className='breadcrumbs-section'>
        <h3>
          {breadcrumb.length > 0 ? 
            <Link to={`/${lng}/`}>{t('breadcrums.home')}</Link> 
            : t('breadcrums.home')}
          {breadcrumb.length > 0 && " → "}
          {breadcrumb}
        </h3>
      </section>
    );
};
