import { useState, useRef } from "react";
import { Send, FileText, Mail, Wrench, AlertTriangle, ClipboardList } from "lucide-react";
import { sendChatQuery } from "../../api/client";
import { DOCUMENTS, DOC_TYPE_META } from "../../mock/data";
import DocumentDetailModal from "../documents/DocumentDetailModal";

const SUGGESTIONS = [
  "Why did Pump-101 fail?",
  "What is the maintenance history of Compressor-101?",
  "Was there an early warning before the Pump-101 trip?",
];

const TRACE_ICON = {
  inspection: ClipboardList,
  email: Mail,
  incident: AlertTriangle,
  maintenance: Wrench,
  work_order: FileText,
};

function docById(id) {
  return DOCUMENTS.find((d) => d.id === id);
}

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const endRef = useRef(null);

  async function handleSend(text) {
    const query = (text ?? input).trim();
    if (!query || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: query }]);
    setLoading(true);
    try {
      const res = await sendChatQuery(query);
      setMessages((m) => [...m, { role: "assistant", data: res }]);
    } finally {
      setLoading(false);
      setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {messages.length === 0 && (
          <div className="max-w-xl mx-auto mt-10 text-center">
            <p className="tag-mono text-[11px] text-muted uppercase tracking-widest mb-2">Cross-document reasoning</p>
            <h3 className="text-xl font-semibold mb-6">Ask anything about your assets</h3>
            <div className="flex flex-col gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSend(s)}
                  className="text-left px-4 py-3 rounded-md border border-line bg-panel hover:border-steel/50 hover:bg-panel-2 transition-colors text-sm text-muted hover:text-text"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) =>
          m.role === "user" ? (
            <div key={i} className="flex justify-end">
              <div className="max-w-lg bg-panel-2 border border-line rounded-lg rounded-tr-sm px-4 py-2.5 text-sm">
                {m.text}
              </div>
            </div>
          ) : (
            <AssistantAnswer key={i} data={m.data} onCiteClick={setSelectedDoc} />
          )
        )}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-muted tag-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-signal pulse-dot" />
            Retrieving across manuals, inspections, maintenance, incidents…
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="border-t border-line px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about an asset, e.g. Why did Pump-101 fail?"
            className="flex-1 bg-panel border border-line rounded-md px-4 py-2.5 text-sm outline-none focus:border-steel/60 placeholder:text-muted"
          />
          <button
            onClick={() => handleSend()}
            className="w-10 h-10 shrink-0 rounded-md bg-signal text-ink flex items-center justify-center hover:bg-signal/90 transition-colors disabled:opacity-40"
            disabled={loading}
          >
            <Send size={16} />
          </button>
        </div>
      </div>

      <DocumentDetailModal doc={selectedDoc} onClose={() => setSelectedDoc(null)} />
    </div>
  );
}

function AssistantAnswer({ data, onCiteClick }) {
  return (
    <div className="max-w-3xl">
      <div className="bg-panel border border-line rounded-lg rounded-tl-sm px-5 py-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="tag-mono text-[10px] uppercase tracking-widest text-steel">Root Cause Analysis</span>
          <span className="tag-mono text-[10px] px-1.5 py-0.5 rounded bg-panel-2 border border-line text-muted">
            Confidence: {data.confidence}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-text">{data.answer}</p>
      </div>

      <div className="mt-4 pl-1">
        <p className="tag-mono text-[10px] uppercase tracking-widest text-muted mb-3">Evidence trace</p>
        <div className="relative">
          <div className="absolute left-[15px] top-4 bottom-4 w-px bg-gradient-to-b from-steel via-signal to-critical opacity-40" />
          <div className="space-y-4">
            {data.trace.map((step, i) => {
              const doc = docById(step.docId);
              const meta = doc ? DOC_TYPE_META[doc.type] : null;
              const Icon = TRACE_ICON[doc?.type] || FileText;
              return (
                <div key={i} className="relative flex gap-4 items-start">
                  <div
                    className="w-8 h-8 rounded-full border-2 flex items-center justify-center bg-ink shrink-0 z-10"
                    style={{ borderColor: meta?.color || "#4FB4AC" }}
                  >
                    <Icon size={14} style={{ color: meta?.color || "#4FB4AC" }} />
                  </div>
                  <div className="pt-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium">{step.label}</span>
                      <span className="tag-mono text-[10px] text-muted">{step.date}</span>
                    </div>
                    <p className="text-xs text-muted mt-0.5">{step.note}</p>
                    {doc && (
                      <button
                        onClick={() => onCiteClick(doc)}
                        className="tag-mono text-[10px] text-steel mt-1 hover:text-signal transition-colors"
                      >
                        source: {doc.title}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}