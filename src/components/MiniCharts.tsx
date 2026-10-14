// Нэр томьёо бүрийг тайлбарлах жижиг график — .chart/.draw/.late класс нь scroll хийхэд зурагдана
const LINE = "#d4d4d4";
const RED = "#c40000";
const MUTED = "#737373";

const label = {
  fill: MUTED,
  fontSize: 8,
  fontFamily: "var(--font-jetbrains), monospace",
};

type Pt = [number, number];
const poly = (pts: Pt[]) => pts.map((p) => p.join(",")).join(" ");

function Price({ pts }: { pts: Pt[] }) {
  return (
    <polyline
      className="draw"
      pathLength={1}
      points={poly(pts)}
      fill="none"
      stroke={LINE}
      strokeWidth={1.8}
      strokeLinejoin="round"
    />
  );
}

function Trend() {
  const pts: Pt[] = [[10, 86], [45, 56], [65, 68], [100, 40], [120, 52], [155, 24], [175, 35], [194, 12]];
  return (
    <>
      <Price pts={pts} />
      <g className="late">
        <path d="M194 12 L186 13 L191 19 Z" fill={LINE} />
        {pts.slice(1, -1).map(([x, y], i) => (
          <text key={x} x={x} y={i % 2 ? y + 13 : y - 6} textAnchor="middle" {...label}>
            {i % 2 ? "HL" : "HH"}
          </text>
        ))}
      </g>
    </>
  );
}

function Level({ y, name }: { y: number; name: string }) {
  return (
    <g className="late">
      <line x1={0} x2={200} y1={y} y2={y} stroke={RED} strokeWidth={1.2} strokeDasharray="4 3" />
      <text x={198} y={y < 50 ? y - 5 : y + 12} textAnchor="end" {...label} fill={RED}>
        {name}
      </text>
    </g>
  );
}

function Support() {
  const pts: Pt[] = [[5, 28], [40, 78], [60, 50], [95, 78], [115, 44], [150, 78], [175, 40], [198, 24]];
  return (
    <>
      <Level y={80} name="SUPPORT" />
      <Price pts={pts} />
      <g className="late">
        {[40, 95, 150].map((x) => (
          <circle key={x} cx={x} cy={78} r={3} fill="#000" stroke={RED} strokeWidth={1.5} />
        ))}
      </g>
    </>
  );
}

function Resistance() {
  const pts: Pt[] = [[5, 72], [40, 22], [60, 50], [95, 22], [115, 56], [150, 22], [175, 60], [198, 78]];
  return (
    <>
      <Level y={20} name="RESISTANCE" />
      <Price pts={pts} />
      <g className="late">
        {[40, 95, 150].map((x) => (
          <circle key={x} cx={x} cy={22} r={3} fill="#000" stroke={RED} strokeWidth={1.5} />
        ))}
      </g>
    </>
  );
}

function Trendline() {
  // Ёроолууд нэг шулуун дээр — y = 88 − 0.36·(x − 10)
  const low = (x: number): Pt => [x, 88 - 0.36 * (x - 10)];
  const pts: Pt[] = [low(10), [40, 58], low(60), [92, 40], low(110), [142, 22], low(160), [192, 6]];
  return (
    <>
      <g className="late">
        <line x1={2} y1={88 + 0.36 * 8} x2={198} y2={88 - 0.36 * 188} stroke={RED} strokeWidth={1.2} />
        <text x={196} y={52} textAnchor="end" {...label} fill={RED}>
          TRENDLINE
        </text>
      </g>
      <Price pts={pts} />
      <g className="late">
        {[10, 60, 110, 160].map((x) => (
          <circle key={x} cx={x} cy={low(x)[1]} r={2.5} fill={RED} />
        ))}
      </g>
    </>
  );
}

function Fractal() {
  // Том хэлбэр (HTF) ба түүний яг ижил жижиг хуулбар (LTF)
  const big: Pt[] = [[8, 88], [55, 36], [80, 60], [125, 14]];
  const k = 0.42;
  const box = { x: 136, y: 56, w: 60, h: 38 };
  const small: Pt[] = big.map(([x, y]) => [box.x + 5 + (x - 8) * k, box.y + 4 + (y - 14) * k]);
  return (
    <>
      <Price pts={big} />
      <g className="late">
        <text x={30} y={20} {...label}>
          HTF · 1D
        </text>
        <line x1={80} y1={60} x2={box.x} y2={box.y + box.h / 2} stroke={MUTED} strokeDasharray="2 3" strokeWidth={0.8} />
        <rect x={box.x} y={box.y} width={box.w} height={box.h} fill="rgba(196,0,0,0.12)" stroke={RED} strokeWidth={1} />
        <polyline points={poly(small)} fill="none" stroke={LINE} strokeWidth={1.4} strokeLinejoin="round" />
        <text x={box.x + box.w - 3} y={box.y - 4} textAnchor="end" {...label} fill={RED}>
          LTF · 15m
        </text>
      </g>
    </>
  );
}

function Indicator() {
  const pts: Pt[] = [
    [5, 74], [18, 62], [28, 68], [42, 50], [52, 57], [66, 40], [78, 48], [92, 34], [104, 44],
    [118, 50], [128, 42], [142, 58], [152, 50], [166, 64], [178, 56], [196, 68],
  ];
  return (
    <>
      <Price pts={pts} />
      <g className="late">
        <path d="M5 76 C 40 64, 70 44, 100 42 S 160 56, 196 62" fill="none" stroke={RED} strokeWidth={2} />
        <text x={100} y={30} textAnchor="middle" {...label} fill={RED}>
          MOVING AVERAGE
        </text>
      </g>
    </>
  );
}

const charts = {
  trend: Trend,
  support: Support,
  resistance: Resistance,
  trendline: Trendline,
  fractal: Fractal,
  indicator: Indicator,
};

export type MiniChartKey = keyof typeof charts;

export function MiniChart({ name, title }: { name: MiniChartKey; title: string }) {
  const Content = charts[name];
  return (
    <svg viewBox="0 0 200 100" className="chart h-auto w-full" role="img" aria-label={title}>
      <Content />
    </svg>
  );
}
