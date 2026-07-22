import json
import os

from groq import Groq

from app.database.neo4j import driver

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


def extract_graph_from_text(text: str):

    prompt = f"""
Extract entities and relationships from the text.

Return ONLY valid JSON.

Format:

{{
    "entities":[
        {{
            "name":"Pump",
            "type":"Equipment"
        }}
    ],
    "relationships":[
        {{
            "source":"Pump",
            "relation":"CONNECTED_TO",
            "target":"Motor"
        }}
    ]
}}

Text:

{text}
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        temperature=0,
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


def create_entities_and_relationships(graph):

    with driver.session() as session:

        for entity in graph["entities"]:

            session.run(
                """
                MERGE (e:Entity {name:$name})
                SET e.type=$type
                """,
                name=entity["name"],
                type=entity["type"]
            )

        for relation in graph["relationships"]:

            session.run(
                f"""
                MATCH (a:Entity {{name:$source}})
                MATCH (b:Entity {{name:$target}})
                MERGE (a)-[:{relation['relation']}]->(b)
                """,
                source=relation["source"],
                target=relation["target"]
            )

    return {
        "status": "success",
        "entities": len(graph["entities"]),
        "relationships": len(graph["relationships"])
    }