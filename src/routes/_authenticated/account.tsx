import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LogOut, Calendar, ShoppingBag, Star, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/_authenticated/account")({
  head: () => ({
    meta: [
      { title: "My Account · Circles Bakers" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AccountPage,
});

interface Profile {
  full_name: string | null;
  email: string | null;
  phone: string | null;
  loyalty_points: number;
  lifetime_spend: number;
}

function AccountPage() {
  const { user, isStaff, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [reservations, setReservations] = useState<number>(0);
  const [orders, setOrders] = useState<number>(0);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const [{ data: p }, { count: rc }, { count: oc }] = await Promise.all([
        supabase
          .from("profiles")
          .select("full_name, email, phone, loyalty_points, lifetime_spend")
          .eq("id", user.id)
          .maybeSingle(),
        supabase
          .from("reservations")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user.id),
        supabase
          .from("orders")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user.id),
      ]);
      setProfile(p as Profile | null);
      setReservations(rc ?? 0);
      setOrders(oc ?? 0);
    })();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out");
    navigate({ to: "/" });
  };

  const stats = [
    { icon: Star, label: "Loyalty Points", value: profile?.loyalty_points ?? 0 },
    { icon: ShoppingBag, label: "Orders", value: orders },
    { icon: Calendar, label: "Reservations", value: reservations },
  ];

  return (
    <main className="min-h-[100svh] bg-background px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link to="/" className="font-display text-2xl tracking-[0.2em] text-foreground">
              Circles
            </Link>
            <h1 className="mt-3 font-display text-4xl text-ivory md:text-5xl">
              {profile?.full_name ? `Hello, ${profile.full_name.split(" ")[0]}` : "My Account"}
            </h1>
          </div>
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-5 py-2.5 font-body text-xs uppercase tracking-[0.2em] text-beige transition-colors hover:border-gold hover:text-gold"
          >
            <LogOut size={15} /> Sign out
          </button>
        </div>

        {isStaff && (
          <Link
            to="/admin"
            className="mt-8 flex items-center gap-3 rounded-xl border border-gold/40 bg-gold/5 px-5 py-4 font-body text-sm text-gold transition-colors hover:bg-gold/10"
          >
            <ShieldCheck size={18} /> Open Admin Dashboard
          </Link>
        )}

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="glass rounded-xl p-6"
            >
              <s.icon className="text-gold" size={22} />
              <p className="mt-4 font-display text-3xl text-ivory">{s.value}</p>
              <p className="font-body text-xs uppercase tracking-[0.15em] text-beige/60">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="glass mt-6 rounded-xl p-6 md:p-8">
          <h2 className="font-display text-2xl text-ivory">Profile</h2>
          <dl className="mt-5 grid gap-4 sm:grid-cols-2">
            <Detail label="Name" value={profile?.full_name} />
            <Detail label="Email" value={profile?.email ?? user?.email} />
            <Detail label="Phone" value={profile?.phone} />
            <Detail
              label="Lifetime spend"
              value={profile ? `Rs ${Number(profile.lifetime_spend).toLocaleString()}` : "—"}
            />
          </dl>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/menu"
            className="rounded-full bg-gold px-7 py-3 font-body text-xs uppercase tracking-[0.2em] text-scrim transition-colors hover:bg-gold-soft"
          >
            Order from menu
          </Link>
          <Link
            to="/"
            hash="reservation"
            className="rounded-full border border-foreground/20 px-7 py-3 font-body text-xs uppercase tracking-[0.2em] text-beige transition-colors hover:border-gold hover:text-gold"
          >
            Book a table
          </Link>
        </div>
      </div>
    </main>
  );
}

function Detail({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <dt className="font-body text-[11px] uppercase tracking-[0.2em] text-beige/50">
        {label}
      </dt>
      <dd className="mt-1 font-body text-sm text-ivory">{value || "—"}</dd>
    </div>
  );
}
