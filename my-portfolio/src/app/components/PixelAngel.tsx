// 8-bit cyber angel: halo, wings and an Eva-style red core, drawn as crisp SVG pixels.
// Each row is the LEFT half (25 cols, the last one is the center column); it gets mirrored.
//   # = pearl   + = shade   o = core   . = empty
const HALO = [
  "...............##########",
  ".............##+.........",
  "............##...........",
  ".............##+.........",
  "...............##########",
];
const BODY = [
  ".........................",
  "##.......................",
  "+###.....................",
  ".+#####..................",
  ".+###+####...............",
  "..+###+###+##............",
  "..+####+####+###.........",
  "...+####+#####+####.....o",
  "...+#####+######+####..oo",
  "....+#####+######+###.ooo",
  ".....+#####+#####+##...oo",
  "......+######.+#####....o",
  ".......+###..+#####......",
  "........##..+####........",
  "...........####..........",
  "............##...........",
];

const mirror = (row: string) => row + row.slice(0, -1).split("").reverse().join("");
const COLS = 49;

function pixels(rows: string[], yOffset: number) {
  const out: { x: number; y: number; c: string }[] = [];
  rows.map(mirror).forEach((row, y) =>
    row.split("").forEach((c, x) => c !== "." && out.push({ x, y: y + yOffset, c }))
  );
  return out;
}

const FILL: Record<string, string> = { "#": "var(--pearl-hi)", "+": "var(--ash)", o: "var(--nerv)" };

export default function PixelAngel({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pixel-angel ${className}`}
      viewBox={`0 0 ${COLS} ${HALO.length + BODY.length}`}
      shapeRendering="crispEdges"
      role="img"
      aria-label="pixel angel"
    >
      <g className="pa-halo">
        {pixels(HALO, 0).map((p) => (
          <rect key={`h${p.x}-${p.y}`} x={p.x} y={p.y} width="1" height="1" fill={FILL[p.c]} />
        ))}
      </g>
      <g className="pa-body">
        {pixels(BODY, HALO.length).map((p) => (
          <rect
            key={`b${p.x}-${p.y}`}
            x={p.x}
            y={p.y}
            width="1"
            height="1"
            fill={FILL[p.c]}
            className={p.c === "o" ? "pa-core" : undefined}
          />
        ))}
      </g>
    </svg>
  );
}
