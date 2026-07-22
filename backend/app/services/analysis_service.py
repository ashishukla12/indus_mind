import json
import os

from groq import Groq

from app.services.graph_service import extract_graph_from_text
from app.services.metadata_service import create_metadata

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


def generate_summary(text):

    prompt = f"""
Summarize this industrial document.

Return:
- Purpose
- Key Equipment
- Process
- Safety Notes

Document:
{text}
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        temperature=0.2,
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content


def generate_questions(text):

    prompt = f"""
Generate 5 industrial engineering questions.

Return ONLY JSON array.

Document:

{text}
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        temperature=0.2,
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    content = response.choices[0].message.content.strip()

    if content.startswith("```"):
        content = (
            content.replace("```json", "")
            .replace("```", "")
            .strip()
        )

    return json.loads(content)


def analyze_document(filename, text):

    summary = generate_summary(text[:12000])

    graph = extract_graph_from_text(text[:12000])

    metadata = create_metadata(filename, [text])

    questions = generate_questions(text[:12000])

    return {
        "status": "success",
        "summary": summary,
        "metadata": metadata,
        "knowledge_graph": graph,
        "suggested_questions": questions
    }