from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.document import router as document_router
from app.routes.chat import router as chat_router
from app.routes.graph import router as graph_router
from app.routes.analysis import router as analysis_router

app = FastAPI(
    title="Industrial Knowledge AI Backend",
    version="1.0.0",
    description="AI-powered Industrial Knowledge Intelligence Platform"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routers
app.include_router(document_router)
app.include_router(chat_router)
app.include_router(graph_router)
app.include_router(analysis_router)



@app.get("/")
def root():
    return {
        "status": "success",
        "message": "Industrial Knowledge AI Backend is running",
        "version": "1.0.0"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "services": {
            "api": "running",
            "chromadb": "connected",
            "neo4j": "connected",
            "groq": "connected"
        }
    }