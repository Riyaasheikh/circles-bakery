import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Reveal";
import { IMAGES } from "@/data/images";


export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);

  return (
    <section id="gallery" className="bg-background border-t border-border px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="eyebrow mb-4">The Gallery</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl text-ivory md:text-6xl">
                Moments, <span className="text-gold-gradient">captured.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-xs font-body text-sm font-light text-beige/80">
              A glimpse into our kitchen, our counter and the tables where it all
              comes together.
            </p>
          </Reveal>
        </div>

        <div className="grid auto-rows-[220px] grid-cols-2 gap-4 md:grid-cols-4 md:auto-rows-[260px]">
          {IMAGES.map((img, i) => (
            <motion.button
              key={i}
              onClick={() => setOpen(i)}
              data-cursor
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.9, delay: (i % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-300 hover:shadow-lg ${img.span ?? ""} ${
                img.desktopOnly ? "hidden md:block" : ""
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-scrim/0 transition-colors duration-500 group-hover:bg-scrim/30" />
              <span className="absolute bottom-4 left-4 translate-y-3 rounded-full bg-white/90 px-3.5 py-1 font-body text-[10px] font-medium uppercase tracking-[0.2em] text-brown opacity-0 shadow-md backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                View
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[9500] flex items-center justify-center bg-scrim/95 p-6 backdrop-blur-md"
          >
            <motion.img
              key={open}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              src={IMAGES[open].src}
              alt={IMAGES[open].alt}
              className="max-h-[85vh] max-w-[90vw] rounded-sm object-contain gold-ring"
            />
            <button
              onClick={close}
              className="absolute right-8 top-8 font-body text-xs uppercase tracking-[0.25em] text-beige/70 hover:text-gold"
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}