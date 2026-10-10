import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CgUy-Nbt.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as ScrollTrigger, r as gsapWithCSS, t as ScrollToPlugin } from "../_libs/gsap.mjs";
import { r as useAuth } from "./router-DcQUqYIl.mjs";
import { a as useScroll, c as AnimatePresence, i as useMotionValue, n as useSpring, o as useMotionValueEvent, r as useTransform, s as motion } from "../_libs/framer-motion.mjs";
import { M as ArrowUpRight, r as User } from "../_libs/lucide-react.mjs";
import { a as objectType, i as numberType, o as stringType, r as literalType } from "../_libs/zod.mjs";
import { a as SmoothScroll, c as m_coffee_default, d as m_pastries_default, f as m_rolls_platters_default, i as ScrollProgress, l as m_eclairs_default, n as Footer, o as hero_default, p as m_signature_cakes_default, r as Reveal, s as m_bread_default, t as CustomCursor, u as m_panini_default } from "./Footer-C8U8PsxX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C9KlPoVu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Elegant gold loading screen with a counter and curtain reveal. */
function Loader({ onDone }) {
	const [count, setCount] = (0, import_react.useState)(0);
	const [done, setDone] = (0, import_react.useState)(false);
	const onDoneRef = (0, import_react.useRef)(onDone);
	onDoneRef.current = onDone;
	(0, import_react.useEffect)(() => {
		const start = Date.now();
		const duration = 1900;
		const interval = setInterval(() => {
			const p = Math.min(1, (Date.now() - start) / duration);
			const eased = 1 - Math.pow(1 - p, 3);
			setCount(Math.round(eased * 100));
			if (p >= 1) {
				clearInterval(interval);
				setTimeout(() => {
					setDone(true);
					onDoneRef.current?.();
				}, 350);
			}
		}, 16);
		return () => clearInterval(interval);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: !done && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		className: "fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background",
		exit: { y: "-100%" },
		transition: {
			duration: 1,
			ease: [
				.76,
				0,
				.24,
				1
			]
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: 0,
					letterSpacing: "0.1em"
				},
				animate: {
					opacity: 1,
					letterSpacing: "0.5em"
				},
				transition: {
					duration: 1.4,
					ease: [
						.16,
						1,
						.3,
						1
					]
				},
				className: "font-display text-5xl text-gold-gradient md:text-7xl",
				children: "Circles"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow mt-5 text-beige/70",
				children: "Sahiwal · Pâtisserie"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 h-px w-56 overflow-hidden bg-foreground/10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					className: "h-full bg-gradient-to-r from-gold to-gold-soft",
					initial: { scaleX: 0 },
					animate: { scaleX: count / 100 },
					style: { transformOrigin: "left" },
					transition: { ease: "linear" }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-4 font-body text-xs tracking-[0.3em] text-muted-foreground",
				children: count.toString().padStart(3, "0")
			})
		]
	}) });
}
/** Magnetic hover: the element drifts toward the cursor and springs back. */
function Magnetic({ children, className, strength = .4, style, as = "button", href, onClick, disabled }) {
	const ref = (0, import_react.useRef)(null);
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const sx = useSpring(x, {
		stiffness: 200,
		damping: 18
	});
	const sy = useSpring(y, {
		stiffness: 200,
		damping: 18
	});
	const handleMove = (e) => {
		const el = ref.current;
		if (!el) return;
		const rect = el.getBoundingClientRect();
		x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
		y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
	};
	const reset = () => {
		x.set(0);
		y.set(0);
	};
	const Comp = motion[as];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Comp, {
		ref,
		href,
		onClick,
		disabled,
		onMouseMove: handleMove,
		onMouseLeave: reset,
		style: {
			x: sx,
			y: sy,
			...style
		},
		className,
		children
	});
}
var LINKS = [
	{
		label: "Story",
		href: "#story"
	},
	{
		label: "Collection",
		href: "#collection"
	},
	{
		label: "Experience",
		href: "#experience"
	},
	{
		label: "Gallery",
		href: "#gallery"
	},
	{
		label: "Visit",
		href: "#location"
	}
];
function Navbar() {
	const { scrollY } = useScroll();
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();
	const [hidden, setHidden] = (0, import_react.useState)(false);
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [last, setLast] = (0, import_react.useState)(0);
	useMotionValueEvent(scrollY, "change", (y) => {
		setScrolled(y > 40);
		setHidden(y > last && y > 320 && !open);
		setLast(y);
	});
	const go = (href) => {
		setOpen(false);
		if (typeof window !== "undefined" && window.location.pathname !== "/") navigate({ to: "/" }).then(() => {
			setTimeout(() => {
				document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
			}, 150);
		});
		else document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.header, {
		initial: { y: -120 },
		animate: { y: hidden ? -120 : 0 },
		transition: {
			duration: .6,
			ease: [
				.16,
				1,
				.3,
				1
			]
		},
		className: "fixed inset-x-0 top-0 z-[9000] px-5 pt-4 md:px-10 md:pt-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-3 transition-all duration-500 md:px-8 ${scrolled ? "glass" : "border border-transparent"}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => go("#hero"),
					className: `font-display text-2xl tracking-[0.2em] transition-colors ${scrolled ? "text-foreground" : "text-cream"}`,
					children: "Circles"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "hidden items-center gap-9 lg:flex",
					children: [LINKS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => go(l.href),
						className: `group relative font-body text-xs uppercase tracking-[0.25em] transition-colors hover:text-gold ${scrolled ? "text-beige" : "text-cream/85"}`,
						children: [l.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" })]
					}, l.href)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/menu",
						className: `group relative font-body text-xs uppercase tracking-[0.25em] transition-colors hover:text-gold ${scrolled ? "text-beige" : "text-cream/85"}`,
						children: ["Menu", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: isAuthenticated ? "/account" : "/auth",
							"aria-label": isAuthenticated ? "My account" : "Sign in",
							className: `hidden items-center gap-2 font-body text-xs uppercase tracking-[0.22em] transition-colors hover:text-gold md:flex ${scrolled ? "text-beige" : "text-cream/85"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { size: 15 }), isAuthenticated ? "Account" : "Sign In"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Magnetic, {
							onClick: () => go("#reservation"),
							className: "hidden rounded-full border border-gold/50 px-6 py-2.5 font-body text-xs uppercase tracking-[0.22em] text-gold transition-colors hover:bg-gold hover:text-scrim md:block",
							children: "Reserve"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setOpen((o) => !o),
							"aria-label": "Menu",
							className: "flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-px w-6 transition-all ${scrolled || open ? "bg-foreground" : "bg-cream"}  ${open ? "translate-y-[3.5px] rotate-45" : ""}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-px w-6 transition-all ${scrolled || open ? "bg-foreground" : "bg-cream"}  ${open ? "-translate-y-[3.5px] -rotate-45" : ""}` })]
						})
					]
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		className: "fixed inset-0 z-[8999] flex flex-col items-center justify-center gap-7 bg-background/95 backdrop-blur-xl lg:hidden",
		children: [
			LINKS.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
				initial: {
					opacity: 0,
					y: 20
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: { delay: .05 * i },
				onClick: () => go(l.href),
				className: "font-display text-4xl text-ivory",
				children: l.label
			}, l.href)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/menu",
				onClick: () => setOpen(false),
				className: "font-display text-4xl text-ivory",
				children: "Menu"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: isAuthenticated ? "/account" : "/auth",
				onClick: () => setOpen(false),
				className: "font-display text-4xl text-ivory",
				children: isAuthenticated ? "Account" : "Sign In"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => go("#reservation"),
				className: "mt-4 rounded-full border border-gold px-8 py-3 text-sm uppercase tracking-[0.2em] text-gold",
				children: "Reserve a Table"
			})
		]
	}) })] });
}
var circle2_default = "/assets/circle2-DJKbJ8IM.mp4";
var HEADLINE = ["Freshly Baked", "Every Single Day"];
function Hero() {
	const navigate = useNavigate();
	const ref = (0, import_react.useRef)(null);
	const videoRef = (0, import_react.useRef)(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"]
	});
	const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
	const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
	const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
	const fade = useTransform(scrollYProgress, [0, .7], [1, 0]);
	(0, import_react.useEffect)(() => {
		const video = videoRef.current;
		if (!video) return;
		video.muted = true;
		const playPromise = video.play();
		if (playPromise !== void 0) playPromise.catch((error) => {
			console.warn("Autoplay was prevented by browser:", error);
		});
	}, []);
	const go = (id) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "hero",
		ref,
		className: "relative h-[100svh] overflow-hidden bg-scrim",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				style: {
					y: imgY,
					scale: imgScale
				},
				className: "absolute inset-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
						ref: videoRef,
						src: circle2_default,
						poster: hero_default,
						autoPlay: true,
						loop: true,
						muted: true,
						playsInline: true,
						preload: "auto",
						"aria-label": "Cinematic walkthrough of Circles bakery interior in Sahiwal",
						className: "h-full w-full object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-scrim/80 via-scrim/45 to-scrim/40" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent,rgba(40,26,15,0.6))]" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0",
				children: Array.from({ length: 18 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "animate-floaty absolute block rounded-full bg-gold/40",
					style: {
						left: `${i * 53 % 100}%`,
						top: `${i * 37 % 100}%`,
						width: `${2 + i % 3}px`,
						height: `${2 + i % 3}px`,
						animationDelay: `${i * .4}s`,
						animationDuration: `${6 + i % 5}s`,
						opacity: .2 + i % 4 * .12
					}
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				style: {
					y: textY,
					opacity: fade
				},
				className: "relative z-10 flex h-full flex-col items-center justify-center px-5 text-center sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							delay: .3,
							duration: 1
						},
						className: "eyebrow mb-5 sm:mb-7",
						children: "Sahiwal · Bakery · Pâtisserie · Café & Dining"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "max-w-5xl font-display text-[clamp(2.6rem,13vw,4.5rem)] leading-[0.94] tracking-tight text-cream sm:text-[10vw] md:text-[6.5vw]",
						children: HEADLINE.map((line, li) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
								className: "inline-block",
								initial: { y: "110%" },
								animate: { y: 0 },
								transition: {
									delay: .5 + li * .18,
									duration: 1.1,
									ease: [
										.16,
										1,
										.3,
										1
									]
								},
								children: li === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
									className: "text-gold-gradient not-italic",
									children: line
								}) : line
							})
						}, li))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						initial: { opacity: 0 },
						animate: { opacity: 1 },
						transition: {
							delay: 1.1,
							duration: 1
						},
						className: "mt-6 max-w-xl font-body text-[13px] font-light leading-relaxed text-cream/80 sm:mt-8 sm:text-sm md:text-base",
						children: "Artisan cakes, fresh pastries, live sandwiches, premium coffee and family dining — handcrafted with warmth in the heart of Sahiwal."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							delay: 1.3,
							duration: 1
						},
						className: "mt-9 flex w-full flex-col items-center gap-3.5 sm:mt-11 sm:w-auto sm:flex-row sm:gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Magnetic, {
							onClick: () => go("#reservation"),
							className: "w-full max-w-[20rem] rounded-full bg-gold px-8 py-3.5 font-body text-[11px] uppercase tracking-[0.22em] text-scrim shadow-lg shadow-gold/30 transition-all hover:-translate-y-0.5 hover:bg-gold-soft sm:w-auto sm:px-9 sm:py-4 sm:text-xs sm:tracking-[0.25em]",
							children: "Reserve a Table"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Magnetic, {
							onClick: () => navigate({ to: "/menu" }),
							className: "w-full max-w-[20rem] rounded-full border border-white/20 px-8 py-3.5 font-body text-[11px] uppercase tracking-[0.22em] text-cream backdrop-blur-sm transition-colors hover:border-gold hover:text-gold sm:w-auto sm:px-9 sm:py-4 sm:text-xs sm:tracking-[0.25em]",
							children: "Explore the Menu"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-5 top-24 z-10 hidden h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent lg:block" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-5 bottom-24 z-10 hidden h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent lg:block" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				style: { opacity: fade },
				className: "absolute inset-x-0 bottom-28 z-10 hidden justify-center gap-10 px-6 font-body text-[10px] uppercase tracking-[0.28em] text-cream/60 lg:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Baked fresh daily" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-gold/70",
						children: "·"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "French pâtisserie" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-gold/70",
						children: "·"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Farid Town, Sahiwal" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				style: { opacity: fade },
				className: "absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-body text-[10px] uppercase tracking-[0.35em] text-cream/55",
					children: "Scroll"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative h-12 w-px overflow-hidden bg-white/15",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute left-0 top-0 h-4 w-px bg-gold",
						style: { animation: "scrollDot 2.2s ease-in-out infinite" }
					})
				})]
			})
		]
	});
}
var banner_default = "/assets/banner-BDDyP9Kn.png";
var circles_default = "/assets/circles-Co8nNbYg.mp4";
var STATS = [
	{
		v: "4.4",
		l: "Guest Rating"
	},
	{
		v: "12+",
		l: "Daily Bakes"
	},
	{
		v: "2020",
		l: "Established"
	}
];
function Story() {
	const ref = (0, import_react.useRef)(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"]
	});
	const y1 = useTransform(scrollYProgress, [0, 1], ["-4%", "6%"]);
	const y2 = useTransform(scrollYProgress, [0, 1], ["8%", "-6%"]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "story",
		ref,
		className: "relative overflow-hidden bg-background px-6 py-20 md:px-10 md:py-44",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-24",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative order-2 pb-8 lg:order-1 lg:pb-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					style: { y: y1 },
					className: "gold-ring relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-charcoal-light shadow-2xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
						src: circles_default,
						autoPlay: true,
						loop: true,
						muted: true,
						playsInline: true,
						className: "h-full w-full object-cover"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					style: { y: y2 },
					className: "gold-ring absolute -bottom-4 right-2 aspect-square w-32 overflow-hidden rounded-sm border border-gold/40 shadow-2xl sm:-bottom-8 sm:right-0 sm:w-44 md:-bottom-10 md:-right-4 md:w-56",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: banner_default,
						alt: "Artisan sourdough crust dusted with gold",
						loading: "lazy",
						className: "h-full w-full object-cover"
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "order-1 lg:order-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow mb-4 sm:mb-6",
						children: "The House of Circles"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: .1,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-display text-3xl leading-[1.1] text-ivory sm:text-4xl md:text-6xl md:leading-[1.08]",
							children: [
								"A devotion to the",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-gold-gradient",
									children: "art of patience"
								}),
								", baked fresh at dawn."
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: .2,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-lg font-body text-sm font-light leading-relaxed text-beige/70 sm:mt-8 md:text-base",
							children: "From custom celebration cakes to delicate French pastries, premium coffee and gourmet dining — every creation at Circles is a quiet act of craftsmanship. We source rare ingredients, temper chocolate by hand, and let time do what time does best."
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: .3,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10 grid grid-cols-3 gap-4 border-t border-border pt-8 sm:mt-12 sm:gap-6",
							children: STATS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display text-3xl text-gold sm:text-4xl md:text-5xl",
								children: s.v
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 font-body text-[10px] uppercase tracking-[0.2em] text-beige/60 sm:text-[11px]",
								children: s.l
							})] }, s.l))
						})
					})
				]
			})]
		})
	});
}
function CategoryCard({ n, title, desc, img, tags = [], category, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/menu",
		search: { c: category },
		"aria-label": `View ${title} on the menu`,
		"data-cursor": true,
		className: `group relative block overflow-hidden rounded-2xl border border-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${className}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: img,
				alt: title,
				loading: "lazy",
				width: 1024,
				height: 1280,
				className: "h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-scrim via-scrim/30 to-transparent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 flex flex-col justify-between p-5 sm:p-7",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-2xl text-gold/80",
						children: n
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
						className: "h-5 w-5 translate-y-1 text-gold opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100",
						"aria-hidden": "true"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-2xl text-cream sm:text-3xl md:text-4xl",
						children: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-xs font-body text-xs font-light text-cream/75 sm:text-sm",
						children: desc
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex flex-wrap gap-2 overflow-hidden sm:mt-5",
						children: tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "translate-y-3 rounded-full border border-gold/30 px-3 py-1 font-body text-[10px] uppercase tracking-[0.18em] text-gold opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100",
							children: tag
						}, tag))
					})
				] })]
			})
		]
	});
}
var ITEMS = [
	{
		n: "01",
		t: "Signature Cakes",
		img: m_signature_cakes_default,
		c: "signature-cakes",
		d: "Custom celebration & birthday cakes, layered to order.",
		tags: [
			"Custom",
			"Birthday",
			"Premium"
		]
	},
	{
		n: "02",
		t: "Fresh Pastries",
		img: m_pastries_default,
		c: "pastries-desserts",
		d: "Croissants, danishes & cookies, baked fresh every morning.",
		tags: [
			"Croissants",
			"Danish",
			"Daily"
		]
	},
	{
		n: "03",
		t: "Special Breads",
		img: m_bread_default,
		c: "artisan-bread",
		d: "Slow-proofed sourdough, baguettes & milk bread.",
		tags: [
			"Sourdough",
			"Baguette",
			"Daily"
		]
	},
	{
		n: "04",
		t: "Premium Coffee",
		img: m_coffee_default,
		c: "coffee",
		d: "Freshly brewed espresso, lattes & velvet milk art.",
		tags: [
			"Espresso",
			"Latte",
			"Cozy"
		]
	},
	{
		n: "05",
		t: "Live Sandwiches",
		img: m_panini_default,
		c: "panini",
		d: "Made-to-order paninis pressed at the live counter.",
		tags: [
			"Live",
			"Fresh",
			"Made to Order"
		]
	},
	{
		n: "06",
		t: "Rolls & Platters",
		img: m_rolls_platters_default,
		c: "rolls-platters",
		d: "Shawarma rolls, platters & family favourites.",
		tags: [
			"Rolls",
			"Platters",
			"Family"
		]
	}
];
gsapWithCSS.registerPlugin(ScrollTrigger, ScrollToPlugin);
function Collection() {
	const sectionRef = (0, import_react.useRef)(null);
	const trackRef = (0, import_react.useRef)(null);
	const scrollTriggerRef = (0, import_react.useRef)(null);
	const [canScrollLeft, setCanScrollLeft] = (0, import_react.useState)(false);
	const [canScrollRight, setCanScrollRight] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const matchMedia = gsapWithCSS.matchMedia();
		matchMedia.add("(min-width: 1024px)", () => {
			const track = trackRef.current;
			const section = sectionRef.current;
			if (!track || !section) return;
			const getScrollAmount = () => track.scrollWidth - window.innerWidth + 120;
			const st = ScrollTrigger.create({
				trigger: section,
				start: "top top",
				end: () => `+=${getScrollAmount()}`,
				scrub: 1,
				pin: true,
				invalidateOnRefresh: true,
				onUpdate: (self) => {
					gsapWithCSS.set(track, { x: -self.progress * getScrollAmount() });
					setCanScrollLeft(self.progress > .01);
					setCanScrollRight(self.progress < .99);
				}
			});
			scrollTriggerRef.current = st;
		});
		return () => matchMedia.revert();
	}, []);
	const handleNext = () => {
		const st = scrollTriggerRef.current;
		if (!st) return;
		const step = 1 / (ITEMS.length - 1);
		const targetProgress = Math.min(1, Math.round((st.progress + step) / step) * step);
		const targetY = st.start + targetProgress * (st.end - st.start);
		gsapWithCSS.to(window, {
			scrollTo: targetY,
			duration: .6,
			ease: "power2.out"
		});
	};
	const handlePrev = () => {
		const st = scrollTriggerRef.current;
		if (!st) return;
		const step = 1 / (ITEMS.length - 1);
		const targetProgress = Math.max(0, Math.round((st.progress - step) / step) * step);
		const targetY = st.start + targetProgress * (st.end - st.start);
		gsapWithCSS.to(window, {
			scrollTo: targetY,
			duration: .6,
			ease: "power2.out"
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "collection",
		ref: sectionRef,
		className: "relative w-full max-w-full bg-background border-t border-border overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "block lg:hidden px-5 py-16 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow mb-2",
						children: "The Signature Collection"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-3xl leading-tight text-foreground",
						children: ["Six houses of craft, ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-gold-gradient",
							children: "one address."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-body text-xs leading-relaxed text-beige/80",
						children: "Tap a house to explore its full menu — baked fresh every morning in Farid Town, Sahiwal."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-5",
				children: ITEMS.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/menu",
					search: { c: it.c },
					className: "group overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:border-gold/40",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-[16/10] w-full overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: it.img,
							alt: it.t,
							className: "h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs font-semibold text-gold",
									children: it.n
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex gap-1.5",
									children: it.tags.slice(0, 2).map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-full bg-stone-100 px-2.5 py-0.5 text-[10px] font-medium text-beige",
										children: tag
									}, tag))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-2 font-display text-2xl text-foreground group-hover:text-gold transition-colors",
								children: it.t
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-body text-xs leading-relaxed text-beige/80",
								children: it.d
							})
						]
					})]
				}, it.n))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "hidden lg:flex lg:h-screen lg:flex-col lg:justify-between lg:py-14",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-12 xl:px-16 flex items-end justify-between z-30",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow mb-2",
							children: "The Signature Collection"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: .1,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "font-display text-4xl xl:text-5xl leading-tight text-foreground",
								children: ["Six houses of craft, ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-gold-gradient",
									children: "one address."
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: .18,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-body text-sm font-light text-beige/80 max-w-md",
								children: "Tap a house to explore its full menu — baked fresh every morning in Farid Town, Sahiwal."
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: handlePrev,
						disabled: !canScrollLeft,
						"aria-label": "Previous items",
						className: "flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-border bg-white text-foreground shadow-sm transition-all duration-300 hover:border-gold hover:text-gold hover:shadow-md disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-border disabled:hover:text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							width: "20",
							height: "20",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19 12H5M12 19l-7-7 7-7" })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: handleNext,
						disabled: !canScrollRight,
						"aria-label": "Next items",
						className: "flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-border bg-white text-foreground shadow-sm transition-all duration-300 hover:border-gold hover:text-gold hover:shadow-md disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-border disabled:hover:text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							width: "20",
							height: "20",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M5 12h14M12 5l7 7-7 7" })
						})
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-full overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					ref: trackRef,
					className: "flex gap-8 px-12 xl:px-16",
					children: ITEMS.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryCard, {
						n: it.n,
						title: it.t,
						desc: it.d,
						img: it.img,
						tags: it.tags,
						category: it.c,
						className: "h-[48vh] w-[30vw] shrink-0 xl:h-[52vh] xl:w-[25vw] transition-transform duration-300 hover:-translate-y-2"
					}, it.n))
				})
			})]
		})]
	});
}
var ambiance_default = "/assets/hero-BHJK0N2d.jpg";
var EXP = [
	{
		t: "Modern Bakery",
		d: "An open counter of breads, cakes and pastries pulled warm from the oven all day."
	},
	{
		t: "Live Sandwiches",
		d: "Made-to-order sandwiches built on freshly baked buns at our live counter."
	},
	{
		t: "Coffee & Café",
		d: "Freshly brewed espresso and lattes to enjoy in a warm, welcoming space."
	},
	{
		t: "Family Dining",
		d: "Burgers, pizza and fast food — a relaxed, family-friendly table for everyone."
	}
];
function Experience() {
	const [active, setActive] = (0, import_react.useState)(0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "experience",
		className: "relative overflow-hidden bg-background px-6 py-28 md:px-10 md:py-40",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none absolute inset-0 opacity-50",
			style: { background: "radial-gradient(circle at 80% 20%, var(--accent-glow), transparent 55%)" }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow mb-6",
					children: "The Experience"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: .1,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-4xl leading-tight text-ivory md:text-6xl",
						children: ["Where every bake becomes ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-gold-gradient",
							children: "a ritual."
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 divide-y divide-border border-y border-border",
					children: EXP.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onMouseEnter: () => setActive(i),
						onClick: () => setActive(i),
						className: "group flex w-full items-center justify-between gap-6 py-6 text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: `font-display text-2xl transition-colors md:text-3xl ${active === i ? "text-gold" : "text-ivory/85"}`,
							children: e.t
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
							initial: false,
							animate: {
								height: active === i ? "auto" : 0,
								opacity: active === i ? 1 : 0,
								marginTop: active === i ? 10 : 0
							},
							className: "overflow-hidden font-body text-sm font-light text-beige/70",
							children: e.d
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `font-display text-xl transition-all ${active === i ? "rotate-45 text-gold" : "text-beige/40"}`,
							children: "+"
						})]
					}, e.t))
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: .2,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "gold-ring relative aspect-[3/4] overflow-hidden rounded-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: ambiance_default,
							alt: "Warm, family-friendly bakery café interior at Circles",
							loading: "lazy",
							width: 1104,
							height: 1408,
							className: "h-full w-full object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-scrim/85 to-transparent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute bottom-8 left-8 right-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-3xl text-cream",
								children: EXP[active].t
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hairline mt-4 w-24" })]
						})
					]
				})
			})]
		})]
	});
}
var cat_desserts_default = "/assets/cat-desserts-BOLvWdF3.jpg";
function ChefHighlight() {
	const ref = (0, import_react.useRef)(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"]
	});
	const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
	const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		ref,
		className: "relative h-[90vh] overflow-hidden md:h-screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			style: {
				y,
				scale
			},
			className: "absolute inset-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: cat_desserts_default,
					alt: "Chef's signature chocolate composition",
					loading: "lazy",
					width: 1008,
					height: 1200,
					className: "h-full w-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-scrim/45" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-scrim via-scrim/45 to-transparent" })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative z-10 flex h-full items-center px-6 md:px-16",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow mb-6",
						children: "Signature Bake"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: .1,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-display text-5xl leading-[1.05] text-cream md:text-7xl",
							children: ["Classic", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-gold-gradient",
								children: "Chocolate Cake"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: .2,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-7 font-body text-sm font-light leading-relaxed text-cream/85 md:text-base",
							children: "Rich layers of moist chocolate sponge and silky chocolate cream, baked fresh daily — our most-loved cake and the heart of every Circles celebration."
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: .3,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-9 flex items-center gap-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-4xl text-gold",
									children: "Rs 1,800"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hairline w-16" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-body text-xs uppercase tracking-[0.2em] text-cream/60",
									children: "Made Fresh Daily"
								})
							]
						})
					})
				]
			})
		})]
	});
}
var IMAGES = [
	{
		src: "/assets/g-interior-Cmrs7rf8.jpg",
		alt: "The Circles bakery counter in warm morning light",
		span: "row-span-2"
	},
	{
		src: m_signature_cakes_default,
		alt: "Signature layered celebration cake"
	},
	{
		src: m_coffee_default,
		alt: "Freshly poured latte with milk art"
	},
	{
		src: m_bread_default,
		alt: "Artisan sourdough with a crackling crust"
	},
	{
		src: "/assets/g-celebration-BiEQpWWG.jpg",
		alt: "A family celebrating around a tiered cake",
		span: "row-span-2"
	},
	{
		src: "/assets/g-counter-pgEIsp5h.jpg",
		alt: "Baker arranging fresh croissants on a wooden tray"
	},
	{
		src: m_pastries_default,
		alt: "Tray of fresh French pastries"
	},
	{
		src: m_eclairs_default,
		alt: "Hand-piped éclairs on a marble slab"
	},
	{
		src: m_panini_default,
		alt: "Artisan gourmet sandwich",
		desktopOnly: true
	},
	{
		src: m_rolls_platters_default,
		alt: "Platter of fresh bakery specialties",
		desktopOnly: true
	}
];
function Gallery() {
	const [open, setOpen] = (0, import_react.useState)(null);
	const close = (0, import_react.useCallback)(() => setOpen(null), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "gallery",
		className: "bg-background border-t border-border px-6 py-24 md:px-10 md:py-36",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow mb-4",
					children: "The Gallery"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: .1,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-4xl text-ivory md:text-6xl",
						children: ["Moments, ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-gold-gradient",
							children: "captured."
						})]
					})
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: .2,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-xs font-body text-sm font-light text-beige/80",
						children: "A glimpse into our kitchen, our counter and the tables where it all comes together."
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid auto-rows-[220px] grid-cols-2 gap-4 md:grid-cols-4 md:auto-rows-[260px]",
				children: IMAGES.map((img, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
					onClick: () => setOpen(i),
					"data-cursor": true,
					initial: {
						opacity: 0,
						scale: .95
					},
					whileInView: {
						opacity: 1,
						scale: 1
					},
					viewport: {
						once: true,
						margin: "-10%"
					},
					transition: {
						duration: .9,
						delay: i % 4 * .08,
						ease: [
							.16,
							1,
							.3,
							1
						]
					},
					className: `group relative overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-300 hover:shadow-lg ${img.span ?? ""} ${img.desktopOnly ? "hidden md:block" : ""}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: img.src,
							alt: img.alt,
							loading: "lazy",
							className: "h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-scrim/0 transition-colors duration-500 group-hover:bg-scrim/30" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute bottom-4 left-4 translate-y-3 rounded-full bg-white/90 px-3.5 py-1 font-body text-[10px] font-medium uppercase tracking-[0.2em] text-brown opacity-0 shadow-md backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100",
							children: "View"
						})
					]
				}, i))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			onClick: close,
			className: "fixed inset-0 z-[9500] flex items-center justify-center bg-scrim/95 p-6 backdrop-blur-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
				initial: {
					scale: .9,
					opacity: 0
				},
				animate: {
					scale: 1,
					opacity: 1
				},
				exit: {
					scale: .9,
					opacity: 0
				},
				transition: {
					duration: .5,
					ease: [
						.16,
						1,
						.3,
						1
					]
				},
				src: IMAGES[open].src,
				alt: IMAGES[open].alt,
				className: "max-h-[85vh] max-w-[90vw] rounded-sm object-contain gold-ring"
			}, open), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: close,
				className: "absolute right-8 top-8 font-body text-xs uppercase tracking-[0.25em] text-beige/70 hover:text-gold",
				children: "Close"
			})]
		}) })]
	});
}
var REVIEWS = [
	{
		q: "Something good and amazing Sahiwal has now. Really nice live sandwich with freshly baked buns of your choice. Best and tasty biscuits.",
		n: "Muhammad Umer Tahir",
		m: "Local Guide · 234 reviews"
	},
	{
		q: "Tried many cakes — all were excellent. The chocolate cake is unreal and the pastries melt the moment they touch you.",
		n: "Ayesha K.",
		m: "Verified Visit"
	},
	{
		q: "Freshly baked every day and it shows. The coffee experience alone is worth the trip across town.",
		n: "Hamza R.",
		m: "Regular Guest"
	},
	{
		q: "Custom birthday cake was beyond beautiful. Family-friendly service and an ambiance that feels genuinely premium.",
		n: "Sana M.",
		m: "Celebration Order"
	},
	{
		q: "The cakes and desserts are a delight, and the family dining is warm and welcoming. A real gem in Sahiwal.",
		n: "Bilal A.",
		m: "Local Guide · 88 reviews"
	}
];
function Card({ q, n, m }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass mx-3 flex w-[300px] shrink-0 flex-col justify-between rounded-sm p-8 md:w-[400px]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-display text-6xl leading-none text-gold/50",
				children: "“"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "-mt-4 font-display text-xl font-light leading-relaxed text-ivory/90 md:text-2xl",
				children: q
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hairline mb-4 w-12" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-body text-sm text-brown",
						children: n
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-body text-xs tracking-wide text-beige",
						children: m
					})
				]
			})
		]
	});
}
function Testimonials() {
	const loop = [...REVIEWS, ...REVIEWS];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "overflow-hidden bg-background py-28 md:py-40",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-6 md:px-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto mb-16 max-w-7xl text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow mb-5",
							children: "In Their Words"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: .1,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "font-display text-4xl text-ivory md:text-6xl",
								children: ["Loved across ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-gold-gradient",
									children: "Sahiwal."
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: .2,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 font-body text-sm text-beige/60",
								children: "4.4 ★ from 55 reviews on Google"
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "group relative flex w-max animate-[marquee_42s_linear_infinite] [animation-play-state:running] hover:[animation-play-state:paused]",
				children: loop.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { ...r }, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `@keyframes marquee { to { transform: translateX(-50%) } }` })
		]
	});
}
var GUESTS = [
	"1",
	"2",
	"3",
	"4",
	"5",
	"6+"
];
var reservationSchema = objectType({
	full_name: stringType().trim().min(1, "Please enter your name").max(100),
	phone: stringType().trim().min(6, "Please enter a valid phone number").max(30),
	reservation_date: stringType().min(1, "Please pick a date"),
	reservation_time: stringType().min(1, "Please pick a time"),
	party_size: numberType().int().min(1).max(20),
	occasion: stringType().trim().max(120).optional().or(literalType(""))
});
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "group block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-body text-[11px] font-medium uppercase tracking-[0.22em] text-beige",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2 border-b border-border pb-2.5 transition-colors focus-within:border-gold",
			children
		})]
	});
}
var inputCls = "w-full bg-transparent font-body text-ivory placeholder:text-beige/40 focus:outline-none [color-scheme:light]";
function Reservation() {
	const [guests, setGuests] = (0, import_react.useState)("2");
	const [sent, setSent] = (0, import_react.useState)(false);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)({
		full_name: "",
		phone: "",
		reservation_date: "",
		reservation_time: "",
		occasion: ""
	});
	const update = (key) => (e) => setForm((f) => ({
		...f,
		[key]: e.target.value
	}));
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		const partySize = guests === "6+" ? 6 : parseInt(guests, 10);
		const parsed = reservationSchema.safeParse({
			...form,
			party_size: partySize
		});
		if (!parsed.success) {
			setError(parsed.error.issues[0]?.message ?? "Please check your details.");
			return;
		}
		setSubmitting(true);
		try {
			const { data: userData } = await supabase.auth.getUser();
			const { error: insertError } = await supabase.from("reservations").insert({
				full_name: parsed.data.full_name,
				phone: parsed.data.phone,
				reservation_date: parsed.data.reservation_date,
				reservation_time: parsed.data.reservation_time,
				party_size: parsed.data.party_size,
				occasion: parsed.data.occasion || null,
				user_id: userData.user?.id ?? null
			});
			if (insertError) throw insertError;
			setSent(true);
		} catch (err) {
			console.error("Reservation failed", err);
			setError("Something went wrong. Please try again or call us directly.");
		} finally {
			setSubmitting(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "reservation",
		className: "relative bg-background border-t border-border px-6 py-24 md:px-10 md:py-36",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none absolute inset-0 opacity-40",
			style: { background: "radial-gradient(circle at 20% 30%, var(--accent-glow), transparent 50%)" }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto grid max-w-6xl gap-16 lg:grid-cols-[0.9fr_1.1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow mb-6",
					children: "Reservations"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: .1,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-4xl leading-tight text-ivory md:text-6xl",
						children: ["Reserve your ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-gold-gradient",
							children: "table."
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: .2,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-7 max-w-md font-body text-sm font-light leading-relaxed text-beige/80",
						children: "Join us for breakfast, fresh pastries, afternoon coffee or family dining. For celebration cakes and large parties, share the details and our team will be in touch."
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: .3,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 space-y-3 font-body text-sm text-beige/80",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Open daily · Closes 1:00 AM" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-gold font-medium",
							children: "+92 310 1111532"
						})]
					})
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: .2,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
					onSubmit: handleSubmit,
					className: "rounded-3xl border border-border bg-white p-8 shadow-lg md:p-10",
					children: sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							scale: .95
						},
						animate: {
							opacity: 1,
							scale: 1
						},
						className: "flex min-h-[360px] flex-col items-center justify-center text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-5xl text-gold",
							children: "Merci."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-xs font-body text-sm text-beige/80",
							children: "Your request has been received. We'll confirm your reservation shortly."
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-7",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-7 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Full Name",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: inputCls,
										placeholder: "Your name",
										value: form.full_name,
										onChange: update("full_name"),
										required: true
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Phone",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: inputCls,
										placeholder: "+92 …",
										value: form.phone,
										onChange: update("phone"),
										required: true
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-7 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Date",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "date",
										className: inputCls,
										value: form.reservation_date,
										onChange: update("reservation_date"),
										required: true
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Time",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "time",
										className: inputCls,
										value: form.reservation_time,
										onChange: update("reservation_time"),
										required: true
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-body text-[11px] font-medium uppercase tracking-[0.22em] text-beige",
								children: "Guests"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 flex flex-wrap gap-2",
								children: GUESTS.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setGuests(g),
									"aria-pressed": guests === g,
									"aria-label": `${g} guests`,
									className: `h-11 w-11 rounded-full border font-body text-sm font-medium transition-all ${guests === g ? "border-gold bg-gold text-white shadow-sm" : "border-border bg-stone-50 text-beige hover:border-gold/60 hover:text-brown"}`,
									children: g
								}, g))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Occasion (optional)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: inputCls,
									placeholder: "Birthday, anniversary…",
									value: form.occasion,
									onChange: update("occasion")
								})
							}),
							error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								role: "alert",
								className: "font-body text-sm text-red-500 font-medium",
								children: error
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Magnetic, {
								as: "button",
								strength: .2,
								disabled: submitting,
								style: {
									display: "block",
									width: "100%"
								},
								className: "mt-3 w-full rounded-full bg-gold py-4 font-body text-xs font-semibold uppercase tracking-[0.25em] text-white shadow-md transition-all hover:bg-brown hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60",
								children: submitting ? "Sending…" : "Request Reservation"
							})
						]
					})
				})
			})]
		})]
	});
}
var CARDS = [
	{
		t: "Visit",
		lines: [
			"66-C, Farid Town",
			"Sahiwal, 57000",
			"Pakistan"
		],
		cta: {
			label: "Get Directions",
			href: "https://maps.google.com/?q=Circles+Bakery+Farid+Town+Sahiwal"
		}
	},
	{
		t: "Hours",
		lines: [
			"Open daily",
			"Until 1:00 AM",
			"Dine-in · Drive-through · Delivery"
		]
	},
	{
		t: "Contact",
		lines: ["+92 310 1111532", "Order via foodpanda.pk"],
		cta: {
			label: "WhatsApp Us",
			href: "https://wa.me/923101111532"
		}
	}
];
function Location() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "location",
		className: "bg-background px-6 py-28 md:px-10 md:py-40",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-14 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow mb-5",
					children: "Find Us"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: .1,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-4xl text-ivory md:text-6xl",
						children: ["The heart of ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-gold-gradient",
							children: "Sahiwal."
						})]
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-[1.4fr_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "gold-ring relative h-[340px] overflow-hidden rounded-sm border border-border lg:h-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
						title: "Circles Bakery location map",
						src: "https://www.google.com/maps?q=Circles+Bakery+Farid+Town+Sahiwal&output=embed",
						className: "h-full w-full grayscale-[0.2] contrast-[1.05]",
						loading: "lazy",
						referrerPolicy: "no-referrer-when-downgrade"
					})
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-6",
					children: CARDS.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: i * .1,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass flex h-full flex-col justify-between rounded-sm p-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-2xl text-gold",
									children: c.t
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hairline my-4 w-12" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-1 font-body text-sm font-light text-beige/75",
									children: c.lines.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: l }, l))
								})
							] }), c.cta && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: c.cta.href,
								target: "_blank",
								rel: "noreferrer",
								className: "mt-6 inline-block font-body text-xs uppercase tracking-[0.22em] text-ivory transition-colors hover:text-gold",
								children: [c.cta.label, " →"]
							})]
						})
					}, c.t))
				})]
			})]
		})
	});
}
function Index() {
	const [loaded, setLoaded] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { onDone: () => setLoaded(true) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmoothScroll, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomCursor, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollProgress, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: loaded ? "" : "pointer-events-none",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Story, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Experience, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChefHighlight, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gallery, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Testimonials, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reservation, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Location, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
			]
		})
	] });
}
//#endregion
export { Index as component };
