import React from 'react';
import { motion } from 'framer-motion';
import { VeritasButton } from './ui/VeritasButton';
export function VeritasCTA() {
  return <section className="py-24 bg-[#0A1628] relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#0F1C30] to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#050B14] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div>
            <motion.h2 initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Ready to Secure Your <br />
              <span className="text-[#D4AF37]">Hiring Process?</span>
            </motion.h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Join 500+ enterprise companies that trust Veritas for their
              background verification needs. Schedule a personalized demo today.
            </p>
            <ul className="space-y-4 mb-8">
              {['Enterprise-grade API', 'Dedicated Account Manager', 'Custom Workflows'].map((item, i) => <li key={i} className="flex items-center text-gray-300">
                  <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mr-3" />
                  {item}
                </li>)}
            </ul>
          </div>

          {/* Form */}
          <motion.div initial={{
          opacity: 0,
          x: 20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} className="bg-white p-8 rounded-lg shadow-2xl">
            <h3 className="text-2xl font-bold text-[#0A1628] mb-6 font-serif">
              Request a Demo
            </h3>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                    First Name
                  </label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-200 p-3 rounded text-[#0A1628] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Last Name
                  </label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-200 p-3 rounded text-[#0A1628] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                  Work Email
                </label>
                <input type="email" className="w-full bg-gray-50 border border-gray-200 p-3 rounded text-[#0A1628] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                  Company
                </label>
                <input type="text" className="w-full bg-gray-50 border border-gray-200 p-3 rounded text-[#0A1628] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all" />
              </div>

              <VeritasButton className="w-full justify-center mt-4">
                Submit Request
              </VeritasButton>

              <p className="text-xs text-center text-gray-400 mt-4">
                By submitting, you agree to our Terms of Service and Privacy
                Policy.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>;
}