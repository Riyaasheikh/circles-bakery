import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CgUy-Nbt.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as ScrollTrigger, r as gsapWithCSS } from "../_libs/gsap.mjs";
import { t as Route$9 } from "./router-DcQUqYIl.mjs";
import { a as useScroll, c as AnimatePresence, r as useTransform, s as motion } from "../_libs/framer-motion.mjs";
import { D as ChevronLeft, d as Search, p as Plus, t as X } from "../_libs/lucide-react.mjs";
import { i as useCart, n as cartCount, r as cartTotal, t as cart } from "./use-cart-Cqc4ck22.mjs";
import { a as SmoothScroll, c as m_coffee_default, d as m_pastries_default, f as m_rolls_platters_default, i as ScrollProgress, l as m_eclairs_default, n as Footer, p as m_signature_cakes_default, r as Reveal, s as m_bread_default, t as CustomCursor, u as m_panini_default } from "./Footer-C8U8PsxX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/menu-Bv_nUTM3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var m_celebration_default = "/assets/m-celebration-MsBuAFRK.jpg";
var m_salads_default = "/assets/m-salads-0Es-L3YF.jpg";
var m_croissants_default = "/assets/m-croissants-6dXGsLzM.jpg";
var m_savoury_default = "/assets/m-savoury-CcfTazEC.jpg";
var m_donuts_default = "/assets/m-donuts-CqY64sbJ.jpg";
var m_biscuits_default = "/assets/m-biscuits-B5wPLOfL.jpg";
var m_cupcakes_default = "/assets/m-cupcakes-Blnyo6sG.jpg";
var m_pantry_default = "/assets/m-pantry-D-NBjv38.jpg";
var m_cheesecake_default = "/assets/m-cheesecake-f1C2gD6M.jpg";
var m_milkcake_default = "/assets/m-milkcake-BouXJ5Qq.jpg";
var m_appetizers_default = "/assets/m-appetizers-t6H7Pejw.jpg";
var m_pasta_default = "/assets/m-pasta-Blh-embJ.jpg";
var m_pizza_default = "/assets/m-pizza-DyKc4pAB.jpg";
var m_burgers_default = "/assets/m-burgers-BqLVgY5U.jpg";
var item_ny_cheesecake_slice_default = "/assets/item-ny-cheesecake-slice-CjQduVPS.jpg";
var item_ny_cheesecake_whole_default = "/assets/item-ny-cheesecake-whole-DYVKOMfq.jpg";
var item_blueberry_cheesecake_default = "/assets/item-blueberry-cheesecake-CC3c3ueE.jpg";
var item_lotus_cheesecake_default = "/assets/item-lotus-cheesecake-ZnkMPAX2.jpg";
var item_mango_cheesecake_default = "/assets/item-mango-cheesecake-emyPtJFc.jpg";
var item_plain_croissant_default = "/assets/item-plain-croissant-Dr8do6A7.jpg";
var rs = (n) => `Rs ${n.toLocaleString()}`;
var SECTIONS = [
	{
		id: "signature-cakes",
		title: "Signature Cakes",
		tagline: "Baked to order · 1 lb, 2.5 lb & 5.5 lb",
		note: "Every cake is baked fresh the same day. Allow 4–6 hours for larger weights.",
		image: m_signature_cakes_default,
		items: [
			{
				name: "Chocolate Fudge Cake",
				image: "https://plus.unsplash.com/premium_photo-1713447395823-2e0b40b75a89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Y2FrZXxlbnwwfHx8fDE3OTAxNzU4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Dark cocoa sponge, silky fudge, chocolate curls",
				variants: [
					{
						label: "1 lb",
						price: 1900
					},
					{
						label: "2.5 lb",
						price: 4200
					},
					{
						label: "5.5 lb",
						price: 7500
					}
				]
			},
			{
				name: "Black Forest",
				image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8Y2FrZXxlbnwwfHx8fDE3OTAxNzU4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Cherry compote, whipped cream, chocolate shavings",
				variants: [
					{
						label: "1 lb",
						price: 1750
					},
					{
						label: "2.5 lb",
						price: 3900
					},
					{
						label: "5.5 lb",
						price: 7200
					}
				]
			},
			{
				name: "Red Velvet",
				image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8Y2FrZXxlbnwwfHx8fDE3OTAxNzU4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Velvet crumb with tangy cream cheese frosting",
				variants: [
					{
						label: "1 lb",
						price: 1950
					},
					{
						label: "2.5 lb",
						price: 4300
					},
					{
						label: "5.5 lb",
						price: 7500
					}
				]
			},
			{
				name: "Vanilla Cream Cake",
				image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8Y2FrZXxlbnwwfHx8fDE3OTAxNzU4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Light vanilla sponge, fresh cream, seasonal fruit",
				variants: [
					{
						label: "1 lb",
						price: 1650
					},
					{
						label: "2.5 lb",
						price: 3700
					},
					{
						label: "5.5 lb",
						price: 6900
					}
				]
			},
			{
				name: "Coffee Crunch",
				image: "https://plus.unsplash.com/premium_photo-1663839412026-51a44cfadfb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8Y2FrZXxlbnwwfHx8fDE3OTAxNzU4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Espresso soak, praline crunch, coffee buttercream",
				variants: [
					{
						label: "1 lb",
						price: 1900
					},
					{
						label: "2.5 lb",
						price: 4200
					},
					{
						label: "5.5 lb",
						price: 7500
					}
				]
			},
			{
				name: "Fresh Fruit Gateau",
				image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8Y2FrZXxlbnwwfHx8fDE3OTAxNzU4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Cream layers crowned with the day's fruit",
				variants: [
					{
						label: "1 lb",
						price: 1850
					},
					{
						label: "2.5 lb",
						price: 4100
					},
					{
						label: "5.5 lb",
						price: 7400
					}
				]
			}
		]
	},
	{
		id: "three-milk-cakes",
		title: "Three Milk Cakes",
		tagline: "Our most-loved counter — soaked, chilled, sliceable",
		image: m_milkcake_default,
		items: [
			{
				name: "Dream Milk Cake",
				image: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8Y2FrZXxlbnwwfHx8fDE3OTAxNzU4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Triple milk soak, cream finish, toasted nut",
				price: 3200
			},
			{
				name: "Lotus Milk Cake",
				image: "https://images.unsplash.com/photo-1602351447937-745cb720612f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8Y2FrZXxlbnwwfHx8fDE3OTAxNzU4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Caramelised Biscoff crumble, milk soak",
				price: 3200
			},
			{
				name: "Chocolate Milk Cake",
				image: "https://plus.unsplash.com/premium_photo-1679047666503-28884e055869?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OXx8Y2FrZXxlbnwwfHx8fDE3OTAxNzU4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Cocoa sponge, milk soak, dark ganache",
				price: 3200
			},
			{
				name: "Nutella Milk Cake",
				image: "https://images.unsplash.com/photo-1517427294546-5aa121f68e8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fGNha2V8ZW58MHx8fHwxNzkwMTc1ODI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Hazelnut cream ribbons through milk sponge",
				price: 3200
			},
			{
				name: "Pistachio Milk Cake",
				image: "https://images.unsplash.com/photo-1568827999250-3f6afff96e66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fGNha2V8ZW58MHx8fHwxNzkwMTc1ODI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Kesar-pista cream, crushed pistachio",
				price: 3200
			}
		]
	},
	{
		id: "cheesecakes",
		title: "Cheesecakes",
		tagline: "Baked New York style · by the slice or whole",
		image: m_cheesecake_default,
		items: [
			{
				name: "New York Cheesecake (Slice)",
				desc: "Dense vanilla bean cheesecake, biscuit base",
				price: 900,
				unit: "/ slice",
				image: item_ny_cheesecake_slice_default
			},
			{
				name: "New York Cheesecake (Whole)",
				desc: "Serves 10–12, biscuit base",
				price: 7200,
				image: item_ny_cheesecake_whole_default
			},
			{
				name: "Blueberry Cheesecake (Slice)",
				desc: "Wild blueberry compote glaze",
				price: 900,
				unit: "/ slice",
				image: item_blueberry_cheesecake_default
			},
			{
				name: "Lotus Cheesecake (Slice)",
				desc: "Biscoff base, caramelised topping",
				price: 900,
				unit: "/ slice",
				image: item_lotus_cheesecake_default
			},
			{
				name: "Mango Cheesecake (Slice)",
				desc: "Seasonal mango, cream cheese, biscuit",
				price: 900,
				unit: "/ slice",
				image: item_mango_cheesecake_default
			}
		]
	},
	{
		id: "croissants",
		title: "Croissants",
		tagline: "72-hour laminated, baked through the morning",
		image: m_croissants_default,
		items: [
			{
				name: "Plain Butter Croissant",
				desc: "All-butter lamination, honeycomb crumb",
				price: 350,
				image: item_plain_croissant_default
			},
			{
				name: "Chocolate Croissant",
				image: "https://images.unsplash.com/photo-1508737804141-4c3b688e2546?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fGNha2V8ZW58MHx8fHwxNzkwMTc1ODI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Two batons of dark chocolate",
				price: 450
			},
			{
				name: "Almond Croissant",
				image: "https://plus.unsplash.com/premium_photo-1690214491960-d447e38d0bd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTN8fGNha2V8ZW58MHx8fHwxNzkwMTc1ODI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Twice-baked, frangipane, flaked almonds",
				price: 500
			},
			{
				name: "Nutella Croissant",
				image: "https://images.unsplash.com/photo-1583338917451-face2751d8d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fGNha2V8ZW58MHx8fHwxNzkwMTc1ODI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Hazelnut cream filled, cocoa dust",
				price: 550
			},
			{
				name: "Cheese & Olive Croissant",
				image: "https://images.unsplash.com/photo-1595272568891-123402d0fb3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fGNha2V8ZW58MHx8fHwxNzkwMTc1ODI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Mozzarella, black olive, oregano",
				price: 550
			}
		]
	},
	{
		id: "eclairs",
		title: "Éclairs",
		tagline: "Choux baked daily, filled to order",
		image: m_eclairs_default,
		items: [
			{
				name: "Chocolate Éclair",
				image: "https://images.unsplash.com/photo-1562440499-64c9a111f713?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fGNha2V8ZW58MHx8fHwxNzkwMTc1ODI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Vanilla crème pâtissière, dark glaze",
				price: 400
			},
			{
				name: "Praline Éclair",
				image: "https://plus.unsplash.com/premium_photo-1670692695578-319f28b97ac1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTd8fGNha2V8ZW58MHx8fHwxNzkwMTc1ODI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Hazelnut praline cream, gold crumb",
				price: 400
			},
			{
				name: "Craquelin Éclair",
				image: "https://images.unsplash.com/photo-1577998474517-7eeeed4e448a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTh8fGNha2V8ZW58MHx8fHwxNzkwMTc1ODI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Crisp craquelin top, vanilla cream",
				price: 400
			},
			{
				name: "Lotus Éclair",
				image: "https://images.unsplash.com/photo-1610670444950-0b29430891b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTl8fGNha2V8ZW58MHx8fHwxNzkwMTc1ODI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Biscoff crème, caramelised crumb",
				price: 400
			}
		]
	},
	{
		id: "pastries-desserts",
		title: "Pastries & Desserts",
		tagline: "The pâtisserie case, refreshed twice a day",
		image: m_pastries_default,
		items: [
			{
				name: "Cinnamon Roll",
				image: "https://images.unsplash.com/photo-1622621746668-59fb299bc4d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjB8fGNha2V8ZW58MHx8fHwxNzkwMTc1ODI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Warm swirls, cream cheese glaze, walnut",
				price: 380
			},
			{
				name: "Pistachio Danish",
				image: "https://plus.unsplash.com/premium_photo-1725986663085-69be91a0c3af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Y3JvaXNzYW50fGVufDB8fHx8MTc5MDE3NTgyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Butter-laminated, pistachio cream, nibs",
				price: 420
			},
			{
				name: "Fudge Brownie",
				image: "https://images.unsplash.com/photo-1623334044303-241021148842?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8Y3JvaXNzYW50fGVufDB8fHx8MTc5MDE3NTgyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Dense chocolate, walnut, sea salt",
				price: 350
			},
			{
				name: "Chocolate Mousse Cup",
				image: "https://images.unsplash.com/photo-1691480162735-9b91238080f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8Y3JvaXNzYW50fGVufDB8fHx8MTc5MDE3NTgyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Silky mousse, cocoa crumb",
				price: 450
			},
			{
				name: "Tiramisu Cup",
				image: "https://images.unsplash.com/photo-1599940778173-e276d4acb2bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8Y3JvaXNzYW50fGVufDB8fHx8MTc5MDE3NTgyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Espresso-soaked sponge, mascarpone",
				price: 550
			}
		]
	},
	{
		id: "cupcakes-muffins",
		title: "Cupcakes, Muffins & Cruffins",
		tagline: "Small bakes for the everyday treat",
		image: m_cupcakes_default,
		items: [
			{
				name: "Vanilla Cupcake",
				image: "https://plus.unsplash.com/premium_photo-1661743823829-326b78143b30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8Y3JvaXNzYW50fGVufDB8fHx8MTc5MDE3NTgyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Buttercream swirl, sprinkles",
				price: 350
			},
			{
				name: "Chocolate Cupcake",
				image: "https://images.unsplash.com/photo-1681218079567-35aef7c8e7e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8Y3JvaXNzYW50fGVufDB8fHx8MTc5MDE3NTgyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Cocoa sponge, fudge frosting",
				price: 400
			},
			{
				name: "Blueberry Muffin",
				image: "https://images.unsplash.com/photo-1651604033534-e66b281f1981?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8Y3JvaXNzYW50fGVufDB8fHx8MTc5MDE3NTgyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Bursting berries, crunchy sugar top",
				price: 450
			},
			{
				name: "Chocolate Chip Muffin",
				image: "https://images.unsplash.com/photo-1612366747681-e4ca6992b1e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8Y3JvaXNzYW50fGVufDB8fHx8MTc5MDE3NTgyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Soft crumb, dark chips throughout",
				price: 450
			},
			{
				name: "Cruffin",
				image: "https://plus.unsplash.com/premium_photo-1692809723031-98c72b1871c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OXx8Y3JvaXNzYW50fGVufDB8fHx8MTc5MDE3NTgyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Croissant-muffin hybrid, cream filled",
				price: 700
			}
		]
	},
	{
		id: "donuts",
		title: "Donuts",
		tagline: "Hand-glazed each morning",
		image: m_donuts_default,
		items: [
			{
				name: "Chocolate Glazed Donut",
				image: "https://images.unsplash.com/photo-1600521853186-93b88b3a07b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fGNyb2lzc2FudHxlbnwwfHx8fDE3OTAxNzU4Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Classic dark glaze, soft brioche dough",
				price: 300
			},
			{
				name: "Strawberry Donut",
				image: "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fGNyb2lzc2FudHxlbnwwfHx8fDE3OTAxNzU4Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Pink glaze, freeze-dried berry",
				price: 300
			},
			{
				name: "Sprinkle Donut",
				image: "https://images.unsplash.com/photo-1587912001191-0cd4f14fd89e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fGNyb2lzc2FudHxlbnwwfHx8fDE3OTAxNzU4Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Vanilla glaze, rainbow sprinkles",
				price: 300
			},
			{
				name: "Lotus Donut",
				image: "https://plus.unsplash.com/premium_photo-1674562179816-04fda3958c12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTN8fGNyb2lzc2FudHxlbnwwfHx8fDE3OTAxNzU4Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Biscoff drizzle, caramelised crumb",
				price: 350
			},
			{
				name: "Nutella Filled Donut",
				image: "https://images.unsplash.com/photo-1586657263857-346c4b712ff5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fGNyb2lzc2FudHxlbnwwfHx8fDE3OTAxNzU4Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Hazelnut cream centre, cocoa dust",
				price: 350
			}
		]
	},
	{
		id: "biscuits",
		title: "Biscuits & Cookies",
		tagline: "Sold by weight, boxed to gift",
		note: "Prices per kilogram. Half-kilo boxes available in store.",
		image: m_biscuits_default,
		items: [
			{
				name: "Nan Khatai",
				image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fGNyb2lzc2FudHxlbnwwfHx8fDE3OTAxNzU4Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Traditional semolina shortbread, cardamom",
				price: 2200,
				unit: "/ kg"
			},
			{
				name: "Coconut Biscuits",
				image: "https://images.unsplash.com/photo-1700915704616-b455b3679024?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fGNyb2lzc2FudHxlbnwwfHx8fDE3OTAxNzU4Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Toasted coconut, buttery crumb",
				price: 2300,
				unit: "/ kg"
			},
			{
				name: "Chocolate Chip Cookies",
				image: "https://plus.unsplash.com/premium_photo-1670333242520-8c34b89e19e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTd8fGNyb2lzc2FudHxlbnwwfHx8fDE3OTAxNzU4Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Chewy centre, dark chocolate chunks",
				price: 2500,
				unit: "/ kg"
			},
			{
				name: "Almond Biscuits",
				image: "https://images.unsplash.com/photo-1613929231151-d7571591259e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTh8fGNyb2lzc2FudHxlbnwwfHx8fDE3OTAxNzU4Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Roasted almond, light snap",
				price: 2700,
				unit: "/ kg"
			},
			{
				name: "Pistachio Biscuits",
				image: "https://images.unsplash.com/photo-1652172600474-32937eefee09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTl8fGNyb2lzc2FudHxlbnwwfHx8fDE3OTAxNzU4Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Pistachio butter, green nib finish",
				price: 2700,
				unit: "/ kg"
			}
		]
	},
	{
		id: "artisan-bread",
		title: "Special Breads",
		tagline: "Slow-proofed loaves from the boulangerie",
		image: m_bread_default,
		items: [
			{
				name: "Milk Bread",
				image: "https://images.unsplash.com/photo-1693483640461-267d788b6148?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjB8fGNyb2lzc2FudHxlbnwwfHx8fDE3OTAxNzU4Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Soft, feather-light, lightly sweet",
				price: 250
			},
			{
				name: "Baguette",
				image: "https://plus.unsplash.com/premium_photo-1665669263531-cdcbe18e7fe4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8cGFzdHJ5fGVufDB8fHx8MTc5MDE3NTgyOHww&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Classic French, airy crumb, golden crust",
				price: 300
			},
			{
				name: "Bran Bread",
				image: "https://images.unsplash.com/photo-1623334044303-241021148842?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8cGFzdHJ5fGVufDB8fHx8MTc5MDE3NTgyOHww&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Wholesome bran, everyday loaf",
				price: 350
			},
			{
				name: "Multigrain Loaf",
				image: "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8cGFzdHJ5fGVufDB8fHx8MTc5MDE3NTgyOHww&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Seven grains and seeds, soft crumb",
				price: 450
			},
			{
				name: "Focaccia",
				image: "https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8cGFzdHJ5fGVufDB8fHx8MTc5MDE3NTgyOHww&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Olive oil, rosemary, sea salt",
				price: 550
			},
			{
				name: "Country Sourdough",
				image: "https://plus.unsplash.com/premium_photo-1681826507324-0b3c43928753?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8cGFzdHJ5fGVufDB8fHx8MTc5MDE3NTgyOHww&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Wild yeast, 24-hour ferment, crisp crust",
				price: 800
			}
		]
	},
	{
		id: "savouries",
		title: "Savouries",
		tagline: "The hot counter, straight from the oven",
		image: m_savoury_default,
		items: [
			{
				name: "Vegetable Samosa",
				image: "https://images.unsplash.com/photo-1587241321921-91a834d6d191?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8cGFzdHJ5fGVufDB8fHx8MTc5MDE3NTgyOHww&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Spiced potato and pea, crisp pastry",
				price: 50
			},
			{
				name: "Chicken Samosa",
				image: "https://images.unsplash.com/photo-1603532648955-039310d9ed75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8cGFzdHJ5fGVufDB8fHx8MTc5MDE3NTgyOHww&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Minced chicken, onion, green chilli",
				price: 120
			},
			{
				name: "Spring Roll",
				image: "https://images.unsplash.com/photo-1613929231151-d7571591259e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8cGFzdHJ5fGVufDB8fHx8MTc5MDE3NTgyOHww&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Chicken and vegetable, thin crisp wrap",
				price: 150
			},
			{
				name: "Chicken Patty",
				image: "https://plus.unsplash.com/premium_photo-1673282157352-7b385a1d9ed7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OXx8cGFzdHJ5fGVufDB8fHx8MTc5MDE3NTgyOHww&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Puff pastry, creamy chicken filling",
				price: 250
			},
			{
				name: "Cheese Roll",
				image: "https://images.unsplash.com/photo-1583338917451-face2751d8d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fHBhc3RyeXxlbnwwfHx8fDE3OTAxNzU4Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Molten cheese in flaky pastry",
				price: 250
			},
			{
				name: "Pizza Slice",
				image: "https://images.unsplash.com/photo-1534432182912-63863115e106?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fHBhc3RyeXxlbnwwfHx8fDE3OTAxNzU4Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Chicken, capsicum, mozzarella",
				price: 350
			},
			{
				name: "Chicken Bread",
				image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fHBhc3RyeXxlbnwwfHx8fDE3OTAxNzU4Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Stuffed loaf, creamy chicken, sesame top",
				price: 600
			}
		]
	},
	{
		id: "salads",
		title: "Salad Bar",
		tagline: "Made fresh daily · sold by weight",
		note: "All salads Rs 2,000 per kilogram. Packed to order at the counter.",
		image: m_salads_default,
		items: [
			{
				name: "Apple Slaw",
				image: "https://plus.unsplash.com/premium_photo-1665669248059-0a70291944f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTN8fHBhc3RyeXxlbnwwfHx8fDE3OTAxNzU4Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Crisp cabbage, apple, creamy dressing",
				price: 2e3,
				unit: "/ kg"
			},
			{
				name: "Chickpea Chaat Salad",
				image: "https://images.unsplash.com/photo-1681218424681-b4f8228ecea9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fHBhc3RyeXxlbnwwfHx8fDE3OTAxNzU4Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Chickpeas, onion, tamarind, coriander",
				price: 2e3,
				unit: "/ kg"
			},
			{
				name: "Sweet Corn Salad",
				image: "https://images.unsplash.com/photo-1622941367239-8acd68fa946d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fHBhc3RyeXxlbnwwfHx8fDE3OTAxNzU4Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Corn, capsicum, light mayo",
				price: 2e3,
				unit: "/ kg"
			},
			{
				name: "Pasta Salad",
				image: "https://images.unsplash.com/photo-1558326567-98ae2405596b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fHBhc3RyeXxlbnwwfHx8fDE3OTAxNzU4Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Penne, olives, herbs, creamy dressing",
				price: 2e3,
				unit: "/ kg"
			},
			{
				name: "Russian Salad",
				image: "https://plus.unsplash.com/premium_photo-1673282159649-089caddeea0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTd8fHBhc3RyeXxlbnwwfHx8fDE3OTAxNzU4Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Fruit, cream, classic party favourite",
				price: 2e3,
				unit: "/ kg"
			}
		]
	},
	{
		id: "panini",
		title: "Panini Sandwiches",
		tagline: "Pressed to order at the live counter",
		image: m_panini_default,
		items: [
			{
				name: "Chicken Tikka Panini",
				image: "https://images.unsplash.com/photo-1597528662465-55ece5734101?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTh8fHBhc3RyeXxlbnwwfHx8fDE3OTAxNzU4Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Spiced chicken, cheese, house sauce",
				price: 550
			},
			{
				name: "Crispy Chicken Panini",
				image: "https://images.unsplash.com/photo-1691052252990-4cd1fdda73dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTl8fHBhc3RyeXxlbnwwfHx8fDE3OTAxNzU4Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Fried fillet, slaw, garlic mayo",
				price: 550
			},
			{
				name: "Chicken Cheese Panini",
				image: "https://images.unsplash.com/photo-1681218079567-35aef7c8e7e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjB8fHBhc3RyeXxlbnwwfHx8fDE3OTAxNzU4Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Shredded chicken, triple cheese melt",
				price: 550
			},
			{
				name: "Grilled Vegetable Panini",
				image: "https://plus.unsplash.com/premium_photo-1664640733898-d5c3f71f44e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8YnJlYWR8ZW58MHx8fHwxNzkwMTc1ODI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Roast veg, mozzarella, pesto",
				price: 550
			}
		]
	},
	{
		id: "appetizers",
		title: "Appetizers",
		tagline: "For the table, while you wait",
		image: m_appetizers_default,
		items: [
			{
				name: "Garlic Bread",
				image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8YnJlYWR8ZW58MHx8fHwxNzkwMTc1ODI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Herb butter, toasted crust",
				price: 300
			},
			{
				name: "Loaded Fries",
				image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8YnJlYWR8ZW58MHx8fHwxNzkwMTc1ODI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Cheese sauce, jalapeño, herbs",
				price: 590
			},
			{
				name: "Hot Wings",
				image: "https://images.unsplash.com/photo-1598373182133-52452f7691ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8YnJlYWR8ZW58MHx8fHwxNzkwMTc1ODI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Six pieces, buffalo or BBQ glaze",
				price: 690
			},
			{
				name: "Mozzarella Sticks",
				image: "https://plus.unsplash.com/premium_photo-1673111979369-0222c7314b82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8YnJlYWR8ZW58MHx8fHwxNzkwMTc1ODI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Golden crumbed, marinara dip",
				price: 690
			},
			{
				name: "Loaded Nachos",
				image: "https://images.unsplash.com/photo-1534620808146-d33bb39128b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8YnJlYWR8ZW58MHx8fHwxNzkwMTc1ODI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Salsa, cheese, olives, sour cream",
				price: 890
			}
		]
	},
	{
		id: "rolls-platters",
		title: "Rolls & Platters",
		tagline: "Casual dining, family portions",
		image: m_rolls_platters_default,
		items: [
			{
				name: "Chicken Shawarma Roll",
				image: "https://images.unsplash.com/photo-1599819055803-717bba43890f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8YnJlYWR8ZW58MHx8fHwxNzkwMTc1ODI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Grilled chicken, garlic sauce, pickles",
				price: 630
			},
			{
				name: "Paratha Roll",
				image: "https://images.unsplash.com/photo-1549413468-cd78edb7e75c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8YnJlYWR8ZW58MHx8fHwxNzkwMTc1ODI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Flaky paratha, spiced chicken, chutney",
				price: 690
			},
			{
				name: "Fish & Chips",
				image: "https://plus.unsplash.com/premium_photo-1675788939191-713c2abf3da6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OXx8YnJlYWR8ZW58MHx8fHwxNzkwMTc1ODI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Crumbed fillet, fries, tartare",
				price: 990
			},
			{
				name: "Grilled Chicken Platter",
				image: "https://images.unsplash.com/photo-1559811814-e2c57b5e69df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fGJyZWFkfGVufDB8fHx8MTc5MDE3NTgyOHww&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Chicken, rice, salad, two sauces",
				price: 1190
			}
		]
	},
	{
		id: "pastas",
		title: "Pastas",
		tagline: "Cooked to order in the open kitchen",
		image: m_pasta_default,
		items: [
			{
				name: "Mac & Cheese",
				image: "https://images.unsplash.com/photo-1533782654613-826a072dd6f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fGJyZWFkfGVufDB8fHx8MTc5MDE3NTgyOHww&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Three-cheese sauce, baked crumb",
				price: 550
			},
			{
				name: "Penne Arrabbiata",
				image: "https://images.unsplash.com/photo-1590301157172-7ba48dd1c2b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fGJyZWFkfGVufDB8fHx8MTc5MDE3NTgyOHww&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Spiced tomato, garlic, basil",
				price: 890
			},
			{
				name: "Chicken Alfredo",
				image: "https://plus.unsplash.com/premium_photo-1675727579991-16042ead1ddf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTN8fGJyZWFkfGVufDB8fHx8MTc5MDE3NTgyOHww&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Cream, parmesan, grilled chicken",
				price: 950
			},
			{
				name: "Pink Sauce Pasta",
				image: "https://images.unsplash.com/photo-1586765501019-cbe3973ef8fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fGJyZWFkfGVufDB8fHx8MTc5MDE3NTgyOHww&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Tomato-cream blend, chicken, chilli flakes",
				price: 1150
			}
		]
	},
	{
		id: "pizzas",
		title: "Pizzas",
		tagline: "Hand-stretched · Small, Medium, Large & XL",
		note: "Stuffed crust available on Large and XL for Rs 300 extra.",
		image: m_pizza_default,
		items: [
			{
				name: "Margherita",
				image: "https://images.unsplash.com/photo-1613396874083-2d5fbe59ae79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fGJyZWFkfGVufDB8fHx8MTc5MDE3NTgyOHww&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Tomato, mozzarella, fresh basil",
				variants: [
					{
						label: "Small",
						price: 650
					},
					{
						label: "Medium",
						price: 1090
					},
					{
						label: "Large",
						price: 1590
					},
					{
						label: "XL",
						price: 1990
					}
				]
			},
			{
				name: "Chicken Tikka",
				image: "https://images.unsplash.com/photo-1486887396153-fa416526c108?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fGJyZWFkfGVufDB8fHx8MTc5MDE3NTgyOHww&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Tikka chicken, onion, capsicum",
				variants: [
					{
						label: "Small",
						price: 750
					},
					{
						label: "Medium",
						price: 1190
					},
					{
						label: "Large",
						price: 1790
					},
					{
						label: "XL",
						price: 2190
					}
				]
			},
			{
				name: "Chicken Fajita",
				image: "https://plus.unsplash.com/premium_photo-1675788938626-de5cd00407ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTd8fGJyZWFkfGVufDB8fHx8MTc5MDE3NTgyOHww&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Marinated fajita strips, peppers, cheese",
				variants: [
					{
						label: "Small",
						price: 790
					},
					{
						label: "Medium",
						price: 1290
					},
					{
						label: "Large",
						price: 1890
					},
					{
						label: "XL",
						price: 2290
					}
				]
			},
			{
				name: "Pepperoni",
				image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTh8fGJyZWFkfGVufDB8fHx8MTc5MDE3NTgyOHww&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Chicken pepperoni, oregano, mozzarella",
				variants: [
					{
						label: "Small",
						price: 850
					},
					{
						label: "Medium",
						price: 1390
					},
					{
						label: "Large",
						price: 1990
					},
					{
						label: "XL",
						price: 2390
					}
				]
			},
			{
				name: "Circles Treat Pizza",
				image: "https://images.unsplash.com/photo-1567042661848-7161ce446f85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTl8fGJyZWFkfGVufDB8fHx8MTc5MDE3NTgyOHww&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Loaded four-topping house special",
				variants: [
					{
						label: "Small",
						price: 890
					},
					{
						label: "Medium",
						price: 1490
					},
					{
						label: "Large",
						price: 2190
					},
					{
						label: "XL",
						price: 2590
					}
				]
			}
		]
	},
	{
		id: "burgers",
		title: "Burgers",
		tagline: "Brioche buns baked in-house",
		image: m_burgers_default,
		items: [
			{
				name: "Zinger Burger",
				image: "https://images.unsplash.com/photo-1691480162735-9b91238080f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjB8fGJyZWFkfGVufDB8fHx8MTc5MDE3NTgyOHww&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Crispy fillet, slaw, house mayo",
				price: 590
			},
			{
				name: "Cheese Burger",
				image: "https://images.unsplash.com/photo-1556742526-795a8eac090e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDF8MXxzZWFyY2h8MXx8Y29mZmVlfGVufDB8fHx8MTc5MDE3NTgyOXww&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Beef patty, cheddar, pickles",
				price: 650
			},
			{
				name: "Beef Burger",
				image: "https://plus.unsplash.com/premium_photo-1675435644687-562e8042b9db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8Y29mZmVlfGVufDB8fHx8MTc5MDE3NTgyOXww&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Char-grilled patty, lettuce, tomato",
				price: 690
			},
			{
				name: "Double Decker",
				image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8Y29mZmVlfGVufDB8fHx8MTc5MDE3NTgyOXww&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Two patties, double cheese, smoky sauce",
				price: 750
			}
		]
	},
	{
		id: "coffee",
		title: "Coffee & Beverages",
		tagline: "Premium beans, pulled fresh all day",
		image: m_coffee_default,
		items: [
			{
				name: "Espresso",
				image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8Y29mZmVlfGVufDB8fHx8MTc5MDE3NTgyOXww&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Double shot, rich crema",
				price: 300
			},
			{
				name: "Cappuccino",
				image: "https://plus.unsplash.com/premium_photo-1674327105074-46dd8319164b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8Y29mZmVlfGVufDB8fHx8MTc5MDE3NTgyOXww&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Balanced shot, airy foam",
				price: 400
			},
			{
				name: "Flat White",
				image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8Y29mZmVlfGVufDB8fHx8MTc5MDE3NTgyOXww&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Velvet microfoam, smooth finish",
				price: 420
			},
			{
				name: "Caramel Latte",
				image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8Y29mZmVlfGVufDB8fHx8MTc5MDE3NTgyOXww&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Silky milk, house caramel",
				price: 480
			},
			{
				name: "Iced Spanish Latte",
				image: "https://images.unsplash.com/photo-1556740767-414a9c4860c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDF8MXxzZWFyY2h8OHx8Y29mZmVlfGVufDB8fHx8MTc5MDE3NTgyOXww&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Sweet condensed milk over ice",
				price: 500
			},
			{
				name: "Hot Chocolate",
				image: "https://plus.unsplash.com/premium_photo-1673545518947-ddf3240090b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OXx8Y29mZmVlfGVufDB8fHx8MTc5MDE3NTgyOXww&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Melted dark chocolate, steamed milk",
				price: 450
			}
		]
	},
	{
		id: "pantry",
		title: "Honey, Oils & Panjeeri",
		tagline: "Take a little of Circles home",
		image: m_pantry_default,
		items: [
			{
				name: "Raw Honey (Small)",
				image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fGNvZmZlZXxlbnwwfHx8fDE3OTAxNzU4Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Unfiltered, single-origin",
				price: 1880
			},
			{
				name: "Panjeeri",
				image: "https://images.unsplash.com/photo-1610632380989-680fe40816c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fGNvZmZlZXxlbnwwfHx8fDE3OTAxNzU4Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Traditional nut and semolina blend",
				price: 2400
			},
			{
				name: "Olive Oil",
				image: "https://images.unsplash.com/photo-1542372147193-a7aca54189cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fGNvZmZlZXxlbnwwfHx8fDE3OTAxNzU4Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Extra virgin, cold pressed",
				price: 3200
			},
			{
				name: "Raw Honey (Large)",
				image: "https://plus.unsplash.com/premium_photo-1677661620514-aec974a9876c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTN8fGNvZmZlZXxlbnwwfHx8fDE3OTAxNzU4Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Family jar, unfiltered",
				price: 3630
			}
		]
	},
	{
		id: "celebration-cakes",
		title: "Celebration Cakes",
		tagline: "Custom cakes designed with you",
		note: "Please order 48 hours in advance for bespoke designs.",
		image: m_celebration_default,
		items: [
			{
				name: "Photo Print Cake",
				image: "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fGNvZmZlZXxlbnwwfHx8fDE3OTAxNzU4Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Edible print, personalised message",
				price: 2800,
				from: true
			},
			{
				name: "Number & Letter Cake",
				image: "https://images.unsplash.com/photo-1556745753-b2904692b3cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDF8MXxzZWFyY2h8MTV8fGNvZmZlZXxlbnwwfHx8fDE3OTAxNzU4Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Cream tart base, fresh fruit & florals",
				price: 3200,
				from: true
			},
			{
				name: "Custom Birthday Cake",
				image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fGNvZmZlZXxlbnwwfHx8fDE3OTAxNzU4Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Bespoke design, choice of flavours",
				price: 3500,
				from: true
			},
			{
				name: "Wedding Tier Cake",
				image: "https://plus.unsplash.com/premium_photo-1664970900025-1e3099ca757a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTd8fGNvZmZlZXxlbnwwfHx8fDE3OTAxNzU4Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
				desc: "Multi-tier, hand-finished detailing",
				enquire: true
			}
		]
	}
];
var GROUPS = [
	{
		id: "cakes",
		label: "Cakes",
		sections: [
			"signature-cakes",
			"three-milk-cakes",
			"cheesecakes",
			"celebration-cakes"
		]
	},
	{
		id: "pastries",
		label: "Pâtisserie",
		sections: [
			"croissants",
			"eclairs",
			"pastries-desserts",
			"cupcakes-muffins",
			"donuts"
		]
	},
	{
		id: "bakery",
		label: "Bakery",
		sections: ["artisan-bread", "biscuits"]
	},
	{
		id: "savoury",
		label: "Kitchen",
		sections: [
			"savouries",
			"panini",
			"appetizers",
			"rolls-platters",
			"pastas",
			"pizzas",
			"burgers",
			"salads"
		]
	},
	{
		id: "drinks",
		label: "Coffee Bar",
		sections: ["coffee"]
	},
	{
		id: "pantry",
		label: "Pantry",
		sections: ["pantry"]
	}
];
var groupOf = (sectionId) => GROUPS.find((g) => g.sections.includes(sectionId))?.id ?? "cakes";
/** Lowest purchasable price in a section, used by the price-range filter. */
function itemPrices(item) {
	if (item.variants) return item.variants.map((v) => v.price);
	if (item.price !== void 0) return [item.price];
	return [];
}
var badgeOf = (p) => p.is_best_seller ? "Best seller" : p.is_new_arrival ? "New" : p.is_featured ? "Featured" : void 0;
var variantsOf = (raw) => {
	if (!Array.isArray(raw)) return void 0;
	const list = raw.filter((v) => {
		const o = v;
		return typeof o?.label === "string" && Number.isFinite(Number(o?.price));
	}).map((v) => ({
		label: v.label,
		price: Number(v.price)
	}));
	return list.length ? list : void 0;
};
var toItem = (p) => ({
	name: p.name,
	desc: p.description ?? "",
	price: Number(p.price),
	...p.compare_at_price && Number(p.compare_at_price) > Number(p.price) ? { was: Number(p.compare_at_price) } : {},
	...variantsOf(p.variants) ? { variants: variantsOf(p.variants) } : {},
	...badgeOf(p) ? { badge: badgeOf(p) } : {},
	...p.stock_status !== "in_stock" || p.track_inventory && p.stock_quantity <= 0 ? { soldOut: true } : {},
	...p.image_url ? { image: p.image_url } : {}
});
/**
* Public menu, synchronised with the CRM: published, non-archived products
* from the database are merged into the curated category sections. A product
* whose name matches a curated item replaces it, so admins can adjust price,
* copy and availability without touching code.
*/
function useMenuSections() {
	const { data } = useQuery({
		queryKey: ["public", "products"],
		staleTime: 6e4,
		queryFn: async () => {
			const { data, error } = await supabase.from("products").select("id, name, description, price, compare_at_price, image_url, variants, sort_order, stock_status, track_inventory, stock_quantity, is_best_seller, is_new_arrival, is_featured, categories(slug)").eq("is_published", true).eq("is_archived", false).order("sort_order", { ascending: true });
			if (error) throw error;
			return data ?? [];
		}
	});
	return (0, import_react.useMemo)(() => {
		if (!data?.length) return SECTIONS;
		const bySlug = /* @__PURE__ */ new Map();
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
				items: [...extra, ...section.items.filter((i) => !names.has(i.name.toLowerCase()))]
			};
		});
	}, [data]);
}
var PRICE_BANDS = [
	{
		id: "all",
		label: "Any price",
		test: () => true
	},
	{
		id: "under-500",
		label: "Under Rs 500",
		test: (p) => p < 500
	},
	{
		id: "500-1000",
		label: "Rs 500 – 1,000",
		test: (p) => p >= 500 && p <= 1e3
	},
	{
		id: "1000-2500",
		label: "Rs 1,000 – 2,500",
		test: (p) => p > 1e3 && p <= 2500
	},
	{
		id: "over-2500",
		label: "Rs 2,500 +",
		test: (p) => p > 2500
	}
];
function matchesBand(item, band) {
	if (band === "all") return true;
	const test = PRICE_BANDS.find((b) => b.id === band).test;
	const prices = itemPrices(item);
	if (!prices.length) return false;
	return prices.some((p) => test(p));
}
function matchesQuery(item, q) {
	if (!q) return true;
	const needle = q.toLowerCase();
	return item.name.toLowerCase().includes(needle) || item.desc.toLowerCase().includes(needle) || (item.variants ?? []).some((v) => v.label.toLowerCase().includes(needle));
}
function QuickAdd({ label, aria, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		"aria-label": aria,
		className: "inline-flex items-center gap-1.5 rounded-full border border-gold/50 bg-white/80 px-4 py-1.5 font-body text-[11px] font-medium uppercase tracking-[0.16em] text-brown shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold hover:text-white hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold active:translate-y-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
			size: 12,
			strokeWidth: 2.4
		}), label]
	});
}
function ItemCard({ item, image, isCustomImage, sectionTitle, delay, index = 0 }) {
	const crops = [
		"50% 40%",
		"30% 55%",
		"70% 45%",
		"50% 70%",
		"40% 30%",
		"60% 60%"
	];
	const position = isCustomImage ? "center" : crops[index % crops.length];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
		delay,
		y: 26,
		className: "h-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white/65 backdrop-blur-sm transition-all duration-500 will-change-transform hover:-translate-y-1.5 hover:border-gold/45 hover:bg-white/90 hover:shadow-[0_36px_70px_-44px_rgba(92,59,34,0.6)] focus-within:border-gold/45",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative aspect-[16/11] overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: image,
						alt: `${item.name} — ${sectionTitle} at Circles Bakery, Sahiwal`,
						loading: "lazy",
						decoding: "async",
						width: 1024,
						height: 704,
						style: { objectPosition: position },
						className: "h-full w-full scale-[1.05] object-cover transition-transform duration-[1.3s] ease-out will-change-transform group-hover:scale-[1.08]"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-scrim/45 via-transparent to-transparent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 font-body text-[10px] uppercase tracking-[0.18em] text-brown backdrop-blur-sm",
						children: sectionTitle
					}),
					item.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute right-4 top-4 rounded-full bg-gold px-3 py-1 font-body text-[10px] uppercase tracking-[0.18em] text-white shadow-sm",
						children: item.badge
					}),
					item.soldOut && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute bottom-4 left-4 rounded-full bg-charcoal/85 px-3 py-1 font-body text-[10px] uppercase tracking-[0.18em] text-white",
						children: "Sold out"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 flex-col p-5 md:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "min-w-0 font-display text-xl leading-snug text-ivory md:text-2xl",
								children: item.name
							}),
							item.price !== void 0 && !item.variants && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "shrink-0 text-right font-body text-sm font-semibold tracking-wide text-brown",
								children: [
									item.from && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mr-1 text-[10px] font-normal uppercase tracking-[0.18em] text-beige",
										children: "from"
									}),
									item.was && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mr-1.5 font-normal text-beige line-through",
										children: rs(item.was)
									}),
									rs(item.price),
									item.unit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-1 font-normal text-beige",
										children: item.unit
									})
								]
							}),
							item.enquire && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "shrink-0 font-body text-[11px] uppercase tracking-[0.18em] text-beige",
								children: "On request"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-body text-[13px] font-light leading-relaxed text-beige",
						children: item.desc
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 flex flex-wrap gap-2 pt-1 transition-all duration-500 md:translate-y-1.5 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100",
						children: item.soldOut ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full border border-border px-4 py-1.5 font-body text-[11px] uppercase tracking-[0.16em] text-beige",
							children: "Currently unavailable"
						}) : item.variants ? item.variants.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => cart.add(`${item.name} · ${v.label}`, v.price),
							"aria-label": `Add ${item.name} ${v.label} to cart for ${rs(v.price)}`,
							className: "flex items-center gap-2 rounded-full border border-border bg-white/75 px-3.5 py-1.5 font-body text-[11px] tracking-wide text-brown shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold hover:text-white hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "uppercase tracking-[0.14em]",
								children: v.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: rs(v.price)
							})]
						}, v.label)) : item.enquire ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							hash: "reservation",
							className: "rounded-full border border-border px-4 py-1.5 font-body text-[11px] uppercase tracking-[0.16em] text-beige transition-colors hover:border-gold hover:text-brown",
							children: "Enquire"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickAdd, {
							label: "Quick add",
							aria: `Add ${item.name} to cart`,
							onClick: () => cart.add(item.name, item.price)
						})
					})
				]
			})]
		})
	});
}
function SectionHeading({ section }) {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const ctx = gsapWithCSS.context(() => {
			gsapWithCSS.fromTo(el, { y: 48 }, {
				y: -28,
				ease: "none",
				scrollTrigger: {
					trigger: el,
					start: "top bottom",
					end: "bottom top",
					scrub: true
				}
			});
		}, el);
		return () => ctx.revert();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		className: "mx-auto max-w-3xl text-center will-change-transform",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow mb-5",
				children: section.tagline
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-4xl leading-[1.05] text-ivory md:text-6xl",
				children: section.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto mt-7 flex items-center justify-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hairline w-16 md:w-24" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rotate-45 bg-gold/70" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hairline w-16 md:w-24" })
				]
			}),
			section.note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto mt-6 max-w-xl font-body text-xs font-light leading-relaxed text-beige",
				children: section.note
			})
		] })
	});
}
function ProductGrid({ section, items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mx-auto mt-14 grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3",
		children: items.map((item, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
			className: "h-full",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemCard, {
				item,
				image: item.image ?? section.image,
				isCustomImage: !!item.image,
				sectionTitle: section.title,
				index: j,
				delay: Math.min(j % 3 * .08, .16)
			})
		}, item.name))
	});
}
function MenuPage() {
	const { c } = Route$9.useSearch();
	const navigate = useNavigate({ from: "/menu" });
	const cartItems = useCart();
	const count = cartCount(cartItems);
	const total = cartTotal(cartItems);
	const [query, setQuery] = (0, import_react.useState)("");
	const [band, setBand] = (0, import_react.useState)("all");
	const [group, setGroup] = (0, import_react.useState)(null);
	const [activeId, setActiveId] = (0, import_react.useState)(null);
	const heroRef = (0, import_react.useRef)(null);
	const { scrollYProgress } = useScroll({
		target: heroRef,
		offset: ["start start", "end start"]
	});
	const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
	const heroFade = useTransform(scrollYProgress, [0, 1], [1, .25]);
	const SECTIONS = useMenuSections();
	const selected = c ? SECTIONS.find((s) => s.id === c) ?? null : null;
	(0, import_react.useEffect)(() => {
		if (selected) setGroup(groupOf(selected.id));
	}, [selected]);
	const selectCategory = (0, import_react.useCallback)((id) => {
		setQuery("");
		navigate({
			search: id ? { c: id } : {},
			resetScroll: false
		});
		if (id) requestAnimationFrame(() => {
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		});
	}, [navigate]);
	const visibleSections = (0, import_react.useMemo)(() => {
		return (selected ? [selected] : group ? SECTIONS.filter((s) => groupOf(s.id) === group) : SECTIONS).map((s) => ({
			section: s,
			items: s.items.filter((i) => matchesQuery(i, query) && matchesBand(i, band))
		})).filter((entry) => entry.items.length > 0);
	}, [
		selected,
		group,
		query,
		band
	]);
	const railSections = (0, import_react.useMemo)(() => group ? SECTIONS.filter((s) => groupOf(s.id) === group) : SECTIONS, [group]);
	const resultCount = visibleSections.reduce((n, s) => n + s.items.length, 0);
	const filtering = Boolean(query) || band !== "all";
	(0, import_react.useEffect)(() => {
		if (selected) {
			setActiveId(selected.id);
			return;
		}
		const els = visibleSections.map((v) => document.getElementById(v.section.id)).filter((el) => Boolean(el));
		if (!els.length) return;
		const io = new IntersectionObserver((entries) => {
			const top = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
			if (top) setActiveId(top.target.id);
		}, {
			rootMargin: "-45% 0px -45% 0px",
			threshold: [
				0,
				.25,
				.6,
				1
			]
		});
		els.forEach((el) => io.observe(el));
		return () => io.disconnect();
	}, [visibleSections, selected]);
	(0, import_react.useEffect)(() => {
		const t = setTimeout(() => ScrollTrigger.refresh(), 320);
		return () => clearTimeout(t);
	}, [visibleSections.length, selected]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmoothScroll, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomCursor, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollProgress, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "fixed inset-x-0 top-0 z-[9000] px-5 pt-4 md:px-10 md:pt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-full px-5 py-3 md:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "truncate font-display text-2xl tracking-[0.2em] text-foreground",
					children: "Circles"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "hidden font-body text-xs uppercase tracking-[0.22em] text-beige transition-colors hover:text-brown sm:block",
						children: "Home"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/checkout",
						className: "relative rounded-full bg-gold px-5 py-2.5 font-body text-xs uppercase tracking-[0.2em] text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-brown hover:shadow-md",
						children: ["Cart", count > 0 ? ` · ${count}` : ""]
					})]
				})]
			})
		}),
		count > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: {
				y: 80,
				opacity: 0
			},
			animate: {
				y: 0,
				opacity: 1
			},
			className: "fixed inset-x-0 bottom-4 z-[9000] px-5 md:px-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/checkout",
				className: "glass mx-auto grid max-w-md grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-full px-6 py-4 shadow-lg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "truncate font-body text-xs uppercase tracking-[0.18em] text-beige",
					children: [
						count,
						" item",
						count > 1 ? "s" : "",
						" · Rs ",
						total.toLocaleString()
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "shrink-0 font-body text-xs uppercase tracking-[0.18em] text-brown",
					children: "Checkout →"
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				ref: heroRef,
				className: "relative flex h-[62svh] items-end overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
						mode: "popLayout",
						initial: false,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: {
								opacity: 0,
								scale: 1.06
							},
							animate: {
								opacity: 1,
								scale: 1
							},
							exit: { opacity: 0 },
							transition: {
								duration: 1.1,
								ease: [
									.16,
									1,
									.3,
									1
								]
							},
							className: "absolute inset-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
								src: selected?.image ?? "/assets/hero-BHJK0N2d.jpg",
								alt: selected ? `${selected.title} at Circles Bakery, Sahiwal` : "Circles bakery interior with warm lighting and pastry display",
								fetchPriority: "high",
								decoding: "async",
								style: {
									y: heroY,
									opacity: heroFade
								},
								className: "h-full w-full scale-110 object-cover will-change-transform"
							})
						}, selected?.id ?? "all")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-scrim/55 via-scrim/35 to-scrim/85" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 md:px-10",
						children: [
							selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => selectCategory(null),
								className: "mb-6 inline-flex items-center gap-2 rounded-full border border-cream/35 px-4 py-2 font-body text-[10px] uppercase tracking-[0.24em] text-cream/90 transition-colors hover:border-gold hover:text-gold-soft",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 13 }), " All categories"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
								initial: {
									opacity: 0,
									y: 16
								},
								animate: {
									opacity: 1,
									y: 0
								},
								transition: { duration: .9 },
								className: "mb-5 font-body text-[0.7rem] font-medium uppercase tracking-[0.42em] text-gold-soft",
								children: selected ? selected.tagline : "Sahiwal · Freshly Baked Every Day"
							}, `eyebrow-${selected?.id ?? "all"}`),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h1, {
								initial: {
									opacity: 0,
									y: 26
								},
								animate: {
									opacity: 1,
									y: 0
								},
								transition: {
									duration: 1,
									ease: [
										.16,
										1,
										.3,
										1
									]
								},
								className: "max-w-4xl font-display text-[13vw] leading-[0.92] tracking-tight text-cream md:text-[6.4vw]",
								children: selected ? selected.title : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["The ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
									className: "not-italic text-gold-soft",
									children: "Menu"
								})] })
							}, `title-${selected?.id ?? "all"}`),
							!selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 max-w-xl font-body text-sm font-light leading-relaxed text-cream/85 md:text-base",
								children: "Cakes, pâtisserie, boulangerie, café and casual dining — every price in PKR, every item baked or cooked fresh the same day."
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sticky top-[72px] z-[60] border-b border-border bg-background/80 backdrop-blur-xl md:top-[86px]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-5 py-4 md:px-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "no-scrollbar -mx-1 flex snap-x items-center gap-2 overflow-x-auto px-1 md:flex-wrap md:justify-center md:overflow-visible",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavPill, {
								label: "Everything",
								active: !group && !selected,
								onClick: () => {
									setGroup(null);
									selectCategory(null);
								}
							}), GROUPS.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavPill, {
								label: g.label,
								active: group === g.id,
								onClick: () => {
									setGroup(g.id);
									navigate({
										search: {},
										resetScroll: false
									});
								}
							}, g.id))]
						}),
						(group || selected) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							"aria-label": "Menu categories",
							className: "mt-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "no-scrollbar -mx-1 flex snap-x snap-mandatory gap-1.5 overflow-x-auto scroll-smooth px-1 py-1 md:flex-wrap md:justify-center md:overflow-visible",
								children: railSections.map((s) => {
									const isActive = selected ? selected.id === s.id : activeId === s.id;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										className: "snap-start",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => selectCategory(s.id),
											"aria-current": isActive ? "true" : void 0,
											className: `relative whitespace-nowrap rounded-full px-3.5 py-2 font-body text-[11px] uppercase tracking-[0.16em] transition-colors duration-300 ${isActive ? "text-brown" : "text-beige hover:text-brown"}`,
											children: [s.title, isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
												layoutId: "menu-nav-underline",
												transition: {
													type: "spring",
													stiffness: 380,
													damping: 32
												},
												className: "absolute inset-x-2.5 -bottom-0.5 h-[2px] rounded-full bg-gold"
											})]
										})
									}, s.id);
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-col gap-2.5 md:flex-row md:items-center md:justify-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "relative flex min-w-0 items-center md:w-72",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
										size: 14,
										className: "pointer-events-none absolute left-4 text-beige",
										"aria-hidden": "true"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "sr-only",
										children: "Search the menu"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: query,
										onChange: (e) => setQuery(e.target.value),
										placeholder: "Search cakes, croissants, coffee…",
										className: "w-full rounded-full border border-border bg-white/70 py-2.5 pl-10 pr-9 font-body text-xs tracking-wide text-brown placeholder:text-beige/80 focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20"
									}),
									query && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setQuery(""),
										"aria-label": "Clear search",
										className: "absolute right-3.5 text-beige transition-colors hover:text-brown",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 14 })
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "no-scrollbar -mx-1 flex snap-x gap-1.5 overflow-x-auto px-1 md:mx-0 md:flex-wrap md:justify-center md:overflow-visible md:px-0",
								children: PRICE_BANDS.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setBand(b.id),
									"aria-pressed": band === b.id,
									className: `snap-start whitespace-nowrap rounded-full border px-3.5 py-2 font-body text-[10px] uppercase tracking-[0.16em] transition-all duration-300 ${band === b.id ? "border-gold bg-gold/15 text-brown" : "border-border text-beige hover:border-gold/50 hover:text-brown"}`,
									children: b.label
								}, b.id))
							})]
						})
					]
				})
			}),
			!selected && !filtering && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-b border-border py-20 md:py-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-6 md:px-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "eyebrow mb-4 text-center",
							children: [
								railSections.length,
								" categories · ",
								railSections.reduce((n, s) => n + s.items.length, 0),
								" items"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-center font-display text-3xl leading-tight text-ivory md:text-5xl",
							children: "Browse the collection"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hairline mx-auto mt-6 w-24" })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
						children: railSections.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: Math.min(i % 3 * .08, .16),
							y: 26,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => selectCategory(s.id),
								className: "group relative block w-full overflow-hidden rounded-3xl border border-border text-left transition-all duration-500 will-change-transform hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-[0_40px_80px_-48px_rgba(92,59,34,0.6)]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: s.image,
										alt: `${s.title} at Circles Bakery, Sahiwal`,
										loading: "lazy",
										decoding: "async",
										width: 1024,
										height: 768,
										className: "aspect-[4/3] w-full object-cover transition-transform duration-[1.4s] ease-out will-change-transform group-hover:scale-[1.09]"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-scrim/85 via-scrim/25 to-transparent" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "absolute inset-x-0 bottom-0 p-6",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "font-body text-[10px] uppercase tracking-[0.24em] text-gold-soft",
												children: [s.items.length, " items"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "mt-2 font-display text-2xl text-cream md:text-3xl",
												children: s.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-3 inline-block h-px w-0 bg-gold transition-all duration-500 group-hover:w-16" })
										]
									})
								]
							})
						}) }, s.id))
					})]
				})
			}),
			resultCount === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-2xl px-6 py-28 text-center md:px-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl text-ivory",
						children: "Nothing matched that"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 font-body text-sm font-light text-beige",
						children: "Try another name, or widen the price range."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setQuery("");
							setBand("all");
						},
						className: "mt-8 rounded-full bg-gold px-8 py-3.5 font-body text-xs uppercase tracking-[0.2em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brown",
						children: "Reset filters"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [filtering && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mx-auto max-w-7xl px-6 pt-14 text-center font-body text-xs uppercase tracking-[0.22em] text-beige md:px-10",
				children: [
					resultCount,
					" item",
					resultCount > 1 ? "s" : "",
					" found"
				]
			}), visibleSections.map(({ section, items }, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: section.id,
				className: `scroll-mt-[190px] overflow-hidden border-b border-border px-6 py-20 md:px-10 md:py-28 ${i % 2 === 1 ? "bg-charcoal/60" : ""}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, { section }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductGrid, {
					section,
					items
				})]
			}, section.id))] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-7xl px-6 py-24 text-center md:px-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto max-w-xl font-body text-sm font-light leading-relaxed text-beige",
					children: "Planning a celebration or a large order? Reserve a table or reach our team and we will design something special for you."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					hash: "reservation",
					className: "mt-8 inline-block rounded-full bg-gold px-9 py-4 font-body text-xs uppercase tracking-[0.22em] text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-brown hover:shadow-lg",
					children: "Reserve a Table"
				})] })
			})
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
	] });
}
function NavPill({ label, active, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		"aria-pressed": active,
		className: `relative shrink-0 snap-start whitespace-nowrap rounded-full border px-5 py-2 font-body text-[11px] uppercase tracking-[0.2em] transition-all duration-300 ${active ? "border-gold bg-gold text-white shadow-[0_12px_30px_-16px_rgba(200,160,74,0.9)]" : "border-border bg-white/60 text-beige hover:-translate-y-0.5 hover:border-gold/55 hover:text-brown hover:shadow-[0_10px_26px_-18px_rgba(92,59,34,0.5)]"}`,
		children: label
	});
}
//#endregion
export { MenuPage as component };
