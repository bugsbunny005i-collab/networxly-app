import React from 'react';
export function ModernFooter() {
  return <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-bold text-[#0F172A] mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-[#3B82F6]">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#3B82F6]">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#3B82F6]">
                  API
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#3B82F6]">
                  Integrations
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#0F172A] mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-[#3B82F6]">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#3B82F6]">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#3B82F6]">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#3B82F6]">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#0F172A] mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-[#3B82F6]">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#3B82F6]">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#3B82F6]">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#3B82F6]">
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#0F172A] mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-[#3B82F6]">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#3B82F6]">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#3B82F6]">
                  Security
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#3B82F6]">
                  Compliance
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-[#1E40AF] to-[#7C3AED] rounded flex items-center justify-center text-white font-bold text-xs">
              V
            </div>
            <span className="font-bold text-[#0F172A]">Veritas</span>
          </div>
          <p className="text-sm text-gray-500">
            &copy; 2024 Veritas Inc. All rights reserved.
          </p>
          <div className="flex gap-4">
            {/* Social Icons Placeholder */}
            <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
            <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
            <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>
    </footer>;
}