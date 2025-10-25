import React, { lazy, Suspense, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Pricing from './components/Pricing';
import CustomerPortal from './components/CustomerPortal';
import UpiQRModal from './components/UpiQRModal';
import ShareLinkModal from './components/ShareLinkModal';
import SandboxCheckout from './components/SandboxCheckout';
import UpiActivationWizard from './components/UpiActivationWizard';

const FeatureGrid = lazy(() => import('./components/FeatureGrid'));

export default function App() {
  const [qrOpen, setQrOpen] = useState(false);
  const [qrData, setQrData] = useState({ vpa: 'indikhata@sbi', name: 'IndiKhata', amount: '100.00', note: 'Invoice #INV-101' });

  const [shareOpen, setShareOpen] = useState(false);
  const [shareData, setShareData] = useState({ link: '', amount: '', customer: '' });

  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState({ amount: '0.00', customer: 'Demo Customer', invoice: 'INV-000' });

  const [wizardOpen, setWizardOpen] = useState(false);

  const handlers = useMemo(() => ({
    openQR: (data) => { setQrData(prev => ({ ...prev, ...data })); setQrOpen(true); },
    shareLink: (data) => { const params = new URLSearchParams({ amount: data.amount || '0', customer: data.customer || 'Customer', invoice: data.invoice || 'INV-0001' }); const link = `${window.location.origin}/pay?${params.toString()}`; setShareData({ link, amount: data.amount || '0', customer: data.customer || 'Customer' }); setShareOpen(true); },
    openSandbox: (data) => { setCheckoutData(prev => ({ ...prev, ...data })); setCheckoutOpen(true); },
    openWizard: () => setWizardOpen(true),
  }), []);

  return (
    <div className="min-h-screen bg-slate-950 text-white antialiased selection:bg-teal-300/40 selection:text-slate-900">
      <div className="fixed inset-0 bg-[radial-gradient(1200px_600px_at_20%_-10%,rgba(56,189,248,0.18),transparent),radial-gradient(900px_500px_at_90%_10%,rgba(167,139,250,0.18),transparent),radial-gradient(700px_400px_at_50%_100%,rgba(52,211,153,0.14),transparent)] pointer-events-none" />
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-slate-300">Loading features…</div>}>
          <FeatureGrid />
        </Suspense>
        <CustomerPortal onPay={(payload) => handlers.openSandbox(payload)} />
        <Pricing
          onOpenQR={(data) => handlers.openQR(data)}
          onShareLink={(data) => handlers.shareLink(data)}
          onOpenSandbox={(data) => handlers.openSandbox(data)}
          onOpenWizard={() => handlers.openWizard()}
        />
      </main>

      <UpiQRModal open={qrOpen} onClose={() => setQrOpen(false)} data={qrData} />
      <ShareLinkModal open={shareOpen} onClose={() => setShareOpen(false)} data={shareData} />
      <SandboxCheckout open={checkoutOpen} onClose={() => setCheckoutOpen(false)} data={checkoutData} />
      <UpiActivationWizard open={wizardOpen} onClose={() => setWizardOpen(false)} onCompleted={(result) => { setWizardOpen(false); if (result?.success) { handlers.openQR({ amount: '1.00', note: 'UPI Activation Test' }); } }} />
    </div>
  );
}
