import type { Metadata } from "next";
import Link from "next/link";
import { ViewTransition } from "react";
import { Arrow, Frame, SectionLabel } from "@/components/Frame";
import { SiteFooter, SiteHeader } from "@/components/SiteShell";
import { lessons, upcoming } from "@/data/lessons";

export const metadata: Metadata = {
  title: "Хичээлүүд — Trade Хичээл",
  description: "Форекс арилжааг эхнээс нь алхам алхмаар судлах хичээлүүд.",
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function LessonsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader current="/hicheel" />

      <ViewTransition enter="page" exit="page" default="none">
        <main>
          <section className="relative overflow-hidden grid-bg">
            <div className="absolute -right-32 top-0 w-96 h-96 bg-blood opacity-20 blur-[120px] rounded-full animate-float" />
            <div className="relative mx-auto max-w-6xl px-4 md:px-8 py-16 md:py-24">
              <div className="flex items-center gap-2 text-ember font-mono text-sm mb-6 uppercase tracking-widest animate-fade-up">
                <span>&gt;</span> {lessons.length} хичээл бэлэн // {upcoming.length} удахгүй
              </div>
              <h1 className="text-4xl md:text-6xl font-black leading-[1.05] tracking-tight animate-fade-up [animation-delay:80ms]">
                Форекс <span className="text-blood">хичээлүүд</span>
              </h1>
              <p className="mt-6 text-neutral-400 text-lg leading-relaxed max-w-2xl animate-fade-up [animation-delay:160ms]">
                Зах зээлийн үндсэн ойлголтоос эхлээд арилжааны setup хүртэл — хичээл бүрийг дарааллаар нь үзээрэй.
              </p>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 md:px-8 py-16">
            <SectionLabel index="01">Бүх хичээл</SectionLabel>

            <div className="mt-10 grid gap-6">
              {lessons.map((lesson, i) => (
                <Link
                  key={lesson.slug}
                  href={`/hicheel/${lesson.slug}`}
                  className="group block animate-fade-up"
                  style={{ animationDelay: `${200 + i * 80}ms` }}
                >
                  <Frame className="transition-colors duration-300 group-hover:border-blood">
                    <div className="grid md:grid-cols-[auto_1fr_auto] gap-6 md:gap-10 p-6 md:p-10 items-center">
                      <div className="font-mono">
                        <div className="text-[10px] uppercase tracking-widest text-neutral-500">Хичээл</div>
                        <div className="text-6xl font-extrabold text-blood leading-none mt-1">{pad(lesson.number)}</div>
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold group-hover:text-ember transition-colors">
                          {lesson.title}
                        </h2>
                        <p className="mt-3 text-neutral-400 leading-relaxed">{lesson.summary}</p>
                        <ul className="mt-5 flex flex-wrap gap-2">
                          {lesson.sections.map((s) => (
                            <li
                              key={s.id}
                              className="font-mono text-[10px] uppercase tracking-widest text-neutral-300 border border-neutral-800 px-2 py-1"
                            >
                              {s.title}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <span className="justify-self-start md:justify-self-end inline-flex items-center gap-2 px-6 py-3 bg-blood group-hover:bg-blood-hover text-white text-sm font-bold rounded-xl transition-colors whitespace-nowrap">
                        Унших
                        <Arrow />
                      </span>
                    </div>
                  </Frame>
                </Link>
              ))}

              <div className="grid md:grid-cols-2 gap-6">
                {upcoming.map((u) => (
                  <div
                    key={u.number}
                    className="relative border border-dashed border-neutral-800 bg-[#050505] p-6 md:p-10 flex items-center gap-6 opacity-70"
                  >
                    <div className="font-mono">
                      <div className="text-[10px] uppercase tracking-widest text-neutral-600">Хичээл</div>
                      <div className="text-5xl font-extrabold text-neutral-700 leading-none mt-1">{pad(u.number)}</div>
                    </div>
                    <div>
                      {u.title && <h2 className="text-xl font-bold text-neutral-400">{u.title}</h2>}
                      <p
                        className={
                          u.title
                            ? "mt-1 font-mono text-[10px] uppercase tracking-widest text-neutral-600"
                            : "text-xl font-bold text-neutral-400"
                        }
                      >
                        Тун удахгүй
                      </p>
                    </div>
                    <svg
                      viewBox="0 0 24 24"
                      className="absolute top-5 right-5 w-5 h-5 text-neutral-700"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden
                    >
                      <rect x="5" y="11" width="14" height="10" rx="1" />
                      <path d="M8 11V7a4 4 0 018 0v4" />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </ViewTransition>

      <SiteFooter />
    </div>
  );
}
