import { X, FileText } from "lucide-react";
import { DOC_TYPE_META } from "../../mock/data";

// mock extracted text — real backend se OCR/parsed text aayega
const MOCK_EXTRACT = {
  "doc-02": "...bearing housing inspected. Early-stage wear observed on drive-end bearing. Vibration within acceptable limits at time of inspection. Recommend re-inspection within 6 months. Severity: Medium.",
  "doc-06": "Subject: RE: Pump-101 vibration increasing\n\nHi team, noticed vibration on Pump-101 has crept up over the last week during rounds. Nothing alarming yet but flagging before it becomes one. Can we get maintenance to take a look tomorrow?",
  "doc-04": "Incident Date: 22-08-2025. Pump-101 tripped on high vibration interlock at 14:32. Unit isolated per LOTO procedure. No injuries. Investigation initiated.",
  "doc-03": "Root cause: bearing wear progressed beyond tolerance, consistent with early warning in Nov 2024 inspection. Recommend bearing replacement and root-cause review of inspection follow-up process.",
  "doc-05": "WO-1042: Replace drive-end bearing, Pump-101. Status: Completed 25-08-2025. Technician: J. Rao. Parts: SKF 6316-2Z.",
};

export default function DocumentDetailModal({ doc, onClose }) {
  if (!doc) return null;
  const meta = DOC_TYPE_META[doc.type];
  const extract = MOCK_EXTRACT[doc.id] || "No extracted text available for this document yet.";

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-panel border border-line rounded-lg max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between px-5 py-4 border-b border-line">
          <div className="flex items-start gap-3">
            <FileText size={18} className="text-muted mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold">{doc.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full border"
                  style={{ color: meta?.color, borderColor: meta?.color + "55" }}
                >
                  {meta?.label}
                </span>
                <span className="tag-mono text-[10px] text-muted">{doc.asset} · {doc.date}</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="text-muted hover:text-text">
            <X size={18} />
          </button>
        </div>

        <div className="px-5 py-4 overflow-y-auto">
          <p className="tag-mono text-[10px] uppercase tracking-widest text-muted mb-2">Extracted content</p>
          <p className="text-sm text-text leading-relaxed whitespace-pre-line">{extract}</p>
        </div>
      </div>
    </div>
  );
}