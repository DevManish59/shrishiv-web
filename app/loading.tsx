export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex space-x-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-3 h-3 bg-gray-800 rounded-full animate-bounce"
            style={{
              animationDelay: `${i * 0.2}s`,
              animationDuration: "1.5s",
            }}
          />
        ))}
      </div>
    </div>
  );
}
