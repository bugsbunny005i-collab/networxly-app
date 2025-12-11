import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
interface ModernButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  onClick?: () => void;
  icon?: boolean;
}
export function ModernButton({
  children,
  variant = 'primary',
  className = '',
  onClick,
  icon = false
}: ModernButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = {
    primary: 'bg-[#3B82F6] text-white hover:bg-[#2563EB] focus:ring-[#3B82F6]',
    secondary: 'bg-[#F1F5F9] text-[#0F172A] hover:bg-[#E2E8F0] focus:ring-[#94A3B8]',
    outline: 'bg-transparent border border-[#E2E8F0] text-[#0F172A] hover:bg-[#F8FAFC] hover:border-[#CBD5E1] focus:ring-[#94A3B8]'
  };
  return <motion.button whileHover={{
    scale: 1.02
  }} whileTap={{
    scale: 0.98
  }} className={`${baseStyles} ${variants[variant]} ${className}`} onClick={onClick}>
      <span className="flex items-center gap-2">
        {children}
        {icon && <ArrowRight className="w-4 h-4" />}
      </span>
    </motion.button>;
}