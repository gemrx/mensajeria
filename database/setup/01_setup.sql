-- Permitir la ejecución de comandos que requieren privilegios especiales.
ALTER SESSION SET "_ORACLE_SCRIPT"=true;

-- Crear el usuario y asignarle una contraseña.
CREATE USER CARTEO IDENTIFIED BY CARTEO;
GRANT ALL PRIVILEGES TO CARTEO;
GRANT CONNECT, RESOURCE TO CARTEO;

-- Cambiar el schema actual a 'tracking'
ALTER SESSION SET CURRENT_SCHEMA = CARTEO;

-- Creacion de las tablas
CREATE TABLE CART_SESION (
    SESI_CODIGO VARCHAR2(255) PRIMARY KEY,
    SESI_EMAIL VARCHAR2(255),
    SESI_EXPIRACION TIMESTAMP,
    SESI_ACTIVA NUMBER(1) CHECK (SESI_ACTIVA IN (0, 1))
);