'use client';

import { useEffect, useState } from 'react';
import { getDAGTransactions, Transaction } from '@/lib/services/api-dagscan-request';

export function DAGTransactionsTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    setLoading(true);
    try {
      const data = await getDAGTransactions(10);
      setTransactions(data);
    } catch (error) {
      console.error('Error loading transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-[#FFF8E7] border-2 border-[#8B7355]" style={{ borderRight: '6px solid black', borderBottom: '6px solid black' }}>
        <p className="text-center text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#FFF8E7] border-2 border-[#8B7355]" style={{ borderRight: '6px solid black', borderBottom: '6px solid black' }}>
      <h4 className="text-2xl font-bold text-black mb-4 uppercase">DAG Transactions</h4>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#8B7355] text-white">
            <tr>
              <th className="px-4 py-3 text-left font-bold uppercase">TXN Hash</th>
              <th className="px-4 py-3 text-left font-bold uppercase">Timestamp</th>
              <th className="px-4 py-3 text-right font-bold uppercase">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.hash} className="border-b-2 border-gray-300 hover:bg-[#FFF8E7]">
                <td className="px-4 py-3 font-mono text-sm text-[#8B7355] font-bold">{tx.hash}</td>
                <td className="px-4 py-3 text-gray-700">{new Date(tx.timestamp).toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-gray-700 font-bold">{tx.amount.toFixed(8)} DAG</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

