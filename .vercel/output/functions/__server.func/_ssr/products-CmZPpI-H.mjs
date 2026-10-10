import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CgUy-Nbt.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { P as Archive, a as Trash2, b as EyeOff, c as Sparkles, p as Plus, t as X, w as Copy, y as Eye } from "../_libs/lucide-react.mjs";
import { i as money, t as AdminShell } from "./format-CsDi8mZN.mjs";
import { a as objectType, i as numberType, o as stringType } from "../_libs/zod.mjs";
import { t as DataTable } from "./DataTable-CJvw5IIP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products-CmZPpI-H.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STOCK = [
	"in_stock",
	"low_stock",
	"out_of_stock",
	"preorder"
];
var schema = objectType({
	name: stringType().trim().min(2, "Name is required").max(120),
	slug: stringType().trim().min(2, "Slug is required").max(140).regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers and dashes"),
	price: numberType().min(0, "Price cannot be negative").max(1e6),
	compare_at_price: numberType().min(0).max(1e6).nullable(),
	sku: stringType().trim().max(64).nullable(),
	description: stringType().trim().max(1200).nullable(),
	stock_quantity: numberType().int().min(0).max(1e6),
	lead_time_days: numberType().int().min(0).max(60),
	sort_order: numberType().int().min(0).max(9999)
});
var slugify = (v) => v.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
var blank = () => ({
	id: "",
	category_id: null,
	name: "",
	slug: "",
	description: "",
	ingredients: "",
	price: 0,
	compare_at_price: null,
	sku: "",
	image_url: "",
	is_available: true,
	is_custom_cake: false,
	lead_time_days: 1,
	sort_order: 0,
	is_published: true,
	is_archived: false,
	is_featured: false,
	is_best_seller: false,
	is_new_arrival: false,
	track_inventory: false,
	stock_quantity: 0,
	stock_status: "in_stock",
	tags: [],
	variants: [],
	seo_title: "",
	seo_description: "",
	created_at: (/* @__PURE__ */ new Date()).toISOString()
});
var field = "h-9 w-full rounded-lg border border-[var(--a-border)] bg-[var(--a-surface-2)] px-3 text-sm text-[var(--a-text)] outline-none focus:border-[var(--a-accent)]";
function Label({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-[var(--a-muted)]",
		children
	});
}
function Toggle({ label, checked, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-[var(--a-border)] px-3 py-2 text-sm text-[var(--a-text)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "checkbox",
			checked,
			onChange: (e) => onChange(e.target.checked)
		})]
	});
}
function ProductsPage() {
	const qc = useQueryClient();
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [view, setView] = (0, import_react.useState)("active");
	const [errors, setErrors] = (0, import_react.useState)({});
	const { data: categories = [] } = useQuery({
		queryKey: ["admin", "categories"],
		queryFn: async () => {
			const { data, error } = await supabase.from("categories").select("id, name, slug").order("sort_order");
			if (error) throw error;
			return data ?? [];
		}
	});
	const { data = [], isLoading } = useQuery({
		queryKey: ["admin", "products"],
		queryFn: async () => {
			const { data, error } = await supabase.from("products").select("*").order("sort_order", { ascending: true }).order("created_at", { ascending: false });
			if (error) throw error;
			return (data ?? []).map((p) => ({
				...p,
				variants: Array.isArray(p.variants) ? p.variants : [],
				tags: p.tags ?? []
			}));
		}
	});
	const invalidate = () => {
		qc.invalidateQueries({ queryKey: ["admin", "products"] });
		qc.invalidateQueries({ queryKey: ["public", "products"] });
	};
	const rows = (0, import_react.useMemo)(() => data.filter((p) => view === "archived" ? p.is_archived : !p.is_archived), [data, view]);
	const patch = useMutation({
		mutationFn: async ({ ids, values }) => {
			const { error } = await supabase.from("products").update(values).in("id", ids);
			if (error) throw error;
		},
		onSuccess: () => invalidate(),
		onError: (e) => toast.error(e.message)
	});
	const quickPatch = async (ids, values, message) => {
		await patch.mutateAsync({
			ids,
			values
		});
		toast.success(message);
	};
	const remove = async (ids) => {
		const { error } = await supabase.from("products").delete().in("id", ids);
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success(`${ids.length} product${ids.length > 1 ? "s" : ""} deleted`);
		invalidate();
	};
	const duplicate = async (p) => {
		const { id, created_at, ...rest } = p;
		const { error } = await supabase.from("products").insert({
			...rest,
			name: `${p.name} (copy)`,
			slug: `${p.slug}-copy-${Math.random().toString(36).slice(2, 6)}`,
			sku: p.sku ? `${p.sku}-COPY` : null,
			is_published: false,
			variants: p.variants
		});
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success("Product duplicated as a draft");
		invalidate();
	};
	const save = async (p) => {
		const parsed = schema.safeParse({
			name: p.name,
			slug: p.slug || slugify(p.name),
			price: Number(p.price),
			compare_at_price: p.compare_at_price === null ? null : Number(p.compare_at_price),
			sku: p.sku || null,
			description: p.description || null,
			stock_quantity: Number(p.stock_quantity),
			lead_time_days: Number(p.lead_time_days),
			sort_order: Number(p.sort_order)
		});
		if (!parsed.success) {
			const next = {};
			for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
			setErrors(next);
			toast.error("Please fix the highlighted fields");
			return;
		}
		setErrors({});
		const payload = {
			...parsed.data,
			category_id: p.category_id,
			ingredients: p.ingredients || null,
			image_url: p.image_url || null,
			is_available: p.is_available,
			is_custom_cake: p.is_custom_cake,
			is_published: p.is_published,
			is_archived: p.is_archived,
			is_featured: p.is_featured,
			is_best_seller: p.is_best_seller,
			is_new_arrival: p.is_new_arrival,
			track_inventory: p.track_inventory,
			stock_status: p.stock_status,
			tags: p.tags,
			variants: p.variants,
			seo_title: p.seo_title || null,
			seo_description: p.seo_description || null
		};
		const res = p.id ? await supabase.from("products").update(payload).eq("id", p.id) : await supabase.from("products").insert(payload);
		if (res.error) {
			toast.error(res.error.message);
			return;
		}
		toast.success(p.id ? "Product updated" : "Product created");
		setEditing(null);
		invalidate();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminShell, {
		title: "Products",
		description: "The catalogue behind the public menu — pricing, variants, inventory and merchandising.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex rounded-lg border border-[var(--a-border)] p-0.5 text-xs",
				children: ["active", "archived"].map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setView(v),
					className: `rounded-md px-3 py-1.5 capitalize ${view === v ? "bg-[var(--a-accent-soft)] text-[var(--a-text)]" : "text-[var(--a-muted)]"}`,
					children: v
				}, v))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => {
					setErrors({});
					setEditing(blank());
				},
				className: "flex h-9 items-center gap-2 rounded-lg bg-[var(--a-accent)] px-3.5 text-sm font-medium text-[var(--a-accent-fg)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 15 }), " New product"]
			})]
		}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
			data: rows,
			columns: [
				{
					key: "name",
					header: "Product",
					sortable: true,
					value: (p) => p.name,
					render: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [p.image_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: p.image_url,
							alt: "",
							className: "h-9 w-9 shrink-0 rounded-md object-cover",
							loading: "lazy"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-9 w-9 shrink-0 rounded-md bg-[var(--a-surface-2)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate font-medium",
								children: p.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "truncate text-[11px] text-[var(--a-muted)]",
								children: [
									p.sku || p.slug,
									p.is_best_seller ? " · Best seller" : "",
									p.is_new_arrival ? " · New" : ""
								]
							})]
						})]
					})
				},
				{
					key: "category",
					header: "Category",
					hideOnMobile: true,
					sortable: true,
					value: (p) => categories.find((c) => c.id === p.category_id)?.name ?? "—"
				},
				{
					key: "price",
					header: "Price",
					sortable: true,
					value: (p) => Number(p.price),
					render: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [p.compare_at_price && Number(p.compare_at_price) > Number(p.price) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mr-1.5 text-[var(--a-muted)] line-through",
						children: money(p.compare_at_price)
					}), money(p.price)] })
				},
				{
					key: "stock",
					header: "Stock",
					hideOnMobile: true,
					sortable: true,
					value: (p) => p.track_inventory ? p.stock_quantity : p.stock_status,
					render: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[var(--a-muted)]",
						children: p.track_inventory ? `${p.stock_quantity} on hand` : p.stock_status.replace(/_/g, " ")
					})
				},
				{
					key: "status",
					header: "Status",
					sortable: true,
					value: (p) => p.is_archived ? "archived" : p.is_published ? "live" : "draft",
					render: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium capitalize ${p.is_archived ? "bg-[var(--a-surface-2)] text-[var(--a-muted)]" : p.is_published ? "bg-[var(--a-positive)]/12 text-[var(--a-positive)]" : "bg-[var(--a-warning)]/12 text-[var(--a-warning)]"}`,
						children: p.is_archived ? "archived" : p.is_published ? "live" : "draft"
					})
				},
				{
					key: "actions",
					header: "",
					render: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5",
						onClick: (e) => e.stopPropagation(),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								title: p.is_published ? "Unpublish" : "Publish",
								"aria-label": p.is_published ? "Unpublish product" : "Publish product",
								onClick: () => quickPatch([p.id], { is_published: !p.is_published }, p.is_published ? "Hidden from the website" : "Published to the website"),
								className: "rounded-md p-1.5 text-[var(--a-muted)] hover:bg-[var(--a-surface-2)] hover:text-[var(--a-text)]",
								children: p.is_published ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { size: 15 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { size: 15 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								title: "Duplicate",
								"aria-label": "Duplicate product",
								onClick: () => duplicate(p),
								className: "rounded-md p-1.5 text-[var(--a-muted)] hover:bg-[var(--a-surface-2)] hover:text-[var(--a-text)]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { size: 15 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								title: p.is_archived ? "Restore" : "Archive",
								"aria-label": p.is_archived ? "Restore product" : "Archive product",
								onClick: () => quickPatch([p.id], { is_archived: !p.is_archived }, p.is_archived ? "Product restored" : "Product archived"),
								className: "rounded-md p-1.5 text-[var(--a-muted)] hover:bg-[var(--a-surface-2)] hover:text-[var(--a-text)]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Archive, { size: 15 })
							})
						]
					})
				}
			],
			loading: isLoading,
			exportName: "circles-products",
			emptyLabel: view === "archived" ? "No archived products." : "No products yet.",
			onRowClick: (p) => {
				setErrors({});
				setEditing(p);
			},
			bulkActions: [
				{
					label: "Publish",
					run: (r) => quickPatch(r.map((p) => p.id), { is_published: true }, "Published")
				},
				{
					label: "Unpublish",
					run: (r) => quickPatch(r.map((p) => p.id), { is_published: false }, "Unpublished")
				},
				{
					label: "Mark best seller",
					run: (r) => quickPatch(r.map((p) => p.id), { is_best_seller: true }, "Marked as best sellers")
				},
				{
					label: view === "archived" ? "Restore" : "Archive",
					run: (r) => quickPatch(r.map((p) => p.id), { is_archived: view !== "archived" }, view === "archived" ? "Restored" : "Archived")
				},
				{
					label: "Delete",
					destructive: true,
					run: (r) => remove(r.map((p) => p.id))
				}
			]
		}), editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductDrawer, {
			product: editing,
			categories,
			errors,
			onClose: () => setEditing(null),
			onSave: save,
			onDelete: editing.id ? async () => {
				await remove([editing.id]);
				setEditing(null);
			} : void 0
		})]
	});
}
function ProductDrawer({ product, categories, errors, onClose, onSave, onDelete }) {
	const [form, setForm] = (0, import_react.useState)(product);
	const [saving, setSaving] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setForm(product), [product]);
	const set = (key, value) => setForm((f) => ({
		...f,
		[key]: value
	}));
	const err = (k) => errors[k] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-1 text-[11px] text-[var(--a-danger)]",
		children: errors[k]
	}) : null;
	const submit = async () => {
		setSaving(true);
		try {
			await onSave(form);
		} finally {
			setSaving(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-[60] flex justify-end",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			"aria-label": "Close",
			onClick: onClose,
			className: "absolute inset-0 bg-black/40"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex h-full w-full max-w-xl flex-col border-l border-[var(--a-border)] bg-[var(--a-surface)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-[var(--a-border)] px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "truncate text-base font-semibold text-[var(--a-text)]",
							children: form.id ? form.name || "Product" : "New product"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-[var(--a-muted)]",
							children: "Changes go live on the website immediately."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						"aria-label": "Close drawer",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
							size: 18,
							className: "text-[var(--a-muted)]"
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 space-y-5 overflow-y-auto p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "sm:col-span-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Name" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											className: field,
											value: form.name,
											onChange: (e) => {
												const name = e.target.value;
												setForm((f) => ({
													...f,
													name,
													slug: f.id ? f.slug : slugify(name)
												}));
											}
										}),
										err("name")
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Slug" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: field,
										value: form.slug,
										onChange: (e) => set("slug", slugify(e.target.value))
									}),
									err("slug")
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "SKU" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: field,
										value: form.sku ?? "",
										onChange: (e) => set("sku", e.target.value)
									}),
									err("sku")
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Category" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: field,
									value: form.category_id ?? "",
									onChange: (e) => set("category_id", e.target.value || null),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Uncategorised"
									}), categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: c.id,
										children: c.name
									}, c.id))]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Sort order" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										className: field,
										value: form.sort_order,
										onChange: (e) => set("sort_order", Number(e.target.value))
									}),
									err("sort_order")
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Price (PKR)" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										className: field,
										value: form.price,
										onChange: (e) => set("price", Number(e.target.value))
									}),
									err("price")
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Discount was-price" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										className: field,
										value: form.compare_at_price ?? "",
										placeholder: "Optional",
										onChange: (e) => set("compare_at_price", e.target.value === "" ? null : Number(e.target.value))
									}),
									err("compare_at_price")
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "sm:col-span-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Description" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											rows: 3,
											className: `${field} h-auto py-2`,
											value: form.description ?? "",
											onChange: (e) => set("description", e.target.value)
										}),
										err("description")
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Image URL" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: field,
										value: form.image_url ?? "",
										placeholder: "https://…",
										onChange: (e) => set("image_url", e.target.value)
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Variants (size / weight)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [form.variants.map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: field,
										placeholder: "Label, e.g. 2.5 lb",
										value: v.label,
										onChange: (e) => set("variants", form.variants.map((x, j) => j === i ? {
											...x,
											label: e.target.value
										} : x))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										className: `${field} max-w-[130px]`,
										placeholder: "Price",
										value: v.price,
										onChange: (e) => set("variants", form.variants.map((x, j) => j === i ? {
											...x,
											price: Number(e.target.value)
										} : x))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										"aria-label": "Remove variant",
										onClick: () => set("variants", form.variants.filter((_, j) => j !== i)),
										className: "rounded-md p-2 text-[var(--a-muted)] hover:text-[var(--a-danger)]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 15 })
									})
								]
							}, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => set("variants", [...form.variants, {
									label: "",
									price: 0
								}]),
								className: "flex items-center gap-2 rounded-lg border border-[var(--a-border)] px-3 py-1.5 text-xs text-[var(--a-text)] hover:bg-[var(--a-surface-2)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 13 }), " Add variant"]
							})]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Stock status" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									className: field,
									value: form.stock_status,
									onChange: (e) => set("stock_status", e.target.value),
									children: STOCK.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: s,
										children: s.replace(/_/g, " ")
									}, s))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Quantity on hand" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										className: field,
										value: form.stock_quantity,
										onChange: (e) => set("stock_quantity", Number(e.target.value))
									}),
									err("stock_quantity")
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Lead time (days)" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										className: field,
										value: form.lead_time_days,
										onChange: (e) => set("lead_time_days", Number(e.target.value))
									}),
									err("lead_time_days")
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Tags (comma separated)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: field,
									value: form.tags.join(", "),
									onChange: (e) => set("tags", e.target.value.split(",").map((t) => t.trim()).filter(Boolean))
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
									label: "Published on website",
									checked: form.is_published,
									onChange: (v) => set("is_published", v)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
									label: "Available to order",
									checked: form.is_available,
									onChange: (v) => set("is_available", v)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
									label: "Track inventory",
									checked: form.track_inventory,
									onChange: (v) => set("track_inventory", v)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
									label: "Custom cake",
									checked: form.is_custom_cake,
									onChange: (v) => set("is_custom_cake", v)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
									label: "Featured",
									checked: form.is_featured,
									onChange: (v) => set("is_featured", v)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
									label: "Best seller",
									checked: form.is_best_seller,
									onChange: (v) => set("is_best_seller", v)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
									label: "New arrival",
									checked: form.is_new_arrival,
									onChange: (v) => set("is_new_arrival", v)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
									label: "Archived",
									checked: form.is_archived,
									onChange: (v) => set("is_archived", v)
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "SEO title" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: field,
								value: form.seo_title ?? "",
								onChange: (e) => set("seo_title", e.target.value)
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "SEO description" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: field,
								value: form.seo_description ?? "",
								onChange: (e) => set("seo_description", e.target.value)
							})] })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3 border-t border-[var(--a-border)] px-5 py-4",
					children: [onDelete ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: onDelete,
						className: "flex items-center gap-2 text-sm text-[var(--a-danger)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 15 }), " Delete"]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-2 text-xs text-[var(--a-muted)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 14 }), " Appears on /menu once published"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: onClose,
							className: "h-9 rounded-lg border border-[var(--a-border)] px-3.5 text-sm text-[var(--a-text)]",
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: submit,
							disabled: saving,
							className: "h-9 rounded-lg bg-[var(--a-accent)] px-4 text-sm font-medium text-[var(--a-accent-fg)] disabled:opacity-60",
							children: saving ? "Saving…" : "Save product"
						})]
					})]
				})
			]
		})]
	});
}
//#endregion
export { ProductsPage as component };
