'use client';

import { Metagraph } from '@/lib/services/api-dagscan-request';

interface MetagraphListProps {
  metagraphs: Metagraph[];
}

export function MetagraphList({ metagraphs }: MetagraphListProps) {
  return (
    <div className="border-2 border-[#8B7355]" style={{ borderRight: '6px solid black', borderBottom: '6px solid black' }}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#8B7355] text-white">
            <tr>
              <th className="px-6 py-4 text-left font-bold uppercase">Metagraph</th>
              <th className="px-6 py-4 text-left font-bold uppercase">Id</th>
              <th className="px-6 py-4 text-left font-bold uppercase">Website</th>
            </tr>
          </thead>
          <tbody>
            {metagraphs.map((meta) => (
              <tr key={meta.metagraphAddress} className="border-b-2 border-gray-300 hover:bg-[#FFF8E7]">
                <td className="px-6 py-4 font-bold text-black">{meta.name}</td>
                <td className="px-6 py-4 font-mono text-sm text-[#8B7355]">{meta.metagraphAddress}</td>
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


