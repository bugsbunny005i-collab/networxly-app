import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, Globe, Award } from 'lucide-react';
const stats = [{
  icon: ShieldCheck,
  value: '99.9%',
  label: 'Accuracy Rate',
  description: 'AI-powered precision verification'
}, {
  icon: Clock,
  value: '48hr',
  label: 'Turnaround',
  description: 'Fastest in the industry'
}, {
  icon: Globe,
  value: '150+',
  label: 'Countries',
  description: 'Global coverage capability'
}, {
  icon: Award,
  value: 'ISO',
  label: 'Certified',
  description: 'Enterprise-grade security'
}];
export function VeritasWhySection() {
  return <section id="why" className="py-24 bg-[#0A1628] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37] rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900 rounded-full blur-[128px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Why Leading Companies Choose{' '}
            <span className="text-[#D4AF37]">Veritas</span>
          </motion.h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => <motion.div key={index} initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: index * 0.1
        }} className="group p-8 rounded-xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 hover:-translate-y-2">
              <div className="w-12 h-12 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center mb-6 group-hover:bg-[#D4AF37] transition-colors duration-300">
                <stat.icon className="w-6 h-6 text-[#D4AF37] group-hover:text-[#0A1628] transition-colors duration-300" />
              </div>
              <h3 className="text-4xl font-bold text-white mb-2">
                {stat.value}
              </h3>
              <p className="text-[#D4AF37] font-semibold uppercase tracking-wider text-sm mb-3">
                {stat.label}
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                {stat.description}
              </p>
            </motion.div>)}
        </div>
      </div>
    </section>;
}