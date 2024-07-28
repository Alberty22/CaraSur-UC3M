import React from 'react';
import './HomePage.css';
import { PrimarySection } from '../../components/Sections/PrimarySection.jsx';
import { Separator } from '../../components/Sections/Separator.jsx';
import { DescriptionSection } from '../../components/Sections/DescriptionSection.jsx';
import { ActivitiesTitleSection } from '../../components/Sections/ActivitiesTitleSection.jsx';
import { PrivilegesSection } from '../../components/Sections/PrivilegesSection.jsx';
import { ContactSection } from '../../components/Sections/ContactSection.jsx';
import { EquipmentSection } from '../../components/Sections/EquipmentSection.jsx';
import { useLocation } from "react-router-dom";
import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth.js';

export function HomePage() {
    
    const { isAuthenticated } = useAuth()

    const location = useLocation();

    useEffect(() => {
        const hash = location.hash;
        if (hash) {
          const element = document.getElementById(hash.substring(1));
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, [location]);

    return (
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
              <EquipmentSection />
              </>
            }
            <ContactSection />
        </main>
      );
}