import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";

const navLinks = [
  { name: "Prices", href: "#prices" },
  { name: "Products", href: "#products" },
  { name: "Journey", href: "#journey" },
  { name: "Visit Us", href: "#visit" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLSpanElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    if (logoRef.current) {
      tl.fromTo(logoRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
    }
    if (linksRef.current) {
      tl.fromTo(
        linksRef.current.children,
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power3.out" },
        "-=0.4"
      );
    }
  }, []);

  useEffect(() => {
    if (mobileMenuRef.current) {
      if (mobileOpen) {
        gsap.fromTo(mobileMenuRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" });
      }
    }
  }, [mobileOpen]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "py-3 bg-background/90 backdrop-blur-xl border-b border-border/40"
          : "py-6 bg-transparent border-b border-transparent"
      )}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between">
          <span
            ref={logoRef}
            className="text-2xl md:text-3xl font-display cursor-pointer select-none"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            data-testid="link-home"
          >
            Jay Kirana<span className="text-primary">.</span>
          </span>

          <div ref={linksRef} className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.href)}
                className="text-sm font-medium tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-300 uppercase"
                data-testid={`link-${link.name.toLowerCase()}`}
              >
                {link.name}
              </button>
            ))}
          </div>

          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="button-mobile-menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={cn("block h-[1.5px] bg-foreground transition-all duration-300", mobileOpen && "rotate-45 translate-y-[4.5px]")} />
              <span className={cn("block h-[1.5px] bg-foreground transition-all duration-300", mobileOpen && "-rotate-45 -translate-y-[4.5px]")} />
            </div>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div ref={mobileMenuRef} className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border/40 py-8 px-6">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.href)}
                className="text-lg font-medium text-foreground tracking-wide text-left"
                data-testid={`link-mobile-${link.name.toLowerCase()}`}
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
