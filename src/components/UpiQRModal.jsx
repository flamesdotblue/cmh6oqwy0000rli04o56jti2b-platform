import React, { useMemo, useState } from 'react';
import Modal from './Modal';
import { Download, Copy, Check } from 'lucide-react';

export default function UpiQRModal({ open, onClose, data }) {
  const [copied, setCopied] = useState(false);
  const upiUri = useMemo(() => {
    const vpa = encodeURIComponent(data?.vpa || 'indikhata@sbi');
    const name = encodeURIComponent(data?.name || 'IndiKhata');
    const amount = encodeURIComponent(data?.amount || '0');
    const note = encodeURIComponent(data?.note || 'Payment');
    return `upi://pay?pa=${vpa}&pn=${name}&am=${amount}&tn=${note}&cu=INR`;
  }, [data]);

  const qrSrc = useMemo(() => {
    const size = 240;
    const url = encodeURIComponent(upiUri);
    return `https://api.qrserver.com/v1/create-qr-code/?data=${url}&size=${size}x${size}&margin=0`;
  }, [upiUri]);

  const copy = async () => {
    await navigator.clipboard.writeText(upiUri);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const download = () => {
    const a = document.createElement('a');
    a.href = qrSrc;
    a.download = 'upi-qr.png';
    a.click();
  };

  return (
    <Modal open={open} onClose={onClose} widthClass="max-w-md">
      <div className="p-5">
        <h3 className="text-lg font-semibold">UPI QR Code</h3>
        <p className="text-slate-300 text-sm mt-1">Scan to pay or copy the UPI link.</p>
        <div className="mt-5 grid place-items-center">
          <div className="p-3 rounded-2xl bg-white/10 border border-white/15">
            <img src={qrSrc} alt="UPI QR" className="rounded-xl" />
          </div>
        </div>
        <div className="mt-4 text-xs break-all text-slate-300 bg-white/5 p-3 rounded-xl border border-white/10">
          {upiUri}
        </div>
        <div className="mt-4 flex gap-2">
          <button onClick={copy} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/15">
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />} {copied ? 'Copied' : 'Copy link'}
          </button>
          <button onClick={download} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-br from-teal-300/30 to-cyan-300/20 border border-white/20 hover:border-teal-300/60">
            <Download className="w-4 h-4" /> Download QR
          </button>
        </div>
      </div>
    </Modal>
  );
}
