import React from 'react';
import './Main.css';
import { PrimarySection } from './sections/PrimarySection';
import { Separator } from './sections/Separator';
import { DescriptionSection } from './sections/DescriptionSection';
import { ActivitiesTitleSection } from './sections/ActivitiesTitleSection';
import { PrivilegesSection } from './sections/PrivilegesSection';
import { ContactSection } from './sections/ContactSection';

export function Main() {
    
    return (
        <main>
            <PrimarySection />
            <Separator />
            <DescriptionSection />
            <ActivitiesTitleSection />
            <PrivilegesSection />
            <ContactSection />
        </main>
      );
}