import psycopg2
from config import POSTGRES_CONFIG

def execute_sql_file(filename):
    conn = psycopg2.connect(**POSTGRES_CONFIG)
    cur = conn.cursor()

    with open(filename, "r", encoding="utf-8") as f:
        sql = f.read()

    try:
        cur.execute(sql)
        conn.commit()
        print("✅ Mock data berhasil dimasukkan ke database pinterin.")
    except Exception as e:
        conn.rollback()
        print("❌ Terjadi kesalahan saat insert mock data:", e)
    finally:
        cur.close()
        conn.close()

if __name__ == "__main__":
    execute_sql_file("postgres/mock_data.sql")
