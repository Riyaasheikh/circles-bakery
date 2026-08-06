import { useSyncExternalStore } from "react";

export interface CartItem {
  name: string;
  unitPrice: number;
  quantity: number;
}

const STORAGE_KEY = "circles_cart";
const listeners = new Set<() => void>();
let cache: CartItem[] | null = null;

function read(): CartItem[] {
  if (cache) return cache;
  if (typeof window === "undefined") return [];
  try {
    cache = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]") as CartItem[];
  } catch {
    cache = [];
  }
  return cache;
}

function write(items: CartItem[]) {
  cache = items;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export const cart = {
  add(name: string, unitPrice: number) {
    const items = [...read()];
    const existing = items.find((i) => i.name === name);
    if (existing) existing.quantity += 1;
    else items.push({ name, unitPrice, quantity: 1 });
    write(items);
  },
  setQuantity(name: string, quantity: number) {
    let items = read().map((i) => (i.name === name ? { ...i, quantity } : i));
    items = items.filter((i) => i.quantity > 0);
    write(items);
  },
  remove(name: string) {
    write(read().filter((i) => i.name !== name));
  },
  clear() {
    write([]);
  },
};

const EMPTY: CartItem[] = [];

export function useCart(): CartItem[] {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

export function cartTotal(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
}

export function cartCount(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.quantity, 0);
}
