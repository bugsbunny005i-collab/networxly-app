import React from 'react';
import { motion } from 'framer-motion';
export function SecurityTrust() {
  return <section id="trust" className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">
            Enterprise-Grade Security & Compliance
          </h2>

          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12">
            {[{
            val: '1M+',
            label: 'Verifications'
          }, {
            val: '99.9%',
            label: 'Accuracy'
          }, {
            val: '<60s',
            label: 'Avg Speed'
          }].map((stat, i) => <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#3B82F6] mb-1">
                  {stat.val}
                </div>
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>)}
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {['ISO 27001', 'SOC 2 Type II', 'GDPR Compliant', 'Blockchain Certified'].map((cert, i) => <div key={i} className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600">
                {cert}
              </div>)}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-16">
          <p className="text-center text-gray-400 text-sm font-medium mb-8 uppercase tracking-widest">
            Trusted by Industry Leaders
          </p>
          <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale">
            {/* Placeholder Logos */}
            {['TechCorp', 'GlobalBank', 'EduSystem', 'SecureNet', 'FutureHire', 'DataTrust'].map((logo, i) => <span key={i} className="text-xl font-bold text-gray-800">
                {logo}
              </span>)}
          </div>
        </div>
      </div>
    </section>;
}