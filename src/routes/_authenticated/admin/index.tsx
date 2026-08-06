import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { AdminShell } from "@/components/admin/AdminShell";
import { StatusBadge, dateTime, money } from "@/components/admin/format";
import { CalendarCheck, ShoppingBag, TrendingUp, Users } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/")({
  head: () => ({
    meta: [
      { title: "Dashboard · Circles CRM" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardPage,
});

interface OrderRow {
  id: string;
  order_number: number;
  customer_name: string;
  total: number;
  status: string;
  created_at: string;
}

function useDashboard() {
  return useQuery({
    queryKey: ["admin", "dashboard"],
    queryFn: async () => {
      const [orders, payments, items, reservations, customers] = await Promise.all([
        supabase
          .from("orders")
          .select("id, order_number, customer_name, total, status, created_at")
          .order("created_at", { ascending: false })
          .limit(500),
        supabase.from("payments").select("amount, status, created_at").limit(1000),
        supabase.from("order_items").select("product_name, quantity, unit_price").limit(2000),
        supabase.from("reservations").select("id, status, reservation_date").limit(1000),
        supabase.from("profiles").select("id", { count: "exact", head: true }),
      ]);
      if (orders.error) throw orders.error;
      return {
        orders: (orders.data ?? []) as OrderRow[],
        payments: payments.data ?? [],
        items: items.data ?? [],
        reservations: reservations.data ?? [],
        customerCount: customers.count ?? 0,
      };
    },
  });
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  loading,
}: {
  icon: typeof ShoppingBag;
  label: string;
  value: string;
  sub: string;
  loading?: boolean;
}) {
  return (
    <div className="rounded-xl border border-[var(--a-border)] bg-[var(--a-surface)] p-4 shadow-[0_1px_2px_rgba(16,20,24,0.05)]">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-[var(--a-muted)]">
          {label}
        </p>
        <Icon size={16} className="text-[var(--a-accent)]" />
      </div>
      {loading ? (
        <div className="mt-3 h-7 w-24 animate-pulse rounded bg-[var(--a-surface-2)]" />
      ) : (
        <p className="mt-2 text-2xl font-semibold tracking-tight text-[var(--a-text)]">{value}</p>
      )}
      <p className="mt-1 text-xs text-[var(--a-muted)]">{sub}</p>
    </div>
  );
}

function DashboardPage() {
  const { data, isLoading } = useDashboard();

  const orders = data?.orders ?? [];
  const revenue = (data?.payments ?? [])
    .filter((p) => p.status === "succeeded")
    .reduce((s, p) => s + Number(p.amount ?? 0), 0);
  const pipeline = orders
    .filter((o) => !["cancelled", "refunded"].includes(o.status))
    .reduce((s, o) => s + Number(o.total ?? 0), 0);
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const pendingRes = (data?.reservations ?? []).filter((r) => r.status === "pending").length;

  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    const key = d.toISOString().slice(0, 10);
    const dayOrders = orders.filter((o) => o.created_at.slice(0, 10) === key);
    return {
      day: d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }),
      value: dayOrders.reduce((s, o) => s + Number(o.total ?? 0), 0),
      orders: dayOrders.length,
    };
  });

  const topProducts = Object.values(
    (data?.items ?? []).reduce<Record<string, { name: string; revenue: number; qty: number }>>(
      (acc, it) => {
        const name = it.product_name ?? "Unknown";
        acc[name] ??= { name, revenue: 0, qty: 0 };
        acc[name].revenue += Number(it.unit_price ?? 0) * Number(it.quantity ?? 0);
        acc[name].qty += Number(it.quantity ?? 0);
        return acc;
      },
      {},
    ),
  )
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 6);

  return (
    <AdminShell
      title="Dashboard"
      description="Live business overview for Circles Bakers, Sahiwal."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={TrendingUp}
          label="Collected revenue"
          value={money(revenue)}
          sub={`${money(pipeline)} in active orders`}
          loading={isLoading}
        />
        <StatCard
          icon={ShoppingBag}
          label="Orders"
          value={String(orders.length)}
          sub={`${pendingOrders} awaiting confirmation`}
          loading={isLoading}
        />
        <StatCard
          icon={Users}
          label="Customers"
          value={String(data?.customerCount ?? 0)}
          sub="registered accounts"
          loading={isLoading}
        />
        <StatCard
          icon={CalendarCheck}
          label="Reservations"
          value={String(data?.reservations.length ?? 0)}
          sub={`${pendingRes} pending`}
          loading={isLoading}
        />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-[var(--a-border)] bg-[var(--a-surface)] p-4 lg:col-span-2">
          <h2 className="text-sm font-semibold text-[var(--a-text)]">Order value · last 14 days</h2>
          <div className="mt-4 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={days} margin={{ left: -12, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--a-accent)" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="var(--a-accent)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--a-border)" vertical={false} />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 11, fill: "var(--a-muted)" }}
                  stroke="var(--a-border)"
                />
                <YAxis tick={{ fontSize: 11, fill: "var(--a-muted)" }} stroke="var(--a-border)" />
                <Tooltip
                  contentStyle={{
                    background: "var(--a-surface)",
                    border: "1px solid var(--a-border)",
                    borderRadius: 8,
                    fontSize: 12,
                    color: "var(--a-text)",
                  }}
                  formatter={(v: number) => money(v)}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="var(--a-accent)"
                  strokeWidth={2}
                  fill="url(#rev)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-[var(--a-border)] bg-[var(--a-surface)] p-4">
          <h2 className="text-sm font-semibold text-[var(--a-text)]">Top products</h2>
          {topProducts.length === 0 ? (
            <p className="mt-6 text-sm text-[var(--a-muted)]">
              No order items recorded yet. Sales will appear here as orders come in.
            </p>
          ) : (
            <div className="mt-4 h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topProducts} layout="vertical" margin={{ left: 8, right: 8 }}>
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={110}
                    tick={{ fontSize: 11, fill: "var(--a-muted)" }}
                    stroke="var(--a-border)"
                  />
                  <Tooltip
                    contentStyle={{
                      background: "var(--a-surface)",
                      border: "1px solid var(--a-border)",
                      borderRadius: 8,
                      fontSize: 12,
                      color: "var(--a-text)",
                    }}
                    formatter={(v: number) => money(v)}
                  />
                  <Bar dataKey="revenue" fill="var(--a-accent)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-[var(--a-border)] bg-[var(--a-surface)]">
        <div className="flex items-center justify-between border-b border-[var(--a-border)] p-4">
          <h2 className="text-sm font-semibold text-[var(--a-text)]">Recent orders</h2>
          <Link
            to="/admin/orders"
            className="text-xs font-medium text-[var(--a-accent)] hover:underline"
          >
            View all
          </Link>
        </div>
        <ul className="divide-y divide-[var(--a-border)]">
          {isLoading &&
            Array.from({ length: 4 }).map((_, i) => (
              <li key={i} className="p-4">
                <div className="h-4 w-2/3 animate-pulse rounded bg-[var(--a-surface-2)]" />
              </li>
            ))}
          {!isLoading && orders.length === 0 && (
            <li className="p-6 text-sm text-[var(--a-muted)]">No orders yet.</li>
          )}
          {orders.slice(0, 6).map((o) => (
            <li key={o.id} className="flex items-center justify-between gap-3 p-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-[var(--a-text)]">
                  #{o.order_number} · {o.customer_name}
                </p>
                <p className="text-xs text-[var(--a-muted)]">{dateTime(o.created_at)}</p>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={o.status} />
                <span className="text-sm font-medium text-[var(--a-text)]">{money(o.total)}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AdminShell>
  );
}
