import React from 'react';
import './Main.css';
import { PrimarySection } from './sections/PrimarySection';
import { Separator } from './sections/Separator';
import { DescriptionSection } from './sections/DescriptionSection';

export function Main() {
    
    return (
        <main>
            <PrimarySection />
            <Separator />
            <DescriptionSection />
        </main>
      );
}