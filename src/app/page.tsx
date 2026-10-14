import Link from "next/link";
import { ViewTransition } from "react";
import { Checklist } from "@/components/Checklist";
import { Diagram } from "@/components/Diagrams";
import { Arrow, Frame, SectionLabel } from "@/components/Frame";
import { SiteFooter, SiteHeader } from "@/components/SiteShell";
import { lessons } from "@/data/lessons";
import { glossary, rules, steps } from "@/data/setup";

const tickerTerms = [
  "Higher High",
  "Higher Low",
  "BOS",
  "CHoCH",
  "Fair Value Gap",
  "Order Block",
  "Fibo 0.618",
  "Liquidity Sweep",
  "Limit Order",
  "Stoploss",
  "R:R 1:2",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />

      <ViewTransition enter="page" exit="page" default="none">
        <main>
          {/* Hero + Checklist */}
          <section id="checklist" className="relative overflow-hidden grid-bg scroll-mt-16">
            <div className="absolute -left-32 top-10 w-96 h-96 bg-blood opacity-20 blur-[120px] rounded-full animate-float" />
            <div className="relative mx-auto max-w-6xl px-4 md:px-8 py-16 md:py-28 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-2 text-ember font-mono text-sm mb-6 uppercase tracking-widest animate-fade-up">
                  <span>&gt;</span> Арилжааны өмнөх шалгалт
                </div>
                <h1 className="text-4xl md:text-6xl font-black leading-[1.05] tracking-tight animate-fade-up [animation-delay:80ms]">
                  Арилжааны <span className="text-blood">Setup</span> бүрдүүлэх
                </h1>
                <p className="mt-6 text-neutral-400 text-lg leading-relaxed max-w-xl animate-fade-up [animation-delay:160ms]">
                  Арилжаанд орох бүрдээ эдгээр 5 асуултад хариул. Бүгд
                  <span className="text-white font-semibold"> “Тийм” </span>
                  биш бол арилжаанд орохгүй. Сахилга бат бол ашигтай трейдерийн үндэс.
                </p>
                <div className="mt-8 flex flex-wrap gap-3 animate-fade-up [animation-delay:240ms]">
                  <a
                    href="#steps"
                    className="group inline-flex items-center gap-2 px-6 py-3 bg-blood hover:bg-blood-hover text-white text-sm font-bold rounded-xl transition-colors"
                  >
                    Алхмуудын тайлбар
                    <Arrow direction="down" />
                  </a>
                  <Link
                    href="/hicheel"
                    className="group inline-flex items-center gap-2 px-6 py-3 border border-neutral-800 hover:border-blood text-sm font-bold rounded-xl transition-colors"
                  >
                    Хичээлүүд үзэх
                    <Arrow />
                  </Link>
                </div>
                <div className="mt-12 grid grid-cols-3 gap-px bg-neutral-900 border border-neutral-900 max-w-md animate-fade-up [animation-delay:320ms]">
                  {[
                    ["05", "Алхам"],
                    ["1–2%", "Эрсдэл / арилжаа"],
                    ["1:2", "Доод R:R"],
                  ].map(([v, l]) => (
                    <div key={l} className="bg-black p-4">
                      <div className="font-mono text-xl font-extrabold">{v}</div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 mt-1">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="animate-fade-up [animation-delay:200ms]">
                <Checklist />
              </div>
            </div>
          </section>

          {/* Нэр томьёоны гүйдэг мөр */}
          <div aria-hidden className="marquee overflow-hidden border-y border-neutral-900 py-4">
            <div className="flex w-max animate-marquee">
              {[0, 1].map((copy) => (
                <ul key={copy} className="flex shrink-0 items-center">
                  {tickerTerms.map((t) => (
                    <li
                      key={t}
                      className="flex items-center whitespace-nowrap font-mono text-xs uppercase tracking-widest text-neutral-500"
                    >
                      <span className="px-6">{t}</span>
                      <span className="w-1.5 h-1.5 bg-blood" />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>

          {/* Steps */}
          <section id="steps" className="mx-auto max-w-6xl px-4 md:px-8 py-14 md:py-20 scroll-mt-16">
            <div className="reveal">
              <SectionLabel index="01">5 алхам</SectionLabel>
              <h2 className="mt-8 text-3xl md:text-4xl font-black tracking-tight max-w-2xl">
                Алхам бүрийн <span className="text-blood">тайлбар</span>
              </h2>
            </div>

            <div className="mt-10 md:mt-12 space-y-6 md:space-y-8">
              {steps.map((step, i) => (
                <article key={step.id} id={step.id} className="reveal scroll-mt-24">
                  <Frame className="transition-colors duration-300 hover:border-neutral-800">
                    <div className="grid lg:grid-cols-2">
                      <div className={`p-6 md:p-10 ${i % 2 ? "lg:order-2" : ""}`}>
                        <div className="flex items-baseline gap-4">
                          <span className="font-mono text-5xl font-extrabold text-blood">0{i + 1}</span>
                          <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
                            Алхам // {i + 1} / {steps.length}
                          </span>
                        </div>
                        <h3 className="mt-4 text-2xl md:text-3xl font-bold">{step.title}</h3>
                        <p className="mt-2 font-mono text-sm text-neutral-500">“{step.question}”</p>
                        <p className="mt-5 text-neutral-300 leading-relaxed">{step.summary}</p>

                        <ul className="mt-6 space-y-3">
                          {step.points.map((p) => (
                            <li key={p.text} className="flex gap-3 text-sm leading-relaxed">
                              <span className="shrink-0 mt-0.5 font-mono text-[10px] uppercase tracking-widest text-white bg-[#1a0000] border border-blood px-2 py-0.5 h-fit min-w-24 text-center">
                                {p.term}
                              </span>
                              <span className="text-neutral-400">{p.text}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-6 flex gap-3 border-l-2 border-blood bg-[#0a0000] p-4 text-sm">
                          <span className="font-mono text-ember font-bold">!</span>
                          <span className="text-neutral-300">{step.warning}</span>
                        </div>
                      </div>

                      <div
                        className={`relative flex items-center justify-center p-6 md:p-10 border-t lg:border-t-0 border-neutral-900 bg-black grid-bg ${
                          i % 2 ? "lg:order-1 lg:border-r" : "lg:border-l"
                        }`}
                      >
                        <span className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-widest text-neutral-600">
                          Жишээ график // {step.title}
                        </span>
                        <div className="w-full max-w-md mt-6">
                          <Diagram name={step.diagram} title={step.title} />
                        </div>
                      </div>
                    </div>
                  </Frame>
                </article>
              ))}
            </div>
          </section>

          {/* Glossary */}
          <section id="terms" className="mx-auto max-w-6xl px-4 md:px-8 py-14 md:py-20 scroll-mt-16">
            <div className="reveal">
              <SectionLabel index="02">Нэр томьёо</SectionLabel>
              <h2 className="mt-8 text-3xl md:text-4xl font-black tracking-tight">
                Мэдэх ёстой <span className="text-blood">ойлголтууд</span>
              </h2>
            </div>
            <div className="reveal mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-900 border border-neutral-900">
              {glossary.map((g) => (
                <div key={g.term} className="relative bg-black p-6 hover:bg-[#0a0000] transition-colors duration-300 group">
                  <span className="absolute left-0 top-0 h-full w-px bg-blood origin-top scale-y-0 transition-transform duration-300 group-hover:scale-y-100" />
                  <div className="font-mono text-xl font-extrabold group-hover:text-ember transition-colors">{g.term}</div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 mt-1">{g.full}</div>
                  <p className="mt-4 text-sm text-neutral-400 leading-relaxed">{g.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Rules */}
          <section id="rules" className="mx-auto max-w-6xl px-4 md:px-8 py-14 md:py-20 scroll-mt-16">
            <div className="reveal">
              <SectionLabel index="03">Эрсдэлийн удирдлага</SectionLabel>
            </div>
            <div className="reveal border border-blood bg-[#050000] p-6 md:p-16 relative overflow-hidden mt-8 shadow-[0_0_15px_rgba(135,0,0,0.15)]">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-blood opacity-10 blur-[100px] rounded-full animate-float" />
              <h2 className="relative text-3xl md:text-5xl font-black tracking-tight">
                Трейдерийн <span className="text-blood">дүрэм</span>
              </h2>
              <p className="relative mt-4 text-neutral-400 max-w-2xl">
                Хамгийн сайн setup ч алдагдалтай хаагдаж болно. Урт хугацаанд дансаа хамгаалдаг зүйл бол
                эрсдэлийн удирдлага.
              </p>
              <ol className="relative mt-10 grid md:grid-cols-2 gap-4">
                {rules.map((r, i) => (
                  <li
                    key={r}
                    className="flex gap-4 items-start border border-neutral-900 bg-black/60 p-5 transition-colors duration-300 hover:border-blood"
                  >
                    <span className="font-mono text-ember font-extrabold">0{i + 1}</span>
                    <span className="text-neutral-200">{r}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Эхлэгчдэд */}
          <section className="mx-auto max-w-6xl px-4 md:px-8 pb-20">
            <Link href={`/hicheel/${lessons[0].slug}`} className="reveal group block">
              <Frame className="transition-colors duration-300 group-hover:border-blood">
                <div className="grid-bg p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-2 text-ember font-mono text-sm uppercase tracking-widest">
                      <span>&gt;</span> Форекс арилжаанд шинэ үү?
                    </div>
                    <h2 className="mt-4 text-2xl md:text-4xl font-black tracking-tight">
                      Эхний <span className="text-blood">хичээлээс</span> эхэл
                    </h2>
                    <p className="mt-3 text-neutral-400 max-w-xl">
                      Валютын хос, Buy / Sell, Spread, Pip, Lot, Leverage — үндсэн ойлголтуудыг энгийн жишээгээр
                      алхам алхмаар үзээрэй.
                    </p>
                  </div>
                  <span className="shrink-0 inline-flex items-center gap-2 self-start md:self-auto px-6 py-3 bg-blood group-hover:bg-blood-hover text-white text-sm font-bold rounded-xl transition-colors">
                    1-р хичээл
                    <Arrow />
                  </span>
                </div>
              </Frame>
            </Link>
          </section>
        </main>
      </ViewTransition>

      <SiteFooter />
    </div>
  );
}
