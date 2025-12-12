import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// --- Pages Imports ---
// (तुम्ही आधी बनवलेले सर्व आवश्यक पेजेस)
import { Login } from './pages/Login';
import { Register } from './pages/Register';
// Feed, JobPage, etc. imports...
import { Feed } from './pages/Feed'; 
import { JobPage } from './pages/JobPage';

// --- Components Imports (Landing Page साठी लागणारे) ---
// हे सर्व 7 components तुमच्या Original App.tsx मध्ये होते
import { VeritasNavbar } from './components/VeritasNavbar';
import { VeritasHero3D } from './components/VeritasHero3D';
import { VeritasWhySection } from './components/VeritasWhySection';
import { VeritasServices } from './components/VeritasServices';
import { VeritasTrust } from './components/VeritasTrust';
import { VeritasCTA } from './components/VeritasCTA';
import { VeritasFooter } from './components/VeritasFooter';

// --- Landing Page Component ---
// (हा तुमचा मूळ Home Page चा कोड आहे, सर्व 7 components इथे आहेत)
function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A1628] text-white selection:bg-[#D4AF37] selection:text-[#0A1628]">
      <VeritasNavbar />

      <main>
        <VeritasHero3D />
        <VeritasWhySection />
        <VeritasServices />
        <VeritasTrust />
        <VeritasCTA />
      </main>

      <VeritasFooter />
    </div>
  );
}

// --- Main App Component with Full Routing ---
export function App() {
  return (
    <Router>
      <Routes>
        {/* 1. Home / Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* 2. Authentication Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 3. Main Application Pages */}
        <Route path="/feed" element={<Feed />} />
        <Route path="/jobs" element={<JobPage />} />
      </Routes>
    </Router>
  );
}