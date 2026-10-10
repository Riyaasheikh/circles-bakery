import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { d as useRouterState, v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { r as useAuth } from "./router-DcQUqYIl.mjs";
import { C as Croissant, O as ChartColumn, _ as LayoutDashboard, d as Search, g as LogOut, h as Menu, l as ShoppingBag, m as Moon, n as Users, o as Sun, t as X, v as Globe } from "../_libs/lucide-react.mjs";
import { t as _e } from "../_libs/cmdk.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/format-CsDi8mZN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
var Command$1 = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e, {
	ref,
	className: cn("flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground", className),
	...props
}));
Command$1.displayName = _e.displayName;
var CommandDialog = ({ children, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			className: "overflow-hidden p-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Command$1, {
				className: "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5",
				children
			})
		})
	});
};
var CommandInput = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "flex items-center border-b px-3",
	"cmdk-input-wrapper": "",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Input, {
		ref,
		className: cn("flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50", className),
		...props
	})]
}));
CommandInput.displayName = _e.Input.displayName;
var CommandList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.List, {
	ref,
	className: cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className),
	...props
}));
CommandList.displayName = _e.List.displayName;
var CommandEmpty = import_react.forwardRef((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Empty, {
	ref,
	className: "py-6 text-center text-sm",
	...props
}));
CommandEmpty.displayName = _e.Empty.displayName;
var CommandGroup = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
	ref,
	className: cn("overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground", className),
	...props
}));
CommandGroup.displayName = _e.Group.displayName;
var CommandSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Separator, {
	ref,
	className: cn("-mx-1 h-px bg-border", className),
	...props
}));
CommandSeparator.displayName = _e.Separator.displayName;
var CommandItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Item, {
	ref,
	className: cn("relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", className),
	...props
}));
CommandItem.displayName = _e.Item.displayName;
var CommandShortcut = ({ className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("ml-auto text-xs tracking-widest text-muted-foreground", className),
		...props
	});
};
CommandShortcut.displayName = "CommandShortcut";
var ADMIN_NAV = [
	{
		to: "/admin",
		label: "Dashboard",
		icon: LayoutDashboard
	},
	{
		to: "/admin/orders",
		label: "Orders",
		icon: ShoppingBag
	},
	{
		to: "/admin/products",
		label: "Products",
		icon: Croissant
	},
	{
		to: "/admin/customers",
		label: "Customers",
		icon: Users
	},
	{
		to: "/admin/reservations",
		label: "Reservations",
		icon: ChartColumn
	}
];
var THEME_KEY = "circles-admin-theme";
function AdminShell({ title, description, actions, children }) {
	const { user, signOut } = useAuth();
	const navigate = useNavigate();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [dark, setDark] = (0, import_react.useState)(false);
	const [navOpen, setNavOpen] = (0, import_react.useState)(false);
	const [paletteOpen, setPaletteOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const stored = localStorage.getItem(THEME_KEY);
		setDark(stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches);
	}, []);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				setPaletteOpen((o) => !o);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	const toggleTheme = () => {
		setDark((d) => {
			localStorage.setItem(THEME_KEY, d ? "light" : "dark");
			return !d;
		});
	};
	const handleSignOut = async () => {
		await signOut();
		navigate({
			to: "/auth",
			replace: true
		});
	};
	const nav = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		className: "flex flex-col gap-1 p-3",
		children: [ADMIN_NAV.map((item) => {
			const active = item.to === "/admin" ? pathname === "/admin" : pathname.startsWith(item.to);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: item.to,
				onClick: () => setNavOpen(false),
				className: `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${active ? "bg-[var(--a-accent-soft)] text-[var(--a-text)]" : "text-[var(--a-muted)] hover:bg-[var(--a-surface-2)] hover:text-[var(--a-text)]"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {
					size: 16,
					className: active ? "text-[var(--a-accent)]" : ""
				}), item.label]
			}, item.to);
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/",
			className: "mt-2 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[var(--a-muted)] hover:bg-[var(--a-surface-2)] hover:text-[var(--a-text)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { size: 16 }), " View website"]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `admin-root ${dark ? "dark" : ""} min-h-[100svh]`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-[100svh]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "hidden w-60 shrink-0 border-r border-[var(--a-border)] bg-[var(--a-surface)] lg:flex lg:flex-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 border-b border-[var(--a-border)] px-4 py-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Croissant, {
								size: 18,
								className: "text-[var(--a-accent)]"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-semibold tracking-tight text-[var(--a-text)]",
								children: "Circles CRM"
							})]
						}),
						nav,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-auto border-t border-[var(--a-border)] p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate px-3 text-xs text-[var(--a-muted)]",
								children: user?.email
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: handleSignOut,
								className: "mt-2 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--a-muted)] hover:bg-[var(--a-surface-2)] hover:text-[var(--a-text)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { size: 15 }), " Sign out"]
							})]
						})
					]
				}),
				navOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "fixed inset-0 z-50 lg:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						"aria-label": "Close navigation",
						onClick: () => setNavOpen(false),
						className: "absolute inset-0 bg-black/40"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute left-0 top-0 h-full w-64 border-r border-[var(--a-border)] bg-[var(--a-surface)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-[var(--a-border)] px-4 py-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-semibold text-[var(--a-text)]",
								children: "Circles CRM"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setNavOpen(false),
								"aria-label": "Close",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
									size: 16,
									className: "text-[var(--a-muted)]"
								})
							})]
						}), nav]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-1 flex-col bg-[var(--a-bg)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "sticky top-0 z-40 flex items-center gap-3 border-b border-[var(--a-border)] bg-[var(--a-surface)]/85 px-4 py-3 backdrop-blur-md",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setNavOpen(true),
								"aria-label": "Open navigation",
								className: "lg:hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {
									size: 18,
									className: "text-[var(--a-text)]"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setPaletteOpen(true),
								className: "flex h-9 flex-1 items-center gap-2 rounded-lg border border-[var(--a-border)] bg-[var(--a-surface-2)] px-3 text-left text-xs text-[var(--a-muted)] sm:max-w-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 14 }),
									" Jump to…",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
										className: "ml-auto hidden rounded border border-[var(--a-border)] px-1.5 py-0.5 text-[10px] sm:block",
										children: "⌘K"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: toggleTheme,
								"aria-label": "Toggle colour mode",
								className: "ml-auto rounded-lg border border-[var(--a-border)] p-2 text-[var(--a-muted)] hover:text-[var(--a-text)]",
								children: dark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { size: 15 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { size: 15 })
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						className: "flex-1 p-4 sm:p-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto w-full max-w-7xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-2xl font-semibold tracking-tight text-[var(--a-text)]",
									children: title
								}), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-[var(--a-muted)]",
									children: description
								})] }), actions]
							}), children]
						})
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandDialog, {
			open: paletteOpen,
			onOpenChange: setPaletteOpen,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandInput, { placeholder: "Search modules…" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandList, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandEmpty, { children: "No results." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, {
					heading: "Navigate",
					children: ADMIN_NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
						value: item.label,
						onSelect: () => {
							setPaletteOpen(false);
							navigate({ to: item.to });
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {
							size: 15,
							className: "mr-2"
						}), item.label]
					}, item.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandGroup, {
					heading: "Actions",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
						value: "View website",
						onSelect: () => {
							setPaletteOpen(false);
							navigate({ to: "/" });
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, {
							size: 15,
							className: "mr-2"
						}), " View website"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
						value: "Sign out",
						onSelect: handleSignOut,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, {
							size: 15,
							className: "mr-2"
						}), " Sign out"]
					})]
				})
			] })]
		})]
	});
}
/** Shared formatting + status helpers for the admin CRM. */
var money = (n) => `PKR ${Number(n ?? 0).toLocaleString("en-PK", { maximumFractionDigits: 0 })}`;
var shortDate = (iso) => iso ? new Date(iso).toLocaleDateString("en-GB", {
	day: "2-digit",
	month: "short",
	year: "numeric"
}) : "—";
var dateTime = (iso) => iso ? new Date(iso).toLocaleString("en-GB", {
	day: "2-digit",
	month: "short",
	hour: "2-digit",
	minute: "2-digit"
}) : "—";
var TONES = {
	pending: "warning",
	processing: "warning",
	preparing: "warning",
	confirmed: "accent",
	ready: "accent",
	completed: "positive",
	succeeded: "positive",
	cancelled: "danger",
	failed: "danger",
	refunded: "danger"
};
var STYLES = {
	neutral: "bg-[var(--a-surface-2)] text-[var(--a-muted)]",
	positive: "bg-[var(--a-positive)]/12 text-[var(--a-positive)]",
	warning: "bg-[var(--a-warning)]/12 text-[var(--a-warning)]",
	danger: "bg-[var(--a-danger)]/12 text-[var(--a-danger)]",
	accent: "bg-[var(--a-accent-soft)] text-[var(--a-accent)]"
};
function StatusBadge({ status }) {
	const key = (status ?? "").toLowerCase();
	const tone = TONES[key] ?? "neutral";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium capitalize ${STYLES[tone]}`,
		children: key || "—"
	});
}
//#endregion
export { shortDate as a, money as i, StatusBadge as n, dateTime as r, AdminShell as t };
