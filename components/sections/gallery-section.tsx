"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";

export function GallerySection() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [sectionHeight, setSectionHeight] = useState("100vh");
  const [translateX, setTranslateX] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(1);
  const rafRef = useRef<number | null>(null);
  const lastScrollRef = useRef(0);
  const images = [
    {
      src: "https://images.unsplash.com/photo-1618258896250-6a8513fa11c5?q=80&w=1200",
      alt: "NEPALÉ editorial — contemporary Asian fashion",
    },

    {
      src: "https://images.unsplash.com/photo-1683760566647-c7a51d021aa4?q=80&w=1200",
      alt: "NEPALÉ menswear — contemporary street style",
    },
    {
      src: "https://images.unsplash.com/photo-1623682536859-1f87582d8cb2?q=80&w=1200",
      alt: "NEPALÉ editorial — urban fashion",
    },
    {
      src: "https://images.unsplash.com/photo-1776320146488-988db83cb773?q=80&w=1200",
      alt: "NEPALÉ lookbook — elegant contemporary styling",
    },
    {
      src: "https://images.unsplash.com/photo-1597294583248-1f66323dc208?q=80&w=1200",
      alt: "NEPALÉ campaign — dark luxury fashion",
    },

    {
      src: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200",
      alt: "NEPALÉ editorial — contemporary Asian styling",
    },
    {
      src: "https://images.unsplash.com/photo-1618375531912-867984bdfd87?q=80&w=1200",
      alt: "NEPALÉ campaign — minimalist fashion",
    },
    {
      src: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=1200",
      alt: "NEPALÉ collection — modern clothing",
    },

    {
      src: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200",
      alt: "NEPALÉ editorial — elevated everyday fashion",
    },

  ];

  // Calculate section height based on content width
  useEffect(() => {
    const calculateHeight = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      // Height = viewport height + the extra scroll needed to reveal all content
      const totalHeight = viewportHeight + (containerWidth - viewportWidth);
      setSectionHeight(`${totalHeight}px`);
    };

    // Small delay to ensure container is rendered
    const timer = setTimeout(calculateHeight, 100);
    window.addEventListener("resize", calculateHeight);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateHeight);
    };
  }, []);

  const updateTransform = useCallback(() => {
    if (!galleryRef.current || !containerRef.current) return;

    const rect = galleryRef.current.getBoundingClientRect();
    const containerWidth = containerRef.current.scrollWidth;
    const viewportWidth = window.innerWidth;

    // Total scroll distance needed to reveal all images
    const totalScrollDistance = containerWidth - viewportWidth;

    // Current scroll position within this section
    const scrolled = Math.max(0, -rect.top);

    // Progress from 0 to 1
    const progress = Math.min(1, scrolled / totalScrollDistance);

    // Calculate new translateX
    const newTranslateX = progress * -totalScrollDistance;

    // §16 wayfinding: update visible slide index
    setCurrentIndex(Math.min(images.length, Math.round(progress * (images.length - 1)) + 1));

    setTranslateX(newTranslateX);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Cancel any pending animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      // Use requestAnimationFrame for smooth updates
      rafRef.current = requestAnimationFrame(updateTransform);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateTransform();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateTransform]);

  return (
    <section
      id="gallery"
      ref={galleryRef}
      className="relative bg-background"
      style={{ height: sectionHeight }}
    >
      {/* Sticky container — §12 scroll edge fade so gallery feels bounded */}
      <div className="sticky top-0 h-screen overflow-hidden scroll-edge-fade">
        <div className="flex h-full items-center">
          {/* Horizontal scrolling container */}
          <div
            ref={containerRef}
            className="flex gap-6 px-6"
            style={{
              transform: `translate3d(${translateX}px, 0, 0)`,
              WebkitTransform: `translate3d(${translateX}px, 0, 0)`,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              perspective: 1000,
              WebkitPerspective: 1000,
              touchAction: 'pan-y',
            }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="relative h-[70vh] w-[85vw] flex-shrink-0 overflow-hidden rounded-2xl md:w-[60vw] lg:w-[45vw]"
                style={{
                  transform: 'translateZ(0)',
                  WebkitTransform: 'translateZ(0)',
                }}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  priority={index < 3}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
