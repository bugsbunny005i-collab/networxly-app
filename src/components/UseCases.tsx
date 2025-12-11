import React, { useState, createElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, GraduationCap, UserCheck } from 'lucide-react';
export function UseCases() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [{
    id: 0,
    label: 'For HR Teams',
    icon: Users,
    title: 'Hire Faster with Confidence',
    desc: 'Reduce time-to-hire by 80% and eliminate credential fraud. Integrate directly with your ATS for a seamless workflow.',
    points: ['Automated background checks', 'ATS Integration', 'Compliance dashboard']
  }, {
    id: 1,
    label: 'For Universities',
    icon: GraduationCap,
    title: 'Issue Tamper-Proof Degrees',
    desc: "Protect your institution's reputation by issuing digital diplomas on the blockchain that employers can verify instantly.",
    points: ['Digital diploma issuance', 'Alumni verification portal', 'Brand protection']
  }, {
    id: 2,
    label: 'For Candidates',
    icon: UserCheck,
    title: 'Own Your Credentials',
    desc: 'Store your verified degrees and work history in a secure digital wallet. Share them with employers in one click.',
    points: ['Portable credential wallet', 'Instant sharing', 'Privacy control']
  }];
  return <section id="use-cases" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A]">
            Trusted by Everyone
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12 border-b border-gray-200">
          {tabs.map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-6 py-4 text-sm font-medium transition-colors relative ${activeTab === tab.id ? 'text-[#3B82F6]' : 'text-gray-500 hover:text-gray-700'}`}>
              {tab.label}
              {activeTab === tab.id && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3B82F6]" />}
            </button>)}
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} exit={{
            opacity: 0,
            y: -10
          }} transition={{
            duration: 0.3
          }} className="bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-100">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-[#3B82F6] shadow-sm shrink-0">
                  {createElement(tabs[activeTab].icon, {
                  size: 32
                })}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#0F172A] mb-4">
                    {tabs[activeTab].title}
                  </h3>
                  <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                    {tabs[activeTab].desc}
                  </p>
                  <ul className="space-y-3">
                    {tabs[activeTab].points.map((point, i) => <li key={i} className="flex items-center text-gray-700 font-medium">
                        <div className="w-1.5 h-1.5 bg-[#3B82F6] rounded-full mr-3" />
                        {point}
                      </li>)}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>;
}