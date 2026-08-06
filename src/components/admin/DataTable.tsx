import { useMemo, useState, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  Columns3,
  Download,
  Search,
} from "lucide-react";

export interface Column<T> {
  /** Unique key. */
  key: string;
  header: string;
  /** Cell renderer. Falls back to `value`. */
  render?: (row: T) => ReactNode;
  /** Raw value used for search, sorting and CSV export. */
  value?: (row: T) => string | number | null | undefined;
  sortable?: boolean;
  /** Hide on small screens to keep tables readable. */
  hideOnMobile?: boolean;
  className?: string;
}

export interface BulkAction<T> {
  label: string;
  destructive?: boolean;
  run: (rows: T[]) => Promise<void> | void;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  onRowClick?: (row: T) => void;
  bulkActions?: BulkAction<T>[];
  /** File name (without extension) for CSV export. */
  exportName?: string;
  /** Extra filter controls rendered in the toolbar. */
  toolbar?: ReactNode;
  emptyLabel?: string;
  pageSize?: number;
}

const raw = <T,>(col: Column<T>, row: T) => {
  const v = col.value?.(row);
  return v === null || v === undefined ? "" : String(v);
};

/**
 * Reusable admin data table: search, sorting, pagination, bulk actions,
 * CSV export, column visibility and a responsive layout.
 */
export function DataTable<T extends { id: string }>({
  data,
  columns,
  loading,
  onRowClick,
  bulkActions = [],
  exportName = "export",
  toolbar,
  emptyLabel = "No records found.",
  pageSize = 12,
}: DataTableProps<T>) {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<{ key: string; dir: "asc" | "desc" } | null>(null);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [hidden, setHidden] = useState<Set<string>>(new Set());
  const [colsOpen, setColsOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  const visible = columns.filter((c) => !hidden.has(c.key));

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return data;
    return data.filter((row) =>
      columns.some((c) => raw(c, row).toLowerCase().includes(needle)),
    );
  }, [data, columns, q]);

  const sorted = useMemo(() => {
    if (!sort) return filtered;
    const col = columns.find((c) => c.key === sort.key);
    if (!col) return filtered;
    return [...filtered].sort((a, b) => {
      const av = col.value?.(a) ?? "";
      const bv = col.value?.(b) ?? "";
      const cmp =
        typeof av === "number" && typeof bv === "number"
          ? av - bv
          : String(av).localeCompare(String(bv), undefined, { numeric: true });
      return sort.dir === "asc" ? cmp : -cmp;
    });
  }, [filtered, sort, columns]);

  const pages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const current = Math.min(page, pages - 1);
  const rows = sorted.slice(current * pageSize, current * pageSize + pageSize);

  const toggleSort = (key: string) =>
    setSort((s) =>
      s?.key === key ? (s.dir === "asc" ? { key, dir: "desc" } : null) : { key, dir: "asc" },
    );

  const exportCsv = () => {
    const head = visible.map((c) => c.header);
    const body = sorted.map((row) =>
      visible.map((c) => `"${raw(c, row).replace(/"/g, '""')}"`).join(","),
    );
    const csv = [head.join(","), ...body].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `${exportName}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const selectedRows = sorted.filter((r) => selected.has(r.id));
  const allOnPage = rows.length > 0 && rows.every((r) => selected.has(r.id));

  const runBulk = async (action: BulkAction<T>) => {
    setBusy(true);
    try {
      await action.run(selectedRows);
      setSelected(new Set());
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-xl border border-[var(--a-border)] bg-[var(--a-surface)] shadow-[0_1px_2px_rgba(16,20,24,0.05)]">
      <div className="flex flex-col gap-3 border-b border-[var(--a-border)] p-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-2">
          <div className="relative min-w-[180px] flex-1 sm:max-w-xs">
            <Search
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--a-muted)]"
            />
            <input
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(0);
              }}
              placeholder="Search…"
              aria-label="Search records"
              className="h-9 w-full rounded-lg border border-[var(--a-border)] bg-[var(--a-surface-2)] pl-9 pr-3 text-sm text-[var(--a-text)] outline-none placeholder:text-[var(--a-muted)] focus:border-[var(--a-accent)]"
            />
          </div>
          {toolbar}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setColsOpen((o) => !o)}
              className="flex h-9 items-center gap-2 rounded-lg border border-[var(--a-border)] px-3 text-xs font-medium text-[var(--a-text)] hover:bg-[var(--a-surface-2)]"
            >
              <Columns3 size={14} /> Columns
            </button>
            {colsOpen && (
              <div className="absolute right-0 z-30 mt-1 w-48 rounded-lg border border-[var(--a-border)] bg-[var(--a-surface)] p-2 shadow-lg">
                {columns.map((c) => (
                  <label
                    key={c.key}
                    className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-xs text-[var(--a-text)] hover:bg-[var(--a-surface-2)]"
                  >
                    <input
                      type="checkbox"
                      checked={!hidden.has(c.key)}
                      onChange={() =>
                        setHidden((h) => {
                          const n = new Set(h);
                          n.has(c.key) ? n.delete(c.key) : n.add(c.key);
                          return n;
                        })
                      }
                    />
                    {c.header}
                  </label>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={exportCsv}
            className="flex h-9 items-center gap-2 rounded-lg border border-[var(--a-border)] px-3 text-xs font-medium text-[var(--a-text)] hover:bg-[var(--a-surface-2)]"
          >
            <Download size={14} /> CSV
          </button>
        </div>
      </div>

      {selected.size > 0 && bulkActions.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 border-b border-[var(--a-border)] bg-[var(--a-surface-2)] px-3 py-2 text-xs">
          <span className="text-[var(--a-muted)]">{selected.size} selected</span>
          {bulkActions.map((a) => (
            <button
              key={a.label}
              disabled={busy}
              onClick={() => runBulk(a)}
              className={`rounded-md px-2.5 py-1 font-medium disabled:opacity-50 ${
                a.destructive
                  ? "bg-[var(--a-danger)] text-white"
                  : "bg-[var(--a-accent)] text-[var(--a-accent-fg)]"
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--a-border)] text-[11px] uppercase tracking-wider text-[var(--a-muted)]">
              {bulkActions.length > 0 && (
                <th className="w-9 px-3 py-2.5">
                  <input
                    type="checkbox"
                    aria-label="Select all on page"
                    checked={allOnPage}
                    onChange={() =>
                      setSelected((s) => {
                        const n = new Set(s);
                        rows.forEach((r) => (allOnPage ? n.delete(r.id) : n.add(r.id)));
                        return n;
                      })
                    }
                  />
                </th>
              )}
              {visible.map((c) => (
                <th
                  key={c.key}
                  className={`px-3 py-2.5 font-medium ${c.hideOnMobile ? "hidden md:table-cell" : ""} ${c.className ?? ""}`}
                >
                  {c.sortable ? (
                    <button
                      onClick={() => toggleSort(c.key)}
                      className="flex items-center gap-1 hover:text-[var(--a-text)]"
                    >
                      {c.header}
                      {sort?.key === c.key &&
                        (sort.dir === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                    </button>
                  ) : (
                    c.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading &&
              Array.from({ length: 6 }).map((_, i) => (
                <tr key={`s${i}`} className="border-b border-[var(--a-border)]">
                  <td colSpan={visible.length + 1} className="px-3 py-3">
                    <div className="h-4 w-full animate-pulse rounded bg-[var(--a-surface-2)]" />
                  </td>
                </tr>
              ))}
            {!loading && rows.length === 0 && (
              <tr>
                <td
                  colSpan={visible.length + 1}
                  className="px-3 py-10 text-center text-sm text-[var(--a-muted)]"
                >
                  {emptyLabel}
                </td>
              </tr>
            )}
            {!loading &&
              rows.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => onRowClick?.(row)}
                  className={`border-b border-[var(--a-border)] transition-colors last:border-0 ${
                    onRowClick ? "cursor-pointer hover:bg-[var(--a-surface-2)]" : ""
                  }`}
                >
                  {bulkActions.length > 0 && (
                    <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        aria-label="Select row"
                        checked={selected.has(row.id)}
                        onChange={() =>
                          setSelected((s) => {
                            const n = new Set(s);
                            n.has(row.id) ? n.delete(row.id) : n.add(row.id);
                            return n;
                          })
                        }
                      />
                    </td>
                  )}
                  {visible.map((c) => (
                    <td
                      key={c.key}
                      className={`px-3 py-3 align-middle text-[var(--a-text)] ${c.hideOnMobile ? "hidden md:table-cell" : ""} ${c.className ?? ""}`}
                    >
                      {c.render ? c.render(row) : raw(c, row)}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-[var(--a-border)] px-3 py-2.5 text-xs text-[var(--a-muted)]">
        <span>
          {sorted.length} record{sorted.length === 1 ? "" : "s"}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage(Math.max(0, current - 1))}
            disabled={current === 0}
            aria-label="Previous page"
            className="rounded-md border border-[var(--a-border)] p-1 disabled:opacity-40"
          >
            <ChevronLeft size={14} />
          </button>
          <span>
            {current + 1} / {pages}
          </span>
          <button
            onClick={() => setPage(Math.min(pages - 1, current + 1))}
            disabled={current >= pages - 1}
            aria-label="Next page"
            className="rounded-md border border-[var(--a-border)] p-1 disabled:opacity-40"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
