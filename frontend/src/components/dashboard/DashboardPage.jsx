import { useEffect, useState } from "react";
import { fetchDashboardStats, fetchAssets } from "../../api/client";
import { FileStack, Boxes, AlertTriangle, Timer } from "lucide-react";

const STATUS_COLOR = {
  critical: "#E5573D",
  warning: "#F5A623",
  normal: "#4FB4AC",
};

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    fetchDashboardStats().then(setStats);
    fetchAssets().then(setAssets);
  }, []);

  if (!stats) return <div className="p-6 text-sm text-muted">Loading overview…</div>;

  const maxCount = Math.max(...stats.documentsByType.map((d) => d.count));

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={FileStack} label="Documents indexed" value={stats.totalDocuments} />
        <StatCard icon={Boxes} label="Assets tracked" value={stats.totalAssets} />
        <StatCard icon={AlertTriangle} label="Open incidents" value={stats.openIncidents} accent="critical" />
        <StatCard icon={Timer} label="Avg. time to answer" value={stats.avgTimeToAnswer} accent="steel" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 border border-line rounded-lg bg-panel p-5">
          <p className="tag-mono text-[10px] uppercase tracking-widest text-muted mb-4">Documents by category</p>
          <div className="space-y-2.5">
            {stats.documentsByType.map((d) => (
              <div key={d.type} className="flex items-center gap-3">
                <span className="text-xs text-muted w-24 shrink-0">{d.type}</span>
                <div className="flex-1 h-2 bg-panel-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-steel rounded-full"
                    style={{ width: `${(d.count / maxCount) * 100}%` }}
                  />
                </div>
                <span className="tag-mono text-xs text-muted w-6 text-right">{d.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-line rounded-lg bg-panel p-5">
          <p className="tag-mono text-[10px] uppercase tracking-widest text-muted mb-4">Recent activity</p>
          <div className="space-y-3">
            {stats.recentActivity.map((a, i) => (
              <div key={i} className="text-xs">
                <p className="text-text leading-snug">{a.text}</p>
                <p className="text-muted mt-0.5">{a.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border border-line rounded-lg bg-panel p-5">
        <p className="tag-mono text-[10px] uppercase tracking-widest text-muted mb-4">Asset status</p>
        <div className="grid grid-cols-5 gap-3">
          {assets.map((a) => (
            <div key={a.id} className="border border-line rounded-md px-3 py-2.5 bg-panel-2/40">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: STATUS_COLOR[a.status] }} />
                <span className="tag-mono text-[10px] text-muted uppercase">{a.status}</span>
              </div>
              <p className="text-sm font-medium">{a.id}</p>
              <p className="text-[11px] text-muted">{a.type}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, accent }) {
  const color = accent === "critical" ? "#E5573D" : accent === "steel" ? "#4FB4AC" : "#F5A623";
  return (
    <div className="border border-line rounded-lg bg-panel p-4">
      <div className="flex items-center gap-2 mb-3">
        <Icon size={14} style={{ color }} />
        <span className="text-xs text-muted">{label}</span>
      </div>
      <p className="text-2xl font-semibold tag-mono">{value}</p>
    </div>
  );
}
