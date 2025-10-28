from postgres.postgres_client import fetch_all, execute
from qdrant.qdrant_client import qdrant
from openai import OpenAI
from uuid import uuid4
import os
from dotenv import load_dotenv

load_dotenv()
openai = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_embedding(text: str):
    response = openai.embeddings.create(
        model="text-embedding-3-large",
        input=text
    )
    return response.data[0].embedding

def sync_table_to_qdrant(table_name, id_field, text_fields, collection):
    rows = fetch_all(f"SELECT {id_field}, {', '.join(text_fields)} FROM {table_name}")

    for row in rows:
        combined_text = " ".join(str(row[field]) for field in text_fields if row[field])
        vector = generate_embedding(combined_text)
        embedding_id = str(uuid4())

        # Upload to Qdrant
        qdrant.upsert(
            collection_name=collection,
            points=[{
                "id": embedding_id,
                "vector": vector,
                "payload": row
            }]
        )

        # Update reference in PostgreSQL
        execute(f"UPDATE {table_name} SET embedding_id = %s WHERE {id_field} = %s", (embedding_id, row[id_field]))

        print(f"Synced {table_name}:{row[id_field]} → Qdrant({collection})")

# Example usage:
if __name__ == "__main__":
    sync_table_to_qdrant("materials", "material_id", ["title", "content"], "materials_embeddings")
    sync_table_to_qdrant("questions", "question_id", ["question_text", "explanation"], "questions_embeddings")
    sync_table_to_qdrant("generated_questions", "gen_id", ["question_text", "ai_explanation"], "generated_embeddings")
