import React from 'react';
import { ShieldCheck, Star, Clock, Quote } from 'lucide-react';

export function AuthBrandingSide() {
  return (
    <div className="relative hidden lg:flex flex-col justify-between w-full h-full p-12 bg-gradient-to-br from-[#0F172A] via-[#1E40AF] to-[#0A1628] text-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#3B82F6] blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#7C3AED] blur-[100px]" />
      </div>

      {/* Header / Logo Area */}
      <div className="relative z-10">
        <div className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <div className="w-8 h-8 bg-[#D4AF37] rounded-lg flex items-center justify-center">
            <span className="text-[#0A1628] font-bold">V</span>
          </div>
          Veritas Enterprise
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="relative z-10 max-w-lg">
        <Quote className="w-12 h-12 text-[#D4AF37] mb-6 opacity-80" />
        <blockquote className="text-2xl font-medium leading-relaxed mb-8 text-slate-100 font-serif">
          "Veritas has completely transformed our hiring process. The speed and accuracy of their verification is unmatched."
        </blockquote>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-200/20 border border-white/10" />
          <div>
            <div className="font-semibold text-white">Sarah Jenkins</div>
            <div className="text-sm text-blue-200">
              Chief People Officer, GlobalBank
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="relative z-10 grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
        <div className="flex flex-col gap-2">
          <div className="p-2 bg-white/10 w-fit rounded-lg backdrop-blur-sm">
            <ShieldCheck className="w-5 h-5 text-[#3B82F6]" />
          </div>
          <div className="text-sm font-medium text-slate-200">
            Blockchain Secured
          </div>
          <div className="text-xs text-slate-400">Tamper-proof Records</div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="p-2 bg-white/10 w-fit rounded-lg backdrop-blur-sm">
            <Star className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <div className="text-sm font-medium text-slate-200">
            Market Leader
          </div>
          <div className="text-xs text-slate-400">#1 Rated Solution</div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="p-2 bg-white/10 w-fit rounded-lg backdrop-blur-sm">
            <Clock className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-sm font-medium text-slate-200">Instant Results</div>
          <div className="text-xs text-slate-400">&lt;60 Seconds</div>
        </div>
      </div>
    </div>
  );
}