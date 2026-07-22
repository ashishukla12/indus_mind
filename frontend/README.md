# INDUS MIND — Frontend

AI Engineer Copilot for Industrial Knowledge Intelligence — React + Vite + Tailwind CSS v4.

## Structure

```
src/
├── api/client.js          # API layer — mock now, swap to real fetch() when backend is ready
├── mock/data.js            # Sample INDUS Refinery corpus (assets, docs, RCA trace, timeline)
├── components/
│   ├── layout/              # Sidebar, Topbar
│   ├── dashboard/            # Overview page
│   ├── chat/                 # Engineer Copilot chat + RCA evidence trace
│   ├── documents/            # Document list + filters
│   ├── timeline/             # Asset event timeline
│   └── upload/                # Document upload / ingestion
└── App.jsx                 # Tab-based shell, no router needed for MVP
```

## Run locally

```bash
npm install
npm run dev
```

## Connecting to the real backend

Everything currently reads from `src/mock/data.js` through `src/api/client.js`.
Once the FastAPI backend is ready:

1. Set `VITE_API_BASE_URL` in a `.env` file (e.g. `VITE_API_BASE_URL=http://localhost:8000`)
2. In `src/api/client.js`, replace each function body with a real `fetch()` call — the
   function signatures and return shapes already match what components expect, so no
   component code should need to change.

## Push to your team's GitHub branch

```bash
git checkout -b frontend        # or: git checkout frontend
git add .
git commit -m "feat: initial frontend — dashboard, chat/RCA, documents, timeline, upload"
git push -u origin frontend
```
