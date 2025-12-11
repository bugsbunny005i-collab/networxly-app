import React, { useState, useEffect } from 'react';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { Image, Calendar, Newspaper, X } from 'lucide-react';
import { PostCard } from './PostCard';
import axios from 'axios';

// --- New Component: Post Composer Modal ---
function PostComposerModal({ isOpen, onClose, user, onPostCreated }: any) {
    const [content, setContent] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim() && !image) {
            alert("Please add content or an image.");
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('authorId', user._id);
            formData.append('authorName', user.name);
            formData.append('authorPhoto', user.profilePhoto);
            formData.append('content', content);
            if (user.headline) formData.append('authorHeadline', user.headline);
            if (image) formData.append('postImage', image);

            const response = await axios.post('https://networxly-app.onrender.com/api/posts/create', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.data.success) {
                onPostCreated(response.data.post);
                setContent('');
                setImage(null);
                onClose();
            }
        } catch (error) {
            console.error("Error creating post:", error);
            alert("Failed to create post.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-xl rounded-xl shadow-2xl overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold">Create a post</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500"><X size={24} /></button>
                </div>
                
                <div className="p-4 flex gap-3 items-start">
                    <Avatar src={user?.profilePhoto} alt={user?.name} size="md" />
                    <div className="flex flex-col">
                        <span className="font-semibold text-sm">{user?.name}</span>
                        <span className="text-xs text-gray-500">{user?.headline || 'Veritas Member'}</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <textarea 
                        className="w-full p-4 resize-none focus:outline-none" 
                        rows={6} 
                        placeholder="What do you want to talk about?"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />

                    {image && (
                        <div className="relative p-4">
                            <img src={URL.createObjectURL(image)} alt="Preview" className="max-h-60 w-full object-cover rounded-lg" />
                            <button type="button" onClick={() => setImage(null)} className="absolute top-6 right-6 bg-black/50 text-white rounded-full p-1.5"><X size={16} /></button>
                        </div>
                    )}

                    <div className="flex justify-between items-center p-4 border-t border-gray-200">
                        <label htmlFor="file-upload" className="cursor-pointer">
                            <Image className="w-6 h-6 text-blue-500 hover:text-blue-700 transition-colors" />
                            <input id="file-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                        </label>
                        <Button type="submit" size="sm" disabled={loading || (!content.trim() && !image)}>
                            {loading ? 'Posting...' : 'Post'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}


// --- MainFeed Component (Post Display Logic) ---
export function MainFeed({ user }: any) {
  const [posts, setPosts] = useState<any[]>([]);
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch all posts from backend
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://networxly-app.onrender.com/api/posts/feed');
      setPosts(response.data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Handle new post creation (add to top of the list)
  const handlePostCreated = (newPost: any) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };
  
  // Handle post update (e.g., like count update)
  const handlePostUpdate = (updatedPost: any) => {
      setPosts(prevPosts => prevPosts.map(p => 
          p._id === updatedPost._id ? updatedPost : p
      ));
  };


  return (
    <main className="space-y-2">
      {/* Composer Button */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-2">
        <div className="flex gap-3 mb-3">
          <Avatar src={user?.profilePhoto} alt={user?.name} />
          <button 
            className="flex-1 text-left border border-gray-300 rounded-full px-4 py-3 text-sm font-semibold text-gray-500 hover:bg-gray-100 transition-colors"
            onClick={() => setIsComposerOpen(true)}
          >
            Start a post
          </button>
        </div>
        <div className="flex justify-between items-center pt-1">
          <Button variant="ghost" size="sm" className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 px-2 sm:px-4">
            <Image className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-semibold text-gray-500">Media</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 px-2 sm:px-4">
            <Calendar className="w-5 h-5 text-yellow-600" />
            <span className="text-sm font-semibold text-gray-500">Event</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 px-2 sm:px-4">
            <Newspaper className="w-5 h-5 text-red-400" />
            <span className="text-sm font-semibold text-gray-500">Write article</span>
          </Button>
        </div>
      </div>

      {/* Sort Divider (Same as before) */}
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="h-[1px] bg-gray-300 flex-1 mr-2"></div>
        <div className="text-xs text-gray-500 flex items-center gap-1">
          <span>Sort by:</span>
          <span className="font-bold text-gray-900 cursor-pointer flex items-center">Top <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 16 16"><path d="M8 11L3 6h10z" /></svg></span>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-2">
        {loading && <div className="text-center py-4 text-gray-500">Loading posts...</div>}
        {!loading && posts.length === 0 && <div className="text-center py-4 text-gray-500">No posts yet. Start the conversation!</div>}

        {posts.map((post) => (
          <PostCard 
            key={post._id} 
            post={post} 
            currentUserId={user?._id}
            onPostUpdate={handlePostUpdate}
          />
        ))}
      </div>

      {/* Post Composer Modal */}
      <PostComposerModal 
        isOpen={isComposerOpen} 
        onClose={() => setIsComposerOpen(false)} 
        user={user} 
        onPostCreated={handlePostCreated}
      />
    </main>
  );
}