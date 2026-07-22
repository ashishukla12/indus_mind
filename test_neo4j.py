from app.database.neo4j import driver

driver.verify_connectivity()

print("✅ Connected Successfully")

driver.close()