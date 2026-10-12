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
    <div className="flex items-center gap-4 text-blood font-mono text-sm uppercase tracking-widest border-b border-neutral-900 pb-4">
      <span>Directive // {index}</span>
      <span className="h-px flex-1 bg-neutral-900" />
      <span className="text-neutral-500">{children}</span>
    </div>
  );
}
