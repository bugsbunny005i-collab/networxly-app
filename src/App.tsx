import React from 'react';
// BrowserRouter, Routes, आणि Route हे Routing साठी लागतात (हे आवश्यक होते)
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// --- Pages Imports ---
// (Login आणि Register हे Navigation साठी लागतात)
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Feed } from './pages/Feed'; // Feed Page

// --- Components Imports (Landing Page साठी लागणारे सर्व ७ कंपोनेंट्स) ---
// हे सर्व कंपोनेंट्स तुमच्या मूळ फाइलमध्ये होते
import { VeritasNavbar } from './components/VeritasNavbar';
import { VeritasHero3D } from './components/VeritasHero3D';
import { VeritasWhySection } from './components/VeritasWhySection';
import { VeritasServices } from './components/VeritasServices';
import { VeritasTrust } from './components/VeritasTrust';
import { VeritasCTA } from './components/VeritasCTA';
import { VeritasFooter } from './components/VeritasFooter';

// --- Landing Page Component ---
// (तुमचे सर्व ७ कंपोनेंट्स इथे रेंडर होतात)
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
// (यामुळे useNavigate() चालेल)
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

        {/* महत्त्वाची टीप: JobPage चा import आणि route तुमच्याकडे फाईल नसल्याने काढला आहे. */}
      </Routes>
    </Router>
  );
}