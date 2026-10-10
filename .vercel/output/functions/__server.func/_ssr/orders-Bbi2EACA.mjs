import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CgUy-Nbt.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { f as Printer, t as X } from "../_libs/lucide-react.mjs";
import { i as money, n as StatusBadge, r as dateTime, t as AdminShell } from "./format-CsDi8mZN.mjs";
import { t as DataTable } from "./DataTable-CJvw5IIP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders-Bbi2EACA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATUSES = [
	"pending",
	"confirmed",
	"preparing",
	"ready",
	"completed",
	"cancelled",
	"refunded"
];
function OrdersPage() {
	const qc = useQueryClient();
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("all");
	const [active, setActive] = (0, import_react.useState)(null);
	const [notes, setNotes] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const { data, isLoading } = useQuery({
		queryKey: ["admin", "orders"],
		queryFn: async () => {
			const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	const { data: items } = useQuery({
		queryKey: [
			"admin",
			"order-items",
			active?.id
		],
		enabled: !!active,
		queryFn: async () => {
			const { data, error } = await supabase.from("order_items").select("id, product_name, quantity, unit_price, notes").eq("order_id", active.id);
			if (error) throw error;
			return data ?? [];
		}
	});
	const { data: payments } = useQuery({
		queryKey: [
			"admin",
			"order-payments",
			active?.id
		],
		enabled: !!active,
		queryFn: async () => {
			const { data, error } = await supabase.from("payments").select("id, amount, method, provider, status, created_at").eq("order_id", active.id);
			if (error) throw error;
			return data ?? [];
		}
	});
	const rows = (0, import_react.useMemo)(() => (data ?? []).filter((o) => statusFilter === "all" || o.status === statusFilter), [data, statusFilter]);
	const refresh = () => qc.invalidateQueries({ queryKey: ["admin"] });
	const setStatus = async (ids, status) => {
		const { error } = await supabase.from("orders").update({ status }).in("id", ids);
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success(`Updated ${ids.length} order${ids.length === 1 ? "" : "s"} to ${status}`);
		if (active && ids.includes(active.id)) setActive({
			...active,
			status
		});
		refresh();
	};
	const saveNotes = async () => {
		if (!active) return;
		setSaving(true);
		const { error } = await supabase.from("orders").update({ notes }).eq("id", active.id);
		setSaving(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success("Order note saved");
		setActive({
			...active,
			notes
		});
		refresh();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminShell, {
		title: "Orders",
		description: "Every order placed through the website, live.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
			data: rows,
			columns: [
				{
					key: "order_number",
					header: "Order",
					sortable: true,
					value: (o) => o.order_number,
					render: (o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-medium",
						children: ["#", o.order_number]
					})
				},
				{
					key: "customer_name",
					header: "Customer",
					sortable: true,
					value: (o) => o.customer_name
				},
				{
					key: "phone",
					header: "Phone",
					value: (o) => o.phone,
					hideOnMobile: true
				},
				{
					key: "order_type",
					header: "Type",
					value: (o) => o.order_type,
					hideOnMobile: true
				},
				{
					key: "status",
					header: "Status",
					sortable: true,
					value: (o) => o.status,
					render: (o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: o.status })
				},
				{
					key: "total",
					header: "Total",
					sortable: true,
					value: (o) => o.total,
					render: (o) => money(o.total)
				},
				{
					key: "created_at",
					header: "Placed",
					sortable: true,
					value: (o) => o.created_at,
					render: (o) => dateTime(o.created_at),
					hideOnMobile: true
				}
			],
			loading: isLoading,
			exportName: "circles-orders",
			onRowClick: (o) => {
				setActive(o);
				setNotes(o.notes ?? "");
			},
			bulkActions: [
				{
					label: "Mark confirmed",
					run: (rs) => setStatus(rs.map((r) => r.id), "confirmed")
				},
				{
					label: "Mark completed",
					run: (rs) => setStatus(rs.map((r) => r.id), "completed")
				},
				{
					label: "Cancel",
					destructive: true,
					run: (rs) => setStatus(rs.map((r) => r.id), "cancelled")
				}
			],
			emptyLabel: "No orders match these filters.",
			toolbar: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				value: statusFilter,
				onChange: (e) => setStatusFilter(e.target.value),
				"aria-label": "Filter by status",
				className: "h-9 rounded-lg border border-[var(--a-border)] bg-[var(--a-surface-2)] px-2 text-sm text-[var(--a-text)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "all",
					children: "All statuses"
				}), STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: s,
					children: s
				}, s))]
			})
		}), active && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "fixed inset-0 z-50 flex justify-end",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				"aria-label": "Close order",
				onClick: () => setActive(null),
				className: "absolute inset-0 bg-black/40"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative h-full w-full max-w-md overflow-y-auto border-l border-[var(--a-border)] bg-[var(--a-surface)] p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs uppercase tracking-wider text-[var(--a-muted)]",
								children: ["Order #", active.order_number]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 text-lg font-semibold text-[var(--a-text)]",
								children: active.customer_name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-[var(--a-muted)]",
								children: [active.phone, active.email ? ` · ${active.email}` : ""]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setActive(null),
							"aria-label": "Close",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
								size: 16,
								className: "text-[var(--a-muted)]"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid grid-cols-2 gap-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
								label: "Type",
								value: active.order_type
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
								label: "Fulfilment",
								value: active.fulfillment_date ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
								label: "Subtotal",
								value: money(active.subtotal)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
								label: "Total",
								value: money(active.total)
							}),
							active.delivery_address && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "col-span-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
									label: "Address",
									value: active.delivery_address
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium uppercase tracking-wider text-[var(--a-muted)]",
							children: "Status"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-1.5",
							children: STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setStatus([active.id], s),
								className: `rounded-full px-2.5 py-1 text-xs font-medium capitalize transition-colors ${active.status === s ? "bg-[var(--a-accent)] text-[var(--a-accent-fg)]" : "border border-[var(--a-border)] text-[var(--a-muted)] hover:text-[var(--a-text)]"}`,
								children: s
							}, s))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium uppercase tracking-wider text-[var(--a-muted)]",
							children: "Items"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-2 divide-y divide-[var(--a-border)] rounded-lg border border-[var(--a-border)]",
							children: [(items ?? []).map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex justify-between gap-2 px-3 py-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[var(--a-text)]",
									children: [
										it.quantity,
										" × ",
										it.product_name
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[var(--a-muted)]",
									children: money(Number(it.unit_price) * Number(it.quantity))
								})]
							}, it.id)), (items ?? []).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "px-3 py-3 text-sm text-[var(--a-muted)]",
								children: "No line items."
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium uppercase tracking-wider text-[var(--a-muted)]",
							children: "Payments"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-2 space-y-2",
							children: [(payments ?? []).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center justify-between rounded-lg border border-[var(--a-border)] px-3 py-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "capitalize text-[var(--a-text)]",
									children: [
										p.method,
										" · ",
										p.provider
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: p.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[var(--a-muted)]",
										children: money(p.amount)
									})]
								})]
							}, p.id)), (payments ?? []).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "text-sm text-[var(--a-muted)]",
								children: "No payment records."
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "order-notes",
								className: "text-xs font-medium uppercase tracking-wider text-[var(--a-muted)]",
								children: "Internal note"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								id: "order-notes",
								value: notes,
								onChange: (e) => setNotes(e.target.value),
								rows: 3,
								className: "mt-2 w-full rounded-lg border border-[var(--a-border)] bg-[var(--a-surface-2)] p-3 text-sm text-[var(--a-text)] outline-none focus:border-[var(--a-accent)]"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: saveNotes,
										disabled: saving,
										className: "rounded-lg bg-[var(--a-accent)] px-3 py-2 text-xs font-semibold text-[var(--a-accent-fg)] disabled:opacity-60",
										children: saving ? "Saving…" : "Save note"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setNotes(active.notes ?? ""),
										className: "rounded-lg border border-[var(--a-border)] px-3 py-2 text-xs font-medium text-[var(--a-muted)]",
										children: "Undo"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => window.print(),
										className: "ml-auto flex items-center gap-1.5 rounded-lg border border-[var(--a-border)] px-3 py-2 text-xs font-medium text-[var(--a-muted)]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { size: 13 }), " Invoice"]
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-5 text-xs text-[var(--a-muted)]",
						children: ["Placed ", dateTime(active.created_at)]
					})
				]
			})]
		})]
	});
}
function Info({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-[11px] uppercase tracking-wider text-[var(--a-muted)]",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm capitalize text-[var(--a-text)]",
		children: value
	})] });
}
//#endregion
export { OrdersPage as component };
