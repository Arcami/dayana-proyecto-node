# Proyecto React + Node

## Enunciado

El desarrollo a nivel de backend debe cumplir con los siguientes requisitos mínimos para el MVP:

1. Implementación de al menos dos colecciones, y mínimo una relación entre dos de ellas. En alguna de las colecciones se debe guardar imágenes.
2. Hacer un CRUD completo, sobre alguna de las colecciones.
3. Implementación de autenticación utilizando JWT (JSON Web Tokens) y autorización.
4. Desplegar el proyecto en algún servidor.
5. Crear por lo menos dos rutas privadas para gestión de usuarios.

## Planteamiento

Cliente:
Página publica del usuario: su wishlist para que todo el mundo vea qué quiere que le compren
Página privada del usuario: poder añadir, modificar o eliminar productos de su wishlist
Página privada del perfil usuario: cambiar su nombre/contraseña/edad
Página de creación de usuario

1. **Autenticación y registro**

   - `POST /register`
   - `POST /login`

2. **Wishlist pública**

   - `GET /wishlist/:userId`

3. **Wishlist privada**

   - `POST /wishlist/:userId/add`
   - `PUT /wishlist/:userId/update`
   - `DELETE /wishlist/:userId/delete/`

4. **Modificar perfil de usuario**
   - `PUT /profile`
