import React from 'react';
export function VeritasFooter() {
  return <footer className="bg-[#050B14] text-white pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-[#D4AF37] flex items-center justify-center rounded-sm">
                <span className="text-[#0A1628] font-serif font-bold text-xl">
                  V
                </span>
              </div>
              <span className="text-xl font-serif font-bold tracking-wide">
                VERITAS
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              The global standard for enterprise background verification. Trust,
              accuracy, and speed for the modern workforce.
            </p>
            <div className="flex gap-4">
              {/* Social Placeholders */}
              {[1, 2, 3, 4].map(i => <div key={i} className="w-8 h-8 bg-white/5 rounded-full hover:bg-[#D4AF37] hover:text-[#0A1628] transition-colors cursor-pointer" />)}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-6 text-[#D4AF37]">
              Solutions
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Employment Verification
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Criminal Checks
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Identity Verification
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Drug Screening
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Global Sanctions
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-6 text-[#D4AF37]">
              Company
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Partners
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-6 text-[#D4AF37]">
              Legal
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Security
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Compliance
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Cookie Settings
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>&copy; 2024 Veritas Verification Services. All rights reserved.</p>
          <div className="flex gap-6">
            <span>English (US)</span>
            <span>Sitemap</span>
          </div>
        </div>
      </div>
    </footer>;
}