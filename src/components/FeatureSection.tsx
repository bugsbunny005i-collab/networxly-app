import React from 'react';
import { motion } from 'framer-motion';
import { Users, Share2, TrendingUp, Shield, Globe, Briefcase } from 'lucide-react';
const features = [{
  icon: Users,
  title: 'Connect with Professionals',
  description: 'Build your network with millions of professionals from around the world. Find mentors, peers, and opportunities.',
  delay: 0.1
}, {
  icon: Share2,
  title: 'Share Your Expertise',
  description: 'Post insights, articles, and updates to establish your voice. Engage with content that matters to your industry.',
  delay: 0.2
}, {
  icon: TrendingUp,
  title: 'Grow Your Career',
  description: 'Discover jobs, learn new skills, and get recommendations. Take the next step in your professional journey.',
  delay: 0.3
}];
const stats = [{
  label: 'Members',
  value: '930M+'
}, {
  label: 'Companies',
  value: '58M+'
}, {
  label: 'Job Posts',
  value: '20M+'
}];
export function FeatureSection() {
  return <section className="py-24 px-4 md:px-6 relative z-10 bg-white/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        {/* Main Features Grid */}
        <div className="text-center mb-16">
          <motion.h2 initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why join LinkedIn?
          </motion.h2>
          <motion.p initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: 0.1
        }} className="text-xl text-gray-600 max-w-2xl mx-auto">
            Unlock the power of your professional community.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {features.map((feature, index) => <motion.div key={feature.title} initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: feature.delay
        }} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-[#0A66C2]">
                <feature.icon size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>)}
        </div>

        {/* Secondary Features / Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{
          opacity: 0,
          x: -30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.7
        }}>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Find the right job or internship for you
            </h3>
            <div className="space-y-6">
              {[{
              icon: Shield,
              text: 'Privacy and security controls'
            }, {
              icon: Globe,
              text: 'Global opportunities'
            }, {
              icon: Briefcase,
              text: 'Personalized job recommendations'
            }].map((item, i) => <div key={i} className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                    <item.icon size={20} />
                  </div>
                  <span className="text-lg text-gray-700 font-medium">
                    {item.text}
                  </span>
                </div>)}
            </div>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          scale: 0.95
        }} whileInView={{
          opacity: 1,
          scale: 1
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.7
        }} className="bg-[#F8FAFD] rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {stats.map((stat, i) => <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-[#0A66C2] mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>)}
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
}