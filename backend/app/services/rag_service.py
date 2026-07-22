import os

from dotenv import load_dotenv
from groq import Groq

from app.services.search_service import search_documents

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def generate_answer(question: str):

    results = search_documents(question)

    if not results:
        return {
            "answer": "I could not find any relevant information in the uploaded documents.",
            "confidence": "Low",
            "trace": [],
            "citations": []
        }

    context = "\n\n".join(
        item["chunk"] for item in results
    )

    prompt = f"""
You are an Industrial AI Engineer assistant.

Answer ONLY from the provided context.

If the answer is not present, reply:
"I don't have enough information in the uploaded documents."

Context:
{context}

Question:
{question}
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        temperature=0.2,
        messages=[
            {
                "role": "system",
                "content": "You answer industrial engineering questions."
            },
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return {
        "answer": response.choices[0].message.content,
        "confidence": "High",
        "trace": [
            {
                "docId": f"doc-{i+1}",
                "label": item["source"],
                "date": "",
                "note": f"Retrieved from Chunk {item['chunk_number']}"
            }
            for i, item in enumerate(results)
        ],
        "citations": [
            {
                "docId": f"doc-{i+1}",
                "snippetRef": f"Chunk {item['chunk_number']}"
            }
            for i, item in enumerate(results)
        ]
    }
