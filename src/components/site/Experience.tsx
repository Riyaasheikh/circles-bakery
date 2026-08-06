import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import ambiance from "@/assets/ambiance.jpg";
import { EXP } from "@/data/exp";

export function Experience() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-background px-6 py-28 md:px-10 md:py-40"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(circle at 80% 20%, var(--accent-glow), transparent 55%)",
        }}
      />
      <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-center">
        <div>
          <Reveal>
            <p className="eyebrow mb-6">The Experience</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl leading-tight text-ivory md:text-6xl">
              Where every bake becomes <span className="text-gold-gradient">a ritual.</span>
            </h2>
          </Reveal>

          <div className="mt-12 divide-y divide-border border-y border-border">
            {EXP.map((e, i) => (
              <button
                key={e.t}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <div>
                  <h3
                    className={`font-display text-2xl transition-colors md:text-3xl ${
                      active === i ? "text-gold" : "text-ivory/85"
                    }`}
                  >
                    {e.t}
                  </h3>
                  <motion.p
                    initial={false}
                    animate={{
                      height: active === i ? "auto" : 0,
                      opacity: active === i ? 1 : 0,
                      marginTop: active === i ? 10 : 0,
                    }}
                    className="overflow-hidden font-body text-sm font-light text-beige/70"
                  >
                    {e.d}
                  </motion.p>
                </div>
                <span
                  className={`font-display text-xl transition-all ${
                    active === i ? "rotate-45 text-gold" : "text-beige/40"
                  }`}
                >
                  +
                </span>
              </button>
            ))}
          </div>
        </div>

        <Reveal delay={0.2}>
          <div className="gold-ring relative aspect-[3/4] overflow-hidden rounded-sm">
            <img
              src={ambiance}
              alt="Warm, family-friendly bakery café interior at Circles"
              loading="lazy"
              width={1104}
              height={1408}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-scrim/85 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="font-display text-3xl text-cream">{EXP[active].t}</p>
              <div className="hairline mt-4 w-24" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
