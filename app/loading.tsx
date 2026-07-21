export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F4F2F8] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Animated gradient spinner */}
        <div
          className="w-12 h-12 rounded-full border-2 border-transparent"
          style={{
            background: "linear-gradient(#F4F2F8, #F4F2F8) padding-box, linear-gradient(135deg, #8B5CF6, #3B82F6, #10B981, #F59E0B) border-box",
            animation: "spin 1s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p className="text-slate-500 text-sm">Loading...</p>
      </div>
    </div>
  );
}
