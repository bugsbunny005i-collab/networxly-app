import React, { useState } from 'react';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { ThumbsUp, MessageSquare, Repeat, Send, Globe } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // 🔥 FIX: Import Link

interface PostProps {
  post: any; 
  currentUserId: string; 
  currentUserEmail: string; 
  currentUserName: string; 
  onPostUpdate: (updatedPost: any) => void; 
}

export function PostCard({ post, currentUserId, currentUserName, onPostUpdate }: PostProps) {
  const [liked, setLiked] = useState(post.likes.includes(currentUserId));
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [loading, setLoading] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);

  const headline = post.authorHeadline || 'Veritas Member';

  const handleLike = async () => {
    if(loading) return;
    setLoading(true);
    const newLikedState = !liked;
    const newLikeCount = newLikedState ? likeCount + 1 : likeCount - 1;
    setLiked(newLikedState);
    setLikeCount(newLikeCount);
    try {
      const response = await axios.put(`http://localhost:5000/api/posts/like/${post._id}`, { userId: currentUserId });
      onPostUpdate(response.data.post);
    } catch (error) {
      setLiked(!newLikedState);
      setLikeCount(!newLikedState ? newLikeCount + 1 : newLikeCount - 1);
    } finally { setLoading(false); }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    setCommentLoading(true);
    try {
      const response = await axios.post(`http://localhost:5000/api/posts/comment/${post._id}`, {
        userId: currentUserId, name: currentUserName, text: newCommentText
      });
      onPostUpdate(response.data.post);
      setNewCommentText('');
    } catch (error) { alert("Failed to submit comment."); } 
    finally { setCommentLoading(false); }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-200 mb-2">
      <div className="p-3 flex gap-3">
        {/* 🔥 FIX: Avatar Link */}
        <Link to={`/profile/${post.authorId}`}>
          <Avatar src={post.authorPhoto} alt={post.authorName} />
        </Link>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                {/* 🔥 FIX: Name Link */}
                <Link to={`/profile/${post.authorId}`} className="text-sm font-semibold text-gray-900 hover:text-[#0A66C2] hover:underline cursor-pointer">
                  {post.authorName}
                </Link>
              </div>
              <p className="text-xs text-gray-500 line-clamp-1">{headline}</p>
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                <span>{formatDate(post.createdAt)}</span><span>•</span><Globe className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-3 pb-2"><p className="text-sm text-gray-900 whitespace-pre-line">{post.content}</p></div>
      {post.image && <div className="mt-1"><img src={`http://localhost:5000/${post.image}`} className="w-full h-auto object-cover max-h-[500px]" onError={(e) => { e.currentTarget.style.display = 'none'; }} /></div>}

      <div className="px-4 py-2 flex items-center justify-between border-b border-gray-100 text-xs text-gray-500">
        <div className="flex items-center gap-1"><div className="flex -space-x-1"><div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center z-10"><ThumbsUp className="w-2.5 h-2.5 text-white fill-current" /></div></div><span>{post.likes.length} Likes</span></div>
        <div className="flex gap-2"><span className="hover:text-[#0A66C2] hover:underline cursor-pointer" onClick={() => setShowCommentInput(prev => !prev)}>{post.comments.length} comments</span></div>
      </div>

      <div className="px-2 py-1 flex items-center justify-between">
        <button onClick={handleLike} className={`flex items-center justify-center gap-2 px-3 py-3 rounded hover:bg-gray-100 flex-1 transition-colors ${liked ? 'text-[#0A66C2]' : 'text-gray-600'}`} disabled={loading}><ThumbsUp className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} /><span className="text-sm font-semibold">Like</span></button>
        <button onClick={() => setShowCommentInput(prev => !prev)} className="flex items-center justify-center gap-2 px-3 py-3 rounded hover:bg-gray-100 flex-1 text-gray-600 transition-colors"><MessageSquare className="w-5 h-5" /><span className="text-sm font-semibold">Comment</span></button>
        <button className="flex items-center justify-center gap-2 px-3 py-3 rounded hover:bg-gray-100 flex-1 text-gray-600 transition-colors"><Repeat className="w-5 h-5" /><span className="text-sm font-semibold">Repost</span></button>
        <button className="flex items-center justify-center gap-2 px-3 py-3 rounded hover:bg-gray-100 flex-1 text-gray-600 transition-colors"><Send className="w-5 h-5" /><span className="text-sm font-semibold">Send</span></button>
      </div>

      {showCommentInput && (
        <div className="p-4 border-t border-gray-100">
          {post.comments.map((comment: any, index: number) => (
              <div key={index} className="flex gap-2 mb-2 text-sm">
                  <Avatar src={comment.photo || ''} alt={comment.name} size="sm" />
                  <div className="bg-gray-50 p-2 rounded-lg flex-1"><p className="font-semibold text-gray-900">{comment.name}</p><p className="text-gray-700 whitespace-pre-wrap">{comment.text}</p></div>
              </div>
          ))}
          <form onSubmit={handleCommentSubmit} className="flex gap-3 mt-4">
            <Avatar src={post.authorPhoto} alt={currentUserName} size="md" />
            <div className="flex-1 relative"><textarea className="w-full border border-gray-300 rounded-lg p-2 pr-16 resize-none focus:outline-none focus:ring-1 focus:ring-[#0A66C2]" rows={1} placeholder="Add a comment..." value={newCommentText} onChange={(e) => setNewCommentText(e.target.value)} disabled={commentLoading} /><Button type="submit" size="sm" className="absolute right-1 bottom-1" disabled={commentLoading || !newCommentText.trim()}>Post</Button></div>
          </form>
        </div>
      )}
    </article>
  );
}