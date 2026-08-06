import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { AdminShell } from "@/components/admin/AdminShell";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { StatusBadge, dateTime, money, shortDate } from "@/components/admin/format";
import { Crown, X } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/customers")({
  head: () => ({
    meta: [
      { title: "Customers · Circles CRM" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CustomersPage,
});

interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  birthday: string | null;
  loyalty_points: number;
  lifetime_spend: number;
  notes: string | null;
  marketing_opt_in: boolean;
  created_at: string;
}

const VIP_THRESHOLD = 25000;

function CustomersPage() {
  const qc = useQueryClient();
  const [active, setActive] = useState<Profile | null>(null);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "customers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Profile[];
    },
  });

  const { data: history } = useQuery({
    queryKey: ["admin", "customer-orders", active?.id],
    enabled: !!active,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("id, order_number, status, total, created_at")
        .eq("user_id", active!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
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
    setActive({ ...active, notes });
    qc.invalidateQueries({ queryKey: ["admin", "customers"] });
  };

  const columns: Column<Profile>[] = [
    {
      key: "full_name",
      header: "Customer",
      sortable: true,
      value: (p) => p.full_name ?? "—",
      render: (p) => (
        <span className="flex items-center gap-1.5 font-medium">
          {p.full_name ?? "Unnamed"}
          {Number(p.lifetime_spend) >= VIP_THRESHOLD && (
            <Crown size={13} className="text-[var(--a-accent)]" aria-label="VIP" />
          )}
        </span>
      ),
    },
    { key: "email", header: "Email", sortable: true, value: (p) => p.email ?? "" },
    { key: "phone", header: "Phone", value: (p) => p.phone ?? "", hideOnMobile: true },
    {
      key: "lifetime_spend",
      header: "Lifetime spend",
      sortable: true,
      value: (p) => Number(p.lifetime_spend),
      render: (p) => money(p.lifetime_spend),
    },
    {
      key: "loyalty_points",
      header: "Points",
      sortable: true,
      value: (p) => p.loyalty_points,
      hideOnMobile: true,
    },
    {
      key: "marketing_opt_in",
      header: "Marketing",
      value: (p) => (p.marketing_opt_in ? "opted in" : "no"),
      hideOnMobile: true,
    },
    {
      key: "created_at",
      header: "Joined",
      sortable: true,
      value: (p) => p.created_at,
      render: (p) => shortDate(p.created_at),
      hideOnMobile: true,
    },
  ];

  return (
    <AdminShell
      title="Customers"
      description="Registered customer profiles, spend and purchase history."
    >
      <DataTable
        data={data ?? []}
        columns={columns}
        loading={isLoading}
        exportName="circles-customers"
        emptyLabel="No customers yet."
        onRowClick={(p) => {
          setActive(p);
          setNotes(p.notes ?? "");
        }}
      />

      {active && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <button
            aria-label="Close customer"
            onClick={() => setActive(null)}
            className="absolute inset-0 bg-black/40"
          />
          <div className="relative h-full w-full max-w-md overflow-y-auto border-l border-[var(--a-border)] bg-[var(--a-surface)] p-5">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-[var(--a-text)]">
                  {active.full_name ?? "Unnamed customer"}
                </h2>
                <p className="text-xs text-[var(--a-muted)]">
                  {active.email ?? "—"}
                  {active.phone ? ` · ${active.phone}` : ""}
                </p>
              </div>
              <button onClick={() => setActive(null)} aria-label="Close">
                <X size={16} className="text-[var(--a-muted)]" />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <Stat label="Lifetime spend" value={money(active.lifetime_spend)} />
              <Stat label="Loyalty points" value={String(active.loyalty_points)} />
              <Stat label="Birthday" value={active.birthday ? shortDate(active.birthday) : "—"} />
              <Stat
                label="Group"
                value={Number(active.lifetime_spend) >= VIP_THRESHOLD ? "VIP" : "Standard"}
              />
            </div>

            <div className="mt-5">
              <p className="text-xs font-medium uppercase tracking-wider text-[var(--a-muted)]">
                Purchase history
              </p>
              <ul className="mt-2 divide-y divide-[var(--a-border)] rounded-lg border border-[var(--a-border)]">
                {(history ?? []).map((o) => (
                  <li key={o.id} className="flex items-center justify-between gap-2 px-3 py-2">
                    <div>
                      <p className="text-sm text-[var(--a-text)]">#{o.order_number}</p>
                      <p className="text-[11px] text-[var(--a-muted)]">{dateTime(o.created_at)}</p>
                    </div>
                    <span className="flex items-center gap-2">
                      <StatusBadge status={o.status} />
                      <span className="text-sm text-[var(--a-muted)]">{money(o.total)}</span>
                    </span>
                  </li>
                ))}
                {(history ?? []).length === 0 && (
                  <li className="px-3 py-3 text-sm text-[var(--a-muted)]">No orders yet.</li>
                )}
              </ul>
            </div>

            <div className="mt-5">
              <label
                htmlFor="cust-notes"
                className="text-xs font-medium uppercase tracking-wider text-[var(--a-muted)]"
              >
                CRM note
              </label>
              <textarea
                id="cust-notes"
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
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[var(--a-border)] p-3">
      <p className="text-[11px] uppercase tracking-wider text-[var(--a-muted)]">{label}</p>
      <p className="mt-1 text-sm font-medium text-[var(--a-text)]">{value}</p>
    </div>
  );
}
