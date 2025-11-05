'use client';

import { TransactionMetric } from '@/lib/services/api-dagscan-request';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface ChartTransactionVolumeProps {
  metrics: TransactionMetric[];
}

export function ChartTransactionVolume({ metrics }: ChartTransactionVolumeProps) {
  const chartData = metrics
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(m => ({
      date: new Date(m.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      'Volume (DAG)': parseFloat(m.transactionVolume.toFixed(2)),
      fullDate: m.date,
    }));

  const total = chartData.reduce((sum, m) => sum + m['Volume (DAG)'], 0);

  return (
    <div className="p-6 bg-gray-50 border-2 border-[#BA867B]" style={{ borderRight: '6px solid #8b675a', borderBottom: '6px solid #8b675a' }}>
      <h4 className="text-2xl font-bold text-black mb-4 uppercase">DAG Transaction Volume</h4>
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
                border: '2px solid #BA867B',
                borderRadius: '4px',
                color: '#111827',
              }}
              formatter={(value: number) => [`${value.toLocaleString()} DAG`, 'Volume']}
            />
            <Bar dataKey="Volume (DAG)" fill="#BA867B" radius={[4, 4, 0, 0]} stroke="#8b675a" strokeWidth={1} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-sm text-black italic font-bold">Total DAG Volume Transacted: {total.toLocaleString()} DAG</p>
    </div>
  );
}

