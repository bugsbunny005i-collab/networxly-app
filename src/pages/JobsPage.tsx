import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TopNav } from '../components/dashboard/TopNav';
import { Avatar } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';
import { Bookmark, MapPin, Clock, Briefcase, Bell, Plus, X } from 'lucide-react';

// Create Job Modal
function CreateJobModal({ isOpen, onClose, user, onJobCreated }: any) {
  const [formData, setFormData] = useState({ title: '', company: '', location: '', type: 'On-site' });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('https://networxly-app.onrender.com/api/jobs/create', {
        ...formData,
        postedBy: user._id
      });
      if (res.data.success) {
        onJobCreated(res.data.job);
        onClose();
        setFormData({ title: '', company: '', location: '', type: 'On-site' });
      }
    } catch (error) {
      alert("Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold">Post a Job</h2>
          <button onClick={onClose}><X size={24} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <input type="text" className="w-full p-2 border rounded" placeholder="Job Title" required value={formData.title} onChange={e=>setFormData({...formData, title: e.target.value})} />
          <input type="text" className="w-full p-2 border rounded" placeholder="Company" required value={formData.company} onChange={e=>setFormData({...formData, company: e.target.value})} />
          <input type="text" className="w-full p-2 border rounded" placeholder="Location" required value={formData.location} onChange={e=>setFormData({...formData, location: e.target.value})} />
          <select className="w-full p-2 border rounded" value={formData.type} onChange={e=>setFormData({...formData, type: e.target.value})}>
            <option>On-site</option><option>Remote</option><option>Hybrid</option>
          </select>
          <div className="flex justify-end"><Button type="submit" disabled={loading}>{loading ? 'Posting...' : 'Post Job'}</Button></div>
        </form>
      </div>
    </div>
  );
}

export function JobsPage() {
  const [user, setUser] = useState<any>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 🔥 FIX: sessionStorage
    const savedUser = sessionStorage.getItem('veritas_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      fetchJobs();
    } else navigate('/login');
  }, [navigate]);

  const fetchJobs = async () => {
    try {
      const res = await axios.get('https://networxly-app.onrender.com/api/jobs/all');
      setJobs(res.data.jobs);
    } catch (error) { console.error("Error fetching jobs"); }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="h-screen bg-[#F3F2EF] font-sans flex flex-col overflow-hidden">
      <div className="shrink-0"><TopNav user={user} /></div>
      <div className="flex-1 max-w-7xl w-full mx-auto px-0 sm:px-4 py-6 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full">
          <div className="hidden md:block md:col-span-3 lg:col-span-3 xl:col-span-2 h-full">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-y-4">
              <div className="flex items-center gap-3 font-semibold text-gray-600 hover:text-black cursor-pointer"><Bookmark size={20} /> My Jobs</div>
              <div className="flex items-center gap-3 font-semibold text-gray-600 hover:text-black cursor-pointer"><Bell size={20} /> Job Alerts</div>
              <div className="flex items-center gap-3 font-semibold text-gray-600 hover:text-black cursor-pointer"><Briefcase size={20} /> Interview Prep</div>
              <Button fullWidth onClick={() => setIsModalOpen(true)} className="mt-4 flex items-center justify-center gap-2"><Plus size={16} /> Post a Job</Button>
            </div>
          </div>
          <div className="col-span-1 md:col-span-9 lg:col-span-6 xl:col-span-7 h-full overflow-y-auto no-scrollbar" style={{ scrollbarWidth: 'none' }}>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4">
              <h2 className="text-xl font-bold mb-2">Recent Job Postings</h2>
              <p className="text-gray-500 text-sm mb-6">Opportunities from your network</p>
              {jobs.length === 0 ? <div className="text-center py-10 text-gray-500">No jobs posted yet.</div> : (
                <div className="space-y-6">{jobs.map((job) => (
                  <div key={job._id} className="flex gap-4 border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                    <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-500 font-bold text-xl">{job.company.charAt(0)}</div>
                    <div className="flex-1"><h3 className="text-blue-600 font-semibold text-lg hover:underline cursor-pointer">{job.title}</h3><p className="text-sm text-gray-900">{job.company}</p><div className="text-sm text-gray-500 flex items-center gap-1 mt-1"><MapPin size={14} /> {job.location} ({job.type})</div><div className="text-xs text-green-600 mt-2 flex items-center gap-1"><Clock size={12} /> {new Date(job.createdAt).toLocaleDateString()}</div></div>
                    <Button variant="outline" size="sm" className="h-fit rounded-full border-blue-600 text-blue-600 hover:bg-blue-50">Apply</Button>
                  </div>
                ))}</div>
              )}
            </div>
          </div>
          <div className="hidden lg:block lg:col-span-3 xl:col-span-3 h-full"><div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center"><h3 className="font-semibold text-gray-600 mb-4">Job Seeker Guidance</h3><p className="text-sm text-gray-500 mb-4">Explore our curated guide.</p><Button variant="outline" fullWidth>Show more</Button></div></div>
        </div>
      </div>
      <CreateJobModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} user={user} onJobCreated={(newJob: any) => setJobs([newJob, ...jobs])} />
    </div>
  );
}