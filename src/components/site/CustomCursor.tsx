import { useEffect, useState, useRef } from "react";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Skip entirely on touch devices — a custom cursor with no pointer is dead weight
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest("[data-cursor]"));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", onOver);

    let raf: number;
    const animateRing = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      }
      raf = requestAnimationFrame(animateRing);
    };
    raf = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, [isVisible]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[10000] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Core dot */}
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold"
      />

      {/* Trailing ring */}
      <div
        ref={ringRef}
        className={`absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-[width,height,border-color,background-color] duration-300 ease-out ${
          isHovering
            ? "h-12 w-12 border-gold bg-gold/10"
            : "h-8 w-8 border-gold/40 bg-transparent"
        }`}
      >
        {isHovering && (
          <svg
            viewBox="0 0 24 24"
            className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-gold"
            fill="currentColor"
          >
            <path d="M12 2c-1.1 0-2 .9-2 2 0 .55.22 1.05.59 1.41C9.65 6.15 9 7.5 9 9v1H7c-1.1 0-2 .9-2 2v2h14v-2c0-1.1-.9-2-2-2h-2V9c0-1.5-.65-2.85-1.59-3.59.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2zm-7 9v8c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-8H5z" />
          </svg>
        )}
      </div>
    </div>
  );
}