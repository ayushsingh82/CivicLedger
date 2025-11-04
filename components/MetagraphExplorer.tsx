'use client';

import { useState, useEffect } from 'react';
import { getMetagraphs, getDORStats, getPACAStats, type Metagraph, type SnapshotStats } from '@/lib/api/constellation';

export default function MetagraphExplorer() {
  const [metagraphs, setMetagraphs] = useState<Metagraph[]>([]);
  const [dorStats, setDorStats] = useState<SnapshotStats[]>([]);
  const [pacaStats, setPacaStats] = useState<SnapshotStats[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [metaList, dor, paca] = await Promise.all([
        getMetagraphs(),
        getDORStats(),
        getPACAStats(),
      ]);
      setMetagraphs(metaList);
      setDorStats(dor);
      setPacaStats(paca);
    } catch (error) {
      console.error('Error loading metagraph data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Simple chart component (using divs for simplicity)
  const Chart = ({ data, title, valueKey, color }: { data: SnapshotStats[]; title: string; valueKey: 'count' | 'fees'; color: string }) => {
    const maxValue = Math.max(...data.map(d => d[valueKey]));
    const dates = data.map(d => new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));

    return (
      <div className="space-y-4">
        <h4 className="text-2xl font-bold text-black uppercase">{title}</h4>
        <div className="h-64 flex items-end space-x-1">
          {data.map((item, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-[#BA867B] hover:opacity-80 transition-opacity cursor-pointer"
                style={{
                  height: `${(item[valueKey] / maxValue) * 100}%`,
                  minHeight: '4px',
                }}
                title={`${dates[idx]}: ${item[valueKey].toLocaleString()}`}
              />
              {idx % 2 === 0 && (
                <span className="text-xs text-gray-600 mt-1 transform -rotate-45 origin-left" style={{ writingMode: 'vertical-rl' }}>
                  {dates[idx]}
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-[#BA867B]">
            {valueKey === 'count' 
              ? `Total: ${data.reduce((sum, d) => sum + d.count, 0).toLocaleString()} snapshots`
              : `Total: ${data.reduce((sum, d) => sum + d.fees, 0).toFixed(2)} DAG`}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Metagraphs Table */}
      <div>
        <h3 className="text-3xl font-bold text-black mb-6 uppercase tracking-wide">Metagraphs</h3>
        <div className="border-2 border-[#BA867B]" style={{ borderRight: '6px solid #8b675a', borderBottom: '6px solid #8b675a' }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#BA867B] text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-bold uppercase">Metagraph</th>
                  <th className="px-6 py-4 text-left font-bold uppercase">Id</th>
                  <th className="px-6 py-4 text-left font-bold uppercase">Website</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-gray-600">
                      Loading metagraphs...
                    </td>
                  </tr>
                ) : (
                  metagraphs.map((meta) => (
                    <tr key={meta.id} className="border-b-2 border-gray-300 hover:bg-gray-50">
                      <td className="px-6 py-4 font-bold text-black">{meta.name}</td>
                      <td className="px-6 py-4 font-mono text-sm text-[#BA867B]">{meta.id}</td>
                      <td className="px-6 py-4">
                        {meta.website ? (
                          <a
                            href={meta.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline font-bold"
                          >
                            {meta.website}
                          </a>
                        ) : (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* DOR Statistics */}
      {dorStats.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-3xl font-bold text-black uppercase tracking-wide">DOR Statistics</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-6 bg-gray-50 border-2 border-[#BA867B]" style={{ borderRight: '6px solid #8b675a', borderBottom: '6px solid #8b675a' }}>
              <Chart
                data={dorStats}
                title="Global L0 Snapshot Count"
                valueKey="count"
                color="#BA867B"
              />
              <p className="text-sm text-gray-600 mt-4 italic">
                Total event-triggered global L0 snapshots
              </p>
            </div>

            <div className="p-6 bg-gray-50 border-2 border-[#BA867B]" style={{ borderRight: '6px solid #8b675a', borderBottom: '6px solid #8b675a' }}>
              <Chart
                data={dorStats}
                title="Snapshot Fees"
                valueKey="fees"
                color="#BA867B"
              />
              <p className="text-sm text-gray-600 mt-4 italic">
                Fees generated by event-triggered global L0 snapshots: {dorStats.reduce((sum, d) => sum + d.fees, 0).toFixed(2)} $DAG
              </p>
            </div>
          </div>
        </div>
      )}

      {/* PACA Statistics */}
      {pacaStats.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-3xl font-bold text-black uppercase tracking-wide">PACA Statistics</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-6 bg-gray-50 border-2 border-[#BA867B]" style={{ borderRight: '6px solid #8b675a', borderBottom: '6px solid #8b675a' }}>
              <Chart
                data={pacaStats}
                title="Global L0 Snapshot Count"
                valueKey="count"
                color="#BA867B"
              />
              <p className="text-sm text-gray-600 mt-4 italic">
                Total event-triggered global L0 snapshots
              </p>
            </div>

            <div className="p-6 bg-gray-50 border-2 border-[#BA867B]" style={{ borderRight: '6px solid #8b675a', borderBottom: '6px solid #8b675a' }}>
              <Chart
                data={pacaStats}
                title="Snapshot Fees"
                valueKey="fees"
                color="#BA867B"
              />
              <p className="text-sm text-gray-600 mt-4 italic">
                Fees generated by event-triggered global L0 snapshots: {pacaStats.reduce((sum, d) => sum + d.fees, 0).toFixed(2)} $DAG
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

