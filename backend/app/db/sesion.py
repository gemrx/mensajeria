import secrets
from datetime import datetime, timedelta
from .database import get_db_connection

def crear_sesion(email: str, duracion_segundos: int):
    # Generar un token de sesión seguro
    session_token = secrets.token_hex(16)  # Genera un token hexadecimal de 32 caracteres (16 bytes)

    # Calcular la fecha de expiración basada en la duración proporcionada (en segundos)
    expiracion = datetime.now() + timedelta(seconds=duracion_segundos)

    connection = get_db_connection()
    cursor = connection.cursor()
    try:
        cursor.execute("""
            INSERT INTO CART_SESION (SESI_CODIGO, SESI_EMAIL, SESI_EXPIRACION, SESI_ACTIVA)
            VALUES (:codigo, :email, :expiracion, :activa)
        """, {
            'codigo': session_token,
            'email': email,
            'expiracion': expiracion,
            'activa': 1
        })
        connection.commit()
        return {'session_token': session_token}
    except Exception as e:
        print(f"Ocurrió un error: {e}")
        connection.rollback()
        return None
    finally:
        cursor.close()
        connection.close()

def verificar_sesion(session_token: str):
    connection = get_db_connection()
    cursor = connection.cursor()
    try:
        cursor.execute(""" 
            SELECT SESI_ACTIVA 
            FROM CART_SESION 
            WHERE SESI_CODIGO = :codigo AND SESI_ACTIVA = 1
        """, {'codigo': session_token})
        
        # Traer el resultado
        resultado = cursor.fetchone()
        
        # Si hay resultado, significa que la sesión es válida
        if resultado:
            return True
        
        # Si no hay resultado, la sesión es inválida
        return False
    except Exception as e:
        print(f"Ocurrió un error al verificar la sesión: {e}")
        return False
    finally:
        cursor.close()
        connection.close()


def invalidar_sesion(session_token: str):
    connection = get_db_connection()
    cursor = connection.cursor()
    try:
        cursor.execute("""
            UPDATE CART_SESION 
            SET SESI_ACTIVA = 0 
            WHERE SESI_CODIGO = :codigo
        """, {'codigo': session_token})
        
        # Verificar si se actualizó alguna fila
        if cursor.rowcount == 0:
            print("No se encontró una sesión activa con ese token.")
            return False
        
        connection.commit()
        return True
    except Exception as e:
        print(f"Ocurrió un error al invalidar la sesión: {e}")
        connection.rollback()
        return False
    finally:
        cursor.close()
        connection.close()

