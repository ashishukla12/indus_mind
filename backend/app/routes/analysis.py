import os
import shutil

from fastapi import APIRouter, File, UploadFile

from app.services.analysis_service import analyze_document
from app.services.pdf_service import extract_text

router = APIRouter(
    prefix="/analysis",
    tags=["Analysis"]
)

UPLOAD_DIR = "data/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/run")
async def run_analysis(file: UploadFile = File(...)):

    filepath = os.path.join(UPLOAD_DIR, file.filename)

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    text = extract_text(filepath)

    return analyze_document(file.filename, text)