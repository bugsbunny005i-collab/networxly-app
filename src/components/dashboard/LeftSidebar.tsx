import React from 'react';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { Bookmark, ShieldCheck, Pencil, MapPin } from 'lucide-react';

// onVerifyClick हे नवीन prop ॲड केलं आहे
export function LeftSidebar({ user, onEditClick, onVerifyClick }: any) {
  return (
    <aside className="space-y-2">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="h-14 bg-gradient-to-r from-gray-300 to-gray-400 relative">
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
            <Avatar size="lg" src={user?.profilePhoto} alt={user?.name} className="border-2 border-white cursor-pointer" />
          </div>
        </div>

        <div className="pt-10 pb-4 px-4 text-center border-b border-gray-200">
          <h2 className="text-base font-semibold text-gray-900 hover:underline cursor-pointer">
            {user?.name || "Veritas Member"}
          </h2>
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
            {user?.headline || "Welcome! Add your headline."}
          </p>
          {user?.location && (
            <div className="flex items-center justify-center gap-1 mt-2 text-xs text-gray-500">
              <MapPin size={12} /> {user.location}
            </div>
          )}
        </div>
        
        <div className="p-3 border-b border-gray-200">
          <Button variant="outline" size="sm" fullWidth onClick={onEditClick} className="flex items-center justify-center gap-2">
            <Pencil size={14} /> Edit Profile
          </Button>
        </div>

        <div className="py-3 border-b border-gray-200">
          <div className="px-3 py-1 hover:bg-gray-100 cursor-pointer flex justify-between items-center">
            <div className="text-xs font-semibold text-gray-500"><p>Profile viewers</p></div>
            <span className="text-xs font-semibold text-[#0A66C2]">12</span>
          </div>
          <div className="px-3 py-1 hover:bg-gray-100 cursor-pointer flex justify-between items-center">
            <div className="text-xs font-semibold text-gray-500"><p>Connections</p></div>
            <span className="text-xs font-semibold text-[#0A66C2]">0</span>
          </div>
        </div>

        {/* Verification Button Clickable केलं */}
        <div className="p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <ShieldCheck className="w-4 h-4 text-[#0A66C2]" />
              <span>Verify your profile</span>
            </div>
            <Button 
              variant="primary" 
              size="sm" 
              fullWidth 
              onClick={onVerifyClick} 
              className="flex items-center justify-center gap-2 font-semibold"
            >
              <ShieldCheck className="w-4 h-4" />
              Start Verification
            </Button>
          </div>
        </div>

        <div className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-2 text-xs font-semibold text-gray-900">
          <Bookmark className="w-4 h-4 text-gray-500" />
          <span>My items</span>
        </div>
      </div>
      {/* ... खालचा भाग जसाच्या तसा ... */}
    </aside>
  );
}