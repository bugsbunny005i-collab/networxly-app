import React from 'react';
import { VeritasNavbar } from './components/VeritasNavbar';
import { VeritasHero3D } from './components/VeritasHero3D';
import { VeritasWhySection } from './components/VeritasWhySection';
import { VeritasServices } from './components/VeritasServices';
import { VeritasTrust } from './components/VeritasTrust';
import { VeritasCTA } from './components/VeritasCTA';
import { VeritasFooter } from './components/VeritasFooter';
export function App() {
  return <div className="min-h-screen bg-[#0A1628] text-white selection:bg-[#D4AF37] selection:text-[#0A1628]">
      <VeritasNavbar />

      <main>
        <VeritasHero3D />
        <VeritasWhySection />
        <VeritasServices />
        <VeritasTrust />
        <VeritasCTA />
      </main>

      <VeritasFooter />
    </div>;
}