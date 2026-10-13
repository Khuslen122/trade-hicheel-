import type { DiagramKey } from "@/data/setup";

const LINE = "#d4d4d4";
const RED = "#c40000";
const MUTED = "#737373";

const labelProps = {
  fill: MUTED,
  fontSize: 9,
  fontFamily: "var(--font-jetbrains), monospace",
};

// y утга бага байх тусам үнэ өндөр
function Candle({ x, open, close, high, low }: { x: number; open: number; close: number; high: number; low: number }) {
  const bull = close < open;
  const color = bull ? LINE : RED;
  return (
    <g>
      <line x1={x} x2={x} y1={high} y2={low} stroke={color} strokeWidth={1.5} />
      <rect
        x={x - 6}
        y={Math.min(open, close)}
        width={12}
        height={Math.abs(open - close)}
        fill={bull ? "#000" : RED}
        stroke={color}
        strokeWidth={1.5}
      />
    </g>
  );
}

// .draw — үнийн шугам scroll хийхэд зурагдана, .early/.late — тэмдэглэгээнүүд дараалан гарч ирнэ
function Trend() {
  const pts: [number, number][] = [
    [20, 150], [70, 105], [100, 128], [150, 72], [180, 98], [230, 42], [258, 66], [300, 18],
  ];
  return (
    <>
      <polyline className="draw" pathLength={1} points={pts.map((p) => p.join(",")).join(" ")} fill="none" stroke={LINE} strokeWidth={2} />
      <g className="late">
        <line x1={150} x2={203} y1={72} y2={72} stroke={RED} strokeDasharray="4 3" />
        <text x={176} y={67} textAnchor="middle" {...labelProps} fill={RED}>BOS</text>
        {pts.slice(1).map(([x, y], i) => {
          const isHigh = i % 2 === 0;
          return (
            <g key={i}>
              <circle cx={x} cy={y} r={2.5} fill={isHigh ? LINE : RED} />
              <text x={x} y={isHigh ? y - 8 : y + 16} textAnchor="middle" {...labelProps}>
                {i === 0 ? "H" : isHigh ? "HH" : "HL"}
              </text>
            </g>
          );
        })}
      </g>
    </>
  );
}

function Zone() {
  const fibs: [string, number][] = [["0.5", 90], ["0.618", 103], ["0.786", 121]];
  return (
    <>
      <g className="late">
        <rect x={52} y={112} width={210} height={33} fill="rgba(135,0,0,0.18)" />
        <rect x={70} y={85} width={192} height={27} fill="rgba(196,0,0,0.32)" />
        <text x={258} y={102} textAnchor="end" {...labelProps} fill="#fff">FVG</text>
        <text x={258} y={132} textAnchor="end" {...labelProps} fill="#fff">OB</text>
        {fibs.map(([label, y]) => (
          <g key={label}>
            <line x1={52} x2={276} y1={y} y2={y} stroke={MUTED} strokeDasharray="2 3" strokeWidth={0.8} />
            <text x={316} y={y + 3} textAnchor="end" {...labelProps}>{label}</text>
          </g>
        ))}
      </g>
      <g className="early">
        <Candle x={60} open={118} close={138} high={112} low={145} />
        <Candle x={85} open={136} close={60} high={55} low={140} />
        <Candle x={110} open={70} close={40} high={35} low={85} />
        <Candle x={135} open={42} close={58} high={38} low={64} />
        <Candle x={160} open={58} close={78} high={54} low={82} />
        <Candle x={185} open={78} close={96} high={74} low={106} />
        <Candle x={210} open={100} close={70} high={66} low={108} />
        <Candle x={235} open={70} close={36} high={30} low={74} />
      </g>
    </>
  );
}

function Confirm() {
  // Уналттай бүтэц → сүүлийн LL-ийн liquidity-г sweep хийж zone-д орно → сүүлийн LH эвдэгдэнэ (CHoCH)
  const pts: [number, number][] = [
    [15, 30], [55, 75], [85, 55], [125, 105], [160, 82], [195, 140], [235, 62], [262, 88], [305, 28],
  ];
  return (
    <>
      <g className="early">
        <rect x={170} y={125} width={145} height={27} fill="rgba(196,0,0,0.28)" />
        <text x={311} y={142} textAnchor="end" {...labelProps} fill="#fff">ZONE</text>

        <line x1={125} x2={200} y1={105} y2={105} stroke={MUTED} strokeDasharray="2 3" strokeWidth={0.8} />
        <text x={122} y={119} textAnchor="end" {...labelProps}>$$$ Liquidity</text>
      </g>

      <polyline
        className="draw"
        pathLength={1}
        points={pts.map((p) => p.join(",")).join(" ")}
        fill="none"
        stroke={LINE}
        strokeWidth={2}
        strokeLinejoin="round"
      />

      <g className="late">
        <line x1={160} x2={240} y1={82} y2={82} stroke={RED} strokeDasharray="4 3" />
        <text x={200} y={76} textAnchor="middle" {...labelProps} fill={RED}>CHoCH</text>
        <path d="M305 28 L303.2 37.6 L296.6 32.9 Z" fill={LINE} />

        <text x={85} y={47} textAnchor="middle" {...labelProps}>LH</text>
        <text x={160} y={74} textAnchor="middle" {...labelProps}>LH</text>
        <text x={262} y={102} textAnchor="middle" {...labelProps}>HL</text>

        <circle cx={195} cy={140} r={3.5} fill={RED} />
        <text x={195} y={166} textAnchor="middle" {...labelProps}>Sweep</text>
      </g>
    </>
  );
}

function Entry() {
  const pts: [number, number][] = [[15, 70], [70, 150], [130, 70], [175, 112], [300, 25]];
  return (
    <>
      <g className="early">
        <rect x={95} y={105} width={220} height={17} fill="rgba(196,0,0,0.28)" />
        <line x1={95} x2={315} y1={105} y2={105} stroke={RED} strokeDasharray="4 3" />
        <text x={311} y={100} textAnchor="end" {...labelProps} fill={RED}>LIMIT BUY</text>
        <text x={311} y={117} textAnchor="end" {...labelProps} fill="#fff">ENTRY ZONE</text>
      </g>
      <polyline className="draw" pathLength={1} points={pts.map((p) => p.join(",")).join(" ")} fill="none" stroke={LINE} strokeWidth={2} />
      <g className="late">
        <circle cx={167.5} cy={105} r={4} fill="#000" stroke={RED} strokeWidth={2} />
        <text x={130} y={62} textAnchor="middle" {...labelProps}>Impulse</text>
      </g>
    </>
  );
}

function Stoploss() {
  const pts: [number, number][] = [
    [15, 90], [50, 125], [80, 105], [110, 135], [150, 110], [185, 125], [230, 80], [260, 95], [300, 45],
  ];
  return (
    <>
      <g className="early">
        <rect x={150} y={50} width={160} height={60} fill="rgba(255,255,255,0.06)" stroke="#404040" />
        <rect x={150} y={110} width={160} height={30} fill="rgba(196,0,0,0.3)" stroke={RED} />
        <text x={306} y={62} textAnchor="end" {...labelProps} fill="#fff">TP</text>
        <text x={306} y={106} textAnchor="end" {...labelProps} fill="#fff">ENTRY</text>
        <text x={306} y={134} textAnchor="end" {...labelProps} fill="#fff">SL</text>
      </g>
      <polyline className="draw" pathLength={1} points={pts.map((p) => p.join(",")).join(" ")} fill="none" stroke={LINE} strokeWidth={2} />
      <g className="late">
        <text x={190} y={86} textAnchor="middle" fill="#fff" fontSize={16} fontWeight={800} fontFamily="var(--font-jetbrains), monospace">
          1 : 2
        </text>
        <circle cx={110} cy={135} r={3} fill={RED} />
        <text x={110} y={156} textAnchor="middle" {...labelProps}>Swing low</text>
      </g>
    </>
  );
}

const diagrams: Record<DiagramKey, () => React.ReactElement> = {
  trend: Trend,
  zone: Zone,
  confirm: Confirm,
  entry: Entry,
  stoploss: Stoploss,
};

export function Diagram({ name, title }: { name: DiagramKey; title: string }) {
  const Content = diagrams[name];
  return (
    <svg viewBox="0 0 320 175" className="chart w-full h-auto" role="img" aria-label={title}>
      <Content />
    </svg>
  );
}
