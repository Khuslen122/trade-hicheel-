"use client";

import { useState } from "react";
import { steps } from "@/data/setup";
import { Frame } from "./Frame";

type Answer = boolean | null;

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={3}>
      <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={3}>
      <path d="M7 7l10 10M17 7L7 17" strokeLinecap="round" />
    </svg>
  );
}

export function Checklist() {
  const [answers, setAnswers] = useState<Answer[]>(() => steps.map(() => null));

  const yes = answers.filter((a) => a === true).length;
  const hasNo = answers.includes(false);
  const done = !answers.includes(null);

  const set = (i: number, value: boolean) =>
    setAnswers((prev) => prev.map((a, j) => (j === i ? (a === value ? null : value) : a)));

  let status = { label: "Awaiting input", text: "Алхам бүрийг шалгаж хариулна уу.", tone: "idle" };
  if (hasNo) {
    status = { label: "Setup invalid", text: "Арилжаанд орохгүй. Дараагийн боломжийг хүлээ.", tone: "bad" };
  } else if (done) {
    status = { label: "Setup valid", text: "Бүх нөхцөл биелсэн — төлөвлөгөөний дагуу оролт хий.", tone: "good" };
  }

  return (
    <Frame className="p-6 md:p-8 shadow-[0_0_40px_rgba(135,0,0,0.12)]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-blood">
          <span className="w-2 h-2 bg-blood rounded-full animate-pulse" />
          Check List
        </div>
        <span className="font-mono text-xs text-neutral-500">{yes}/{steps.length}</span>
      </div>

      <div className="h-1 w-full bg-neutral-900 mb-6">
        <div
          className={`h-full transition-all duration-500 ${hasNo ? "bg-blood" : "bg-white"}`}
          style={{ width: `${(yes / steps.length) * 100}%` }}
        />
      </div>

      <ul className="divide-y divide-neutral-900">
        {steps.map((step, i) => (
          <li key={step.id} className="flex items-center gap-4 py-4">
            <span className="font-mono text-xs text-neutral-600 w-6">0{i + 1}</span>
            <a href={`#${step.id}`} className="flex-1 text-sm md:text-base hover:text-neutral-300 transition-colors">
              {step.question}
            </a>
            <button
              type="button"
              aria-label="Тийм"
              aria-pressed={answers[i] === true}
              onClick={() => set(i, true)}
              className={`grid place-items-center w-9 h-9 rounded-full border transition-colors ${
                answers[i] === true
                  ? "bg-green-600 border-green-600 text-white"
                  : "border-neutral-800 text-green-600 hover:border-green-600"
              }`}
            >
              <CheckIcon />
            </button>
            <button
              type="button"
              aria-label="Үгүй"
              aria-pressed={answers[i] === false}
              onClick={() => set(i, false)}
              className={`grid place-items-center w-9 h-9 rounded-full border transition-colors ${
                answers[i] === false
                  ? "bg-blood border-blood text-white"
                  : "border-neutral-800 text-red-600 hover:border-blood"
              }`}
            >
              <CrossIcon />
            </button>
          </li>
        ))}
      </ul>

      <div
        className={`mt-6 border p-4 transition-colors ${
          status.tone === "bad"
            ? "border-blood bg-[#1a0000]"
            : status.tone === "good"
              ? "border-green-700 bg-green-950/30"
              : "border-neutral-900 bg-black"
        }`}
      >
        <div
          className={`font-mono text-xs uppercase tracking-widest mb-1 ${
            status.tone === "bad" ? "text-red-500" : status.tone === "good" ? "text-green-500" : "text-neutral-500"
          }`}
        >
          Status: {status.label}
        </div>
        <p className="text-sm text-neutral-300">{status.text}</p>
      </div>

      <button
        type="button"
        onClick={() => setAnswers(steps.map(() => null))}
        className="mt-4 w-full font-mono text-xs uppercase tracking-widest text-neutral-500 hover:text-white transition-colors py-2"
      >
        [ Reset ]
      </button>
    </Frame>
  );
}
