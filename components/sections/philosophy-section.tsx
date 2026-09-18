"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";

export function PhilosophySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [alpineTranslateX, setAlpineTranslateX] = useState(-100);
  const [forestTranslateX, setForestTranslateX] = useState(100);
  const [titleOpacity, setTitleOpacity] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const rafRef = useRef<number | null>(null);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const updateTransforms = useCallback(() => {
    if (!sectionRef.current || isMobile) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const sectionHeight = sectionRef.current.offsetHeight;

    const scrollableRange = sectionHeight - windowHeight;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / scrollableRange));

    setAlpineTranslateX((1 - progress) * -100);
    setForestTranslateX((1 - progress) * 100);
    setTitleOpacity(1 - progress);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;

    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateTransforms);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateTransforms();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateTransforms, isMobile]);

  /* ─── Mobile layout: simple stacked cards, no scroll animation ─── */
  if (isMobile) {
    return (
      <section id="products" className="bg-background">
        <div className="px-6 pt-16 pb-4">
          <h2 className="text-display-sm text-[12vw] font-medium text-foreground text-center">
            Kathmandu &amp; Mustang.
          </h2>
        </div>

        <div className="flex flex-col gap-4 px-6 pb-10">
          {/* Kathmandu card */}
          <div className="press-card cursor-pointer relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=1000"
              alt="Kathmandu Collection — NEPALÉ outerwear"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-6 left-6">
              <span
                className="px-4 py-2 text-sm font-medium rounded-full text-white"
                style={{
                  background: "rgba(255,255,255,0.18)",
                  backdropFilter: "blur(12px) saturate(150%)",
                  WebkitBackdropFilter: "blur(12px) saturate(150%)",
                  border: "1px solid rgba(255,255,255,0.35)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4)",
                }}
              >
                Kathmandu Jacket $89
              </span>
            </div>
          </div>

          {/* Mustang card */}
          <div className="press-card cursor-pointer relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000"
              alt="Mustang Collection — NEPALÉ hoodie"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-6 left-6">
              <span
                className="px-4 py-2 text-sm font-medium rounded-full text-white"
                style={{
                  background: "rgba(255,255,255,0.18)",
                  backdropFilter: "blur(12px) saturate(150%)",
                  WebkitBackdropFilter: "blur(12px) saturate(150%)",
                  border: "1px solid rgba(255,255,255,0.35)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4)",
                }}
              >
                Mustang Hoodie $62
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="px-6 py-12">
          <div className="text-center">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              SS 2026 Collection
            </p>
            <p className="mt-6 leading-relaxed text-muted-foreground text-xl text-center">
              Kathmandu &amp; Mustang are NEPALÉ&apos;s signature collections ~
              modern silhouettes built from premium fabrics, carrying the quiet
              confidence of Nepal&apos;s landscape and culture.
            </p>
          </div>
        </div>
      </section>
    );
  }

  /* ─── Desktop layout: scroll-animated fly-in ─── */
  return (
    <section id="products" className="bg-background">
      {/* Scroll-Animated Product Grid */}
      <div ref={sectionRef} className="relative" style={{ height: "200vh" }}>
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div className="relative w-full">
            {/* Title - positioned behind the blocks */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
              style={{ opacity: titleOpacity }}
            >
              <h2 className="text-display-sm text-[10vw] font-medium text-foreground lg:text-[8vw] text-center px-6">
                Kathmandu &amp; Mustang.
              </h2>
            </div>

            {/* Product Grid */}
            <div className="relative z-10 grid grid-cols-2 gap-4 px-12 lg:px-20">
              {/* Kathmandu product card */}
              <div
                className="press-card cursor-pointer relative aspect-[4/3] overflow-hidden rounded-2xl"
                style={{
                  transform: `translate3d(${alpineTranslateX}%, 0, 0)`,
                  WebkitTransform: `translate3d(${alpineTranslateX}%, 0, 0)`,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=1000"
                  alt="Kathmandu Collection — NEPALÉ outerwear"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-6 left-6">
                  <span
                    className="px-4 py-2 text-sm font-medium rounded-full text-white"
                    style={{
                      background: "rgba(255,255,255,0.18)",
                      backdropFilter: "blur(12px) saturate(150%)",
                      WebkitBackdropFilter: "blur(12px) saturate(150%)",
                      border: "1px solid rgba(255,255,255,0.35)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4)",
                    }}
                  >
                    Kathmandu Jacket $89
                  </span>
                </div>
              </div>

              {/* Mustang product card */}
              <div
                className="press-card cursor-pointer relative aspect-[4/3] overflow-hidden rounded-2xl"
                style={{
                  transform: `translate3d(${forestTranslateX}%, 0, 0)`,
                  WebkitTransform: `translate3d(${forestTranslateX}%, 0, 0)`,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000"
                  alt="Mustang Collection — NEPALÉ hoodie"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-6 left-6">
                  <span
                    className="px-4 py-2 text-sm font-medium rounded-full text-white"
                    style={{
                      background: "rgba(255,255,255,0.18)",
                      backdropFilter: "blur(12px) saturate(150%)",
                      WebkitBackdropFilter: "blur(12px) saturate(150%)",
                      border: "1px solid rgba(255,255,255,0.35)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4)",
                    }}
                  >
                    Mustang Hoodie $62
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36 lg:pb-14">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            SS 2026 Collection
          </p>
          <p className="mt-8 leading-relaxed text-muted-foreground text-2xl md:text-3xl text-center">
            Kathmandu &amp; Mustang are NEPALÉ&apos;s signature collections ~
            modern silhouettes built from premium fabrics, carrying the quiet
            confidence of Nepal&apos;s landscape and culture.
          </p>
        </div>
      </div>
    </section>
  );
}
