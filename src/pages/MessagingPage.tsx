import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TopNav } from '../components/dashboard/TopNav';
import { Avatar } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';
// 🔥 FIX: 'MessageSquare' इथे ॲड केला आहे
import { Send, MoreHorizontal, Phone, Video, Image, Paperclip, MessageSquare } from 'lucide-react';

export function MessagingPage() {
  const [user, setUser] = useState<any>(null);
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 🔥 FIX: sessionStorage वापरले
    const savedUser = sessionStorage.getItem('veritas_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      fetchUsers(parsedUser._id);
    } else navigate('/login');
  }, [navigate]);

  // चॅट लिस्टसाठी सर्व युजर्स आणणे
  const fetchUsers = async (currentUserId: string) => {
    try {
      const res = await axios.get(`https://networxly-app.onrender.com/api/users/network/${currentUserId}`);
      setConversations(res.data.users);
    } catch (error) { console.error("Error fetching users"); }
  };

  // ठराविक युजरसोबतचे मेसेज आणणे
  const fetchMessages = async (otherUserId: string) => {
    if (!user) return;
    try {
      const res = await axios.get(`https://networxly-app.onrender.com/api/messages/${user._id}/${otherUserId}`);
      setMessages(res.data.messages);
      scrollToBottom();
    } catch (error) { console.error("Error fetching messages"); }
  };

  // मेसेज पाठवणे
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser) return;

    try {
      const res = await axios.post('https://networxly-app.onrender.com/api/messages/send', {
        sender: user._id,
        receiver: selectedUser._id,
        text: newMessage
      });
      
      setMessages([...messages, res.data.message]); // लिस्ट अपडेट करा
      setNewMessage('');
      scrollToBottom();
    } catch (error) { console.error("Message failed"); }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="h-screen bg-[#F3F2EF] font-sans flex flex-col overflow-hidden">
      <div className="shrink-0"><TopNav user={user} /></div>

      <div className="flex-1 max-w-7xl w-full mx-auto px-0 sm:px-4 py-6 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full">
          
          {/* Left: Chat List */}
          <div className="hidden md:block md:col-span-4 lg:col-span-3 h-full bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col">
            <div className="p-3 border-b border-gray-200 flex justify-between items-center">
              <h2 className="font-semibold text-gray-900">Messaging</h2>
              <MoreHorizontal className="text-gray-500 w-5 h-5 cursor-pointer" />
            </div>
            <div className="overflow-y-auto flex-1">
              {conversations.map((u) => (
                <div 
                  key={u._id} 
                  onClick={() => { setSelectedUser(u); fetchMessages(u._id); }}
                  className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 border-l-4 ${selectedUser?._id === u._id ? 'border-[#0A66C2] bg-blue-50' : 'border-transparent'}`}
                >
                  <Avatar src={u.profilePhoto} alt={u.name} size="md" />
                  <div className="overflow-hidden">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">{u.name}</h3>
                    <p className="text-xs text-gray-500 truncate">{u.headline || "Veritas Member"}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Chat Window */}
          <div className="col-span-1 md:col-span-8 lg:col-span-9 h-full bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col">
            {selectedUser ? (
              <>
                {/* Chat Header */}
                <div className="p-3 border-b border-gray-200 flex justify-between items-center bg-white shadow-sm z-10">
                  <div className="flex items-center gap-3">
                    <Avatar src={selectedUser.profilePhoto} alt={selectedUser.name} size="sm" />
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">{selectedUser.name}</h3>
                      <p className="text-xs text-gray-500">Active now</p>
                    </div>
                  </div>
                  <div className="flex gap-3 text-gray-500">
                    <Phone className="w-5 h-5 cursor-pointer hover:text-black" />
                    <Video className="w-5 h-5 cursor-pointer hover:text-black" />
                    <MoreHorizontal className="w-5 h-5 cursor-pointer hover:text-black" />
                  </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {messages.length === 0 && (
                    <div className="text-center text-gray-500 mt-10">Say hello to {selectedUser.name}! 👋</div>
                  )}
                  {messages.map((msg, index) => {
                    const isMe = msg.sender === user._id;
                    return (
                      <div key={index} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[70%] p-3 rounded-xl text-sm shadow-sm ${isMe ? 'bg-[#0A66C2] text-white rounded-tr-none' : 'bg-white text-gray-900 border border-gray-200 rounded-tl-none'}`}>
                          {msg.text}
                        </div>
                      </div>
                    );
                  })}
                  <div ref={scrollRef} />
                </div>

                {/* Input Area */}
                <div className="p-3 border-t border-gray-200 bg-white">
                  <form onSubmit={handleSendMessage} className="flex flex-col gap-2">
                    <textarea 
                      className="w-full p-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0A66C2] resize-none text-sm"
                      rows={2}
                      placeholder="Write a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(e); }}}
                    />
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2 text-gray-500">
                        <Image className="w-5 h-5 cursor-pointer hover:text-gray-700" />
                        <Paperclip className="w-5 h-5 cursor-pointer hover:text-gray-700" />
                      </div>
                      <Button type="submit" size="sm" disabled={!newMessage.trim()}>Send</Button>
                    </div>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                <div className="w-40 h-40 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  {/* हा आयकॉन वापरला होता, म्हणून एरर येत होता */}
                  <MessageSquare className="w-16 h-16 text-gray-300" />
                </div>
                <h3 className="text-lg font-semibold">Select a message</h3>
                <p>Choose from your existing conversations to start chatting.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}