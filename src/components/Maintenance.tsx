import React from 'react';
import { ShieldAlert } from 'lucide-react';

export function Maintenance() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 max-w-md w-full">
        <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldAlert className="w-10 h-10 text-yellow-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Under Maintenance</h1>
        <p className="text-gray-500 mb-6">
          We are currently performing scheduled maintenance and quality checks. 
          Veritas will be back live shortly.
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div className="bg-blue-600 h-2 rounded-full w-[75%] animate-pulse"></div>
        </div>
        <p className="text-xs text-gray-400 font-mono">Status: QC_IN_PROGRESS</p>
      </div>
    </div>
  );
}