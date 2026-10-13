type FrameProps = {
  children: React.ReactNode;
  className?: string;
};

// bayn.mn шиг булангийн улаан хаалттай хүрээ
export function Frame({ children, className = "" }: FrameProps) {
  return (
    <div className={`relative border border-neutral-900 bg-[#050505] ${className}`}>
      <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blood z-20" />
      <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-blood z-20" />
      <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-blood z-20" />
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-blood z-20" />
      {children}
    </div>
  );
}

export function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 text-ember font-mono text-sm uppercase tracking-widest border-b border-neutral-900 pb-4">
      <span>{`${index} //`}</span>
      <span className="h-px flex-1 bg-neutral-900" />
      <span className="text-neutral-500">{children}</span>
    </div>
  );
}

// Товчны сум — эцэг элемент нь `group` бол hover хийхэд сумны зүг рүү гулсана
export function Arrow({ direction = "right" }: { direction?: "right" | "down" }) {
  const down = direction === "down";
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden
      className={`h-4 w-4 transition-transform duration-300 ${
        down ? "rotate-90 group-hover:translate-y-0.5" : "group-hover:translate-x-1"
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}
