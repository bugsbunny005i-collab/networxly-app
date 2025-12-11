import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { VeritasButton } from './ui/VeritasButton';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // 🔥 Navigation Import

export function VeritasNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate(); // 🔥 Hook for navigation

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', latest => {
    setIsScrolled(latest > 50);
  });

  const navLinks = [
    { name: 'Why Veritas', href: '#why' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Trust', href: '#trust' }
  ];

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md border-b border-gray-200 py-3 shadow-sm' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo */}
        <div 
          className="flex items-center gap-2 group cursor-pointer" 
          onClick={() => navigate('/')}
        >
          <div className="w-10 h-10 bg-[#0A1628] flex items-center justify-center rounded-sm transform rotate-45 group-hover:rotate-0 transition-transform duration-500">
            <span className="text-[#D4AF37] font-serif font-bold text-2xl -rotate-45 group-hover:rotate-0 transition-transform duration-500">
              V
            </span>
          </div>
          <span className="text-2xl font-serif font-bold text-[#0A1628] tracking-wide">
            VERITAS
          </span>
        </div>

        {/* Desktop Links & Buttons */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-semibold text-gray-600 hover:text-[#0A66C2] transition-colors tracking-wide"
            >
              {link.name}
            </a>
          ))}

          <div className="h-6 w-[1px] bg-gray-300 mx-2"></div>

          {/* 🔥 Login / Join Buttons */}
          <button 
            onClick={() => navigate('/login')}
            className="text-sm font-bold text-[#0A66C2] hover:underline px-4 py-2"
          >
            Sign in
          </button>

          <VeritasButton 
            variant="primary" 
            className="ml-2 !bg-[#0A66C2] !text-white hover:!bg-[#004182]" 
            onClick={() => navigate('/register')}
          >
            Join Now
          </VeritasButton>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-[#0A1628]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 p-6 md:hidden flex flex-col gap-4 shadow-xl"
        >
          {navLinks.map(link => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-lg font-medium text-gray-800 hover:text-[#0A66C2] py-2" 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <hr className="border-gray-100" />
          <button 
            onClick={() => navigate('/login')} 
            className="w-full text-center py-3 font-bold text-[#0A66C2]"
          >
            Sign In
          </button>
          <VeritasButton className="w-full justify-center !bg-[#0A66C2] !text-white" onClick={() => navigate('/register')}>
            Join Now
          </VeritasButton>
        </motion.div>
      )}
    </motion.nav>
  );
}