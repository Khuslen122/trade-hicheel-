import { Checklist } from "@/components/Checklist";
import { Diagram } from "@/components/Diagrams";
import { Frame, SectionLabel } from "@/components/Frame";
import { glossary, rules, steps } from "@/data/setup";

const nav = [
  { href: "#checklist", label: "Checklist" },
  { href: "#steps", label: "Алхамууд" },
  { href: "#terms", label: "Нэр томьёо" },
  { href: "#rules", label: "Дүрэм" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-50 border-b border-neutral-900 bg-black/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 md:px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 font-mono font-extrabold tracking-wider">
            <span className="w-2 h-2 bg-blood rounded-full animate-pulse" />
            <span>
              TRADE<span className="text-blood">.</span>HICHEEL
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-neutral-400">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-white transition-colors">
                {n.label}
              </a>
            ))}
          </nav>
          <span className="hidden sm:flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-neutral-500 border border-neutral-900 px-3 py-1.5">
            Market: <span className="text-blood">Live</span>
          </span>
        </div>
      </header>

      <main>
        {/* Hero + Checklist */}
        <section id="checklist" className="relative overflow-hidden grid-bg scroll-mt-16">
          <div className="absolute -left-32 top-10 w-96 h-96 bg-blood opacity-20 blur-[120px] rounded-full" />
          <div className="relative mx-auto max-w-6xl px-4 md:px-8 py-16 md:py-28 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 text-blood font-mono text-sm mb-6 uppercase tracking-widest">
                <span>&gt;</span> Protocol: Setup_Check
              </div>
              <h1 className="text-4xl md:text-6xl font-black leading-[1.05] tracking-tight">
                Арилжааны <span className="text-blood">Setup</span> бүрдүүлэх
              </h1>
              <p className="mt-6 text-neutral-400 text-lg leading-relaxed max-w-xl">
                Арилжаанд орох бүрийн өмнө эдгээр 5 асуултад хариул. Бүгд
                <span className="text-white font-semibold"> “Тийм” </span>
                биш бол — орохгүй. Сахилга бат бол ашигтай трейдерийн үндэс.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#steps"
                  className="px-6 py-3 bg-blood hover:bg-blood-hover text-white text-sm font-bold rounded-xl transition-colors"
                >
                  Тайлбар унших
                </a>
                <a
                  href="#rules"
                  className="px-6 py-3 border border-neutral-800 hover:border-blood text-sm font-bold rounded-xl transition-colors"
                >
                  Эрсдэлийн дүрэм
                </a>
              </div>
              <div className="mt-12 grid grid-cols-3 gap-px bg-neutral-900 border border-neutral-900 max-w-md">
                {[
                  ["05", "Алхам"],
                  ["1–2%", "Эрсдэл"],
                  ["1:2", "Min R:R"],
                ].map(([v, l]) => (
                  <div key={l} className="bg-black p-4">
                    <div className="font-mono text-xl font-extrabold">{v}</div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 mt-1">{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <Checklist />
          </div>
        </section>

        {/* Steps */}
        <section id="steps" className="mx-auto max-w-6xl px-4 md:px-8 py-20 scroll-mt-16">
          <SectionLabel index="01">5 алхам</SectionLabel>
          <h2 className="mt-8 text-3xl md:text-4xl font-black tracking-tight max-w-2xl">
            Алхам бүрийн <span className="text-blood">тайлбар</span>
          </h2>

          <div className="mt-12 space-y-8">
            {steps.map((step, i) => (
              <Frame key={step.id}>
                <article id={step.id} className="grid lg:grid-cols-2 scroll-mt-24">
                  <div className={`p-6 md:p-10 ${i % 2 ? "lg:order-2" : ""}`}>
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-5xl font-extrabold text-blood">0{i + 1}</span>
                      <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
                        Step // {step.id}
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
                      <span className="font-mono text-blood font-bold">!</span>
                      <span className="text-neutral-300">{step.warning}</span>
                    </div>
                  </div>

                  <div
                    className={`relative flex items-center justify-center p-6 md:p-10 border-t lg:border-t-0 border-neutral-900 bg-black grid-bg ${
                      i % 2 ? "lg:order-1 lg:border-r" : "lg:border-l"
                    }`}
                  >
                    <span className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-widest text-neutral-600">
                      Chart // {step.title}
                    </span>
                    <div className="w-full max-w-md mt-6">
                      <Diagram name={step.diagram} title={step.title} />
                    </div>
                  </div>
                </article>
              </Frame>
            ))}
          </div>
        </section>

        {/* Glossary */}
        <section id="terms" className="mx-auto max-w-6xl px-4 md:px-8 py-20 scroll-mt-16">
          <SectionLabel index="02">Нэр томьёо</SectionLabel>
          <h2 className="mt-8 text-3xl md:text-4xl font-black tracking-tight">
            Мэдэх ёстой <span className="text-blood">ойлголтууд</span>
          </h2>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-900 border border-neutral-900">
            {glossary.map((g) => (
              <div key={g.term} className="bg-black p-6 hover:bg-[#0a0000] transition-colors group">
                <div className="font-mono text-xl font-extrabold group-hover:text-blood transition-colors">{g.term}</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 mt-1">{g.full}</div>
                <p className="mt-4 text-sm text-neutral-400 leading-relaxed">{g.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Rules */}
        <section id="rules" className="mx-auto max-w-6xl px-4 md:px-8 py-20 scroll-mt-16">
          <SectionLabel index="03">Эрсдэлийн удирдлага</SectionLabel>
          <div className="border border-blood bg-[#050000] p-8 md:p-16 relative overflow-hidden mt-8 shadow-[0_0_15px_rgba(135,0,0,0.15)]">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-blood opacity-10 blur-[100px] rounded-full" />
            <h2 className="relative text-3xl md:text-5xl font-black tracking-tight">
              Трейдерийн <span className="text-blood">дүрэм</span>
            </h2>
            <p className="relative mt-4 text-neutral-400 max-w-2xl">
              Хамгийн сайн setup ч алдагдалтай хаагдаж болно. Урт хугацаанд дансаа хамгаалдаг зүйл бол
              эрсдэлийн удирдлага.
            </p>
            <ol className="relative mt-10 grid md:grid-cols-2 gap-4">
              {rules.map((r, i) => (
                <li key={r} className="flex gap-4 items-start border border-neutral-900 bg-black/60 p-5">
                  <span className="font-mono text-blood font-extrabold">0{i + 1}</span>
                  <span className="text-neutral-200">{r}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-900">
        <div className="mx-auto max-w-6xl px-4 md:px-8 py-8 flex flex-col md:flex-row gap-4 justify-between font-mono text-xs uppercase tracking-widest text-neutral-600">
          <span>
            TRADE<span className="text-blood">.</span>HICHEEL // Сургалтын материал
          </span>
          <span>Санхүүгийн зөвлөгөө биш. Арилжаа эрсдэлтэй.</span>
        </div>
      </footer>
    </div>
  );
}
