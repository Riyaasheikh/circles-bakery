import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { D as ChevronLeft, E as ChevronRight, N as ArrowDown, T as Columns3, d as Search, j as ArrowUp, x as Download } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/DataTable-CJvw5IIP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var raw = (col, row) => {
	const v = col.value?.(row);
	return v === null || v === void 0 ? "" : String(v);
};
/**
* Reusable admin data table: search, sorting, pagination, bulk actions,
* CSV export, column visibility and a responsive layout.
*/
function DataTable({ data, columns, loading, onRowClick, bulkActions = [], exportName = "export", toolbar, emptyLabel = "No records found.", pageSize = 12 }) {
	const [q, setQ] = (0, import_react.useState)("");
	const [sort, setSort] = (0, import_react.useState)(null);
	const [page, setPage] = (0, import_react.useState)(0);
	const [selected, setSelected] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [hidden, setHidden] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [colsOpen, setColsOpen] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const visible = columns.filter((c) => !hidden.has(c.key));
	const filtered = (0, import_react.useMemo)(() => {
		const needle = q.trim().toLowerCase();
		if (!needle) return data;
		return data.filter((row) => columns.some((c) => raw(c, row).toLowerCase().includes(needle)));
	}, [
		data,
		columns,
		q
	]);
	const sorted = (0, import_react.useMemo)(() => {
		if (!sort) return filtered;
		const col = columns.find((c) => c.key === sort.key);
		if (!col) return filtered;
		return [...filtered].sort((a, b) => {
			const av = col.value?.(a) ?? "";
			const bv = col.value?.(b) ?? "";
			const cmp = typeof av === "number" && typeof bv === "number" ? av - bv : String(av).localeCompare(String(bv), void 0, { numeric: true });
			return sort.dir === "asc" ? cmp : -cmp;
		});
	}, [
		filtered,
		sort,
		columns
	]);
	const pages = Math.max(1, Math.ceil(sorted.length / pageSize));
	const current = Math.min(page, pages - 1);
	const rows = sorted.slice(current * pageSize, current * pageSize + pageSize);
	const toggleSort = (key) => setSort((s) => s?.key === key ? s.dir === "asc" ? {
		key,
		dir: "desc"
	} : null : {
		key,
		dir: "asc"
	});
	const exportCsv = () => {
		const head = visible.map((c) => c.header);
		const body = sorted.map((row) => visible.map((c) => `"${raw(c, row).replace(/"/g, "\"\"")}"`).join(","));
		const csv = [head.join(","), ...body].join("\n");
		const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
		const a = document.createElement("a");
		a.href = url;
		a.download = `${exportName}-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
		a.click();
		URL.revokeObjectURL(url);
	};
	const selectedRows = sorted.filter((r) => selected.has(r.id));
	const allOnPage = rows.length > 0 && rows.every((r) => selected.has(r.id));
	const runBulk = async (action) => {
		setBusy(true);
		try {
			await action.run(selectedRows);
			setSelected(/* @__PURE__ */ new Set());
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-[var(--a-border)] bg-[var(--a-surface)] shadow-[0_1px_2px_rgba(16,20,24,0.05)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 border-b border-[var(--a-border)] p-3 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-1 flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative min-w-[180px] flex-1 sm:max-w-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
							size: 15,
							className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--a-muted)]"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: q,
							onChange: (e) => {
								setQ(e.target.value);
								setPage(0);
							},
							placeholder: "Search…",
							"aria-label": "Search records",
							className: "h-9 w-full rounded-lg border border-[var(--a-border)] bg-[var(--a-surface-2)] pl-9 pr-3 text-sm text-[var(--a-text)] outline-none placeholder:text-[var(--a-muted)] focus:border-[var(--a-accent)]"
						})]
					}), toolbar]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setColsOpen((o) => !o),
							className: "flex h-9 items-center gap-2 rounded-lg border border-[var(--a-border)] px-3 text-xs font-medium text-[var(--a-text)] hover:bg-[var(--a-surface-2)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Columns3, { size: 14 }), " Columns"]
						}), colsOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute right-0 z-30 mt-1 w-48 rounded-lg border border-[var(--a-border)] bg-[var(--a-surface)] p-2 shadow-lg",
							children: columns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-xs text-[var(--a-text)] hover:bg-[var(--a-surface-2)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: !hidden.has(c.key),
									onChange: () => setHidden((h) => {
										const n = new Set(h);
										n.has(c.key) ? n.delete(c.key) : n.add(c.key);
										return n;
									})
								}), c.header]
							}, c.key))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: exportCsv,
						className: "flex h-9 items-center gap-2 rounded-lg border border-[var(--a-border)] px-3 text-xs font-medium text-[var(--a-text)] hover:bg-[var(--a-surface-2)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 14 }), " CSV"]
					})]
				})]
			}),
			selected.size > 0 && bulkActions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2 border-b border-[var(--a-border)] bg-[var(--a-surface-2)] px-3 py-2 text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-[var(--a-muted)]",
					children: [selected.size, " selected"]
				}), bulkActions.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					disabled: busy,
					onClick: () => runBulk(a),
					className: `rounded-md px-2.5 py-1 font-medium disabled:opacity-50 ${a.destructive ? "bg-[var(--a-danger)] text-white" : "bg-[var(--a-accent)] text-[var(--a-accent-fg)]"}`,
					children: a.label
				}, a.label))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[560px] border-collapse text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-[var(--a-border)] text-[11px] uppercase tracking-wider text-[var(--a-muted)]",
						children: [bulkActions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "w-9 px-3 py-2.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								"aria-label": "Select all on page",
								checked: allOnPage,
								onChange: () => setSelected((s) => {
									const n = new Set(s);
									rows.forEach((r) => allOnPage ? n.delete(r.id) : n.add(r.id));
									return n;
								})
							})
						}), visible.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: `px-3 py-2.5 font-medium ${c.hideOnMobile ? "hidden md:table-cell" : ""} ${c.className ?? ""}`,
							children: c.sortable ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => toggleSort(c.key),
								className: "flex items-center gap-1 hover:text-[var(--a-text)]",
								children: [c.header, sort?.key === c.key && (sort.dir === "asc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { size: 12 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { size: 12 }))]
							}) : c.header
						}, c.key))]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
						loading && Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
							className: "border-b border-[var(--a-border)]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								colSpan: visible.length + 1,
								className: "px-3 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-full animate-pulse rounded bg-[var(--a-surface-2)]" })
							})
						}, `s${i}`)),
						!loading && rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: visible.length + 1,
							className: "px-3 py-10 text-center text-sm text-[var(--a-muted)]",
							children: emptyLabel
						}) }),
						!loading && rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							onClick: () => onRowClick?.(row),
							className: `border-b border-[var(--a-border)] transition-colors last:border-0 ${onRowClick ? "cursor-pointer hover:bg-[var(--a-surface-2)]" : ""}`,
							children: [bulkActions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3",
								onClick: (e) => e.stopPropagation(),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									"aria-label": "Select row",
									checked: selected.has(row.id),
									onChange: () => setSelected((s) => {
										const n = new Set(s);
										n.has(row.id) ? n.delete(row.id) : n.add(row.id);
										return n;
									})
								})
							}), visible.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: `px-3 py-3 align-middle text-[var(--a-text)] ${c.hideOnMobile ? "hidden md:table-cell" : ""} ${c.className ?? ""}`,
								children: c.render ? c.render(row) : raw(c, row)
							}, c.key))]
						}, row.id))
					] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3 border-t border-[var(--a-border)] px-3 py-2.5 text-xs text-[var(--a-muted)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					sorted.length,
					" record",
					sorted.length === 1 ? "" : "s"
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setPage(Math.max(0, current - 1)),
							disabled: current === 0,
							"aria-label": "Previous page",
							className: "rounded-md border border-[var(--a-border)] p-1 disabled:opacity-40",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 14 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							current + 1,
							" / ",
							pages
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setPage(Math.min(pages - 1, current + 1)),
							disabled: current >= pages - 1,
							"aria-label": "Next page",
							className: "rounded-md border border-[var(--a-border)] p-1 disabled:opacity-40",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 14 })
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { DataTable as t };
