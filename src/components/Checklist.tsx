"use client";

import { useState } from "react";
import { steps } from "@/data/setup";
import { Frame } from "./Frame";

type Answer = boolean | null;

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={3} aria-hidden>
      <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={3} aria-hidden>
      <path d="M7 7l10 10M17 7L7 17" strokeLinecap="round" />
    </svg>
  );
}

export function Checklist() {
  const [answers, setAnswers] = useState<Answer[]>(() => steps.map(() => null));

  const yes = answers.filter((a) => a === true).length;
  const left = answers.filter((a) => a === null).length;
  const hasNo = answers.includes(false);

  // Дахин дарвал хариултыг цуцална
  const set = (i: number, value: boolean) =>
    setAnswers((prev) => prev.map((a, j) => (j === i ? (a === value ? null : value) : a)));

  let status = {
    label: "Хариулт хүлээж байна",
    text:
      left === steps.length
        ? "Асуулт бүрт ✓ (Тийм) эсвэл ✕ (Үгүй) гэж хариулна уу."
        : `Дахиад ${left} асуултад хариулна уу.`,
    tone: "idle",
  };
  if (hasNo) {
    status = {
      label: "Арилжаанд орохгүй",
      text: "“Үгүй” хариулт байна — энэ арилжааг алгасаад дараагийн боломжийг хүлээ.",
      tone: "bad",
    };
  } else if (left === 0) {
    status = { label: "Setup бэлэн", text: "Бүх нөхцөл биелсэн — төлөвлөгөөний дагуу оролт хий.", tone: "good" };
  }

  return (
    <Frame className="p-6 md:p-8 shadow-[0_0_40px_rgba(135,0,0,0.12)]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ember">
          <span className="w-2 h-2 bg-blood rounded-full animate-pulse" />
          Check List
        </div>
        <span className="font-mono text-xs text-neutral-500">
          Тийм: <span className="text-white">{yes}</span>/{steps.length}
        </span>
      </div>

      {/* Алхам бүрийн хариултыг өнгөөр харуулна */}
      <div className="grid gap-1 mb-6" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
        {answers.map((a, i) => (
          <span
            key={i}
            className={`h-1 transition-colors duration-500 ${
              a === true ? "bg-green-600" : a === false ? "bg-blood" : "bg-neutral-900"
            }`}
          />
        ))}
      </div>

      <ul className="divide-y divide-neutral-900">
        {steps.map((step, i) => {
          const a = answers[i];
          return (
            <li
              key={step.id}
              className={`flex items-center gap-4 py-4 -mx-2 px-2 transition-colors duration-300 ${
                a === true ? "bg-green-950/20" : a === false ? "bg-[#1a0000]/60" : ""
              }`}
            >
              <span className="font-mono text-xs text-neutral-600 w-6">0{i + 1}</span>
              <a
                href={`#${step.id}`}
                title="Тайлбарыг харах"
                className="flex-1 text-sm md:text-base hover:text-neutral-300 transition-colors"
              >
                {step.question}
              </a>
              <button
                type="button"
                aria-label={`${step.question} — Тийм`}
                title="Тийм"
                aria-pressed={a === true}
                onClick={() => set(i, true)}
                className={`grid shrink-0 place-items-center w-9 h-9 rounded-full border transition-colors active:scale-90 ${
                  a === true
                    ? "animate-pop bg-green-600 border-green-600 text-white"
                    : "border-neutral-800 text-green-600 hover:border-green-600"
                }`}
              >
                <CheckIcon />
              </button>
              <button
                type="button"
                aria-label={`${step.question} — Үгүй`}
                title="Үгүй"
                aria-pressed={a === false}
                onClick={() => set(i, false)}
                className={`grid shrink-0 place-items-center w-9 h-9 rounded-full border transition-colors active:scale-90 ${
                  a === false
                    ? "animate-pop bg-blood border-blood text-white"
                    : "border-neutral-800 text-red-600 hover:border-blood"
                }`}
              >
                <CrossIcon />
              </button>
            </li>
          );
        })}
      </ul>

      <div
        key={status.tone}
        role="status"
        className={`mt-6 border p-4 animate-fade-up [animation-duration:0.4s] ${
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
          Төлөв: {status.label}
        </div>
        <p className="text-sm text-neutral-300">{status.text}</p>
      </div>

      <button
        type="button"
        disabled={left === steps.length}
        onClick={() => setAnswers(steps.map(() => null))}
        className="mt-4 w-full font-mono text-xs uppercase tracking-widest text-neutral-500 enabled:hover:text-white disabled:opacity-40 transition-colors py-2"
      >
        [ Дахин эхлэх ]
      </button>
    </Frame>
  );
}
