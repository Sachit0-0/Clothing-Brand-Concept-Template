"use client";

import { useEffect, useState } from "react";

export function SiteLoader() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Disable scroll while loader is active
    document.body.style.overflow = "hidden";

    // Progress animation curve
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Organic progress curve
        const step = Math.max(2, Math.floor((100 - prev) * 0.15));
        return Math.min(100, prev + step);
      });
    }, 45);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
        document.body.style.overflow = "";
      }, 250);

      const removeTimer = setTimeout(() => {
        setShouldRender(false);
      }, 1000);

      return () => {
        clearTimeout(timer);
        clearTimeout(removeTimer);
      };
    }
  }, [progress]);

  if (!shouldRender) return null;

  return (
    <div
      aria-hidden={isLoaded}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-between p-8 bg-[#0a0a0a] text-white transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isLoaded
          ? "opacity-0 pointer-events-none -translate-y-2 scale-[1.02]"
          : "opacity-100 pointer-events-auto translate-y-0 scale-100"
      }`}
    >
      {/* Top Header details */}
      <div className="w-full flex items-center justify-between text-[11px] font-mono tracking-widest text-white/40 uppercase">
        <span>NEPALÉ STUDIO</span>
        <span>SS 2026</span>
      </div>

      {/* Center Wordmark & Progress */}
      <div className="flex flex-col items-center gap-6">
        <h1
          className="text-4xl md:text-5xl font-medium tracking-[-0.04em] text-white select-none"
          style={{ fontOpticalSizing: "auto" }}
        >
          ~NEPALÉ
        </h1>

        {/* Minimalist Hairline Progress Bar */}
        <div className="w-48 h-[1px] bg-white/10 overflow-hidden relative rounded-full">
          <div
            className="h-full bg-white transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Clean Numerical Percentage */}
        <span className="text-[12px] font-mono text-white/50 tracking-wider">
          {progress}%
        </span>
      </div>

      {/* Bottom Footer info */}
      <div className="w-full flex items-center justify-between text-[11px] font-mono tracking-widest text-white/40 uppercase">
        <span>KATHMANDU / MUSTANG</span>
        <span>COLLECTION EDITORIAL</span>
      </div>
    </div>
  );
}
