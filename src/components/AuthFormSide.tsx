import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export function AuthFormSide() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [captchaVal, setCaptchaVal] = useState<string | null>(null);
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();

  const handleCaptchaChange = (value: string | null) => {
    console.log("Captcha value:", value);
    setCaptchaVal(value);
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
        alert("Please enter email and password.");
        return;
    }
    if (!isLogin && (!firstName || !lastName)) {
        alert("Please enter your full name.");
        return;
    }

    try {
        let res;
        
        if (isLogin) {
            res = await axios.post('https://networxly-app.onrender.com/api/auth/login', { email, password });
        } else {
            res = await axios.post('https://networxly-app.onrender.com/api/auth/register', { 
                firstName, 
                lastName, 
                email, 
                password 
            });
        }

        if (res.data.success) {
            console.log("✅ Auth Success:", res.data.user);
            sessionStorage.setItem('veritas_user', JSON.stringify(res.data.user));
            alert(isLogin ? "Login Successful!" : "Account Created Successfully!");
            
            // 🔥 FIX: Redirect to '/feed' instead of '/dashboard'
            navigate('/feed'); 
        } else {
            alert(res.data.message || "Authentication failed");
        }

    } catch (error) {
        console.error("Auth Error:", error);
        alert("Server Error. Please try again.");
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
        );
        const { name, email, picture } = userInfo.data;
        const res = await axios.post('https://networxly-app.onrender.com/api/auth/google', {
          name: name, email: email, photo: picture
        });
        if (res.data.success) {
           sessionStorage.setItem('veritas_user', JSON.stringify(res.data.user));
           // 🔥 FIX: Google login साठी पण '/feed'
           navigate('/feed'); 
        }
      } catch (error) { alert("Google Login Failed"); }
    },
    onError: () => console.log('Google Login Failed'),
  });

  return (
    <div className="flex flex-col justify-center items-center w-full h-full bg-white p-6 sm:p-12 lg:p-24 overflow-y-auto">
      <div className="w-full max-w-md space-y-8">
        <div className="lg:hidden flex justify-center mb-8">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-slate-900">
            <div className="w-8 h-8 bg-[#D4AF37] rounded-lg flex items-center justify-center">
              <span className="text-[#0A1628] font-bold">V</span>
            </div>
            Veritas
          </Link>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h1>
          <p className="text-slate-500">
            {isLogin ? 'Enter your credentials to access your account' : 'Start your secure verification journey'}
          </p>
        </div>

        <div className="flex w-full border-b border-slate-200 mb-8">
          <button onClick={() => setIsLogin(true)} className={`flex-1 pb-4 text-sm font-medium relative transition-colors ${isLogin ? 'text-[#1E40AF]' : 'text-slate-500 hover:text-slate-700'}`}>
            Sign In
            {isLogin && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1E40AF]" />}
          </button>
          <button onClick={() => setIsLogin(false)} className={`flex-1 pb-4 text-sm font-medium relative transition-colors ${!isLogin ? 'text-[#1E40AF]' : 'text-slate-500 hover:text-slate-700'}`}>
            Create Account
            {!isLogin && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1E40AF]" />}
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={isLogin ? 'login' : 'signup'} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="space-y-6">
            <form onSubmit={handleAuth} className="space-y-4">
              
              {!isLogin && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">First Name</label>
                    <input type="text" placeholder="John" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-[#1E40AF] outline-none" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Last Name</label>
                    <input type="text" placeholder="Doe" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-[#1E40AF] outline-none" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Email Address</label>
                <input type="email" placeholder="name@company.com" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-[#1E40AF] outline-none" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-700">Password</label>
                  {isLogin && <a href="#" className="text-sm font-medium text-[#1E40AF] hover:underline">Forgot password?</a>}
                </div>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-[#1E40AF] outline-none pr-10" required value={password} onChange={(e) => setPassword(e.target.value)} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex justify-start">
                <ReCAPTCHA sitekey="6LfQ7yUsAAAAAI2GjQaj1N5B7bx1Hah7GtkdU3-H" onChange={handleCaptchaChange} />
              </div>

              <div className="flex items-center gap-2">
                <input id="remember" type="checkbox" className="w-4 h-4 text-[#1E40AF] border-slate-300 rounded focus:ring-[#1E40AF]" />
                <label htmlFor="remember" className="text-sm text-slate-600">
                  {isLogin ? 'Remember me for 30 days' : <span>I agree to the <a href="#" className="text-[#1E40AF] hover:underline">Terms of Service</a> and <a href="#" className="text-[#1E40AF] hover:underline">Privacy Policy</a></span>}
                </label>
              </div>

              <button type="submit" className="w-full flex items-center justify-center gap-2 bg-[#1E40AF] hover:bg-[#1e3a8a] text-white font-semibold py-2.5 px-4 rounded-md shadow-sm transition-all">
                {isLogin ? 'Sign In' : 'Create Account'}
                <ArrowRight size={16} />
              </button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
              <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-slate-500">Or continue with</span></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => googleLogin()} className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-md shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                Google
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-md shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                Microsoft
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}