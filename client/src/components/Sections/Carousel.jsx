import './Carousel.css';
import { Link } from 'react-router-dom';

import { useNavigate, useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch.js';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';

import { ROUTES } from '../../config/apiRoutes.js';

export function Carousel() {
  const contentRef = useRef(null);

  const { data } = useFetch({ url: ROUTES.ACTIVITIES_STOCK });
  const activities = data ? data : [];
 
  const navigate = useNavigate();

  const { t } = useTranslation();
  const { lng } = useParams();
  
  const scrollLeft = () => {
    if (contentRef.current) {
      contentRef.current.scrollBy({ left: -contentRef.current.offsetWidth , behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (contentRef.current) {
      contentRef.current.scrollBy({ left: contentRef.current.offsetWidth + 20, behavior: 'smooth' });
    }
  };

  return (

    <section className='activities-section'>
        <h2>{t('home.activitiesSection.title1')} <span>{t('home.activitiesSection.title2')}</span></h2>
        <section className="carousel-container">
          <button className="arrow arrow-left" onClick={scrollLeft}>
            &lt;
          </button>
          <div className="carousel-content" ref={contentRef}>
            <div className="carousel-item">
              <Link to={`/${lng}/activities`}>{t('home.activitiesSection.link')}</Link>
            </div>
            {activities.map((activity) => (
              <div key={activity.id} className="carousel-item">
                <img src={`/activities/${activity.id}.webp`} alt={`carousel-item-${activity.id}`} />
                <div className="info">
                  <span>{activity.title}</span>
                  <button onClick={() => navigate(`/${lng}/activities/${activity.id}-${activity.title}`,{state:activity})}>{t('home.activitiesSection.action')}</button>
                </div>
              </div>
            ))}
          </div>
          <button className="arrow arrow-right" onClick={scrollRight}>
            &gt;
          </button>
        </section>
    </section>
    
  )
}
