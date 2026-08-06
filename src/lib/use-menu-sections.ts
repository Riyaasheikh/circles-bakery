import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SECTIONS, type Item, type Section, type Variant } from "@/lib/menu-data";

interface PublicProduct {
  id: string;
  name: string;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  image_url: string | null;
  variants: unknown;
  sort_order: number;
  stock_status: string;
  track_inventory: boolean;
  stock_quantity: number;
  is_best_seller: boolean;
  is_new_arrival: boolean;
  is_featured: boolean;
  categories: { slug: string } | null;
}

const badgeOf = (p: PublicProduct) =>
  p.is_best_seller
    ? "Best seller"
    : p.is_new_arrival
      ? "New"
      : p.is_featured
        ? "Featured"
        : undefined;

const variantsOf = (raw: unknown): Variant[] | undefined => {
  if (!Array.isArray(raw)) return undefined;
  const list = raw
    .filter((v): v is { label: string; price: number } => {
      const o = v as { label?: unknown; price?: unknown };
      return typeof o?.label === "string" && Number.isFinite(Number(o?.price));
    })
    .map((v) => ({ label: v.label, price: Number(v.price) }));
  return list.length ? list : undefined;
};

const toItem = (p: PublicProduct): Item => ({
  name: p.name,
  desc: p.description ?? "",
  price: Number(p.price),
  ...(p.compare_at_price && Number(p.compare_at_price) > Number(p.price)
    ? { was: Number(p.compare_at_price) }
    : {}),
  ...(variantsOf(p.variants) ? { variants: variantsOf(p.variants) } : {}),
  ...(badgeOf(p) ? { badge: badgeOf(p) } : {}),
  ...(p.stock_status !== "in_stock" || (p.track_inventory && p.stock_quantity <= 0)
    ? { soldOut: true }
    : {}),
  ...(p.image_url ? { image: p.image_url } : {}),
});

/**
 * Public menu, synchronised with the CRM: published, non-archived products
 * from the database are merged into the curated category sections. A product
 * whose name matches a curated item replaces it, so admins can adjust price,
 * copy and availability without touching code.
 */
export function useMenuSections(): Section[] {
  const { data } = useQuery({
    queryKey: ["public", "products"],
    staleTime: 60_000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(
          "id, name, description, price, compare_at_price, image_url, variants, sort_order, stock_status, track_inventory, stock_quantity, is_best_seller, is_new_arrival, is_featured, categories(slug)",
        )
        .eq("is_published", true)
        .eq("is_archived", false)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as unknown as PublicProduct[];
    },
  });

  return useMemo(() => {
    if (!data?.length) return SECTIONS;
    const bySlug = new Map<string, Item[]>();
    for (const p of data) {
      const slug = p.categories?.slug;
      if (!slug) continue;
      const list = bySlug.get(slug) ?? [];
      list.push(toItem(p));
      bySlug.set(slug, list);
    }
    return SECTIONS.map((section) => {
      const extra = bySlug.get(section.id);
      if (!extra?.length) return section;
      const names = new Set(extra.map((i) => i.name.toLowerCase()));
      return {
        ...section,
        items: [...extra, ...section.items.filter((i) => !names.has(i.name.toLowerCase()))],
      };
    });
  }, [data]);
}
