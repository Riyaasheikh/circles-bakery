import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "./Reveal";
import bread from "@/assets/banner.png";
import circles from "@/assets/circles.mp4";


const STATS = [
  { v: "4.4", l: "Guest Rating" },
  { v: "12+", l: "Daily Bakes" },
  { v: "2020", l: "Established" },
];

export function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Responsive Parallax Transforms
  const y1 = useTransform(scrollYProgress, [0, 1], ["-4%", "6%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["8%", "-6%"]);

  return (
    <section
      id="story"
      ref={ref}
      className="relative overflow-hidden bg-background px-6 py-20 md:px-10 md:py-44"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-24">
        {/* Media Column */}
        <div className="relative order-2 pb-8 lg:order-1 lg:pb-0">
          <motion.div
            style={{ y: y1 }}
            className="gold-ring relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-charcoal-light shadow-2xl"
          >
            <video
              src={circles}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            />
          </motion.div>

          {/* Overlapping Parallax Inset Image */}
          <motion.div
            style={{ y: y2 }}
            className="gold-ring absolute -bottom-4 right-2 aspect-square w-32 overflow-hidden rounded-sm border border-gold/40 shadow-2xl sm:-bottom-8 sm:right-0 sm:w-44 md:-bottom-10 md:-right-4 md:w-56"
          >
            <img
              src={bread}
              alt="Artisan sourdough crust dusted with gold"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>

        {/* Text Column */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="eyebrow mb-4 sm:mb-6">The House of Circles</p>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-display text-3xl leading-[1.1] text-ivory sm:text-4xl md:text-6xl md:leading-[1.08]">
              A devotion to the{" "}
              <span className="text-gold-gradient">art of patience</span>, baked
              fresh at dawn.
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-6 max-w-lg font-body text-sm font-light leading-relaxed text-beige/70 sm:mt-8 md:text-base">
              From custom celebration cakes to delicate French pastries, premium
              coffee and gourmet dining — every creation at Circles is a quiet
              act of craftsmanship. We source rare ingredients, temper chocolate
              by hand, and let time do what time does best.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-8 sm:mt-12 sm:gap-6">
              {STATS.map((s) => (
                <div key={s.l}>
                  <div className="font-display text-3xl text-gold sm:text-4xl md:text-5xl">
                    {s.v}
                  </div>
                  <div className="mt-2 font-body text-[10px] uppercase tracking-[0.2em] text-beige/60 sm:text-[11px]">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}