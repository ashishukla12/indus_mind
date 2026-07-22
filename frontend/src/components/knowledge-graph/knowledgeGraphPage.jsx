import { useEffect, useState } from "react";
import { fetchGraph } from "../../api/client";

const NODE_COLOR = {
  asset: "#F5A623",
  document: "#4FB4AC",
  component: "#7C93A8",
  person: "#E5573D",
};

const NODE_RADIUS = {
  asset: 34,
  document: 26,
  component: 24,
  person: 24,
};

export default function KnowledgeGraphPage() {
  const [graph, setGraph] = useState({
    nodes: [],
    edges: [],
  });

  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    loadGraph();
  }, []);

  async function loadGraph() {
    try {
      const data = await fetchGraph();
      setGraph(data);
    } catch (err) {
      console.error(err);
    }
  }

  const { nodes, edges } = graph;

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

          {edges.map((edge, index) => {

            const from = nodeById(edge.from);
            const to = nodeById(edge.to);

            if (!from || !to) return null;

            const midX = (from.x + to.x) / 2;
            const midY = (from.y + to.y) / 2;

            const dim =
              hovered &&
              hovered !== edge.from &&
              hovered !== edge.to;

            return (
              <g key={index} opacity={dim ? 0.15 : 1}>
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="#24384C"
                  strokeWidth={1.5}
                />

                <text
                  x={midX}
                  y={midY - 5}
                  textAnchor="middle"
                  fontSize="9"
                  fill="#7C93A8"
                  fontFamily="IBM Plex Mono, monospace"
                >
                  {edge.label}
                </text>
              </g>
            );
          })}

          {nodes.map((node) => {

            const connected =
              hovered === null ||
              hovered === node.id ||
              edges.some(
                (e) =>
                  (e.from === hovered && e.to === node.id) ||
                  (e.to === hovered && e.from === node.id)
              );

            return (
              <g
                key={node.id}
                opacity={connected ? 1 : 0.25}
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "pointer" }}
              >
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={NODE_RADIUS[node.type] || 24}
                  fill="#0A121C"
                  stroke={NODE_COLOR[node.type] || "#4FB4AC"}
                  strokeWidth={2}
                />

                <text
                  x={node.x}
                  y={node.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="9"
                  fill="#E7EEF5"
                  fontFamily="IBM Plex Sans, sans-serif"
                >
                  {wrapLabel(node.label, node.x)}
                </text>
              </g>
            );
          })}
        </svg>

      </div>

      <p className="text-xs text-muted mt-3">
        Knowledge Graph generated automatically from uploaded documents.
      </p>

    </div>
  );
}

function Legend({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="w-3 h-3 rounded-full border-2"
        style={{ borderColor: color }}
      />
      <span>{label}</span>
    </div>
  );
}

function wrapLabel(label, x) {
  if (!label) return "";

  const words = label.split(" ");

  if (words.length === 1) {
    return label;
  }

  const mid = Math.ceil(words.length / 2);

  return (
    <>
      <tspan x={x} dy="-5">
        {words.slice(0, mid).join(" ")}
      </tspan>

      <tspan x={x} dy="12">
        {words.slice(mid).join(" ")}
      </tspan>
    </>
  );
}