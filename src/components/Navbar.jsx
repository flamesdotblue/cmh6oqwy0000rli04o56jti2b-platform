import React from 'react';
import { Rocket, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-900/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#home" className="group inline-flex items-center gap-2">
          <span className="relative grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-br from-teal-300/30 to-cyan-300/10 border border-white/20 shadow-[0_0_24px_rgba(45,212,191,0.35)]">
            <Rocket className="w-5 h-5 text-teal-300 group-hover:translate-y-[-1px] transition-transform" />
          </span>
          <span className="font-semibold tracking-tight text-white">IndiKhata</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-200">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#payments" className="hover:text-white transition-colors">Payments</a>
        </nav>
        <div className="flex items-center gap-3">
          <span className="hidden sm:flex items-center gap-2 text-xs text-slate-300/90">
            <ShieldCheck className="w-4 h-4 text-emerald-300" /> Secure by design
          </span>
          <a href="#pricing" className="relative inline-flex items-center px-4 py-2 rounded-xl bg-white/10 border border-white/20 hover:border-teal-300/60 hover:bg-teal-300/10 text-white transition-all shadow-[0_0_24px_rgba(20,184,166,0.25)]">
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
}
