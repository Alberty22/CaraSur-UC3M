import './HomePage.css';

import { PrimarySection } from '../../components/Sections/PrimarySection.jsx';
import { Separator } from '../../components/Sections/Separator.jsx';
import { DescriptionSection } from '../../components/Sections/DescriptionSection.jsx';
import { ActivitiesTitleSection } from '../../components/Sections/ActivitiesTitleSection.jsx';
import { PrivilegesSection } from '../../components/Sections/PrivilegesSection.jsx';
import { ContactSection } from '../../components/Sections/ContactSection.jsx';
import { EquipmentSection } from '../../components/Sections/EquipmentSection.jsx';
import { Carousel } from '../../components/Sections/Carousel.jsx';
import Popup from '../../components/others/Popup.jsx';
import { OkSection } from '../../components/others/OkSection';
import { FailedSection } from '../../components/others/FailedSection.jsx';

import { useLocation } from "react-router-dom";
import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth.js';
import { usePopup } from '../../hooks/usePopups.js';
import { useTranslation } from 'react-i18next';



function HomePage() {
    
    const { isAuthenticated } = useAuth()

    const { t } = useTranslation()

    const location = useLocation()

    const { popupContent, handleOpen } = usePopup()

    useEffect(() => {
        const hash = location.hash;
        if (hash) {
          const element = document.getElementById(hash.substring(1));
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
          if (hash.substring(1) === 'success') {
            handleOpen(<OkSection message={t('signup.success')} />)
          }
          else if(hash.substring(1) === 'failed')
            handleOpen(<FailedSection message={t('signup.failed')} />)
        }
        else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, [location]);

    return (
      <>
        <main>
            <PrimarySection />
            <Separator />
            <DescriptionSection />
            { !isAuthenticated &&
              <>
              <ActivitiesTitleSection />
              <PrivilegesSection />
              </>}
              
            { isAuthenticated &&
              <>
              <Carousel/>
              <EquipmentSection />
              </>
            }
            <ContactSection />
        </main>

      { popupContent &&
        <Popup className='popup-product'>
            {popupContent}
        </Popup>
      }
    </>
      );
}

export default HomePage;