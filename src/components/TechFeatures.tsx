import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, BrainCircuit, Zap, Globe2 } from 'lucide-react';
export function TechFeatures() {
  const features = [{
    icon: ShieldCheck,
    title: 'Blockchain Security',
    desc: 'Leveraging Ethereum-based smart contracts to ensure every record is tamper-proof and permanently accessible.'
  }, {
    icon: BrainCircuit,
    title: 'AI-Powered Accuracy',
    desc: 'Advanced machine learning algorithms cross-reference data points to achieve a 99.9% verification accuracy rate.'
  }, {
    icon: Zap,
    title: 'Instant Verification',
    desc: 'Say goodbye to weeks of waiting. Get verified results in under 60 seconds for most standard checks.'
  }, {
    icon: Globe2,
    title: 'Global Coverage',
    desc: 'Verify credentials from over 150 countries and 3,000+ universities and institutions worldwide.'
  }];
  return <section id="features" className="py-24 bg-[#0F172A] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.h2 initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Built for the <br />
              <span className="text-[#3B82F6]">Modern Enterprise</span>
            </motion.h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Veritas combines cutting-edge blockchain technology with powerful
              AI to deliver the most secure background verification system on
              the market.
            </p>
            <div className="flex gap-4">
              <div className="px-4 py-2 bg-white/10 rounded-lg text-sm font-medium">
                SOC 2 Compliant
              </div>
              <div className="px-4 py-2 bg-white/10 rounded-lg text-sm font-medium">
                GDPR Ready
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => <motion.div key={index} initial={{
            opacity: 0,
            scale: 0.95
          }} whileInView={{
            opacity: 1,
            scale: 1
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.1
          }} className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-colors">
                <feature.icon className="w-8 h-8 text-[#3B82F6] mb-4" />
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>)}
          </div>
        </div>
      </div>
    </section>;
}