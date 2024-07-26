import React from 'react';
import './Main.css';
import { PrimarySection } from './sections/PrimarySection';
import { Separator } from './sections/Separator';
import { DescriptionSection } from './sections/DescriptionSection';
import { ActivitiesTitleSection } from './sections/ActivitiesTitleSection';
import { PrivilegesSection } from './sections/PrivilegesSection';

export function Main() {
    
    return (
        <main>
            <PrimarySection />
            <Separator />
            <DescriptionSection />
            <ActivitiesTitleSection />
            <PrivilegesSection />
        </main>
      );
}