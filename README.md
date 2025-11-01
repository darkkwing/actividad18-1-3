# ACTIVIDAD 18  
## Base de Datos

Nombre: planning

### Tabla: todo

Estructura:

id INT PRIMARY KEY AUTO_INCREMENT\
name VARCHAR(50) NOT NULL\
description VARCHAR(50)\
status VARCHAR(50) NOT NULL\
created_at DATETIME NOT NULL\
updated_at DATETIME NOT NULL

El archivo todo.sql incluido contiene la sentencia para crear la tabla.

## Requisitos

Node.js\
MariaDB

Instalar dependencias:

npm install

## Ejecutar el servidor

node app.js

El servidor se inicia en:

http://localhost:4000

## Endpoints de la API

GET /todo\
Devuelve todas las tareas.

GET /todo/:id\
Devuelve una tarea según su id.

POST /todo\
Crea una tarea nueva.

Body esperado: { "name": "Texto", "description": "Texto", "status":
"pending" }

PUT /todo/:id\
Modifica una tarea existente.

Body esperado: { "name": "Texto", "description": "Texto", "status":
"done" }

DELETE /todo/:id\
Elimina una tarea según su id.

## Tecnologías utilizadas

Node.js\
Express\
MariaDB

Darwin Rodríguez Gamarra
