"use client";

import { useEffect, useRef, useState } from "react";

type TocItem = { id: string; title: string };

const pad = (n: number) => String(n).padStart(2, "0");

// Одоо уншиж буй хэсгийг тодруулна
function useActiveSection(items: TocItem[]) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    // Дэлгэцийн дээд хэсгийн нарийн зурвастай огтлолцож буй хэсэг идэвхтэй болно
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-25% 0px -70% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return active;
}

export function LessonToc({ items }: { items: TocItem[] }) {
  const active = useActiveSection(items);

  return (
    <nav aria-label="Энэ хичээлд" className="sticky top-24 border-l border-neutral-900">
      <div className="pl-4 pb-3 font-mono text-[10px] uppercase tracking-widest text-neutral-600">Энэ хичээлд</div>
      <ul>
        {items.map((s, i) => {
          const on = s.id === active;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={on ? "location" : undefined}
                className={`block -ml-px border-l pl-4 py-2 text-sm transition-colors duration-300 ${
                  on ? "border-blood text-white" : "border-transparent text-neutral-400 hover:border-blood hover:text-white"
                }`}
              >
                <span className="font-mono text-xs text-ember mr-2">{pad(i + 1)}</span>
                {s.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// Гар утсан дээр хэвтээ гүйдэг хэсгийн жагсаалт
export function LessonTocMobile({ items }: { items: TocItem[] }) {
  const active = useActiveSection(items);
  const navRef = useRef<HTMLElement>(null);

  // Идэвхтэй chip-ийг хэвтээ чиглэлд голлуулна (хуудсыг босоо гүйлгэхгүй)
  useEffect(() => {
    const nav = navRef.current;
    const chip = nav?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!nav || !chip) return;
    nav.scrollTo({ left: chip.offsetLeft - nav.clientWidth / 2 + chip.clientWidth / 2, behavior: "smooth" });
  }, [active]);

  return (
    <nav
      ref={navRef}
      aria-label="Энэ хичээлд"
      className="sticky top-16 z-40 -mx-4 overflow-x-auto border-b border-neutral-900 bg-black/80 px-4 py-3 backdrop-blur scrollbar-none md:-mx-8 md:px-8 lg:hidden"
    >
      <ul className="flex w-max gap-2">
        {items.map((s, i) => {
          const on = s.id === active;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                data-id={s.id}
                className={`block whitespace-nowrap border px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-colors ${
                  on ? "border-blood bg-[#1a0000] text-white" : "border-neutral-800 text-neutral-400"
                }`}
              >
                <span className="mr-1.5 text-ember">{pad(i + 1)}</span>
                {s.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
