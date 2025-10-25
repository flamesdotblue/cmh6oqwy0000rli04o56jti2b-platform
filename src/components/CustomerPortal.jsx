import React, { useMemo, useState } from 'react';
import { Search, Wallet, CheckCircle2, XCircle } from 'lucide-react';

const demoLedger = [
  { date: '2025-08-01', item: 'Rice Bag 25kg', amount: 1250, type: 'debit' },
  { date: '2025-08-05', item: 'Payment UPI', amount: 500, type: 'credit' },
  { date: '2025-08-12', item: 'Oil Tin 15L', amount: 2100, type: 'debit' },
];

export default function CustomerPortal({ onPay }) {
  const [query, setQuery] = useState('');
  const [found, setFound] = useState(false);
  const [amount, setAmount] = useState('');
  const balance = useMemo(() => {
    const total = demoLedger.reduce((acc, r) => acc + (r.type === 'debit' ? r.amount : -r.amount), 0);
    return Math.max(total, 0).toFixed(2);
  }, []);

  return (
    <section id="customer-portal" className="relative py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="relative rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl p-6 overflow-hidden">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-300/30 to-fuchsia-300/20 opacity-25" />
            <div className="relative">
              <h3 className="text-xl font-semibold">Customer Portal Demo</h3>
              <p className="text-slate-300 text-sm mt-2">Enter your phone number or invoice ID to view dues and pay.</p>
              <div className="mt-5 flex gap-2">
                <div className="flex-1 relative">
                  <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Phone or Invoice ID" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none text-white placeholder:text-slate-400 focus:border-teal-300/60" />
                  <Search className="w-4 h-4 text-slate-300 absolute right-3 top-3.5" />
                </div>
                <button onClick={() => setFound(Boolean(query))} className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 hover:bg-white/15">Search</button>
              </div>

              {found ? (
                <div className="mt-6 space-y-4">
                  <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-300">Total Due</p>
                        <p className="text-2xl font-bold">₹{balance}</p>
                      </div>
                      <Wallet className="w-8 h-8 text-teal-300" />
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                    <p className="text-sm text-slate-300 mb-2">Recent activity</p>
                    <div className="divide-y divide-white/10">
                      {demoLedger.map((r, i) => (
                        <div key={i} className="py-2 flex items-center justify-between text-sm">
                          <div className="text-slate-300">{r.date} · {r.item}</div>
                          <div className={r.type === 'debit' ? 'text-rose-300' : 'text-emerald-300'}>{r.type === 'debit' ? '+' : '-'}₹{r.amount}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                    <p className="text-sm text-slate-300 mb-2">Pay now</p>
                    <div className="flex gap-2">
                      <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder={`Amount (<= ₹${balance})`} className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none text-white placeholder:text-slate-400 focus:border-teal-300/60" />
                      <button onClick={() => onPay({ amount: amount || balance, customer: query || 'Customer', invoice: 'INV-DEMO' })} className="px-4 py-3 rounded-xl bg-gradient-to-br from-teal-300/30 to-cyan-300/20 border border-white/20 hover:border-teal-300/60">Pay UPI</button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-6 flex items-center gap-3 text-sm text-slate-300">
                  <XCircle className="w-4 h-4 text-slate-400" />
                  No record yet. Try demo: 9999999999 or INV-250
                </div>
              )}
            </div>
          </div>

          <div className="relative rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl p-6 overflow-hidden">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-300/30 to-teal-300/20 opacity-25" />
            <div className="relative">
              <h3 className="text-xl font-semibold">What customers see</h3>
              <ul className="mt-4 text-sm text-slate-300 space-y-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-300" /> Secure, read-only view of dues</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-300" /> UPI payment with auto update</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-300" /> Shareable link via WhatsApp/SMS</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-300" /> Download receipts instantly</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
