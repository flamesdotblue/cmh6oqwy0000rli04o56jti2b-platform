import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, CreditCard, ShieldCheck, QrCode, Link as LinkIcon, Copy, Check, Phone, User, X, ArrowRight, Wallet } from 'lucide-react';
import QRCode from 'qrcode';

export default function Payments() {
  const [showUPIWizard, setShowUPIWizard] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const [showSandbox, setShowSandbox] = useState(false);
  const [showCustomer, setShowCustomer] = useState(false);

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
            onClick={() => setShowCustomer(true)}
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
            onClick={() => setShowUPIWizard(true)}
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
            onClick={() => setShowUPIWizard(true)}
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
              <button onClick={() => setShowQR(true)} className="px-4 py-2 rounded-xl bg-gradient-to-br from-teal-300/30 to-cyan-300/20 border border-white/20 hover:border-teal-300/60 hover:shadow-[0_0_26px_rgba(45,212,191,0.45)] transition inline-flex items-center gap-2"><QrCode className="w-4 h-4"/>Create UPI QR</button>
              <button onClick={() => setShowLink(true)} className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/15 transition inline-flex items-center gap-2"><LinkIcon className="w-4 h-4"/>Share Payment Link</button>
              <button onClick={() => setShowSandbox(true)} className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/15 transition inline-flex items-center gap-2"><ShieldCheck className="w-4 h-4"/>Test Sandbox</button>
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

        <div id="customer" className="mt-12">
          <CustomerPortalCard onOpen={() => setShowCustomer(true)} />
        </div>
      </div>

      {showUPIWizard && (
        <Modal onClose={() => setShowUPIWizard(false)} title="UPI Activation Wizard">
          <UPIWizard onDone={() => setShowUPIWizard(false)} />
        </Modal>
      )}
      {showQR && (
        <Modal onClose={() => setShowQR(false)} title="Generate UPI QR">
          <QRGenerator onDone={() => setShowQR(false)} />
        </Modal>
      )}
      {showLink && (
        <Modal onClose={() => setShowLink(false)} title="Create Payment Link">
          <PaymentLink onDone={() => setShowLink(false)} />
        </Modal>
      )}
      {showSandbox && (
        <Modal onClose={() => setShowSandbox(false)} title="Sandbox Checkout">
          <SandboxCheckout onDone={() => setShowSandbox(false)} />
        </Modal>
      )}
      {showCustomer && (
        <Modal onClose={() => setShowCustomer(false)} title="Customer Portal Demo">
          <CustomerPortalDemo />
        </Modal>
      )}
    </section>
  );
}

function PlanCard({ name, price, period, features, accent, cta, recommended, onClick }) {
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
        <button onClick={onClick} className="mt-6 w-full rounded-xl px-4 py-2 bg-white/10 border border-white/20 hover:bg-white/15 hover:border-teal-300/60 hover:shadow-[0_0_30px_rgba(45,212,191,0.4)] transition">
          {cta}
        </button>
      </div>
    </motion.div>
  );
}

function CustomerPortalCard({ onOpen }) {
  return (
    <div className="relative rounded-3xl p-6 bg-white/5 border border-white/15 backdrop-blur-xl overflow-hidden">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-sky-300/30 to-indigo-300/20 opacity-25" />
      <div className="relative flex items-start gap-4">
        <div className="w-12 h-12 grid place-items-center rounded-2xl bg-white/10 border border-white/20">
          <Wallet className="w-6 h-6 text-sky-200" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg">Customer Portal</h3>
          <p className="text-slate-300 text-sm mt-1">Let customers view their dues and pay instantly via UPI. Try the interactive demo.</p>
          <div className="mt-4">
            <button onClick={onOpen} className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/15 transition inline-flex items-center gap-2">
              Try Demo<ArrowRight className="w-4 h-4"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center p-4">
      <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl shadow-[0_0_40px_rgba(45,212,191,0.25)] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <h4 className="font-semibold">{title}</h4>
          <button onClick={onClose} className="p-1 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

function UPIWizard({ onDone }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ biz: '', gstin: '', account: '', ifsc: '' });
  const next = () => setStep((s) => Math.min(3, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  return (
    <div className="grid gap-4">
      <div className="flex items-center gap-2 text-xs text-slate-300">
        <span className={`px-2 py-1 rounded ${step>=1?'bg-teal-300/20 border border-teal-200/40':'bg-white/10 border border-white/10'}`}>Business</span>
        <span className={`px-2 py-1 rounded ${step>=2?'bg-teal-300/20 border border-teal-200/40':'bg-white/10 border border-white/10'}`}>KYC</span>
        <span className={`px-2 py-1 rounded ${step>=3?'bg-teal-300/20 border border-teal-200/40':'bg-white/10 border border-white/10'}`}>Bank</span>
      </div>
      {step === 1 && (
        <div className="grid gap-3">
          <Input label="Business Name" value={data.biz} onChange={(v)=>setData({...data,biz:v})} icon={<User className="w-4 h-4"/>} />
          <Input label="GSTIN (optional)" value={data.gstin} onChange={(v)=>setData({...data,gstin:v})} />
        </div>
      )}
      {step === 2 && (
        <div className="grid gap-3">
          <Input label="Owner Mobile" value={data.mobile} onChange={(v)=>setData({...data,mobile:v})} icon={<Phone className="w-4 h-4"/>} />
          <Input label="PAN (optional)" value={data.pan} onChange={(v)=>setData({...data,pan:v})} />
        </div>
      )}
      {step === 3 && (
        <div className="grid gap-3">
          <Input label="Account Number" value={data.account} onChange={(v)=>setData({...data,account:v})} />
          <Input label="IFSC" value={data.ifsc} onChange={(v)=>setData({...data,ifsc:v})} />
        </div>
      )}
      <div className="flex items-center justify-between pt-2">
        <button onClick={back} disabled={step===1} className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/15 disabled:opacity-50">Back</button>
        {step<3 ? (
          <button onClick={next} className="px-4 py-2 rounded-xl bg-gradient-to-br from-teal-300/30 to-cyan-300/20 border border-white/20 hover:border-teal-300/60">Next</button>
        ) : (
          <button onClick={onDone} className="px-4 py-2 rounded-xl bg-gradient-to-br from-emerald-300/30 to-teal-300/20 border border-white/20 hover:border-emerald-300/60 inline-flex items-center gap-2"><Check className="w-4 h-4"/>Finish</button>
        )}
      </div>
    </div>
  );
}

function Input({ label, value, onChange, icon }) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="text-slate-300">{label}</span>
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 border border-white/15 focus-within:border-teal-300/60">
        {icon}
        <input value={value || ''} onChange={(e)=>onChange(e.target.value)} className="bg-transparent outline-none w-full placeholder:text-slate-400" placeholder={label} />
      </div>
    </label>
  );
}

function QRGenerator({ onDone }) {
  const [vpa, setVpa] = useState('merchant@upi');
  const [name, setName] = useState('IndiKhata Store');
  const [amount, setAmount] = useState('499.00');
  const [qr, setQr] = useState('');

  const payload = useMemo(() => {
    const params = new URLSearchParams({ pa: vpa, pn: name, am: amount, cu: 'INR' });
    return `upi://pay?${params.toString()}`;
  }, [vpa, name, amount]);

  async function generate() {
    const url = await QRCode.toDataURL(payload, { margin: 1, width: 256, color: { dark: '#E2E8F0', light: '#0F172A' } });
    setQr(url);
  }

  return (
    <div className="grid md:grid-cols-2 gap-5">
      <div className="grid gap-3">
        <Input label="VPA / UPI ID" value={vpa} onChange={setVpa} />
        <Input label="Merchant Name" value={name} onChange={setName} />
        <Input label="Amount (INR)" value={amount} onChange={setAmount} />
        <div className="flex gap-2">
          <button onClick={generate} className="px-4 py-2 rounded-xl bg-gradient-to-br from-teal-300/30 to-cyan-300/20 border border-white/20 hover:border-teal-300/60">Generate</button>
          <button onClick={onDone} className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/15">Close</button>
        </div>
      </div>
      <div className="grid place-items-center">
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/15">
          {qr ? (<img src={qr} alt="UPI QR" className="w-56 h-56" />) : (
            <div className="w-56 h-56 grid place-items-center text-slate-400">QR Preview</div>
          )}
        </div>
      </div>
    </div>
  );
}

function PaymentLink({ onDone }) {
  const [invoice, setInvoice] = useState('INV-1001');
  const [customer, setCustomer] = useState('Rahul Sharma');
  const [amount, setAmount] = useState('1499');
  const url = useMemo(() => {
    const u = new URL(window.location.href);
    u.hash = '';
    u.search = '';
    u.pathname = '/pay';
    const q = new URLSearchParams({ invoice, customer, amount, currency: 'INR' });
    return `${u.origin}/?${q.toString()}#checkout`;
  }, [invoice, customer, amount]);

  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="grid gap-3">
      <div className="grid md:grid-cols-3 gap-3">
        <Input label="Invoice" value={invoice} onChange={setInvoice} />
        <Input label="Customer" value={customer} onChange={setCustomer} />
        <Input label="Amount (INR)" value={amount} onChange={setAmount} />
      </div>
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 border border-white/15">
        <LinkIcon className="w-4 h-4"/>
        <input readOnly value={url} className="bg-transparent outline-none w-full"/>
        <button onClick={copy} className="px-3 py-1 rounded-lg bg-white/10 border border-white/15 hover:bg-white/15 inline-flex items-center gap-1">
          {copied ? (<><Check className="w-4 h-4"/>Copied</>) : (<><Copy className="w-4 h-4"/>Copy</>)}
        </button>
      </div>
      <div className="flex gap-2">
        <a href={url} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-xl bg-gradient-to-br from-teal-300/30 to-cyan-300/20 border border-white/20 hover:border-teal-300/60">Open Link</a>
        <button onClick={onDone} className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/15">Close</button>
      </div>
    </div>
  );
}

function SandboxCheckout({ onDone }) {
  const [status, setStatus] = useState('pending');
  const [ledger, setLedger] = useState({ invoice: 'INV-1001', customer: 'Rahul Sharma', amount: 1499, paid: 0 });

  function simulate(result) {
    setStatus(result);
    if (result === 'success') setLedger({ ...ledger, paid: ledger.amount });
  }

  return (
    <div className="grid gap-4">
      <div className="rounded-2xl p-4 bg-white/5 border border-white/15">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold">{ledger.invoice}</div>
            <div className="text-sm text-slate-300">{ledger.customer}</div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold">₹{ledger.amount}</div>
            <div className="text-xs text-slate-300">Paid: ₹{ledger.paid}</div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <button onClick={()=>simulate('success')} className="px-4 py-2 rounded-xl bg-emerald-400/20 border border-emerald-300/40 hover:bg-emerald-400/25">Mark Success</button>
        <button onClick={()=>simulate('failed')} className="px-4 py-2 rounded-xl bg-rose-400/20 border border-rose-300/40 hover:bg-rose-400/25">Mark Failed</button>
        <button onClick={()=>simulate('pending')} className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/15">Reset</button>
        <button onClick={onDone} className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/15">Close</button>
      </div>
      <div className="text-sm text-slate-300">Webhook event (mock): {status === 'success' ? 'payment.success' : status === 'failed' ? 'payment.failed' : 'payment.pending'}</div>
    </div>
  );
}

function CustomerPortalDemo() {
  const [mobile, setMobile] = useState('9876543210');
  const [show, setShow] = useState(false);
  const [dues] = useState([
    { id: 'INV-1001', date: '2025-01-10', amount: 1499, status: 'Unpaid' },
    { id: 'INV-0998', date: '2024-12-20', amount: 799, status: 'Unpaid' },
  ]);

  return (
    <div className="grid gap-4">
      <div className="grid md:grid-cols-[1fr_auto] gap-3">
        <Input label="Enter Mobile / Invoice" value={mobile} onChange={setMobile} icon={<Phone className="w-4 h-4"/>} />
        <button onClick={()=>setShow(true)} className="px-4 py-2 self-end h-10 rounded-xl bg-gradient-to-br from-teal-300/30 to-cyan-300/20 border border-white/20 hover:border-teal-300/60">View Dues</button>
      </div>
      {show && (
        <div className="rounded-2xl border border-white/15 overflow-hidden">
          <div className="grid grid-cols-4 text-xs text-slate-300 bg-white/5 px-4 py-2">
            <div>Invoice</div><div>Date</div><div>Amount</div><div>Status</div>
          </div>
          {dues.map((d)=> (
            <div key={d.id} className="grid grid-cols-4 items-center px-4 py-3 border-t border-white/10 bg-white/5">
              <div className="font-medium">{d.id}</div>
              <div className="text-sm text-slate-300">{d.date}</div>
              <div className="text-sm">₹{d.amount}</div>
              <div className="flex items-center gap-2">
                <span className="text-amber-200/90 text-xs bg-amber-400/10 border border-amber-200/30 rounded px-2 py-0.5">{d.status}</span>
                <a href={`/?invoice=${d.id}&amount=${d.amount}#checkout`} target="_blank" rel="noreferrer" className="ml-auto text-xs px-3 py-1 rounded-lg bg-emerald-400/15 border border-emerald-300/40 hover:bg-emerald-400/20 inline-flex items-center gap-1">
                  Pay<ArrowRight className="w-3 h-3"/>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
      <p className="text-xs text-slate-400">This is a demo. Actual dues and payments will reflect in real-time after UPI activation.</p>
    </div>
  );
}
