/** Shared formatting + status helpers for the admin CRM. */

export const money = (n: number | null | undefined) =>
  `PKR ${Number(n ?? 0).toLocaleString("en-PK", { maximumFractionDigits: 0 })}`;

export const shortDate = (iso: string | null | undefined) =>
  iso
    ? new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    : "—";

export const dateTime = (iso: string | null | undefined) =>
  iso
    ? new Date(iso).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

type Tone = "neutral" | "positive" | "warning" | "danger" | "accent";

const TONES: Record<string, Tone> = {
  pending: "warning",
  processing: "warning",
  preparing: "warning",
  confirmed: "accent",
  ready: "accent",
  completed: "positive",
  succeeded: "positive",
  cancelled: "danger",
  failed: "danger",
  refunded: "danger",
};

const STYLES: Record<Tone, string> = {
  neutral: "bg-[var(--a-surface-2)] text-[var(--a-muted)]",
  positive: "bg-[var(--a-positive)]/12 text-[var(--a-positive)]",
  warning: "bg-[var(--a-warning)]/12 text-[var(--a-warning)]",
  danger: "bg-[var(--a-danger)]/12 text-[var(--a-danger)]",
  accent: "bg-[var(--a-accent-soft)] text-[var(--a-accent)]",
};

export function StatusBadge({ status }: { status: string | null | undefined }) {
  const key = (status ?? "").toLowerCase();
  const tone = TONES[key] ?? "neutral";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium capitalize ${STYLES[tone]}`}
    >
      {key || "—"}
    </span>
  );
}
