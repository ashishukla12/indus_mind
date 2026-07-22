from fastapi import APIRouter

router=APIRouter()

@router.get("/health")
def health():

    return{
        "status":"healthy",
        "chromadb":"ok",
        "neo4j":"ok",
        "groq":"ok"
    }