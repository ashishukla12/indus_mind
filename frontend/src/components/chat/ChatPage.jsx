import { useState, useRef } from "react";
import { Send, FileText, Mail, Wrench, AlertTriangle, ClipboardList } from "lucide-react";
import { sendChatQuery } from "../../api/client";
import DocumentDetailModal from "../documents/DocumentDetailModal";

const SUGGESTIONS = [
  "Why did Pump-101 fail?",
  "What is the maintenance history of Compressor-101?",
  "Was there an early warning before the Pump-101 trip?",
];



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

  setMessages((prev) => [
    ...prev,
    {
      role: "user",
      text: query
    }
  ]);

  setLoading(true);

  try {

    const res = await sendChatQuery(query);

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        data: res
      }
    ]);

  } catch (e) {

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        data: {
          answer: "Unable to generate response.",
          confidence: "Low",
          sources: []
        }
      }
    ]);

  } finally {

    setLoading(false);

    setTimeout(() => {
      endRef.current?.scrollIntoView({
        behavior: "smooth"
      });
    }, 100);

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

function AssistantAnswer({ data }) {

  return (

    <div className="max-w-3xl">

      <div className="bg-panel border border-line rounded-lg rounded-tl-sm px-5 py-4">

        <div className="flex items-center gap-2 mb-3">

          <span className="tag-mono text-[10px] uppercase tracking-widest text-steel">
            AI Response
          </span>

          {data.confidence && (

            <span className="tag-mono text-[10px] px-2 py-1 rounded bg-panel-2 border border-line">

              Confidence: {data.confidence}

            </span>

          )}

        </div>

        <p className="text-sm leading-relaxed">

          {data.answer}

        </p>

      </div>

      {data.sources?.length > 0 && (
  <div className="mt-5">

    <p className="tag-mono text-[10px] uppercase tracking-widest text-muted mb-3">
      Sources
    </p>

    <div className="space-y-2">

      {data.sources.map((source, index) => (

        <div
          key={index}
          className="border border-line rounded-md p-3 bg-panel-2"
        >
          <div className="flex items-center gap-2">
            <FileText size={14} />
            <span className="text-sm">
              {source.document}
            </span>
          </div>

          <p className="text-xs text-muted mt-1">
            Chunk {source.chunk}
          </p>

        </div>

      ))}

    </div>

  </div>
)}
 </div>

  );

}