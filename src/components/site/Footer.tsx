import { useState } from "react";
import { Reveal } from "./Reveal";

const SOCIALS = ["Instagram", "Facebook", "foodpanda", "WhatsApp"];

export function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <footer className="relative overflow-hidden border-t border-border bg-background px-6 pb-12 pt-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <Reveal>
              <h2 className="font-display text-6xl tracking-[0.15em] text-gold-gradient md:text-8xl">
                Circles
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md font-body text-sm font-light leading-relaxed text-beige/80">
                A premium modern bakery, French pâtisserie, café and family
                dining destination — freshly baked every day in Farid Town,
                Sahiwal, with warm hospitality in every bite.
              </p>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <p className="eyebrow mb-4">Newsletter</p>
              <p className="font-body text-sm font-light text-beige/80">
                Seasonal collections and private events, to your inbox.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email) setDone(true);
                }}
                className="mt-6 flex items-center gap-3 border-b border-border pb-3 transition-colors focus-within:border-gold"
              >
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="w-full bg-transparent font-body text-sm text-ivory placeholder:text-beige/40 focus:outline-none"
                />
                <button className="shrink-0 font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold transition-colors hover:text-brown">
                  {done ? "Thank you ✓" : "Subscribe"}
                </button>
              </form>
            </Reveal>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
              {SOCIALS.map((s) => (
                <a
                  key={s}
                  href="#"
                  className="font-body text-xs uppercase tracking-[0.2em] text-beige transition-colors hover:text-gold"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="font-body text-xs text-beige/80">
            © {new Date().getFullYear()} Circles Bakery, Sahiwal. All rights reserved.
          </p>
          <p className="font-body text-xs text-beige/80">
            Crafted with patience · Sahiwal, Pakistan
          </p>
        </div>
      </div>
    </footer>
  );
}
