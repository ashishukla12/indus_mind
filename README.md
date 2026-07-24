# 🚀 INDUS MIND – AI Engineer Copilot for Industrial Knowledge Intelligence

![Status](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)
![Hackathon](https://img.shields.io/badge/ET%20AI%20Hackathon-2026-orange)

## 📌 Overview

**INDUS MIND** is an AI-powered Industrial Knowledge Intelligence Platform designed to help engineers quickly access, understand, and analyze industrial documents.

The platform combines **Retrieval-Augmented Generation (RAG)**, **Knowledge Graphs**, **Semantic Search**, and **Document Intelligence** to reduce the time engineers spend searching through manuals, SOPs, maintenance documents, and technical reports.

---

## ✨ Features

- 🤖 AI Engineer Copilot
- 📄 Intelligent Document Upload & Processing
- 🔍 Semantic Search
- 🧠 Retrieval-Augmented Generation (RAG)
- 🕸 Knowledge Graph Visualization
- 📊 Dashboard & Analytics
- 📅 Timeline & Activity Tracking
- 📁 Document Management
- ⚡ Modern Responsive UI
- 🔐 Authentication (Login & Signup)

---

# 🏗️ Architecture

```
                 Industrial Documents
                         │
                         ▼
                 Document Processing
          (OCR + Parsing + Chunking)
                         │
                         ▼
                  Vector Database
                     (ChromaDB)
                         │
                         ▼
                  Retrieval Engine
                    (Semantic Search)
                         │
                         ▼
                  LLM + RAG Pipeline
                         │
                         ▼
                 AI Engineer Copilot
                         │
                         ▼
              React Frontend Dashboard
```

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- Framer Motion
- React Router
- Lucide Icons

## Backend

- FastAPI
- Python

## AI Stack

- RAG Pipeline
- ChromaDB
- Neo4j
- EasyOCR
- Embedding Models
- Semantic Search

## Database

- ChromaDB
- Neo4j

---

# 📂 Project Structure

```
indus_mind/
│
├── README.md
├── LICENSE
│
├── frontend/
│   ├── public/
│   │   ├── favicon.svg
│   │   ├── icons.svg
│   │   └── images/
│   │       └── refinery.png
│   │
│   ├── src/
│   │   ├── api/
│   │   │   └── client.js
│   │   │
│   │   ├── assets/
│   │   │   ├── hero.png
│   │   │   ├── react.svg
│   │   │   └── vite.svg
│   │   │
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   ├── LoginPage.jsx
│   │   │   │   └── SignupPage.jsx
│   │   │   │
│   │   │   ├── chat/
│   │   │   │   └── ChatPage.jsx
│   │   │   │
│   │   │   ├── common/
│   │   │   │   ├── EmptyState.jsx
│   │   │   │   └── Toast.jsx
│   │   │   │
│   │   │   ├── dashboard/
│   │   │   │   └── DashboardPage.jsx
│   │   │   │
│   │   │   ├── documents/
│   │   │   │   ├── DocumentDetailModal.jsx
│   │   │   │   └── DocumentsPage.jsx
│   │   │   │
│   │   │   ├── home/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Hero.jsx
│   │   │   │   ├── Features.jsx
│   │   │   │   ├── Workflow.jsx
│   │   │   │   ├── Stats.jsx
│   │   │   │   ├── About.jsx
│   │   │   │   ├── Team.jsx
│   │   │   │   └── Footer.jsx
│   │   │   │
│   │   │   ├── knowledge-graph/
│   │   │   │   └── knowledgeGraphPage.jsx
│   │   │   │
│   │   │   ├── layout/
│   │   │   │   ├── DashboardLayout.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   └── Topbar.jsx
│   │   │   │
│   │   │   ├── timeline/
│   │   │   │   └── TimelinePage.jsx
│   │   │   │
│   │   │   └── upload/
│   │   │       └── UploadPage.jsx
│   │   │
│   │   ├── mock/
│   │   │   └── data.js
│   │   │
│   │   ├── pages/
│   │   │   └── Home.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── postcss.config.js
│
├── backend/
│   ├── app/
│   │   ├── database/
│   │   │   ├── chroma.py
│   │   │   └── neo4j.py
│   │   │
│   │   ├── routes/
│   │   │   ├── health.py
│   │   │   ├── chat.py
│   │   │   ├── document.py
│   │   │   ├── analysis.py
│   │   │   └── graph.py
│   │   │
│   │   ├── services/
│   │   │   ├── pdf_service.py
│   │   │   ├── chunk_service.py
│   │   │   ├── embedding_service.py
│   │   │   ├── metadata_service.py
│   │   │   ├── graph_service.py
│   │   │   ├── rag_service.py
│   │   │   ├── analysis_service.py
│   │   │   └── search_service.py
│   │   │
│   │   └── main.py
│   │
│   ├── data/
│   │   ├── chroma/
│   │   └── uploads/
│   │
│   ├── requirements.txt
│   ├── test_neo4j.py
│   └── .env
│
└── docs/ (recommended)
```

# High-Level Architecture
```
indus_mind/
│
├── frontend/                  # React + Vite UI
│   ├── Authentication
│   ├── Dashboard
│   ├── Document Upload
│   ├── AI Chat
│   ├── Knowledge Graph
│   ├── Timeline
│   └── Landing Page
│
├── backend/                   # FastAPI Backend
│   ├── API Routes
│   ├── AI Services
│   ├── Database Layer
│   ├── Vector Search (ChromaDB)
│   ├── Knowledge Graph (Neo4j)
│   └── RAG Pipeline
│
├── docs/                      # Documentation
├── docker/                    # Docker files (recommended)
├── tests/                     # Unit Tests (recommended)
├── docker-compose.yml          # Container orchestration (recommended)
├── README.md
└── LICENSE
```



---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/AdityaDwivedi-1/industrial-knowledge-ai.git
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## Backend

```bash
cd backend

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend runs on:

```
http://localhost:8000
```

---

# 📸 Application Modules

### 🏠 Landing Page

- Product Overview
- Features
- Workflow
- Team

---

### 🔐 Authentication

- Login
- Signup
- Secure Access

---

### 📊 Dashboard

- AI Statistics
- System Health
- Activity Overview

---

### 💬 AI Engineer Copilot

- Natural Language Question Answering
- Context-Aware Responses
- Document Grounded Answers

---

### 📄 Document Management

- Upload PDF
- Search Documents
- Document Preview

---

### 🕸 Knowledge Graph

- Equipment Relationships
- Process Connections
- Entity Visualization

---

### 📅 Timeline

- User Activity
- Document History
- Processing Events

---

# 🔮 Future Enhancements

- Voice-based AI Assistant
- Multi-language Support
- Predictive Maintenance
- Real-time Collaboration
- Mobile Application
- IoT Sensor Integration
- Enterprise Authentication
- Cloud Deployment

---

# 👨‍💻 Contributors

- Aryan Mishra — Frontend Development
- Aditya Dwivedi — AI Engineer
- Ashish Shukla — Backend Development

---

# 📄 License

This project is licensed under the MIT License.

---

# 🙏 Acknowledgements

- ET AI Hackathon 2026
- React
- FastAPI
- ChromaDB
- Neo4j
- Tailwind CSS
- Vite
- Open Source Community

---

⭐ If you found this project interesting, consider giving the repository a star!
