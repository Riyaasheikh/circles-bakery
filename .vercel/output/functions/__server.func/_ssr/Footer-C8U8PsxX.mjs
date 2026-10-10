import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as ScrollTrigger, r as gsapWithCSS } from "../_libs/gsap.mjs";
import { a as useScroll, n as useSpring, s as motion, t as useInView } from "../_libs/framer-motion.mjs";
import { t as Lenis } from "../_libs/lenis.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Footer-C8U8PsxX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
gsapWithCSS.registerPlugin(ScrollTrigger);
/**
* Wires Lenis smooth scrolling into the GSAP ticker so ScrollTrigger
* stays perfectly in sync. Disabled when the user prefers reduced motion.
*/
function SmoothScroll() {
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const lenis = new Lenis({
			duration: 1.25,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			smoothWheel: true
		});
		lenis.on("scroll", ScrollTrigger.update);
		const raf = (time) => lenis.raf(time * 1e3);
		gsapWithCSS.ticker.add(raf);
		gsapWithCSS.ticker.lagSmoothing(0);
		return () => {
			gsapWithCSS.ticker.remove(raf);
			lenis.destroy();
		};
	}, []);
	return null;
}
function CustomCursor() {
	const [isHovering, setIsHovering] = (0, import_react.useState)(false);
	const [isVisible, setIsVisible] = (0, import_react.useState)(false);
	const dotRef = (0, import_react.useRef)(null);
	const ringRef = (0, import_react.useRef)(null);
	const pos = (0, import_react.useRef)({
		x: 0,
		y: 0
	});
	const ringPos = (0, import_react.useRef)({
		x: 0,
		y: 0
	});
	const visibleRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (window.matchMedia("(pointer: coarse)").matches) return;
		const move = (e) => {
			if (!visibleRef.current) {
				visibleRef.current = true;
				setIsVisible(true);
			}
			pos.current = {
				x: e.clientX,
				y: e.clientY
			};
			if (dotRef.current) dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
		};
		const onOver = (e) => {
			const target = e.target;
			setIsHovering(!!target.closest("[data-cursor]"));
		};
		window.addEventListener("mousemove", move);
		window.addEventListener("mouseover", onOver);
		let raf;
		const animateRing = () => {
			ringPos.current.x += (pos.current.x - ringPos.current.x) * .18;
			ringPos.current.y += (pos.current.y - ringPos.current.y) * .18;
			if (ringRef.current) ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
			raf = requestAnimationFrame(animateRing);
		};
		raf = requestAnimationFrame(animateRing);
		return () => {
			window.removeEventListener("mousemove", move);
			window.removeEventListener("mouseover", onOver);
			cancelAnimationFrame(raf);
		};
	}, []);
	if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `pointer-events-none fixed inset-0 z-[10000] transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: dotRef,
			className: "absolute left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: ringRef,
			className: `absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-[width,height,border-color,background-color] duration-300 ease-out ${isHovering ? "h-12 w-12 border-gold bg-gold/10" : "h-8 w-8 border-gold/40 bg-transparent"}`,
			children: isHovering && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				viewBox: "0 0 24 24",
				className: "absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-gold",
				fill: "currentColor",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 2c-1.1 0-2 .9-2 2 0 .55.22 1.05.59 1.41C9.65 6.15 9 7.5 9 9v1H7c-1.1 0-2 .9-2 2v2h14v-2c0-1.1-.9-2-2-2h-2V9c0-1.5-.65-2.85-1.59-3.59.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2zm-7 9v8c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-8H5z" })
			})
		})]
	});
}
function ScrollProgress() {
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, {
		stiffness: 120,
		damping: 30,
		mass: .4
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		style: { scaleX },
		className: "fixed left-0 top-0 z-[9998] h-[2px] w-full origin-left bg-gradient-to-r from-transparent via-gold to-gold-soft"
	});
}
var hero_default = "/assets/hero-BHJK0N2d.jpg";
/** Slow, cinematic fade + rise used across sections. */
function Reveal({ children, delay = 0, y = 40, className, once = true }) {
	const ref = (0, import_react.useRef)(null);
	const inView = useInView(ref, {
		once,
		margin: "-12% 0px -12% 0px"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		ref,
		initial: {
			opacity: 0,
			y
		},
		animate: inView ? {
			opacity: 1,
			y: 0
		} : {
			opacity: 0,
			y
		},
		transition: {
			duration: 1.1,
			delay,
			ease: [
				.16,
				1,
				.3,
				1
			]
		},
		className,
		children
	});
}
var m_signature_cakes_default = "/assets/m-signature-cakes-KCtt9uC9.jpg";
var m_pastries_default = "/assets/m-pastries-9uYI6CZz.jpg";
var m_bread_default = "/assets/m-bread-JJ41Bakx.jpg";
var m_coffee_default = "/assets/m-coffee-DSD1G0Mt.jpg";
var m_panini_default = "/assets/m-panini-7Zd9OzTl.jpg";
var m_rolls_platters_default = "/assets/m-rolls-platters-fkiZvFg_.jpg";
var m_eclairs_default = "/assets/m-eclairs-CZlWXwxu.jpg";
var SOCIALS = [
	"Instagram",
	"Facebook",
	"foodpanda",
	"WhatsApp"
];
function Footer() {
	const [email, setEmail] = (0, import_react.useState)("");
	const [done, setDone] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "relative overflow-hidden border-t border-border bg-background px-6 pb-12 pt-24 md:px-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-14 lg:grid-cols-[1.2fr_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-6xl tracking-[0.15em] text-gold-gradient md:text-8xl",
					children: "Circles"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: .1,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-md font-body text-sm font-light leading-relaxed text-beige/80",
						children: "A premium modern bakery, French pâtisserie, café and family dining destination — freshly baked every day in Farid Town, Sahiwal, with warm hospitality in every bite."
					})
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow mb-4",
						children: "Newsletter"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-body text-sm font-light text-beige/80",
						children: "Seasonal collections and private events, to your inbox."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => {
							e.preventDefault();
							if (email) setDone(true);
						},
						className: "mt-6 flex items-center gap-3 border-b border-border pb-3 transition-colors focus-within:border-gold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: email,
							onChange: (e) => setEmail(e.target.value),
							type: "email",
							required: true,
							placeholder: "your@email.com",
							className: "w-full bg-transparent font-body text-sm text-ivory placeholder:text-beige/40 focus:outline-none"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "shrink-0 font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold transition-colors hover:text-brown",
							children: done ? "Thank you ✓" : "Subscribe"
						})]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-9 flex flex-wrap gap-x-6 gap-y-3",
					children: SOCIALS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#",
						className: "font-body text-xs uppercase tracking-[0.2em] text-beige transition-colors hover:text-gold",
						children: s
					}, s))
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-20 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-body text-xs text-beige/80",
					children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" Circles Bakery, Sahiwal. All rights reserved."
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-body text-xs text-beige/80",
					children: "Crafted with patience · Sahiwal, Pakistan"
				})]
			})]
		})
	});
}
//#endregion
export { SmoothScroll as a, m_coffee_default as c, m_pastries_default as d, m_rolls_platters_default as f, ScrollProgress as i, m_eclairs_default as l, Footer as n, hero_default as o, m_signature_cakes_default as p, Reveal as r, m_bread_default as s, CustomCursor as t, m_panini_default as u };
