import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense, ViewTransition } from "react";
import { Frame } from "@/components/Frame";
import { LessonBlock } from "@/components/LessonBlocks";
import { LessonToc, LessonTocMobile } from "@/components/LessonToc";
import { SiteFooter, SiteHeader } from "@/components/SiteShell";
import { getLesson, lessons, upcoming } from "@/data/lessons";

export function generateStaticParams() {
  return lessons.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: PageProps<"/hicheel/[slug]">): Promise<Metadata> {
  const lesson = getLesson((await params).slug);
  if (!lesson) return {};
  return {
    title: `Хичээл ${lesson.number}: ${lesson.title} — Trade Хичээл`,
    description: lesson.summary,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

// params-ийг Suspense дотор уншина — header/footer бүх хичээлд нийтлэг App Shell-д үлдэнэ
export default function LessonPage({ params }: PageProps<"/hicheel/[slug]">) {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader current="/hicheel" />
      {/* Уншиж буй явцын шугам */}
      <div aria-hidden className="read-progress fixed inset-x-0 top-16 z-60 h-0.5 bg-blood" />

      <ViewTransition enter="page" exit="page" default="none">
        <main>
          <Suspense fallback={<LessonSkeleton />}>
            <LessonContent params={params} />
          </Suspense>
        </main>
      </ViewTransition>

      <SiteFooter />
    </div>
  );
}

function LessonSkeleton() {
  return (
    <section className="relative overflow-hidden grid-bg">
      <div className="relative mx-auto max-w-6xl px-4 md:px-8 py-14 md:py-20 animate-pulse">
        <div className="h-3 w-24 bg-neutral-900" />
        <div className="mt-8 h-4 w-32 bg-neutral-900" />
        <div className="mt-4 h-12 md:h-16 w-3/4 max-w-xl bg-neutral-900" />
        <div className="mt-6 h-4 w-full max-w-2xl bg-neutral-900" />
        <div className="mt-2 h-4 w-2/3 max-w-xl bg-neutral-900" />
        <div className="mt-10 h-44 max-w-2xl border border-neutral-900 bg-[#050505]" />
      </div>
    </section>
  );
}

function CourseOutline({ current }: { current: number }) {
  return (
    <ol className="space-y-2">
      {lessons.map((l) => {
        const isCurrent = l.number === current;
        return (
          <li key={l.slug} className="flex items-baseline gap-4">
            <span className={`font-mono font-extrabold ${isCurrent ? "text-ember" : "text-neutral-700"}`}>
              {l.number}.
            </span>
            <span className={`flex-1 ${isCurrent ? "text-white font-semibold" : "text-neutral-500"}`}>{l.title}</span>
            {isCurrent ? (
              <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-ember">Энэ хичээл</span>
            ) : (
              <Link
                href={`/hicheel/${l.slug}`}
                className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-neutral-400 hover:text-white border-b border-neutral-700 hover:border-blood transition-colors"
              >
                Үзэх →
              </Link>
            )}
          </li>
        );
      })}
      {upcoming.map((u) => (
        <li key={u.number} className="flex items-baseline gap-4">
          <span className="font-mono font-extrabold text-neutral-800">{u.number}.</span>
          <span className="flex-1 text-neutral-700">{u.title ?? "Тун удахгүй"}</span>
          {u.title && (
            <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-neutral-700">Тун удахгүй</span>
          )}
        </li>
      ))}
    </ol>
  );
}

async function LessonContent({ params }: Pick<PageProps<"/hicheel/[slug]">, "params">) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();

  const index = lessons.indexOf(lesson);
  const prev = lessons[index - 1];
  const next = lessons[index + 1];
  const toc = lesson.sections.map(({ id, title }) => ({ id, title }));

  return (
    <>
      <section className="relative overflow-hidden grid-bg">
        <div className="absolute -left-32 top-10 w-96 h-96 bg-blood opacity-20 blur-[120px] rounded-full animate-float" />
        <div className="relative mx-auto max-w-6xl px-4 md:px-8 py-14 md:py-20">
          <Link
            href="/hicheel"
            className="group font-mono text-xs uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
          >
            <span className="inline-block transition-transform group-hover:-translate-x-1">←</span> Бүх хичээл
          </Link>
          <div className="mt-8 flex items-center gap-2 text-ember font-mono text-sm uppercase tracking-widest animate-fade-up">
            <span>&gt;</span> Хичээл // {pad(lesson.number)}
          </div>
          <h1 className="mt-4 text-4xl md:text-6xl font-black leading-[1.05] tracking-tight animate-fade-up [animation-delay:80ms]">
            {lesson.title}
          </h1>
          <p className="mt-6 text-neutral-400 text-lg leading-relaxed max-w-2xl animate-fade-up [animation-delay:160ms]">
            {lesson.summary}
          </p>

          {/* Гар утсан дээр агуулга урт тул эвхэгддэг, том дэлгэц дээр үргэлж нээлттэй */}
          <details className="group md:hidden mt-8 border border-neutral-900 bg-[#050505] animate-fade-up [animation-delay:240ms]">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 font-mono text-[10px] uppercase tracking-widest text-neutral-400 [&::-webkit-details-marker]:hidden">
              <span>
                Сургалтын агуулга{" "}
                <span className="text-ember">{`// ${lesson.number}/${lessons.length + upcoming.length}`}</span>
              </span>
              <span aria-hidden className="text-ember transition-transform duration-300 group-open:rotate-180">
                ▾
              </span>
            </summary>
            <div className="border-t border-neutral-900 p-4">
              <CourseOutline current={lesson.number} />
            </div>
          </details>
          <Frame className="hidden md:block mt-10 max-w-2xl animate-fade-up [animation-delay:240ms]">
            <div className="p-6">
              <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">Сургалтын агуулга</div>
              <div className="mt-4">
                <CourseOutline current={lesson.number} />
              </div>
            </div>
          </Frame>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 md:px-8 py-16 grid lg:grid-cols-[220px_1fr] gap-12">
        <aside className="hidden lg:block">
          <LessonToc items={toc} />
        </aside>

        <div className="min-w-0">
          <LessonTocMobile items={toc} />

          <div className="mt-10 lg:mt-0 space-y-16 md:space-y-20">
            {lesson.sections.map((section, i) => (
              <section key={section.id} id={section.id} className="scroll-mt-32 lg:scroll-mt-24">
                <div className="reveal">
                  <div className="flex items-center gap-4 text-ember font-mono text-sm uppercase tracking-widest border-b border-neutral-900 pb-4">
                    <span>Хэсэг // {pad(i + 1)}</span>
                    <span className="h-px flex-1 bg-neutral-900" />
                  </div>
                  <h2 className="mt-6 text-2xl md:text-4xl font-black tracking-tight">{section.title}</h2>
                </div>
                <div className="mt-8 space-y-8">
                  {section.blocks.map((block, j) => (
                    <div key={j} className="reveal">
                      <LessonBlock block={block} />
                    </div>
                  ))}
                </div>
              </section>
            ))}

            <nav aria-label="Хичээл хооронд шилжих" className="grid sm:grid-cols-2 gap-4 pt-8 border-t border-neutral-900">
              {prev ? (
                <Link
                  href={`/hicheel/${prev.slug}`}
                  className="group border border-neutral-900 hover:border-blood p-5 transition-colors"
                >
                  <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">← Өмнөх хичээл</div>
                  <div className="mt-1 font-bold group-hover:text-ember transition-colors">{prev.title}</div>
                </Link>
              ) : (
                <Link href="/hicheel" className="group border border-neutral-900 hover:border-blood p-5 transition-colors">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">← Буцах</div>
                  <div className="mt-1 font-bold group-hover:text-ember transition-colors">Бүх хичээл</div>
                </Link>
              )}
              {next ? (
                <Link
                  href={`/hicheel/${next.slug}`}
                  className="group border border-neutral-900 hover:border-blood p-5 text-right transition-colors"
                >
                  <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">Дараагийн хичээл →</div>
                  <div className="mt-1 font-bold group-hover:text-ember transition-colors">{next.title}</div>
                </Link>
              ) : (
                <div className="border border-dashed border-neutral-900 p-5 text-right">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-600">Дараагийн хичээл</div>
                  <div className="mt-1 font-bold text-neutral-500">Хичээл {lesson.number + 1} — тун удахгүй</div>
                </div>
              )}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
