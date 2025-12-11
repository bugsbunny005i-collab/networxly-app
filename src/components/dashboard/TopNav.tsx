import React from 'react';
import { Search, Home, Users, Briefcase, MessageSquare, Bell } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { Link, useLocation } from 'react-router-dom';

export function TopNav({ user }: any) {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 h-[52px]">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        
        {/* Left: Logo & Search */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* 🔥 FIX: Redirect Logo to /feed */}
          <Link to="/feed" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#D4AF37] rounded-lg flex items-center justify-center">
              <span className="text-[#0A1628] font-bold text-lg">V</span>
            </div>
            <span className="hidden md:block text-lg font-bold text-[#0F172A] tracking-tight">Veritas</span>
          </Link>

          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-500" />
            </div>
            <input type="text" placeholder="Search" className="bg-[#EDF3F8] text-sm rounded-md pl-10 pr-4 py-1.5 w-64 focus:outline-none focus:ring-2 focus:ring-black/5 transition-all" />
          </div>
        </div>

        {/* Right: Nav Items */}
        <nav className="flex items-center h-full gap-1 sm:gap-6 md:gap-8">
          <ul className="flex items-center h-full gap-1 sm:gap-6 md:gap-8">
            
            {/* 🔥 FIX: Redirect Home to /feed */}
            <Link to="/feed">
              <li className={`flex flex-col items-center justify-center cursor-pointer h-full border-b-2 px-1 min-w-[50px] ${isActive('/feed') ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black'}`}>
                <Home className={`w-6 h-6 ${isActive('/feed') ? 'fill-current' : ''}`} />
                <span className="text-[10px] hidden md:block mt-0.5">Home</span>
              </li>
            </Link>

            <Link to="/network">
              <li className={`flex flex-col items-center justify-center cursor-pointer h-full border-b-2 px-1 min-w-[50px] ${isActive('/network') ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black'}`}>
                <Users className={`w-6 h-6 ${isActive('/network') ? 'fill-current' : ''}`} />
                <span className="text-[10px] hidden md:block mt-0.5">My Network</span>
              </li>
            </Link>

            <Link to="/jobs">
              <li className={`flex flex-col items-center justify-center cursor-pointer h-full border-b-2 px-1 min-w-[50px] ${isActive('/jobs') ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black'}`}>
                <Briefcase className={`w-6 h-6 ${isActive('/jobs') ? 'fill-current' : ''}`} />
                <span className="text-sm hidden md:block mt-0.5">Jobs</span>
              </li>
            </Link>

            <Link to="/messaging">
              <li className={`flex flex-col items-center justify-center cursor-pointer h-full border-b-2 px-1 min-w-[50px] ${isActive('/messaging') ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black'}`}>
                <MessageSquare className={`w-6 h-6 ${isActive('/messaging') ? 'fill-current' : ''}`} />
                <span className="text-[10px] hidden md:block mt-0.5">Messaging</span>
              </li>
            </Link>

            <Link to="/notifications">
              <li className={`flex flex-col items-center justify-center cursor-pointer h-full border-b-2 px-1 min-w-[50px] ${isActive('/notifications') ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black'}`}>
                <Bell className={`w-6 h-6 ${isActive('/notifications') ? 'fill-current' : ''}`} />
                <span className="text-[10px] hidden md:block mt-0.5">Notifications</span>
              </li>
            </Link>

            {/* Profile Icon (Redirects to /profile) */}
            <Link to="/profile">
              <li className={`flex flex-col items-center justify-center cursor-pointer h-full border-b-2 px-1 min-w-[50px] ${isActive('/profile') ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black'}`}>
                <Avatar size="sm" src={user?.profilePhoto} alt={user?.name} />
                <div className="hidden md:flex items-center mt-0.5">
                  <span className="text-[10px]">Me</span>
                </div>
              </li>
            </Link>

          </ul>
        </nav>
      </div>
    </header>
  );
}