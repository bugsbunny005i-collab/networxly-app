import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { X } from 'lucide-react';
import ReCAPTCHA from "react-google-recaptcha";

// Imports
import { TopNav } from '../components/dashboard/TopNav';
import { LeftSidebar } from '../components/dashboard/LeftSidebar';
import { MainFeed } from '../components/dashboard/MainFeed';
import { RightSidebar } from '../components/dashboard/RightSidebar';
import { Button } from '../components/ui/Button';

// Edit Profile Modal
function EditProfileModal({ isOpen, onClose, user, onSave }: any) {
  const [formData, setFormData] = useState({ headline: '', location: '', about: '', skills: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        headline: user.headline || '',
        location: user.location || '',
        about: user.about || '',
        skills: user.skills?.join(', ') || ''
      });
    }
  }, [user]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put('http://localhost:5000/api/user/update', {
        email: user.email,
        headline: formData.headline,
        location: formData.location,
        about: formData.about,
        skills: formData.skills.split(',').map((s: string) => s.trim())
      });
      if (res.data.success) { onSave(res.data.user); onClose(); }
    } catch (err) { alert("Update failed"); } finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Edit Intro</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500"><X size={24} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <input type="text" className="w-full p-2 border rounded" placeholder="Headline" value={formData.headline} onChange={e=>setFormData({...formData, headline: e.target.value})} />
          <input type="text" className="w-full p-2 border rounded" placeholder="Location" value={formData.location} onChange={e=>setFormData({...formData, location: e.target.value})} />
          <textarea rows={3} className="w-full p-2 border rounded" placeholder="About" value={formData.about} onChange={e=>setFormData({...formData, about: e.target.value})} />
          <input type="text" className="w-full p-2 border rounded" placeholder="Skills" value={formData.skills} onChange={e=>setFormData({...formData, skills: e.target.value})} />
          <div className="flex justify-end"><Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button></div>
        </form>
      </div>
    </div>
  );
}

// Verification Modal
function VerificationModal({ isOpen, onClose, user }: any) {
  const [type, setType] = useState('Personal Details');
  const [loading, setLoading] = useState(false);
  const [captchaVal, setCaptchaVal] = useState<string | null>(null);
  const [isAgreed, setIsAgreed] = useState(false);

  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [personalEmail, setPersonalEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [addressProof, setAddressProof] = useState<File | null>(null);

  const [university, setUniversity] = useState('');
  const [eduCandidateName, setEduCandidateName] = useState('');
  const [degree, setDegree] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [passingYear, setPassingYear] = useState('');

  const [companyName, setCompanyName] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [workFrom, setWorkFrom] = useState('');
  const [workTo, setWorkTo] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [post, setPost] = useState('');
  const [ctc, setCtc] = useState('');
  const [idCardProof, setIdCardProof] = useState<File | null>(null);

  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(currentYear - 1949), (val, index) => currentYear - index);
  const universities = ["Mumbai University", "Pune University", "Delhi University", "Anna University", "Other"];
  const companies = ["TCS", "Infosys", "Wipro", "Accenture", "Google", "Microsoft", "Other"];

  if (!isOpen) return null;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>, setter: any) => {
    const val = e.target.value;
    if (/^[A-Za-z\s]*$/.test(val)) setter(val);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: any) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "application/pdf") setter(file);
      else { alert("Only PDF files are allowed!"); e.target.value = ""; }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaVal) { alert("Please complete the CAPTCHA."); return; }
    if (!isAgreed) { alert("Please agree to the terms."); return; }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('email', user.email);
      formData.append('type', type);

      if (type === 'Personal Details') {
        formData.append('fullName', fullName);
        formData.append('dob', dob);
        formData.append('personalEmail', personalEmail);
        formData.append('mobile', mobile);
        formData.append('address', address);
        if (addressProof) formData.append('addressProof', addressProof);
      } else if (type === 'Educational Details') {
        formData.append('university', university);
        formData.append('candidateName', eduCandidateName);
        formData.append('degree', degree);
        formData.append('rollNo', rollNo);
        formData.append('passingYear', passingYear);
      } else if (type === 'Experience Details') {
        formData.append('companyName', companyName);
        formData.append('employeeName', employeeName);
        formData.append('workFrom', workFrom);
        formData.append('workTo', workTo);
        formData.append('jobRole', jobRole);
        formData.append('post', post);
        formData.append('ctc', ctc);
        if (idCardProof) formData.append('idCardProof', idCardProof);
      }

      await axios.post('http://localhost:5000/api/verification/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert("Request & Files Submitted Successfully! ✅");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Submission Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-[#0A1628] text-white">
          <h2 className="text-xl font-bold">Start New Verification</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-white"><X size={24} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Verification Type</label>
            <select className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#0A66C2] outline-none"
              value={type} onChange={(e) => setType(e.target.value)}>
              <option>Personal Details</option>
              <option>Educational Details</option>
              <option>Experience Details</option>
            </select>
          </div>

          {type === 'Personal Details' && (
            <div className="space-y-3">
              <div><label className="block text-sm font-semibold text-gray-700">Full Name</label><input type="text" className="w-full p-2 border rounded" required value={fullName} onChange={(e) => handleNameChange(e, setFullName)} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-semibold text-gray-700">Date of Birth</label><input type="date" className="w-full p-2 border rounded" required value={dob} onChange={(e) => setDob(e.target.value)} /></div>
                <div><label className="block text-sm font-semibold text-gray-700">Mobile No</label><input type="tel" className="w-full p-2 border rounded" required pattern="[0-9]{10}" value={mobile} onChange={(e) => setMobile(e.target.value)} /></div>
              </div>
              <div><label className="block text-sm font-semibold text-gray-700">Personal Email</label><input type="email" className="w-full p-2 border rounded" required value={personalEmail} onChange={(e) => setPersonalEmail(e.target.value)} /></div>
              <div><label className="block text-sm font-semibold text-gray-700">Address</label><textarea className="w-full p-2 border rounded" rows={2} required value={address} onChange={(e) => setAddress(e.target.value)} /></div>
              <div><label className="block text-sm font-semibold text-gray-700">Address Proof (PDF)</label><input type="file" accept="application/pdf" className="w-full p-2 border rounded" required onChange={(e) => handleFileChange(e, setAddressProof)} /></div>
            </div>
          )}

          {type === 'Educational Details' && (
            <div className="space-y-3">
              <div><label className="block text-sm font-semibold text-gray-700">University</label><select className="w-full p-2 border rounded" value={university} onChange={(e) => setUniversity(e.target.value)} required><option value="">-- Select --</option>{universities.map(u => <option key={u} value={u}>{u}</option>)}</select></div>
              <div><label className="block text-sm font-semibold text-gray-700">Candidate Name</label><input type="text" className="w-full p-2 border rounded" required value={eduCandidateName} onChange={(e) => handleNameChange(e, setEduCandidateName)} /></div>
              <div><label className="block text-sm font-semibold text-gray-700">Degree</label><input type="text" className="w-full p-2 border rounded" required value={degree} onChange={(e) => setDegree(e.target.value)} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-semibold text-gray-700">Roll No</label><input type="text" className="w-full p-2 border rounded" required value={rollNo} onChange={(e) => setRollNo(e.target.value)} /></div>
                <div><label className="block text-sm font-semibold text-gray-700">Passing Year</label><select className="w-full p-2 border rounded" value={passingYear} onChange={(e) => setPassingYear(e.target.value)} required><option value="">-- Select --</option>{years.map(y => <option key={y} value={y}>{y}</option>)}</select></div>
              </div>
            </div>
          )}

          {type === 'Experience Details' && (
            <div className="space-y-3">
              <div><label className="block text-sm font-semibold text-gray-700">Company</label><select className="w-full p-2 border rounded" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required><option value="">-- Select --</option>{companies.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
              <div><label className="block text-sm font-semibold text-gray-700">Employee Name</label><input type="text" className="w-full p-2 border rounded" required value={employeeName} onChange={(e) => handleNameChange(e, setEmployeeName)} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-semibold text-gray-700">Work From</label><input type="date" className="w-full p-2 border rounded" required value={workFrom} onChange={(e) => setWorkFrom(e.target.value)} /></div>
                <div><label className="block text-sm font-semibold text-gray-700">Work To</label><input type="date" className="w-full p-2 border rounded" required value={workTo} onChange={(e) => setWorkTo(e.target.value)} /></div>
              </div>
              <div><label className="block text-sm font-semibold text-gray-700">Job Role</label><input type="text" className="w-full p-2 border rounded" required value={jobRole} onChange={(e) => setJobRole(e.target.value)} /></div>
              <div><label className="block text-sm font-semibold text-gray-700">Post</label><input type="text" className="w-full p-2 border rounded" required value={post} onChange={(e) => setPost(e.target.value)} /></div>
              <div><label className="block text-sm font-semibold text-gray-700">CTC</label><input type="number" className="w-full p-2 border rounded" required value={ctc} onChange={(e) => setCtc(e.target.value)} /></div>
              <div><label className="block text-sm font-semibold text-gray-700">ID Card (PDF)</label><input type="file" accept="application/pdf" className="w-full p-2 border rounded" required onChange={(e) => handleFileChange(e, setIdCardProof)} /></div>
            </div>
          )}

          <div className="flex justify-center py-2"><ReCAPTCHA sitekey="6LfQ7yUsAAAAAI2GjQaj1N5B7bx1Hah7GtkdU3-H" onChange={(val) => setCaptchaVal(val)} /></div>
          <div className="flex items-start gap-2"><input type="checkbox" id="agree" className="mt-1 w-4 h-4 text-[#0A66C2]" checked={isAgreed} onChange={(e) => setIsAgreed(e.target.checked)} /><label htmlFor="agree" className="text-sm text-gray-600">I declare that information is true.</label></div>
          <div className="flex justify-end pt-2"><Button type="submit" disabled={loading || !captchaVal || !isAgreed} className="px-8 bg-[#D4AF37] hover:bg-[#b5952f] text-[#0A1628]">{loading ? 'Submitting...' : 'Submit Request'}</Button></div>
        </form>
      </div>
    </div>
  );
}

// Main Layout
export function UserDashboard() {
  const [user, setUser] = useState<any>(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 🔥 FIX: sessionStorage
    const savedUser = sessionStorage.getItem('veritas_user');
    if (savedUser) setUser(JSON.parse(savedUser));
    else navigate('/login');
  }, [navigate]);

  const handleUserUpdate = (updatedUser: any) => {
    setUser(updatedUser);
    // 🔥 FIX: sessionStorage
    sessionStorage.setItem('veritas_user', JSON.stringify(updatedUser));
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="h-screen bg-[#F3F2EF] font-sans flex flex-col overflow-hidden">
      <div className="shrink-0"><TopNav user={user} /></div>
      <div className="flex-1 max-w-7xl w-full mx-auto px-0 sm:px-4 py-6 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full">
          <div className="hidden md:block md:col-span-3 lg:col-span-3 xl:col-span-2 h-full overflow-y-auto no-scrollbar" style={{ scrollbarWidth: 'none' }}>
            <LeftSidebar user={user} onEditClick={() => setIsEditProfileOpen(true)} onVerifyClick={() => setIsVerificationOpen(true)} />
          </div>
          <div className="col-span-1 md:col-span-9 lg:col-span-6 xl:col-span-6 h-full overflow-y-auto no-scrollbar" style={{ scrollbarWidth: 'none' }}>
            <MainFeed user={user} />
          </div>
          <div className="hidden lg:block lg:col-span-3 xl:col-span-4 h-full overflow-y-auto no-scrollbar" style={{ scrollbarWidth: 'none' }}>
            <RightSidebar />
          </div>
        </div>
      </div>
      <EditProfileModal isOpen={isEditProfileOpen} onClose={() => setIsEditProfileOpen(false)} user={user} onSave={handleUserUpdate} />
      <VerificationModal isOpen={isVerificationOpen} onClose={() => setIsVerificationOpen(false)} user={user} />
    </div>
  );
}