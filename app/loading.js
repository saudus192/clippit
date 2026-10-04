export default function Loading() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-6">
        {/* Spinner with teal-emerald gradient */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-gray-100"></div>
          <div
            className="absolute inset-0 rounded-full border-4 border-transparent animate-spin"
            style={{
              borderTopColor: "#14b8a6",
              borderRightColor: "#10b981",
            }}
          ></div>
        </div>

        {/* Brand text */}
        <div className="flex flex-col items-center gap-1">
          <p
            className="text-lg font-semibold bg-linear-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Clippit
          </p>
          <p className="text-sm text-gray-400 ml-1" style={{ fontFamily: "'DM Mono', monospace" }}>
            Loading...
          </p>
        </div>
      </div>
    </div>
  );
}