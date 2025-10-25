import React, { useState } from 'react';
import Modal from './Modal';
import { ShieldCheck, Banknote, FileCheck, ArrowRight } from 'lucide-react';

const steps = [
  { key: 'business', title: 'Business Details', icon: FileCheck },
  { key: 'kyc', title: 'KYC Verification', icon: ShieldCheck },
  { key: 'bank', title: 'Bank Linking', icon: Banknote },
];

export default function UpiActivationWizard({ open, onClose, onCompleted }) {
  const [i, setI] = useState(0);
  const [form, setForm] = useState({ legalName: '', gstin: '', pan: '', account: '', ifsc: '' });

  const next = () => setI((x) => Math.min(x + 1, steps.length - 1));
  const back = () => setI((x) => Math.max(x - 1, 0));
  const complete = () => onCompleted?.({ success: true, form });

  const StepIcon = steps[i].icon;

  return (
    <Modal open={open} onClose={onClose} widthClass="max-w-xl">
      <div className="p-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 grid place-items-center rounded-xl bg-white/10 border border-white/20">
            <StepIcon className="w-5 h-5 text-teal-200" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">UPI Activation • {steps[i].title}</h3>
            <p className="text-slate-300 text-xs">Step {i + 1} of {steps.length}</p>
          </div>
        </div>

        <div className="mt-5 grid gap-3">
          {i === 0 && (
            <>
              <input value={form.legalName} onChange={(e) => setForm({ ...form, legalName: e.target.value })} placeholder="Legal business name" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none text-white placeholder:text-slate-400 focus:border-teal-300/60" />
              <input value={form.gstin} onChange={(e) => setForm({ ...form, gstin: e.target.value })} placeholder="GSTIN (optional)" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none text-white placeholder:text-slate-400 focus:border-teal-300/60" />
              <input value={form.pan} onChange={(e) => setForm({ ...form, pan: e.target.value })} placeholder="PAN" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none text-white placeholder:text-slate-400 focus:border-teal-300/60" />
            </>
          )}
          {i === 1 && (
            <>
              <div className="text-sm text-slate-300">Upload KYC documents (simulated). We verify instantly in sandbox.</div>
              <label className="block">
                <span className="text-xs text-slate-300">Address proof</span>
                <input type="file" className="mt-1 block w-full text-xs text-slate-200" />
              </label>
              <label className="block">
                <span className="text-xs text-slate-300">ID proof</span>
                <input type="file" className="mt-1 block w-full text-xs text-slate-200" />
              </label>
            </>
          )}
          {i === 2 && (
            <>
              <input value={form.account} onChange={(e) => setForm({ ...form, account: e.target.value })} placeholder="Bank account number" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none text-white placeholder:text-slate-400 focus:border-teal-300/60" />
              <input value={form.ifsc} onChange={(e) => setForm({ ...form, ifsc: e.target.value })} placeholder="IFSC" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none text-white placeholder:text-slate-400 focus:border-teal-300/60" />
              <div className="text-xs text-slate-400">We will send ₹1 test credit to verify account in sandbox.</div>
            </>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="text-xs text-slate-400">Secure by design · Data encrypted</div>
          <div className="flex gap-2">
            {i > 0 && (
              <button onClick={back} className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/15">Back</button>
            )}
            {i < steps.length - 1 ? (
              <button onClick={next} className="px-4 py-2 rounded-xl bg-gradient-to-br from-teal-300/30 to-cyan-300/20 border border-white/20 hover:border-teal-300/60 inline-flex items-center gap-2">
                Next <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={complete} className="px-4 py-2 rounded-xl bg-emerald-400/20 text-emerald-100 border border-emerald-300/30 hover:bg-emerald-400/25">Finish</button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
