export default function ReviewSkeleton() {
  return (
    <div className="rounded-lg p-6 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] animate-pulse">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-24 h-4 bg-gray-200 rounded"></div>
        <div className="w-16 h-4 bg-gray-200 rounded"></div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-4 h-4 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="relative aspect-square rounded-lg bg-gray-200"
          ></div>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-2 mb-3">
        <div className="w-full h-4 bg-gray-200 rounded"></div>
        <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
        <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="w-24 h-3 bg-gray-200 rounded"></div>
        <div className="w-32 h-3 bg-gray-200 rounded"></div>
      </div>

      {/* Store Response */}
      <div className="mt-4 pl-4 border-l-2 border-gray-200">
        <div className="space-y-2">
          <div className="w-full h-3 bg-gray-200 rounded"></div>
          <div className="w-3/4 h-3 bg-gray-200 rounded"></div>
          <div className="w-32 h-3 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}
