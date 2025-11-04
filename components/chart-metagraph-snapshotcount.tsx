'use client';

import { SnapshotMetric } from '@/lib/services/api-dagscan-request';

interface ChartMetagraphSnapshotCountProps {
  snapshotMetrics: SnapshotMetric[];
  metagraphAddress: string;
}

export function ChartMetagraphSnapshotCount({ snapshotMetrics, metagraphAddress }: ChartMetagraphSnapshotCountProps) {
  const filteredMetrics = snapshotMetrics
    .filter(m => m.metagraphAddress === metagraphAddress)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const maxCount = Math.max(...filteredMetrics.map(m => m.snapshotCount), 1);
  const dates = filteredMetrics.map(m => 
    new Date(m.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  );

  return (
    <div className="p-6 bg-gray-50 border-2 border-[#BA867B]" style={{ borderRight: '6px solid #8b675a', borderBottom: '6px solid #8b675a' }}>
      <h4 className="text-2xl font-bold text-black mb-4 uppercase">Global L0 Snapshot Count</h4>
      <div className="h-64 flex items-end space-x-1 mb-4">
        {filteredMetrics.map((metric, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center group">
            <div
              className="w-full bg-[#BA867B] hover:opacity-80 transition-opacity cursor-pointer relative"
              style={{
                height: `${(metric.snapshotCount / maxCount) * 100}%`,
                minHeight: '4px',
              }}
              title={`${dates[idx]}: ${metric.snapshotCount.toLocaleString()} snapshots`}
            >
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {metric.snapshotCount.toLocaleString()}
              </div>
            </div>
            {idx % 2 === 0 && (
              <span className="text-xs text-gray-600 mt-2 transform -rotate-45 origin-left" style={{ writingMode: 'vertical-rl' }}>
                {dates[idx]}
              </span>
            )}
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-600 italic">
        Total event-triggered global L0 snapshots
      </p>
      <p className="text-lg font-bold text-[#BA867B] mt-2">
        Total: {filteredMetrics.reduce((sum, m) => sum + m.snapshotCount, 0).toLocaleString()} snapshots
      </p>
    </div>
  );
}

