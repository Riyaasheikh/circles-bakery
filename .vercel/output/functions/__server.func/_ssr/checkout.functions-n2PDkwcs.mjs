import { n as createServerFn, r as TSS_SERVER_FUNCTION } from "./server-DU24RaAv.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-CxSShoQz.mjs";
import { a as objectType, i as numberType, n as enumType, o as stringType, r as literalType, t as arrayType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout.functions-n2PDkwcs.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var checkoutSchema = objectType({
	customer_name: stringType().trim().min(1).max(100),
	phone: stringType().trim().min(6).max(30),
	email: stringType().trim().email().max(255).optional().or(literalType("")),
	order_type: enumType([
		"pickup",
		"delivery",
		"shipping"
	]),
	delivery_address: stringType().trim().max(500).optional().or(literalType("")),
	fulfillment_date: stringType().optional().or(literalType("")),
	notes: stringType().trim().max(1e3).optional().or(literalType("")),
	payment_method: enumType([
		"card",
		"cash",
		"bank_transfer",
		"gift_card"
	]),
	items: arrayType(objectType({
		name: stringType().trim().min(1).max(200),
		unitPrice: numberType().nonnegative(),
		quantity: numberType().int().min(1).max(99)
	})).min(1, "Your cart is empty")
});
function providerForMethod(method) {
	if (method === "card") return "stripe";
	if (method === "cash") return "cash";
	return "manual";
}
var submitCheckout_createServerFn_handler = createServerRpc({
	id: "f20eadfa25b35887d37feaeb7c3b3d2b39392ab4d3890a7b0e458d092ec1042c",
	name: "submitCheckout",
	filename: "src/lib/checkout.functions.ts"
}, (opts) => submitCheckout.__executeServer(opts));
var submitCheckout = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((input) => checkoutSchema.parse(input)).handler(submitCheckout_createServerFn_handler, async ({ data, context }) => {
	const { supabase, userId } = context;
	const subtotal = data.items.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
	const total = subtotal;
	const { data: order, error: orderError } = await supabase.from("orders").insert({
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
		status: "pending"
	}).select("id, order_number").single();
	if (orderError || !order) throw new Error(orderError?.message ?? "Could not create order");
	const { error: itemsError } = await supabase.from("order_items").insert(data.items.map((i) => ({
		order_id: order.id,
		product_name: i.name,
		quantity: i.quantity,
		unit_price: i.unitPrice
	})));
	if (itemsError) throw new Error(itemsError.message);
	const provider = providerForMethod(data.payment_method);
	const { data: payment, error: paymentError } = await supabase.from("payments").insert({
		order_id: order.id,
		user_id: userId,
		amount: total,
		currency: "PKR",
		method: data.payment_method,
		provider,
		status: "pending",
		metadata: {
			stripe_ready: true,
			created_via: "web_checkout"
		}
	}).select("id").single();
	if (paymentError || !payment) throw new Error(paymentError?.message ?? "Could not create payment record");
	return {
		orderId: order.id,
		orderNumber: order.order_number,
		paymentId: payment.id,
		total,
		requiresPayment: provider === "stripe"
	};
});
//#endregion
export { submitCheckout_createServerFn_handler };
