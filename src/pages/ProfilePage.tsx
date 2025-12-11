import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AddExperienceModal, AddEducationModal } from '../components/modals/ProfileModals';
import { Plus, Briefcase, GraduationCap, CheckCircle, Clock, MapPin, Calendar, Edit2, Loader, Camera, Users, FileText } from 'lucide-react';
import { PostCard } from '../components/dashboard/PostCard'; 

export function ProfilePage() {
  const { userId } = useParams(); // URL मधून ID घेणार
  const [profileUser, setProfileUser] = useState<any>(null);
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isExpOpen, setIsExpOpen] = useState(false);
  const [isEduOpen, setIsEduOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Edit Form Data
  const [editForm, setEditForm] = useState({ headline: '', location: '', about: '' });

  // Logged In User
  const currentUser = JSON.parse(sessionStorage.getItem('veritas_user') || '{}');
  const isOwnProfile = !userId || userId === currentUser._id;

  // 1. Fetch Profile Data
  useEffect(() => {
    const fetchData = async () => {
      const targetId = userId || currentUser._id;
      if (!targetId) return;
      try {
        // Fetch User Info
        const userRes = await axios.get(`http://localhost:5000/api/user/get/${targetId}`);
        if (userRes.data.success) {
          setProfileUser(userRes.data.user);
          setEditForm({
            headline: userRes.data.user.headline || '',
            location: userRes.data.user.location || '',
            about: userRes.data.user.about || ''
          });
        }
        // Fetch User Posts
        const postsRes = await axios.get(`http://localhost:5000/api/posts/user/${targetId}`);
        if (postsRes.data.success) {
          setUserPosts(postsRes.data.posts);
        }
      } catch (error) { console.error("Error:", error); } finally { setLoading(false); }
    };
    fetchData();
  }, [userId]);

  // 2. Handle Profile Update
  const handleUpdateProfile = async () => {
    try {
      const res = await axios.put('http://localhost:5000/api/user/update', { email: profileUser.email, ...editForm });
      if (res.data.success) {
        setProfileUser(res.data.user);
        setIsEditMode(false);
        if(isOwnProfile) sessionStorage.setItem('veritas_user', JSON.stringify(res.data.user));
      }
    } catch (e) { alert("Update failed"); }
  };

  // 3. Handle Photo Upload
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('userId', profileUser._id);
      formData.append('profilePhoto', file);

      try {
        const res = await axios.put('http://localhost:5000/api/user/update-photo', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        if (res.data.success) {
          setProfileUser(res.data.user);
          if(isOwnProfile) sessionStorage.setItem('veritas_user', JSON.stringify(res.data.user));
          alert("Photo Updated! 📸");
        }
      } catch (e) { alert("Photo upload failed"); }
    }
  };

  if (loading) return <div className="flex justify-center items-center h-[50vh]"><Loader className="animate-spin text-blue-600" size={32} /></div>;
  if (!profileUser) return <div className="text-center p-10">User not found.</div>;

  const StatusBadge = ({ status }: { status: string }) => {
    if (status === 'Verified') return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold bg-green-100 text-green-700 border border-green-200"><CheckCircle size={12} /> Verified</span>;
    return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold bg-yellow-100 text-yellow-700 border border-yellow-200"><Clock size={12} /> Pending</span>;
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      
      {/* 1. PROFILE HEADER */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">
        <div className="h-32 bg-gradient-to-r from-[#0A66C2] to-[#004182]"></div>
        <div className="px-6 pb-6">
          <div className="flex justify-between items-end -mt-12 mb-4">
            <div className="relative group">
              <div className="w-32 h-32 bg-white rounded-full p-1 shadow-md relative overflow-hidden">
                {profileUser.profilePhoto ? (
                  <img src={`http://localhost:5000/${profileUser.profilePhoto}`} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-4xl font-bold text-gray-400">{profileUser.name?.charAt(0)}</div>
                )}
                {isOwnProfile && (
                  <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                    <Camera className="text-white" size={24} />
                    <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                  </label>
                )}
              </div>
            </div>
            {isOwnProfile && (
              <button onClick={() => setIsEditMode(!isEditMode)} className="mb-2 p-2 hover:bg-gray-100 rounded-full text-gray-500"><Edit2 size={20} /></button>
            )}
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              {profileUser.name} {profileUser.isVerified && <CheckCircle className="text-blue-600 fill-blue-50" size={24} />}
            </h1>
            {isEditMode ? (
              <div className="mt-4 space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                <input className="w-full p-2 border rounded" placeholder="Headline" value={editForm.headline} onChange={e => setEditForm({...editForm, headline: e.target.value})} />
                <input className="w-full p-2 border rounded" placeholder="Location" value={editForm.location} onChange={e => setEditForm({...editForm, location: e.target.value})} />
                <textarea className="w-full p-2 border rounded" placeholder="Bio / About" rows={3} value={editForm.about} onChange={e => setEditForm({...editForm, about: e.target.value})} />
                <button onClick={handleUpdateProfile} className="bg-blue-600 text-white px-4 py-1 rounded text-sm font-bold">Save Info</button>
              </div>
            ) : (
              <>
                <p className="text-gray-600 text-lg mt-1">{profileUser.headline || "Veritas Member"}</p>
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-500"><MapPin size={16} /> {profileUser.location || "Location not set"}</div>
                {profileUser.about && <p className="mt-4 text-gray-700 text-sm leading-relaxed max-w-2xl bg-gray-50 p-3 rounded-lg border border-gray-100">{profileUser.about}</p>}
              </>
            )}

            <div className="flex gap-6 mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-1.5 font-semibold text-gray-600"><Users size={18} className="text-blue-600" /><span>{profileUser.followers?.length || 0} Followers</span></div>
              <div className="flex items-center gap-1.5 font-semibold text-gray-600"><Users size={18} className="text-purple-600" /><span>{profileUser.following?.length || 0} Following</span></div>
              <div className="flex items-center gap-1.5 font-semibold text-gray-600"><FileText size={18} className="text-orange-600" /><span>{userPosts.length} Posts</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. EXPERIENCE */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold text-gray-900">Experience</h2>{isOwnProfile && <button onClick={() => setIsExpOpen(true)} className="p-2 hover:bg-gray-100 rounded-full text-gray-600"><Plus size={24} /></button>}</div>
        {profileUser.experience?.length === 0 ? <p className="text-gray-500 text-sm">No experience added.</p> : (
          <div className="space-y-6">{profileUser.experience?.map((exp: any, i: number) => (
              <div key={i} className="flex gap-4 group"><div className="mt-1 w-12 h-12 bg-gray-100 rounded flex items-center justify-center flex-shrink-0"><Briefcase size={24} className="text-gray-500" /></div><div className="flex-1 border-b border-gray-100 pb-6 last:border-0"><h3 className="font-bold text-gray-900">{exp.title}</h3><p className="text-gray-700">{exp.company}</p><p className="text-sm text-gray-500">{exp.startDate} - {exp.endDate || 'Present'}</p><StatusBadge status={exp.verificationStatus} /></div></div>
            ))}</div>
        )}
      </div>

      {/* 3. EDUCATION */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold text-gray-900">Education</h2>{isOwnProfile && <button onClick={() => setIsEduOpen(true)} className="p-2 hover:bg-gray-100 rounded-full text-gray-600"><Plus size={24} /></button>}</div>
        {profileUser.education?.length === 0 ? <p className="text-gray-500 text-sm">No education added.</p> : (
          <div className="space-y-6">{profileUser.education?.map((edu: any, i: number) => (
              <div key={i} className="flex gap-4 group"><div className="mt-1 w-12 h-12 bg-gray-100 rounded flex items-center justify-center flex-shrink-0"><GraduationCap size={24} className="text-gray-500" /></div><div className="flex-1 border-b border-gray-100 pb-6 last:border-0"><h3 className="font-bold text-gray-900">{edu.school}</h3><p className="text-gray-700">{edu.degree}</p><p className="text-sm text-gray-500">{edu.startDate} - {edu.endDate || 'Present'}</p><StatusBadge status={edu.verificationStatus} /></div></div>
            ))}</div>
        )}
      </div>

      {/* 4. POSTS */}
      {userPosts.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4 px-1">Activity ({userPosts.length} posts)</h2>
          <div className="space-y-4">
            {userPosts.map(post => (
              <PostCard key={post._id} post={post} currentUserId={currentUser._id} currentUserName={currentUser.name} currentUserEmail={currentUser.email} onPostUpdate={() => {}} />
            ))}
          </div>
        </div>
      )}

      {isOwnProfile && (
        <>
          <AddExperienceModal isOpen={isExpOpen} onClose={() => setIsExpOpen(false)} />
          <AddEducationModal isOpen={isEduOpen} onClose={() => setIsEduOpen(false)} />
        </>
      )}
    </div>
  );
}