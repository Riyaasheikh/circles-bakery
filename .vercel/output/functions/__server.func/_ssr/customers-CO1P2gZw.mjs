import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CgUy-Nbt.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { S as Crown, t as X } from "../_libs/lucide-react.mjs";
import { a as shortDate, i as money, n as StatusBadge, r as dateTime, t as AdminShell } from "./format-CsDi8mZN.mjs";
import { t as DataTable } from "./DataTable-CJvw5IIP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/customers-CO1P2gZw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var VIP_THRESHOLD = 25e3;
function CustomersPage() {
	const qc = useQueryClient();
	const [active, setActive] = (0, import_react.useState)(null);
	const [notes, setNotes] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const { data, isLoading } = useQuery({
		queryKey: ["admin", "customers"],
		queryFn: async () => {
			const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	const { data: history } = useQuery({
		queryKey: [
			"admin",
			"customer-orders",
			active?.id
		],
		enabled: !!active,
		queryFn: async () => {
			const { data, error } = await supabase.from("orders").select("id, order_number, status, total, created_at").eq("user_id", active.id).order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	const saveNotes = async () => {
		if (!active) return;
		setSaving(true);
		const { error } = await supabase.from("profiles").update({ notes }).eq("id", active.id);
		setSaving(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success("Customer note saved");
		setActive({
			...active,
			notes
		});
		qc.invalidateQueries({ queryKey: ["admin", "customers"] });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminShell, {
		title: "Customers",
		description: "Registered customer profiles, spend and purchase history.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
			data: data ?? [],
			columns: [
				{
					key: "full_name",
					header: "Customer",
					sortable: true,
					value: (p) => p.full_name ?? "—",
					render: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5 font-medium",
						children: [p.full_name ?? "Unnamed", Number(p.lifetime_spend) >= VIP_THRESHOLD && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, {
							size: 13,
							className: "text-[var(--a-accent)]",
							"aria-label": "VIP"
						})]
					})
				},
				{
					key: "email",
					header: "Email",
					sortable: true,
					value: (p) => p.email ?? ""
				},
				{
					key: "phone",
					header: "Phone",
					value: (p) => p.phone ?? "",
					hideOnMobile: true
				},
				{
					key: "lifetime_spend",
					header: "Lifetime spend",
					sortable: true,
					value: (p) => Number(p.lifetime_spend),
					render: (p) => money(p.lifetime_spend)
				},
				{
					key: "loyalty_points",
					header: "Points",
					sortable: true,
					value: (p) => p.loyalty_points,
					hideOnMobile: true
				},
				{
					key: "marketing_opt_in",
					header: "Marketing",
					value: (p) => p.marketing_opt_in ? "opted in" : "no",
					hideOnMobile: true
				},
				{
					key: "created_at",
					header: "Joined",
					sortable: true,
					value: (p) => p.created_at,
					render: (p) => shortDate(p.created_at),
					hideOnMobile: true
				}
			],
			loading: isLoading,
			exportName: "circles-customers",
			emptyLabel: "No customers yet.",
			onRowClick: (p) => {
				setActive(p);
				setNotes(p.notes ?? "");
			}
		}), active && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "fixed inset-0 z-50 flex justify-end",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				"aria-label": "Close customer",
				onClick: () => setActive(null),
				className: "absolute inset-0 bg-black/40"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative h-full w-full max-w-md overflow-y-auto border-l border-[var(--a-border)] bg-[var(--a-surface)] p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-semibold text-[var(--a-text)]",
							children: active.full_name ?? "Unnamed customer"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-[var(--a-muted)]",
							children: [active.email ?? "—", active.phone ? ` · ${active.phone}` : ""]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setActive(null),
							"aria-label": "Close",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
								size: 16,
								className: "text-[var(--a-muted)]"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid grid-cols-2 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Lifetime spend",
								value: money(active.lifetime_spend)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Loyalty points",
								value: String(active.loyalty_points)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Birthday",
								value: active.birthday ? shortDate(active.birthday) : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Group",
								value: Number(active.lifetime_spend) >= VIP_THRESHOLD ? "VIP" : "Standard"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium uppercase tracking-wider text-[var(--a-muted)]",
							children: "Purchase history"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-2 divide-y divide-[var(--a-border)] rounded-lg border border-[var(--a-border)]",
							children: [(history ?? []).map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center justify-between gap-2 px-3 py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-[var(--a-text)]",
									children: ["#", o.order_number]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-[var(--a-muted)]",
									children: dateTime(o.created_at)
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: o.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm text-[var(--a-muted)]",
										children: money(o.total)
									})]
								})]
							}, o.id)), (history ?? []).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "px-3 py-3 text-sm text-[var(--a-muted)]",
								children: "No orders yet."
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "cust-notes",
								className: "text-xs font-medium uppercase tracking-wider text-[var(--a-muted)]",
								children: "CRM note"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								id: "cust-notes",
								value: notes,
								onChange: (e) => setNotes(e.target.value),
								rows: 3,
								className: "mt-2 w-full rounded-lg border border-[var(--a-border)] bg-[var(--a-surface-2)] p-3 text-sm text-[var(--a-text)] outline-none focus:border-[var(--a-accent)]"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: saveNotes,
									disabled: saving,
									className: "rounded-lg bg-[var(--a-accent)] px-3 py-2 text-xs font-semibold text-[var(--a-accent-fg)] disabled:opacity-60",
									children: saving ? "Saving…" : "Save note"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setNotes(active.notes ?? ""),
									className: "rounded-lg border border-[var(--a-border)] px-3 py-2 text-xs font-medium text-[var(--a-muted)]",
									children: "Undo"
								})]
							})
						]
					})
				]
			})]
		})]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-[var(--a-border)] p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] uppercase tracking-wider text-[var(--a-muted)]",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm font-medium text-[var(--a-text)]",
			children: value
		})]
	});
}
//#endregion
export { CustomersPage as component };
