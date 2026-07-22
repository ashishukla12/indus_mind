import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquareText,
  FileStack,
  GitCommitHorizontal,
  UploadCloud, Share2
} from "lucide-react";

const NAV_ITEMS = [
  { id: "dashboard", label: "Overview", icon: LayoutDashboard },
  { id: "chat", label: "Ask Engineer Copilot", icon: MessageSquareText },
  { id: "documents", label: "Documents", icon: FileStack },
  { id: "timeline", label: "Timeline", icon: GitCommitHorizontal },
  { id: "graph", label: "Knowledge Graph", icon: Share2 },
  { id: "upload", label: "Upload", icon: UploadCloud },
];

export default function Sidebar({ active, onNavigate, onLogout }) {
  return (
    <aside className="w-60 shrink-0 border-r border-line bg-panel flex flex-col">
      <div className="px-5 py-5 border-b border-line">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-signal pulse-dot" />
          <span className="tag-mono text-[11px] text-muted uppercase tracking-widest">
            Indus Mind
          </span>
        </div>
        <h1 className="text-lg font-semibold mt-1 leading-tight">
          Engineer Copilot
        </h1>
        <p className="text-[11px] text-muted mt-0.5">
          INDUS Refinery Pvt Ltd
        </p>
      </div>


      
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;

          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                isActive
                  ? "bg-panel-2 text-text border border-line"
                  : "text-muted hover:text-text hover:bg-panel-2/50 border border-transparent"
              }`}
            >
              <Icon
                size={16}
                strokeWidth={2}
                className={isActive ? "text-signal" : ""}
              />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>

      <div className="px-5 py-4 border-t border-line">
        <div className="tag-mono text-[10px] text-muted uppercase tracking-widest mb-1">
          System status
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-steel" />
          <span className="text-muted">Vector index synced</span>
        </div>

        {onLogout && (
          <button
            onClick={onLogout}
            className="mt-3 text-xs text-muted hover:text-critical transition-colors"
          >
            Sign out
          </button>
        )}
      </div>
    </aside>
  );
}