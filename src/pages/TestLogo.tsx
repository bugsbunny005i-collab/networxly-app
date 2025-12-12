// src/pages/TestLogo.tsx
import React from 'react';
import NetworxlyLogo from '../components/NetworxlyLogo';

export default function TestLogo() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center space-y-10 p-10">
      
      <h1 className="text-2xl font-bold text-gray-700">Logo Testing Lab 🧪</h1>

      {/* 1. मोठा लोगो (Login Page साठी) */}
      <div className="bg-white p-10 rounded-xl shadow-lg border border-gray-200">
        <p className="text-sm text-gray-500 mb-4 text-center">Large Size (For Login Page)</p>
        <NetworxlyLogo size={300} showWordmark={true} />
      </div>

      {/* 2. छोटा लोगो (Navbar साठी) */}
      <div className="bg-white p-5 rounded-xl shadow-md border border-gray-200 flex items-center">
        <p className="text-sm text-gray-500 mr-4">Navbar Mode:</p>
        <NetworxlyLogo size={80} showWordmark={false} />
      </div>

    </div>
  );
}