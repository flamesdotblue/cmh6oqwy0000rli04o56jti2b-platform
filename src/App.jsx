import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeatureGrid from './components/FeatureGrid';
import Payments from './components/Payments';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white antialiased selection:bg-teal-300/40 selection:text-slate-900">
      <div className="fixed inset-0 bg-[radial-gradient(1200px_600px_at_20%_-10%,rgba(56,189,248,0.18),transparent),radial-gradient(900px_500px_at_90%_10%,rgba(167,139,250,0.18),transparent),radial-gradient(700px_400px_at_50%_100%,rgba(52,211,153,0.14),transparent)] pointer-events-none" />
      <Navbar />
      <main>
        <Hero />
        <FeatureGrid />
        <Payments />
      </main>
    </div>
  );
}
