import React from 'react';
import { motion } from 'framer-motion';
import { Clock, FileX, EyeOff, Zap, Lock, Search } from 'lucide-react';
export function ProblemSolution() {
  return <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Problem */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
              Traditional Verification is Broken
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Manual processes, paper documents, and lack of transparency create
              risks for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
            icon: Clock,
            title: 'Weeks of Waiting',
            desc: 'Manual phone calls and email chains slow down hiring by weeks.'
          }, {
            icon: FileX,
            title: 'Easy to Fake',
            desc: 'Paper diplomas and PDF certificates can be forged in minutes.'
          }, {
            icon: EyeOff,
            title: 'No Transparency',
            desc: 'Black-box processes leave candidates and employers in the dark.'
          }].map((item, i) => <motion.div key={i} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: i * 0.1
          }} className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-6 text-red-500">
                  <item.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>)}
          </div>
        </div>

        {/* Solution */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
              Veritas: The Blockchain Difference
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We use decentralized technology to create a single source of
              truth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
            icon: Zap,
            title: 'Instant Results',
            desc: 'Verification happens in seconds via smart contracts, not weeks.'
          }, {
            icon: Lock,
            title: 'Immutable Records',
            desc: 'Once verified on the blockchain, records cannot be altered or faked.'
          }, {
            icon: Search,
            title: 'Complete Transparency',
            desc: 'Full audit trails available to all authorized parties instantly.'
          }].map((item, i) => <motion.div key={i} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: i * 0.1
          }} className="bg-white p-8 rounded-xl border border-blue-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full -mr-4 -mt-4" />
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6 text-[#3B82F6] relative z-10">
                  <item.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-3 relative z-10">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed relative z-10">
                  {item.desc}
                </p>
              </motion.div>)}
          </div>
        </div>
      </div>
    </section>;
}