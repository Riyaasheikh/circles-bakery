import { t as supabase } from "./client-CgUy-Nbt.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { A as CalendarCheck, i as TrendingUp, l as ShoppingBag, n as Users } from "../_libs/lucide-react.mjs";
import { i as money, n as StatusBadge, r as dateTime, t as AdminShell } from "./format-CsDi8mZN.mjs";
import { a as Area, c as ResponsiveContainer, i as XAxis, l as Tooltip, n as BarChart, o as CartesianGrid, r as YAxis, s as Bar, t as AreaChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-C7IPfyFu.js
var import_jsx_runtime = require_jsx_runtime();
function useDashboard() {
	return useQuery({
		queryKey: ["admin", "dashboard"],
		queryFn: async () => {
			const [orders, payments, items, reservations, customers] = await Promise.all([
				supabase.from("orders").select("id, order_number, customer_name, total, status, created_at").order("created_at", { ascending: false }).limit(500),
				supabase.from("payments").select("amount, status, created_at").limit(1e3),
				supabase.from("order_items").select("product_name, quantity, unit_price").limit(2e3),
				supabase.from("reservations").select("id, status, reservation_date").limit(1e3),
				supabase.from("profiles").select("id", {
					count: "exact",
					head: true
				})
			]);
			if (orders.error) throw orders.error;
			return {
				orders: orders.data ?? [],
				payments: payments.data ?? [],
				items: items.data ?? [],
				reservations: reservations.data ?? [],
				customerCount: customers.count ?? 0
			};
		}
	});
}
function StatCard({ icon: Icon, label, value, sub, loading }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-[var(--a-border)] bg-[var(--a-surface)] p-4 shadow-[0_1px_2px_rgba(16,20,24,0.05)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-wider text-[var(--a-muted)]",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					size: 16,
					className: "text-[var(--a-accent)]"
				})]
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-3 h-7 w-24 animate-pulse rounded bg-[var(--a-surface-2)]" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-2xl font-semibold tracking-tight text-[var(--a-text)]",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-[var(--a-muted)]",
				children: sub
			})
		]
	});
}
function DashboardPage() {
	const { data, isLoading } = useDashboard();
	const orders = data?.orders ?? [];
	const revenue = (data?.payments ?? []).filter((p) => p.status === "succeeded").reduce((s, p) => s + Number(p.amount ?? 0), 0);
	const pipeline = orders.filter((o) => !["cancelled", "refunded"].includes(o.status)).reduce((s, o) => s + Number(o.total ?? 0), 0);
	const pendingOrders = orders.filter((o) => o.status === "pending").length;
	const pendingRes = (data?.reservations ?? []).filter((r) => r.status === "pending").length;
	const days = Array.from({ length: 14 }, (_, i) => {
		const d = /* @__PURE__ */ new Date();
		d.setDate(d.getDate() - (13 - i));
		const key = d.toISOString().slice(0, 10);
		const dayOrders = orders.filter((o) => o.created_at.slice(0, 10) === key);
		return {
			day: d.toLocaleDateString("en-GB", {
				day: "2-digit",
				month: "short"
			}),
			value: dayOrders.reduce((s, o) => s + Number(o.total ?? 0), 0),
			orders: dayOrders.length
		};
	});
	const topProducts = Object.values((data?.items ?? []).reduce((acc, it) => {
		const name = it.product_name ?? "Unknown";
		acc[name] ??= {
			name,
			revenue: 0,
			qty: 0
		};
		acc[name].revenue += Number(it.unit_price ?? 0) * Number(it.quantity ?? 0);
		acc[name].qty += Number(it.quantity ?? 0);
		return acc;
	}, {})).sort((a, b) => b.revenue - a.revenue).slice(0, 6);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminShell, {
		title: "Dashboard",
		description: "Live business overview for Circles Bakers, Sahiwal.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: TrendingUp,
						label: "Collected revenue",
						value: money(revenue),
						sub: `${money(pipeline)} in active orders`,
						loading: isLoading
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: ShoppingBag,
						label: "Orders",
						value: String(orders.length),
						sub: `${pendingOrders} awaiting confirmation`,
						loading: isLoading
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Users,
						label: "Customers",
						value: String(data?.customerCount ?? 0),
						sub: "registered accounts",
						loading: isLoading
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: CalendarCheck,
						label: "Reservations",
						value: String(data?.reservations.length ?? 0),
						sub: `${pendingRes} pending`,
						loading: isLoading
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-4 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-[var(--a-border)] bg-[var(--a-surface)] p-4 lg:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold text-[var(--a-text)]",
						children: "Order value · last 14 days"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 h-64 w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
								data: days,
								margin: {
									left: -12,
									right: 8,
									top: 8
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
										id: "rev",
										x1: "0",
										y1: "0",
										x2: "0",
										y2: "1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "0%",
											stopColor: "var(--a-accent)",
											stopOpacity: .45
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "100%",
											stopColor: "var(--a-accent)",
											stopOpacity: 0
										})]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										stroke: "var(--a-border)",
										vertical: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "day",
										tick: {
											fontSize: 11,
											fill: "var(--a-muted)"
										},
										stroke: "var(--a-border)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										tick: {
											fontSize: 11,
											fill: "var(--a-muted)"
										},
										stroke: "var(--a-border)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										contentStyle: {
											background: "var(--a-surface)",
											border: "1px solid var(--a-border)",
											borderRadius: 8,
											fontSize: 12,
											color: "var(--a-text)"
										},
										formatter: (v) => money(v)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										type: "monotone",
										dataKey: "value",
										stroke: "var(--a-accent)",
										strokeWidth: 2,
										fill: "url(#rev)"
									})
								]
							})
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-[var(--a-border)] bg-[var(--a-surface)] p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold text-[var(--a-text)]",
						children: "Top products"
					}), topProducts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-sm text-[var(--a-muted)]",
						children: "No order items recorded yet. Sales will appear here as orders come in."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 h-64 w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: topProducts,
								layout: "vertical",
								margin: {
									left: 8,
									right: 8
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										type: "number",
										hide: true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										type: "category",
										dataKey: "name",
										width: 110,
										tick: {
											fontSize: 11,
											fill: "var(--a-muted)"
										},
										stroke: "var(--a-border)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										contentStyle: {
											background: "var(--a-surface)",
											border: "1px solid var(--a-border)",
											borderRadius: 8,
											fontSize: 12,
											color: "var(--a-text)"
										},
										formatter: (v) => money(v)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "revenue",
										fill: "var(--a-accent)",
										radius: [
											0,
											4,
											4,
											0
										]
									})
								]
							})
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 rounded-xl border border-[var(--a-border)] bg-[var(--a-surface)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-[var(--a-border)] p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold text-[var(--a-text)]",
						children: "Recent orders"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin/orders",
						className: "text-xs font-medium text-[var(--a-accent)] hover:underline",
						children: "View all"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "divide-y divide-[var(--a-border)]",
					children: [
						isLoading && Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "p-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-2/3 animate-pulse rounded bg-[var(--a-surface-2)]" })
						}, i)),
						!isLoading && orders.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "p-6 text-sm text-[var(--a-muted)]",
							children: "No orders yet."
						}),
						orders.slice(0, 6).map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-3 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "truncate text-sm font-medium text-[var(--a-text)]",
									children: [
										"#",
										o.order_number,
										" · ",
										o.customer_name
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-[var(--a-muted)]",
									children: dateTime(o.created_at)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: o.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-medium text-[var(--a-text)]",
									children: money(o.total)
								})]
							})]
						}, o.id))
					]
				})]
			})
		]
	});
}
//#endregion
export { DashboardPage as component };
