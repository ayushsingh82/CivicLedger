'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
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

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-gray-400 bg-black sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 border border-gray-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">🌌</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">PrivacyLedger</h1>
                <p className="text-xs text-gray-400">Powered by Constellation Network</p>
              </div>
            </div>
            {!connected ? (
              <button
                onClick={handleConnect}
                className="px-6 py-2 border border-gray-400 text-white rounded-lg font-medium hover:bg-white hover:text-black transition-all duration-200"
              >
                Connect Wallet
              </button>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="px-4 py-2 border border-gray-400 text-white rounded-lg text-sm font-medium">
                  Connected ✓
                </div>
                <button className="px-6 py-2 border border-gray-400 rounded-lg font-medium hover:bg-white hover:text-black transition-colors">
                  Disconnect
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">
            GDPR Compliance on the{' '}
            <span className="underline">
              Hypergraph
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Immutable consent records, automated data subject rights, and verifiable audit trails
            powered by Constellation Network's feeless architecture
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-black p-6 rounded-xl border border-gray-400">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl font-bold text-white">{consents.length}</span>
              <span className="text-2xl">📋</span>
            </div>
            <p className="text-gray-400">Consent Records</p>
          </div>
          <div className="bg-black p-6 rounded-xl border border-gray-400">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl font-bold text-white">100%</span>
              <span className="text-2xl">✅</span>
            </div>
            <p className="text-gray-400">Immutable Proof</p>
          </div>
          <div className="bg-black p-6 rounded-xl border border-gray-400">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl font-bold text-white">$0</span>
              <span className="text-2xl">💰</span>
            </div>
            <p className="text-gray-400">Transaction Fees</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-black rounded-2xl border border-gray-400 overflow-hidden">
          <div className="border-b border-gray-400">
            <nav className="flex">
              {[
                { id: 'consent', label: 'Consent Management', icon: '📝' },
                { id: 'rights', label: 'Data Subject Rights', icon: '⚖️' },
                { id: 'audit', label: 'Audit Dashboard', icon: '📊' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-6 py-4 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-white text-black border-b-2 border-gray-400'
                      : 'text-gray-400 hover:bg-gray-900'
                  }`}
                >
                  <span className="text-xl mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {/* Consent Management Tab */}
            {activeTab === 'consent' && (
              <div>
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Record New Consent
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['Marketing Emails', 'Analytics Cookies', 'Third-party Sharing', 'Location Data'].map(
                      (type) => (
                        <div
                          key={type}
                          className="p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                        >
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">{type}</h4>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleConsentAction('grant', type)}
                              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                              Grant
                            </button>
                            <button
                              onClick={() => handleConsentAction('revoke', type)}
                              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
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
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Consent History
                  </h3>
                  <div className="space-y-3">
                    {consents.map((consent) => (
                      <div
                        key={consent.id}
                        className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              consent.status === 'Granted' ? 'bg-green-500' : 'bg-red-500'
                            }`}
                          />
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">{consent.type}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {consent.timestamp}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              consent.status === 'Granted'
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                            }`}
                          >
                            {consent.status}
                          </span>
                          <code className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">
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
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
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
                      className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <span className="text-3xl">{right.icon}</span>
                          <div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-2">{right.title}</h4>
                            <p className="text-gray-600 dark:text-gray-400">{right.description}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDataRequest(right.title)}
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
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
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Compliance Metrics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-700">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-gray-900 dark:text-white">Compliance Score</h4>
                      <span className="text-3xl">✅</span>
                    </div>
                    <div className="text-4xl font-bold text-green-600 mb-2">98%</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      All consent records verified on-chain
                    </p>
                  </div>

                  <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-700">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-gray-900 dark:text-white">Active Data Requests</h4>
                      <span className="text-3xl">📋</span>
                    </div>
                    <div className="text-4xl font-bold text-blue-600 mb-2">2</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      In progress (30-day SLA)
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-4">Blockchain Verification</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Network</span>
                      <span className="font-mono text-sm text-gray-900 dark:text-white">
                        Constellation Hypergraph
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Protocol</span>
                      <span className="font-mono text-sm text-gray-900 dark:text-white">
                        HGTP (Hypergraph Transfer)
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Last Verified</span>
                      <span className="font-mono text-sm text-gray-900 dark:text-white">
                        Just now
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-gray-600 dark:text-gray-400">Blockchain Hash</span>
                      <span className="font-mono text-sm text-blue-600 dark:text-blue-400">
                        0x7f8a9b...2c3d4e
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Built for <span className="font-semibold">LegalHack 2025</span> | Powered by{' '}
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                Constellation Network
              </span>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              Immutable • Verifiable • Feeless • Scalable
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}