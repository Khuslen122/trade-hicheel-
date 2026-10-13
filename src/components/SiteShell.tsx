import Link from "next/link";
import { MobileMenu } from "./MobileMenu";

const nav = [
  { href: "/#checklist", label: "Checklist" },
  { href: "/#steps", label: "Алхмууд" },
  { href: "/hicheel", label: "Хичээлүүд" },
  { href: "/#terms", label: "Нэр томьёо" },
  { href: "/#rules", label: "Дүрэм" },
];

function Brand() {
  return (
    <Link href="/" className="flex items-center gap-2 font-mono font-extrabold tracking-wider">
      <span className="w-2 h-2 bg-blood rounded-full animate-pulse" />
      <span>
        Форекс гэж юу вэ<span className="text-ember">?</span>
      </span>
    </Link>
  );
}

// `current` — идэвхтэй цэсийг тодруулна (жишээ нь "/hicheel")
export function SiteHeader({ current }: { current?: string }) {
  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      className="sticky top-0 z-50 border-b border-neutral-900 bg-black/80 backdrop-blur"
    >
      <div className="relative mx-auto max-w-6xl px-4 md:px-8 h-16 flex items-center justify-between gap-4">
        <Brand />
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-neutral-400">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={current === n.href ? "page" : undefined}
              className={`relative py-1 transition-colors hover:text-white after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-blood after:origin-left after:transition-transform after:duration-300 ${
                current === n.href ? "text-white after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <MobileMenu items={nav} current={current} />
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-900">
      <div className="mx-auto max-w-6xl px-4 md:px-8 py-8 flex flex-col md:flex-row gap-4 justify-between font-mono text-xs uppercase tracking-widest text-neutral-600">
        <span>
          TRADE<span className="text-ember">.</span>HICHEEL // Сургалтын материал
        </span>
        <span>Санхүүгийн зөвлөгөө биш. Арилжаа эрсдэлтэй.</span>
      </div>
    </footer>
  );
}
