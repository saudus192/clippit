export default function Loader({ size = "md", label }) {
  const sizeClasses = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-4",
    lg: "w-16 h-16 border-4",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="relative">
        {/* Background ring */}
        <div
          className={`rounded-full border-gray-100 ${sizeClasses[size]}`}
        ></div>
        {/* Spinning gradient ring */}
        <div
          className={`absolute inset-0 rounded-full border-transparent animate-spin ${sizeClasses[size]}`}
          style={{
            borderTopColor: "#14b8a6",
            borderRightColor: "#10b981",
          }}
        ></div>
      </div>
      {label && (
        <p
          className="text-sm text-gray-400"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          {label}
        </p>
      )}
    </div>
  );
}