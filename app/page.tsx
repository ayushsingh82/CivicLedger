'use client';

import { useState } from 'react';

export default function Home() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [activeTab, setActiveTab] = useState('consent');
  const [connected, setConnected] = useState(false);
  const [consents, setConsents] = useState([
    { id: 1, type: 'Marketing Emails', status: 'Granted', timestamp: '2025-01-15 10:30:00', hash: '0x1a2b3c...' },
    { id: 2, type: 'Analytics Cookies', status: 'Granted', timestamp: '2025-01-15 10:32:00', hash: '0x4d5e6f...' },
    { id: 3, type: 'Third-party Sharing', status: 'Revoked', timestamp: '2025-01-16 14:20:00', hash: '0x7g8h9i...' },
  ]);

  const handleConnect = () => {
    setConnected(true);
  };

  const handleConsentAction = (action: 'grant' | 'revoke', type: string) => {
    const newConsent = {
      id: consents.length + 1,
      type,
      status: action === 'grant' ? 'Granted' : 'Revoked',
      timestamp: new Date().toLocaleString(),
      hash: '0x' + Math.random().toString(16).substr(2, 8) + '...',
    };
    setConsents([...consents, newConsent]);
  };

  const handleDataRequest = (type: string) => {
    alert(`${type} request submitted! It will be processed within 30 days per GDPR requirements.`);
  };

  // Landing Page
  if (!showDashboard) {
    return (
      <div className="min-h-screen bg-white" style={{ fontFamily: "'Courier New', monospace" }}>
        {/* Header */}
        <header className="border-b-4 border-[#614500] bg-white sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#614500] flex items-center justify-center" style={{ borderRight: '4px solid #4a3500', borderBottom: '4px solid #4a3500' }}>
                  <span className="text-white font-bold text-xl">🌌</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-black tracking-wide">PrivacyLedger</h1>
                  <p className="text-xs text-gray-600">Powered by Constellation Network</p>
                </div>
              </div>
              <button
                onClick={() => setShowDashboard(true)}
                className="px-6 py-2 bg-[#614500] text-white font-bold uppercase hover:bg-[#4a3500] transition-all duration-200"
                style={{ borderRight: '4px solid #3d2a00', borderBottom: '4px solid #3d2a00' }}
              >
                Get Started
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-20">
            <h2 className="text-6xl font-bold text-black mb-6 tracking-tight">
              GDPR Compliance on the{' '}
              <span className="text-[#614500]">Hypergraph</span>
            </h2>
            <p className="text-2xl text-gray-700 max-w-4xl mx-auto mb-12">
              Immutable consent records, automated data subject rights, and verifiable audit trails
              powered by Constellation Network's feeless architecture
            </p>
            <button
              onClick={() => setShowDashboard(true)}
              className="px-12 py-4 bg-[#614500] text-white text-lg font-bold uppercase hover:bg-[#4a3500] transition-all duration-200"
              style={{ borderRight: '4px solid #3d2a00', borderBottom: '4px solid #3d2a00' }}
            >
              Get Started
            </button>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="bg-white p-8 border-2 border-[#614500]" style={{ borderRight: '6px solid #4a3500', borderBottom: '6px solid #4a3500' }}>
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-2xl font-bold text-black mb-4 tracking-wide">Immutable Records</h3>
              <p className="text-gray-700 leading-relaxed">
                All consent data is recorded on Constellation Network's Hypergraph, creating tamper-proof audit trails
              </p>
            </div>
            <div className="bg-white p-8 border-2 border-[#614500]" style={{ borderRight: '6px solid #4a3500', borderBottom: '6px solid #4a3500' }}>
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-2xl font-bold text-black mb-4 tracking-wide">Feeless Transactions</h3>
              <p className="text-gray-700 leading-relaxed">
                No gas fees means GDPR compliance is accessible to businesses of all sizes, powered by Constellation
              </p>
            </div>
            <div className="bg-white p-8 border-2 border-[#614500]" style={{ borderRight: '6px solid #4a3500', borderBottom: '6px solid #4a3500' }}>
              <div className="text-5xl mb-4">🌍</div>
              <h3 className="text-2xl font-bold text-black mb-4 tracking-wide">Global Standards</h3>
              <p className="text-gray-700 leading-relaxed">
                Built for GDPR, extensible to CCPA, LGPD, and future privacy regulations worldwide
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            <div className="bg-gray-50 p-6 border-2 border-gray-400" style={{ borderRight: '4px solid #000', borderBottom: '4px solid #000' }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-4xl font-bold text-[#614500]">{consents.length}</span>
                <span className="text-2xl">📋</span>
              </div>
              <p className="text-gray-600 uppercase font-bold tracking-wide">Consent Records</p>
            </div>
            <div className="bg-gray-50 p-6 border-2 border-gray-400" style={{ borderRight: '4px solid #000', borderBottom: '4px solid #000' }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-4xl font-bold text-[#614500]">100%</span>
                <span className="text-2xl">✅</span>
              </div>
              <p className="text-gray-600 uppercase font-bold tracking-wide">Immutable Proof</p>
            </div>
            <div className="bg-gray-50 p-6 border-2 border-gray-400" style={{ borderRight: '4px solid #000', borderBottom: '4px solid #000' }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-4xl font-bold text-[#614500]">$0</span>
                <span className="text-2xl">💰</span>
              </div>
              <p className="text-gray-600 uppercase font-bold tracking-wide">Transaction Fees</p>
            </div>
          </div>

          {/* Features */}
          <div className="bg-[#614500] p-16 text-white">
            <h3 className="text-4xl font-bold mb-12 text-center uppercase tracking-wider">Why PrivacyLedger?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <div>
                <h4 className="text-2xl font-bold mb-4 uppercase tracking-wide">For Users</h4>
                <ul className="space-y-3 text-lg">
                  <li>✓ See exactly what you've consented to</li>
                  <li>✓ Exercise your GDPR rights easily</li>
                  <li>✓ Trust immutable blockchain records</li>
                  <li>✓ No data storage fees</li>
                </ul>
              </div>
              <div>
                <h4 className="text-2xl font-bold mb-4 uppercase tracking-wide">For Enterprises</h4>
                <ul className="space-y-3 text-lg">
                  <li>✓ Automated GDPR compliance</li>
                  <li>✓ Regulatory-proof audit trails</li>
                  <li>✓ Lower compliance costs</li>
                  <li>✓ Scale without limits</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t-4 border-[#614500] mt-20 py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-gray-700 text-lg">
                Built for <span className="font-bold text-[#614500] uppercase">LegalHack 2025</span> | Powered by{' '}
                <span className="font-bold text-[#614500] uppercase">Constellation Network</span>
              </p>
              <p className="text-gray-600 mt-4 uppercase font-bold tracking-wider">
                Immutable • Verifiable • Feeless • Scalable
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // Dashboard Page with Sidebar
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Courier New', monospace" }}>
      {/* Header */}
      <header className="border-b-4 border-[#614500] bg-white sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#614500] flex items-center justify-center" style={{ borderRight: '4px solid #4a3500', borderBottom: '4px solid #4a3500' }}>
                <span className="text-white font-bold text-xl">🌌</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-black tracking-wide">PrivacyLedger</h1>
                <p className="text-xs text-gray-600">Powered by Constellation Network</p>
              </div>
            </div>
            <button
              onClick={() => setShowDashboard(false)}
              className="px-6 py-2 border-2 border-[#614500] text-[#614500] font-bold uppercase hover:bg-[#614500] hover:text-white transition-colors"
              style={{ borderRight: '4px solid #4a3500', borderBottom: '4px solid #4a3500' }}
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r-4 border-[#614500] bg-gray-50 min-h-[calc(100vh-73px)] sticky top-[73px]">
          <nav className="p-6 space-y-2">
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
                    ? 'bg-[#614500] text-white'
                    : 'text-gray-700 hover:bg-[#614500] hover:text-white'
                }`}
                style={{ borderRight: activeTab === tab.id ? '4px solid #4a3500' : 'none', borderBottom: activeTab === tab.id ? '4px solid #4a3500' : 'none' }}
              >
                <span className="text-2xl">{tab.icon}</span>
                <span className="text-left tracking-wide">{tab.label}</span>
              </button>
            ))}
          </nav>

          <div className="px-6 pt-8">
            <div className="border-t-4 border-gray-400 pt-8">
              <p className="text-sm text-gray-600 mb-4 uppercase font-bold">Wallet Connection</p>
              {!connected ? (
                <button
                  onClick={handleConnect}
                  className="w-full px-4 py-2 bg-[#614500] text-white font-bold uppercase hover:bg-[#4a3500] transition-colors"
                  style={{ borderRight: '4px solid #3d2a00', borderBottom: '4px solid #3d2a00' }}
                >
                  Connect Wallet
                </button>
              ) : (
                <div className="space-y-2">
                  <div className="px-4 py-2 bg-[#614500] text-white font-bold uppercase" style={{ borderRight: '4px solid #4a3500', borderBottom: '4px solid #4a3500' }}>
                    Connected ✓
                  </div>
                  <button className="w-full px-4 py-2 border-2 border-gray-600 font-bold uppercase hover:bg-gray-300 transition-colors text-sm">
                    Disconnect
                  </button>
                </div>
              )}
            </div>
          </div>
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
                        className="p-6 border-2 border-dashed border-[#614500] hover:border-solid hover:border-[#614500] transition-colors"
                        style={{ borderRight: '4px solid #4a3500', borderBottom: '4px solid #4a3500' }}
                      >
                        <h4 className="font-bold text-black mb-4 uppercase tracking-wide">{type}</h4>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleConsentAction('grant', type)}
                            className="flex-1 px-4 py-2 bg-[#614500] text-white font-bold uppercase hover:bg-[#4a3500] transition-colors"
                            style={{ borderRight: '4px solid #3d2a00', borderBottom: '4px solid #3d2a00' }}
                          >
                            Grant
                          </button>
                          <button
                            onClick={() => handleConsentAction('revoke', type)}
                            className="flex-1 px-4 py-2 border-2 border-[#614500] text-[#614500] font-bold uppercase hover:bg-[#614500] hover:text-white transition-colors"
                            style={{ borderRight: '4px solid #4a3500', borderBottom: '4px solid #4a3500' }}
                          >
                            Revoke
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
                      className="p-4 bg-gray-50 border-2 border-gray-400 flex items-center justify-between hover:shadow-md transition-shadow"
                      style={{ borderRight: '4px solid #000', borderBottom: '4px solid #000' }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-3 h-3 bg-[#614500]" />
                        <div>
                          <p className="font-bold text-black uppercase tracking-wide">{consent.type}</p>
                          <p className="text-sm text-gray-600">
                            {consent.timestamp}
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
              <div className="space-y-6">
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
                    className="p-8 border-2 border-[#614500] hover:bg-[#f9f7f4] transition-shadow"
                    style={{ borderRight: '6px solid #4a3500', borderBottom: '6px solid #4a3500' }}
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
                        onClick={() => handleDataRequest(right.title)}
                        className="px-8 py-3 bg-[#614500] text-white font-bold uppercase hover:bg-[#4a3500] transition-colors whitespace-nowrap text-lg"
                        style={{ borderRight: '4px solid #3d2a00', borderBottom: '4px solid #3d2a00' }}
                      >
                        {right.action}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Audit Dashboard Tab */}
          {activeTab === 'audit' && (
            <div>
              <h3 className="text-3xl font-bold text-black mb-8 uppercase tracking-wide">
                Compliance Metrics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="p-8 bg-gray-50 border-2 border-[#614500]" style={{ borderRight: '6px solid #4a3500', borderBottom: '6px solid #4a3500' }}>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-2xl text-black uppercase tracking-wide">Compliance Score</h4>
                    <span className="text-4xl">✅</span>
                  </div>
                  <div className="text-5xl font-bold text-[#614500] mb-2">98%</div>
                  <p className="text-gray-700 uppercase font-bold tracking-wide">
                    All consent records verified on-chain
                  </p>
                </div>

                <div className="p-8 bg-gray-50 border-2 border-[#614500]" style={{ borderRight: '6px solid #4a3500', borderBottom: '6px solid #4a3500' }}>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-2xl text-black uppercase tracking-wide">Active Data Requests</h4>
                    <span className="text-4xl">📋</span>
                  </div>
                  <div className="text-5xl font-bold text-[#614500] mb-2">2</div>
                  <p className="text-gray-700 uppercase font-bold tracking-wide">
                    In progress (30-day SLA)
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-8 border-2 border-[#614500]" style={{ borderRight: '6px solid #4a3500', borderBottom: '6px solid #4a3500' }}>
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
                    <span className="font-mono text-[#614500] font-bold">
                      0x7f8a9b...2c3d4e
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}