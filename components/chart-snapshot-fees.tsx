'use client';

import { L0SnapshotMetric } from '@/lib/services/api-dagscan-request';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface ChartSnapshotFeesProps {
  metrics: L0SnapshotMetric[];
}

export function ChartSnapshotFees({ metrics }: ChartSnapshotFeesProps) {
  const chartData = metrics
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(m => ({
      date: new Date(m.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      'Fees (DAG)': parseFloat(m.fees.toFixed(2)),
      fullDate: m.date,
    }));

  const total = chartData.reduce((sum, m) => sum + m['Fees (DAG)'], 0);

  return (
    <div className="p-6 bg-[#FFF8E7] border-2 border-[#8B7355]" style={{ borderRight: '6px solid black', borderBottom: '6px solid black' }}>
      <h4 className="text-2xl font-bold text-black mb-4 uppercase">Snapshot Fees</h4>
      <div className="h-64 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10, fill: '#000000', fontWeight: 'bold' }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis
              tick={{ fontSize: 10, fill: '#000000', fontWeight: 'bold' }}
              label={{ value: 'DAG', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#000000', fontWeight: 'bold' } }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#f9fafb',
                border: '2px solid #8B7355',
                borderRadius: '4px',
                color: '#111827',
              }}
              formatter={(value: number) => [`${value.toFixed(2)} DAG`, 'Fees']}
            />
            <Bar dataKey="Fees (DAG)" fill="#8B7355" radius={[4, 4, 0, 0]} stroke="black" strokeWidth={1} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-sm text-black italic font-bold">Total snapshot fees consumed: {total.toFixed(2)} $DAG</p>
    </div>
  );
}

