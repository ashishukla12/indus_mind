import { useToast } from "../common/Toast";
import { useState, useCallback } from "react";
import { UploadCloud, CheckCircle2, FileText } from "lucide-react";
import { uploadDocument } from "../../api/client";

export default function UploadPage() {
  const [queue, setQueue] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const showToast = useToast();                 // 👈 hook call karo component ke andar

  const handleFiles = useCallback((fileList) => {
    const files = Array.from(fileList).map((f) => ({ name: f.name, status: "processing" }));
    setQueue((q) => [...files, ...q]);
    files.forEach((f) => {
      uploadDocument({ name: f.name }).then(() => {
        setQueue((q) =>
          q.map((item) => (item.name === f.name && item.status === "processing" ? { ...item, status: "processed" } : item))
        );
        showToast(`${f.name} uploaded and indexed`, "success");   // 👈 yahaan call karo
      });
    });
  }, [showToast]);

  return (
    <div className="p-6">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
        }}
        className={`border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center text-center transition-colors ${
          dragActive ? "border-signal bg-signal/5" : "border-line bg-panel"
        }`}
      >
        <UploadCloud size={28} className="text-muted mb-3" />
        <p className="text-sm text-text mb-1">Drag and drop documents here</p>
        <p className="text-xs text-muted mb-4">PDF, DOCX, XLSX, PNG, JPG supported</p>
        <label className="px-4 py-2 rounded-md bg-signal text-ink text-sm font-medium cursor-pointer hover:bg-signal/90 transition-colors">
          Browse files
          <input
            type="file"
            multiple
            className="hidden"
            onChange={(e) => e.target.files?.length && handleFiles(e.target.files)}
          />
        </label>
      </div>

      {queue.length > 0 && (
        <div className="mt-6 border border-line rounded-lg divide-y divide-line overflow-hidden">
          {queue.map((f, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3 bg-panel">
              <div className="flex items-center gap-2">
                <FileText size={14} className="text-muted" />
                <span className="text-sm">{f.name}</span>
              </div>
              {f.status === "processing" ? (
                <span className="tag-mono text-xs text-signal flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-signal pulse-dot" />
                  Parsing…
                </span>
              ) : (
                <span className="tag-mono text-xs text-steel flex items-center gap-1.5">
                  <CheckCircle2 size={13} /> Indexed
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
