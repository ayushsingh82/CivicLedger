'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NetworkExplorer from '@/components/NetworkExplorer';
import MetagraphExplorer from '@/components/MetagraphExplorer';
import { useConstellation } from '@/hooks/useConstellation';
import type { ConsentRecord, DataRequest } from '@/lib/constellation';

export default function Home() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [activeTab, setActiveTab] = useState('consent');
  const [consents, setConsents] = useState<ConsentRecord[]>([
    { id: '1', type: 'Marketing Emails', status: 'Granted', timestamp: '2025-01-15 10:30:00', hash: '0x1a2b3c...' },
    { id: '2', type: 'Analytics Cookies', status: 'Granted', timestamp: '2025-01-15 10:32:00', hash: '0x4d5e6f...' },
    { id: '3', type: 'Third-party Sharing', status: 'Revoked', timestamp: '2025-01-16 14:20:00', hash: '0x7g8h9i...' },
  ]);
  const [dataRequests, setDataRequests] = useState<DataRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const { connected, connect, recordConsent, recordDataRequest, generateAuditReport } = useConstellation();

  // Auto-connect when dashboard is shown
  useEffect(() => {
    if (showDashboard && !connected) {
      connect();
    }
  }, [showDashboard, connected, connect]);

  // Show message and auto-hide after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleConsentAction = async (action: 'grant' | 'revoke', type: string) => {
    if (!connected) {
      setMessage({ type: 'error', text: 'Please connect to Constellation Network first' });
      return;
    }

    setLoading(true);
    try {
      const consentRecord = await recordConsent({
        type,
        status: action === 'grant' ? 'Granted' : 'Revoked',
        timestamp: new Date().toISOString(),
      });

      setConsents([consentRecord, ...consents]);
      setMessage({
        type: 'success',
        text: `Consent ${action === 'grant' ? 'granted' : 'revoked'} successfully! Hash: ${consentRecord.hash.substring(0, 12)}...`,
      });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to record consent',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDataRequest = async (type: string, actionType: string) => {
    if (!connected) {
      setMessage({ type: 'error', text: 'Please connect to Constellation Network first' });
      return;
    }

    setLoading(true);
    try {
      const request = await recordDataRequest({
        type,
        timestamp: new Date().toISOString(),
      });

      setDataRequests([request, ...dataRequests]);
      setMessage({
        type: 'success',
        text: `${actionType} request submitted! Hash: ${request.hash.substring(0, 12)}... It will be processed within 30 days per GDPR requirements.`,
      });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to submit data request',
      });
    } finally {
      setLoading(false);
    }
  };

  // Landing Page
  if (!showDashboard) {
    const backgroundCircles = [
      { className: 'fixed left-[-40px] top-[-40px] w-40 h-40', color: 'bg-[#8B7355]/70', blur: 'blur-sm', delay: 0 },
      { className: 'fixed left-[-32px] bottom-[-32px] w-32 h-32', color: 'bg-[#D4A574]/70', blur: 'blur', delay: 0.2 },
      { className: 'fixed right-[-40px] top-[-40px] w-40 h-40', color: 'bg-[#8B7355]/70', blur: 'blur-sm', delay: 0.4 },
      { className: 'fixed right-[-32px] bottom-[-32px] w-32 h-32', color: 'bg-[#D4A574]/70', blur: 'blur', delay: 0.6 },
    ];

    return (
      <div className="min-h-screen bg-[#FFFBF0] font-sans tracking-tight relative overflow-x-hidden">
        {/* Animated brown/cream background circles */}
        {backgroundCircles.map((circle, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: [0.9, 1.05, 0.9] }}
            transition={{ duration: 10, repeat: Infinity, delay: circle.delay, ease: 'easeInOut' }}
            className={`${circle.className} ${circle.color} ${circle.blur} rounded-full border-2 border-[#D4A574]/30 pointer-events-none z-0`}
          />
        ))}

        {/* Header */}
        <header className="absolute top-6 left-6 z-10">
          <div className="bg-[#8B7355] border-2 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] px-6 py-3 rounded-lg">
            <h1 className="text-2xl font-black text-white tracking-wide">CivicLedger</h1>
            <p className="text-xs font-semibold text-[#FFF8E7]">Powered by Constellation Network</p>
          </div>
        </header>

        {/* Hero Section */}
        <div className="relative pt-32 pb-16 px-4 text-center">
          <p className="text-sm font-black mb-4 text-black">Decentralized GDPR Compliance & Blockchain Explorer</p>
          <h3 className="text-6xl font-bold font-black text-[#8B7355] italic mb-4">
            CivicLedger
          </h3>
          <h2 className="text-3xl font-black text-black italic mb-8">GDPR Compliance on the Hypergraph</h2>
          <p className="text-xl text-black mb-12 max-w-3xl mx-auto leading-relaxed">
            Immutable consent records, automated data subject rights, and comprehensive blockchain explorer
            powered by Constellation Network's feeless architecture
          </p>
          <button
            onClick={() => setShowDashboard(true)}
            className="bg-[#8B7355] border-2 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] px-12 py-4 rounded-lg text-xl font-bold text-white hover:bg-[#8B7355]/90 hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 active:shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px]"
          >
            Get Started
          </button>
        </div>

        {/* Main Content - Bento Grid */}
        <div className="max-w-5xl mx-auto px-4 pb-20 mt-16">
          <div className="grid grid-cols-12 gap-6 auto-rows-[180px]">
            {/* Core Features */}
            <div className="col-span-12 md:col-span-6 row-span-2 bg-[#FFF8E7] border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl flex flex-col justify-center">
              <h2 className="text-xl font-black mb-4 text-white bg-[#8B7355] px-3 py-2 rounded-lg inline-block">✨ Core Features</h2>
              <p className="text-sm text-black leading-relaxed mb-3">✅ <strong>GDPR Compliance</strong> – Immutable consent records with blockchain verification</p>
              <p className="text-sm text-black leading-relaxed mb-3">✅ <strong>Data Subject Rights</strong> – Automated access, portability, and erasure requests</p>
              <p className="text-sm text-black leading-relaxed">✅ <strong>Blockchain Explorer</strong> – Hypergraph and Metagraph statistics with interactive charts</p>
            </div>

            {/* Constellation Integration */}
            <div className="col-span-12 md:col-span-6 row-span-2 bg-[#8B7355] border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl flex flex-col justify-center">
              <h2 className="text-xl font-black mb-4 text-white bg-black px-3 py-2 rounded-lg inline-block">🌌 Constellation Tech</h2>
              <p className="text-sm text-white mb-4 leading-relaxed">Built on Constellation Network infrastructure:</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3 bg-[#FFF8E7]"></span><span className="text-white font-semibold">HGTP Protocol</span></li>
                <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3 bg-[#FFF8E7]"></span><span className="text-white font-semibold">Metagraphs</span></li>
                <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3 bg-[#FFF8E7]"></span><span className="text-white font-semibold">L0 Standard</span></li>
                <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3 bg-[#FFF8E7]"></span><span className="text-white font-semibold">Feeless Transactions</span></li>
              </ul>
            </div>

            {/* How It Works */}
            <div className="col-span-12 md:col-span-8 row-span-2 bg-[#FFF8E7] border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl flex flex-col justify-center">
              <h2 className="text-xl font-black mb-4 text-white bg-[#8B7355] px-3 py-2 rounded-lg inline-block">🚀 How It Works</h2>
              <p className="text-sm text-black mb-4 leading-relaxed">Decentralized GDPR compliance in three steps:</p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-lg font-extrabold text-[#8B7355] mr-3">1</span>
                  <div>
                    <div className="font-bold text-black mb-1 text-sm">Record Consent</div>
                    <div className="text-xs text-black">Users grant or revoke consent for data processing, recorded immutably on Hypergraph</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-lg font-extrabold text-[#8B7355] mr-3">2</span>
                  <div>
                    <div className="font-bold text-black mb-1 text-sm">Exercise Rights</div>
                    <div className="text-xs text-black">Users submit GDPR rights requests (Access, Portability, Erasure) automatically processed</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-lg font-extrabold text-[#8B7355] mr-3">3</span>
                  <div>
                    <div className="font-bold text-black mb-1 text-sm">Explore Network</div>
                    <div className="text-xs text-black">View network statistics, transactions, wallets, and metagraph data with interactive charts</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Properties */}
            <div className="col-span-12 md:col-span-4 row-span-1 bg-[#FFF8E7] border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl flex flex-col justify-center">
              <h3 className="text-lg font-black mb-2 text-white bg-[#8B7355] px-3 py-1 rounded-lg inline-block">🔒 Immutable Records</h3>
              <p className="text-black text-sm mt-2">All consent records are permanently stored on Constellation Hypergraph, providing tamper-proof evidence for regulatory compliance.</p>
            </div>

            {/* Explorer Features */}
            <div className="col-span-12 md:col-span-4 row-span-1 bg-[#FFF8E7] border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl flex flex-col justify-center">
              <h4 className="text-lg font-bold text-white bg-[#D4A574] px-3 py-1 rounded-lg inline-block">📊 Explorer Features</h4>
              <p className="text-black text-sm mt-2">Comprehensive Hypergraph and Metagraph explorer with real-time statistics, charts, and transaction data visualization.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Page with Sidebar
  return (
    <div className="min-h-screen bg-[#FFFBF0]" style={{ fontFamily: "'Courier New', monospace" }}>
      {/* Header */}
      <header className="border-b-4 border-[#8B7355] bg-[#FFFBF0] sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div>
                <h1 className="text-xl font-bold text-black tracking-wide">CivicLedger</h1>
                <p className="text-xs font-medium text-black">Powered by Constellation Network</p>
              </div>
              <div className="ml-4 flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${connected ? 'bg-green-500' : 'bg-gray-400'}`} />
                <span className="text-xs font-bold uppercase text-black">
                  {connected ? 'Connected ✓' : 'Connecting...'}
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowDashboard(false)}
              className="px-6 py-2 border-2 border-[#8B7355] text-[#8B7355] font-bold uppercase hover:bg-[#8B7355] hover:text-white transition-colors"
              style={{ borderRight: '4px solid black', borderBottom: '4px solid black' }}
            >
              ← Back to Home
            </button>
          </div>
        </div>
        {/* Message Notification */}
        {message && (
          <div className={`px-4 sm:px-6 lg:px-8 py-3 ${
            message.type === 'success' ? 'bg-green-100 border-t-2 border-green-500' : 'bg-red-100 border-t-2 border-red-500'
          }`}>
            <div className="flex items-center justify-between">
              <p className={`text-sm font-bold ${message.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                {message.text}
              </p>
              <button
                onClick={() => setMessage(null)}
                className="text-lg font-bold"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r-4 border-[#8B7355] bg-[#FFF8E7] min-h-[calc(100vh-73px)] sticky top-[73px]">
          <nav className="p-6 space-y-2">
            <p className="text-xs text-gray-500 mb-4 uppercase font-bold">Hypergraph</p>
            <button
              onClick={() => setActiveTab('hypergraph')}
                className={`w-full flex items-center space-x-3 px-4 py-3 font-bold uppercase transition-colors ${
                  activeTab === 'hypergraph' || activeTab === 'overview' || activeTab === 'wallets' || activeTab === 'snapshots' || activeTab === 'transactions' || activeTab === 'nodes'
                    ? 'bg-[#8B7355] text-white'
                    : 'text-black hover:bg-[#8B7355] hover:text-white'
                }`}
                style={{ borderRight: (activeTab === 'hypergraph' || activeTab === 'overview' || activeTab === 'wallets' || activeTab === 'snapshots' || activeTab === 'transactions' || activeTab === 'nodes') ? '4px solid black' : 'none', borderBottom: (activeTab === 'hypergraph' || activeTab === 'overview' || activeTab === 'wallets' || activeTab === 'snapshots' || activeTab === 'transactions' || activeTab === 'nodes') ? '4px solid black' : 'none' }}
            >
              <span className="text-2xl">🌐</span>
              <span className="text-left tracking-wide">Hypergraph</span>
            </button>

            <div className="pt-6 border-t-4 border-gray-400 mt-6">
              <p className="text-xs text-gray-500 mb-4 uppercase font-bold">Metagraphs</p>
              <button
                onClick={() => setActiveTab('metagraphs')}
                className={`w-full flex items-center space-x-3 px-4 py-3 font-bold uppercase transition-colors ${
                  activeTab === 'metagraphs'
                    ? 'bg-[#8B7355] text-white'
                    : 'text-black hover:bg-[#8B7355] hover:text-white'
                }`}
                style={{ borderRight: activeTab === 'metagraphs' ? '4px solid black' : 'none', borderBottom: activeTab === 'metagraphs' ? '4px solid black' : 'none' }}
              >
                <span className="text-2xl">🌐</span>
                <span className="text-left tracking-wide">Metagraphs</span>
              </button>
            </div>

            <div className="pt-6 border-t-4 border-gray-400 mt-6">
              <p className="text-xs text-gray-500 mb-4 uppercase font-bold">CivicLedger</p>
              {[
                { id: 'consent', label: 'Consent Management', icon: '📝' },
                { id: 'rights', label: 'Data Subject Rights', icon: '⚖️' },
                { id: 'audit', label: 'Audit Dashboard', icon: '📊' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 font-bold uppercase transition-colors ${
                    activeTab === tab.id
                      ? 'bg-[#8B7355] text-white'
                      : 'text-black hover:bg-[#8B7355] hover:text-white'
                  }`}
                  style={{ borderRight: activeTab === tab.id ? '4px solid black' : 'none', borderBottom: activeTab === tab.id ? '4px solid black' : 'none' }}
                >
                  <span className="text-2xl">{tab.icon}</span>
                  <span className="text-left tracking-wide">{tab.label}</span>
                </button>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Consent Management Tab */}
          {activeTab === 'consent' && (
            <div>
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-black mb-6 uppercase tracking-wide">
                  Record New Consent
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['Marketing Emails', 'Analytics Cookies', 'Third-party Sharing', 'Location Data'].map(
                    (type) => (
                      <div
                        key={type}
                        className="p-6 border-2 border-dashed border-[#8B7355] hover:border-solid hover:border-[#8B7355] transition-colors"
                        style={{ borderRight: '4px solid black', borderBottom: '4px solid black' }}
                      >
                        <h4 className="font-bold text-black mb-4 uppercase tracking-wide">{type}</h4>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleConsentAction('grant', type)}
                            disabled={loading || !connected}
                            className="flex-1 px-4 py-2 bg-[#8B7355] text-white font-bold uppercase hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{ borderRight: '4px solid black', borderBottom: '4px solid black' }}
                          >
                            {loading ? 'Processing...' : 'Grant'}
                          </button>
                          <button
                            onClick={() => handleConsentAction('revoke', type)}
                            disabled={loading || !connected}
                            className="flex-1 px-4 py-2 border-2 border-[#8B7355] text-[#8B7355] font-bold uppercase hover:bg-[#8B7355] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{ borderRight: '4px solid black', borderBottom: '4px solid black' }}
                          >
                            {loading ? 'Processing...' : 'Revoke'}
                          </button>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-black mb-6 uppercase tracking-wide">
                  Consent History
                </h3>
                <div className="space-y-3">
                  {consents.map((consent) => (
                    <div
                      key={consent.id}
                      className="p-4 bg-[#FFF8E7] border-2 border-gray-400 flex items-center justify-between hover:shadow-md transition-shadow"
                      style={{ borderRight: '4px solid #000', borderBottom: '4px solid #000' }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-3 h-3 bg-[#8B7355]" />
                        <div>
                          <p className="font-bold text-black uppercase tracking-wide">{consent.type}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(consent.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="px-3 py-1 bg-gray-200 text-gray-700 uppercase text-sm font-bold border-2 border-gray-600">
                          {consent.status}
                        </span>
                        <code className="text-xs text-gray-600 bg-white border-2 border-gray-400 px-2 py-1 font-mono">
                          {consent.hash}
                        </code>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Data Subject Rights Tab */}
          {activeTab === 'rights' && (
            <div>
              <h3 className="text-3xl font-bold text-black mb-8 uppercase tracking-wide">
                Exercise Your GDPR Rights
              </h3>
              <div className="space-y-6 mb-8">
                {[
                  {
                    icon: '📄',
                    title: 'Right to Access (Article 15)',
                    description: 'Request a copy of all personal data we hold about you',
                    action: 'Request Data Copy',
                  },
                  {
                    icon: '📦',
                    title: 'Right to Data Portability (Article 20)',
                    description: 'Transfer your data to another service in a structured format',
                    action: 'Export Data',
                  },
                  {
                    icon: '🗑️',
                    title: 'Right to Erasure (Article 17)',
                    description: 'Request deletion of your personal data',
                    action: 'Request Deletion',
                  },
                ].map((right) => (
                  <div
                    key={right.title}
                    className="p-8 border-2 border-[#8B7355] hover:bg-[#FFF8E7] transition-shadow"
                    style={{ borderRight: '6px solid black', borderBottom: '6px solid black' }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <span className="text-5xl">{right.icon}</span>
                        <div>
                          <h4 className="font-bold text-2xl text-black mb-2">{right.title}</h4>
                          <p className="text-gray-700 text-lg">{right.description}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDataRequest(right.title, right.action)}
                        disabled={loading || !connected}
                        className="px-8 py-3 bg-[#8B7355] text-white font-bold uppercase hover:opacity-90 transition-colors whitespace-nowrap text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ borderRight: '4px solid black', borderBottom: '4px solid black' }}
                      >
                        {loading ? 'Processing...' : right.action}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Data Requests History */}
              {dataRequests.length > 0 && (
                <div>
                  <h3 className="text-3xl font-bold text-black mb-6 uppercase tracking-wide">
                    Data Request History
                  </h3>
                  <div className="space-y-3">
                    {dataRequests.map((request) => (
                      <div
                        key={request.id}
                        className="p-4 bg-[#FFF8E7] border-2 border-gray-400 flex items-center justify-between hover:shadow-md transition-shadow"
                        style={{ borderRight: '4px solid #000', borderBottom: '4px solid #000' }}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-3 h-3 bg-[#8B7355]" />
                          <div>
                            <p className="font-bold text-black uppercase tracking-wide">{request.type}</p>
                            <p className="text-sm text-gray-600">
                              {new Date(request.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className={`px-3 py-1 uppercase text-sm font-bold border-2 ${
                            request.status === 'Completed' 
                              ? 'bg-green-200 text-green-700 border-green-600'
                              : request.status === 'Processing'
                              ? 'bg-yellow-200 text-yellow-700 border-yellow-600'
                              : 'bg-gray-200 text-gray-700 border-gray-600'
                          }`}>
                            {request.status}
                          </span>
                          <code className="text-xs text-gray-600 bg-white border-2 border-gray-400 px-2 py-1 font-mono">
                            {request.hash.substring(0, 16)}...
                          </code>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Audit Dashboard Tab */}
          {activeTab === 'audit' && (
            <div>
              <h3 className="text-3xl font-bold text-black mb-8 uppercase tracking-wide">
                Compliance Metrics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="p-8 bg-[#FFF8E7] border-2 border-[#8B7355]" style={{ borderRight: '6px solid black', borderBottom: '6px solid black' }}>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-2xl text-black uppercase tracking-wide">Compliance Score</h4>
                    <span className="text-4xl">✅</span>
                  </div>
                  <div className="text-5xl font-bold text-[#8B7355] mb-2">
                    {consents.length > 0 
                      ? Math.round((consents.filter(c => c.status === 'Granted').length / consents.length) * 100)
                      : 100}%
                  </div>
                  <p className="text-gray-700 uppercase font-bold tracking-wide">
                    {consents.length} consent record{consents.length !== 1 ? 's' : ''} verified on-chain
                  </p>
                </div>

                <div className="p-8 bg-[#FFF8E7] border-2 border-[#8B7355]" style={{ borderRight: '6px solid black', borderBottom: '6px solid black' }}>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-2xl text-black uppercase tracking-wide">Active Data Requests</h4>
                    <span className="text-4xl">📋</span>
                  </div>
                  <div className="text-5xl font-bold text-[#8B7355] mb-2">
                    {dataRequests.filter(r => r.status !== 'Completed').length}
                  </div>
                  <p className="text-gray-700 uppercase font-bold tracking-wide">
                    {dataRequests.filter(r => r.status === 'Processing').length} in progress (30-day SLA)
                  </p>
                </div>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-6 bg-[#FFF8E7] border-2 border-[#8B7355]" style={{ borderRight: '4px solid black', borderBottom: '4px solid black' }}>
                  <div className="text-3xl font-bold text-[#8B7355] mb-2">{consents.length}</div>
                  <p className="text-gray-700 uppercase font-bold tracking-wide text-sm">Total Consents</p>
                </div>
                <div className="p-6 bg-[#FFF8E7] border-2 border-[#8B7355]" style={{ borderRight: '4px solid black', borderBottom: '4px solid black' }}>
                  <div className="text-3xl font-bold text-[#8B7355] mb-2">
                    {consents.filter(c => c.status === 'Granted').length}
                  </div>
                  <p className="text-gray-700 uppercase font-bold tracking-wide text-sm">Granted</p>
                </div>
                <div className="p-6 bg-[#FFF8E7] border-2 border-[#8B7355]" style={{ borderRight: '4px solid black', borderBottom: '4px solid black' }}>
                  <div className="text-3xl font-bold text-[#8B7355] mb-2">
                    {consents.filter(c => c.status === 'Revoked').length}
                  </div>
                  <p className="text-gray-700 uppercase font-bold tracking-wide text-sm">Revoked</p>
                </div>
              </div>

              <div className="bg-[#FFF8E7] p-8 border-2 border-[#8B7355]" style={{ borderRight: '6px solid black', borderBottom: '6px solid black' }}>
                <h4 className="font-bold text-2xl text-black mb-6 uppercase tracking-wide">Blockchain Verification</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b-2 border-gray-400">
                    <span className="text-gray-700 font-bold uppercase">Network</span>
                    <span className="font-mono text-black font-bold">
                      Constellation Hypergraph
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b-2 border-gray-400">
                    <span className="text-gray-700 font-bold uppercase">Protocol</span>
                    <span className="font-mono text-black font-bold">
                      HGTP (Hypergraph Transfer)
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b-2 border-gray-400">
                    <span className="text-gray-700 font-bold uppercase">Last Verified</span>
                    <span className="font-mono text-black font-bold">
                      Just now
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-gray-700 font-bold uppercase">Blockchain Hash</span>
                    <span className="font-mono text-[#8B7355] font-bold">
                      0x7f8a9b...2c3d4e
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Hypergraph Explorer */}
          {(activeTab === 'hypergraph' || activeTab === 'overview' || activeTab === 'wallets' || activeTab === 'snapshots' || activeTab === 'transactions' || activeTab === 'nodes') && (
            <div>
              <NetworkExplorer initialTab={activeTab === 'hypergraph' ? 'overview' : (activeTab as 'overview' | 'wallets' | 'snapshots' | 'transactions' | 'nodes')} />
            </div>
          )}

          {/* Metagraphs Tab */}
          {activeTab === 'metagraphs' && (
            <div>
              <MetagraphExplorer />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}