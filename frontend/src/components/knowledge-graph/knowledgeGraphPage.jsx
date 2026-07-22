import { useState } from "react";
import { KNOWLEDGE_GRAPH } from "../../mock/data";

const NODE_COLOR = {
  asset: "#F5A623",
  document: "#4FB4AC",
  component: "#7C93A8",
  person: "#E5573D",
};

const NODE_RADIUS = { asset: 34, document: 26, component: 24, person: 24 };

export default function KnowledgeGraphPage() {
  const { nodes, edges } = KNOWLEDGE_GRAPH;
  const [hovered, setHovered] = useState(null);

  const nodeById = (id) => nodes.find((n) => n.id === id);

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-4 text-xs">
        <Legend color={NODE_COLOR.asset} label="Asset" />
        <Legend color={NODE_COLOR.document} label="Document" />
        <Legend color={NODE_COLOR.component} label="Component" />
        <Legend color={NODE_COLOR.person} label="Person" />
      </div>

      <div className="border border-line rounded-lg bg-panel overflow-hidden">
        <svg viewBox="0 0 800 480" className="w-full h-[480px]">
          {/* edges */}
          {edges.map((e, i) => {
            const from = nodeById(e.from);
            const to = nodeById(e.to);
            if (!from || !to) return null;
            const midX = (from.x + to.x) / 2;
            const midY = (from.y + to.y) / 2;
            const dim = hovered && hovered !== e.from && hovered !== e.to;
            return (
              <g key={i} opacity={dim ? 0.15 : 1}>
                <line
                  x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                  stroke="#24384C" strokeWidth={1.5}
                />
                <text
                  x={midX} y={midY - 4}
                  textAnchor="middle"
                  fontSize="9"
                  fill="#7C93A8"
                  fontFamily="IBM Plex Mono, monospace"
                >
                  {e.label}
                </text>
              </g>
            );
          })}

          {/* nodes */}
          {nodes.map((n) => {
            const dim = hovered && hovered !== n.id && !edges.some(
              (e) => (e.from === hovered && e.to === n.id) || (e.to === hovered && e.from === n.id)
            );
            return (
              <g
                key={n.id}
                opacity={dim ? 0.25 : 1}
                onMouseEnter={() => setHovered(n.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "pointer" }}
              >
                <circle
                  cx={n.x} cy={n.y} r={NODE_RADIUS[n.type]}
                  fill="#0A121C"
                  stroke={NODE_COLOR[n.type]}
                  strokeWidth={2}
                />
                <text
                  x={n.x} y={n.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="9.5"
                  fill="#E7EEF5"
                  fontFamily="IBM Plex Sans, sans-serif"
                >
                  {wrapLabel(n.label, n.x)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <p className="text-xs text-muted mt-3">
        Hover a node to trace its direct relationships. Entities are extracted automatically during document ingestion.
      </p>
    </div>
  );
}

function Legend({ color, label }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="w-2.5 h-2.5 rounded-full border-2" style={{ borderColor: color }} />
      <span className="text-muted">{label}</span>
    </div>
  );
}

// SVG text doesn't wrap on its own — split long labels across two tspans,
// anchored at the node's own x so they stay centered under the parent <text>.
function wrapLabel(label, x) {
  const words = label.split(" ");
  if (words.length <= 1) return label;
  const mid = Math.ceil(words.length / 2);
  const line1 = words.slice(0, mid).join(" ");
  const line2 = words.slice(mid).join(" ");
  return (
    <>
      <tspan x={x} dy="-5">{line1}</tspan>
      <tspan x={x} dy="12">{line2}</tspan>
    </>
  );
}