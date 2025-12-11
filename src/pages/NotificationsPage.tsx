import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TopNav } from '../components/dashboard/TopNav';
import { Avatar } from '../components/ui/Avatar';
import { ThumbsUp, MessageSquare, UserPlus, MoreHorizontal } from 'lucide-react';

export function NotificationsPage() {
  const [user, setUser] = useState<any>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = sessionStorage.getItem('veritas_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      fetchNotifications(parsedUser._id);
    } else navigate('/login');
  }, [navigate]);

  const fetchNotifications = async (userId: string) => {
    try {
      const res = await axios.get(`https://networxly-app.onrender.com/api/notifications/${userId}`);
      setNotifications(res.data.notifications);
    } catch (error) { console.error("Error fetching notifications"); }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'like': return <ThumbsUp className="w-5 h-5 text-blue-500 fill-current" />;
      case 'comment': return <MessageSquare className="w-5 h-5 text-green-500 fill-current" />;
      case 'connection': return <UserPlus className="w-5 h-5 text-purple-500" />;
      default: return <ThumbsUp className="w-5 h-5 text-gray-500" />;
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="h-screen bg-[#F3F2EF] font-sans flex flex-col overflow-hidden">
      <div className="shrink-0"><TopNav user={user} /></div>

      <div className="flex-1 max-w-4xl w-full mx-auto px-0 sm:px-4 py-6 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full">
          
          {/* Left: Settings (Optional) */}
          <div className="hidden md:block md:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Notifications</h3>
              <p className="text-sm text-gray-500">You have new notifications</p>
            </div>
          </div>

          {/* Main: Notifications List */}
          <div className="col-span-1 md:col-span-9 h-full overflow-y-auto no-scrollbar" style={{ scrollbarWidth: 'none' }}>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {notifications.length === 0 ? (
                <div className="p-10 text-center text-gray-500">No notifications yet.</div>
              ) : (
                notifications.map((notif) => (
                  <div key={notif._id} className={`flex items-start gap-4 p-4 border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition-colors ${!notif.isRead ? 'bg-blue-50/50' : ''}`}>
                    <div className="mt-1">{getIcon(notif.type)}</div>
                    <Avatar src={notif.sender?.profilePhoto} alt={notif.sender?.name} size="md" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">
                        <span className="font-semibold">{notif.sender?.name}</span> {notif.message}
                      </p>
                      <span className="text-xs text-gray-500 mt-1 block">
                        {new Date(notif.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <MoreHorizontal className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}