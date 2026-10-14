import Image from "next/image";
import { Fragment } from "react";
import type { Block, Rich } from "@/data/lessons";
import { MiniChart } from "./MiniCharts";
import { PriceBox } from "./PriceBox";

// 3 элементтэй бол 3 багана — 2 баганад хоосон саарал нүд үлдэхээс сэргийлнэ
const gridCols = (n: number) => (n === 3 ? "md:grid-cols-3" : "sm:grid-cols-2");

// "**тод**" хэсгийг <strong> болгоно
function RichText({ text }: { text: Rich }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith("**") ? (
          <strong key={i} className="text-white font-semibold">
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

export function LessonBlock({ block }: { block: Block }) {
  switch (block.kind) {
    case "text":
      return (
        <p className="text-neutral-300 leading-relaxed max-w-3xl">
          <RichText text={block.text} />
        </p>
      );

    case "timeline":
      return (
        <ol className="relative border-l border-neutral-800 ml-2 space-y-10">
          {block.items.map((item) => (
            <li key={item.period} className="relative pl-8 group">
              <span className="absolute -left-1.25 top-1.5 w-2.5 h-2.5 bg-blood transition-transform duration-300 group-hover:rotate-45" />
              <div className="font-mono text-xs uppercase tracking-widest text-ember">{item.period}</div>
              <h3 className="mt-1 text-xl font-bold">{item.title}</h3>
              <p className="mt-2 text-neutral-400 leading-relaxed max-w-3xl">
                <RichText text={item.text} />
              </p>
            </li>
          ))}
        </ol>
      );

    case "cards":
      return (
        <div className={`grid ${gridCols(block.items.length)} gap-px bg-neutral-900 border border-neutral-900`}>
          {block.items.map((item, i) => (
            <div key={item.title} className="bg-black p-6 hover:bg-[#0a0000] transition-colors duration-300 group">
              <span className="font-mono text-xs text-ember">0{i + 1}</span>
              <h3 className="mt-2 text-lg font-bold group-hover:text-ember transition-colors">{item.title}</h3>
              <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
                <RichText text={item.text} />
              </p>
            </div>
          ))}
        </div>
      );

    case "terms":
      return (
        <div className={`grid ${gridCols(block.items.length)} gap-px bg-neutral-900 border border-neutral-900`}>
          {block.items.map((item) => (
            <div key={item.term} className="bg-black p-6 hover:bg-[#0a0000] transition-colors duration-300 group">
              <div className="font-mono text-xl font-extrabold group-hover:text-ember transition-colors">{item.term}</div>
              {item.sub && (
                <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 mt-1">{item.sub}</div>
              )}
              <p className="mt-4 text-sm text-neutral-400 leading-relaxed">
                <RichText text={item.text} />
              </p>
              {item.chart && (
                <div className="mt-5 border border-neutral-900 bg-[#050505] grid-bg px-3 py-4">
                  <div className="mx-auto max-w-64">
                    <MiniChart name={item.chart} title={item.term} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      );

    case "compare":
      return (
        <div className={`grid gap-6 ${block.items.length === 3 ? "lg:grid-cols-3" : "md:grid-cols-2"}`}>
          {block.items.map((item) => (
            <div
              key={item.title}
              className="border border-neutral-900 bg-[#050505] p-6 md:p-8 transition-colors duration-300 hover:border-blood"
            >
              <div className="font-mono text-3xl font-extrabold text-blood">{item.title}</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 mt-1">{item.sub}</div>
              <ul className="mt-6 space-y-3">
                {item.points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm text-neutral-400 leading-relaxed">
                    <span className="shrink-0 mt-2 w-1.5 h-1.5 bg-blood" />
                    <span>
                      <RichText text={p} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );

    case "stats":
      return (
        <div className="grid grid-cols-3 gap-px bg-neutral-900 border border-neutral-900 max-w-xl">
          {block.items.map(([v, l]) => (
            <div key={l} className="bg-black p-4">
              <div className="font-mono text-xl md:text-2xl font-extrabold">{v}</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 mt-1">{l}</div>
            </div>
          ))}
        </div>
      );

    case "quote":
      return (
        <div className="flex gap-3 border-l-2 border-blood bg-[#0a0000] p-4 text-sm max-w-3xl">
          <span className="font-mono text-ember font-bold">!</span>
          <span className="text-neutral-300">
            <RichText text={block.text} />
          </span>
        </div>
      );

    case "pricebox":
      return <PriceBox />;

    case "flow":
      return (
        <figure className="max-w-3xl">
          <div className="flex flex-col sm:flex-row items-stretch">
            {block.items.map((item, i) => (
              <Fragment key={item.title}>
                {i > 0 && (
                  <div aria-hidden className="flex items-center justify-center h-10 sm:h-auto sm:w-16 shrink-0">
                    <svg viewBox="0 0 56 16" className="w-12 h-4 rotate-90 sm:rotate-0 text-blood">
                      <line
                        x1="2"
                        y1="8"
                        x2="44"
                        y2="8"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeDasharray="6 4"
                        className="animate-dash"
                      />
                      <path d="M44 3l8 5-8 5z" fill="currentColor" />
                    </svg>
                  </div>
                )}
                <div className="relative flex-1 border border-neutral-900 bg-[#050505] p-5 text-center transition-colors duration-300 hover:border-blood">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-ember">0{i + 1}</div>
                  <div className="mt-2 text-2xl font-black">{item.title}</div>
                  {item.sub && (
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-neutral-500">{item.sub}</div>
                  )}
                </div>
              </Fragment>
            ))}
          </div>
          {block.caption && (
            <figcaption className="mt-4 text-sm text-neutral-400">
              <RichText text={block.caption} />
            </figcaption>
          )}
        </figure>
      );

    case "list":
      return (
        <ul className="space-y-3 max-w-3xl">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-neutral-300 leading-relaxed">
              <span className="shrink-0 mt-2.5 w-1.5 h-1.5 bg-blood" />
              <span>
                <RichText text={item} />
              </span>
            </li>
          ))}
        </ul>
      );

    case "apps":
      return (
        <div className="grid md:grid-cols-2 gap-6">
          {block.items.map((app, i) => (
            <div
              key={app.name}
              className={`flex flex-col border bg-[#050505] p-6 md:p-8 transition-colors duration-300 ${
                app.recommended ? "border-blood shadow-[0_0_15px_rgba(135,0,0,0.15)]" : "border-neutral-900 hover:border-blood"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-xs text-ember">0{i + 1}</span>
                <div className="flex flex-wrap justify-end gap-2 font-mono text-[10px] uppercase tracking-widest">
                  {app.free && <span className="border border-green-700 px-2 py-0.5 text-green-500">Үнэгүй</span>}
                  {app.recommended && <span className="bg-blood px-2 py-0.5 text-white">Санал болгож байна</span>}
                </div>
              </div>
              <div className="mt-3 font-mono text-2xl md:text-3xl font-extrabold">{app.name}</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 mt-1">{app.tag}</div>
              <div className="mt-6 font-mono text-[10px] uppercase tracking-widest text-neutral-500">Хэрхэн ашиглах вэ</div>
              <ul className="mt-3 mb-6 space-y-2">
                {app.uses.map((u) => (
                  <li key={u} className="flex gap-3 text-sm text-neutral-300 leading-relaxed">
                    <span className="shrink-0 mt-2 w-1.5 h-1.5 bg-blood" />
                    <span>
                      <RichText text={u} />
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-auto inline-flex w-fit items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-neutral-400 hover:text-white border-b border-neutral-800 hover:border-blood pb-0.5 transition-colors"
              >
                {app.url.replace("https://www.", "")}
                <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
              </a>
            </div>
          ))}
        </div>
      );

    case "pair":
      // EUR / USD = 1.1900 — хос бүрийн хэсгийг доор нь тайлбарлана
      return (
        <figure className="max-w-3xl border border-neutral-900 bg-black grid-bg px-3 py-6 sm:p-6 md:p-10">
          <div className="flex items-start justify-center gap-2 sm:gap-3 md:gap-5 font-mono font-extrabold">
            <div className="text-center">
              <div className="text-[1.7rem] sm:text-4xl md:text-6xl text-white">{block.base}</div>
              <div className="mt-2 text-[10px] uppercase tracking-widest text-green-500">Base</div>
            </div>
            <div className="text-[1.7rem] sm:text-4xl md:text-6xl text-neutral-700">/</div>
            <div className="text-center">
              <div className="text-[1.7rem] sm:text-4xl md:text-6xl text-white">{block.quote}</div>
              <div className="mt-2 text-[10px] uppercase tracking-widest text-ember">Quote</div>
            </div>
            <div className="text-[1.7rem] sm:text-4xl md:text-6xl text-neutral-700">=</div>
            <div className="text-center">
              <div className="text-[1.7rem] sm:text-4xl md:text-6xl text-blood">{block.price}</div>
              <div className="mt-2 text-[10px] uppercase tracking-widest text-neutral-500">Ханш</div>
            </div>
          </div>
          {block.caption && (
            <figcaption className="mt-6 text-center text-sm text-neutral-400">
              <RichText text={block.caption} />
            </figcaption>
          )}
        </figure>
      );

    case "datatable":
      return (
        <figure className="max-w-3xl">
          <div className="overflow-x-auto border border-neutral-900">
            <table className="w-full border-collapse font-mono text-xs sm:text-sm">
              <thead>
                <tr>
                  {block.head.map((h, i) => (
                    <th
                      key={h}
                      className={`border-b border-neutral-900 bg-[#0a0a0a] px-2.5 sm:px-4 py-3 text-[9px] sm:text-[10px] uppercase tracking-wider sm:tracking-widest ${
                        i === 0 ? "text-left text-neutral-500" : "text-right text-ember"
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row) => (
                  <tr key={row[0]} className="border-t border-neutral-900 hover:bg-[#0a0000] transition-colors">
                    {row.map((cell, i) => (
                      <td
                        key={i}
                        className={`px-2.5 sm:px-4 py-3 whitespace-nowrap ${i === 0 ? "text-left font-bold text-white" : "text-right text-neutral-300"}`}
                      >
                        <RichText text={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption && <figcaption className="mt-3 text-xs text-neutral-500">{block.caption}</figcaption>}
        </figure>
      );

    case "heading":
      return (
        <h3 className="flex items-center gap-3 pt-4 text-xl md:text-2xl font-bold">
          <span className="w-2 h-2 shrink-0 bg-blood" />
          {block.text}
        </h3>
      );

    case "table":
      return (
        <>
          <table className="hidden md:table w-full border-collapse border border-neutral-900 text-sm">
            <thead>
              <tr className="font-mono text-xs uppercase tracking-widest">
                <th className="w-48 border border-neutral-900 bg-[#0a0a0a] p-4 text-left text-neutral-500">
                  {block.head[0]}
                </th>
                <th className="border border-neutral-900 bg-[#1a0000] p-4 text-left text-ember">{block.head[1]}</th>
                <th className="border border-neutral-900 bg-[#0a0a0a] p-4 text-left text-white">{block.head[2]}</th>
              </tr>
            </thead>
            <tbody>
              {block.rows.map(([label, a, b]) => (
                <tr key={label} className="align-top hover:bg-[#0a0000] transition-colors">
                  <th className="border border-neutral-900 p-4 text-left font-bold text-white">{label}</th>
                  <td className="border border-neutral-900 p-4 text-neutral-400 leading-relaxed">
                    <RichText text={a} />
                  </td>
                  <td className="border border-neutral-900 p-4 text-neutral-400 leading-relaxed">
                    <RichText text={b} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="md:hidden space-y-4">
            {block.rows.map(([label, a, b]) => (
              <div key={label} className="border border-neutral-900">
                <div className="bg-[#0a0a0a] px-4 py-3 font-bold">{label}</div>
                {[
                  [block.head[1], a, "text-ember"],
                  [block.head[2], b, "text-white"],
                ].map(([name, text, tone]) => (
                  <div key={name} className="border-t border-neutral-900 p-4 text-sm">
                    <div className={`font-mono text-[10px] uppercase tracking-widest ${tone}`}>{name}</div>
                    <p className="mt-1 text-neutral-400 leading-relaxed">
                      <RichText text={text} />
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      );

    case "logos":
      // Аппын дүрсийг утсан дээр харагддаг шиг булангууд нь бөөрөнхий хэлбэрээр
      return (
        <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-xl">
          {block.items.map((item) => {
            const [name, year] = item.label.split(" · ");
            return (
              <figure
                key={item.src}
                className="group flex flex-col items-center gap-4 border border-neutral-900 bg-[#050505] p-6 md:p-8 transition-colors duration-300 hover:border-blood"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  sizes="96px"
                  className="h-20 w-20 md:h-24 md:w-24 rounded-[22%] shadow-[0_10px_30px_-10px_rgba(0,120,255,0.5)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105"
                />
                <figcaption className="text-center">
                  <div className="font-bold">{name}</div>
                  {year && (
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-neutral-500">{year} он</div>
                  )}
                </figcaption>
              </figure>
            );
          })}
        </div>
      );

    case "image":
      return (
        <figure className="max-w-xl">
          <div className="border border-neutral-900 bg-[#050505] p-3">
            <Image
              src={block.src}
              alt={block.alt}
              width={block.width}
              height={block.height}
              sizes="(min-width: 640px) 576px, 100vw"
              className="w-full h-auto"
            />
          </div>
          {block.caption && (
            <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-widest text-neutral-500">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
  }
}
