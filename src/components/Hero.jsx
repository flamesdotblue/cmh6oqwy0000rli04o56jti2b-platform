import React from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';
import { CreditCard, Wallet } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="relative min-h-[88vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/10 via-slate-950/40 to-slate-950/80 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              Manage Khata, Billing and Inventory with Neon-Clear Precision
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="text-slate-300 text-lg">
              One indigenous platform for suppliers, shopkeepers and customers. Track dues, send bills, manage stock, and enable instant UPI payments in a glass-morphic interface.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="flex flex-wrap gap-3">
              <a href="#pricing" className="group relative inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-br from-teal-300/30 to-cyan-300/20 border border-white/20 text-white hover:shadow-[0_0_30px_rgba(45,212,191,0.45)] hover:border-teal-300/60 transition-all">
                <Wallet className="w-5 h-5 text-teal-200 group-hover:rotate-6 transition-transform" />
                Activate UPI Payments
              </a>
              <a href="#features" className="group inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 border border-white/20 hover:bg-white/15 hover:shadow-[0_0_30px_rgba(147,197,253,0.35)] transition-all">
                <CreditCard className="w-5 h-5 text-cyan-200 group-hover:-rotate-6 transition-transform" />
                Explore Features
              </a>
            </motion.div>
            <div className="flex items-center gap-4 pt-2">
              <div className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_2px_rgba(16,185,129,0.8)]" />
              <p className="text-sm text-slate-300">Live: Customers can view dues and pay instantly</p>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative">
            <div className="rounded-3xl border border-white/20 bg-white/5 backdrop-blur-xl p-6 md:p-8 shadow-[0_0_60px_rgba(99,102,241,0.25)]">
              <div className="grid grid-cols-2 gap-4">
                <NeonCard title="Supplier" accent="from-indigo-300/60 to-purple-300/40" />
                <NeonCard title="Shopkeeper" accent="from-teal-300/60 to-cyan-300/40" />
                <NeonCard title="Customer" accent="from-rose-300/60 to-amber-300/40" />
                <NeonCard title="Agent" accent="from-emerald-300/60 to-lime-300/40" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function NeonCard({ title, accent }) {
  return (
    <motion.div whileHover={{ y: -6 }} className={`group relative rounded-2xl p-4 bg-white/10 border border-white/20 backdrop-blur-xl transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.12)]`}> 
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${accent} opacity-30 group-hover:opacity-50 transition-opacity`} />
      <div className="relative">
        <p className="font-semibold tracking-tight">{title}</p>
        <p className="text-xs text-slate-300/90">Access role-based dashboards</p>
      </div>
    </motion.div>
  );
}
