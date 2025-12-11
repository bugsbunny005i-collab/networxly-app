import React from 'react';
// 🔥 FIX: Public Navbar Import (User Navbar नाही)
import { VeritasNavbar } from '../components/VeritasNavbar'; 
import { BlockchainHero3D } from '../components/BlockchainHero3D';
import { ProblemSolution } from '../components/ProblemSolution';
import { HowItWorks } from '../components/HowItWorks';
import { TechFeatures } from '../components/TechFeatures';
import { UseCases } from '../components/UseCases';
import { SecurityTrust } from '../components/SecurityTrust';
import { DemoCTA } from '../components/DemoCTA';
// 🔥 FIX: Public Footer Import
import { VeritasFooter } from '../components/VeritasFooter'; 

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-[#0F172A] font-sans">
      {/* ✅ Public Navbar with Navy Text & Login Buttons */}
      <VeritasNavbar />
      
      <main>
        <BlockchainHero3D />
        <ProblemSolution />
        <HowItWorks />
        <TechFeatures />
        <UseCases />
        <SecurityTrust />
        <DemoCTA />
      </main>
      
      {/* ✅ Public Footer */}
      <VeritasFooter />
    </div>
  );
}