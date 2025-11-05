'use client';

import { useEffect, useState } from 'react';
import { getTransactions, Transaction } from '@/lib/services/api-dagscan-request';

interface TransactionListProps {
  metagraphId: string;
  metagraphSymbol: string;
}

export function TransactionList({ metagraphId, metagraphSymbol }: TransactionListProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransactions();
  }, [metagraphId]);

  const loadTransactions = async () => {
    setLoading(true);
    try {
      const data = await getTransactions(metagraphId, 50);
      setTransactions(data);
    } catch (error) {
      console.error('Error loading transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 bg-gray-50 border-2 border-gray-300 animate-pulse" style={{ borderRight: '4px solid #000', borderBottom: '4px solid #000' }}>
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((tx) => (
        <div
          key={tx.hash}
          className="p-4 bg-[#FFF8E7] border-2 border-gray-400 hover:shadow-md transition-shadow"
          style={{ borderRight: '4px solid #000', borderBottom: '4px solid #000' }}
        >
          <div className="flex items-center justify-between mb-2">
                    <p className="font-mono text-sm text-[#8B7355] font-bold">{tx.hash.substring(0, 30)}...</p>
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
  );
}


