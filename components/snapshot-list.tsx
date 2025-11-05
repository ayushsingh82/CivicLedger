'use client';

import { useEffect, useState } from 'react';
import { getSnapshots, Snapshot } from '@/lib/services/api-dagscan-request';

interface SnapshotListProps {
  metagraphId: string;
  metagraphSymbol: string;
}

export function SnapshotList({ metagraphId, metagraphSymbol }: SnapshotListProps) {
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSnapshots();
  }, [metagraphId]);

  const loadSnapshots = async () => {
    setLoading(true);
    try {
      const data = await getSnapshots(metagraphId, 50);
      setSnapshots(data);
    } catch (error) {
      console.error('Error loading snapshots:', error);
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
      {snapshots.map((snapshot) => (
        <div
          key={snapshot.hash}
          className="p-4 bg-gray-50 border-2 border-gray-400 flex items-center justify-between hover:shadow-md transition-shadow"
          style={{ borderRight: '4px solid #000', borderBottom: '4px solid #000' }}
        >
          <div className="flex items-center space-x-4">
            <div className="w-3 h-3 bg-[#BA867B]" />
            <div>
              <p className="font-mono text-sm text-[#BA867B] font-bold">{snapshot.hash.substring(0, 30)}...</p>
              <p className="text-sm text-gray-600">{new Date(snapshot.timestamp).toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <span className="text-gray-700 font-bold">Height: {snapshot.blockHeight.toLocaleString()}</span>
            <span className="text-gray-700 font-bold">Fee: {snapshot.fee.toFixed(4)} DAG</span>
            {snapshot.metagraphId && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold uppercase">{metagraphSymbol}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}


