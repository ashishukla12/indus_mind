from app.database.chroma import collection
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")


def search_documents(query: str, top_k: int = 5):
    query_embedding = model.encode(query).tolist()

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=top_k
    )

    response = []

    documents = results.get("documents", [[]])[0]
    metadatas = results.get("metadatas", [[]])[0]
    distances = results.get("distances", [[]])[0]

    for doc, meta, distance in zip(documents, metadatas, distances):
        response.append({
            "chunk": doc,
            "source": meta["source"],
            "chunk_number": meta["chunk_number"],
            "distance": distance
        })

    return response