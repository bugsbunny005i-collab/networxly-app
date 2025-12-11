import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TopNav } from '../components/dashboard/TopNav';
import { Avatar } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';
import { Users, UserPlus } from 'lucide-react';

export function MyNetworkPage() {
  const [user, setUser] = useState<any>(null);
  const [networkUsers, setNetworkUsers] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 🔥 FIX: sessionStorage
    const savedUser = sessionStorage.getItem('veritas_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      fetchNetwork(parsedUser._id);
    } else navigate('/login');
  }, [navigate]);

  const fetchNetwork = async (userId: string) => {
    try {
      const res = await axios.get(`https://networxly-app.onrender.com/api/users/network/${userId}`);
      setNetworkUsers(res.data.users);
    } catch (error) { console.error("Error fetching network"); }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="h-screen bg-[#F3F2EF] font-sans flex flex-col overflow-hidden">
      <div className="shrink-0"><TopNav user={user} /></div>
      <div className="flex-1 max-w-7xl w-full mx-auto px-0 sm:px-4 py-6 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full">
          <div className="hidden md:block md:col-span-4 lg:col-span-3 h-full"><div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"><h3 className="font-semibold text-gray-900 mb-4">Manage my network</h3><div className="space-y-4 text-gray-600"><div className="flex justify-between items-center cursor-pointer hover:bg-gray-50 p-2 rounded"><span className="flex items-center gap-3"><Users size={20} /> Connections</span><span className="font-semibold text-gray-900">0</span></div></div></div></div>
          <div className="col-span-1 md:col-span-8 lg:col-span-9 h-full overflow-y-auto no-scrollbar" style={{ scrollbarWidth: 'none' }}>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6"><h2 className="text-base font-semibold text-gray-900">People you may know</h2></div>
              {networkUsers.length === 0 ? <div className="text-center py-10 text-gray-500">No other users found yet.</div> : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {networkUsers.map((person) => (
                    <div key={person._id} className="border border-gray-200 rounded-lg p-0 overflow-hidden relative">
                      <div className="h-16 bg-gray-200 relative"></div>
                      <div className="px-4 pb-4 text-center -mt-10">
                        <Avatar src={person.profilePhoto} alt={person.name} size="xl" className="mx-auto border-4 border-white" />
                        <h3 className="font-semibold text-gray-900 mt-2 hover:underline cursor-pointer">{person.name}</h3>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">{person.headline || "Veritas Member"}</p>
                        <Button variant="outline" fullWidth size="sm" className="rounded-full border-blue-600 text-blue-600 hover:bg-blue-50 flex items-center justify-center gap-1 mt-4"><UserPlus size={16} /> Connect</Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}