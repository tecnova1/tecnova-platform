export const TecnovaLogo = ({ className = "h-7 w-auto" }: { className?: string }) => (
  <div className={`flex items-center space-x-2.5 ${className}`}>
    <div className="w-6 h-6 rounded-full border border-emerald-500/60 flex items-center justify-center bg-slate-900 shadow-sm">
      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
    </div>
    <span className="font-semibold text-slate-100 tracking-wide text-sm">
      TECNOVA <span className="text-[10px] text-slate-400 font-normal">SpA</span>
    </span>
  </div>
);