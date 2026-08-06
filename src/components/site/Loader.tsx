import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/** Elegant gold loading screen with a counter and curtain reveal. */
export function Loader({ onDone }: { onDone?: () => void }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 1900;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => {
          setDone(true);
          onDone?.();
        }, 350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background"
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.5em" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl text-gold-gradient md:text-7xl"
          >
            Circles
          </motion.div>
          <p className="eyebrow mt-5 text-beige/70">Sahiwal · Pâtisserie</p>
          <div className="mt-10 h-px w-56 overflow-hidden bg-foreground/10">
            <motion.div
              className="h-full bg-gradient-to-r from-gold to-gold-soft"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: count / 100 }}
              style={{ transformOrigin: "left" }}
              transition={{ ease: "linear" }}
            />
          </div>
          <span className="mt-4 font-body text-xs tracking-[0.3em] text-muted-foreground">
            {count.toString().padStart(3, "0")}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
