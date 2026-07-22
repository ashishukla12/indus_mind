import { useEffect, useState } from "react";
import { fetchAssets, fetchTimeline } from "../../api/client";
import { DOC_TYPE_META } from "../../mock/data";
import EmptyState from "../common/EmptyState";
import { useToast } from "../common/Toast";

export default function TimelinePage() {
  const [assets, setAssets] = useState([]);
  const [selected, setSelected] = useState("PUMP-101");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const showToast = useToast();

  useEffect(() => {
    fetchAssets().then(setAssets);
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetchTimeline(selected)
      .then((ev) => setEvents(ev))
      .catch(() => {
        setError(true);
        showToast("Failed to load timeline", "error");
      })
      .finally(() => setLoading(false));
  }, [selected, showToast]);

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {assets.map((a) => (
          <button
            key={a.id}
            onClick={() => setSelected(a.id)}
            className={`px-3 py-1.5 rounded-full text-xs tag-mono border transition-colors ${
              selected === a.id
                ? "bg-signal/10 border-signal text-signal"
                : "border-line text-muted hover:text-text hover:border-steel/50"
            }`}
          >
            {a.id}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-sm text-muted">Loading timeline…</p>
      ) : error ? (
        <EmptyState
          type="error"
          title="Couldn't load timeline"
          subtitle="Check your connection and try again."
        />
      ) : events.length === 0 ? (
        <EmptyState
          type="empty"
          title="No timeline events for this asset"
          subtitle="Events will appear here once documents are ingested."
        />
      ) : (
        <div className="relative pl-6">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-line" />
          <div className="space-y-6">
            {events.map((ev, i) => {
              const meta = DOC_TYPE_META[ev.type];
              return (
                <div key={i} className="relative">
                  <div
                    className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full border-2 bg-ink"
                    style={{ borderColor: meta?.color || "#4FB4AC" }}
                  />
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="tag-mono text-xs text-muted">{ev.date}</span>
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full border"
                      style={{ color: meta?.color, borderColor: meta?.color + "55" }}
                    >
                      {meta?.label}
                    </span>
                  </div>
                  <h4 className="text-sm font-medium mt-1">{ev.title}</h4>
                  <p className="text-xs text-muted mt-0.5">{ev.detail}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}