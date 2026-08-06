import { useEffect, useState, type ReactNode } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useAuth } from "@/hooks/use-auth";
import {
  BarChart3,
  Croissant,
  Globe,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Search,
  ShoppingBag,
  Sun,
  Users,
  X,
} from "lucide-react";

export interface AdminNavItem {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
}

export const ADMIN_NAV: AdminNavItem[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { to: "/admin/products", label: "Products", icon: Croissant },
  { to: "/admin/customers", label: "Customers", icon: Users },
  { to: "/admin/reservations", label: "Reservations", icon: BarChart3 },

];

const THEME_KEY = "circles-admin-theme";

export function AdminShell({
  title,
  description,
  actions,
  children,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [dark, setDark] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(THEME_KEY);
    setDark(stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggleTheme = () => {
    setDark((d) => {
      localStorage.setItem(THEME_KEY, d ? "light" : "dark");
      return !d;
    });
  };

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/auth", replace: true });
  };

  const nav = (
    <nav className="flex flex-col gap-1 p-3">
      {ADMIN_NAV.map((item) => {
        const active = item.to === "/admin" ? pathname === "/admin" : pathname.startsWith(item.to);
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={() => setNavOpen(false)}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              active
                ? "bg-[var(--a-accent-soft)] text-[var(--a-text)]"
                : "text-[var(--a-muted)] hover:bg-[var(--a-surface-2)] hover:text-[var(--a-text)]"
            }`}
          >
            <item.icon size={16} className={active ? "text-[var(--a-accent)]" : ""} />
            {item.label}
          </Link>
        );
      })}
      <Link
        to="/"
        className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[var(--a-muted)] hover:bg-[var(--a-surface-2)] hover:text-[var(--a-text)]"
      >
        <Globe size={16} /> View website
      </Link>
    </nav>
  );

  return (
    <div className={`admin-root ${dark ? "dark" : ""} min-h-[100svh]`}>
      <div className="flex min-h-[100svh]">
        {/* desktop sidebar */}
        <aside className="hidden w-60 shrink-0 border-r border-[var(--a-border)] bg-[var(--a-surface)] lg:flex lg:flex-col">
          <div className="flex items-center gap-2 border-b border-[var(--a-border)] px-4 py-4">
            <Croissant size={18} className="text-[var(--a-accent)]" />
            <span className="text-sm font-semibold tracking-tight text-[var(--a-text)]">
              Circles CRM
            </span>
          </div>
          {nav}
          <div className="mt-auto border-t border-[var(--a-border)] p-3">
            <p className="truncate px-3 text-xs text-[var(--a-muted)]">{user?.email}</p>
            <button
              onClick={handleSignOut}
              className="mt-2 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--a-muted)] hover:bg-[var(--a-surface-2)] hover:text-[var(--a-text)]"
            >
              <LogOut size={15} /> Sign out
            </button>
          </div>
        </aside>

        {/* mobile drawer */}
        {navOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              aria-label="Close navigation"
              onClick={() => setNavOpen(false)}
              className="absolute inset-0 bg-black/40"
            />
            <div className="absolute left-0 top-0 h-full w-64 border-r border-[var(--a-border)] bg-[var(--a-surface)]">
              <div className="flex items-center justify-between border-b border-[var(--a-border)] px-4 py-4">
                <span className="text-sm font-semibold text-[var(--a-text)]">Circles CRM</span>
                <button onClick={() => setNavOpen(false)} aria-label="Close">
                  <X size={16} className="text-[var(--a-muted)]" />
                </button>
              </div>
              {nav}
            </div>
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col bg-[var(--a-bg)]">
          <header className="sticky top-0 z-40 flex items-center gap-3 border-b border-[var(--a-border)] bg-[var(--a-surface)]/85 px-4 py-3 backdrop-blur-md">
            <button
              onClick={() => setNavOpen(true)}
              aria-label="Open navigation"
              className="lg:hidden"
            >
              <Menu size={18} className="text-[var(--a-text)]" />
            </button>
            <button
              onClick={() => setPaletteOpen(true)}
              className="flex h-9 flex-1 items-center gap-2 rounded-lg border border-[var(--a-border)] bg-[var(--a-surface-2)] px-3 text-left text-xs text-[var(--a-muted)] sm:max-w-sm"
            >
              <Search size={14} /> Jump to…
              <kbd className="ml-auto hidden rounded border border-[var(--a-border)] px-1.5 py-0.5 text-[10px] sm:block">
                ⌘K
              </kbd>
            </button>
            <button
              onClick={toggleTheme}
              aria-label="Toggle colour mode"
              className="ml-auto rounded-lg border border-[var(--a-border)] p-2 text-[var(--a-muted)] hover:text-[var(--a-text)]"
            >
              {dark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </header>

          <main className="flex-1 p-4 sm:p-6">
            <div className="mx-auto w-full max-w-7xl">
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h1 className="text-2xl font-semibold tracking-tight text-[var(--a-text)]">
                    {title}
                  </h1>
                  {description && (
                    <p className="mt-1 text-sm text-[var(--a-muted)]">{description}</p>
                  )}
                </div>
                {actions}
              </div>
              {children}
            </div>
          </main>
        </div>
      </div>

      <CommandDialog open={paletteOpen} onOpenChange={setPaletteOpen}>
          <CommandInput placeholder="Search modules…" />
          <CommandList>
            <CommandEmpty>No results.</CommandEmpty>
            <CommandGroup heading="Navigate">
              {ADMIN_NAV.map((item) => (
                <CommandItem
                  key={item.to}
                  value={item.label}
                  onSelect={() => {
                    setPaletteOpen(false);
                    navigate({ to: item.to });
                  }}
                >
                  <item.icon size={15} className="mr-2" />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="Actions">
              <CommandItem
                value="View website"
                onSelect={() => {
                  setPaletteOpen(false);
                  navigate({ to: "/" });
                }}
              >
                <Globe size={15} className="mr-2" /> View website
              </CommandItem>
              <CommandItem value="Sign out" onSelect={handleSignOut}>
                <LogOut size={15} className="mr-2" /> Sign out
              </CommandItem>
            </CommandGroup>
          </CommandList>
      </CommandDialog>
    </div>
  );
}
