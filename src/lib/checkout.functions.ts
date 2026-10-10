import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const checkoutSchema = z.object({
  customer_name: z.string().trim().min(1).max(100),
  phone: z.string().trim().min(6).max(30),
  email: z.string().trim().email().max(255).optional().or(z.literal("")),
  order_type: z.enum(["pickup", "delivery", "shipping"]),
  delivery_address: z.string().trim().max(500).optional().or(z.literal("")),
  fulfillment_date: z.string().optional().or(z.literal("")),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
  payment_method: z.enum(["card", "cash", "bank_transfer", "gift_card"]),
  items: z
    .array(
      z.object({
        name: z.string().trim().min(1).max(200),
        unitPrice: z.number().nonnegative(),
        quantity: z.number().int().min(1).max(99),
      }),
    )
    .min(1, "Your cart is empty"),
});

// Maps the selected payment method to the provider-ready architecture.
function providerForMethod(method: string): "stripe" | "cash" | "manual" {
  if (method === "card") return "stripe";
  if (method === "cash") return "cash";
  return "manual";
}

export const submitCheckout = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input) => checkoutSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    const subtotal = data.items.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
    const total = subtotal; // taxes/delivery fees can be layered in here later

    // 1. Create the order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
        customer_name: data.customer_name,
        phone: data.phone,
        email: data.email || null,
        order_type: data.order_type,
        delivery_address: data.delivery_address || null,
        fulfillment_date: data.fulfillment_date || null,
        notes: data.notes || null,
        subtotal,
        total,
        status: "pending",
      })
      .select("id, order_number")
      .single();

    if (orderError || !order) {
      throw new Error(orderError?.message ?? "Could not create order");
    }

    // 2. Create the order line items
    const { error: itemsError } = await supabase.from("order_items").insert(
      data.items.map((i) => ({
        order_id: order.id,
        product_name: i.name,
        quantity: i.quantity,
        unit_price: i.unitPrice,
      })),
    );
    if (itemsError) throw new Error(itemsError.message);

    // 3. Create the linked payment record (Stripe-ready architecture).
    //    Card payments start as "pending" awaiting a provider payment intent;
    //    cash/bank are recorded as pending until confirmed on fulfilment.
    const provider = providerForMethod(data.payment_method);
    const { data: payment, error: paymentError } = await supabase
      .from("payments")
      .insert({
        order_id: order.id,
        user_id: userId,
        amount: total,
        currency: "PKR",
        method: data.payment_method,
        provider,
        status: "pending",
        metadata: {
          // Placeholder for future Stripe PaymentIntent / Square transaction data.
          stripe_ready: true,
          created_via: "web_checkout",
        },
      })
      .select("id")
      .single();

    if (paymentError || !payment) {
      throw new Error(paymentError?.message ?? "Could not create payment record");
    }

    return {
      orderId: order.id,
      orderNumber: order.order_number,
      paymentId: payment.id,
      total,
      // When Stripe is connected, return a client_secret here to confirm payment.
      requiresPayment: provider === "stripe",
    };
  });
