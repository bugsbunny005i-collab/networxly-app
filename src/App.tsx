import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// --- Components & Pages Imports ---
import { Login } from './pages/Login'; 
import { Register } from './pages/Register';
import { AuthPage } from './pages/AuthPage'; // 🔥 Designed Auth Page
import { LandingPage } from './pages/LandingPage';

// --- User Dashboard Pages ---
import { UserDashboard } from './pages/UserDashboard'; // Bugs Bunny Dashboard
import { MyNetworkPage } from './pages/MyNetworkPage';
import { JobsPage } from './pages/JobsPage';
import { MessagingPage } from './pages/MessagingPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ProfilePage } from './pages/ProfilePage';

// --- Components ---
import { ModernNavbar as Navbar } from './components/ModernNavbar';
import { QCGuard } from './components/QCGuard'; // 🔥 QC Guard Import

// --- Layout for Profile Page (Adds Navbar) ---
const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />
    <div className="pt-20 pb-10 bg-[#F3F2EF] min-h-screen">
      {children}
    </div>
  </>
);

// --- Login Guard (Protected Route) ---
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = sessionStorage.getItem('veritas_user');
  if (!user) return <Navigate to="/login" />;
  return <>{children}</>;
};

// --- 🔥 SECRET ACCESS COMPONENT (ही तुझी जादूची लिंक आहे) ---
const SecretAccess = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // 1. Grant Access
    localStorage.setItem('veritas_qc_access', 'granted');
    alert("🔓 QC Access Granted! Welcome Bhau 🚀");
    // 2. Redirect to Home
    window.location.href = '/'; 
  }, [navigate]);
  return <div className="p-10 text-center font-bold">Unlocking...</div>;
};

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- 🛑 SECRET ENTRY ROUTE (फक्त तुला माहीत असेल) --- */}
        <Route path="/secret-entry-bhau" element={<SecretAccess />} />

        {/* --- 🔒 MAIN WEBSITE (Wrapped in QCGuard) --- */}
        {/* जोपर्यंत QC Access नाही, तोपर्यंत हे Routes कोणालाच दिसणार नाहीत */}
        <Route path="/*" element={
          <QCGuard>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/register" element={<AuthPage />} />

              {/* Protected User Routes */}
              <Route path="/feed" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
              
              {/* जुन्या /dashboard लिंकला /feed वर पाठवा */}
              <Route path="/dashboard" element={<Navigate to="/feed" replace />} /> 

              <Route path="/network" element={<ProtectedRoute><MyNetworkPage /></ProtectedRoute>} />
              <Route path="/jobs" element={<ProtectedRoute><JobsPage /></ProtectedRoute>} />
              <Route path="/messaging" element={<ProtectedRoute><MessagingPage /></ProtectedRoute>} />
              <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
              
              {/* Profile Page (Needs Layout for Navbar) */}
              <Route path="/profile/:userId?" element={
                <ProtectedRoute>
                  <Layout>
                    <ProfilePage />
                  </Layout>
                </ProtectedRoute>
              } />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </QCGuard>
        } />
      </Routes>
    </BrowserRouter>
  );
}