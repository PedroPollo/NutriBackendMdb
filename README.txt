Nombre
Nutripoblacional
 versión: "1.0.0"
 main: "index.js"

 Autores: "Claudio Enrique Márquez Moreno, Pedro Alejandro Nunes Perez",

  dependencias: {
    "bcryptjs": "2.4.3" o superior,
    "cors": "^2.8.5" o superior,
    "dotenv": "16.4.5" o superior,
    "express": "4.21.1" o superior,
    "jsonwebtoken": "9.0.2" o superior,
    "moment": "2.30.1" o superior,
    "mongoose": "8.8.3" o superior,
    "mongose": "0.0.2-security" o superior,
    "morgan": "1.10.0" o superior,
    "nodemon": "3.1.7" o superior
  },
  "descripción": "NutriPoblacional es un proyecto diseñado para la unidad académica de nutrición de la Universidad Autónoma de Zacatecas (UAZ).
		La aplicación web cuenta con funciones como; registro de investigadores, inicio se session, perfil de Administrador quien autoriza o rechaza el acceso al sistema los nuevos investigadores, los investigadores pueden autorizar o rechazar el acceso a los  encuestadores que se registran en la application móvil, los investigadores pueden crear, editar eliminar y ver los resultados de las encuestas.
Nota: Para ingresar al perfil de administrador es necesario el correo 'a@gmail.com' y contraseña '1234', sin embargo este se puede modificar en el archivo 'login.js' línea 31"