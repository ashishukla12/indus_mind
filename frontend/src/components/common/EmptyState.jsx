import { Inbox, AlertCircle } from "lucide-react";

export default function EmptyState({ type = "empty", title, subtitle }) {
  const Icon = type === "error" ? AlertCircle : Inbox;
  const color = type === "error" ? "#E5573D" : "#7C93A8";

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Icon size={28} style={{ color }} className="mb-3" />
      <p className="text-sm text-text">{title}</p>
      {subtitle && <p className="text-xs text-muted mt-1">{subtitle}</p>}
    </div>
  );
}