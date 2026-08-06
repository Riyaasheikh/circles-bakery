import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { User } from "lucide-react";
import { Magnetic } from "./Magnetic";
import { useAuth } from "@/hooks/use-auth";

const LINKS = [
  { label: "Story", href: "#story" },
  { label: "Collection", href: "#collection" },
  { label: "Experience", href: "#experience" },
  { label: "Gallery", href: "#gallery" },
  { label: "Visit", href: "#location" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const { isAuthenticated } = useAuth();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [last, setLast] = useState(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40);
    setHidden(y > last && y > 320 && !open);
    setLast(y);
  });

  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -120 }}
        animate={{ y: hidden ? -120 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-[9000] px-5 pt-4 md:px-10 md:pt-6"
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-3 transition-all duration-500 md:px-8 ${
            scrolled ? "glass" : "border border-transparent"
          }`}
        >
          <button
            onClick={() => go("#hero")}
            className={`font-display text-2xl tracking-[0.2em] transition-colors ${
              scrolled ? "text-foreground" : "text-cream"
            }`}
          >
            Circles
          </button>

          <nav className="hidden items-center gap-9 lg:flex">
            {LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                className={`group relative font-body text-xs uppercase tracking-[0.25em] transition-colors hover:text-gold ${
                  scrolled ? "text-beige" : "text-cream/85"
                }`}
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
            <Link
              to="/menu"
              className={`group relative font-body text-xs uppercase tracking-[0.25em] transition-colors hover:text-gold ${
                scrolled ? "text-beige" : "text-cream/85"
              }`}
            >
              Menu
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to={isAuthenticated ? "/account" : "/auth"}
              aria-label={isAuthenticated ? "My account" : "Sign in"}
              className={`hidden items-center gap-2 font-body text-xs uppercase tracking-[0.22em] transition-colors hover:text-gold md:flex ${
                scrolled ? "text-beige" : "text-cream/85"
              }`}
            >
              <User size={15} />
              {isAuthenticated ? "Account" : "Sign In"}
            </Link>
            <Magnetic
              onClick={() => go("#reservation")}
              className="hidden rounded-full border border-gold/50 px-6 py-2.5 font-body text-xs uppercase tracking-[0.22em] text-gold transition-colors hover:bg-gold hover:text-scrim md:block"
            >
              Reserve
            </Magnetic>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            >
              <span
                className={`h-px w-6 transition-all ${(scrolled || open) ? "bg-foreground" : "bg-cream"}  ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
              />
              <span
                className={`h-px w-6 transition-all ${(scrolled || open) ? "bg-foreground" : "bg-cream"}  ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[8999] flex flex-col items-center justify-center gap-7 bg-background/95 backdrop-blur-xl lg:hidden"
          >
            {LINKS.map((l, i) => (
              <motion.button
                key={l.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                onClick={() => go(l.href)}
                className="font-display text-4xl text-ivory"
              >
                {l.label}
              </motion.button>
            ))}
            <Link
              to="/menu"
              onClick={() => setOpen(false)}
              className="font-display text-4xl text-ivory"
            >
              Menu
            </Link>
            <Link
              to={isAuthenticated ? "/account" : "/auth"}
              onClick={() => setOpen(false)}
              className="font-display text-4xl text-ivory"
            >
              {isAuthenticated ? "Account" : "Sign In"}
            </Link>
            <button
              onClick={() => go("#reservation")}
              className="mt-4 rounded-full border border-gold px-8 py-3 text-sm uppercase tracking-[0.2em] text-gold"
            >
              Reserve a Table
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
