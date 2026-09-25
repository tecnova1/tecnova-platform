export const TecnovaLogo = ({ className = "h-9 w-auto" }: { className?: string }) => (
  <div className={`flex items-center space-x-2.5 ${className}`}>
    <span
      aria-hidden="true"
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white"
    >
      <svg
        viewBox="0 0 32 32"
        className="h-[31px] w-[31px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="tecnova-logo-gradient" x1="5" y1="25" x2="27" y2="5" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0B6B93" />
            <stop offset="1" stopColor="#42D392" />
          </linearGradient>
        </defs>

        <!-- Trazo exterior del logo: abierto de forma intencional -->
        <path
          d="M7.2 25.1C3.7 20.8 3.5 14.5 6.2 9.3C9.2 3.6 15.7 1.5 21.4 3.4C27.6 5.4 30.5 10.8 29.4 16.9"
          stroke="url(#tecnova-logo-gradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />

        <!-- Camino interior -->
        <path
          d="M9.6 24.2C13.8 23 18.8 20.8 20.6 17.8C21.9 15.5 20.8 13.6 18.3 13.4"
          stroke="#0B6B93"
          strokeWidth="3"
          strokeLinecap="round"
        />

        <circle cx="18.1" cy="13.1" r="3.2" fill="#0B6B93" />
        <circle cx="24.9" cy="7.1" r="2.8" fill="#42D392" />
      </svg>
    </span>

    <span className="font-semibold text-slate-100 tracking-wide text-sm">
      TECNOVA <span className="text-[10px] text-slate-400 font-normal">SpA</span>
    </span>
  </div>
);