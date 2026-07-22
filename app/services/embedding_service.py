from sentence_transformers import SentenceTransformer
from app.database.chroma import collection

# Load embedding model once
model = SentenceTransformer("all-MiniLM-L6-v2")


def store_chunks(chunks, metadata):
    """
    Generate embeddings for chunks and store them in ChromaDB.
    """

    embeddings = model.encode(chunks).tolist()

    ids = [
        f"{metadata[i]['source']}_{metadata[i]['chunk_number']}"
        for i in range(len(chunks))
    ]

    collection.add(
        ids=ids,
        documents=chunks,
        embeddings=embeddings,
        metadatas=metadata
    )

    return len(chunks)