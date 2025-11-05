'use client';

import { useEffect, useState } from 'react';
import { getL0Snapshots, Snapshot } from '@/lib/services/api-dagscan-request';

export function LatestL0Snapshots() {
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSnapshots();
  }, []);

  const loadSnapshots = async () => {
    setLoading(true);
    try {
      const data = await getL0Snapshots(10);
      setSnapshots(data);
    } catch (error) {
      console.error('Error loading snapshots:', error);
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
      <h4 className="text-2xl font-bold text-black mb-4 uppercase">Latest L0 Snapshots</h4>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#8B7355] text-white">
            <tr>
              <th className="px-4 py-3 text-left font-bold uppercase">Ordinal</th>
              <th className="px-4 py-3 text-left font-bold uppercase">Timestamp</th>
              <th className="px-4 py-3 text-right font-bold uppercase">Blocks</th>
            </tr>
          </thead>
          <tbody>
            {snapshots.map((snapshot) => (
              <tr key={snapshot.hash} className="border-b-2 border-gray-300 hover:bg-gray-100">
                <td className="px-4 py-3 font-mono text-sm text-[#8B7355] font-bold">{snapshot.blockHeight}</td>
                <td className="px-4 py-3 text-gray-700">{new Date(snapshot.timestamp).toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-gray-700">0</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

