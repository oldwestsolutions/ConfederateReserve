"use client";

export function HeroBlob() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute -left-24 top-0 h-[520px] w-[520px] animate-blob rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(0,102,255,0.28), transparent 70%)",
        }}
      />
      <div
        className="absolute right-[-10%] top-24 h-[480px] w-[480px] animate-blob rounded-full opacity-60 blur-3xl"
        style={{
          animationDelay: "-6s",
          background:
            "radial-gradient(closest-side, rgba(0,217,255,0.32), transparent 70%)",
        }}
      />
      <div
        className="absolute left-1/3 top-1/2 h-[380px] w-[380px] animate-blob rounded-full opacity-50 blur-3xl"
        style={{
          animationDelay: "-12s",
          background:
            "radial-gradient(closest-side, rgba(124,58,237,0.26), transparent 70%)",
        }}
      />
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.06]"
        viewBox="0 0 400 400"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}
