import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { Magnetic } from "./Magnetic";
import hero from "@/assets/hero.jpg";
import heroVideo from "@/assets/circle2.mp4";

const HEADLINE = ["Freshly Baked", "Every Single Day"];

export function Hero() {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Force video playback on load & handle browser autoplay restrictions
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.warn("Autoplay was prevented by browser:", error);
      });
    }
  }, []);

  const go = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" ref={ref} className="relative h-[100svh] overflow-hidden bg-scrim">
      {/* Background Video Layer */}
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
        <video
          ref={videoRef}
          src={heroVideo}
          poster={hero}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-label="Cinematic walkthrough of Circles bakery interior in Sahiwal"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-scrim/80 via-scrim/45 to-scrim/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent,rgba(40,26,15,0.6))]" />
      </motion.div>

      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="animate-floaty absolute block rounded-full bg-gold/40"
            style={{
              left: `${(i * 53) % 100}%`,
              top: `${(i * 37) % 100}%`,
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${6 + (i % 5)}s`,
              opacity: 0.2 + (i % 4) * 0.12,
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center sm:px-6"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="eyebrow mb-5 sm:mb-7"
        >
          Sahiwal · Bakery · Pâtisserie · Café & Dining
        </motion.p>

        <h1 className="max-w-5xl font-display text-[clamp(2.6rem,13vw,4.5rem)] leading-[0.94] tracking-tight text-cream sm:text-[10vw] md:text-[6.5vw]">
          {HEADLINE.map((line, li) => (
            <span key={li} className="block overflow-hidden">
              <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.5 + li * 0.18, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {li === 1 ? <em className="text-gold-gradient not-italic">{line}</em> : line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="mt-6 max-w-xl font-body text-[13px] font-light leading-relaxed text-cream/80 sm:mt-8 sm:text-sm md:text-base"
        >
          Artisan cakes, fresh pastries, live sandwiches, premium coffee and
          family dining — handcrafted with warmth in the heart of Sahiwal.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 1 }}
          className="mt-9 flex w-full flex-col items-center gap-3.5 sm:mt-11 sm:w-auto sm:flex-row sm:gap-4"
        >
          <Magnetic
            onClick={() => go("#reservation")}
            className="w-full max-w-[20rem] rounded-full bg-gold px-8 py-3.5 font-body text-[11px] uppercase tracking-[0.22em] text-scrim shadow-lg shadow-gold/30 transition-all hover:-translate-y-0.5 hover:bg-gold-soft sm:w-auto sm:px-9 sm:py-4 sm:text-xs sm:tracking-[0.25em]"
          >
            Reserve a Table
          </Magnetic>
          <Magnetic
            onClick={() => navigate({ to: "/menu" })}
            className="w-full max-w-[20rem] rounded-full border border-white/20 px-8 py-3.5 font-body text-[11px] uppercase tracking-[0.22em] text-cream backdrop-blur-sm transition-colors hover:border-gold hover:text-gold sm:w-auto sm:px-9 sm:py-4 sm:text-xs sm:tracking-[0.25em]"
          >
            Explore the Menu
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* Decorative lines */}
      <div className="pointer-events-none absolute inset-x-5 top-24 z-10 hidden h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent lg:block" />
      <div className="pointer-events-none absolute inset-x-5 bottom-24 z-10 hidden h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent lg:block" />

      {/* Sub-bar text */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute inset-x-0 bottom-28 z-10 hidden justify-center gap-10 px-6 font-body text-[10px] uppercase tracking-[0.28em] text-cream/60 lg:flex"
      >
        <span>Baked fresh daily</span>
        <span className="text-gold/70">·</span>
        <span>French pâtisserie</span>
        <span className="text-gold/70">·</span>
        <span>Farid Town, Sahiwal</span>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="font-body text-[10px] uppercase tracking-[0.35em] text-cream/55">
          Scroll
        </span>
        <div className="relative h-12 w-px overflow-hidden bg-white/15">
          <span
            className="absolute left-0 top-0 h-4 w-px bg-gold"
            style={{ animation: "scrollDot 2.2s ease-in-out infinite" }}
          />
        </div>
      </motion.div>
    </section>
  );
}