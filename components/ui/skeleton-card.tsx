'use client';

export function SkeletonCard() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="p-6 bg-gray-50 border-2 border-gray-300 animate-pulse"
          style={{ borderRight: '4px solid #8b675a', borderBottom: '4px solid #8b675a' }}
        >
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
}


