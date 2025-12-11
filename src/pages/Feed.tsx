import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Image, Calendar, FileText, ThumbsUp, MessageCircle, Share2, Send, MoreHorizontal } from 'lucide-react';

export function Feed() {
  const [posts, setPosts] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(sessionStorage.getItem('veritas_user') || '{}');

  // Fetch Posts
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/posts/feed');
      if (res.data.success) {
        setPosts(res.data.posts);
      }
    } catch (error) { console.error("Feed error:", error); }
  };

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    
    try {
      const res = await axios.post('http://localhost:5000/api/posts/create', {
        content: input,
        authorId: user._id,
        authorName: user.name,
        authorPhoto: user.profilePhoto,
        authorHeadline: user.headline || 'Veritas User'
      });
      if (res.data.success) {
        setInput('');
        fetchPosts();
      }
    } catch (error) { console.error(error); } 
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-xl mx-auto space-y-4">
      
      {/* --- 1. CREATE POST WIDGET (LinkedIn Style) --- */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex gap-3 mb-3">
          {/* User Avatar */}
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
            {user.profilePhoto ? (
              <img src={`http://localhost:5000/${user.profilePhoto}`} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-bold text-gray-500 text-lg">
                {user.name?.charAt(0)}
              </div>
            )}
          </div>
          
          {/* Input Box */}
          <form onSubmit={handlePost} className="flex-grow">
            <input 
              className="w-full h-12 rounded-full border border-gray-300 px-5 text-gray-700 font-medium hover:bg-gray-50 focus:bg-gray-50 focus:outline-none focus:border-gray-400 transition-colors cursor-pointer"
              placeholder="Start a post"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            {/* Hidden submit for Enter key */}
            <button type="submit" className="hidden" />
          </form>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center px-2 pt-1">
          <button className="flex items-center gap-3 px-2 py-3 hover:bg-gray-100 rounded-lg transition-colors group">
            <Image className="text-blue-500" size={20} />
            <span className="text-sm font-semibold text-gray-500 group-hover:text-gray-700">Media</span>
          </button>
          <button className="flex items-center gap-3 px-2 py-3 hover:bg-gray-100 rounded-lg transition-colors group">
            <Calendar className="text-yellow-600" size={20} />
            <span className="text-sm font-semibold text-gray-500 group-hover:text-gray-700">Event</span>
          </button>
          <button className="flex items-center gap-3 px-2 py-3 hover:bg-gray-100 rounded-lg transition-colors group">
            <FileText className="text-orange-600" size={20} />
            <span className="text-sm font-semibold text-gray-500 group-hover:text-gray-700">Write article</span>
          </button>
        </div>
      </div>

      {/* --- 2. POSTS FEED --- */}
      {posts.map((post) => (
        <div key={post._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="p-3 flex gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 border border-gray-200 cursor-pointer">
              {post.authorPhoto ? (
                <img src={`http://localhost:5000/${post.authorPhoto}`} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-bold text-gray-500">
                  {post.authorName?.charAt(0)}
                </div>
              )}
            </div>
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900 text-sm hover:text-blue-600 hover:underline cursor-pointer">
                    {post.authorName}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-1">{post.authorHeadline}</p>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                    {new Date(post.createdAt).toLocaleDateString()} • <span className="text-[10px]">🌎</span>
                  </p>
                </div>
                <button className="text-gray-500 hover:bg-gray-100 p-1 rounded-full">
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-4 pb-2 text-sm text-gray-900 whitespace-pre-wrap">
            {post.content}
          </div>

          {/* Image */}
          {post.image && (
            <div className="w-full mt-2 cursor-pointer">
              <img src={`http://localhost:5000/${post.image}`} className="w-full h-auto object-cover" alt="Post content" />
            </div>
          )}

          {/* Counts */}
          <div className="px-4 py-2 border-b border-gray-100 flex justify-between text-xs text-gray-500 mt-1">
            <div className="flex items-center gap-1">
              <div className="bg-blue-100 p-0.5 rounded-full"><ThumbsUp size={10} className="text-blue-600 fill-blue-600" /></div>
              <span className="hover:text-blue-600 hover:underline cursor-pointer">{post.likes?.length || 0}</span>
            </div>
            <span className="hover:text-blue-600 hover:underline cursor-pointer">{post.comments?.length || 0} comments</span>
          </div>

          {/* Buttons */}
          <div className="px-2 py-1 flex justify-between">
            <button className="flex items-center justify-center gap-2 py-3 flex-1 hover:bg-gray-100 rounded-lg text-gray-600 font-semibold text-sm transition-colors">
              <ThumbsUp size={18} /> Like
            </button>
            <button className="flex items-center justify-center gap-2 py-3 flex-1 hover:bg-gray-100 rounded-lg text-gray-600 font-semibold text-sm transition-colors">
              <MessageCircle size={18} /> Comment
            </button>
            <button className="flex items-center justify-center gap-2 py-3 flex-1 hover:bg-gray-100 rounded-lg text-gray-600 font-semibold text-sm transition-colors">
              <Share2 size={18} /> Share
            </button>
            <button className="flex items-center justify-center gap-2 py-3 flex-1 hover:bg-gray-100 rounded-lg text-gray-600 font-semibold text-sm transition-colors">
              <Send size={18} /> Send
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}