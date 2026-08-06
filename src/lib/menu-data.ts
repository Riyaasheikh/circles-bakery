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
        desc: "Dark cocoa sponge, silky fudge, chocolate curls",
        variants: [
          { label: "1 lb", price: 1900 },
          { label: "2.5 lb", price: 4200 },
          { label: "5.5 lb", price: 7500 },
        ],
      },
      {
        name: "Black Forest",
        desc: "Cherry compote, whipped cream, chocolate shavings",
        variants: [
          { label: "1 lb", price: 1750 },
          { label: "2.5 lb", price: 3900 },
          { label: "5.5 lb", price: 7200 },
        ],
      },
      {
        name: "Red Velvet",
        desc: "Velvet crumb with tangy cream cheese frosting",
        variants: [
          { label: "1 lb", price: 1950 },
          { label: "2.5 lb", price: 4300 },
          { label: "5.5 lb", price: 7500 },
        ],
      },
      {
        name: "Vanilla Cream Cake",
        desc: "Light vanilla sponge, fresh cream, seasonal fruit",
        variants: [
          { label: "1 lb", price: 1650 },
          { label: "2.5 lb", price: 3700 },
          { label: "5.5 lb", price: 6900 },
        ],
      },
      {
        name: "Coffee Crunch",
        desc: "Espresso soak, praline crunch, coffee buttercream",
        variants: [
          { label: "1 lb", price: 1900 },
          { label: "2.5 lb", price: 4200 },
          { label: "5.5 lb", price: 7500 },
        ],
      },
      {
        name: "Fresh Fruit Gateau",
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
      { name: "Dream Milk Cake", desc: "Triple milk soak, cream finish, toasted nut", price: 3200 },
      { name: "Lotus Milk Cake", desc: "Caramelised Biscoff crumble, milk soak", price: 3200 },
      { name: "Chocolate Milk Cake", desc: "Cocoa sponge, milk soak, dark ganache", price: 3200 },
      { name: "Nutella Milk Cake", desc: "Hazelnut cream ribbons through milk sponge", price: 3200 },
      { name: "Pistachio Milk Cake", desc: "Kesar-pista cream, crushed pistachio", price: 3200 },
    ],
  },
  {
    id: "cheesecakes",
    title: "Cheesecakes",
    tagline: "Baked New York style · by the slice or whole",
    image: cheesecake,
    items: [
      { name: "New York Cheesecake (Slice)", desc: "Dense vanilla bean cheesecake, biscuit base", price: 900, unit: "/ slice" },
      { name: "New York Cheesecake (Whole)", desc: "Serves 10–12, biscuit base", price: 7200 },
      { name: "Blueberry Cheesecake (Slice)", desc: "Wild blueberry compote glaze", price: 900, unit: "/ slice" },
      { name: "Lotus Cheesecake (Slice)", desc: "Biscoff base, caramelised topping", price: 900, unit: "/ slice" },
      { name: "Mango Cheesecake (Slice)", desc: "Seasonal mango, cream cheese, biscuit", price: 900, unit: "/ slice" },
    ],
  },
  {
    id: "croissants",
    title: "Croissants",
    tagline: "72-hour laminated, baked through the morning",
    image: croissants,
    items: [
      { name: "Plain Butter Croissant", desc: "All-butter lamination, honeycomb crumb", price: 350 },
      { name: "Chocolate Croissant", desc: "Two batons of dark chocolate", price: 450 },
      { name: "Almond Croissant", desc: "Twice-baked, frangipane, flaked almonds", price: 500 },
      { name: "Nutella Croissant", desc: "Hazelnut cream filled, cocoa dust", price: 550 },
      { name: "Cheese & Olive Croissant", desc: "Mozzarella, black olive, oregano", price: 550 },
    ],
  },
  {
    id: "eclairs",
    title: "Éclairs",
    tagline: "Choux baked daily, filled to order",
    image: eclairs,
    items: [
      { name: "Chocolate Éclair", desc: "Vanilla crème pâtissière, dark glaze", price: 400 },
      { name: "Praline Éclair", desc: "Hazelnut praline cream, gold crumb", price: 400 },
      { name: "Craquelin Éclair", desc: "Crisp craquelin top, vanilla cream", price: 400 },
      { name: "Lotus Éclair", desc: "Biscoff crème, caramelised crumb", price: 400 },
    ],
  },
  {
    id: "pastries-desserts",
    title: "Pastries & Desserts",
    tagline: "The pâtisserie case, refreshed twice a day",
    image: pastries,
    items: [
      { name: "Cinnamon Roll", desc: "Warm swirls, cream cheese glaze, walnut", price: 380 },
      { name: "Pistachio Danish", desc: "Butter-laminated, pistachio cream, nibs", price: 420 },
      { name: "Fudge Brownie", desc: "Dense chocolate, walnut, sea salt", price: 350 },
      { name: "Chocolate Mousse Cup", desc: "Silky mousse, cocoa crumb", price: 450 },
      { name: "Tiramisu Cup", desc: "Espresso-soaked sponge, mascarpone", price: 550 },
    ],
  },
  {
    id: "cupcakes-muffins",
    title: "Cupcakes, Muffins & Cruffins",
    tagline: "Small bakes for the everyday treat",
    image: cupcakes,
    items: [
      { name: "Vanilla Cupcake", desc: "Buttercream swirl, sprinkles", price: 350 },
      { name: "Chocolate Cupcake", desc: "Cocoa sponge, fudge frosting", price: 400 },
      { name: "Blueberry Muffin", desc: "Bursting berries, crunchy sugar top", price: 450 },
      { name: "Chocolate Chip Muffin", desc: "Soft crumb, dark chips throughout", price: 450 },
      { name: "Cruffin", desc: "Croissant-muffin hybrid, cream filled", price: 700 },
    ],
  },
  {
    id: "donuts",
    title: "Donuts",
    tagline: "Hand-glazed each morning",
    image: donuts,
    items: [
      { name: "Chocolate Glazed Donut", desc: "Classic dark glaze, soft brioche dough", price: 300 },
      { name: "Strawberry Donut", desc: "Pink glaze, freeze-dried berry", price: 300 },
      { name: "Sprinkle Donut", desc: "Vanilla glaze, rainbow sprinkles", price: 300 },
      { name: "Lotus Donut", desc: "Biscoff drizzle, caramelised crumb", price: 350 },
      { name: "Nutella Filled Donut", desc: "Hazelnut cream centre, cocoa dust", price: 350 },
    ],
  },
  {
    id: "biscuits",
    title: "Biscuits & Cookies",
    tagline: "Sold by weight, boxed to gift",
    note: "Prices per kilogram. Half-kilo boxes available in store.",
    image: biscuits,
    items: [
      { name: "Nan Khatai", desc: "Traditional semolina shortbread, cardamom", price: 2200, unit: "/ kg" },
      { name: "Coconut Biscuits", desc: "Toasted coconut, buttery crumb", price: 2300, unit: "/ kg" },
      { name: "Chocolate Chip Cookies", desc: "Chewy centre, dark chocolate chunks", price: 2500, unit: "/ kg" },
      { name: "Almond Biscuits", desc: "Roasted almond, light snap", price: 2700, unit: "/ kg" },
      { name: "Pistachio Biscuits", desc: "Pistachio butter, green nib finish", price: 2700, unit: "/ kg" },
    ],
  },
  {
    id: "artisan-bread",
    title: "Special Breads",
    tagline: "Slow-proofed loaves from the boulangerie",
    image: bread,
    items: [
      { name: "Milk Bread", desc: "Soft, feather-light, lightly sweet", price: 250 },
      { name: "Baguette", desc: "Classic French, airy crumb, golden crust", price: 300 },
      { name: "Bran Bread", desc: "Wholesome bran, everyday loaf", price: 350 },
      { name: "Multigrain Loaf", desc: "Seven grains and seeds, soft crumb", price: 450 },
      { name: "Focaccia", desc: "Olive oil, rosemary, sea salt", price: 550 },
      { name: "Country Sourdough", desc: "Wild yeast, 24-hour ferment, crisp crust", price: 800 },
    ],
  },
  {
    id: "savouries",
    title: "Savouries",
    tagline: "The hot counter, straight from the oven",
    image: savoury,
    items: [
      { name: "Vegetable Samosa", desc: "Spiced potato and pea, crisp pastry", price: 50 },
      { name: "Chicken Samosa", desc: "Minced chicken, onion, green chilli", price: 120 },
      { name: "Spring Roll", desc: "Chicken and vegetable, thin crisp wrap", price: 150 },
      { name: "Chicken Patty", desc: "Puff pastry, creamy chicken filling", price: 250 },
      { name: "Cheese Roll", desc: "Molten cheese in flaky pastry", price: 250 },
      { name: "Pizza Slice", desc: "Chicken, capsicum, mozzarella", price: 350 },
      { name: "Chicken Bread", desc: "Stuffed loaf, creamy chicken, sesame top", price: 600 },
    ],
  },
  {
    id: "salads",
    title: "Salad Bar",
    tagline: "Made fresh daily · sold by weight",
    note: "All salads Rs 2,000 per kilogram. Packed to order at the counter.",
    image: salads,
    items: [
      { name: "Apple Slaw", desc: "Crisp cabbage, apple, creamy dressing", price: 2000, unit: "/ kg" },
      { name: "Chickpea Chaat Salad", desc: "Chickpeas, onion, tamarind, coriander", price: 2000, unit: "/ kg" },
      { name: "Sweet Corn Salad", desc: "Corn, capsicum, light mayo", price: 2000, unit: "/ kg" },
      { name: "Pasta Salad", desc: "Penne, olives, herbs, creamy dressing", price: 2000, unit: "/ kg" },
      { name: "Russian Salad", desc: "Fruit, cream, classic party favourite", price: 2000, unit: "/ kg" },
    ],
  },
  {
    id: "panini",
    title: "Panini Sandwiches",
    tagline: "Pressed to order at the live counter",
    image: panini,
    items: [
      { name: "Chicken Tikka Panini", desc: "Spiced chicken, cheese, house sauce", price: 550 },
      { name: "Crispy Chicken Panini", desc: "Fried fillet, slaw, garlic mayo", price: 550 },
      { name: "Chicken Cheese Panini", desc: "Shredded chicken, triple cheese melt", price: 550 },
      { name: "Grilled Vegetable Panini", desc: "Roast veg, mozzarella, pesto", price: 550 },
    ],
  },
  {
    id: "appetizers",
    title: "Appetizers",
    tagline: "For the table, while you wait",
    image: appetizers,
    items: [
      { name: "Garlic Bread", desc: "Herb butter, toasted crust", price: 300 },
      { name: "Loaded Fries", desc: "Cheese sauce, jalapeño, herbs", price: 590 },
      { name: "Hot Wings", desc: "Six pieces, buffalo or BBQ glaze", price: 690 },
      { name: "Mozzarella Sticks", desc: "Golden crumbed, marinara dip", price: 690 },
      { name: "Loaded Nachos", desc: "Salsa, cheese, olives, sour cream", price: 890 },
    ],
  },
  {
    id: "rolls-platters",
    title: "Rolls & Platters",
    tagline: "Casual dining, family portions",
    image: dining,
    items: [
      { name: "Chicken Shawarma Roll", desc: "Grilled chicken, garlic sauce, pickles", price: 630 },
      { name: "Paratha Roll", desc: "Flaky paratha, spiced chicken, chutney", price: 690 },
      { name: "Fish & Chips", desc: "Crumbed fillet, fries, tartare", price: 990 },
      { name: "Grilled Chicken Platter", desc: "Chicken, rice, salad, two sauces", price: 1190 },
    ],
  },
  {
    id: "pastas",
    title: "Pastas",
    tagline: "Cooked to order in the open kitchen",
    image: pasta,
    items: [
      { name: "Mac & Cheese", desc: "Three-cheese sauce, baked crumb", price: 550 },
      { name: "Penne Arrabbiata", desc: "Spiced tomato, garlic, basil", price: 890 },
      { name: "Chicken Alfredo", desc: "Cream, parmesan, grilled chicken", price: 950 },
      { name: "Pink Sauce Pasta", desc: "Tomato-cream blend, chicken, chilli flakes", price: 1150 },
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
      { name: "Zinger Burger", desc: "Crispy fillet, slaw, house mayo", price: 590 },
      { name: "Cheese Burger", desc: "Beef patty, cheddar, pickles", price: 650 },
      { name: "Beef Burger", desc: "Char-grilled patty, lettuce, tomato", price: 690 },
      { name: "Double Decker", desc: "Two patties, double cheese, smoky sauce", price: 750 },
    ],
  },
  {
    id: "coffee",
    title: "Coffee & Beverages",
    tagline: "Premium beans, pulled fresh all day",
    image: coffee,
    items: [
      { name: "Espresso", desc: "Double shot, rich crema", price: 300 },
      { name: "Cappuccino", desc: "Balanced shot, airy foam", price: 400 },
      { name: "Flat White", desc: "Velvet microfoam, smooth finish", price: 420 },
      { name: "Caramel Latte", desc: "Silky milk, house caramel", price: 480 },
      { name: "Iced Spanish Latte", desc: "Sweet condensed milk over ice", price: 500 },
      { name: "Hot Chocolate", desc: "Melted dark chocolate, steamed milk", price: 450 },
    ],
  },
  {
    id: "pantry",
    title: "Honey, Oils & Panjeeri",
    tagline: "Take a little of Circles home",
    image: pantry,
    items: [
      { name: "Raw Honey (Small)", desc: "Unfiltered, single-origin", price: 1880 },
      { name: "Panjeeri", desc: "Traditional nut and semolina blend", price: 2400 },
      { name: "Olive Oil", desc: "Extra virgin, cold pressed", price: 3200 },
      { name: "Raw Honey (Large)", desc: "Family jar, unfiltered", price: 3630 },
    ],
  },
  {
    id: "celebration-cakes",
    title: "Celebration Cakes",
    tagline: "Custom cakes designed with you",
    note: "Please order 48 hours in advance for bespoke designs.",
    image: desserts,
    items: [
      { name: "Photo Print Cake", desc: "Edible print, personalised message", price: 2800, from: true },
      { name: "Number & Letter Cake", desc: "Cream tart base, fresh fruit & florals", price: 3200, from: true },
      { name: "Custom Birthday Cake", desc: "Bespoke design, choice of flavours", price: 3500, from: true },
      { name: "Wedding Tier Cake", desc: "Multi-tier, hand-finished detailing", enquire: true },
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
