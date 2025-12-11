import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
interface VeritasButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  onClick?: () => void;
  icon?: boolean;
}
export function VeritasButton({
  children,
  variant = 'primary',
  className = '',
  onClick,
  icon = false
}: VeritasButtonProps) {
  const baseStyles = 'relative inline-flex items-center justify-center px-8 py-3 text-sm font-semibold tracking-wide transition-all duration-300 rounded-sm overflow-hidden group';
  const variants = {
    primary: 'bg-[#D4AF37] text-[#0A1628] hover:bg-[#F4E4C1]',
    secondary: 'bg-white text-[#0A1628] hover:bg-gray-100',
    outline: 'bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A1628]'
  };
  return <motion.button whileHover={{
    scale: 1.02
  }} whileTap={{
    scale: 0.98
  }} className={`${baseStyles} ${variants[variant]} ${className}`} onClick={onClick}>
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
      </span>
    </motion.button>;
}