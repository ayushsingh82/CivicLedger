'use client';

import { ChartMetagraphSnapshotCount } from '@/components/chart-metagraph-snapshotcount';
import { ChartMetagraphSnapshotFees } from '@/components/chart-metagraph-snapshotfees';
import { MetagraphList } from '@/components/metagraph-list';
import { SkeletonCard } from '@/components/ui/skeleton-card';
import { getMetagraphs, getSnapshotMetrics, type Metagraph } from '@/lib/services/api-dagscan-request';
import { useQuery } from '@tanstack/react-query';
import { AlertCircle } from 'lucide-react';

export default function MetagraphExplorer() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['metagraphList'],
    queryFn: async () => getMetagraphs(),
    staleTime: 24 * 60 * 60 * 1000, // Cache data for 24 hours
  });

  const { data: snapshotMetricData } = useQuery({
    queryKey: ['snapshotmetrics'],
    queryFn: async () => getSnapshotMetrics(),
    refetchOnWindowFocus: true,
  });

  const filterMetagraphs = (data?.filter((metagraph: Metagraph) => metagraph.metagraphAddress) || []).sort((a: Metagraph, b: Metagraph) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-black uppercase tracking-wide">Metagraphs</h1>
      
      {isLoading ? (
        <SkeletonCard />
      ) : isError ? (
        <div className="flex justify-center items-center text-red-500 p-8">
          <AlertCircle className="h-8 w-8 mr-2" />
          <span className="font-bold">Failed to fetch data</span>
        </div>
      ) : (
        <>
          <div className="mb-12">
            <MetagraphList metagraphs={filterMetagraphs} />
          </div>

          {filterMetagraphs
            .filter((metagraph: Metagraph) => metagraph.metagraphAddress !== 'DAG7fwxZJpqBpXeHqjomVkvUfC9NgZeQ11qjmB5e')
            .map((metagraph: Metagraph) => (
              <div key={metagraph.metagraphAddress} className="mb-8">
                <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide">{metagraph.symbol || metagraph.name} Statistics</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <ChartMetagraphSnapshotCount
                    snapshotMetrics={snapshotMetricData || []}
                    metagraphAddress={metagraph.metagraphAddress}
                  />
                  <ChartMetagraphSnapshotFees
                    snapshotMetrics={snapshotMetricData || []}
                    metagraphAddress={metagraph.metagraphAddress}
                  />
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
}

