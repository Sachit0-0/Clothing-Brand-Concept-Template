"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ShoppingBag, Search, User, Menu, X } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "Collections", href: "#products" },
  { name: "Craftsmanship", href: "#technology" },
  { name: "Lookbook", href: "#gallery" },
  { name: "Accessories", href: "#accessories" },
];

/**
 * Small hand-drawn mountain mark — a quiet nod to the brand's
 * Himalayan reference without leaning on a literal logo.
 */
function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 20"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 17.5L9.5 4.5L14.5 12L17 8.5L27 17.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="21.5" cy="4" r="1.15" fill="currentColor" />
    </svg>
  );
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [underline, setUnderline] = useState({ left: 0, width: 0, opacity: 0 });

  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleMouseEnter = (index: number) => {
    setHoveredIdx(index);
    const targetEl = itemRefs.current[index];
    const containerEl = navRef.current;
    if (targetEl && containerEl) {
      const targetRect = targetEl.getBoundingClientRect();
      const containerRect = containerEl.getBoundingClientRect();
      setUnderline({
        left: targetRect.left - containerRect.left + 4,
        width: targetRect.width - 8,
        opacity: 1,
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredIdx(null);
    setUnderline((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <>
      {/*
        Font setup (add once, e.g. in app/layout.tsx):

        import { Fraunces, Inter } from "next/font/google";
        const fraunces = Fraunces({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-display" });
        const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
        // then on <html> or <body>: className={`${fraunces.variable} ${inter.variable}`}

        Everything below falls back gracefully to system serif/sans if these
        aren't wired up yet, so the component still renders correctly.
      */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl">
        <div
          className={`relative flex items-center justify-between h-14 px-5 sm:px-7 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled
            ? "bg-white/90 dark:bg-[#14120E]/85 text-[#14120E] dark:text-[#F1ECE1] border border-[#14120E]/[0.08] dark:border-[#F1ECE1]/[0.1] shadow-[0_10px_34px_rgba(20,18,14,0.10),0_1px_2px_rgba(20,18,14,0.05)]"
            : "bg-black/20 text-white border border-white/[0.18] shadow-[0_10px_32px_rgba(0,0,0,0.16)]"
            }`}
          style={{
            backdropFilter: "blur(20px) saturate(160%)",
            WebkitBackdropFilter: "blur(20px) saturate(160%)",
          }}
        >
          {/* Hairline specular edge — bronze-tinted rather than plain white */}
          <div
            className={`pointer-events-none absolute top-0 inset-x-10 h-px rounded-full transition-opacity duration-500 ${isScrolled
              ? "bg-gradient-to-r from-transparent via-[#C9A87C]/70 to-transparent opacity-90"
              : "bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-80"
              }`}
          />

          {/* Brand mark + wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group transition-opacity duration-200 hover:opacity-80"
          >
            <BrandMark
              className={`h-[15px] w-auto transition-colors duration-500 ${isScrolled ? "text-[#96714B]" : "text-[#D9C6A5]"
                }`}
            />
            <span
              className="text-[20px] leading-none tracking-[-0.01em]"
              style={{
                fontFamily: "var(--font-display, Georgia, 'Times New Roman', serif)",
                fontStyle: "italic",
                fontWeight: 500,
              }}
            >
              Nepalé
            </span>
          </Link>

          {/* Desktop nav — animated underline instead of a moving pill */}
          <nav
            ref={navRef}
            onMouseLeave={handleMouseLeave}
            className="relative hidden md:flex items-center gap-1"
          >
            <div
              className={`pointer-events-none absolute bottom-1.5 h-px transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled ? "bg-[#96714B]" : "bg-white"
                }`}
              style={{
                transform: `translateX(${underline.left}px)`,
                width: `${underline.width}px`,
                opacity: underline.opacity,
              }}
            />

            {navItems.map((item, idx) => (
              <Link
                key={item.name}
                href={item.href}
                ref={(el) => {
                  itemRefs.current[idx] = el;
                }}
                onMouseEnter={() => handleMouseEnter(idx)}
                className={`relative z-10 px-4 py-1.5 text-[15px] font-medium transition-colors duration-200 select-none ${isScrolled
                  ? hoveredIdx === idx
                    ? "text-[#14120E] dark:text-white"
                    : "text-[#5c5648] dark:text-[#B8B0A0] hover:text-[#14120E] dark:hover:text-white"
                  : hoveredIdx === idx
                    ? "text-white"
                    : "text-white/75 hover:text-white"
                  }`}
                style={{
                  fontFamily: "var(--font-sans, ui-sans-serif, system-ui)",
                  letterSpacing: "0.005em",
                }}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Icon cluster + CTA */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            <button
              type="button"
              className={`hidden sm:flex items-center justify-center h-8 w-8 rounded-full transition-all duration-200 ${isScrolled
                ? "text-[#14120E] dark:text-[#F1ECE1] hover:bg-[#14120E]/[0.05] dark:hover:bg-white/[0.08]"
                : "text-white hover:bg-white/[0.12]"
                }`}
              aria-label="Search"
            >
              <Search className="h-[18px] w-[18px] stroke-[1.4]" />
            </button>

            <button
              type="button"
              className={`hidden sm:flex items-center justify-center h-8 w-8 rounded-full transition-all duration-200 ${isScrolled
                ? "text-[#14120E] dark:text-[#F1ECE1] hover:bg-[#14120E]/[0.05] dark:hover:bg-white/[0.08]"
                : "text-white hover:bg-white/[0.12]"
                }`}
              aria-label="Account"
            >
              <User className="h-[18px] w-[18px] stroke-[1.4]" />
            </button>

            <button
              type="button"
              className={`relative flex items-center justify-center h-8 w-8 rounded-full transition-all duration-200 ${isScrolled
                ? "text-[#14120E] dark:text-[#F1ECE1] hover:bg-[#14120E]/[0.05] dark:hover:bg-white/[0.08]"
                : "text-white hover:bg-white/[0.12]"
                }`}
              aria-label="Bag, 0 items"
            >
              <ShoppingBag className="h-[18px] w-[18px] stroke-[1.4]" />
            </button>

            {/* Bronze-bordered CTA in place of the solid black pill */}
            <Link
              href="#products"
              className={`press-scale hidden sm:inline-flex items-center ml-1 px-4 py-[7px] text-[13.5px] font-medium rounded-full border transition-all duration-200 ${isScrolled
                ? "border-[#96714B]/50 text-[#14120E] dark:text-[#F1ECE1] hover:border-[#96714B] hover:bg-[#96714B]/[0.06]"
                : "border-white/50 text-white hover:border-white hover:bg-white/[0.08]"
                }`}
              style={{
                fontFamily: "var(--font-sans, ui-sans-serif, system-ui)",
                letterSpacing: "0.01em",
              }}
            >
              Shop
            </Link>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`flex md:hidden items-center justify-center h-8 w-8 rounded-full transition-colors ${isScrolled
                ? "text-[#14120E] dark:text-white hover:bg-[#14120E]/[0.05]"
                : "text-white hover:bg-white/[0.12]"
                }`}
              aria-label="Toggle navigation"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="h-[18px] w-[18px] stroke-[1.4]" />
              ) : (
                <Menu className="h-[18px] w-[18px] stroke-[1.4]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMenuOpen
          ? "opacity-100 pointer-events-auto backdrop-blur-xl bg-[#14120E]/50"
          : "opacity-0 pointer-events-none backdrop-blur-none bg-transparent"
          }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          className={`absolute top-20 inset-x-4 max-w-sm mx-auto rounded-2xl bg-[#F8F5EE]/95 dark:bg-[#1c1a15]/95 border border-[#14120E]/[0.08] dark:border-[#F1ECE1]/[0.1] p-5 shadow-2xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMenuOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "-translate-y-4 scale-98 opacity-0"
            }`}
          style={{
            backdropFilter: "blur(25px) saturate(180%)",
            WebkitBackdropFilter: "blur(25px) saturate(180%)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <nav className="flex flex-col">
            {navItems.map((item, i) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center justify-between py-3 px-1 text-[19px] text-[#14120E] dark:text-[#F1ECE1] transition-colors ${i !== navItems.length - 1
                  ? "border-b border-[#14120E]/[0.06] dark:border-white/[0.08]"
                  : ""
                  }`}
                style={{
                  fontFamily: "var(--font-display, Georgia, 'Times New Roman', serif)",
                  fontStyle: "italic",
                }}
              >
                <span>{item.name}</span>
                <span className="text-[#96714B] text-sm not-italic">›</span>
              </Link>
            ))}
          </nav>

          <div className="mt-4 flex items-center gap-2">
            <button
              type="button"
              className="flex items-center justify-center h-10 w-10 rounded-full border border-[#14120E]/[0.1] dark:border-white/[0.15] text-[#14120E] dark:text-[#F1ECE1]"
              aria-label="Search"
            >
              <Search className="h-[18px] w-[18px] stroke-[1.4]" />
            </button>
            <button
              type="button"
              className="flex items-center justify-center h-10 w-10 rounded-full border border-[#14120E]/[0.1] dark:border-white/[0.15] text-[#14120E] dark:text-[#F1ECE1]"
              aria-label="Account"
            >
              <User className="h-[18px] w-[18px] stroke-[1.4]" />
            </button>
            <Link
              href="#products"
              onClick={() => setIsMenuOpen(false)}
              className="press-scale flex-1 flex items-center justify-center h-10 bg-[#14120E] dark:bg-[#F1ECE1] text-[#F8F5EE] dark:text-[#14120E] text-[13px] font-medium rounded-full transition-opacity hover:opacity-90"
              style={{ fontFamily: "var(--font-sans, ui-sans-serif, system-ui)" }}
            >
              Shop Collection
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}