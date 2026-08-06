import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { Reveal } from "./Reveal";
import { Magnetic } from "./Magnetic";
import { supabase } from "@/integrations/supabase/client";

const GUESTS = ["1", "2", "3", "4", "5", "6+"];

const reservationSchema = z.object({
  full_name: z.string().trim().min(1, "Please enter your name").max(100),
  phone: z.string().trim().min(6, "Please enter a valid phone number").max(30),
  reservation_date: z.string().min(1, "Please pick a date"),
  reservation_time: z.string().min(1, "Please pick a time"),
  party_size: z.number().int().min(1).max(20),
  occasion: z.string().trim().max(120).optional().or(z.literal("")),
});

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="group block">
      <span className="font-body text-[11px] uppercase tracking-[0.22em] text-beige">
        {label}
      </span>
      <div className="mt-2 border-b border-foreground/20 pb-3 transition-colors focus-within:border-gold">
        {children}
      </div>
    </label>
  );
}

const inputCls =
  "w-full bg-transparent font-body text-ivory placeholder:text-beige/30 focus:outline-none [color-scheme:light]";

export function Reservation() {
  const [guests, setGuests] = useState("2");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    reservation_date: "",
    reservation_time: "",
    occasion: "",
  });

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const partySize = guests === "6+" ? 6 : parseInt(guests, 10);
    const parsed = reservationSchema.safeParse({ ...form, party_size: partySize });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check your details.");
      return;
    }

    setSubmitting(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      const { error: insertError } = await supabase.from("reservations").insert({
        full_name: parsed.data.full_name,
        phone: parsed.data.phone,
        reservation_date: parsed.data.reservation_date,
        reservation_time: parsed.data.reservation_time,
        party_size: parsed.data.party_size,
        occasion: parsed.data.occasion || null,
        user_id: userData.user?.id ?? null,
      });
      if (insertError) throw insertError;
      setSent(true);
    } catch (err) {
      console.error("Reservation failed", err);
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="reservation" className="relative bg-charcoal px-6 py-28 md:px-10 md:py-40">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background: "radial-gradient(circle at 20% 30%, var(--accent-glow), transparent 50%)",
        }}
      />
      <div className="relative mx-auto grid max-w-6xl gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Reveal>
            <p className="eyebrow mb-6">Reservations</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl leading-tight text-ivory md:text-6xl">
              Reserve your <span className="text-gold-gradient">table.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-7 max-w-md font-body text-sm font-light leading-relaxed text-beige/70">
              Join us for breakfast, fresh pastries, afternoon coffee or family dining. For
              celebration cakes and large parties, share the details and our team
              will be in touch.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 space-y-3 font-body text-sm text-beige/70">
              <p>Open daily · Closes 1:00 AM</p>
              <p className="text-gold">+92 310 1111532</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <form onSubmit={handleSubmit} className="glass rounded-sm p-8 md:p-10">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex min-h-[360px] flex-col items-center justify-center text-center"
              >
                <span className="font-display text-5xl text-gold">Merci.</span>
                <p className="mt-4 max-w-xs font-body text-sm text-beige/70">
                  Your request has been received. We'll confirm your reservation
                  shortly.
                </p>
              </motion.div>
            ) : (
              <div className="grid gap-7">
                <div className="grid gap-7 sm:grid-cols-2">
                  <Field label="Full Name">
                    <input
                      className={inputCls}
                      placeholder="Your name"
                      value={form.full_name}
                      onChange={update("full_name")}
                      required
                    />
                  </Field>
                  <Field label="Phone">
                    <input
                      className={inputCls}
                      placeholder="+92 …"
                      value={form.phone}
                      onChange={update("phone")}
                      required
                    />
                  </Field>
                </div>
                <div className="grid gap-7 sm:grid-cols-2">
                  <Field label="Date">
                    <input
                      type="date"
                      className={inputCls}
                      value={form.reservation_date}
                      onChange={update("reservation_date")}
                      required
                    />
                  </Field>
                  <Field label="Time">
                    <input
                      type="time"
                      className={inputCls}
                      value={form.reservation_time}
                      onChange={update("reservation_time")}
                      required
                    />
                  </Field>
                </div>
                <div>
                  <span className="font-body text-[11px] uppercase tracking-[0.22em] text-beige">
                    Guests
                  </span>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {GUESTS.map((g) => (
                      <button
                        type="button"
                        key={g}
                        onClick={() => setGuests(g)}
                        aria-pressed={guests === g}
                        aria-label={`${g} guests`}
                        className={`h-11 w-11 rounded-full border font-body text-sm transition-colors ${
                          guests === g
                            ? "border-gold bg-gold text-scrim"
                            : "border-foreground/20 text-beige hover:border-gold/60"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
                <Field label="Occasion (optional)">
                  <input
                    className={inputCls}
                    placeholder="Birthday, anniversary…"
                    value={form.occasion}
                    onChange={update("occasion")}
                  />
                </Field>
                {error && (
                  <p role="alert" className="font-body text-sm text-red-400">
                    {error}
                  </p>
                )}
                <Magnetic
                  as="button"
                  strength={0.25}
                  disabled={submitting}
                  style={{ display: "block", width: "100%" }}
                  className="mt-2 w-full rounded-full bg-gold py-4 font-body text-xs uppercase tracking-[0.25em] text-scrim transition-colors hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Sending…" : "Request Reservation"}
                </Magnetic>
              </div>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
