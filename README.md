# REST API PWA COUNTER 

Es una aplicación que permite el registro, inicio de sesión y cierre de sesión de usuarios con email y contraseña.

Este proyecto forma parte de una demo y ha sido desarrollado con Node.js, Express.js, MongoDb,Mongoose y JWT.

Para el correcto funcionamiento de la aplicación es necesario tener Node.js instalado. 
Se puede descargar desde su página oficial: https://nodejs.org/es/

## Instalación

    npm install

## Ejecutar la app

    npm run start

# Variables de entorno

  Para el acceso a la base de datos remota es necesario contar con las variables de entorno que han sido facilitadas en el correo electrónico.
  En caso de no disponer de ellas pueden contactar conmigo desde mi página web: https://alicia.redparra.com/ o a través de mi linkedin:          https://www.linkedin.com/in/aliciaparra1/. 
  
  Crear un archivo .env en el directorio raíz de la aplicación con las variables.

## ENDPOINTS

<table>
    <tr>
        <td>/users</td>
    </tr>
    <tr>
        <td>/login</td>
    </tr>
    <tr>
        <td>/logout</td>
    </tr>
</table>

### Petición registro

`POST /users`

Ejemplo:

http://localhost:3001/api/users
<br />
body: {
  email: 'example@example.com' ,
  password: 'passwordvalue',
}

### Respuesta

    Status: 201 OK
    
   {
    "logout": null,
    "email": "example@example.com",
    "password": "$2b$10$LRoiQ3zia/nLAhRhqDjRAuwMy1Zq3FDAIQqbf0B8gZSXgjjCNUKPi",
    "id": "6144575a631bbd0016a3329d"
    }
    
 ### Petición inicio de sesión

`POST /login`

Ejemplo:

http://localhost:3001/api/login
<br />
body: {
  email: 'example@example.com' ,
  password: 'passwordvalue',
}

### Respuesta

    Status: 200 OK
    
    {
      "access_token": "ejJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNDIxZGQzNzhmNEVjMzcwM2QzYWFhZSIsImlh
      dCI6MTYzMTg2ODk0NSwiZXhwIjoxNjMxODcyNTQ1fQ.0J6HC47ML2RYq-8NXEujNuOOHP49DxkKdDMRbXtxC2g",
      "logout":"2021-09-17T08:42:51.915Z"
    }

 ### Petición cierre de sesión

`POST /logout`

Ejemplo:

  http://localhost:3001/api/logout
  <br />
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer <<acess_token>>`,
   }

### Respuesta

  Status: 200 OK
  {
    "logout succes"
  }
 
 
