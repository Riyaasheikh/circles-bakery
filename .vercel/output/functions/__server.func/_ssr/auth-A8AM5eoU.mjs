import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CgUy-Nbt.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { s as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-A8AM5eoU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthPage() {
	const navigate = useNavigate();
	const [mode, setMode] = (0, import_react.useState)("signin");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setBusy(true);
		try {
			if (mode === "signup") {
				const { error } = await supabase.auth.signUp({
					email,
					password,
					options: {
						emailRedirectTo: `${window.location.origin}/account`,
						data: { full_name: fullName }
					}
				});
				if (error) throw error;
				toast.success("Account created successfully. Welcome to Circles!");
				navigate({ to: "/account" });
			} else {
				const { error } = await supabase.auth.signInWithPassword({
					email,
					password
				});
				if (error) throw error;
				toast.success("Welcome back!");
				navigate({ to: "/account" });
			}
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Authentication failed");
		} finally {
			setBusy(false);
		}
	};
	const handleGoogle = async () => {
		setBusy(true);
		try {
			const { error } = await supabase.auth.signInWithOAuth({
				provider: "google",
				options: { redirectTo: `${window.location.origin}/account` }
			});
			if (error) throw error;
		} catch (err) {
			toast.error("Google sign-in failed. Please try again.");
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none absolute inset-0 opacity-70",
			style: { background: "radial-gradient(circle at 30% 20%, var(--accent-glow, rgba(255,255,255,0.05)), transparent 55%)" }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				y: 20
			},
			animate: {
				opacity: 1,
				y: 0
			},
			transition: {
				duration: .6,
				ease: [
					.16,
					1,
					.3,
					1
				]
			},
			className: "glass relative w-full max-w-md rounded-2xl border border-foreground/10 bg-background/80 p-8 shadow-2xl backdrop-blur-md md:p-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mb-8 block text-center font-display text-3xl font-semibold tracking-[0.25em] text-foreground transition-opacity hover:opacity-80",
					children: "CIRCLES"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-center font-display text-2xl font-medium text-foreground",
					children: mode === "signin" ? "Welcome back" : "Join Circles"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-center font-body text-sm text-muted-foreground",
					children: mode === "signin" ? "Sign in to manage orders, reservations & rewards." : "Create an account to order, reserve & earn loyalty points."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: handleGoogle,
					disabled: busy,
					className: "mt-8 flex w-full items-center justify-center gap-3 rounded-full border border-foreground/20 bg-transparent py-3 font-body text-sm font-medium text-foreground transition-all hover:border-gold hover:bg-foreground/5 disabled:cursor-not-allowed disabled:opacity-50",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						className: "h-4 w-4",
						viewBox: "0 0 24 24",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								fill: "#4285F4",
								d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								fill: "#34A853",
								d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								fill: "#FBBC05",
								d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								fill: "#EA4335",
								d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
							})
						]
					}), "Continue with Google"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "my-6 flex items-center gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-foreground/15" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-body text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground",
							children: "or"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-foreground/15" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					className: "space-y-4",
					children: [
						mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							placeholder: "Full name",
							value: fullName,
							onChange: (e) => setFullName(e.target.value),
							required: true,
							className: "w-full rounded-lg border border-foreground/20 bg-background/50 px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "email",
							placeholder: "Email address",
							value: email,
							onChange: (e) => setEmail(e.target.value),
							required: true,
							autoComplete: "email",
							className: "w-full rounded-lg border border-foreground/20 bg-background/50 px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "password",
							placeholder: "Password",
							value: password,
							onChange: (e) => setPassword(e.target.value),
							required: true,
							minLength: 6,
							autoComplete: mode === "signin" ? "current-password" : "new-password",
							className: "w-full rounded-lg border border-foreground/20 bg-background/50 px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: busy,
							className: "w-full rounded-full bg-gold py-3.5 font-body text-xs font-semibold uppercase tracking-[0.25em] text-background transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50",
							children: busy ? "Processing…" : mode === "signin" ? "Sign In" : "Create Account"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 text-center font-body text-sm text-muted-foreground",
					children: [
						mode === "signin" ? "New to Circles?" : "Already have an account?",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setMode(mode === "signin" ? "signup" : "signin"),
							className: "font-medium text-gold underline-offset-4 hover:underline",
							children: mode === "signin" ? "Create one" : "Sign in"
						})
					]
				})
			]
		})]
	});
}
//#endregion
export { AuthPage as component };
