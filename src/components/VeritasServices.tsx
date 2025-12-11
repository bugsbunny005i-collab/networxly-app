import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Gavel, Fingerprint, Users, Activity } from 'lucide-react';
const services = [{
  icon: Briefcase,
  title: 'Employment Verification',
  description: 'Validate work history, titles, and tenure directly with sources.'
}, {
  icon: GraduationCap,
  title: 'Education Verification',
  description: 'Confirm degrees, diplomas, and certifications globally.'
}, {
  icon: Gavel,
  title: 'Criminal Checks',
  description: 'Comprehensive local, national, and international criminal searches.'
}, {
  icon: Fingerprint,
  title: 'Identity Verification',
  description: 'Biometric and document-based identity validation.'
}, {
  icon: Users,
  title: 'Reference Checks',
  description: 'Automated and qualitative reference gathering.'
}, {
  icon: Activity,
  title: 'Continuous Monitoring',
  description: 'Real-time alerts for changes in employee status.'
}];
export function VeritasServices() {
  return <section id="services" className="py-24 bg-[#0F1C30] relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <motion.span initial={{
          opacity: 0
        }} whileInView={{
          opacity: 1
        }} className="text-[#D4AF37] font-bold tracking-widest uppercase text-sm block mb-2">
            Our Solutions
          </motion.span>
          <motion.h2 initial={{
          opacity: 0,
          x: -20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} className="text-4xl md:text-5xl font-serif font-bold text-white">
            Comprehensive Verification
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => <motion.div key={index} initial={{
          opacity: 0,
          scale: 0.95
        }} whileInView={{
          opacity: 1,
          scale: 1
        }} viewport={{
          once: true
        }} transition={{
          delay: index * 0.1
        }} className="group relative p-8 bg-[#0A1628] border border-white/5 hover:border-[#D4AF37]/30 rounded-lg overflow-hidden transition-all duration-300">
              {/* Hover Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 to-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="w-14 h-14 bg-[#1A2639] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/5 group-hover:border-[#D4AF37]/50">
                  <service.icon className="w-6 h-6 text-white group-hover:text-[#D4AF37] transition-colors" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 font-serif">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                <a href="#" className="inline-flex items-center text-[#D4AF37] text-sm font-semibold uppercase tracking-wider hover:text-white transition-colors">
                  Learn More <span className="ml-2">→</span>
                </a>
              </div>
            </motion.div>)}
        </div>
      </div>
    </section>;
}