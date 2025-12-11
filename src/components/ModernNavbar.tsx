import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Users, Briefcase, MessageSquare, Bell, Search, User, LogOut } from 'lucide-react';

export function ModernNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(sessionStorage.getItem('veritas_user') || '{}');

  const navItems = [
    { icon: Home, label: 'Home', path: '/feed' },
    { icon: Users, label: 'Network', path: '/network' },
    { icon: Briefcase, label: 'Jobs', path: '/jobs' },
    { icon: MessageSquare, label: 'Messaging', path: '/messages' },
    { icon: Bell, label: 'Notifications', path: '/notifications' }
  ];

  const handleLogout = () => {
    sessionStorage.removeItem('veritas_user');
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 inset-x-0 bg-white border-b border-gray-200 z-50 h-16">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo & Search */}
        <div className="flex items-center gap-4">
          <div 
            className="w-10 h-10 bg-[#D4AF37] rounded flex items-center justify-center font-bold text-[#0A1628] text-xl cursor-pointer" 
            onClick={() => navigate('/feed')}
          >
            V
          </div>
          <div className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-md w-64 transition-all focus-within:w-80 focus-within:bg-white focus-within:ring-1 focus-within:ring-black">
            <Search size={18} className="text-gray-500 mr-2" />
            <input type="text" placeholder="Search" className="bg-transparent border-none outline-none text-sm w-full" />
          </div>
        </div>

        {/* Icons Menu */}
        <ul className="flex items-center gap-1 sm:gap-6 h-full">
          {navItems.map((item) => (
            <li 
              key={item.label} 
              className={`flex flex-col items-center cursor-pointer h-full justify-center px-2 sm:px-3 border-b-2 transition-colors ${
                location.pathname === item.path 
                  ? 'border-black text-black' 
                  : 'border-transparent text-gray-500 hover:text-black hover:bg-gray-50'
              }`}
              onClick={() => navigate(item.path)}
            >
              <item.icon size={24} />
              <span className="text-xs hidden md:block mt-1">{item.label}</span>
            </li>
          ))}

          {/* 🔥 PROFILE ICON (ME) - CLICK TO GO TO PROFILE */}
          <li 
            className={`flex flex-col items-center cursor-pointer h-full justify-center px-2 sm:px-3 border-b-2 transition-colors ${
              location.pathname === '/profile' 
                ? 'border-black text-black' 
                : 'border-transparent text-gray-500 hover:text-black hover:bg-gray-50'
            }`}
            onClick={() => navigate('/profile')} // 🔥 नेव्हिगेशन इथे आहे
          >
            {user.profilePhoto ? (
              <img src={`https://networxly-app.onrender.com/${user.profilePhoto}`} className="w-6 h-6 rounded-full object-cover border border-gray-300" alt="Profile" />
            ) : (
              <User size={24} />
            )}
            <span className="text-xs hidden md:block mt-1 flex items-center gap-1">
              Me 
            </span>
          </li>

          {/* Logout Button (Optional: Small Logout Icon) */}
          <li 
            className="flex flex-col items-center cursor-pointer h-full justify-center px-2 text-gray-500 hover:text-red-600 border-b-2 border-transparent"
            onClick={handleLogout}
            title="Logout"
          >
            <LogOut size={20} />
            <span className="text-xs hidden md:block mt-1">Exit</span>
          </li>
        </ul>
      </div>
    </nav>
  );
}