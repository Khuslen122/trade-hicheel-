"use client";

import { useState } from "react";

type Side = "sell" | "buy";

const sides = {
  sell: {
    label: "SELL",
    big: "35",
    small: "6",
    bg: "bg-blood hover:bg-blood-hover",
    ring: "ring-red-400",
  },
  buy: {
    label: "BUY",
    big: "38",
    small: "4",
    bg: "bg-green-700 hover:bg-green-600",
    ring: "ring-green-300",
  },
} as const;

// MetaTrader-ийн Sell/Buy хайрцгийг дуурайлгасан жишээ — дарахад тохирох үнэ тодорно
export function PriceBox() {
  const [side, setSide] = useState<Side | null>(null);

  return (
    <div className="grid lg:grid-cols-[auto_1fr] gap-6 items-center border border-neutral-900 bg-black grid-bg p-6">
      <div className="w-full max-w-xs font-mono">
        <div className="grid grid-cols-2 gap-px border border-neutral-800 bg-neutral-800">
          {(Object.keys(sides) as Side[]).map((s) => {
            const d = sides[s];
            const on = side === s;
            return (
              <button
                key={s}
                type="button"
                aria-pressed={on}
                onClick={() => setSide(s)}
                className={`relative overflow-hidden p-3 text-white transition-all duration-200 active:scale-95 cursor-pointer ${d.bg} ${
                  s === "buy" ? "text-right" : "text-left"
                } ${on ? `z-10 ring-2 ${d.ring} shadow-[0_0_30px_rgba(255,255,255,0.12)]` : side ? "opacity-60" : ""}`}
              >
                <span className="relative block text-[10px] font-bold tracking-widest">{d.label}</span>
                <span className="relative mt-1 block text-sm">
                  1.09<span className="text-3xl font-extrabold">{d.big}</span>
                  <sup>{d.small}</sup>
                </span>
              </button>
            );
          })}
        </div>

      </div>

      <dl className="grid sm:grid-cols-3 gap-px bg-neutral-900 border border-neutral-900 font-mono text-sm">
        {(
          [
            ["sell", "Sell (Bid)", "1.09356", "Зарах үнэ", "text-red-500"],
            ["buy", "Buy (Ask)", "1.09384", "Авах үнэ", "text-green-500"],
            ["spread", "Spread", "2.8 pip", "1.09384 − 1.09356", "text-neutral-500"],
          ] as const
        ).map(([id, k, v, note, tone]) => {
          const lit = id === side || (id === "spread" && side !== null);
          return (
            <div
              key={k}
              className={`p-4 transition-colors duration-300 ${lit ? (id === "sell" ? "bg-[#1a0000]" : id === "buy" ? "bg-green-950/40" : "bg-neutral-950") : "bg-black"}`}
            >
              <dt className={`text-[10px] uppercase tracking-widest ${tone}`}>{k}</dt>
              <dd className={`mt-1 text-lg font-extrabold transition-transform duration-300 ${lit ? "scale-105 origin-left" : ""}`}>
                {v}
              </dd>
              <dd className="text-[11px] text-neutral-500">{note}</dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
