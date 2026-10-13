"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";

type NavItem = { href: string; label: string };

export function MobileMenu({ items, current }: { items: NavItem[]; current?: string }) {
  const [open, setOpen] = useState(false);
  // Next өмнөх хуудсуудыг DOM-д нууж хадгалдаг тул тогтмол id давхардана — useId-аар ялгана
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Цэс хаах" : "Цэс нээх"}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((o) => !o)}
        className="relative grid h-9 w-9 place-items-center border border-blood"
      >
        <span
          className={`absolute h-px w-4 bg-white transition-transform duration-300 ${
            open ? "rotate-45" : "-translate-y-1"
          }`}
        />
        <span
          className={`absolute h-px w-4 bg-white transition-transform duration-300 ${
            open ? "-rotate-45" : "translate-y-1"
          }`}
        />
      </button>

      <div
        id={menuId}
        className={`absolute inset-x-0 top-full grid border-b border-neutral-900 bg-black/95 backdrop-blur transition-[grid-template-rows,opacity] duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0"
        }`}
      >
        <nav className="overflow-hidden">
          <ul className="px-4 py-2 divide-y divide-neutral-900">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? undefined : -1}
                  className={`flex items-center justify-between py-4 font-mono text-xs uppercase tracking-widest transition-colors ${
                    current === item.href ? "text-white" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {item.label}
                  <span className="text-ember">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
