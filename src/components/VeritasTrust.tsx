import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
export function VeritasTrust() {
  const companies = ['TechGlobal', 'FinSecure', 'HealthPlus', 'AeroSpace', 'DataCorp', 'BankOne', 'CyberGuard', 'NetSystems'];
  return <section id="trust" className="py-24 bg-[#0A1628] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        {/* Logos */}
        <div className="text-center mb-20">
          <p className="text-gray-400 text-sm uppercase tracking-widest mb-10">
            Trusted by Industry Leaders
          </p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {companies.map((company, i) => <motion.div key={i} initial={{
            opacity: 0
          }} whileInView={{
            opacity: 1
          }} transition={{
            delay: i * 0.1
          }} className="text-xl font-bold font-serif text-white/80">
                {company}
              </motion.div>)}
          </div>
        </div>

        {/* Testimonial */}
        <div className="max-w-4xl mx-auto bg-gradient-to-b from-[#0F1C30] to-[#0A1628] p-12 rounded-2xl border border-white/5 relative">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center text-[#0A1628]">
            <Star fill="#0A1628" size={20} />
          </div>

          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-serif italic text-white mb-8 leading-relaxed">
              "Veritas has completely transformed our hiring process. The speed
              and accuracy of their verification is unmatched in the enterprise
              sector. They are true partners in our security strategy."
            </h3>

            <div>
              <p className="text-[#D4AF37] font-bold text-lg">Sarah Jenkins</p>
              <p className="text-gray-400 text-sm">
                Chief People Officer, GlobalBank
              </p>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="flex justify-center gap-8 mt-16">
          {['ISO 27001', 'SOC 2 Type II', 'GDPR Compliant', 'PBS A Accredited'].map((cert, i) => <div key={i} className="px-4 py-2 border border-white/10 rounded text-xs text-gray-400 uppercase tracking-wider">
              {cert}
            </div>)}
        </div>
      </div>
    </section>;
}