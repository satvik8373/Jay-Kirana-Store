import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface IntroLoaderProps {
  onComplete: () => void;
}

export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLSpanElement>(null);
  const lineLeftRef = useRef<HTMLDivElement>(null);
  const lineRightRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        setShow(false);
        onComplete();
      },
    });

    const jayChars = nameRef.current?.querySelectorAll(".intro-jay-char");
    const kiranaChars = nameRef.current?.querySelectorAll(".intro-kirana-char");

    tl.set(containerRef.current, { visibility: "visible" });

    tl.fromTo(
      lineLeftRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: "power4.inOut" },
      0.3
    );
    tl.fromTo(
      lineRightRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: "power4.inOut" },
      0.3
    );

    tl.fromTo(
      yearRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      0.5
    );

    if (jayChars && jayChars.length > 0) {
      tl.fromTo(
        jayChars,
        { opacity: 0, y: 60, rotateX: 60 },
        {
          opacity: 1, y: 0, rotateX: 0,
          duration: 0.9, stagger: 0.05, ease: "power4.out",
        },
        0.7
      );
    }

    if (kiranaChars && kiranaChars.length > 0) {
      tl.fromTo(
        kiranaChars,
        { opacity: 0, y: 60, rotateX: 60 },
        {
          opacity: 1, y: 0, rotateX: 0,
          duration: 0.9, stagger: 0.05, ease: "power4.out",
        },
        0.9
      );
    }

    tl.fromTo(
      taglineRef.current,
      { opacity: 0, y: 10, letterSpacing: "0.2em" },
      { opacity: 1, y: 0, letterSpacing: "0.5em", duration: 0.7, ease: "power3.out" },
      1.5
    );

    tl.to({}, { duration: 0.5 });

    tl.to(
      nameRef.current,
      { scale: 1.1, duration: 0.4, ease: "power2.in" },
      "+=0"
    );
    tl.to(
      yearRef.current,
      { opacity: 0, y: -15, duration: 0.3, ease: "power2.in" },
      "<"
    );
    tl.to(
      taglineRef.current,
      { opacity: 0, y: 15, duration: 0.3, ease: "power2.in" },
      "<"
    );
    tl.to(
      [lineLeftRef.current, lineRightRef.current],
      { opacity: 0, duration: 0.3, ease: "power2.in" },
      "<"
    );

    tl.to(
      nameRef.current,
      { scale: 20, opacity: 0, duration: 0.8, ease: "power3.in" },
      "+=0.05"
    );

    tl.to(
      overlayRef.current,
      { yPercent: -100, duration: 0.7, ease: "power4.inOut" },
      "-=0.3"
    );

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  if (!show) return null;

  const splitText = (text: string, className: string) =>
    text.split("").map((char, i) => (
      <span
        key={i}
        className={`${className} inline-block`}
        style={{ perspective: "600px" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999]"
      style={{ visibility: "hidden" }}
      data-testid="intro-loader"
    >
      <div
        ref={overlayRef}
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 40%, hsl(32 80% 48% / 0.08), hsl(40 15% 97%)), hsl(40 15% 97%)",
        }}
      >
        <div className="flex flex-col items-center">
          <span
            ref={yearRef}
            className="text-xs md:text-sm font-medium tracking-[0.4em] uppercase text-muted-foreground mb-8 opacity-0"
          >
            Since 1987
          </span>

          <div className="flex items-center gap-6 md:gap-10">
            <div
              ref={lineLeftRef}
              className="w-16 md:w-24 h-px bg-primary/40 origin-right"
            />
            <div
              ref={nameRef}
              className="text-center"
              style={{ perspective: "1000px" }}
            >
              <div className="text-[clamp(4rem,15vw,12rem)] font-display leading-[0.9] tracking-tight">
                {splitText("Jay", "intro-jay-char")}
              </div>
              <div className="text-[clamp(4rem,15vw,12rem)] font-display leading-[0.9] tracking-tight mt-1">
                {splitText("Kirana", "intro-kirana-char")}
              </div>
            </div>
            <div
              ref={lineRightRef}
              className="w-16 md:w-24 h-px bg-primary/40 origin-left"
            />
          </div>

          <span
            ref={taglineRef}
            className="text-xs md:text-sm font-medium tracking-[0.5em] uppercase text-muted-foreground/70 mt-8 opacity-0"
          >
            Store
          </span>
        </div>
      </div>
    </div>
  );
}
