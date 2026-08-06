import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { AdminShell } from "@/components/admin/AdminShell";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { StatusBadge, dateTime, money } from "@/components/admin/format";
import { Printer, X } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/orders")({
  head: () => ({
    meta: [
      { title: "Orders · Circles CRM" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OrdersPage,
});

const STATUSES = [
  "pending",
  "confirmed",
  "preparing",
  "ready",
  "completed",
  "cancelled",
  "refunded",
] as const;
type OrderStatus = (typeof STATUSES)[number];

interface Order {
  id: string;
  order_number: number;
  customer_name: string;
  phone: string;
  email: string | null;
  order_type: string;
  status: string;
  fulfillment_date: string | null;
  delivery_address: string | null;
  subtotal: number;
  total: number;
  notes: string | null;
  created_at: string;
}

function OrdersPage() {
  const qc = useQueryClient();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [active, setActive] = useState<Order | null>(null);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Order[];
    },
  });

  const { data: items } = useQuery({
    queryKey: ["admin", "order-items", active?.id],
    enabled: !!active,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("order_items")
        .select("id, product_name, quantity, unit_price, notes")
        .eq("order_id", active!.id);
      if (error) throw error;
      return data ?? [];
    },
  });

  const { data: payments } = useQuery({
    queryKey: ["admin", "order-payments", active?.id],
    enabled: !!active,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("payments")
        .select("id, amount, method, provider, status, created_at")
        .eq("order_id", active!.id);
      if (error) throw error;
      return data ?? [];
    },
  });

  const rows = useMemo(
    () => (data ?? []).filter((o) => statusFilter === "all" || o.status === statusFilter),
    [data, statusFilter],
  );

  const refresh = () => qc.invalidateQueries({ queryKey: ["admin"] });

  const setStatus = async (ids: string[], status: OrderStatus): Promise<void> => {
    const { error } = await supabase.from("orders").update({ status }).in("id", ids);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(`Updated ${ids.length} order${ids.length === 1 ? "" : "s"} to ${status}`);
    if (active && ids.includes(active.id)) setActive({ ...active, status });
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
    setActive({ ...active, notes });
    refresh();
  };

  const columns: Column<Order>[] = [
    {
      key: "order_number",
      header: "Order",
      sortable: true,
      value: (o) => o.order_number,
      render: (o) => <span className="font-medium">#{o.order_number}</span>,
    },
    { key: "customer_name", header: "Customer", sortable: true, value: (o) => o.customer_name },
    { key: "phone", header: "Phone", value: (o) => o.phone, hideOnMobile: true },
    { key: "order_type", header: "Type", value: (o) => o.order_type, hideOnMobile: true },
    {
      key: "status",
      header: "Status",
      sortable: true,
      value: (o) => o.status,
      render: (o) => <StatusBadge status={o.status} />,
    },
    {
      key: "total",
      header: "Total",
      sortable: true,
      value: (o) => o.total,
      render: (o) => money(o.total),
    },
    {
      key: "created_at",
      header: "Placed",
      sortable: true,
      value: (o) => o.created_at,
      render: (o) => dateTime(o.created_at),
      hideOnMobile: true,
    },
  ];

  return (
    <AdminShell title="Orders" description="Every order placed through the website, live.">
      <DataTable
        data={rows}
        columns={columns}
        loading={isLoading}
        exportName="circles-orders"
        onRowClick={(o) => {
          setActive(o);
          setNotes(o.notes ?? "");
        }}
        bulkActions={[
          { label: "Mark confirmed", run: (rs) => setStatus(rs.map((r) => r.id), "confirmed") },
          { label: "Mark completed", run: (rs) => setStatus(rs.map((r) => r.id), "completed") },
          {
            label: "Cancel",
            destructive: true,
            run: (rs) => setStatus(rs.map((r) => r.id), "cancelled"),
          },
        ]}
        emptyLabel="No orders match these filters."
        toolbar={
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by status"
            className="h-9 rounded-lg border border-[var(--a-border)] bg-[var(--a-surface-2)] px-2 text-sm text-[var(--a-text)]"
          >
            <option value="all">All statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        }
      />

      {active && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <button
            aria-label="Close order"
            onClick={() => setActive(null)}
            className="absolute inset-0 bg-black/40"
          />
          <div className="relative h-full w-full max-w-md overflow-y-auto border-l border-[var(--a-border)] bg-[var(--a-surface)] p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-[var(--a-muted)]">
                  Order #{active.order_number}
                </p>
                <h2 className="mt-1 text-lg font-semibold text-[var(--a-text)]">
                  {active.customer_name}
                </h2>
                <p className="text-xs text-[var(--a-muted)]">
                  {active.phone}
                  {active.email ? ` · ${active.email}` : ""}
                </p>
              </div>
              <button onClick={() => setActive(null)} aria-label="Close">
                <X size={16} className="text-[var(--a-muted)]" />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <Info label="Type" value={active.order_type} />
              <Info label="Fulfilment" value={active.fulfillment_date ?? "—"} />
              <Info label="Subtotal" value={money(active.subtotal)} />
              <Info label="Total" value={money(active.total)} />
              {active.delivery_address && (
                <div className="col-span-2">
                  <Info label="Address" value={active.delivery_address} />
                </div>
              )}
            </div>

            <div className="mt-5">
              <p className="text-xs font-medium uppercase tracking-wider text-[var(--a-muted)]">
                Status
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatus([active.id], s)}
                    className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize transition-colors ${
                      active.status === s
                        ? "bg-[var(--a-accent)] text-[var(--a-accent-fg)]"
                        : "border border-[var(--a-border)] text-[var(--a-muted)] hover:text-[var(--a-text)]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <p className="text-xs font-medium uppercase tracking-wider text-[var(--a-muted)]">
                Items
              </p>
              <ul className="mt-2 divide-y divide-[var(--a-border)] rounded-lg border border-[var(--a-border)]">
                {(items ?? []).map((it) => (
                  <li key={it.id} className="flex justify-between gap-2 px-3 py-2 text-sm">
                    <span className="text-[var(--a-text)]">
                      {it.quantity} × {it.product_name}
                    </span>
                    <span className="text-[var(--a-muted)]">
                      {money(Number(it.unit_price) * Number(it.quantity))}
                    </span>
                  </li>
                ))}
                {(items ?? []).length === 0 && (
                  <li className="px-3 py-3 text-sm text-[var(--a-muted)]">No line items.</li>
                )}
              </ul>
            </div>

            <div className="mt-5">
              <p className="text-xs font-medium uppercase tracking-wider text-[var(--a-muted)]">
                Payments
              </p>
              <ul className="mt-2 space-y-2">
                {(payments ?? []).map((p) => (
                  <li
                    key={p.id}
                    className="flex items-center justify-between rounded-lg border border-[var(--a-border)] px-3 py-2 text-sm"
                  >
                    <span className="capitalize text-[var(--a-text)]">
                      {p.method} · {p.provider}
                    </span>
                    <span className="flex items-center gap-2">
                      <StatusBadge status={p.status} />
                      <span className="text-[var(--a-muted)]">{money(p.amount)}</span>
                    </span>
                  </li>
                ))}
                {(payments ?? []).length === 0 && (
                  <li className="text-sm text-[var(--a-muted)]">No payment records.</li>
                )}
              </ul>
            </div>

            <div className="mt-5">
              <label
                htmlFor="order-notes"
                className="text-xs font-medium uppercase tracking-wider text-[var(--a-muted)]"
              >
                Internal note
              </label>
              <textarea
                id="order-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="mt-2 w-full rounded-lg border border-[var(--a-border)] bg-[var(--a-surface-2)] p-3 text-sm text-[var(--a-text)] outline-none focus:border-[var(--a-accent)]"
              />
              <div className="mt-2 flex gap-2">
                <button
                  onClick={saveNotes}
                  disabled={saving}
                  className="rounded-lg bg-[var(--a-accent)] px-3 py-2 text-xs font-semibold text-[var(--a-accent-fg)] disabled:opacity-60"
                >
                  {saving ? "Saving…" : "Save note"}
                </button>
                <button
                  onClick={() => setNotes(active.notes ?? "")}
                  className="rounded-lg border border-[var(--a-border)] px-3 py-2 text-xs font-medium text-[var(--a-muted)]"
                >
                  Undo
                </button>
                <button
                  onClick={() => window.print()}
                  className="ml-auto flex items-center gap-1.5 rounded-lg border border-[var(--a-border)] px-3 py-2 text-xs font-medium text-[var(--a-muted)]"
                >
                  <Printer size={13} /> Invoice
                </button>
              </div>
            </div>

            <p className="mt-5 text-xs text-[var(--a-muted)]">
              Placed {dateTime(active.created_at)}
            </p>
          </div>
        </div>
      )}
    </AdminShell>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-wider text-[var(--a-muted)]">{label}</p>
      <p className="text-sm capitalize text-[var(--a-text)]">{value}</p>
    </div>
  );
}
