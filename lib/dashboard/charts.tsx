/**
 * Self-contained inline SVG chart builders, ported from the reference
 * dashboards' own vanilla-JS chart helpers. Same math, same shapes — just
 * React components instead of string-built SVG, and recolored into the
 * sage/olive palette.
 */

export function BarChart({
  data,
  color = "#41502C",
  width = 560,
  height = 150,
}: {
  data: { label: string; value: number }[];
  color?: string;
  width?: number;
  height?: number;
}) {
  const barGap = 6;
  const n = data.length;
  const barWidth = (width - barGap * (n - 1)) / n;
  const maxVal = Math.max(...data.map((d) => d.value)) || 1;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height}>
      {data.map((d, i) => {
        const h = Math.max(2, (d.value / maxVal) * (height - 30));
        const x = i * (barWidth + barGap);
        const y = height - 20 - h;
        return (
          <g key={i}>
            <rect x={x} y={y} width={barWidth} height={h} fill={color} rx="2" />
            {d.value > 0 && (
              <text
                x={x + barWidth / 2}
                y={y - 4}
                fontSize="9"
                textAnchor="middle"
                fill="#666B54"
                fontFamily="IBM Plex Mono"
              >
                {d.value}
              </text>
            )}
            <text
              x={x + barWidth / 2}
              y={height - 5}
              fontSize="8"
              textAnchor="middle"
              fill="#666B54"
              fontFamily="IBM Plex Mono"
            >
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function HBarChart({
  data,
  color = "#82986E",
  width = 560,
  rowHeight = 26,
  labelWidth = 190,
}: {
  data: { label: string; value: number; valueLabel?: string }[];
  color?: string;
  width?: number;
  rowHeight?: number;
  labelWidth?: number;
}) {
  const height = data.length * rowHeight + 8;
  const maxVal = Math.max(...data.map((d) => d.value)) || 1;
  const barMaxWidth = width - labelWidth - 60;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height}>
      {data.map((d, i) => {
        const y = i * rowHeight + 15;
        const bw = Math.max(2, (d.value / maxVal) * barMaxWidth);
        return (
          <g key={i}>
            <text x="0" y={y} fontSize="11" fill="#2A2E20" fontFamily="IBM Plex Sans">
              {d.label}
            </text>
            <rect x={labelWidth} y={y - 11} width={bw} height="13" fill={color} rx="2" />
            <text x={labelWidth + bw + 8} y={y} fontSize="11" fill="#666B54" fontFamily="IBM Plex Mono">
              {d.valueLabel ?? d.value}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
