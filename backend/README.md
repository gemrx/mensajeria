# Backend
Este es un proyecto de backend desarrollado con **FastAPI**. El proyecto utiliza **pip-tools** para la gestión de dependencias y está estructurado para facilitar su mantenimiento y escalabilidad.

```plaintext
.
├── .venv/                # Directorio del entorno virtual (excluido de Git)
├── app/                  # Código principal de la aplicación FastAPI
├── requirements.in       # Lista de dependencias directas del proyecto
├── requirements.txt      # Lista compilada de todas las dependencias (directas + transitivas)

```

---
## Guía de Instalación

### Requisitos Previos

Asegúrate de tener instalados los siguientes programas antes de configurar el proyecto:

- Python 3.7 o superior
- Herramienta de entornos virtuales (`venv` o `virtualenv`)
- `pip` (gestor de paquetes de Python)
### Instalación
1. **Crea un entorno virtual en la raiz del proyecto**:
	```bash
	python3 -m venv .venv
	```
2. **Activa el entorno virtual:**
	```bash
	source .venv/bin/activate
	```
3. **Instala `pip-tools`** (para gestionar las dependencias):
	```bash
	pip install pip-tools
	```
4. **Instala las dependencias del proyecto:** Luego de tener instalado `pip-tools`, utiliza `pip-sync` para instalar las dependencias definidas en `requirements.txt`
	```bash
	pip-sync
	```

---
## Gestión de Dependencias
Este proyecto utiliza **pip-tools** para la gestión de dependencias. Aquí te explico cómo añadir o eliminar dependencias:

### Añadir Dependencias
1. Añade el paquete al archivo `requirements.in`:
	```bash
	echo "nuevo-paquete==version" >> requirements.in
	```
2. Compila las dependencias:
	```bash
	pip-compile requirements.in
	```
3. Sincroniza el entorno virtual:
	```bash
	pip-sync
	```
### Eliminar Dependencias
1. Elimina el paquete del archivo `requirements.in`.
2. Vuelve a compilar y sincronizar:
	```bash
	pip-compile requirements.in pip-sync
	```
