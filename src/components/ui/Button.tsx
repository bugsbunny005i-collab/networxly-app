import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-[#0A66C2] text-white hover:bg-[#004182] focus:ring-[#0A66C2]',
    secondary: 'bg-white text-[#0A66C2] border border-[#0A66C2] hover:bg-blue-50 focus:ring-[#0A66C2]',
    outline: 'bg-transparent text-gray-600 border border-gray-600 hover:bg-gray-100 hover:border-gray-900 hover:text-gray-900',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 text-gray-500 hover:text-gray-900'
  };

  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-1.5 text-sm',
    lg: 'px-6 py-2 text-base'
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`} {...props}>
      {children}
    </button>
  );
}