import oracledb

def get_db_connection():
    dsn = oracledb.makedsn("localhost", 1521, service_name="FREE")
    connection = oracledb.connect(user="CARTEO", password="CARTEO", dsn=dsn)
    return connection