# Simulacro-examen
GET /api/tierramedia/personajes: Obtiene una lista de todos los personajes épicos de “Tierra Media”.

GET </api/tierramedia/personajes/:id: Obtiene información detallada de un personaje por su ID.
En caso de no existir el personaje con id indicado, devolverá un error 404

POST /api/tierramedia/personajes: Crea un nuevo personaje épico.
Si la raza no se encuentra entre las existentes devolverá un error 500.
Si falta alguno de los datos devolverá un error 500

PUT /api/tierramedia/personajes/:id: Actualiza la información de un personaje existente por su ID.
En caso de no existir el personaje con id indicado, devolverá un error 404
Si la raza no se encuentra entre las existentes devolverá un error 500.

DELETE /api/tierramedia/personajes/:id: Borra un personaje épico por su ID.
En caso de no existir el personaje con id indicado, devolverá un error 404
