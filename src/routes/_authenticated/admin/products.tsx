import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { AdminShell } from "@/components/admin/AdminShell";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { money } from "@/components/admin/format";
import { Archive, Copy, Eye, EyeOff, Plus, Sparkles, Trash2, X } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/products")({
  head: () => ({
    meta: [
      { title: "Products · Circles CRM" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ProductsPage,
});

interface Variant {
  label: string;
  price: number;
}

interface Product {
  id: string;
  category_id: string | null;
  name: string;
  slug: string;
  description: string | null;
  ingredients: string | null;
  price: number;
  compare_at_price: number | null;
  sku: string | null;
  image_url: string | null;
  is_available: boolean;
  is_custom_cake: boolean;
  lead_time_days: number;
  sort_order: number;
  is_published: boolean;
  is_archived: boolean;
  is_featured: boolean;
  is_best_seller: boolean;
  is_new_arrival: boolean;
  track_inventory: boolean;
  stock_quantity: number;
  stock_status: string;
  tags: string[];
  variants: Variant[];
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

const STOCK = ["in_stock", "low_stock", "out_of_stock", "preorder"] as const;

const schema = z.object({
  name: z.string().trim().min(2, "Name is required").max(120),
  slug: z
    .string()
    .trim()
    .min(2, "Slug is required")
    .max(140)
    .regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers and dashes"),
  price: z.number().min(0, "Price cannot be negative").max(1_000_000),
  compare_at_price: z.number().min(0).max(1_000_000).nullable(),
  sku: z.string().trim().max(64).nullable(),
  description: z.string().trim().max(1200).nullable(),
  stock_quantity: z.number().int().min(0).max(1_000_000),
  lead_time_days: z.number().int().min(0).max(60),
  sort_order: z.number().int().min(0).max(9999),
});

const slugify = (v: string) =>
  v
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const blank = (): Product => ({
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
  created_at: new Date().toISOString(),
});

/* ---------------- small form primitives ---------------- */

const field =
  "h-9 w-full rounded-lg border border-[var(--a-border)] bg-[var(--a-surface-2)] px-3 text-sm text-[var(--a-text)] outline-none focus:border-[var(--a-accent)]";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-[var(--a-muted)]">
      {children}
    </span>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-[var(--a-border)] px-3 py-2 text-sm text-[var(--a-text)]">
      <span>{label}</span>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    </label>
  );
}

/* ---------------- page ---------------- */

function ProductsPage() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Product | null>(null);
  const [view, setView] = useState<"active" | "archived">("active");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { data: categories = [] } = useQuery({
    queryKey: ["admin", "categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("id, name, slug")
        .order("sort_order");
      if (error) throw error;
      return (data ?? []) as Category[];
    },
  });

  const { data = [], isLoading } = useQuery({
    queryKey: ["admin", "products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []).map((p) => ({
        ...p,
        variants: Array.isArray(p.variants) ? (p.variants as unknown as Variant[]) : [],
        tags: p.tags ?? [],
      })) as Product[];
    },
  });

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["admin", "products"] });
    qc.invalidateQueries({ queryKey: ["public", "products"] });
  };

  const rows = useMemo(
    () => data.filter((p) => (view === "archived" ? p.is_archived : !p.is_archived)),
    [data, view],
  );

  const patch = useMutation({
    mutationFn: async ({ ids, values }: { ids: string[]; values: Partial<Product> }) => {
      const { error } = await supabase
        .from("products")
        .update(values as never)
        .in("id", ids);
      if (error) throw error;
    },
    onSuccess: () => invalidate(),
    onError: (e: Error) => toast.error(e.message),
  });

  const quickPatch = async (ids: string[], values: Partial<Product>, message: string) => {
    await patch.mutateAsync({ ids, values });
    toast.success(message);
  };

  const remove = async (ids: string[]) => {
    const { error } = await supabase.from("products").delete().in("id", ids);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(`${ids.length} product${ids.length > 1 ? "s" : ""} deleted`);
    invalidate();
  };

  const duplicate = async (p: Product) => {
    const { id, created_at, ...rest } = p;
    void id;
    void created_at;
    const { error } = await supabase.from("products").insert({
      ...rest,
      name: `${p.name} (copy)`,
      slug: `${p.slug}-copy-${Math.random().toString(36).slice(2, 6)}`,
      sku: p.sku ? `${p.sku}-COPY` : null,
      is_published: false,
      variants: p.variants as never,
    } as never);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Product duplicated as a draft");
    invalidate();
  };

  const save = async (p: Product) => {
    const parsed = schema.safeParse({
      name: p.name,
      slug: p.slug || slugify(p.name),
      price: Number(p.price),
      compare_at_price: p.compare_at_price === null ? null : Number(p.compare_at_price),
      sku: p.sku || null,
      description: p.description || null,
      stock_quantity: Number(p.stock_quantity),
      lead_time_days: Number(p.lead_time_days),
      sort_order: Number(p.sort_order),
    });
    if (!parsed.success) {
      const next: Record<string, string> = {};
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
      variants: p.variants as never,
      seo_title: p.seo_title || null,
      seo_description: p.seo_description || null,
    };

    const res = p.id
      ? await supabase.from("products").update(payload as never).eq("id", p.id)
      : await supabase.from("products").insert(payload as never);
    if (res.error) {
      toast.error(res.error.message);
      return;
    }
    toast.success(p.id ? "Product updated" : "Product created");
    setEditing(null);
    invalidate();
  };

  const columns: Column<Product>[] = [
    {
      key: "name",
      header: "Product",
      sortable: true,
      value: (p) => p.name,
      render: (p) => (
        <div className="flex items-center gap-3">
          {p.image_url ? (
            <img
              src={p.image_url}
              alt=""
              className="h-9 w-9 shrink-0 rounded-md object-cover"
              loading="lazy"
            />
          ) : (
            <div className="h-9 w-9 shrink-0 rounded-md bg-[var(--a-surface-2)]" />
          )}
          <div className="min-w-0">
            <p className="truncate font-medium">{p.name}</p>
            <p className="truncate text-[11px] text-[var(--a-muted)]">
              {p.sku || p.slug}
              {p.is_best_seller ? " · Best seller" : ""}
              {p.is_new_arrival ? " · New" : ""}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      hideOnMobile: true,
      sortable: true,
      value: (p) => categories.find((c) => c.id === p.category_id)?.name ?? "—",
    },
    {
      key: "price",
      header: "Price",
      sortable: true,
      value: (p) => Number(p.price),
      render: (p) => (
        <span>
          {p.compare_at_price && Number(p.compare_at_price) > Number(p.price) && (
            <span className="mr-1.5 text-[var(--a-muted)] line-through">
              {money(p.compare_at_price)}
            </span>
          )}
          {money(p.price)}
        </span>
      ),
    },
    {
      key: "stock",
      header: "Stock",
      hideOnMobile: true,
      sortable: true,
      value: (p) => (p.track_inventory ? p.stock_quantity : p.stock_status),
      render: (p) => (
        <span className="text-[var(--a-muted)]">
          {p.track_inventory ? `${p.stock_quantity} on hand` : p.stock_status.replace(/_/g, " ")}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      value: (p) => (p.is_archived ? "archived" : p.is_published ? "live" : "draft"),
      render: (p) => (
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium capitalize ${
            p.is_archived
              ? "bg-[var(--a-surface-2)] text-[var(--a-muted)]"
              : p.is_published
                ? "bg-[var(--a-positive)]/12 text-[var(--a-positive)]"
                : "bg-[var(--a-warning)]/12 text-[var(--a-warning)]"
          }`}
        >
          {p.is_archived ? "archived" : p.is_published ? "live" : "draft"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      render: (p) => (
        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
          <button
            title={p.is_published ? "Unpublish" : "Publish"}
            aria-label={p.is_published ? "Unpublish product" : "Publish product"}
            onClick={() =>
              quickPatch(
                [p.id],
                { is_published: !p.is_published },
                p.is_published ? "Hidden from the website" : "Published to the website",
              )
            }
            className="rounded-md p-1.5 text-[var(--a-muted)] hover:bg-[var(--a-surface-2)] hover:text-[var(--a-text)]"
          >
            {p.is_published ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
          <button
            title="Duplicate"
            aria-label="Duplicate product"
            onClick={() => duplicate(p)}
            className="rounded-md p-1.5 text-[var(--a-muted)] hover:bg-[var(--a-surface-2)] hover:text-[var(--a-text)]"
          >
            <Copy size={15} />
          </button>
          <button
            title={p.is_archived ? "Restore" : "Archive"}
            aria-label={p.is_archived ? "Restore product" : "Archive product"}
            onClick={() =>
              quickPatch(
                [p.id],
                { is_archived: !p.is_archived },
                p.is_archived ? "Product restored" : "Product archived",
              )
            }
            className="rounded-md p-1.5 text-[var(--a-muted)] hover:bg-[var(--a-surface-2)] hover:text-[var(--a-text)]"
          >
            <Archive size={15} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <AdminShell
      title="Products"
      description="The catalogue behind the public menu — pricing, variants, inventory and merchandising."
      actions={
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded-lg border border-[var(--a-border)] p-0.5 text-xs">
            {(["active", "archived"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`rounded-md px-3 py-1.5 capitalize ${
                  view === v
                    ? "bg-[var(--a-accent-soft)] text-[var(--a-text)]"
                    : "text-[var(--a-muted)]"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              setErrors({});
              setEditing(blank());
            }}
            className="flex h-9 items-center gap-2 rounded-lg bg-[var(--a-accent)] px-3.5 text-sm font-medium text-[var(--a-accent-fg)]"
          >
            <Plus size={15} /> New product
          </button>
        </div>
      }
    >
      <DataTable
        data={rows}
        columns={columns}
        loading={isLoading}
        exportName="circles-products"
        emptyLabel={view === "archived" ? "No archived products." : "No products yet."}
        onRowClick={(p) => {
          setErrors({});
          setEditing(p);
        }}
        bulkActions={[
          { label: "Publish", run: (r) => quickPatch(r.map((p) => p.id), { is_published: true }, "Published") },
          {
            label: "Unpublish",
            run: (r) => quickPatch(r.map((p) => p.id), { is_published: false }, "Unpublished"),
          },
          {
            label: "Mark best seller",
            run: (r) => quickPatch(r.map((p) => p.id), { is_best_seller: true }, "Marked as best sellers"),
          },
          {
            label: view === "archived" ? "Restore" : "Archive",
            run: (r) =>
              quickPatch(
                r.map((p) => p.id),
                { is_archived: view !== "archived" },
                view === "archived" ? "Restored" : "Archived",
              ),
          },
          { label: "Delete", destructive: true, run: (r) => remove(r.map((p) => p.id)) },
        ]}
      />

      {editing && (
        <ProductDrawer
          product={editing}
          categories={categories}
          errors={errors}
          onClose={() => setEditing(null)}
          onSave={save}
          onDelete={
            editing.id
              ? async () => {
                  await remove([editing.id]);
                  setEditing(null);
                }
              : undefined
          }
        />
      )}
    </AdminShell>
  );
}

/* ---------------- drawer ---------------- */

function ProductDrawer({
  product,
  categories,
  errors,
  onClose,
  onSave,
  onDelete,
}: {
  product: Product;
  categories: Category[];
  errors: Record<string, string>;
  onClose: () => void;
  onSave: (p: Product) => Promise<void>;
  onDelete?: () => Promise<void>;
}) {
  const [form, setForm] = useState<Product>(product);
  const [saving, setSaving] = useState(false);

  useEffect(() => setForm(product), [product]);

  const set = <K extends keyof Product>(key: K, value: Product[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const err = (k: string) =>
    errors[k] ? <p className="mt-1 text-[11px] text-[var(--a-danger)]">{errors[k]}</p> : null;

  const submit = async () => {
    setSaving(true);
    try {
      await onSave(form);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <button aria-label="Close" onClick={onClose} className="absolute inset-0 bg-black/40" />
      <div className="relative flex h-full w-full max-w-xl flex-col border-l border-[var(--a-border)] bg-[var(--a-surface)]">
        <div className="flex items-center justify-between border-b border-[var(--a-border)] px-5 py-4">
          <div className="min-w-0">
            <h2 className="truncate text-base font-semibold text-[var(--a-text)]">
              {form.id ? form.name || "Product" : "New product"}
            </h2>
            <p className="text-xs text-[var(--a-muted)]">
              Changes go live on the website immediately.
            </p>
          </div>
          <button onClick={onClose} aria-label="Close drawer">
            <X size={18} className="text-[var(--a-muted)]" />
          </button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="sm:col-span-2">
              <Label>Name</Label>
              <input
                className={field}
                value={form.name}
                onChange={(e) => {
                  const name = e.target.value;
                  setForm((f) => ({
                    ...f,
                    name,
                    slug: f.id ? f.slug : slugify(name),
                  }));
                }}
              />
              {err("name")}
            </label>
            <label>
              <Label>Slug</Label>
              <input
                className={field}
                value={form.slug}
                onChange={(e) => set("slug", slugify(e.target.value))}
              />
              {err("slug")}
            </label>
            <label>
              <Label>SKU</Label>
              <input
                className={field}
                value={form.sku ?? ""}
                onChange={(e) => set("sku", e.target.value)}
              />
              {err("sku")}
            </label>
            <label>
              <Label>Category</Label>
              <select
                className={field}
                value={form.category_id ?? ""}
                onChange={(e) => set("category_id", e.target.value || null)}
              >
                <option value="">Uncategorised</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <Label>Sort order</Label>
              <input
                type="number"
                className={field}
                value={form.sort_order}
                onChange={(e) => set("sort_order", Number(e.target.value))}
              />
              {err("sort_order")}
            </label>
            <label>
              <Label>Price (PKR)</Label>
              <input
                type="number"
                className={field}
                value={form.price}
                onChange={(e) => set("price", Number(e.target.value))}
              />
              {err("price")}
            </label>
            <label>
              <Label>Discount was-price</Label>
              <input
                type="number"
                className={field}
                value={form.compare_at_price ?? ""}
                placeholder="Optional"
                onChange={(e) =>
                  set("compare_at_price", e.target.value === "" ? null : Number(e.target.value))
                }
              />
              {err("compare_at_price")}
            </label>
            <label className="sm:col-span-2">
              <Label>Description</Label>
              <textarea
                rows={3}
                className={`${field} h-auto py-2`}
                value={form.description ?? ""}
                onChange={(e) => set("description", e.target.value)}
              />
              {err("description")}
            </label>
            <label className="sm:col-span-2">
              <Label>Image URL</Label>
              <input
                className={field}
                value={form.image_url ?? ""}
                placeholder="https://…"
                onChange={(e) => set("image_url", e.target.value)}
              />
            </label>
          </div>

          {/* variants */}
          <div>
            <Label>Variants (size / weight)</Label>
            <div className="space-y-2">
              {form.variants.map((v, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    className={field}
                    placeholder="Label, e.g. 2.5 lb"
                    value={v.label}
                    onChange={(e) =>
                      set(
                        "variants",
                        form.variants.map((x, j) =>
                          j === i ? { ...x, label: e.target.value } : x,
                        ),
                      )
                    }
                  />
                  <input
                    type="number"
                    className={`${field} max-w-[130px]`}
                    placeholder="Price"
                    value={v.price}
                    onChange={(e) =>
                      set(
                        "variants",
                        form.variants.map((x, j) =>
                          j === i ? { ...x, price: Number(e.target.value) } : x,
                        ),
                      )
                    }
                  />
                  <button
                    aria-label="Remove variant"
                    onClick={() =>
                      set(
                        "variants",
                        form.variants.filter((_, j) => j !== i),
                      )
                    }
                    className="rounded-md p-2 text-[var(--a-muted)] hover:text-[var(--a-danger)]"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => set("variants", [...form.variants, { label: "", price: 0 }])}
                className="flex items-center gap-2 rounded-lg border border-[var(--a-border)] px-3 py-1.5 text-xs text-[var(--a-text)] hover:bg-[var(--a-surface-2)]"
              >
                <Plus size={13} /> Add variant
              </button>
            </div>
          </div>

          {/* inventory */}
          <div className="grid gap-3 sm:grid-cols-2">
            <label>
              <Label>Stock status</Label>
              <select
                className={field}
                value={form.stock_status}
                onChange={(e) => set("stock_status", e.target.value)}
              >
                {STOCK.map((s) => (
                  <option key={s} value={s}>
                    {s.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <Label>Quantity on hand</Label>
              <input
                type="number"
                className={field}
                value={form.stock_quantity}
                onChange={(e) => set("stock_quantity", Number(e.target.value))}
              />
              {err("stock_quantity")}
            </label>
            <label>
              <Label>Lead time (days)</Label>
              <input
                type="number"
                className={field}
                value={form.lead_time_days}
                onChange={(e) => set("lead_time_days", Number(e.target.value))}
              />
              {err("lead_time_days")}
            </label>
            <label>
              <Label>Tags (comma separated)</Label>
              <input
                className={field}
                value={form.tags.join(", ")}
                onChange={(e) =>
                  set(
                    "tags",
                    e.target.value
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean),
                  )
                }
              />
            </label>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            <Toggle
              label="Published on website"
              checked={form.is_published}
              onChange={(v) => set("is_published", v)}
            />
            <Toggle
              label="Available to order"
              checked={form.is_available}
              onChange={(v) => set("is_available", v)}
            />
            <Toggle
              label="Track inventory"
              checked={form.track_inventory}
              onChange={(v) => set("track_inventory", v)}
            />
            <Toggle
              label="Custom cake"
              checked={form.is_custom_cake}
              onChange={(v) => set("is_custom_cake", v)}
            />
            <Toggle label="Featured" checked={form.is_featured} onChange={(v) => set("is_featured", v)} />
            <Toggle
              label="Best seller"
              checked={form.is_best_seller}
              onChange={(v) => set("is_best_seller", v)}
            />
            <Toggle
              label="New arrival"
              checked={form.is_new_arrival}
              onChange={(v) => set("is_new_arrival", v)}
            />
            <Toggle label="Archived" checked={form.is_archived} onChange={(v) => set("is_archived", v)} />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label>
              <Label>SEO title</Label>
              <input
                className={field}
                value={form.seo_title ?? ""}
                onChange={(e) => set("seo_title", e.target.value)}
              />
            </label>
            <label>
              <Label>SEO description</Label>
              <input
                className={field}
                value={form.seo_description ?? ""}
                onChange={(e) => set("seo_description", e.target.value)}
              />
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-[var(--a-border)] px-5 py-4">
          {onDelete ? (
            <button
              onClick={onDelete}
              className="flex items-center gap-2 text-sm text-[var(--a-danger)]"
            >
              <Trash2 size={15} /> Delete
            </button>
          ) : (
            <span className="flex items-center gap-2 text-xs text-[var(--a-muted)]">
              <Sparkles size={14} /> Appears on /menu once published
            </span>
          )}
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="h-9 rounded-lg border border-[var(--a-border)] px-3.5 text-sm text-[var(--a-text)]"
            >
              Cancel
            </button>
            <button
              onClick={submit}
              disabled={saving}
              className="h-9 rounded-lg bg-[var(--a-accent)] px-4 text-sm font-medium text-[var(--a-accent-fg)] disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save product"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
