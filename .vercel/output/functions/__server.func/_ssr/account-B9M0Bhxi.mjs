import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CgUy-Nbt.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as useAuth } from "./router-DcQUqYIl.mjs";
import { s as motion } from "../_libs/framer-motion.mjs";
import { g as LogOut, k as Calendar, l as ShoppingBag, s as Star, u as ShieldCheck } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account-B9M0Bhxi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AccountPage() {
	const { user, isStaff, signOut } = useAuth();
	const navigate = useNavigate();
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [reservations, setReservations] = (0, import_react.useState)(0);
	const [orders, setOrders] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		(async () => {
			const [{ data: p }, { count: rc }, { count: oc }] = await Promise.all([
				supabase.from("profiles").select("full_name, email, phone, loyalty_points, lifetime_spend").eq("id", user.id).maybeSingle(),
				supabase.from("reservations").select("id", {
					count: "exact",
					head: true
				}).eq("user_id", user.id),
				supabase.from("orders").select("id", {
					count: "exact",
					head: true
				}).eq("user_id", user.id)
			]);
			setProfile(p);
			setReservations(rc ?? 0);
			setOrders(oc ?? 0);
		})();
	}, [user]);
	const handleSignOut = async () => {
		await signOut();
		toast.success("Signed out");
		navigate({ to: "/" });
	};
	const stats = [
		{
			icon: Star,
			label: "Loyalty Points",
			value: profile?.loyalty_points ?? 0
		},
		{
			icon: ShoppingBag,
			label: "Orders",
			value: orders
		},
		{
			icon: Calendar,
			label: "Reservations",
			value: reservations
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-[100svh] bg-background px-6 py-16 md:px-10 md:py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-4xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "font-display text-2xl tracking-[0.2em] text-foreground",
						children: "Circles"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-display text-4xl text-ivory md:text-5xl",
						children: profile?.full_name ? `Hello, ${profile.full_name.split(" ")[0]}` : "My Account"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleSignOut,
						className: "inline-flex items-center gap-2 rounded-full border border-foreground/20 px-5 py-2.5 font-body text-xs uppercase tracking-[0.2em] text-beige transition-colors hover:border-gold hover:text-gold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { size: 15 }), " Sign out"]
					})]
				}),
				isStaff && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/admin",
					className: "mt-8 flex items-center gap-3 rounded-xl border border-gold/40 bg-gold/5 px-5 py-4 font-body text-sm text-gold transition-colors hover:bg-gold/10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 18 }), " Open Admin Dashboard"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid gap-4 sm:grid-cols-3",
					children: stats.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 16
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							delay: i * .08,
							duration: .5
						},
						className: "glass rounded-xl p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, {
								className: "text-gold",
								size: 22
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 font-display text-3xl text-ivory",
								children: s.value
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-body text-xs uppercase tracking-[0.15em] text-beige/60",
								children: s.label
							})
						]
					}, s.label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass mt-6 rounded-xl p-6 md:p-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl text-ivory",
						children: "Profile"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-5 grid gap-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
								label: "Name",
								value: profile?.full_name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
								label: "Email",
								value: profile?.email ?? user?.email
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
								label: "Phone",
								value: profile?.phone
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
								label: "Lifetime spend",
								value: profile ? `Rs ${Number(profile.lifetime_spend).toLocaleString()}` : "—"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/menu",
						className: "rounded-full bg-gold px-7 py-3 font-body text-xs uppercase tracking-[0.2em] text-scrim transition-colors hover:bg-gold-soft",
						children: "Order from menu"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						hash: "reservation",
						className: "rounded-full border border-foreground/20 px-7 py-3 font-body text-xs uppercase tracking-[0.2em] text-beige transition-colors hover:border-gold hover:text-gold",
						children: "Book a table"
					})]
				})
			]
		})
	});
}
function Detail({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "font-body text-[11px] uppercase tracking-[0.2em] text-beige/50",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "mt-1 font-body text-sm text-ivory",
		children: value || "—"
	})] });
}
//#endregion
export { AccountPage as component };
