import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { useServerFn } from "@tanstack/react-start";
import { submitCheckout } from "@/lib/checkout.functions";
import { useCart, cart, cartTotal } from "@/hooks/use-cart";

export const Route = createFileRoute("/_authenticated/checkout")({
  component: CheckoutPage,
});

const PAYMENT_METHODS = [
  { value: "card", label: "Card (Stripe)", note: "Secure card payment" },
  { value: "cash", label: "Cash", note: "Pay on pickup / delivery" },
  { value: "bank_transfer", label: "Bank Transfer", note: "Manual confirmation" },
  { value: "gift_card", label: "Gift Card", note: "Redeem balance" },
] as const;

const ORDER_TYPES = [
  { value: "pickup", label: "Pickup" },
  { value: "delivery", label: "Delivery" },
  { value: "shipping", label: "Shipping" },
] as const;

const inputCls =
  "w-full rounded-lg border border-border bg-charcoal px-4 py-3 font-body text-sm text-ivory placeholder:text-beige/40 focus:border-gold focus:outline-none";

function CheckoutPage() {
  const items = useCart();
  const total = cartTotal(items);
  const navigate = useNavigate();
  const checkout = useServerFn(submitCheckout);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<{ orderNumber: number; total: number } | null>(
    null,
  );
  const [form, setForm] = useState({
    customer_name: "",
    phone: "",
    email: "",
    order_type: "pickup" as (typeof ORDER_TYPES)[number]["value"],
    delivery_address: "",
    fulfillment_date: "",
    notes: "",
    payment_method: "card" as (typeof PAYMENT_METHODS)[number]["value"],
  });

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await checkout({
        data: {
          ...form,
          items: items.map((i) => ({
            name: i.name,
            unitPrice: i.unitPrice,
            quantity: i.quantity,
          })),
        },
      });
      cart.clear();
      setConfirmation({ orderNumber: res.orderNumber, total: res.total });
    } catch (err) {
      console.error(err);
      setError("We couldn't place your order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-dvh bg-background px-6 py-28 md:px-10">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/menu"
          className="font-body text-xs uppercase tracking-[0.22em] text-beige transition-colors hover:text-gold"
        >
          ← Back to menu
        </Link>
        <h1 className="mt-6 font-display text-5xl text-ivory md:text-6xl">Checkout</h1>

        {confirmation ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 rounded-2xl border border-gold/40 bg-charcoal p-10 text-center"
          >
            <p className="font-display text-4xl text-gold">Order placed</p>
            <p className="mt-4 font-body text-sm text-beige">
              Your order <span className="text-ivory">#{confirmation.orderNumber}</span> has been
              received. Total: <span className="text-ivory">Rs {confirmation.total.toLocaleString()}</span>.
            </p>
            <p className="mt-2 font-body text-sm text-beige/70">
              A payment record has been created. For card payments, our team will confirm once the
              payment provider is connected.
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <button
                onClick={() => navigate({ to: "/account" })}
                className="rounded-full bg-gold px-8 py-3 font-body text-xs uppercase tracking-[0.22em] text-scrim transition-colors hover:bg-gold-soft"
              >
                View account
              </button>
              <Link
                to="/menu"
                className="rounded-full border border-border px-8 py-3 font-body text-xs uppercase tracking-[0.22em] text-beige transition-colors hover:text-gold"
              >
                Order more
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            {/* Form */}
            <form onSubmit={handleSubmit} className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <input
                  className={inputCls}
                  placeholder="Full name"
                  value={form.customer_name}
                  onChange={set("customer_name")}
                  required
                />
                <input
                  className={inputCls}
                  placeholder="Phone (+92 …)"
                  value={form.phone}
                  onChange={set("phone")}
                  required
                />
              </div>
              <input
                className={inputCls}
                type="email"
                placeholder="Email (optional)"
                value={form.email}
                onChange={set("email")}
              />

              <div>
                <p className="mb-2 font-body text-[11px] uppercase tracking-[0.22em] text-beige">
                  Order type
                </p>
                <div className="flex flex-wrap gap-2">
                  {ORDER_TYPES.map((t) => (
                    <button
                      type="button"
                      key={t.value}
                      onClick={() => setForm((f) => ({ ...f, order_type: t.value }))}
                      aria-pressed={form.order_type === t.value}
                      className={`rounded-full border px-5 py-2.5 font-body text-xs uppercase tracking-[0.18em] transition-colors ${
                        form.order_type === t.value
                          ? "border-gold bg-gold text-scrim"
                          : "border-border text-beige hover:border-gold/60"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {form.order_type !== "pickup" && (
                <textarea
                  className={inputCls}
                  placeholder="Delivery / shipping address"
                  rows={2}
                  value={form.delivery_address}
                  onChange={set("delivery_address")}
                />
              )}

              <label className="grid gap-2">
                <span className="font-body text-[11px] uppercase tracking-[0.22em] text-beige">
                  Fulfillment date (optional)
                </span>
                <input
                  className={inputCls}
                  type="date"
                  value={form.fulfillment_date}
                  onChange={set("fulfillment_date")}
                />
              </label>

              <textarea
                className={inputCls}
                placeholder="Notes (cake message, allergies, etc.)"
                rows={2}
                value={form.notes}
                onChange={set("notes")}
              />

              <div>
                <p className="mb-2 font-body text-[11px] uppercase tracking-[0.22em] text-beige">
                  Payment method
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {PAYMENT_METHODS.map((m) => (
                    <button
                      type="button"
                      key={m.value}
                      onClick={() => setForm((f) => ({ ...f, payment_method: m.value }))}
                      aria-pressed={form.payment_method === m.value}
                      className={`rounded-lg border px-4 py-3 text-left transition-colors ${
                        form.payment_method === m.value
                          ? "border-gold bg-charcoal"
                          : "border-border hover:border-gold/60"
                      }`}
                    >
                      <span className="block font-body text-sm text-ivory">{m.label}</span>
                      <span className="block font-body text-xs text-beige/70">{m.note}</span>
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <p role="alert" className="font-body text-sm text-red-400">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting || items.length === 0}
                className="mt-2 w-full rounded-full bg-gold py-4 font-body text-xs uppercase tracking-[0.25em] text-scrim transition-colors hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Placing order…" : `Place order · Rs ${total.toLocaleString()}`}
              </button>
            </form>

            {/* Summary */}
            <aside className="h-fit rounded-2xl border border-border bg-charcoal p-6">
              <h2 className="font-display text-2xl text-ivory">Your order</h2>
              {items.length === 0 ? (
                <p className="mt-4 font-body text-sm text-beige/70">
                  Your cart is empty.{" "}
                  <Link to="/menu" className="text-gold underline">
                    Browse the menu
                  </Link>
                  .
                </p>
              ) : (
                <>
                  <ul className="mt-5 space-y-4">
                    {items.map((i) => (
                      <li key={i.name} className="flex items-center justify-between gap-3">
                        <div>
                          <p className="font-body text-sm text-ivory">{i.name}</p>
                          <div className="mt-1 flex items-center gap-2">
                            <button
                              type="button"
                              aria-label={`Decrease ${i.name}`}
                              onClick={() => cart.setQuantity(i.name, i.quantity - 1)}
                              className="h-6 w-6 rounded-full border border-border text-beige hover:border-gold"
                            >
                              −
                            </button>
                            <span className="font-body text-xs text-beige">{i.quantity}</span>
                            <button
                              type="button"
                              aria-label={`Increase ${i.name}`}
                              onClick={() => cart.setQuantity(i.name, i.quantity + 1)}
                              className="h-6 w-6 rounded-full border border-border text-beige hover:border-gold"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <span className="shrink-0 font-body text-sm text-gold">
                          Rs {(i.unitPrice * i.quantity).toLocaleString()}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                    <span className="font-body text-sm uppercase tracking-[0.2em] text-beige">
                      Total
                    </span>
                    <span className="font-display text-2xl text-gold">
                      Rs {total.toLocaleString()}
                    </span>
                  </div>
                </>
              )}
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
