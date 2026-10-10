import { o as __toESM, r as __exportAll } from "../_runtime.mjs";
import { t as supabase } from "./client-CgUy-Nbt.mjs";
import { t as __exportAll$1 } from "./rolldown-runtime-D7D4PA-g.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { R as redirect, _ as createRootRouteWithContext, b as useRouter, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { n as ScrollTrigger, r as gsapWithCSS } from "../_libs/gsap.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DcQUqYIl.js
var router_DcQUqYIl_exports = /* @__PURE__ */ __exportAll({
	getRouter: () => getRouter,
	n: () => Route$9,
	r: () => useAuth,
	t: () => router_exports
});
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-kzvFjzll.css";
var AuthContext = (0, import_react.createContext)(void 0);
function AuthProvider({ children }) {
	const [user, setUser] = (0, import_react.useState)(null);
	const [session, setSession] = (0, import_react.useState)(null);
	const [roles, setRoles] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const loadRoles = (0, import_react.useCallback)(async (uid) => {
		if (!uid) {
			setRoles([]);
			return;
		}
		const { data } = await supabase.from("user_roles").select("role").eq("user_id", uid);
		setRoles((data ?? []).map((r) => r.role));
	}, []);
	(0, import_react.useEffect)(() => {
		const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
			setSession(newSession);
			setUser(newSession?.user ?? null);
			setTimeout(() => {
				loadRoles(newSession?.user?.id);
			}, 0);
		});
		supabase.auth.getSession().then(({ data }) => {
			setSession(data.session);
			setUser(data.session?.user ?? null);
			loadRoles(data.session?.user?.id).finally(() => setLoading(false));
		});
		return () => sub.subscription.unsubscribe();
	}, [loadRoles]);
	const signOut = (0, import_react.useCallback)(async () => {
		await supabase.auth.signOut();
		setRoles([]);
	}, []);
	const value = {
		user,
		session,
		roles,
		loading,
		isAuthenticated: !!user,
		isStaff: roles.includes("staff") || roles.includes("admin"),
		isAdmin: roles.includes("admin"),
		signOut,
		refreshRoles: () => loadRoles(user?.id)
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value,
		children
	});
}
function useAuth() {
	const ctx = (0, import_react.useContext)(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within AuthProvider");
	return ctx;
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$13 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Circles Bakers · French Pâtisserie, Bakery & Café · Sahiwal" },
			{
				name: "description",
				content: "Circles Bakers — premium French pâtisserie, artisan boulangerie, café and fine dining in Sahiwal. Signature cakes, fresh pastries, live sandwiches & celebration cakes."
			},
			{
				name: "author",
				content: "Circles Bakers"
			},
			{
				property: "og:title",
				content: "Circles Bakers · Sahiwal"
			},
			{
				property: "og:description",
				content: "Where French craft meets modern luxury. Artisan bakery, pâtisserie, café and fine dining in Sahiwal, Pakistan."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			}
		]
	}),
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootComponent() {
	const { queryClient } = Route$13.useRouteContext();
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		const { data: sub } = supabase.auth.onAuthStateChange((event) => {
			if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
			router.invalidate();
			if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
		});
		return () => sub.subscription.unsubscribe();
	}, [router, queryClient]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				position: "top-center",
				theme: "dark",
				richColors: true
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		]
	});
}
var $$splitComponentImporter$11 = () => import("./routes-C9KlPoVu.mjs");
var Route$12 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Circles · Bakery, Pâtisserie & Café · Sahiwal" },
		{
			name: "description",
			content: "Circles — a premium modern bakery, French pâtisserie, café and family dining destination in Farid Town, Sahiwal. Freshly baked every day: cakes, pastries, cookies, bread, live sandwiches, coffee and fast food."
		},
		{
			property: "og:title",
			content: "Circles · Bakery, Pâtisserie & Café · Sahiwal"
		},
		{
			property: "og:description",
			content: "Freshly baked every day — custom cakes, artisan pastries, live sandwiches, premium coffee and family dining in Sahiwal, Pakistan."
		},
		{
			property: "og:type",
			content: "website"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./route-Di7iQBCH.mjs");
var Route$11 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		const { data, error } = await supabase.auth.getUser();
		if (error || !data.user) throw redirect({ to: "/auth" });
		return { user: data.user };
	},
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./auth-A8AM5eoU.mjs");
var Route$10 = createFileRoute("/auth")({
	head: () => ({ meta: [
		{ title: "Sign In · Circles Bakers · Sahiwal" },
		{
			name: "description",
			content: "Sign in or create an account with Circles Bakers to book tables, place cake and pastry orders, and earn loyalty rewards."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./menu-Bv_nUTM3.mjs");
gsapWithCSS.registerPlugin(ScrollTrigger);
var Route$9 = createFileRoute("/menu")({
	validateSearch: (search) => typeof search.c === "string" ? { c: search.c } : {},
	head: () => ({ meta: [
		{ title: "Menu & Prices · Circles Bakery, Pâtisserie & Café · Sahiwal" },
		{
			name: "description",
			content: "The full Circles menu with prices in PKR — signature cakes, three milk cakes, cheesecakes, croissants, éclairs, donuts, biscuits, artisan breads, panini, pizzas, burgers, pastas and coffee, freshly baked every day in Sahiwal."
		},
		{
			property: "og:title",
			content: "Menu & Prices · Circles Bakery · Sahiwal"
		},
		{
			property: "og:description",
			content: "Explore every Circles category with exact PKR pricing — cakes, pâtisserie, boulangerie, café and casual dining, handcrafted fresh daily in Sahiwal."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var BASE_URL = "";
var Route$8 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
	const xml = [
		`<?xml version="1.0" encoding="UTF-8"?>`,
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
		...[{
			path: "/",
			changefreq: "weekly",
			priority: "1.0"
		}].map((e) => [
			`  <url>`,
			`    <loc>${BASE_URL}${e.path}</loc>`,
			e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
			e.priority ? `    <priority>${e.priority}</priority>` : null,
			`  </url>`
		].filter(Boolean).join("\n")),
		`</urlset>`
	].join("\n");
	return new Response(xml, { headers: {
		"Content-Type": "application/xml",
		"Cache-Control": "public, max-age=3600"
	} });
} } } });
var $$splitComponentImporter$7 = () => import("./account-B9M0Bhxi.mjs");
var Route$7 = createFileRoute("/_authenticated/account")({
	head: () => ({ meta: [{ title: "My Account · Circles Bakers" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./route-CIk8GCv4.mjs");
var Route$6 = createFileRoute("/_authenticated/admin")({
	ssr: false,
	beforeLoad: async () => {
		const { data: userData } = await supabase.auth.getUser();
		const uid = userData.user?.id;
		if (!uid) throw redirect({ to: "/auth" });
		const { data: staff } = await supabase.rpc("is_staff", { _user_id: uid });
		if (!staff) throw redirect({ to: "/account" });
		return { staff: true };
	},
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./checkout-BdEkWJPc.mjs");
var Route$5 = createFileRoute("/_authenticated/checkout")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./admin-C7IPfyFu.mjs");
var Route$4 = createFileRoute("/_authenticated/admin/")({
	head: () => ({ meta: [{ title: "Dashboard · Circles CRM" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./customers-CO1P2gZw.mjs");
var Route$3 = createFileRoute("/_authenticated/admin/customers")({
	head: () => ({ meta: [{ title: "Customers · Circles CRM" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./orders-Bbi2EACA.mjs");
var Route$2 = createFileRoute("/_authenticated/admin/orders")({
	head: () => ({ meta: [{ title: "Orders · Circles CRM" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./products-CmZPpI-H.mjs");
var Route$1 = createFileRoute("/_authenticated/admin/products")({
	head: () => ({ meta: [{ title: "Products · Circles CRM" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./reservations-BCl6lYuP.mjs");
var Route = createFileRoute("/_authenticated/admin/reservations")({
	head: () => ({ meta: [{ title: "Reservations · Circles CRM" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$12.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$13
});
var AuthenticatedRouteRoute = Route$11.update({
	id: "/_authenticated",
	getParentRoute: () => Route$13
});
var AuthRoute = Route$10.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$13
});
var MenuRoute = Route$9.update({
	id: "/menu",
	path: "/menu",
	getParentRoute: () => Route$13
});
var SitemapDotxmlRoute = Route$8.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$13
});
var AuthenticatedAccountRoute = Route$7.update({
	id: "/account",
	path: "/account",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminRouteRoute = Route$6.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedCheckoutRoute = Route$5.update({
	id: "/checkout",
	path: "/checkout",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminIndexRoute = Route$4.update({
	id: "/",
	path: "/",
	getParentRoute: () => AuthenticatedAdminRouteRoute
});
var AuthenticatedAdminRouteRouteChildren = {
	AuthenticatedAdminCustomersRoute: Route$3.update({
		id: "/customers",
		path: "/customers",
		getParentRoute: () => AuthenticatedAdminRouteRoute
	}),
	AuthenticatedAdminOrdersRoute: Route$2.update({
		id: "/orders",
		path: "/orders",
		getParentRoute: () => AuthenticatedAdminRouteRoute
	}),
	AuthenticatedAdminProductsRoute: Route$1.update({
		id: "/products",
		path: "/products",
		getParentRoute: () => AuthenticatedAdminRouteRoute
	}),
	AuthenticatedAdminReservationsRoute: Route.update({
		id: "/reservations",
		path: "/reservations",
		getParentRoute: () => AuthenticatedAdminRouteRoute
	}),
	AuthenticatedAdminIndexRoute
};
var AuthenticatedRouteRouteChildren = {
	AuthenticatedAdminRouteRoute: AuthenticatedAdminRouteRoute._addFileChildren(AuthenticatedAdminRouteRouteChildren),
	AuthenticatedAccountRoute,
	AuthenticatedCheckoutRoute
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AuthRoute,
	MenuRoute,
	SitemapDotxmlRoute
};
var routeTree = Route$13._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll$1({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { router_DcQUqYIl_exports as n, useAuth as r, Route$9 as t };
