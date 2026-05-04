// Field diagram renderer for schemes/formations.
// Renders x's, o's, ball, and arrows on a striped pitch placeholder.
// Coords are 0-100 (x = horizontal across field, y = vertical).

function FieldDiagram({ marks, ratio = "16 / 10", small = false }) {
  // viewBox is 100 wide x 60 tall — slight letterbox feel
  const VBW = 100, VBH = 60;
  const ms = (marks || []).map((m) => ({
    ...m,
    // y is 0-100 in data; map into 0-60
    cy: (m.y / 100) * VBH,
    cy2: m.y2 != null ? (m.y2 / 100) * VBH : null,
  }));

  const r = small ? 2.6 : 3.0;
  const stroke = small ? 0.7 : 0.8;

  return (
    <svg
      viewBox={`0 0 ${VBW} ${VBH}`}
      preserveAspectRatio="none"
      style={{
        width: "100%",
        aspectRatio: ratio,
        display: "block",
        background: "#F4F8EA",
        borderBottom: small ? "1px solid var(--border)" : "none",
      }}
    >
      <defs>
        <pattern id={`stripes-${small ? "s" : "l"}`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(0)">
          <rect width="6" height="6" fill="#F4F8EA" />
          <rect x="0" width="3" height="6" fill="#EFF4DE" />
        </pattern>
        <marker id={`arrowHead-${small ? "s" : "l"}`} markerWidth="6" markerHeight="6" refX="4.5" refY="3" orient="auto">
          <path d="M0,0 L5,3 L0,6 z" fill="var(--fg)" />
        </marker>
      </defs>

      {/* Pitch */}
      <rect x="0" y="0" width={VBW} height={VBH} fill={`url(#stripes-${small ? "s" : "l"})`} />
      {/* Boundary */}
      <rect x="1" y="1" width={VBW - 2} height={VBH - 2} fill="none" stroke="#A8B47A" strokeWidth={stroke} />
      {/* Halfway line */}
      <line x1={VBW / 2} y1="1" x2={VBW / 2} y2={VBH - 1} stroke="#A8B47A" strokeWidth={stroke} strokeDasharray="1.5 1.5" />
      {/* Center spot */}
      <circle cx={VBW / 2} cy={VBH / 2} r="1" fill="#A8B47A" />
      {/* Goal areas */}
      <rect x="1" y={VBH / 2 - 8} width="6" height="16" fill="none" stroke="#A8B47A" strokeWidth={stroke} />
      <rect x={VBW - 7} y={VBH / 2 - 8} width="6" height="16" fill="none" stroke="#A8B47A" strokeWidth={stroke} />

      {/* Arrows behind marks */}
      {ms
        .filter((m) => m.type === "arrow")
        .map((m, i) => (
          <line
            key={`a${i}`}
            x1={m.x}
            y1={m.cy}
            x2={m.x2}
            y2={m.cy2}
            stroke="var(--fg)"
            strokeWidth={stroke * 0.9}
            strokeDasharray="1.6 1.4"
            markerEnd={`url(#arrowHead-${small ? "s" : "l"})`}
            opacity="0.8"
          />
        ))}

      {/* Marks */}
      {ms.map((m, i) => {
        if (m.type === "o") {
          return (
            <circle key={i} cx={m.x} cy={m.cy} r={r}
              fill="#FFFFFF" stroke="var(--info-text)" strokeWidth={stroke * 1.4} />
          );
        }
        if (m.type === "x") {
          const d = r * 0.85;
          return (
            <g key={i} stroke="var(--error-text)" strokeWidth={stroke * 1.5} strokeLinecap="round">
              <line x1={m.x - d} y1={m.cy - d} x2={m.x + d} y2={m.cy + d} />
              <line x1={m.x + d} y1={m.cy - d} x2={m.x - d} y2={m.cy + d} />
            </g>
          );
        }
        if (m.type === "ball") {
          return (
            <circle key={i} cx={m.x} cy={m.cy} r={r * 0.55}
              fill="#272520" stroke="#FFFFFF" strokeWidth={stroke * 0.6} />
          );
        }
        return null;
      })}
    </svg>
  );
}

window.FieldDiagram = FieldDiagram;
