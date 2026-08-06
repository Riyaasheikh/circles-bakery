import { Reveal } from "./Reveal";
import { CARDS } from "@/data/card";

export function Location() {
  return (
    <section id="location" className="bg-background px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <Reveal>
            <p className="eyebrow mb-5">Find Us</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl text-ivory md:text-6xl">
              The heart of <span className="text-gold-gradient">Sahiwal.</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div className="gold-ring relative h-[340px] overflow-hidden rounded-sm border border-border lg:h-full">
              <iframe
                title="Circles Bakery location map"
                src="https://www.google.com/maps?q=Circles+Bakery+Farid+Town+Sahiwal&output=embed"
                className="h-full w-full grayscale-[0.2] contrast-[1.05]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          <div className="grid gap-6">
            {CARDS.map((c, i) => (
              <Reveal key={c.t} delay={i * 0.1}>
                <div className="glass flex h-full flex-col justify-between rounded-sm p-8">
                  <div>
                    <h3 className="font-display text-2xl text-gold">{c.t}</h3>
                    <div className="hairline my-4 w-12" />
                    <div className="space-y-1 font-body text-sm font-light text-beige/75">
                      {c.lines.map((l) => (
                        <p key={l}>{l}</p>
                      ))}
                    </div>
                  </div>
                  {c.cta && (
                    <a
                      href={c.cta.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-6 inline-block font-body text-xs uppercase tracking-[0.22em] text-ivory transition-colors hover:text-gold"
                    >
                      {c.cta.label} →
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
