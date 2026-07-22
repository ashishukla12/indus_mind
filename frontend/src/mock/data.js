// Mock data — mirrors the shape the real FastAPI backend will return.
// Swap functions in src/api/client.js from mock -> real fetch() once
// backend endpoints are live; component code will not need to change.

export const ASSETS = [
  { id: "PUMP-101", name: "Pump-101", type: "Centrifugal Pump", area: "Unit 3 - Feed", status: "critical" },
  { id: "PUMP-102", name: "Pump-102", type: "Centrifugal Pump", area: "Unit 3 - Feed", status: "normal" },
  { id: "COMP-101", name: "Compressor-101", type: "Reciprocating Compressor", area: "Unit 2", status: "warning" },
  { id: "HX-101", name: "Heat Exchanger HX-101", type: "Shell & Tube", area: "Unit 1", status: "normal" },
  { id: "B-101", name: "Boiler B-101", type: "Fire-tube Boiler", area: "Utilities", status: "normal" },
  { id: "V-203", name: "Valve V-203", type: "Gate Valve", area: "Unit 3", status: "warning" },
  { id: "TK-101", name: "Tank TK-101", type: "Storage Tank", area: "Tank Farm", status: "normal" },
  { id: "DC-01", name: "Distillation Column DC-01", type: "Column", area: "Unit 1", status: "normal" },
  { id: "PV-01", name: "Pressure Vessel PV-01", type: "Vessel", area: "Unit 2", status: "normal" },
  { id: "CT-01", name: "Cooling Tower CT-01", type: "Cooling Tower", area: "Utilities", status: "normal" },
];

export const DOCUMENTS = [
  { id: "doc-01", title: "Flowserve Centrifugal Pump Manual - Series 3600", type: "manual", format: "pdf", asset: "PUMP-101", date: "2022-01-10", pages: 84 },
  { id: "doc-02", title: "Inspection Report - Pump-101", type: "inspection", format: "pdf", asset: "PUMP-101", date: "2024-11-02", pages: 3 },
  { id: "doc-03", title: "Maintenance Report - Pump-101 Bearing Wear", type: "maintenance", format: "pdf", asset: "PUMP-101", date: "2025-03-15", pages: 2 },
  { id: "doc-04", title: "Incident Report - Pump-101 High Vibration Trip", type: "incident", format: "pdf", asset: "PUMP-101", date: "2025-08-22", pages: 4 },
  { id: "doc-05", title: "WO-1042 - Bearing Replacement", type: "work_order", format: "pdf", asset: "PUMP-101", date: "2025-08-25", pages: 1 },
  { id: "doc-06", title: "Email - RE: Pump-101 vibration increasing", type: "email", format: "eml", asset: "PUMP-101", date: "2025-08-18", pages: 1 },
  { id: "doc-07", title: "SOP - Pump Startup Procedure", type: "sop", format: "pdf", asset: "PUMP-101", date: "2023-06-01", pages: 6 },
  { id: "doc-08", title: "P&ID - Unit 3 Feed Section", type: "drawing", format: "png", asset: "PUMP-101", date: "2021-09-14", pages: 1 },
  { id: "doc-09", title: "Inspection Report - Compressor-101 Oil Leakage", type: "inspection", format: "pdf", asset: "COMP-101", date: "2025-05-10", pages: 2 },
  { id: "doc-10", title: "Maintenance Schedule - Q3 2025", type: "spreadsheet", format: "xlsx", asset: "ALL", date: "2025-07-01", pages: 1 },
  { id: "doc-11", title: "LOTO Safety Procedure", type: "safety", format: "pdf", asset: "ALL", date: "2022-03-20", pages: 5 },
  { id: "doc-12", title: "Incident Report - Valve-203 Seal Failure", type: "incident", format: "pdf", asset: "V-203", date: "2025-05-10", pages: 3 },
];

export const DOC_TYPE_META = {
  manual: { label: "OEM Manual", color: "#4FB4AC" },
  inspection: { label: "Inspection Report", color: "#F5A623" },
  maintenance: { label: "Maintenance Report", color: "#F5A623" },
  incident: { label: "Incident Report", color: "#E5573D" },
  work_order: { label: "Work Order", color: "#7C93A8" },
  email: { label: "Email", color: "#7C93A8" },
  sop: { label: "SOP", color: "#4FB4AC" },
  drawing: { label: "Engineering Drawing", color: "#4FB4AC" },
  spreadsheet: { label: "Spreadsheet", color: "#7C93A8" },
  safety: { label: "Safety Procedure", color: "#E5573D" },
};

// A pre-baked RCA-style answer for the flagship demo query:
// "Why did Pump-101 fail?"
export const SAMPLE_RCA_RESPONSE = {
  query: "Why did Pump-101 fail?",
  answer:
    "Pump-101 tripped on high vibration on 22 Aug 2025. The evidence trail points to a progressive bearing wear failure that was flagged but not acted on in time. The Nov 2024 inspection first noted early-stage bearing wear as a medium-severity finding. No corrective work order was raised at that time. By Aug 2025, an engineer emailed the maintenance team warning that vibration levels were increasing on the pump, three days before the trip. The maintenance report confirms bearing wear as the root cause, and WO-1042 closed the loop with a full bearing replacement.",
  confidence: "High",
  trace: [
    { docId: "doc-02", label: "Inspection Report", date: "2024-11-02", note: "Early bearing wear flagged, medium severity" },
    { docId: "doc-06", label: "Email Warning", date: "2025-08-18", note: "Engineer flags rising vibration" },
    { docId: "doc-04", label: "Incident Report", date: "2025-08-22", note: "High vibration trip, pump shut down" },
    { docId: "doc-03", label: "Maintenance Report", date: "2025-08-23", note: "Bearing wear confirmed as cause" },
    { docId: "doc-05", label: "Work Order WO-1042", date: "2025-08-25", note: "Bearing replaced, pump restored" },
  ],
  citations: [
    { docId: "doc-02", snippetRef: "p.2" },
    { docId: "doc-06", snippetRef: "thread" },
    { docId: "doc-04", snippetRef: "p.1" },
    { docId: "doc-03", snippetRef: "p.1" },
    { docId: "doc-05", snippetRef: "p.1" },
  ],
};

export const TIMELINE_BY_ASSET = {
  "PUMP-101": [
    { date: "2022-01-10", type: "manual", title: "OEM manual indexed", detail: "Flowserve Series 3600 manual added to knowledge base" },
    { date: "2023-06-01", type: "sop", title: "Startup SOP issued", detail: "Standard startup procedure published for Unit 3" },
    { date: "2024-11-02", type: "inspection", title: "Inspection - bearing wear flagged", detail: "Medium severity, no immediate action taken" },
    { date: "2025-08-18", type: "email", title: "Vibration warning email", detail: "Engineer flags rising vibration levels" },
    { date: "2025-08-22", type: "incident", title: "High vibration trip", detail: "Pump-101 tripped and shut down automatically" },
    { date: "2025-08-23", type: "maintenance", title: "Root cause confirmed", detail: "Bearing wear identified as the failure cause" },
    { date: "2025-08-25", type: "work_order", title: "WO-1042 closed", detail: "Bearing replaced, pump returned to service" },
  ],
};

export const DASHBOARD_STATS = {
  totalDocuments: 148,
  totalAssets: 10,
  openIncidents: 2,
  avgTimeToAnswer: "6.2s",
  documentsByType: [
    { type: "Manuals", count: 20 },
    { type: "SOPs", count: 15 },
    { type: "Maintenance", count: 30 },
    { type: "Inspection", count: 20 },
    { type: "Incident", count: 20 },
    { type: "Work Orders", count: 30 },
    { type: "Drawings", count: 10 },
    { type: "Other", count: 3 },
  ],
  recentActivity: [
    { text: "Incident Report - Pump-101 High Vibration Trip ingested", time: "2h ago" },
    { text: "WO-1042 closed for Pump-101", time: "5h ago" },
    { text: "Inspection Report - Compressor-101 uploaded", time: "1d ago" },
    { text: "Maintenance Schedule Q3 2025 parsed", time: "3d ago" },
  ],
};


// Knowledge Graph — entities extracted across documents, and how they connect.
// Real backend will populate this from NER + relationship extraction over the corpus.
export const KNOWLEDGE_GRAPH = {
  nodes: [
    { id: "PUMP-101", label: "Pump-101", type: "asset", x: 400, y: 220 },
    { id: "doc-02", label: "Inspection Report", type: "document", x: 180, y: 100 },
    { id: "doc-06", label: "Email Warning", type: "document", x: 620, y: 100 },
    { id: "doc-04", label: "Incident Report", type: "document", x: 620, y: 340 },
    { id: "doc-03", label: "Maintenance Report", type: "document", x: 180, y: 340 },
    { id: "doc-05", label: "WO-1042", type: "document", x: 400, y: 420 },
    { id: "bearing", label: "Drive-end Bearing", type: "component", x: 400, y: 60 },
    { id: "j-rao", label: "J. Rao", type: "person", x: 620, y: 420 },
  ],
  edges: [
    { from: "doc-02", to: "PUMP-101", label: "inspects" },
    { from: "doc-06", to: "PUMP-101", label: "warns about" },
    { from: "doc-04", to: "PUMP-101", label: "reports on" },
    { from: "doc-03", to: "PUMP-101", label: "diagnoses" },
    { from: "doc-05", to: "PUMP-101", label: "repairs" },
    { from: "PUMP-101", to: "bearing", label: "has component" },
    { from: "doc-05", to: "j-rao", label: "assigned to" },
    { from: "doc-03", to: "bearing", label: "identifies fault in" },
  ],
};