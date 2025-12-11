import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Briefcase, GraduationCap, CheckSquare } from 'lucide-react';
import axios from 'axios';

const ModalOverlay = ({ children, onClose }: { children: React.ReactNode, onClose: () => void }) => (
  <AnimatePresence>
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden z-10">
        {children}
      </motion.div>
    </div>
  </AnimatePresence>
);

// --- 1. ADD EXPERIENCE MODAL ---
export function AddExperienceModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [form, setForm] = useState({ title: '', company: '', location: '', startDate: '', endDate: '', description: '' });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  
  // 🔥 New States for Dropdown & Checkbox
  const [companies, setCompanies] = useState<any[]>([]);
  const [isChecked, setIsChecked] = useState(false);

  const user = JSON.parse(sessionStorage.getItem('veritas_user') || '{}');

  // 🔥 Fetch Registered Companies on Load
  useEffect(() => {
    if (isOpen) {
      axios.get('https://networxly-app.onrender.com/api/partners/all').then(res => {
        if (res.data.success) {
          // फक्त 'Company' रोल असलेले पार्टनर्स फिल्टर करा
          const comps = res.data.partners.filter((p: any) => p.role === 'Company');
          setCompanies(comps);
        }
      }).catch(err => console.error("Failed to load companies"));
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please upload proof document (Offer Letter/Experience Letter)");
    if (!isChecked) return alert("Please accept the declaration."); // 🔥 Checkbox Validation
    
    setLoading(true);
    const formData = new FormData();
    formData.append('userId', user._id);
    formData.append('proofDocument', file);
    Object.keys(form).forEach(key => formData.append(key, form[key as keyof typeof form]));

    try {
      const res = await axios.post('https://networxly-app.onrender.com/api/user/add-experience', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data.success) {
        alert("Experience Added & Sent for Verification! ✅");
        // Update Session
        const updatedUser = { ...user, experience: res.data.user.experience };
        sessionStorage.setItem('veritas_user', JSON.stringify(updatedUser));
        onClose();
        window.location.reload();
      }
    } catch (e) { alert("Error adding experience"); } finally { setLoading(false); }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClose={onClose}>
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2"><Briefcase size={20} /> Add Experience</h3>
        <button onClick={onClose}><X className="text-gray-500 hover:text-red-500" /></button>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        
        {/* Dropdown for Company */}
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase">Select Company</label>
          <select 
            className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            value={form.company} 
            onChange={e => setForm({...form, company: e.target.value})} 
            required
          >
            <option value="">-- Choose a Registered Company --</option>
            {companies.map(comp => (
              <option key={comp._id} value={comp.name}>{comp.name}</option>
            ))}
          </select>
          {companies.length === 0 && <p className="text-xs text-red-500 mt-1">No registered companies found. Contact Admin.</p>}
        </div>

        <input placeholder="Job Title (e.g. Developer)" className="p-3 border rounded-lg w-full" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
        
        <input placeholder="Location" className="p-3 border rounded-lg w-full" value={form.location} onChange={e => setForm({...form, location: e.target.value})} />
        
        <div className="grid grid-cols-2 gap-4">
          <div><label className="text-xs text-gray-500">Start Date</label><input type="date" className="p-3 border rounded-lg w-full" value={form.startDate} onChange={e => setForm({...form, startDate: e.target.value})} required /></div>
          <div><label className="text-xs text-gray-500">End Date</label><input type="date" className="p-3 border rounded-lg w-full" value={form.endDate} onChange={e => setForm({...form, endDate: e.target.value})} /></div>
        </div>
        
        <textarea placeholder="Description" className="p-3 border rounded-lg w-full h-20" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
        
        {/* File Upload */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 relative">
          <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => setFile(e.target.files?.[0] || null)} accept=".pdf,.jpg,.png" required />
          <Upload className="mx-auto text-gray-400 mb-2" />
          <p className="text-sm text-gray-600">{file ? file.name : "Upload Proof (Offer Letter / ID)"}</p>
        </div>

        {/* 🔥 Checkbox for Declaration */}
        <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
          <input 
            type="checkbox" 
            id="exp-agree" 
            className="mt-1 w-4 h-4 text-blue-600 rounded cursor-pointer"
            checked={isChecked}
            onChange={e => setIsChecked(e.target.checked)}
          />
          <label htmlFor="exp-agree" className="text-xs text-gray-700 cursor-pointer">
            I declare that the information provided above is true and correct to the best of my knowledge. I understand that providing false information may lead to account suspension.
          </label>
        </div>

        <button type="submit" disabled={loading || !isChecked} className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">
          {loading ? 'Submitting...' : 'Submit for Verification'}
        </button>
      </form>
    </ModalOverlay>
  );
}

// --- 2. ADD EDUCATION MODAL ---
export function AddEducationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [form, setForm] = useState({ school: '', degree: '', field: '', startDate: '', endDate: '', grade: '' });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  
  // 🔥 New States
  const [universities, setUniversities] = useState<any[]>([]);
  const [isChecked, setIsChecked] = useState(false);

  const user = JSON.parse(sessionStorage.getItem('veritas_user') || '{}');

  // 🔥 Fetch Registered Universities on Load
  useEffect(() => {
    if (isOpen) {
      axios.get('https://networxly-app.onrender.com/api/partners/all').then(res => {
        if (res.data.success) {
          // फक्त 'University' रोल असलेले पार्टनर्स फिल्टर करा
          const unis = res.data.partners.filter((p: any) => p.role === 'University');
          setUniversities(unis);
        }
      }).catch(err => console.error("Failed to load universities"));
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please upload proof document (Degree/Marksheet)");
    if (!isChecked) return alert("Please accept the declaration."); // 🔥 Checkbox Validation
    
    setLoading(true);
    const formData = new FormData();
    formData.append('userId', user._id);
    formData.append('proofDocument', file);
    Object.keys(form).forEach(key => formData.append(key, form[key as keyof typeof form]));

    try {
      const res = await axios.post('https://networxly-app.onrender.com/api/user/add-education', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data.success) {
        alert("Education Added & Sent for Verification! ✅");
        const updatedUser = { ...user, education: res.data.user.education };
        sessionStorage.setItem('veritas_user', JSON.stringify(updatedUser));
        onClose();
        window.location.reload();
      }
    } catch (e) { alert("Error adding education"); } finally { setLoading(false); }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClose={onClose}>
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2"><GraduationCap size={20} /> Add Education</h3>
        <button onClick={onClose}><X className="text-gray-500 hover:text-red-500" /></button>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        
        {/* Dropdown for University */}
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase">Select University</label>
          <select 
            className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            value={form.school} 
            onChange={e => setForm({...form, school: e.target.value})} 
            required
          >
            <option value="">-- Choose a Registered University --</option>
            {universities.map(uni => (
              <option key={uni._id} value={uni.name}>{uni.name}</option>
            ))}
          </select>
          {universities.length === 0 && <p className="text-xs text-red-500 mt-1">No registered universities found. Contact Admin.</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input placeholder="Degree (e.g. B.Tech)" className="p-3 border rounded-lg w-full" value={form.degree} onChange={e => setForm({...form, degree: e.target.value})} required />
          <input placeholder="Field of Study" className="p-3 border rounded-lg w-full" value={form.field} onChange={e => setForm({...form, field: e.target.value})} required />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div><label className="text-xs text-gray-500">Start Date</label><input type="date" className="p-3 border rounded-lg w-full" value={form.startDate} onChange={e => setForm({...form, startDate: e.target.value})} required /></div>
          <div><label className="text-xs text-gray-500">End Date</label><input type="date" className="p-3 border rounded-lg w-full" value={form.endDate} onChange={e => setForm({...form, endDate: e.target.value})} /></div>
        </div>
        
        {/* File Upload */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 relative">
          <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => setFile(e.target.files?.[0] || null)} accept=".pdf,.jpg,.png" required />
          <Upload className="mx-auto text-gray-400 mb-2" />
          <p className="text-sm text-gray-600">{file ? file.name : "Upload Degree / Marksheet"}</p>
        </div>

        {/* 🔥 Checkbox for Declaration */}
        <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
          <input 
            type="checkbox" 
            id="edu-agree" 
            className="mt-1 w-4 h-4 text-blue-600 rounded cursor-pointer"
            checked={isChecked}
            onChange={e => setIsChecked(e.target.checked)}
          />
          <label htmlFor="edu-agree" className="text-xs text-gray-700 cursor-pointer">
            I declare that the information provided above is true and correct to the best of my knowledge. I understand that providing false information may lead to account suspension.
          </label>
        </div>

        <button type="submit" disabled={loading || !isChecked} className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">
          {loading ? 'Submitting...' : 'Submit for Verification'}
        </button>
      </form>
    </ModalOverlay>
  );
}