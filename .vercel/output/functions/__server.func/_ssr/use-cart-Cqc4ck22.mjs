import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-cart-Cqc4ck22.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var STORAGE_KEY = "circles_cart";
var listeners = /* @__PURE__ */ new Set();
var cache = null;
function read() {
	if (cache) return cache;
	if (typeof window === "undefined") return [];
	try {
		cache = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
	} catch {
		cache = [];
	}
	return cache;
}
function write(items) {
	cache = items;
	if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
	listeners.forEach((l) => l());
}
function subscribe(cb) {
	listeners.add(cb);
	return () => listeners.delete(cb);
}
var cart = {
	add(name, unitPrice) {
		const items = [...read()];
		const existing = items.find((i) => i.name === name);
		if (existing) existing.quantity += 1;
		else items.push({
			name,
			unitPrice,
			quantity: 1
		});
		write(items);
	},
	setQuantity(name, quantity) {
		let items = read().map((i) => i.name === name ? {
			...i,
			quantity
		} : i);
		items = items.filter((i) => i.quantity > 0);
		write(items);
	},
	remove(name) {
		write(read().filter((i) => i.name !== name));
	},
	clear() {
		write([]);
	}
};
var EMPTY = [];
function useCart() {
	return (0, import_react.useSyncExternalStore)(subscribe, read, () => EMPTY);
}
function cartTotal(items) {
	return items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
}
function cartCount(items) {
	return items.reduce((sum, i) => sum + i.quantity, 0);
}
//#endregion
export { useCart as i, cartCount as n, cartTotal as r, cart as t };
