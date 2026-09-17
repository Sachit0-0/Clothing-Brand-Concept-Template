"use client";

import { useEffect, useRef, useState } from "react";

const specs = [
  { label: "Materials", value: "100% Organic" },
  { label: "Sizes", value: "XS — 3XL" },
  { label: "Origin", value: "Kathmandu" },
  { label: "Season", value: "SS 2026" },
];

export function EditorialSection() {
  const specsRef = useRef<HTMLDivElement>(null);
  const [specsVisible, setSpecsVisible] = useState(false);

  useEffect(() => {
    // §16 — crossfade reveal on the specs grid when it enters the viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSpecsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (specsRef.current) observer.observe(specsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-background">
      {/* Newsletter Banner */}


      {/* Decorative Icons */}
      <div className="flex items-center justify-center gap-6 pb-20">


      </div>

      {/* Specs Grid — §14 crossfade reveal (respects prefers-reduced-motion via CSS) */}
      <div
        ref={specsRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border-t border-border"
        style={{
          opacity: specsVisible ? 1 : 0,
          transform: specsVisible ? 'none' : 'translateY(16px)',
          transition: 'opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.25,0,0,1)',
        }}
      >
        {specs.map((spec, i) => (
          <div
            key={spec.label}
            className={[
              "border-border p-6 md:p-8 text-center border-b",
              // right border on sm 2-col: odd columns (0,2) get right border
              "sm:odd:border-r sm:even:border-r-0",
              // on md+ all get right border except last
              "md:border-r md:last:border-r-0 md:border-b-0",
            ].join(" ")}
          >
            <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
              {spec.label}
            </p>
            {/* §15 large display value: -0.02em tracking, tight leading */}
            <p className="text-heading font-medium text-foreground text-2xl sm:text-3xl md:text-4xl break-words">
              {spec.value}
            </p>
          </div>
        ))}
      </div>

      {/* Full-width Video */}
      <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/fold.mp4"
        />
      </div>
    </section>
  );
}

