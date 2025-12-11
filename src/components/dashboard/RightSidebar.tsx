import React from 'react';
import { Info, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';

export function RightSidebar() {
  const news = [
    { title: 'Tech hiring stabilizes in Q3', time: '2h ago', readers: '12,403 readers' },
    { title: 'New AI regulations proposed', time: '4h ago', readers: '8,291 readers' },
    { title: 'Remote work trends 2024', time: '1d ago', readers: '45,200 readers' },
    { title: 'Startup funding rebound', time: '14h ago', readers: '5,112 readers' },
    { title: 'Green energy sector growth', time: '18h ago', readers: '3,890 readers' }
  ];

  return (
    <aside className="space-y-2">
      {/* LinkedIn News */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-semibold text-gray-900">
            Veritas News
          </h2>
          <Info className="w-4 h-4 text-gray-600 fill-current" />
        </div>

        <ul className="space-y-4">
          {news.map((item, index) => (
            <li key={index} className="cursor-pointer group">
              <div className="flex items-start gap-2">
                <div className="mt-2 w-1.5 h-1.5 rounded-full bg-gray-500 group-hover:bg-gray-900 flex-shrink-0"></div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 group-hover:text-[#0A66C2] group-hover:underline line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {item.time} • {item.readers}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <Button variant="ghost" size="sm" className="mt-2 text-gray-500 font-semibold flex items-center gap-1 pl-0 hover:bg-transparent hover:text-gray-700">
          Show more <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Ad / Promo Area */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-[70px]">
        <div className="text-right text-xs text-gray-500 mb-2">Ad</div>
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-3">
            Alex, unlock your full potential with Premium
          </p>
          <div className="flex justify-center gap-4 mb-3">
            <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" size="md" />
            <div className="w-12 h-12 bg-amber-100 rounded-md flex items-center justify-center text-amber-600">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </div>
          </div>
          <p className="text-sm text-gray-900 mb-4">
            See who's viewed your profile in the last 90 days
          </p>
          <Button variant="secondary" fullWidth>
            Try for free
          </Button>
        </div>
      </div>
    </aside>
  );
}