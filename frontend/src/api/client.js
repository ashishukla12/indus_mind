// Thin API layer. Every function currently resolves from mock data.
// When the FastAPI backend is ready, replace the body of each function
// with a real fetch() call — components should not need to change,
// since they only depend on the shape returned here.
//
// Example real implementation:
// export async function sendChatQuery(query) {
//   const res = await fetch(`${BASE_URL}/api/chat`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ query }),
//   });
//   if (!res.ok) throw new Error("Chat request failed");
//   return res.json();
// }
import {
  ASSETS,
  DOCUMENTS,
  SAMPLE_RCA_RESPONSE,
  TIMELINE_BY_ASSET,
  DASHBOARD_STATS,
} from "../mock/data";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

export async function fetchAssets() {
  const res = await fetch(`${BASE_URL}/api/assets`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Failed to fetch assets");
  return res.json();
}

export async function fetchDocuments({ asset, type } = {}) {
  await delay(250);
  return DOCUMENTS.filter(
    (d) =>
      (!asset || asset === "ALL" || d.asset === asset || d.asset === "ALL") &&
      (!type || type === "ALL" || d.type === type)
  );
}

export async function fetchTimeline(assetId) {
  await delay(200);
  return TIMELINE_BY_ASSET[assetId] || [];
}

export async function fetchDashboardStats() {
  await delay(150);
  return DASHBOARD_STATS;
}

const COMPRESSOR_RESPONSE = {
  answer:
    "Compressor-101 has one open finding: an oil leakage detected during the May 2025 inspection, rated medium severity. No incident or work order has been logged against it since, so this remains an outstanding item for the maintenance team to review.",
  confidence: "Medium",
  trace: [
    { docId: "doc-09", label: "Inspection Report", date: "2025-05-10", note: "Oil leakage detected, medium severity" },
  ],
  citations: [{ docId: "doc-09", snippetRef: "p.1" }],
};

const EARLY_WARNING_RESPONSE = {
  answer:
    "Yes. Two separate early warnings preceded the Pump-101 trip on 22 Aug 2025. The first was the Nov 2024 inspection, which flagged early-stage bearing wear as a medium-severity finding but did not trigger a work order. The second was an email on 18 Aug 2025, four days before the trip, where an engineer noted rising vibration during rounds. Neither warning was escalated into corrective action before the failure occurred.",
  confidence: "High",
  trace: [
    { docId: "doc-02", label: "Inspection Report", date: "2024-11-02", note: "Early bearing wear flagged, medium severity" },
    { docId: "doc-06", label: "Email Warning", date: "2025-08-18", note: "Engineer flags rising vibration" },
  ],
  citations: [
    { docId: "doc-02", snippetRef: "p.2" },
    { docId: "doc-06", snippetRef: "thread" },
  ],
};

export async function sendChatQuery(query) {

  const res = await fetch(`${BASE_URL}/chat/ask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      question: query
    })
  });

  if (!res.ok) {
    throw new Error("Chat request failed");
  }

  return await res.json();
}

export async function uploadDocument(file) {
  await delay(600);
  return { id: `doc-${Date.now()}`, title: file?.name || "Untitled", status: "processed" };
}
