from fastapi import APIRouter
from pydantic import BaseModel

from app.database.neo4j import driver
from app.services.graph_service import create_entities_and_relationships

router = APIRouter(
    prefix="/graph",
    tags=["Knowledge Graph"]
)


class GraphRequest(BaseModel):
    entities: list
    relationships: list


@router.post("/build")
def build_graph(request: GraphRequest):

    return create_entities_and_relationships(
        {
            "entities": request.entities,
            "relationships": request.relationships
        }
    )


@router.get("/view")
def view_graph():

    with driver.session() as session:

        nodes_result = session.run("""
            MATCH (n)
            RETURN
                id(n) AS id,
                n.name AS name,
                n.type AS type
        """)

        relationships_result = session.run("""
            MATCH (a)-[r]->(b)
            RETURN
                id(a) AS source,
                id(b) AS target,
                type(r) AS relation
        """)

        nodes = [
            {
                "id": record["id"],
                "name": record["name"],
                "type": record["type"]
            }
            for record in nodes_result
        ]

        relationships = [
            {
                "source": record["source"],
                "target": record["target"],
                "relation": record["relation"]
            }
            for record in relationships_result
        ]

    return {
        "status": "success",
        "nodes": nodes,
        "relationships": relationships
    }