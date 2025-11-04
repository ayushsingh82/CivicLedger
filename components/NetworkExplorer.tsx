'use client';

import { useState, useEffect } from 'react';
import {
  getNetworkStats,
  getWalletRichlist,
  getRecentSnapshots,
  getRecentTransactions,
  getNodes,
  type NetworkStats,
  type Wallet,
  type Snapshot,
  type Transaction,
  type Node,
} from '@/lib/api/constellation';

interface NetworkExplorerProps {
  initialTab?: 'overview' | 'wallets' | 'snapshots' | 'transactions' | 'nodes';
}

export default function NetworkExplorer({ initialTab = 'overview' }: NetworkExplorerProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'wallets' | 'snapshots' | 'transactions' | 'nodes'>(initialTab);
  const [networkStats, setNetworkStats] = useState<NetworkStats | null>(null);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      switch (activeTab) {
        case 'overview':
          const stats = await getNetworkStats();
          setNetworkStats(stats);
          break;
        case 'wallets':
          const walletList = await getWalletRichlist(100);
          setWallets(walletList);
          break;
        case 'snapshots':
          const snapshotList = await getRecentSnapshots(50);
          setSnapshots(snapshotList);
          break;
        case 'transactions':
          const txList = await getRecentTransactions(50);
          setTransactions(txList);
          break;
        case 'nodes':
          const nodeList = await getNodes();
          setNodes(nodeList);
          break;
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'wallets', label: 'Wallets', icon: '👛' },
    { id: 'snapshots', label: 'Snapshots', icon: '📸' },
    { id: 'transactions', label: 'Transactions', icon: '💸' },
    { id: 'nodes', label: 'Node Explorer', icon: '🖥️' },
  ];

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex space-x-2 border-b-4 border-[#BA867B]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 font-bold uppercase transition-colors ${
              activeTab === tab.id
                ? 'bg-[#BA867B] text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            style={{
              borderRight: activeTab === tab.id ? '4px solid #8b675a' : 'none',
              borderBottom: activeTab === tab.id ? '4px solid #8b675a' : 'none',
            }}
          >
            <span className="text-xl mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-xl font-bold text-gray-600">Loading...</p>
        </div>
      ) : (
        <>
          {/* Overview Tab */}
          {activeTab === 'overview' && networkStats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 bg-gray-50 border-2 border-[#BA867B]" style={{ borderRight: '6px solid #8b675a', borderBottom: '6px solid #8b675a' }}>
                <h4 className="font-bold text-xl text-black mb-2 uppercase">Total Transactions</h4>
                <p className="text-4xl font-bold text-[#BA867B]">{networkStats.totalTransactions.toLocaleString()}</p>
              </div>
              <div className="p-6 bg-gray-50 border-2 border-[#BA867B]" style={{ borderRight: '6px solid #8b675a', borderBottom: '6px solid #8b675a' }}>
                <h4 className="font-bold text-xl text-black mb-2 uppercase">Total Wallets</h4>
                <p className="text-4xl font-bold text-[#BA867B]">{networkStats.totalWallets.toLocaleString()}</p>
              </div>
              <div className="p-6 bg-gray-50 border-2 border-[#BA867B]" style={{ borderRight: '6px solid #8b675a', borderBottom: '6px solid #8b675a' }}>
                <h4 className="font-bold text-xl text-black mb-2 uppercase">Total Snapshots</h4>
                <p className="text-4xl font-bold text-[#BA867B]">{networkStats.totalSnapshots.toLocaleString()}</p>
              </div>
              <div className="p-6 bg-gray-50 border-2 border-[#BA867B]" style={{ borderRight: '6px solid #8b675a', borderBottom: '6px solid #8b675a' }}>
                <h4 className="font-bold text-xl text-black mb-2 uppercase">Active Nodes</h4>
                <p className="text-4xl font-bold text-[#BA867B]">{networkStats.activeNodes}</p>
              </div>
              <div className="p-6 bg-gray-50 border-2 border-[#BA867B]" style={{ borderRight: '6px solid #8b675a', borderBottom: '6px solid #8b675a' }}>
                <h4 className="font-bold text-xl text-black mb-2 uppercase">DAG Supply</h4>
                <p className="text-4xl font-bold text-[#BA867B]">{(networkStats.dagSupply / 1000000).toFixed(2)}M</p>
              </div>
              {networkStats.networkHashRate && (
                <div className="p-6 bg-gray-50 border-2 border-[#BA867B]" style={{ borderRight: '6px solid #8b675a', borderBottom: '6px solid #8b675a' }}>
                  <h4 className="font-bold text-xl text-black mb-2 uppercase">Hash Rate</h4>
                  <p className="text-4xl font-bold text-[#BA867B]">{networkStats.networkHashRate}</p>
                </div>
              )}
            </div>
          )}

          {/* Wallets Tab */}
          {activeTab === 'wallets' && (
            <div className="border-2 border-[#BA867B]" style={{ borderRight: '6px solid #8b675a', borderBottom: '6px solid #8b675a' }}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#BA867B] text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-bold uppercase">Rank</th>
                      <th className="px-6 py-4 text-left font-bold uppercase">Address</th>
                      <th className="px-6 py-4 text-right font-bold uppercase">Balance</th>
                      <th className="px-6 py-4 text-right font-bold uppercase">Transactions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wallets.slice(0, 50).map((wallet, idx) => (
                      <tr key={wallet.address} className="border-b-2 border-gray-300 hover:bg-gray-50">
                        <td className="px-6 py-4 font-bold text-black">{wallet.rank}</td>
                        <td className="px-6 py-4 font-mono text-sm text-[#BA867B]">{wallet.address}</td>
                        <td className="px-6 py-4 text-right font-bold text-black">{wallet.balance.toFixed(2)} DAG</td>
                        <td className="px-6 py-4 text-right text-gray-700">{wallet.transactionCount.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Snapshots Tab */}
          {activeTab === 'snapshots' && (
            <div className="space-y-3">
              {snapshots.map((snapshot) => (
                <div
                  key={snapshot.hash}
                  className="p-4 bg-gray-50 border-2 border-gray-400 flex items-center justify-between hover:shadow-md transition-shadow"
                  style={{ borderRight: '4px solid #000', borderBottom: '4px solid #000' }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-[#BA867B]" />
                    <div>
                      <p className="font-mono text-sm text-[#BA867B] font-bold">{snapshot.hash.substring(0, 20)}...</p>
                      <p className="text-sm text-gray-600">{new Date(snapshot.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <span className="text-gray-700 font-bold">Height: {snapshot.blockHeight.toLocaleString()}</span>
                    <span className="text-gray-700 font-bold">Fee: {snapshot.fee.toFixed(4)} DAG</span>
                    {snapshot.metagraphId && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold uppercase">Metagraph</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Transactions Tab */}
          {activeTab === 'transactions' && (
            <div className="space-y-3">
              {transactions.map((tx) => (
                <div
                  key={tx.hash}
                  className="p-4 bg-gray-50 border-2 border-gray-400 hover:shadow-md transition-shadow"
                  style={{ borderRight: '4px solid #000', borderBottom: '4px solid #000' }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-mono text-sm text-[#BA867B] font-bold">{tx.hash.substring(0, 30)}...</p>
                    <span className={`px-3 py-1 text-xs font-bold uppercase ${
                      tx.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {tx.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 font-bold">From: </span>
                      <span className="font-mono text-black">{tx.from.substring(0, 20)}...</span>
                    </div>
                    <div>
                      <span className="text-gray-600 font-bold">To: </span>
                      <span className="font-mono text-black">{tx.to.substring(0, 20)}...</span>
                    </div>
                    <div>
                      <span className="text-gray-600 font-bold">Amount: </span>
                      <span className="text-black font-bold">{tx.amount.toFixed(4)} DAG</span>
                    </div>
                    <div>
                      <span className="text-gray-600 font-bold">Fee: </span>
                      <span className="text-black font-bold">{tx.fee.toFixed(4)} DAG</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{new Date(tx.timestamp).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}

          {/* Nodes Tab */}
          {activeTab === 'nodes' && (
            <div className="border-2 border-[#BA867B]" style={{ borderRight: '6px solid #8b675a', borderBottom: '6px solid #8b675a' }}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#BA867B] text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-bold uppercase">Address</th>
                      <th className="px-6 py-4 text-left font-bold uppercase">Alias</th>
                      <th className="px-6 py-4 text-right font-bold uppercase">Uptime %</th>
                      <th className="px-6 py-4 text-right font-bold uppercase">Stake</th>
                      <th className="px-6 py-4 text-right font-bold uppercase">Rewards</th>
                      <th className="px-6 py-4 text-center font-bold uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nodes.map((node) => (
                      <tr key={node.address} className="border-b-2 border-gray-300 hover:bg-gray-50">
                        <td className="px-6 py-4 font-mono text-sm text-[#BA867B]">{node.address.substring(0, 20)}...</td>
                        <td className="px-6 py-4 font-bold text-black">{node.alias || 'N/A'}</td>
                        <td className="px-6 py-4 text-right font-bold text-black">{node.uptime.toFixed(2)}%</td>
                        <td className="px-6 py-4 text-right text-gray-700">{node.stake.toFixed(2)} DAG</td>
                        <td className="px-6 py-4 text-right text-gray-700">{node.rewards.toFixed(2)} DAG</td>
                        <td className="px-6 py-4 text-center">
                          <span className={`px-3 py-1 text-xs font-bold uppercase ${
                            node.status === 'online' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {node.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

