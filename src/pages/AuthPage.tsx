import React from 'react';
import { AuthBrandingSide } from '../components/AuthBrandingSide';
import { AuthFormSide } from '../components/AuthFormSide';

export function AuthPage() {
  return (
    <div className="min-h-screen w-full flex bg-white">
      {/* Left Side - Branding (40%) */}
      <div className="hidden lg:block lg:w-[40%] h-screen sticky top-0">
        <AuthBrandingSide />
      </div>

      {/* Right Side - Form (60%) */}
      <div className="w-full lg:w-[60%] min-h-screen">
        <AuthFormSide />
      </div>
    </div>
  );
}