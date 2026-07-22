import { useEffect, useState } from "react";
import { FileText, Search } from "lucide-react";
import { fetchDocuments, fetchAssets } from "../../api/client";
import { DOC_TYPE_META } from "../../mock/data";
import DocumentDetailModal from "./DocumentDetailModal";
import EmptyState from "../common/EmptyState";
import { useToast } from "../common/Toast";

export default function DocumentsPage() {
  const [docs, setDocs] = useState([]);
  const [assets, setAssets] = useState([]);
  const [assetFilter, setAssetFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const showToast = useToast();

  useEffect(() => {
    fetchAssets().then(setAssets);
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetchDocuments({ asset: assetFilter })
      .then((d) => setDocs(d))
      .catch(() => {
        setError(true);
        showToast("Failed to load documents", "error");
      })
      .finally(() => setLoading(false));
  }, [assetFilter, showToast]);

  const filtered = docs.filter((d) =>
    d.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documents…"
            className="w-full bg-panel border border-line rounded-md pl-8 pr-3 py-2 text-sm outline-none focus:border-steel/60 placeholder:text-muted"
          />
        </div>
        <select
          value={assetFilter}
          onChange={(e) => setAssetFilter(e.target.value)}
          className="bg-panel border border-line rounded-md px-3 py-2 text-sm outline-none focus:border-steel/60"
        >
          <option value="ALL">All assets</option>
          {assets.map((a) => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-sm text-muted">Loading documents…</p>
      ) : error ? (
        <EmptyState
          type="error"
          title="Couldn't load documents"
          subtitle="Check your connection and try again."
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          type="empty"
          title="No documents match this search"
          subtitle="Try a different keyword or asset filter."
        />
      ) : (
        <div className="border border-line rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-panel-2 text-muted text-xs tag-mono uppercase tracking-wide">
                <th className="text-left px-4 py-2.5 font-medium">Document</th>
                <th className="text-left px-4 py-2.5 font-medium">Type</th>
                <th className="text-left px-4 py-2.5 font-medium">Asset</th>
                <th className="text-left px-4 py-2.5 font-medium">Date</th>
                <th className="text-left px-4 py-2.5 font-medium">Format</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => {
                const meta = DOC_TYPE_META[d.type];
                return (
                  <tr
                    key={d.id}
                    onClick={() => setSelectedDoc(d)}
                    className="border-t border-line hover:bg-panel-2/40 transition-colors cursor-pointer"
                  >
                    <td className="px-4 py-3 flex items-center gap-2">
                      <FileText size={14} className="text-muted shrink-0" />
                      <span>{d.title}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full border"
                        style={{ color: meta?.color, borderColor: meta?.color + "55" }}
                      >
                        {meta?.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 tag-mono text-xs text-muted">{d.asset}</td>
                    <td className="px-4 py-3 text-muted text-xs">{d.date}</td>
                    <td className="px-4 py-3 text-muted text-xs uppercase">{d.format}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <DocumentDetailModal doc={selectedDoc} onClose={() => setSelectedDoc(null)} />
    </div>
  );
}