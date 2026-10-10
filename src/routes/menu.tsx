import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, X, ChevronLeft, Plus } from "lucide-react";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { CustomCursor } from "@/components/site/CustomCursor";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { Reveal } from "@/components/site/Reveal";
import { Footer } from "@/components/site/Footer";
import { useCart, cart, cartCount, cartTotal } from "@/hooks/use-cart";
import {
  GROUPS,
  groupOf,
  itemPrices,
  rs,
  type Item,
  type Section,
} from "@/lib/menu-data";
import { useMenuSections } from "@/lib/use-menu-sections";
import interior from "@/assets/hero.jpg";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/menu")({
  validateSearch: (search: Record<string, unknown>): { c?: string } =>
    typeof search.c === "string" ? { c: search.c } : {},
  head: () => ({
    meta: [
      { title: "Menu & Prices · Circles Bakery, Pâtisserie & Café · Sahiwal" },
      {
        name: "description",
        content:
          "The full Circles menu with prices in PKR — signature cakes, three milk cakes, cheesecakes, croissants, éclairs, donuts, biscuits, artisan breads, panini, pizzas, burgers, pastas and coffee, freshly baked every day in Sahiwal.",
      },
      { property: "og:title", content: "Menu & Prices · Circles Bakery · Sahiwal" },
      {
        property: "og:description",
        content:
          "Explore every Circles category with exact PKR pricing — cakes, pâtisserie, boulangerie, café and casual dining, handcrafted fresh daily in Sahiwal.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MenuPage,
});

/* ---------------- filters ---------------- */

const PRICE_BANDS = [
  { id: "all", label: "Any price", test: () => true },
  { id: "under-500", label: "Under Rs 500", test: (p: number) => p < 500 },
  { id: "500-1000", label: "Rs 500 – 1,000", test: (p: number) => p >= 500 && p <= 1000 },
  { id: "1000-2500", label: "Rs 1,000 – 2,500", test: (p: number) => p > 1000 && p <= 2500 },
  { id: "over-2500", label: "Rs 2,500 +", test: (p: number) => p > 2500 },
] as const;

type BandId = (typeof PRICE_BANDS)[number]["id"];

function matchesBand(item: Item, band: BandId) {
  if (band === "all") return true;
  const test = PRICE_BANDS.find((b) => b.id === band)!.test;
  const prices = itemPrices(item);
  if (!prices.length) return false;
  return prices.some((p) => test(p));
}

function matchesQuery(item: Item, q: string) {
  if (!q) return true;
  const needle = q.toLowerCase();
  return (
    item.name.toLowerCase().includes(needle) ||
    item.desc.toLowerCase().includes(needle) ||
    (item.variants ?? []).some((v) => v.label.toLowerCase().includes(needle))
  );
}

/* ---------------- cards ---------------- */

function QuickAdd({
  label,
  aria,
  onClick,
}: {
  label: string;
  aria: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={aria}
      className="inline-flex items-center gap-1.5 rounded-full border border-gold/50 bg-white/80 px-4 py-1.5 font-body text-[11px] font-medium uppercase tracking-[0.16em] text-brown shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold hover:text-white hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold active:translate-y-0"
    >
      <Plus size={12} strokeWidth={2.4} />
      {label}
    </button>
  );
}

function ItemCard({
  item,
  image,
  isCustomImage,
  sectionTitle,
  delay,
  index = 0,
}: {
  item: Item;
  image: string;
  isCustomImage?: boolean;
  sectionTitle: string;
  delay: number;
  index?: number;
}) {
  /* Vary the crop so a shared category still reads as distinct plates, unless it's a custom image. */
  const crops = ["50% 40%", "30% 55%", "70% 45%", "50% 70%", "40% 30%", "60% 60%"];
  const position = isCustomImage ? "center" : crops[index % crops.length];

  return (
    <Reveal delay={delay} y={26} className="h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white/65 backdrop-blur-sm transition-all duration-500 will-change-transform hover:-translate-y-1.5 hover:border-gold/45 hover:bg-white/90 hover:shadow-[0_36px_70px_-44px_rgba(92,59,34,0.6)] focus-within:border-gold/45">
        <div className="relative aspect-[16/11] overflow-hidden">
          <img
            src={image}
            alt={`${item.name} — ${sectionTitle} at Circles Bakery, Sahiwal`}
            loading="lazy"
            decoding="async"
            width={1024}
            height={704}
            style={{ objectPosition: position }}
            className="h-full w-full scale-[1.05] object-cover transition-transform duration-[1.3s] ease-out will-change-transform group-hover:scale-[1.08]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-scrim/45 via-transparent to-transparent" />
          <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 font-body text-[10px] uppercase tracking-[0.18em] text-brown backdrop-blur-sm">
            {sectionTitle}
          </span>
          {item.badge && (
            <span className="absolute right-4 top-4 rounded-full bg-gold px-3 py-1 font-body text-[10px] uppercase tracking-[0.18em] text-white shadow-sm">
              {item.badge}
            </span>
          )}
          {item.soldOut && (
            <span className="absolute bottom-4 left-4 rounded-full bg-charcoal/85 px-3 py-1 font-body text-[10px] uppercase tracking-[0.18em] text-white">
              Sold out
            </span>
          )}
        </div>


        <div className="flex flex-1 flex-col p-5 md:p-6">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
            <h3 className="min-w-0 font-display text-xl leading-snug text-ivory md:text-2xl">
              {item.name}
            </h3>
            {item.price !== undefined && !item.variants && (
              <p className="shrink-0 text-right font-body text-sm font-semibold tracking-wide text-brown">
                {item.from && (
                  <span className="mr-1 text-[10px] font-normal uppercase tracking-[0.18em] text-beige">
                    from
                  </span>
                )}
                {item.was && (
                  <span className="mr-1.5 font-normal text-beige line-through">{rs(item.was)}</span>
                )}
                {rs(item.price)}
                {item.unit && <span className="ml-1 font-normal text-beige">{item.unit}</span>}
              </p>
            )}
            {item.enquire && (
              <p className="shrink-0 font-body text-[11px] uppercase tracking-[0.18em] text-beige">
                On request
              </p>
            )}
          </div>

          <p className="mt-2 font-body text-[13px] font-light leading-relaxed text-beige">
            {item.desc}
          </p>

          <div className="mt-5 flex flex-wrap gap-2 pt-1 transition-all duration-500 md:translate-y-1.5 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100">
            {item.soldOut ? (
              <span className="rounded-full border border-border px-4 py-1.5 font-body text-[11px] uppercase tracking-[0.16em] text-beige">
                Currently unavailable
              </span>
            ) : item.variants
              ? item.variants.map((v) => (
                  <button
                    key={v.label}
                    type="button"
                    onClick={() => cart.add(`${item.name} · ${v.label}`, v.price)}
                    aria-label={`Add ${item.name} ${v.label} to cart for ${rs(v.price)}`}
                    className="flex items-center gap-2 rounded-full border border-border bg-white/75 px-3.5 py-1.5 font-body text-[11px] tracking-wide text-brown shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold hover:text-white hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  >
                    <span className="uppercase tracking-[0.14em]">{v.label}</span>
                    <span className="font-semibold">{rs(v.price)}</span>
                  </button>
                ))
              : item.enquire
                ? (
                    <Link
                      to="/"
                      hash="reservation"
                      className="rounded-full border border-border px-4 py-1.5 font-body text-[11px] uppercase tracking-[0.16em] text-beige transition-colors hover:border-gold hover:text-brown"
                    >
                      Enquire
                    </Link>
                  )
                : (
                    <QuickAdd
                      label="Quick add"
                      aria={`Add ${item.name} to cart`}
                      onClick={() => cart.add(item.name, item.price!)}
                    />
                  )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function SectionHeading({ section }: { section: Section }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: 48 },
        {
          y: -28,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="mx-auto max-w-3xl text-center will-change-transform">
      <Reveal>
        <p className="eyebrow mb-5">{section.tagline}</p>
        <h2 className="font-display text-4xl leading-[1.05] text-ivory md:text-6xl">
          {section.title}
        </h2>
        <div className="mx-auto mt-7 flex items-center justify-center gap-3">
          <span className="hairline w-16 md:w-24" />
          <span className="h-1.5 w-1.5 rotate-45 bg-gold/70" />
          <span className="hairline w-16 md:w-24" />
        </div>
        {section.note && (
          <p className="mx-auto mt-6 max-w-xl font-body text-xs font-light leading-relaxed text-beige">
            {section.note}
          </p>
        )}
      </Reveal>
    </div>
  );
}

function ProductGrid({ section, items }: { section: Section; items: Item[] }) {
  return (
    <ul className="mx-auto mt-14 grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, j) => (
        <li key={item.name} className="h-full">
          <ItemCard
            item={item}
            image={item.image ?? section.image}
            isCustomImage={!!item.image}
            sectionTitle={section.title}
            index={j}
            delay={Math.min((j % 3) * 0.08, 0.16)}
          />
        </li>
      ))}
    </ul>
  );
}

/* ---------------- page ---------------- */

function MenuPage() {
  const { c } = Route.useSearch();
  const navigate = useNavigate({ from: "/menu" });
  const cartItems = useCart();
  const count = cartCount(cartItems);
  const total = cartTotal(cartItems);

  const [query, setQuery] = useState("");
  const [band, setBand] = useState<BandId>("all");
  const [group, setGroup] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroFade = useTransform(scrollYProgress, [0, 1], [1, 0.25]);

  const SECTIONS = useMenuSections();
  const selected = c ? (SECTIONS.find((s) => s.id === c) ?? null) : null;

  useEffect(() => {
    if (selected) setGroup(groupOf(selected.id));
  }, [selected]);

  const selectCategory = useCallback(
    (id: string | null) => {
      setQuery("");
      navigate({ search: id ? { c: id } : {}, resetScroll: false });
      if (id) {
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
      }
    },
    [navigate],
  );

  /* Which sections are on screen */
  const visibleSections = useMemo(() => {
    const pool = selected
      ? [selected]
      : group
        ? SECTIONS.filter((s) => groupOf(s.id) === group)
        : SECTIONS;
    return pool
      .map((s) => ({
        section: s,
        items: s.items.filter((i) => matchesQuery(i, query) && matchesBand(i, band)),
      }))
      .filter((entry) => entry.items.length > 0);
  }, [selected, group, query, band]);

  const railSections = useMemo(
    () => (group ? SECTIONS.filter((s) => groupOf(s.id) === group) : SECTIONS),
    [group],
  );

  const resultCount = visibleSections.reduce((n, s) => n + s.items.length, 0);
  const filtering = Boolean(query) || band !== "all";

  /* Active section while scrolling */
  useEffect(() => {
    if (selected) {
      setActiveId(selected.id);
      return;
    }
    const els = visibleSections
      .map((v) => document.getElementById(v.section.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (top) setActiveId(top.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.6, 1] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [visibleSections, selected]);

  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 320);
    return () => clearTimeout(t);
  }, [visibleSections.length, selected]);

  return (
    <>
      <SmoothScroll />
      <CustomCursor />
      <ScrollProgress />

      <header className="fixed inset-x-0 top-0 z-[9000] px-5 pt-4 md:px-10 md:pt-6">
        <div className="glass mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-full px-5 py-3 md:px-8">
          <Link to="/" className="truncate font-display text-2xl tracking-[0.2em] text-foreground">
            Circles
          </Link>
          <div className="flex shrink-0 items-center gap-3">
            <Link
              to="/"
              className="hidden font-body text-xs uppercase tracking-[0.22em] text-beige transition-colors hover:text-brown sm:block"
            >
              Home
            </Link>
            <Link
              to="/checkout"
              className="relative rounded-full bg-gold px-5 py-2.5 font-body text-xs uppercase tracking-[0.2em] text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-brown hover:shadow-md"
            >
              Cart{count > 0 ? ` · ${count}` : ""}
            </Link>
          </div>
        </div>
      </header>

      {count > 0 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed inset-x-0 bottom-4 z-[9000] px-5 md:px-10"
        >
          <Link
            to="/checkout"
            className="glass mx-auto grid max-w-md grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-full px-6 py-4 shadow-lg"
          >
            <span className="truncate font-body text-xs uppercase tracking-[0.18em] text-beige">
              {count} item{count > 1 ? "s" : ""} · Rs {total.toLocaleString()}
            </span>
            <span className="shrink-0 font-body text-xs uppercase tracking-[0.18em] text-brown">
              Checkout →
            </span>
          </Link>
        </motion.div>
      )}

      <main>
        {/* Cinematic hero — morphs into the selected category banner */}
        <section ref={heroRef} className="relative flex h-[62svh] items-end overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={selected?.id ?? "all"}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <motion.img
                src={selected?.image ?? interior}
                alt={
                  selected
                    ? `${selected.title} at Circles Bakery, Sahiwal`
                    : "Circles bakery interior with warm lighting and pastry display"
                }
                fetchPriority="high"
                decoding="async"
                style={{ y: heroY, opacity: heroFade }}
                className="h-full w-full scale-110 object-cover will-change-transform"
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-scrim/55 via-scrim/35 to-scrim/85" />

          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 md:px-10">
            {selected && (
              <button
                type="button"
                onClick={() => selectCategory(null)}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-cream/35 px-4 py-2 font-body text-[10px] uppercase tracking-[0.24em] text-cream/90 transition-colors hover:border-gold hover:text-gold-soft"
              >
                <ChevronLeft size={13} /> All categories
              </button>
            )}
            <motion.p
              key={`eyebrow-${selected?.id ?? "all"}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="mb-5 font-body text-[0.7rem] font-medium uppercase tracking-[0.42em] text-gold-soft"
            >
              {selected ? selected.tagline : "Sahiwal · Freshly Baked Every Day"}
            </motion.p>
            <motion.h1
              key={`title-${selected?.id ?? "all"}`}
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl font-display text-[13vw] leading-[0.92] tracking-tight text-cream md:text-[6.4vw]"
            >
              {selected ? (
                selected.title
              ) : (
                <>
                  The <em className="not-italic text-gold-soft">Menu</em>
                </>
              )}
            </motion.h1>
            {!selected && (
              <p className="mt-6 max-w-xl font-body text-sm font-light leading-relaxed text-cream/85 md:text-base">
                Cakes, pâtisserie, boulangerie, café and casual dining — every price in
                PKR, every item baked or cooked fresh the same day.
              </p>
            )}
          </div>
        </section>

        {/* Sticky premium navigation */}
        <div className="sticky top-[72px] z-[60] border-b border-border bg-background/80 backdrop-blur-xl md:top-[86px]">
          <div className="mx-auto max-w-7xl px-5 py-4 md:px-10">
            {/* Segmented groups */}
            <div className="no-scrollbar -mx-1 flex snap-x items-center gap-2 overflow-x-auto px-1 md:flex-wrap md:justify-center md:overflow-visible">
              <NavPill
                label="Everything"
                active={!group && !selected}
                onClick={() => {
                  setGroup(null);
                  selectCategory(null);
                }}
              />
              {GROUPS.map((g) => (
                <NavPill
                  key={g.id}
                  label={g.label}
                  active={group === g.id}
                  onClick={() => {
                    setGroup(g.id);
                    navigate({ search: {}, resetScroll: false });
                  }}
                />
              ))}
            </div>

            {/* Category chips — swipeable, snap, no scrollbar. Only for a chosen group,
                so the rail never balloons into rows of clutter. */}
            {(group || selected) && (
            <nav aria-label="Menu categories" className="mt-3">
              <ul className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-1.5 overflow-x-auto scroll-smooth px-1 py-1 md:flex-wrap md:justify-center md:overflow-visible">

                {railSections.map((s) => {
                  const isActive = selected ? selected.id === s.id : activeId === s.id;
                  return (
                    <li key={s.id} className="snap-start">
                      <button
                        type="button"
                        onClick={() => selectCategory(s.id)}
                        aria-current={isActive ? "true" : undefined}
                        className={`relative whitespace-nowrap rounded-full px-3.5 py-2 font-body text-[11px] uppercase tracking-[0.16em] transition-colors duration-300 ${
                          isActive ? "text-brown" : "text-beige hover:text-brown"
                        }`}
                      >
                        {s.title}
                        {isActive && (
                          <motion.span
                            layoutId="menu-nav-underline"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                            className="absolute inset-x-2.5 -bottom-0.5 h-[2px] rounded-full bg-gold"
                          />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
            )}


            {/* Search + price filters */}
            <div className="mt-3 flex flex-col gap-2.5 md:flex-row md:items-center md:justify-center">
              <label className="relative flex min-w-0 items-center md:w-72">
                <Search
                  size={14}
                  className="pointer-events-none absolute left-4 text-beige"
                  aria-hidden="true"
                />
                <span className="sr-only">Search the menu</span>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search cakes, croissants, coffee…"
                  className="w-full rounded-full border border-border bg-white/70 py-2.5 pl-10 pr-9 font-body text-xs tracking-wide text-brown placeholder:text-beige/80 focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className="absolute right-3.5 text-beige transition-colors hover:text-brown"
                  >
                    <X size={14} />
                  </button>
                )}
              </label>

              <div className="no-scrollbar -mx-1 flex snap-x gap-1.5 overflow-x-auto px-1 md:mx-0 md:flex-wrap md:justify-center md:overflow-visible md:px-0">
                {PRICE_BANDS.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBand(b.id)}
                    aria-pressed={band === b.id}
                    className={`snap-start whitespace-nowrap rounded-full border px-3.5 py-2 font-body text-[10px] uppercase tracking-[0.16em] transition-all duration-300 ${
                      band === b.id
                        ? "border-gold bg-gold/15 text-brown"
                        : "border-border text-beige hover:border-gold/50 hover:text-brown"
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Category overview — the full catalogue at a glance */}
        {!selected && !filtering && (
          <section className="border-b border-border py-20 md:py-24">
            <div className="mx-auto max-w-7xl px-6 md:px-10">
              <Reveal>
                <p className="eyebrow mb-4 text-center">
                  {railSections.length} categories · {railSections.reduce((n, s) => n + s.items.length, 0)} items
                </p>
                <h2 className="text-center font-display text-3xl leading-tight text-ivory md:text-5xl">
                  Browse the collection
                </h2>
                <div className="hairline mx-auto mt-6 w-24" />
              </Reveal>

              <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {railSections.map((s, i) => (
                  <li key={s.id}>
                    <Reveal delay={Math.min((i % 3) * 0.08, 0.16)} y={26}>
                      <button
                        type="button"
                        onClick={() => selectCategory(s.id)}
                        className="group relative block w-full overflow-hidden rounded-3xl border border-border text-left transition-all duration-500 will-change-transform hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-[0_40px_80px_-48px_rgba(92,59,34,0.6)]"
                      >
                        <img
                          src={s.image}
                          alt={`${s.title} at Circles Bakery, Sahiwal`}
                          loading="lazy"
                          decoding="async"
                          width={1024}
                          height={768}
                          className="aspect-[4/3] w-full object-cover transition-transform duration-[1.4s] ease-out will-change-transform group-hover:scale-[1.09]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-scrim/85 via-scrim/25 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-6">
                          <p className="font-body text-[10px] uppercase tracking-[0.24em] text-gold-soft">
                            {s.items.length} items
                          </p>
                          <h3 className="mt-2 font-display text-2xl text-cream md:text-3xl">
                            {s.title}
                          </h3>
                          <span className="mt-3 inline-block h-px w-0 bg-gold transition-all duration-500 group-hover:w-16" />
                        </div>
                      </button>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Sections / results */}
        {resultCount === 0 ? (
          <div className="mx-auto max-w-2xl px-6 py-28 text-center md:px-10">
            <h2 className="font-display text-3xl text-ivory">Nothing matched that</h2>
            <p className="mt-4 font-body text-sm font-light text-beige">
              Try another name, or widen the price range.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setBand("all");
              }}
              className="mt-8 rounded-full bg-gold px-8 py-3.5 font-body text-xs uppercase tracking-[0.2em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brown"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <>
            {filtering && (
              <p className="mx-auto max-w-7xl px-6 pt-14 text-center font-body text-xs uppercase tracking-[0.22em] text-beige md:px-10">
                {resultCount} item{resultCount > 1 ? "s" : ""} found
              </p>
            )}
            {visibleSections.map(({ section, items }, i) => (
              <section
                key={section.id}
                id={section.id}
                className={`scroll-mt-[190px] overflow-hidden border-b border-border px-6 py-20 md:px-10 md:py-28 ${
                  i % 2 === 1 ? "bg-charcoal/60" : ""
                }`}
              >
                <SectionHeading section={section} />
                <ProductGrid section={section} items={items} />
              </section>
            ))}
          </>
        )}

        <div className="mx-auto max-w-7xl px-6 py-24 text-center md:px-10">
          <Reveal>
            <p className="mx-auto max-w-xl font-body text-sm font-light leading-relaxed text-beige">
              Planning a celebration or a large order? Reserve a table or reach our team
              and we will design something special for you.
            </p>
            <Link
              to="/"
              hash="reservation"
              className="mt-8 inline-block rounded-full bg-gold px-9 py-4 font-body text-xs uppercase tracking-[0.22em] text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-brown hover:shadow-lg"
            >
              Reserve a Table
            </Link>
          </Reveal>
        </div>
      </main>

      <Footer />
    </>
  );
}

function NavPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`relative shrink-0 snap-start whitespace-nowrap rounded-full border px-5 py-2 font-body text-[11px] uppercase tracking-[0.2em] transition-all duration-300 ${
        active
          ? "border-gold bg-gold text-white shadow-[0_12px_30px_-16px_rgba(200,160,74,0.9)]"
          : "border-border bg-white/60 text-beige hover:-translate-y-0.5 hover:border-gold/55 hover:text-brown hover:shadow-[0_10px_26px_-18px_rgba(92,59,34,0.5)]"
      }`}
    >
      {label}
    </button>
  );
}
