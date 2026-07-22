import { useState } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

import DashboardPage from "../dashboard/DashboardPage";
import ChatPage from "../chat/ChatPage";
import DocumentsPage from "../documents/DocumentsPage";
import TimelinePage from "../timeline/TimelinePage";
import KnowledgeGraphPage from "../knowledge-graph/knowledgeGraphPage";
import UploadPage from "../upload/UploadPage";

export default function DashboardLayout() {
  const [active, setActive] = useState("dashboard");

  const pageConfig = {
    dashboard: {
      title: "Dashboard",
      subtitle: "Industrial Intelligence Overview",
      component: <DashboardPage />,
    },
    chat: {
      title: "Engineer Copilot",
      subtitle: "Ask questions about refinery documents",
      component: <ChatPage />,
    },
    documents: {
      title: "Documents",
      subtitle: "Browse refinery documents",
      component: <DocumentsPage />,
    },
    timeline: {
      title: "Timeline",
      subtitle: "Activity history",
      component: <TimelinePage />,
    },
    graph: {
      title: "Knowledge Graph",
      subtitle: "Equipment relationships",
      component: <KnowledgeGraphPage />,
    },
    upload: {
      title: "Upload",
      subtitle: "Upload new refinery documents",
      component: <UploadPage />,
    },
  };

  const current = pageConfig[active];

  return (
    <div className="flex h-screen bg-ink text-text">
      <Sidebar
            active={active}
            onNavigate={setActive}
            onLogout={() => {
                localStorage.clear();
                window.location.href = "/login";
            }}
        />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar
          title={current.title}
          subtitle={current.subtitle}
        />

        <main className="flex-1 overflow-auto">
          {current.component}
        </main>
      </div>
    </div>
  );
}