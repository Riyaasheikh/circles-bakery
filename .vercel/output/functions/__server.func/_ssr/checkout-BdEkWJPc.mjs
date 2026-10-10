import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { F as isRedirect, b as useRouter, v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { s as motion } from "../_libs/framer-motion.mjs";
import { i as getServerFnById, n as createServerFn, r as TSS_SERVER_FUNCTION } from "./server-DU24RaAv.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-CxSShoQz.mjs";
import { i as useCart, r as cartTotal, t as cart } from "./use-cart-Cqc4ck22.mjs";
import { a as objectType, i as numberType, n as enumType, o as stringType, r as literalType, t as arrayType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-BdEkWJPc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
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
var submitCheckout = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((input) => checkoutSchema.parse(input)).handler(createSsrRpc("f20eadfa25b35887d37feaeb7c3b3d2b39392ab4d3890a7b0e458d092ec1042c"));
var PAYMENT_METHODS = [
	{
		value: "card",
		label: "Card (Stripe)",
		note: "Secure card payment"
	},
	{
		value: "cash",
		label: "Cash",
		note: "Pay on pickup / delivery"
	},
	{
		value: "bank_transfer",
		label: "Bank Transfer",
		note: "Manual confirmation"
	},
	{
		value: "gift_card",
		label: "Gift Card",
		note: "Redeem balance"
	}
];
var ORDER_TYPES = [
	{
		value: "pickup",
		label: "Pickup"
	},
	{
		value: "delivery",
		label: "Delivery"
	},
	{
		value: "shipping",
		label: "Shipping"
	}
];
var inputCls = "w-full rounded-lg border border-border bg-charcoal px-4 py-3 font-body text-sm text-ivory placeholder:text-beige/40 focus:border-gold focus:outline-none";
function CheckoutPage() {
	const items = useCart();
	const total = cartTotal(items);
	const navigate = useNavigate();
	const checkout = useServerFn(submitCheckout);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [confirmation, setConfirmation] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)({
		customer_name: "",
		phone: "",
		email: "",
		order_type: "pickup",
		delivery_address: "",
		fulfillment_date: "",
		notes: "",
		payment_method: "card"
	});
	const set = (key) => (e) => setForm((f) => ({
		...f,
		[key]: e.target.value
	}));
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		if (items.length === 0) {
			setError("Your cart is empty.");
			return;
		}
		setSubmitting(true);
		try {
			const res = await checkout({ data: {
				...form,
				items: items.map((i) => ({
					name: i.name,
					unitPrice: i.unitPrice,
					quantity: i.quantity
				}))
			} });
			cart.clear();
			setConfirmation({
				orderNumber: res.orderNumber,
				total: res.total
			});
		} catch (err) {
			console.error(err);
			setError("We couldn't place your order. Please try again.");
		} finally {
			setSubmitting(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-dvh bg-background px-6 py-28 md:px-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-5xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/menu",
					className: "font-body text-xs uppercase tracking-[0.22em] text-beige transition-colors hover:text-gold",
					children: "← Back to menu"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-6 font-display text-5xl text-ivory md:text-6xl",
					children: "Checkout"
				}),
				confirmation ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 12
					},
					animate: {
						opacity: 1,
						y: 0
					},
					className: "mt-12 rounded-2xl border border-gold/40 bg-charcoal p-10 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-4xl text-gold",
							children: "Order placed"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 font-body text-sm text-beige",
							children: [
								"Your order ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-ivory",
									children: ["#", confirmation.orderNumber]
								}),
								" has been received. Total: ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-ivory",
									children: ["Rs ", confirmation.total.toLocaleString()]
								}),
								"."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-body text-sm text-beige/70",
							children: "A payment record has been created. For card payments, our team will confirm once the payment provider is connected."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex justify-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => navigate({ to: "/account" }),
								className: "rounded-full bg-gold px-8 py-3 font-body text-xs uppercase tracking-[0.22em] text-scrim transition-colors hover:bg-gold-soft",
								children: "View account"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/menu",
								className: "rounded-full border border-border px-8 py-3 font-body text-xs uppercase tracking-[0.22em] text-beige transition-colors hover:text-gold",
								children: "Order more"
							})]
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-12 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSubmit,
						className: "grid gap-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-5 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: inputCls,
									placeholder: "Full name",
									value: form.customer_name,
									onChange: set("customer_name"),
									required: true
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: inputCls,
									placeholder: "Phone (+92 …)",
									value: form.phone,
									onChange: set("phone"),
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputCls,
								type: "email",
								placeholder: "Email (optional)",
								value: form.email,
								onChange: set("email")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-2 font-body text-[11px] uppercase tracking-[0.22em] text-beige",
								children: "Order type"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: ORDER_TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setForm((f) => ({
										...f,
										order_type: t.value
									})),
									"aria-pressed": form.order_type === t.value,
									className: `rounded-full border px-5 py-2.5 font-body text-xs uppercase tracking-[0.18em] transition-colors ${form.order_type === t.value ? "border-gold bg-gold text-scrim" : "border-border text-beige hover:border-gold/60"}`,
									children: t.label
								}, t.value))
							})] }),
							form.order_type !== "pickup" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								className: inputCls,
								placeholder: "Delivery / shipping address",
								rows: 2,
								value: form.delivery_address,
								onChange: set("delivery_address")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-body text-[11px] uppercase tracking-[0.22em] text-beige",
									children: "Fulfillment date (optional)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: inputCls,
									type: "date",
									value: form.fulfillment_date,
									onChange: set("fulfillment_date")
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								className: inputCls,
								placeholder: "Notes (cake message, allergies, etc.)",
								rows: 2,
								value: form.notes,
								onChange: set("notes")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-2 font-body text-[11px] uppercase tracking-[0.22em] text-beige",
								children: "Payment method"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-2 sm:grid-cols-2",
								children: PAYMENT_METHODS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setForm((f) => ({
										...f,
										payment_method: m.value
									})),
									"aria-pressed": form.payment_method === m.value,
									className: `rounded-lg border px-4 py-3 text-left transition-colors ${form.payment_method === m.value ? "border-gold bg-charcoal" : "border-border hover:border-gold/60"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block font-body text-sm text-ivory",
										children: m.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block font-body text-xs text-beige/70",
										children: m.note
									})]
								}, m.value))
							})] }),
							error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								role: "alert",
								className: "font-body text-sm text-red-400",
								children: error
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: submitting || items.length === 0,
								className: "mt-2 w-full rounded-full bg-gold py-4 font-body text-xs uppercase tracking-[0.25em] text-scrim transition-colors hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-60",
								children: submitting ? "Placing order…" : `Place order · Rs ${total.toLocaleString()}`
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "h-fit rounded-2xl border border-border bg-charcoal p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl text-ivory",
							children: "Your order"
						}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 font-body text-sm text-beige/70",
							children: [
								"Your cart is empty.",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/menu",
									className: "text-gold underline",
									children: "Browse the menu"
								}),
								"."
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-5 space-y-4",
							children: items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-body text-sm text-ivory",
									children: i.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											"aria-label": `Decrease ${i.name}`,
											onClick: () => cart.setQuantity(i.name, i.quantity - 1),
											className: "h-6 w-6 rounded-full border border-border text-beige hover:border-gold",
											children: "−"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-body text-xs text-beige",
											children: i.quantity
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											"aria-label": `Increase ${i.name}`,
											onClick: () => cart.setQuantity(i.name, i.quantity + 1),
											className: "h-6 w-6 rounded-full border border-border text-beige hover:border-gold",
											children: "+"
										})
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "shrink-0 font-body text-sm text-gold",
									children: ["Rs ", (i.unitPrice * i.quantity).toLocaleString()]
								})]
							}, i.name))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex items-center justify-between border-t border-border pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-body text-sm uppercase tracking-[0.2em] text-beige",
								children: "Total"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-display text-2xl text-gold",
								children: ["Rs ", total.toLocaleString()]
							})]
						})] })]
					})]
				})
			]
		})
	});
}
//#endregion
export { CheckoutPage as component };
