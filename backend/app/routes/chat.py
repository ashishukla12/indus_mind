from fastapi import APIRouter
from pydantic import BaseModel

from app.services.search_service import search_documents
from app.services.rag_service import generate_answer

router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)


class QueryRequest(BaseModel):
    query: str


class QuestionRequest(BaseModel):
    question: str


@router.post("/search")
def semantic_search(request: QueryRequest):

    results = search_documents(request.query)

    return {
        "query": request.query,
        "results": results
    }


@router.post("/ask")
def ask_ai(request: QuestionRequest):

    return generate_answer(request.question)
