import React, { useState } from 'react';
import Modal from './Modal';
import { Copy, Share2, Check } from 'lucide-react';

export default function ShareLinkModal({ open, onClose, data }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(data?.link || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const shareWhatsApp = () => {
    const text = encodeURIComponent(`Payment request of ₹${data?.amount} for ${data?.customer}. Link: ${data?.link}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <Modal open={open} onClose={onClose} widthClass="max-w-lg">
      <div className="p-5">
        <h3 className="text-lg font-semibold">Share Payment Link</h3>
        <p className="text-slate-300 text-sm mt-1">Copy or share the secure payment link.</p>
        <div className="mt-4 text-xs break-all text-slate-300 bg-white/5 p-3 rounded-xl border border-white/10">
          {data?.link}
        </div>
        <div className="mt-4 flex gap-2">
          <button onClick={copy} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/15">
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />} {copied ? 'Copied' : 'Copy link'}
          </button>
          <button onClick={shareWhatsApp} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-br from-teal-300/30 to-cyan-300/20 border border-white/20 hover:border-teal-300/60">
            <Share2 className="w-4 h-4" /> WhatsApp
          </button>
        </div>
      </div>
    </Modal>
  );
}
