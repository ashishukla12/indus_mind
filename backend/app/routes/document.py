from fastapi import APIRouter, UploadFile, File
import os
import shutil
from collections import Counter
import json
from fastapi import HTTPException

from app.services.pdf_service import extract_text
from app.services.chunk_service import chunk_text
from app.services.metadata_service import create_metadata
from app.services.embedding_service import store_chunks

from app.services.graph_service import (
    extract_graph_from_text,
    create_entities_and_relationships
)

from app.services.analysis_service import analyze_document

router = APIRouter(
    prefix="/documents",
    tags=["Documents"]
)

UPLOAD_DIR = "data/uploads"
ANALYSIS_DIR = "data/analysis"

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(ANALYSIS_DIR, exist_ok=True)


@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):

    filepath = os.path.join(UPLOAD_DIR, file.filename)

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Step 1 : Extract PDF Text
    text = extract_text(filepath)

    # Step 2 : Chunk Text
    chunks = chunk_text(text)

    # Step 3 : Metadata
    metadata = create_metadata(file.filename, chunks)

    # Step 4 : Store Embeddings
    stored = store_chunks(chunks, metadata)

    # Step 5 : Extract Knowledge Graph
    graph = extract_graph_from_text(text[:12000])

    # Step 6 : Save Graph in Neo4j
    graph_status = create_entities_and_relationships(graph)

    # Step 7 : AI Analysis
    analysis = analyze_document(file.filename, text[:12000])

    # Step 8 : Save Analysis
    analysis_file = os.path.join(
        ANALYSIS_DIR,
        f"{os.path.splitext(file.filename)[0]}.json"
    )

    with open(analysis_file, "w", encoding="utf-8") as f:
        json.dump(analysis, f, indent=2, ensure_ascii=False)

    return {
        "status": "success",
        "filename": file.filename,
        "chunks": len(chunks),
        "stored": stored,
        "graph": graph_status,
        "analysis": analysis
    }

@router.get("/")
async def get_documents():

    documents = []

    if not os.path.exists(UPLOAD_DIR):
        return {
            "status": "success",
            "documents": []
        }

    for filename in os.listdir(UPLOAD_DIR):

        filepath = os.path.join(UPLOAD_DIR, filename)

        if os.path.isfile(filepath):

            documents.append({
                "id": filename,
                "name": filename,
                "type": filename.split(".")[-1].upper(),
                "size_kb": round(os.path.getsize(filepath) / 1024, 2),
                "uploaded_at": os.path.getctime(filepath)
            })

    documents.sort(
        key=lambda x: x["uploaded_at"],
        reverse=True
    )

    return {
        "status": "success",
        "count": len(documents),
        "documents": documents
    }


@router.get("/dashboard")
async def dashboard():

    documents = []

    if os.path.exists(UPLOAD_DIR):

        for filename in os.listdir(UPLOAD_DIR):

            path = os.path.join(UPLOAD_DIR, filename)

            if os.path.isfile(path):
                documents.append({
                    "name": filename,
                    "type": filename.split(".")[-1].upper(),
                    "size": round(os.path.getsize(path)/1024,2),
                    "uploaded_at": os.path.getctime(path)
                })

    type_counter = Counter(d["type"] for d in documents)

    recent = sorted(
        documents,
        key=lambda x: x["uploaded_at"],
        reverse=True
    )[:5]

    return {
        "totalDocuments": len(documents),
        "totalAssets": len(documents),          # temporary
        "openIncidents": 0,
        "avgTimeToAnswer": "1.2 s",

        "documentsByType": [
            {
                "type": k,
                "count": v
            }
            for k, v in type_counter.items()
        ],

        "recentActivity": [
            {
                "text": f"Uploaded {d['name']}",
                "time": "Just now"
            }
            for d in recent
        ]
    }


@router.get("/analysis/{filename}")
async def get_analysis(filename: str):

    name = os.path.splitext(filename)[0]

    path = os.path.join(
        ANALYSIS_DIR,
        f"{name}.json"
    )

    if not os.path.exists(path):
        raise HTTPException(
            status_code=404,
            detail="Analysis not found"
        )

    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)