import cakes from "@/assets/m-signature-cakes.jpg";
import pastries from "@/assets/m-pastries.jpg";
import bread from "@/assets/m-bread.jpg";
import coffee from "@/assets/m-coffee.jpg";
import dining from "@/assets/m-rolls-platters.jpg";
import desserts from "@/assets/m-celebration.jpg";
import salads from "@/assets/m-salads.jpg";
import croissants from "@/assets/m-croissants.jpg";
import eclairs from "@/assets/m-eclairs.jpg";
import savoury from "@/assets/m-savoury.jpg";
import panini from "@/assets/m-panini.jpg";
import donuts from "@/assets/m-donuts.jpg";
import biscuits from "@/assets/m-biscuits.jpg";
import cupcakes from "@/assets/m-cupcakes.jpg";
import pantry from "@/assets/m-pantry.jpg";
import cheesecake from "@/assets/m-cheesecake.jpg";
import milkcake from "@/assets/m-milkcake.jpg";
import appetizers from "@/assets/m-appetizers.jpg";
import pasta from "@/assets/m-pasta.jpg";
import pizza from "@/assets/m-pizza.jpg";
import burgers from "@/assets/m-burgers.jpg";

// Item specific images
import itemNyCheesecakeSlice from "@/assets/item-ny-cheesecake-slice.jpg";
import itemNyCheesecakeWhole from "@/assets/item-ny-cheesecake-whole.jpg";
import itemBlueberryCheesecake from "@/assets/item-blueberry-cheesecake.jpg";
import itemLotusCheesecake from "@/assets/item-lotus-cheesecake.jpg";
import itemMangoCheesecake from "@/assets/item-mango-cheesecake.jpg";
import itemPlainCroissant from "@/assets/item-plain-croissant.jpg";

export interface Variant {
  label: string;
  price: number;
}
export interface Item {
  name: string;
  desc: string;
  /** Flat price in PKR. */
  price?: number;
  /** Size / weight based pricing. */
  variants?: Variant[];
  /** Unit suffix shown after the price, e.g. "/ kg" or "/ slice". */
  unit?: string;
  /** Non-purchasable, price on request. */
  enquire?: boolean;
  /** "From" pricing for bespoke items. */
  from?: boolean;
  /** Was-price shown struck through when a discount is live. */
  was?: number;
  /** Small merchandising label, e.g. "Best seller". */
  badge?: string;
  /** Out of stock — cannot be added to the cart. */
  soldOut?: boolean;
  /** Overrides the category image (CRM-managed products). */
  image?: string;
}

export interface Section {
  id: string;
  title: string;
  tagline: string;
  note?: string;
  image: string;
  items: Item[];
}

export const rs = (n: number) => `Rs ${n.toLocaleString()}`;

export const SECTIONS: Section[] = [
  {
    id: "signature-cakes",
    title: "Signature Cakes",
    tagline: "Baked to order · 1 lb, 2.5 lb & 5.5 lb",
    note: "Every cake is baked fresh the same day. Allow 4–6 hours for larger weights.",
    image: cakes,
    items: [
      {
        name: "Chocolate Fudge Cake",
        image: "https://plus.unsplash.com/premium_photo-1713447395823-2e0b40b75a89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Y2FrZXxlbnwwfHx8fDE3OTAxNzU4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        desc: "Dark cocoa sponge, silky fudge, chocolate curls",
        variants: [
          { label: "1 lb", price: 1900 },
          { label: "2.5 lb", price: 4200 },
          { label: "5.5 lb", price: 7500 },
        ],
      },
      {
        name: "Black Forest",
        image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8Y2FrZXxlbnwwfHx8fDE3OTAxNzU4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        desc: "Cherry compote, whipped cream, chocolate shavings",
        variants: [
          { label: "1 lb", price: 1750 },
          { label: "2.5 lb", price: 3900 },
          { label: "5.5 lb", price: 7200 },
        ],
      },
      {
        name: "Red Velvet",
        image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8Y2FrZXxlbnwwfHx8fDE3OTAxNzU4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        desc: "Velvet crumb with tangy cream cheese frosting",
        variants: [
          { label: "1 lb", price: 1950 },
          { label: "2.5 lb", price: 4300 },
          { label: "5.5 lb", price: 7500 },
        ],
      },
      {
        name: "Vanilla Cream Cake",
        image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8Y2FrZXxlbnwwfHx8fDE3OTAxNzU4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        desc: "Light vanilla sponge, fresh cream, seasonal fruit",
        variants: [
          { label: "1 lb", price: 1650 },
          { label: "2.5 lb", price: 3700 },
          { label: "5.5 lb", price: 6900 },
        ],
      },
      {
        name: "Coffee Crunch",
        image: "https://plus.unsplash.com/premium_photo-1663839412026-51a44cfadfb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8Y2FrZXxlbnwwfHx8fDE3OTAxNzU4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        desc: "Espresso soak, praline crunch, coffee buttercream",
        variants: [
          { label: "1 lb", price: 1900 },
          { label: "2.5 lb", price: 4200 },
          { label: "5.5 lb", price: 7500 },
        ],
      },
      {
        name: "Fresh Fruit Gateau",
        image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8Y2FrZXxlbnwwfHx8fDE3OTAxNzU4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        desc: "Cream layers crowned with the day's fruit",
        variants: [
          { label: "1 lb", price: 1850 },
          { label: "2.5 lb", price: 4100 },
          { label: "5.5 lb", price: 7400 },
        ],
      },
    ],
  },
  {
    id: "three-milk-cakes",
    title: "Three Milk Cakes",
    tagline: "Our most-loved counter — soaked, chilled, sliceable",
    image: milkcake,
    items: [
      { name: "Dream Milk Cake",
        image: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8Y2FrZXxlbnwwfHx8fDE3OTAxNzU4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Triple milk soak, cream finish, toasted nut", price: 3200 },
      { name: "Lotus Milk Cake",
        image: "https://images.unsplash.com/photo-1602351447937-745cb720612f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8Y2FrZXxlbnwwfHx8fDE3OTAxNzU4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Caramelised Biscoff crumble, milk soak", price: 3200 },
      { name: "Chocolate Milk Cake",
        image: "https://plus.unsplash.com/premium_photo-1679047666503-28884e055869?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OXx8Y2FrZXxlbnwwfHx8fDE3OTAxNzU4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Cocoa sponge, milk soak, dark ganache", price: 3200 },
      { name: "Nutella Milk Cake",
        image: "https://images.unsplash.com/photo-1517427294546-5aa121f68e8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fGNha2V8ZW58MHx8fHwxNzkwMTc1ODI2fDA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Hazelnut cream ribbons through milk sponge", price: 3200 },
      { name: "Pistachio Milk Cake",
        image: "https://images.unsplash.com/photo-1568827999250-3f6afff96e66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fGNha2V8ZW58MHx8fHwxNzkwMTc1ODI2fDA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Kesar-pista cream, crushed pistachio", price: 3200 },
    ],
  },
  {
    id: "cheesecakes",
    title: "Cheesecakes",
    tagline: "Baked New York style · by the slice or whole",
    image: cheesecake,
    items: [
      { name: "New York Cheesecake (Slice)", desc: "Dense vanilla bean cheesecake, biscuit base", price: 900, unit: "/ slice", image: itemNyCheesecakeSlice },
      { name: "New York Cheesecake (Whole)", desc: "Serves 10–12, biscuit base", price: 7200, image: itemNyCheesecakeWhole },
      { name: "Blueberry Cheesecake (Slice)", desc: "Wild blueberry compote glaze", price: 900, unit: "/ slice", image: itemBlueberryCheesecake },
      { name: "Lotus Cheesecake (Slice)", desc: "Biscoff base, caramelised topping", price: 900, unit: "/ slice", image: itemLotusCheesecake },
      { name: "Mango Cheesecake (Slice)", desc: "Seasonal mango, cream cheese, biscuit", price: 900, unit: "/ slice", image: itemMangoCheesecake },
    ],
  },
  {
    id: "croissants",
    title: "Croissants",
    tagline: "72-hour laminated, baked through the morning",
    image: croissants,
    items: [
      { name: "Plain Butter Croissant", desc: "All-butter lamination, honeycomb crumb", price: 350, image: itemPlainCroissant },
      { name: "Chocolate Croissant",
        image: "https://images.unsplash.com/photo-1508737804141-4c3b688e2546?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fGNha2V8ZW58MHx8fHwxNzkwMTc1ODI2fDA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Two batons of dark chocolate", price: 450 },
      { name: "Almond Croissant",
        image: "https://plus.unsplash.com/premium_photo-1690214491960-d447e38d0bd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTN8fGNha2V8ZW58MHx8fHwxNzkwMTc1ODI2fDA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Twice-baked, frangipane, flaked almonds", price: 500 },
      { name: "Nutella Croissant",
        image: "https://images.unsplash.com/photo-1583338917451-face2751d8d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fGNha2V8ZW58MHx8fHwxNzkwMTc1ODI2fDA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Hazelnut cream filled, cocoa dust", price: 550 },
      { name: "Cheese & Olive Croissant",
        image: "https://images.unsplash.com/photo-1595272568891-123402d0fb3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fGNha2V8ZW58MHx8fHwxNzkwMTc1ODI2fDA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Mozzarella, black olive, oregano", price: 550 },
    ],
  },
  {
    id: "eclairs",
    title: "Éclairs",
    tagline: "Choux baked daily, filled to order",
    image: eclairs,
    items: [
      { name: "Chocolate Éclair",
        image: "https://images.unsplash.com/photo-1562440499-64c9a111f713?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fGNha2V8ZW58MHx8fHwxNzkwMTc1ODI2fDA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Vanilla crème pâtissière, dark glaze", price: 400 },
      { name: "Praline Éclair",
        image: "https://plus.unsplash.com/premium_photo-1670692695578-319f28b97ac1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTd8fGNha2V8ZW58MHx8fHwxNzkwMTc1ODI2fDA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Hazelnut praline cream, gold crumb", price: 400 },
      { name: "Craquelin Éclair",
        image: "https://images.unsplash.com/photo-1577998474517-7eeeed4e448a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTh8fGNha2V8ZW58MHx8fHwxNzkwMTc1ODI2fDA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Crisp craquelin top, vanilla cream", price: 400 },
      { name: "Lotus Éclair",
        image: "https://images.unsplash.com/photo-1610670444950-0b29430891b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTl8fGNha2V8ZW58MHx8fHwxNzkwMTc1ODI2fDA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Biscoff crème, caramelised crumb", price: 400 },
    ],
  },
  {
    id: "pastries-desserts",
    title: "Pastries & Desserts",
    tagline: "The pâtisserie case, refreshed twice a day",
    image: pastries,
    items: [
      { name: "Cinnamon Roll",
        image: "https://images.unsplash.com/photo-1622621746668-59fb299bc4d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjB8fGNha2V8ZW58MHx8fHwxNzkwMTc1ODI2fDA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Warm swirls, cream cheese glaze, walnut", price: 380 },
      { name: "Pistachio Danish",
        image: "https://plus.unsplash.com/premium_photo-1725986663085-69be91a0c3af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Y3JvaXNzYW50fGVufDB8fHx8MTc5MDE3NTgyN3ww&ixlib=rb-4.1.0&q=80&w=1080", desc: "Butter-laminated, pistachio cream, nibs", price: 420 },
      { name: "Fudge Brownie",
        image: "https://images.unsplash.com/photo-1623334044303-241021148842?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8Y3JvaXNzYW50fGVufDB8fHx8MTc5MDE3NTgyN3ww&ixlib=rb-4.1.0&q=80&w=1080", desc: "Dense chocolate, walnut, sea salt", price: 350 },
      { name: "Chocolate Mousse Cup",
        image: "https://images.unsplash.com/photo-1691480162735-9b91238080f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8Y3JvaXNzYW50fGVufDB8fHx8MTc5MDE3NTgyN3ww&ixlib=rb-4.1.0&q=80&w=1080", desc: "Silky mousse, cocoa crumb", price: 450 },
      { name: "Tiramisu Cup",
        image: "https://images.unsplash.com/photo-1599940778173-e276d4acb2bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8Y3JvaXNzYW50fGVufDB8fHx8MTc5MDE3NTgyN3ww&ixlib=rb-4.1.0&q=80&w=1080", desc: "Espresso-soaked sponge, mascarpone", price: 550 },
    ],
  },
  {
    id: "cupcakes-muffins",
    title: "Cupcakes, Muffins & Cruffins",
    tagline: "Small bakes for the everyday treat",
    image: cupcakes,
    items: [
      { name: "Vanilla Cupcake",
        image: "https://plus.unsplash.com/premium_photo-1661743823829-326b78143b30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8Y3JvaXNzYW50fGVufDB8fHx8MTc5MDE3NTgyN3ww&ixlib=rb-4.1.0&q=80&w=1080", desc: "Buttercream swirl, sprinkles", price: 350 },
      { name: "Chocolate Cupcake",
        image: "https://images.unsplash.com/photo-1681218079567-35aef7c8e7e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8Y3JvaXNzYW50fGVufDB8fHx8MTc5MDE3NTgyN3ww&ixlib=rb-4.1.0&q=80&w=1080", desc: "Cocoa sponge, fudge frosting", price: 400 },
      { name: "Blueberry Muffin",
        image: "https://images.unsplash.com/photo-1651604033534-e66b281f1981?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8Y3JvaXNzYW50fGVufDB8fHx8MTc5MDE3NTgyN3ww&ixlib=rb-4.1.0&q=80&w=1080", desc: "Bursting berries, crunchy sugar top", price: 450 },
      { name: "Chocolate Chip Muffin",
        image: "https://images.unsplash.com/photo-1612366747681-e4ca6992b1e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8Y3JvaXNzYW50fGVufDB8fHx8MTc5MDE3NTgyN3ww&ixlib=rb-4.1.0&q=80&w=1080", desc: "Soft crumb, dark chips throughout", price: 450 },
      { name: "Cruffin",
        image: "https://plus.unsplash.com/premium_photo-1692809723031-98c72b1871c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OXx8Y3JvaXNzYW50fGVufDB8fHx8MTc5MDE3NTgyN3ww&ixlib=rb-4.1.0&q=80&w=1080", desc: "Croissant-muffin hybrid, cream filled", price: 700 },
    ],
  },
  {
    id: "donuts",
    title: "Donuts",
    tagline: "Hand-glazed each morning",
    image: donuts,
    items: [
      { name: "Chocolate Glazed Donut",
        image: "https://images.unsplash.com/photo-1600521853186-93b88b3a07b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fGNyb2lzc2FudHxlbnwwfHx8fDE3OTAxNzU4Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Classic dark glaze, soft brioche dough", price: 300 },
      { name: "Strawberry Donut",
        image: "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fGNyb2lzc2FudHxlbnwwfHx8fDE3OTAxNzU4Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Pink glaze, freeze-dried berry", price: 300 },
      { name: "Sprinkle Donut",
        image: "https://images.unsplash.com/photo-1587912001191-0cd4f14fd89e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fGNyb2lzc2FudHxlbnwwfHx8fDE3OTAxNzU4Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Vanilla glaze, rainbow sprinkles", price: 300 },
      { name: "Lotus Donut",
        image: "https://plus.unsplash.com/premium_photo-1674562179816-04fda3958c12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTN8fGNyb2lzc2FudHxlbnwwfHx8fDE3OTAxNzU4Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Biscoff drizzle, caramelised crumb", price: 350 },
      { name: "Nutella Filled Donut",
        image: "https://images.unsplash.com/photo-1586657263857-346c4b712ff5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fGNyb2lzc2FudHxlbnwwfHx8fDE3OTAxNzU4Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Hazelnut cream centre, cocoa dust", price: 350 },
    ],
  },
  {
    id: "biscuits",
    title: "Biscuits & Cookies",
    tagline: "Sold by weight, boxed to gift",
    note: "Prices per kilogram. Half-kilo boxes available in store.",
    image: biscuits,
    items: [
      { name: "Nan Khatai",
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fGNyb2lzc2FudHxlbnwwfHx8fDE3OTAxNzU4Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Traditional semolina shortbread, cardamom", price: 2200, unit: "/ kg" },
      { name: "Coconut Biscuits",
        image: "https://images.unsplash.com/photo-1700915704616-b455b3679024?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fGNyb2lzc2FudHxlbnwwfHx8fDE3OTAxNzU4Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Toasted coconut, buttery crumb", price: 2300, unit: "/ kg" },
      { name: "Chocolate Chip Cookies",
        image: "https://plus.unsplash.com/premium_photo-1670333242520-8c34b89e19e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTd8fGNyb2lzc2FudHxlbnwwfHx8fDE3OTAxNzU4Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Chewy centre, dark chocolate chunks", price: 2500, unit: "/ kg" },
      { name: "Almond Biscuits",
        image: "https://images.unsplash.com/photo-1613929231151-d7571591259e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTh8fGNyb2lzc2FudHxlbnwwfHx8fDE3OTAxNzU4Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Roasted almond, light snap", price: 2700, unit: "/ kg" },
      { name: "Pistachio Biscuits",
        image: "https://images.unsplash.com/photo-1652172600474-32937eefee09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTl8fGNyb2lzc2FudHxlbnwwfHx8fDE3OTAxNzU4Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Pistachio butter, green nib finish", price: 2700, unit: "/ kg" },
    ],
  },
  {
    id: "artisan-bread",
    title: "Special Breads",
    tagline: "Slow-proofed loaves from the boulangerie",
    image: bread,
    items: [
      { name: "Milk Bread",
        image: "https://images.unsplash.com/photo-1693483640461-267d788b6148?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjB8fGNyb2lzc2FudHxlbnwwfHx8fDE3OTAxNzU4Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Soft, feather-light, lightly sweet", price: 250 },
      { name: "Baguette",
        image: "https://plus.unsplash.com/premium_photo-1665669263531-cdcbe18e7fe4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8cGFzdHJ5fGVufDB8fHx8MTc5MDE3NTgyOHww&ixlib=rb-4.1.0&q=80&w=1080", desc: "Classic French, airy crumb, golden crust", price: 300 },
      { name: "Bran Bread",
        image: "https://images.unsplash.com/photo-1623334044303-241021148842?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8cGFzdHJ5fGVufDB8fHx8MTc5MDE3NTgyOHww&ixlib=rb-4.1.0&q=80&w=1080", desc: "Wholesome bran, everyday loaf", price: 350 },
      { name: "Multigrain Loaf",
        image: "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8cGFzdHJ5fGVufDB8fHx8MTc5MDE3NTgyOHww&ixlib=rb-4.1.0&q=80&w=1080", desc: "Seven grains and seeds, soft crumb", price: 450 },
      { name: "Focaccia",
        image: "https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8cGFzdHJ5fGVufDB8fHx8MTc5MDE3NTgyOHww&ixlib=rb-4.1.0&q=80&w=1080", desc: "Olive oil, rosemary, sea salt", price: 550 },
      { name: "Country Sourdough",
        image: "https://plus.unsplash.com/premium_photo-1681826507324-0b3c43928753?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8cGFzdHJ5fGVufDB8fHx8MTc5MDE3NTgyOHww&ixlib=rb-4.1.0&q=80&w=1080", desc: "Wild yeast, 24-hour ferment, crisp crust", price: 800 },
    ],
  },
  {
    id: "savouries",
    title: "Savouries",
    tagline: "The hot counter, straight from the oven",
    image: savoury,
    items: [
      { name: "Vegetable Samosa",
        image: "https://images.unsplash.com/photo-1587241321921-91a834d6d191?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8cGFzdHJ5fGVufDB8fHx8MTc5MDE3NTgyOHww&ixlib=rb-4.1.0&q=80&w=1080", desc: "Spiced potato and pea, crisp pastry", price: 50 },
      { name: "Chicken Samosa",
        image: "https://images.unsplash.com/photo-1603532648955-039310d9ed75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8cGFzdHJ5fGVufDB8fHx8MTc5MDE3NTgyOHww&ixlib=rb-4.1.0&q=80&w=1080", desc: "Minced chicken, onion, green chilli", price: 120 },
      { name: "Spring Roll",
        image: "https://images.unsplash.com/photo-1613929231151-d7571591259e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8cGFzdHJ5fGVufDB8fHx8MTc5MDE3NTgyOHww&ixlib=rb-4.1.0&q=80&w=1080", desc: "Chicken and vegetable, thin crisp wrap", price: 150 },
      { name: "Chicken Patty",
        image: "https://plus.unsplash.com/premium_photo-1673282157352-7b385a1d9ed7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OXx8cGFzdHJ5fGVufDB8fHx8MTc5MDE3NTgyOHww&ixlib=rb-4.1.0&q=80&w=1080", desc: "Puff pastry, creamy chicken filling", price: 250 },
      { name: "Cheese Roll",
        image: "https://images.unsplash.com/photo-1583338917451-face2751d8d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fHBhc3RyeXxlbnwwfHx8fDE3OTAxNzU4Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Molten cheese in flaky pastry", price: 250 },
      { name: "Pizza Slice",
        image: "https://images.unsplash.com/photo-1534432182912-63863115e106?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fHBhc3RyeXxlbnwwfHx8fDE3OTAxNzU4Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Chicken, capsicum, mozzarella", price: 350 },
      { name: "Chicken Bread",
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fHBhc3RyeXxlbnwwfHx8fDE3OTAxNzU4Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Stuffed loaf, creamy chicken, sesame top", price: 600 },
    ],
  },
  {
    id: "salads",
    title: "Salad Bar",
    tagline: "Made fresh daily · sold by weight",
    note: "All salads Rs 2,000 per kilogram. Packed to order at the counter.",
    image: salads,
    items: [
      { name: "Apple Slaw",
        image: "https://plus.unsplash.com/premium_photo-1665669248059-0a70291944f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTN8fHBhc3RyeXxlbnwwfHx8fDE3OTAxNzU4Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Crisp cabbage, apple, creamy dressing", price: 2000, unit: "/ kg" },
      { name: "Chickpea Chaat Salad",
        image: "https://images.unsplash.com/photo-1681218424681-b4f8228ecea9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fHBhc3RyeXxlbnwwfHx8fDE3OTAxNzU4Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Chickpeas, onion, tamarind, coriander", price: 2000, unit: "/ kg" },
      { name: "Sweet Corn Salad",
        image: "https://images.unsplash.com/photo-1622941367239-8acd68fa946d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fHBhc3RyeXxlbnwwfHx8fDE3OTAxNzU4Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Corn, capsicum, light mayo", price: 2000, unit: "/ kg" },
      { name: "Pasta Salad",
        image: "https://images.unsplash.com/photo-1558326567-98ae2405596b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fHBhc3RyeXxlbnwwfHx8fDE3OTAxNzU4Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Penne, olives, herbs, creamy dressing", price: 2000, unit: "/ kg" },
      { name: "Russian Salad",
        image: "https://plus.unsplash.com/premium_photo-1673282159649-089caddeea0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTd8fHBhc3RyeXxlbnwwfHx8fDE3OTAxNzU4Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Fruit, cream, classic party favourite", price: 2000, unit: "/ kg" },
    ],
  },
  {
    id: "panini",
    title: "Panini Sandwiches",
    tagline: "Pressed to order at the live counter",
    image: panini,
    items: [
      { name: "Chicken Tikka Panini",
        image: "https://images.unsplash.com/photo-1597528662465-55ece5734101?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTh8fHBhc3RyeXxlbnwwfHx8fDE3OTAxNzU4Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Spiced chicken, cheese, house sauce", price: 550 },
      { name: "Crispy Chicken Panini",
        image: "https://images.unsplash.com/photo-1691052252990-4cd1fdda73dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTl8fHBhc3RyeXxlbnwwfHx8fDE3OTAxNzU4Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Fried fillet, slaw, garlic mayo", price: 550 },
      { name: "Chicken Cheese Panini",
        image: "https://images.unsplash.com/photo-1681218079567-35aef7c8e7e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjB8fHBhc3RyeXxlbnwwfHx8fDE3OTAxNzU4Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Shredded chicken, triple cheese melt", price: 550 },
      { name: "Grilled Vegetable Panini",
        image: "https://plus.unsplash.com/premium_photo-1664640733898-d5c3f71f44e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8YnJlYWR8ZW58MHx8fHwxNzkwMTc1ODI4fDA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Roast veg, mozzarella, pesto", price: 550 },
    ],
  },
  {
    id: "appetizers",
    title: "Appetizers",
    tagline: "For the table, while you wait",
    image: appetizers,
    items: [
      { name: "Garlic Bread",
        image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8YnJlYWR8ZW58MHx8fHwxNzkwMTc1ODI4fDA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Herb butter, toasted crust", price: 300 },
      { name: "Loaded Fries",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8YnJlYWR8ZW58MHx8fHwxNzkwMTc1ODI4fDA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Cheese sauce, jalapeño, herbs", price: 590 },
      { name: "Hot Wings",
        image: "https://images.unsplash.com/photo-1598373182133-52452f7691ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8YnJlYWR8ZW58MHx8fHwxNzkwMTc1ODI4fDA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Six pieces, buffalo or BBQ glaze", price: 690 },
      { name: "Mozzarella Sticks",
        image: "https://plus.unsplash.com/premium_photo-1673111979369-0222c7314b82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8YnJlYWR8ZW58MHx8fHwxNzkwMTc1ODI4fDA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Golden crumbed, marinara dip", price: 690 },
      { name: "Loaded Nachos",
        image: "https://images.unsplash.com/photo-1534620808146-d33bb39128b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8YnJlYWR8ZW58MHx8fHwxNzkwMTc1ODI4fDA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Salsa, cheese, olives, sour cream", price: 890 },
    ],
  },
  {
    id: "rolls-platters",
    title: "Rolls & Platters",
    tagline: "Casual dining, family portions",
    image: dining,
    items: [
      { name: "Chicken Shawarma Roll",
        image: "https://images.unsplash.com/photo-1599819055803-717bba43890f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8YnJlYWR8ZW58MHx8fHwxNzkwMTc1ODI4fDA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Grilled chicken, garlic sauce, pickles", price: 630 },
      { name: "Paratha Roll",
        image: "https://images.unsplash.com/photo-1549413468-cd78edb7e75c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8YnJlYWR8ZW58MHx8fHwxNzkwMTc1ODI4fDA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Flaky paratha, spiced chicken, chutney", price: 690 },
      { name: "Fish & Chips",
        image: "https://plus.unsplash.com/premium_photo-1675788939191-713c2abf3da6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OXx8YnJlYWR8ZW58MHx8fHwxNzkwMTc1ODI4fDA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Crumbed fillet, fries, tartare", price: 990 },
      { name: "Grilled Chicken Platter",
        image: "https://images.unsplash.com/photo-1559811814-e2c57b5e69df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fGJyZWFkfGVufDB8fHx8MTc5MDE3NTgyOHww&ixlib=rb-4.1.0&q=80&w=1080", desc: "Chicken, rice, salad, two sauces", price: 1190 },
    ],
  },
  {
    id: "pastas",
    title: "Pastas",
    tagline: "Cooked to order in the open kitchen",
    image: pasta,
    items: [
      { name: "Mac & Cheese",
        image: "https://images.unsplash.com/photo-1533782654613-826a072dd6f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fGJyZWFkfGVufDB8fHx8MTc5MDE3NTgyOHww&ixlib=rb-4.1.0&q=80&w=1080", desc: "Three-cheese sauce, baked crumb", price: 550 },
      { name: "Penne Arrabbiata",
        image: "https://images.unsplash.com/photo-1590301157172-7ba48dd1c2b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fGJyZWFkfGVufDB8fHx8MTc5MDE3NTgyOHww&ixlib=rb-4.1.0&q=80&w=1080", desc: "Spiced tomato, garlic, basil", price: 890 },
      { name: "Chicken Alfredo",
        image: "https://plus.unsplash.com/premium_photo-1675727579991-16042ead1ddf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTN8fGJyZWFkfGVufDB8fHx8MTc5MDE3NTgyOHww&ixlib=rb-4.1.0&q=80&w=1080", desc: "Cream, parmesan, grilled chicken", price: 950 },
      { name: "Pink Sauce Pasta",
        image: "https://images.unsplash.com/photo-1586765501019-cbe3973ef8fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fGJyZWFkfGVufDB8fHx8MTc5MDE3NTgyOHww&ixlib=rb-4.1.0&q=80&w=1080", desc: "Tomato-cream blend, chicken, chilli flakes", price: 1150 },
    ],
  },
  {
    id: "pizzas",
    title: "Pizzas",
    tagline: "Hand-stretched · Small, Medium, Large & XL",
    note: "Stuffed crust available on Large and XL for Rs 300 extra.",
    image: pizza,
    items: [
      {
        name: "Margherita",
        image: "https://images.unsplash.com/photo-1613396874083-2d5fbe59ae79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fGJyZWFkfGVufDB8fHx8MTc5MDE3NTgyOHww&ixlib=rb-4.1.0&q=80&w=1080",
        desc: "Tomato, mozzarella, fresh basil",
        variants: [
          { label: "Small", price: 650 },
          { label: "Medium", price: 1090 },
          { label: "Large", price: 1590 },
          { label: "XL", price: 1990 },
        ],
      },
      {
        name: "Chicken Tikka",
        image: "https://images.unsplash.com/photo-1486887396153-fa416526c108?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fGJyZWFkfGVufDB8fHx8MTc5MDE3NTgyOHww&ixlib=rb-4.1.0&q=80&w=1080",
        desc: "Tikka chicken, onion, capsicum",
        variants: [
          { label: "Small", price: 750 },
          { label: "Medium", price: 1190 },
          { label: "Large", price: 1790 },
          { label: "XL", price: 2190 },
        ],
      },
      {
        name: "Chicken Fajita",
        image: "https://plus.unsplash.com/premium_photo-1675788938626-de5cd00407ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTd8fGJyZWFkfGVufDB8fHx8MTc5MDE3NTgyOHww&ixlib=rb-4.1.0&q=80&w=1080",
        desc: "Marinated fajita strips, peppers, cheese",
        variants: [
          { label: "Small", price: 790 },
          { label: "Medium", price: 1290 },
          { label: "Large", price: 1890 },
          { label: "XL", price: 2290 },
        ],
      },
      {
        name: "Pepperoni",
        image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTh8fGJyZWFkfGVufDB8fHx8MTc5MDE3NTgyOHww&ixlib=rb-4.1.0&q=80&w=1080",
        desc: "Chicken pepperoni, oregano, mozzarella",
        variants: [
          { label: "Small", price: 850 },
          { label: "Medium", price: 1390 },
          { label: "Large", price: 1990 },
          { label: "XL", price: 2390 },
        ],
      },
      {
        name: "Circles Treat Pizza",
        image: "https://images.unsplash.com/photo-1567042661848-7161ce446f85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTl8fGJyZWFkfGVufDB8fHx8MTc5MDE3NTgyOHww&ixlib=rb-4.1.0&q=80&w=1080",
        desc: "Loaded four-topping house special",
        variants: [
          { label: "Small", price: 890 },
          { label: "Medium", price: 1490 },
          { label: "Large", price: 2190 },
          { label: "XL", price: 2590 },
        ],
      },
    ],
  },
  {
    id: "burgers",
    title: "Burgers",
    tagline: "Brioche buns baked in-house",
    image: burgers,
    items: [
      { name: "Zinger Burger",
        image: "https://images.unsplash.com/photo-1691480162735-9b91238080f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjB8fGJyZWFkfGVufDB8fHx8MTc5MDE3NTgyOHww&ixlib=rb-4.1.0&q=80&w=1080", desc: "Crispy fillet, slaw, house mayo", price: 590 },
      { name: "Cheese Burger",
        image: "https://images.unsplash.com/photo-1556742526-795a8eac090e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDF8MXxzZWFyY2h8MXx8Y29mZmVlfGVufDB8fHx8MTc5MDE3NTgyOXww&ixlib=rb-4.1.0&q=80&w=1080", desc: "Beef patty, cheddar, pickles", price: 650 },
      { name: "Beef Burger",
        image: "https://plus.unsplash.com/premium_photo-1675435644687-562e8042b9db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8Y29mZmVlfGVufDB8fHx8MTc5MDE3NTgyOXww&ixlib=rb-4.1.0&q=80&w=1080", desc: "Char-grilled patty, lettuce, tomato", price: 690 },
      { name: "Double Decker",
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8Y29mZmVlfGVufDB8fHx8MTc5MDE3NTgyOXww&ixlib=rb-4.1.0&q=80&w=1080", desc: "Two patties, double cheese, smoky sauce", price: 750 },
    ],
  },
  {
    id: "coffee",
    title: "Coffee & Beverages",
    tagline: "Premium beans, pulled fresh all day",
    image: coffee,
    items: [
      { name: "Espresso",
        image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8Y29mZmVlfGVufDB8fHx8MTc5MDE3NTgyOXww&ixlib=rb-4.1.0&q=80&w=1080", desc: "Double shot, rich crema", price: 300 },
      { name: "Cappuccino",
        image: "https://plus.unsplash.com/premium_photo-1674327105074-46dd8319164b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8Y29mZmVlfGVufDB8fHx8MTc5MDE3NTgyOXww&ixlib=rb-4.1.0&q=80&w=1080", desc: "Balanced shot, airy foam", price: 400 },
      { name: "Flat White",
        image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8Y29mZmVlfGVufDB8fHx8MTc5MDE3NTgyOXww&ixlib=rb-4.1.0&q=80&w=1080", desc: "Velvet microfoam, smooth finish", price: 420 },
      { name: "Caramel Latte",
        image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8Y29mZmVlfGVufDB8fHx8MTc5MDE3NTgyOXww&ixlib=rb-4.1.0&q=80&w=1080", desc: "Silky milk, house caramel", price: 480 },
      { name: "Iced Spanish Latte",
        image: "https://images.unsplash.com/photo-1556740767-414a9c4860c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDF8MXxzZWFyY2h8OHx8Y29mZmVlfGVufDB8fHx8MTc5MDE3NTgyOXww&ixlib=rb-4.1.0&q=80&w=1080", desc: "Sweet condensed milk over ice", price: 500 },
      { name: "Hot Chocolate",
        image: "https://plus.unsplash.com/premium_photo-1673545518947-ddf3240090b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OXx8Y29mZmVlfGVufDB8fHx8MTc5MDE3NTgyOXww&ixlib=rb-4.1.0&q=80&w=1080", desc: "Melted dark chocolate, steamed milk", price: 450 },
    ],
  },
  {
    id: "pantry",
    title: "Honey, Oils & Panjeeri",
    tagline: "Take a little of Circles home",
    image: pantry,
    items: [
      { name: "Raw Honey (Small)",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fGNvZmZlZXxlbnwwfHx8fDE3OTAxNzU4Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Unfiltered, single-origin", price: 1880 },
      { name: "Panjeeri",
        image: "https://images.unsplash.com/photo-1610632380989-680fe40816c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fGNvZmZlZXxlbnwwfHx8fDE3OTAxNzU4Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Traditional nut and semolina blend", price: 2400 },
      { name: "Olive Oil",
        image: "https://images.unsplash.com/photo-1542372147193-a7aca54189cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fGNvZmZlZXxlbnwwfHx8fDE3OTAxNzU4Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Extra virgin, cold pressed", price: 3200 },
      { name: "Raw Honey (Large)",
        image: "https://plus.unsplash.com/premium_photo-1677661620514-aec974a9876c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTN8fGNvZmZlZXxlbnwwfHx8fDE3OTAxNzU4Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Family jar, unfiltered", price: 3630 },
    ],
  },
  {
    id: "celebration-cakes",
    title: "Celebration Cakes",
    tagline: "Custom cakes designed with you",
    note: "Please order 48 hours in advance for bespoke designs.",
    image: desserts,
    items: [
      { name: "Photo Print Cake",
        image: "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fGNvZmZlZXxlbnwwfHx8fDE3OTAxNzU4Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Edible print, personalised message", price: 2800, from: true },
      { name: "Number & Letter Cake",
        image: "https://images.unsplash.com/photo-1556745753-b2904692b3cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDF8MXxzZWFyY2h8MTV8fGNvZmZlZXxlbnwwfHx8fDE3OTAxNzU4Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Cream tart base, fresh fruit & florals", price: 3200, from: true },
      { name: "Custom Birthday Cake",
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fGNvZmZlZXxlbnwwfHx8fDE3OTAxNzU4Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Bespoke design, choice of flavours", price: 3500, from: true },
      { name: "Wedding Tier Cake",
        image: "https://plus.unsplash.com/premium_photo-1664970900025-1e3099ca757a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTd8fGNvZmZlZXxlbnwwfHx8fDE3OTAxNzU4Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Multi-tier, hand-finished detailing", enquire: true },
    ],
  },
];

/** Premium segmented groups so the nav never shows 20 categories at once. */
export interface Group {
  id: string;
  label: string;
  sections: string[];
}

export const GROUPS: Group[] = [
  { id: "cakes", label: "Cakes", sections: ["signature-cakes", "three-milk-cakes", "cheesecakes", "celebration-cakes"] },
  { id: "pastries", label: "Pâtisserie", sections: ["croissants", "eclairs", "pastries-desserts", "cupcakes-muffins", "donuts"] },
  { id: "bakery", label: "Bakery", sections: ["artisan-bread", "biscuits"] },
  { id: "savoury", label: "Kitchen", sections: ["savouries", "panini", "appetizers", "rolls-platters", "pastas", "pizzas", "burgers", "salads"] },
  { id: "drinks", label: "Coffee Bar", sections: ["coffee"] },
  { id: "pantry", label: "Pantry", sections: ["pantry"] },
];

export const groupOf = (sectionId: string) =>
  GROUPS.find((g) => g.sections.includes(sectionId))?.id ?? "cakes";

/** Lowest purchasable price in a section, used by the price-range filter. */
export function itemPrices(item: Item): number[] {
  if (item.variants) return item.variants.map((v) => v.price);
  if (item.price !== undefined) return [item.price];
  return [];
}
