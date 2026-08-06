import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "./Reveal";
import desserts from "@/assets/cat-desserts.jpg";

export function ChefHighlight() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <section ref={ref} className="relative h-[90vh] overflow-hidden md:h-screen">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src={desserts}
          alt="Chef's signature chocolate composition"
          loading="lazy"
          width={1008}
          height={1200}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-scrim/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-scrim via-scrim/45 to-transparent" />
      </motion.div>

      <div className="relative z-10 flex h-full items-center px-6 md:px-16">
        <div className="max-w-xl">
          <Reveal>
            <p className="eyebrow mb-6">Signature Bake</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-5xl leading-[1.05] text-cream md:text-7xl">
              Classic
              <span className="block text-gold-gradient">Chocolate Cake</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-7 font-body text-sm font-light leading-relaxed text-cream/85 md:text-base">
              Rich layers of moist chocolate sponge and silky chocolate cream,
              baked fresh daily — our most-loved cake and the heart of every
              Circles celebration.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-9 flex items-center gap-5">
              <span className="font-display text-4xl text-gold">Rs 1,800</span>
              <div className="hairline w-16" />
              <span className="font-body text-xs uppercase tracking-[0.2em] text-cream/60">
                Made Fresh Daily
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
