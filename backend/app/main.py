from fastapi import FastAPI, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from .ldap import validar_usuario
from .db.sesion import crear_sesion, verificar_sesion

app = FastAPI()

# Permitir solicitudes desde la aplicación frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CredencialesUsuario(BaseModel):
    email: str
    password: str

@app.post('/login')
def iniciar_sesion(credenciales: CredencialesUsuario, response: Response):
    EXPIRACION_SESION_SEGUNDOS = 60

    resultado_validacion = validar_usuario(credenciales.email, credenciales.password)
    
    if resultado_validacion['estado'] == 'fallido': 
        raise HTTPException(status_code=404, detail=resultado_validacion['mensaje'])

    if resultado_validacion['estado'] == 'error':
        raise HTTPException(status_code=500, detail=resultado_validacion['mensaje'])

    codigo_sesion = crear_sesion(email=credenciales.email, duracion_segundos=EXPIRACION_SESION_SEGUNDOS)

    if codigo_sesion is None:
        raise HTTPException(500, detail='Error al tratar de crear la sesion')

    response.set_cookie(
        key='codigo_sesion',
        value=codigo_sesion['session_token'],  # Asegúrate de usar 'session_token' aquí
        httponly=True,
        secure=False,
        samesite='lax',
        max_age=EXPIRACION_SESION_SEGUNDOS,
        domain='localhost'
    )
    return {'estado': 'autenticado', 'mensaje': resultado_validacion['mensaje']}

@app.get('/login/status')
def verificar_estado_sesion(request: Request):
    # Obtener el token de sesión de la cookie
    codigo_sesion = request.cookies.get('codigo_sesion')

    if not codigo_sesion:
        raise HTTPException(status_code=401, detail='No autenticado')

    # Verificar el estado de la sesión
    sesion_valida = verificar_sesion(codigo_sesion)

    if not sesion_valida:
        raise HTTPException(status_code=401, detail='Sesión no válida')

    return {'estado': 'Autenticado'}

