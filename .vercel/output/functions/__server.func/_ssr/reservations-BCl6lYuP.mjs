import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CgUy-Nbt.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as shortDate, n as StatusBadge, t as AdminShell } from "./format-CsDi8mZN.mjs";
import { t as DataTable } from "./DataTable-CJvw5IIP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reservations-BCl6lYuP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATUSES = [
	"pending",
	"confirmed",
	"cancelled",
	"completed"
];
function ReservationsPage() {
	const qc = useQueryClient();
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("all");
	const { data, isLoading } = useQuery({
		queryKey: ["admin", "reservations"],
		queryFn: async () => {
			const { data, error } = await supabase.from("reservations").select("*").order("reservation_date", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	const setStatus = async (ids, status) => {
		const { error } = await supabase.from("reservations").update({ status }).in("id", ids);
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success(`Marked ${ids.length} booking${ids.length === 1 ? "" : "s"} ${status}`);
		qc.invalidateQueries({ queryKey: ["admin"] });
	};
	const rows = (data ?? []).filter((r) => statusFilter === "all" || r.status === statusFilter);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminShell, {
		title: "Reservations",
		description: "Table bookings requested from the website.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
			data: rows,
			columns: [
				{
					key: "full_name",
					header: "Guest",
					sortable: true,
					value: (r) => r.full_name
				},
				{
					key: "phone",
					header: "Phone",
					value: (r) => r.phone
				},
				{
					key: "reservation_date",
					header: "Date",
					sortable: true,
					value: (r) => r.reservation_date,
					render: (r) => `${shortDate(r.reservation_date)} · ${r.reservation_time.slice(0, 5)}`
				},
				{
					key: "party_size",
					header: "Guests",
					sortable: true,
					value: (r) => r.party_size
				},
				{
					key: "occasion",
					header: "Occasion",
					value: (r) => r.occasion ?? "",
					hideOnMobile: true
				},
				{
					key: "special_requests",
					header: "Requests",
					value: (r) => r.special_requests ?? "",
					hideOnMobile: true
				},
				{
					key: "status",
					header: "Status",
					sortable: true,
					value: (r) => r.status,
					render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: r.status })
				}
			],
			loading: isLoading,
			exportName: "circles-reservations",
			emptyLabel: "No reservations match these filters.",
			bulkActions: [
				{
					label: "Confirm",
					run: (rs) => setStatus(rs.map((r) => r.id), "confirmed")
				},
				{
					label: "Complete",
					run: (rs) => setStatus(rs.map((r) => r.id), "completed")
				},
				{
					label: "Cancel",
					destructive: true,
					run: (rs) => setStatus(rs.map((r) => r.id), "cancelled")
				}
			],
			toolbar: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				value: statusFilter,
				onChange: (e) => setStatusFilter(e.target.value),
				"aria-label": "Filter by status",
				className: "h-9 rounded-lg border border-[var(--a-border)] bg-[var(--a-surface-2)] px-2 text-sm text-[var(--a-text)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "all",
					children: "All statuses"
				}), STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: s,
					children: s
				}, s))]
			})
		})
	});
}
//#endregion
export { ReservationsPage as component };
