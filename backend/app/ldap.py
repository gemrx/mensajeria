users = [
    {
        'id': 1,
        'email': 'alice.smith@example.com',
        'password': 'password123'
    },
    {
        'id': 2,
        'email': 'bob.johnson@example.com',
        'password': 'securepassword'
    },
    {
        'id': 3,
        'email': 'charlie.brown@example.com',
        'password': 'mypassword'
    },
    {
        'id': 4,
        'email': 'diana.prince@example.com',
        'password': 'wonderwoman'
    },
    {
        'id': 5,
        'email': 'ethan.hunt@example.com',
        'password': 'missionimpossible'
    }
]

def obtener_usuarios():
  return users

def obtener_usuario_por_email(email: str):
  for user in users:
    if user['email'] == email:
      return user
  return None

def validar_usuario(email: str, password: str):
    usuario = obtener_usuario_por_email(email)
    
    # Se verifica si el usuario existe
    if usuario is None:
        return {
            'estado': 'fallido',
            'email': None,
            'mensaje': 'Credenciales incorrectas'
        }

    # Comparamos la contraseña ingresada con la guardada
    if usuario['password'] != password:
        return {
            'estado': 'fallido',
            'email': None,
            'mensaje': 'Credenciales incorrectas'
        }

    return {
        'estado': 'autenticado',
        'email': usuario['email'],
        'mensaje': 'Usuario autenticado'
    }
    