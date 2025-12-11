import React from 'react';
import { motion } from 'framer-motion';
import { ModernButton } from './ui/ModernButton';
export function DemoCTA() {
  return <section className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
              Ready to Modernize Your Verification?
            </h2>
            <p className="text-gray-600 mb-8 max-w-lg mx-auto">
              Join 500+ companies using blockchain verification to hire faster
              and safer.
            </p>

            <form className="max-w-md mx-auto space-y-4 text-left">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent outline-none transition-all" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Work Email
                </label>
                <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent outline-none transition-all" placeholder="john@company.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Use Case
                </label>
                <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent outline-none transition-all bg-white">
                  <option>Corporate Hiring</option>
                  <option>University / Education</option>
                  <option>Individual Verification</option>
                </select>
              </div>
              <ModernButton className="w-full justify-center text-base py-3 mt-2">
                Request Demo
              </ModernButton>
            </form>
          </div>
          <div className="bg-gray-50 px-8 py-4 text-center border-t border-gray-100">
            <p className="text-xs text-gray-500">
              No credit card required. 14-day free trial available.
            </p>
          </div>
        </div>
      </div>
    </section>;
}