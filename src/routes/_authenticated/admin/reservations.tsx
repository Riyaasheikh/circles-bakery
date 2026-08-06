import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { AdminShell } from "@/components/admin/AdminShell";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { StatusBadge, shortDate } from "@/components/admin/format";

export const Route = createFileRoute("/_authenticated/admin/reservations")({
  head: () => ({
    meta: [
      { title: "Reservations · Circles CRM" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ReservationsPage,
});

const STATUSES = ["pending", "confirmed", "cancelled", "completed"] as const;
type ResStatus = (typeof STATUSES)[number];

interface Reservation {
  id: string;
  full_name: string;
  phone: string;
  email: string | null;
  party_size: number;
  reservation_date: string;
  reservation_time: string;
  occasion: string | null;
  special_requests: string | null;
  status: string;
  created_at: string;
}

function ReservationsPage() {
  const qc = useQueryClient();
  const [statusFilter, setStatusFilter] = useState("all");

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "reservations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reservations")
        .select("*")
        .order("reservation_date", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Reservation[];
    },
  });

  const setStatus = async (ids: string[], status: ResStatus): Promise<void> => {
    const { error } = await supabase.from("reservations").update({ status }).in("id", ids);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(`Marked ${ids.length} booking${ids.length === 1 ? "" : "s"} ${status}`);
    qc.invalidateQueries({ queryKey: ["admin"] });
  };

  const rows = (data ?? []).filter((r) => statusFilter === "all" || r.status === statusFilter);

  const columns: Column<Reservation>[] = [
    { key: "full_name", header: "Guest", sortable: true, value: (r) => r.full_name },
    { key: "phone", header: "Phone", value: (r) => r.phone },
    {
      key: "reservation_date",
      header: "Date",
      sortable: true,
      value: (r) => r.reservation_date,
      render: (r) => `${shortDate(r.reservation_date)} · ${r.reservation_time.slice(0, 5)}`,
    },
    { key: "party_size", header: "Guests", sortable: true, value: (r) => r.party_size },
    { key: "occasion", header: "Occasion", value: (r) => r.occasion ?? "", hideOnMobile: true },
    {
      key: "special_requests",
      header: "Requests",
      value: (r) => r.special_requests ?? "",
      hideOnMobile: true,
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      value: (r) => r.status,
      render: (r) => <StatusBadge status={r.status} />,
    },
  ];

  return (
    <AdminShell title="Reservations" description="Table bookings requested from the website.">
      <DataTable
        data={rows}
        columns={columns}
        loading={isLoading}
        exportName="circles-reservations"
        emptyLabel="No reservations match these filters."
        bulkActions={[
          { label: "Confirm", run: (rs) => setStatus(rs.map((r) => r.id), "confirmed") },
          { label: "Complete", run: (rs) => setStatus(rs.map((r) => r.id), "completed") },
          {
            label: "Cancel",
            destructive: true,
            run: (rs) => setStatus(rs.map((r) => r.id), "cancelled"),
          },
        ]}
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
    </AdminShell>
  );
}
