import './Breadcrumbs.css'
import { Link, useLocation } from "react-router-dom";

export const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);

    const formatValue = (value) => {
      // Remover el número del principio
      const formattedValue = value.replace(/^\d+-/, '');
      // Reemplazar %20 con espacios y capitalizar
      return decodeURIComponent(formattedValue).replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
    };
  
    const breadcrumb = pathnames.map((value, index) => {
      const isLast = index === pathnames.length - 1;
      const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;

      if (isLast) {
        return <span key={routeTo}><Link to={routeTo}> {formatValue(value.charAt(0).toUpperCase() + value.slice(1))} </Link></span>;
      }
      return (
        <span key={routeTo}>
          <Link to={routeTo}>{value.charAt(0).toUpperCase() + value.slice(1)}</Link> → &nbsp;
        </span>
      );
    });
  
    return (
    <section className='breadcrumbs-section'>
        <h3>
            {breadcrumb.length > 0 ? <Link to="/">Inicio</Link> : "Inicio"}
            {breadcrumb.length > 0 && " → "}
            {breadcrumb}
        </h3>
    </section>
      
    );
  };