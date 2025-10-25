import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, Receipt, Boxes, Users, BarChart3, ShieldCheck } from 'lucide-react';

const features = [
  {
    title: 'Smart Khata',
    desc: 'Record credits, set reminders, auto statements for customers.',
    icon: Users,
    glow: 'from-sky-300/50 to-indigo-300/30',
  },
  {
    title: 'Instant Billing',
    desc: 'GST-ready invoices with shareable links and WhatsApp PDFs.',
    icon: Receipt,
    glow: 'from-rose-300/50 to-amber-300/30',
  },
  {
    title: 'Inventory Control',
    desc: 'Track stock, low-stock alerts, batches and variants.',
    icon: Boxes,
    glow: 'from-emerald-300/50 to-lime-300/30',
  },
  {
    title: 'UPI Payments',
    desc: 'Enable QR and UPI ID payments with auto-reconciliation.',
    icon: Wallet,
    glow: 'from-teal-300/50 to-cyan-300/30',
  },
  {
    title: 'Analytics',
    desc: 'Sales, dues and cashflow dashboards with trends.',
    icon: BarChart3,
    glow: 'from-fuchsia-300/50 to-violet-300/30',
  },
  {
    title: 'Secure & Compliant',
    desc: 'Bank-grade encryption and audit logs.',
    icon: ShieldCheck,
    glow: 'from-emerald-300/60 to-teal-300/30',
  },
];

export default function FeatureGrid() {
  return (
    <section id="features" className="relative py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold">Everything for modern trade</h2>
          <p className="text-slate-300 mt-3">Designed for Indian suppliers and retailers with customer-friendly views.</p>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ title, desc, icon: Icon, glow, index }) {
  return (
    <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.45, delay: index * 0.05 }} className="group relative rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl p-6 overflow-hidden">
      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${glow} opacity-20 group-hover:opacity-35 transition-opacity`} />
      <div className="relative flex items-start gap-4">
        <div className="grid place-items-center w-12 h-12 rounded-2xl bg-white/10 border border-white/20 shadow-[0_0_24px_rgba(255,255,255,0.14)]">
          <motion.div whileHover={{ rotate: 8 }} className="text-white">
            <Icon className="w-6 h-6" />
          </motion.div>
        </div>
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-slate-300 mt-1 text-sm leading-relaxed">{desc}</p>
        </div>
      </div>
      <div className="mt-5 flex items-center gap-2 text-xs text-slate-300/90">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.9)]" />
        Neon-hover effect active
      </div>
    </motion.div>
  );
}
