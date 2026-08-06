import { Reveal } from "./Reveal";
import { REVIEWS } from "@/data/reviews";

function Card({ q, n, m }: { q: string; n: string; m: string }) {
  return (
    <div className="glass mx-3 flex w-[300px] shrink-0 flex-col justify-between rounded-sm p-8 md:w-[400px]">
      <span className="font-display text-6xl leading-none text-gold/50">&ldquo;</span>
      <p className="-mt-4 font-display text-xl font-light leading-relaxed text-ivory/90 md:text-2xl">
        {q}
      </p>
      <div className="mt-7">
        <div className="hairline mb-4 w-12" />
        <p className="font-body text-sm text-brown">{n}</p>
        <p className="font-body text-xs tracking-wide text-beige">{m}</p>
      </div>
    </div>
  );
}

export function Testimonials() {
  const loop = [...REVIEWS, ...REVIEWS];
  return (
    <section className="overflow-hidden bg-background py-28 md:py-40">
      <div className="px-6 md:px-10">
        <div className="mx-auto mb-16 max-w-7xl text-center">
          <Reveal>
            <p className="eyebrow mb-5">In Their Words</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl text-ivory md:text-6xl">
              Loved across <span className="text-gold-gradient">Sahiwal.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 font-body text-sm text-beige/60">
              4.4 ★ from 55 reviews on Google
            </p>
          </Reveal>
        </div>
      </div>

      <div className="group relative flex w-max animate-[marquee_42s_linear_infinite] [animation-play-state:running] hover:[animation-play-state:paused]">
        {loop.map((r, i) => (
          <Card key={i} {...r} />
        ))}
      </div>

      <style>{`@keyframes marquee { to { transform: translateX(-50%) } }`}</style>
    </section>
  );
}
