import React, { useMemo, useState } from 'react';
import Modal from './Modal';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

export default function SandboxCheckout({ open, onClose, data }) {
  const [status, setStatus] = useState('idle');
  const amount = useMemo(() => parseFloat(data?.amount || '0').toFixed(2), [data]);

  const simulate = (result) => {
    setStatus(result);
    setTimeout(() => {
      onClose?.();
      setStatus('idle');
      // Here we would update ledger via webhook in a real integration
    }, 900);
  };

  return (
    <Modal open={open} onClose={onClose} widthClass="max-w-md">
      <div className="p-5">
        <h3 className="text-lg font-semibold">Sandbox Checkout</h3>
        <p className="text-slate-300 text-sm mt-1">Invoice {data?.invoice} · {data?.customer}</p>
        <div className="mt-5 rounded-2xl border border-white/15 bg-white/5 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Amount</p>
              <p className="text-2xl font-bold">₹{amount}</p>
            </div>
            <ArrowRight className="w-6 h-6 text-cyan-200" />
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <button onClick={() => simulate('success')} className="px-4 py-2 rounded-xl bg-emerald-400/20 text-emerald-100 border border-emerald-300/30 hover:bg-emerald-400/25 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5" /> Success
          </button>
          <button onClick={() => simulate('failed')} className="px-4 py-2 rounded-xl bg-rose-400/20 text-rose-100 border border-rose-300/30 hover:bg-rose-400/25 flex items-center justify-center gap-2">
            <XCircle className="w-5 h-5" /> Fail
          </button>
        </div>
        {status !== 'idle' && (
          <div className="mt-4 text-center text-sm text-slate-300">Payment {status}. Closing…</div>
        )}
      </div>
    </Modal>
  );
}
