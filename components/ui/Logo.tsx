export const TecnovaLogo = ({ className = "h-7 w-auto" }: { className?: string }) => (
  <div className={`flex items-center space-x-2.5 ${className}`}>
    <svg viewBox="0 0 32 32" aria-hidden="true" className="h-7 w-7 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="tecnova-logo-gradient" x1="4" y1="5" x2="28" y2="27" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0B6B93" />
          <stop offset="1" stopColor="#42D392" />
        </linearGradient>
      </defs>
      <path d="M7.2 24.4C3.9 20.1 3.5 14.1 6.4 9.4C9.8 3.9 16.8 1.7 22.8 4.2C27.8 6.3 30.6 11.1 30.1 16.4" stroke="url(#tecnova-logo-gradient)" strokeWidth="2.7" strokeLinecap="round" />
      <path d="M10.2 23.8C13.8 22.9 18.5 21 20.4 17.9C21.6 16 20.8 14.4 18.7 14.2" stroke="url(#tecnova-logo-gradient)" strokeWidth="2.8" strokeLinecap="round" />
      <circle cx="18.2" cy="13.1" r="3.1" fill="#0B6B93" />
      <circle cx="24.8" cy="7.2" r="2.7" fill="#42D392" />
    </svg>
    <span className="font-semibold text-slate-100 tracking-wide text-sm">
      TECNOVA <span className="text-[10px] text-slate-400 font-normal">SpA</span>
    </span>
  </div>
);