import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Reveal } from "./Reveal";
import { CategoryCard } from "./CategoryCard";
import { ITEMS } from "@/data/ITEMS";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export function Collection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const matchMedia = gsap.matchMedia();

    matchMedia.add("(min-width: 1024px)", () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const getScrollAmount = () => track.scrollWidth - window.innerWidth + 120;

      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${getScrollAmount()}`,
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.set(track, { x: -self.progress * getScrollAmount() });
          setCanScrollLeft(self.progress > 0.01);
          setCanScrollRight(self.progress < 0.99);
        },
      });

      scrollTriggerRef.current = st;
    });

    return () => matchMedia.revert();
  }, []);

  // 3. Active Arrow Handlers
  const handleNext = () => {
    const st = scrollTriggerRef.current;
    if (!st) return;

    const step = 1 / (ITEMS.length - 1);
    const targetProgress = Math.min(1, Math.round((st.progress + step) / step) * step);
    const targetY = st.start + targetProgress * (st.end - st.start);

    gsap.to(window, {
      scrollTo: targetY,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const handlePrev = () => {
    const st = scrollTriggerRef.current;
    if (!st) return;

    const step = 1 / (ITEMS.length - 1);
    const targetProgress = Math.max(0, Math.round((st.progress - step) / step) * step);
    const targetY = st.start + targetProgress * (st.end - st.start);

    gsap.to(window, {
      scrollTo: targetY,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  return (
    <section
      id="collection"
      ref={sectionRef}
      className="relative w-full max-w-full bg-background border-t border-border overflow-hidden"
    >
      {/* ================= MOBILE LAYOUT (Clean Static List) ================= */}
      <div className="block lg:hidden px-5 py-16 sm:px-6">
        <div className="mb-8">
          <p className="eyebrow mb-2">The Signature Collection</p>
          <h2 className="font-display text-3xl leading-tight text-foreground">
            Six houses of craft, <span className="text-gold-gradient">one address.</span>
          </h2>
          <p className="mt-3 font-body text-xs leading-relaxed text-beige/80">
            Tap a house to explore its full menu — baked fresh every morning in Farid Town, Sahiwal.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {ITEMS.map((it) => (
            <Link
              key={it.n}
              to="/menu"
              search={{ c: it.c }}
              className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:border-gold/40"
            >
              <div className="aspect-[16/10] w-full overflow-hidden">
                <img
                  src={it.img}
                  alt={it.t}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-gold">{it.n}</span>
                  <div className="flex gap-1.5">
                    {it.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="rounded-full bg-stone-100 px-2.5 py-0.5 text-[10px] font-medium text-beige">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="mt-2 font-display text-2xl text-foreground group-hover:text-gold transition-colors">{it.t}</h3>
                <p className="mt-1 font-body text-xs leading-relaxed text-beige/80">{it.d}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ================= DESKTOP LAYOUT (Horizontal Moving Cards & Working Arrows) ================= */}
      <div className="hidden lg:flex lg:h-screen lg:flex-col lg:justify-between lg:py-14">
        {/* Header & Controls */}
        <div className="px-12 xl:px-16 flex items-end justify-between z-30">
          <div className="max-w-xl">
            <Reveal>
              <p className="eyebrow mb-2">The Signature Collection</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl xl:text-5xl leading-tight text-foreground">
                Six houses of craft, <span className="text-gold-gradient">one address.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-2 font-body text-sm font-light text-beige/80 max-w-md">
                Tap a house to explore its full menu — baked fresh every morning in Farid Town, Sahiwal.
              </p>
            </Reveal>
          </div>

          {/* Interactive Arrow Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              disabled={!canScrollLeft}
              aria-label="Previous items"
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-border bg-white text-foreground shadow-sm transition-all duration-300 hover:border-gold hover:text-gold hover:shadow-md disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-border disabled:hover:text-foreground"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
            <button
              onClick={handleNext}
              disabled={!canScrollRight}
              aria-label="Next items"
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-border bg-white text-foreground shadow-sm transition-all duration-300 hover:border-gold hover:text-gold hover:shadow-md disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-border disabled:hover:text-foreground"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Moving Cards Container */}
        <div className="w-full overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-8 px-12 xl:px-16"
          >
            {ITEMS.map((it) => (
              <CategoryCard
                key={it.n}
                n={it.n}
                title={it.t}
                desc={it.d}
                img={it.img}
                tags={it.tags}
                category={it.c}
                className="h-[48vh] w-[30vw] shrink-0 xl:h-[52vh] xl:w-[25vw] transition-transform duration-300 hover:-translate-y-2"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}