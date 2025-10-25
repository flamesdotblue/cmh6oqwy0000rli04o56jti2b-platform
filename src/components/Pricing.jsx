import React from 'react';
import { motion } from 'framer-motion';
import { Zap, CreditCard, ShieldCheck } from 'lucide-react';

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">Simple, transparent pricing</h2>
          <p className="text-slate-300 mt-3">Start free. Upgrade when you need advanced automation and payment features.</p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <PlanCard
            name="Starter"
            price="₹0"
            period="/mo"
            features={[
              'Khata ledger & reminders',
              'Basic invoicing',
              '100 customers',
            ]}
            accent="from-sky-300/50 to-indigo-300/30"
            cta="Start Free"
          />
          <PlanCard
            name="Business"
            price="₹499"
            period="/mo"
            recommended
            features={[
              'Inventory tracking',
              'Unlimited customers',
              'Analytics dashboard',
              'Priority support',
            ]}
            accent="from-emerald-300/60 to-teal-300/40"
            cta="Go Business"
          />
          <PlanCard
            name="Payments+"
            price="₹999"
            period="/mo"
            features={[
              'UPI payment links & QR',
              'Auto reconciliation',
              'Settlement reports',
              'Compliance toolkit',
            ]}
            accent="from-rose-300/60 to-amber-300/40"
            cta="Enable UPI"
          />
        </div>

        <div id="payments" className="mt-12 grid md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative rounded-3xl p-6 bg-white/5 border border-white/15 backdrop-blur-xl">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal-300/40 to-cyan-300/20 opacity-25" />
            <div className="relative flex items-start gap-4">
              <div className="w-12 h-12 grid place-items-center rounded-2xl bg-white/10 border border-white/20">
                <CreditCard className="w-6 h-6 text-cyan-200" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">UPI activation flow</h3>
                <p className="text-slate-300 text-sm mt-1">Verify KYC, link bank account, generate QR and share payment links. Customers can view dues and pay instantly.</p>
              </div>
            </div>
            <div className="relative mt-5 flex flex-wrap gap-3">
              <button className="px-4 py-2 rounded-xl bg-gradient-to-br from-teal-300/30 to-cyan-300/20 border border-white/20 hover:border-teal-300/60 hover:shadow-[0_0_26px_rgba(45,212,191,0.45)] transition">Create UPI QR</button>
              <button className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/15 transition">Share Payment Link</button>
              <button className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/15 transition">Test Sandbox</button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative rounded-3xl p-6 bg-white/5 border border-white/15 backdrop-blur-xl">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-300/40 to-teal-300/20 opacity-25" />
            <div className="relative flex items-start gap-4">
              <div className="w-12 h-12 grid place-items-center rounded-2xl bg-white/10 border border-white/20">
                <ShieldCheck className="w-6 h-6 text-emerald-200" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Security & trust</h3>
                <p className="text-slate-300 text-sm mt-1">All payments routed through certified gateways. Data encrypted at rest and in transit.</p>
              </div>
            </div>
            <ul className="relative mt-5 text-sm text-slate-300 grid gap-2 list-disc list-inside">
              <li>UPI compliant flows</li>
              <li>Audit logs & role-based access</li>
              <li>Exportable settlement reports</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PlanCard({ name, price, period, features, accent, cta, recommended }) {
  return (
    <motion.div whileHover={{ y: -8 }} className={`relative rounded-3xl p-6 border bg-white/5 backdrop-blur-xl overflow-hidden ${recommended ? 'border-teal-300/50 shadow-[0_0_50px_rgba(45,212,191,0.3)]' : 'border-white/15'}`}>
      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${accent} opacity-25`} />
      {recommended && (
        <div className="absolute right-4 top-4 text-[10px] uppercase tracking-wider px-2 py-1 rounded-md bg-teal-300/20 border border-teal-200/40 text-teal-100">Recommended</div>
      )}
      <div className="relative">
        <h3 className="text-xl font-semibold">{name}</h3>
        <div className="mt-3 flex items-end gap-1">
          <span className="text-3xl font-extrabold">{price}</span>
          <span className="text-slate-300">{period}</span>
        </div>
        <ul className="mt-4 text-sm text-slate-200 space-y-2">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-2">
              <Zap className="w-4 h-4 text-amber-200 mt-0.5" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
        <button className="mt-6 w-full rounded-xl px-4 py-2 bg-white/10 border border-white/20 hover:bg-white/15 hover:border-teal-300/60 hover:shadow-[0_0_30px_rgba(45,212,191,0.4)] transition">
          {cta}
        </button>
      </div>
    </motion.div>
  );
}
