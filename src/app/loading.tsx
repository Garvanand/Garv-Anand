export default function Loading() {
  return (
    <div className="min-h-screen bg-[#050508] flex items-center justify-center p-6">
      <div className="w-full max-w-4xl space-y-8">
        {/* Title skeleton */}
        <div className="h-12 w-1/3 bg-white/5 rounded-lg animate-pulse" />
        
        {/* Paragraph skeleton */}
        <div className="space-y-4">
          <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-white/5 rounded animate-pulse" />
          <div className="h-4 w-4/6 bg-white/5 rounded animate-pulse" />
        </div>
        
        {/* Grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          <div className="h-48 bg-white/5 rounded-xl animate-pulse" />
          <div className="h-48 bg-white/5 rounded-xl animate-pulse" />
          <div className="h-48 bg-white/5 rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  )
}
