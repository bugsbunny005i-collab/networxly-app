import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Cpu, CheckCircle } from 'lucide-react';
export function HowItWorks() {
  const steps = [{
    icon: Upload,
    title: 'Submit Credentials',
    desc: 'Candidates or institutions upload documents securely to the platform.'
  }, {
    icon: Cpu,
    title: 'AI + Blockchain Verification',
    desc: 'AI validates data accuracy while Blockchain hashes the record permanently.'
  }, {
    icon: CheckCircle,
    title: 'Instant Results',
    desc: 'A verifiable digital certificate is issued that can be shared instantly.'
  }];
  return <section id="how-it-works" className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
            Three Steps to Verified Trust
          </h2>
          <p className="text-gray-600">
            A seamless process designed for speed and security.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, index) => <motion.div key={index} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.2
          }} className="bg-white p-6 text-center">
                <div className="w-16 h-16 mx-auto bg-white border-2 border-blue-100 rounded-full flex items-center justify-center mb-6 text-[#3B82F6] shadow-sm relative">
                  <step.icon size={28} />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#7C3AED] text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.desc}</p>
              </motion.div>)}
          </div>
        </div>
      </div>
    </section>;
}