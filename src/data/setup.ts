export type DiagramKey = "trend" | "zone" | "confirm" | "entry" | "stoploss";

export type Step = {
  id: string;
  question: string;
  title: string;
  summary: string;
  diagram: DiagramKey;
  points: { term?: string; text: string }[];
  warning: string;
};

export const steps: Step[] = [
  {
    id: "trend",
    question: "Trend чиглэл тодорхой юу?",
    title: "Trend чиглэл",
    summary:
      "Арилжаанд орохоос өмнө зах зээл аль чиглэлд хөдөлж байгааг тодорхойлно. Чиглэлээ том timeframe (4H, 1D) дээрээс тогтоож, оролтоо жижиг timeframe дээрээс хайна.",
    diagram: "trend",
    points: [
      {
        term: "Өсөх тренд",
        text: "Үнэ Higher High (HH), Higher Low (HL) үүсгэж байвал — зөвхөн Buy хайна.",
      },
      {
        term: "Буурах тренд",
        text: "Үнэ Lower High (LH), Lower Low (LL) үүсгэж байвал — зөвхөн Sell хайна.",
      },
      {
        term: "BOS",
        text: "Break of Structure — сүүлийн swing high/low эвдэгдэх нь трендийн үргэлжлэлийг баталдаг.",
      },
    ],
    warning:
      "Чиглэл тодорхойгүй, үнэ хажуу тийш (range) хөдөлж байвал арилжаа хийхгүй — хүлээнэ.",
  },
  {
    id: "zone",
    question: "Zone (FVG, Fibo, OB) тодорхой юу?",
    title: "Zone тодорхойлох",
    summary:
      "Үнэ буцаж ирээд хариу үйлдэл үзүүлэх магадлал өндөр бүсийг урьдчилан тэмдэглэнэ. Олон хэрэгсэл нэг газар давхцах (confluence) тусам zone хүчтэй.",
    diagram: "zone",
    points: [
      {
        term: "FVG",
        text: "Fair Value Gap — гурван лааны 1 ба 3-р лааны сүүдэр давхцаагүй үлдсэн хоосон зай. Үнэ энэ зайг дүүргэхээр буцаж ирэх нь элбэг.",
      },
      {
        term: "Fibo",
        text: "Swing low-оос swing high хүртэл татаж 0.5, 0.618, 0.705, 0.786 түвшнүүдийг ашиглана. 0.618–0.786 бол “golden zone”.",
      },
      {
        term: "OB",
        text: "Order Block — хүчтэй импульс хөдөлгөөний өмнөх сүүлийн эсрэг өнгийн лаа. Том тоглогчдын захиалга үлдсэн бүс.",
      },
    ],
    warning:
      "Хамгийн хүчтэй zone: FVG + OB + Fibo golden zone нэг дор давхцсан газар.",
  },
  {
    id: "confirm",
    question: "Үнэ zone дээр баталгаа өгсөн үү?",
    title: "Баталгаа (Confirmation)",
    summary:
      "Үнэ zone-д хүрсэн нь шууд орох дохио биш. Zone дээр үнэ эргэх шинж тэмдэг үзүүлж, баталгаа өгөхийг хүлээнэ.",
    diagram: "confirm",
    points: [
      {
        term: "CHoCH",
        text: "Change of Character — жижиг timeframe дээр эсрэг чиглэлийн бүтэц эвдэгдэх нь эргэлтийн эхний дохио.",
      },
      {
        term: "Sweep",
        text: "Liquidity sweep — өмнөх high/low-г цохиж stop-уудыг аваад буцаж орох хөдөлгөөн.",
      },
      {
        term: "Лаа",
        text: "Урт сүүдэртэй rejection (pin bar) эсвэл engulfing лаа zone дээр хаагдах.",
      },
    ],
    warning: "Баталгаагүй оролт бол арилжаа биш — таамаг.",
  },
  {
    id: "entry",
    question: "Оролт хийх бүс тодорхой юу?",
    title: "Оролтын бүс",
    summary:
      "Яг хаана, ямар үнээр орохоо арилжаанд орохоос өмнө тогтооно. Баталгааны дараа үүссэн шинэ FVG эсвэл OB нь хамгийн оновчтой оролтын цэг болдог.",
    diagram: "entry",
    points: [
      {
        term: "Limit",
        text: "Оролтын бүс дээр limit order тавьж, үнийг өөр дээрээ ирэхийг хүлээнэ.",
      },
      {
        term: "Хөөхгүй",
        text: "Үнэ аль хэдийн явчихсан бол market order-оор хөөж орохгүй. Дараагийн setup-ийг хүлээнэ.",
      },
      {
        term: "Төлөвлөгөө",
        text: "Entry, Stoploss, Take profit-оо орохоос өмнө бичиж тэмдэглэнэ.",
      },
    ],
    warning: "Оролтын цэг тодорхойгүй бол setup бүрэн биш.",
  },
  {
    id: "stoploss",
    question: "Stoploss тавих цэг тодорхой юу?",
    title: "Stoploss",
    summary:
      "Stoploss-ийг setup буруу болсныг батлах цэг дээр тавина. Энэ нь эрсдэлээ урьдчилан мэдэж, дансаа хамгаалах хамгийн чухал алхам.",
    diagram: "stoploss",
    points: [
      {
        term: "Байршил",
        text: "Buy: сүүлийн swing low эсвэл OB-ийн доор. Sell: swing high эсвэл OB-ийн дээр.",
      },
      {
        term: "Эрсдэл",
        text: "Нэг арилжаанд дансныхаа 1–2%-иас илүүг эрсдэлд оруулахгүй.",
      },
      {
        term: "R:R",
        text: "Risk to Reward хамгийн багадаа 1:2 байх ёстой. Эрсдэл 1 бол ашиг 2+.",
      },
    ],
    warning: "Арилжааны явцад stoploss-оо хэзээ ч холдуулахгүй.",
  },
];

export const glossary: { term: string; full: string; text: string }[] = [
  { term: "HH / HL", full: "Higher High / Higher Low", text: "Өсөх трендийн бүтэц — оргил, ёроол бүр өмнөхөөсөө өндөр." },
  { term: "LH / LL", full: "Lower High / Lower Low", text: "Буурах трендийн бүтэц — оргил, ёроол бүр өмнөхөөсөө нам." },
  { term: "BOS", full: "Break of Structure", text: "Трендийн чиглэлд сүүлийн swing эвдэгдэх — тренд үргэлжилж байна." },
  { term: "CHoCH", full: "Change of Character", text: "Трендийн эсрэг чиглэлд бүтэц эвдэгдэх — эргэлтийн дохио." },
  { term: "FVG", full: "Fair Value Gap", text: "Хүчтэй хөдөлгөөний үед лаануудын хооронд үлдсэн тэнцвэргүй зай." },
  { term: "OB", full: "Order Block", text: "Импульсийн өмнөх сүүлийн эсрэг лаа — институцийн захиалгын бүс." },
  { term: "Fibo", full: "Fibonacci Retracement", text: "Хөдөлгөөний хэдэн хувийг буцаж засахыг хэмжих түвшнүүд." },
  { term: "Liquidity", full: "Хөрвөх чадвар", text: "Swing high/low-ийн цаана хуримтлагдсан stop order-ууд." },
  { term: "R:R", full: "Risk : Reward", text: "Эрсдэл ба боломжит ашгийн харьцаа. Доод тал нь 1:2." },
  { term: "HTF / LTF", full: "Higher / Lower Timeframe", text: "Том timeframe-ээр чиглэл, жижиг timeframe-ээр оролт." },
];

export const rules: string[] = [
  "Checklist 5/5 биш бол арилжаанд орохгүй.",
  "Нэг арилжаанд дансныхаа 1–2%-иас илүүг эрсдэлд оруулахгүй.",
  "Risk : Reward хамгийн багадаа 1:2.",
  "Stoploss-гүй арилжаа хийхгүй, тавьсан SL-ээ холдуулахгүй.",
  "Арилжаа бүрээ журналд тэмдэглэж, дүгнэлт хийнэ.",
  "Алдагдлаа нөхөх гэж сэтгэл хөдлөлөөр (revenge) арилжаа хийхгүй.",
];
