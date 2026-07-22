from fastapi import APIRouter, UploadFile, File
import os
import shutil

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
os.makedirs(UPLOAD_DIR, exist_ok=True)


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
    graph = extract_graph_from_text(text)

    # Step 6 : Save Graph in Neo4j
    graph_status = create_entities_and_relationships(graph)

    # Step 7 : AI Analysis
    analysis = analyze_document(file.filename, text)

    return {
        "status": "success",
        "filename": file.filename,
        "chunks": len(chunks),
        "stored": stored,
        "graph": graph_status,
        "analysis": analysis
    }