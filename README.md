# Backend para el curso de Programación Web

Este repositorio consiste en un servidor de node.js y express para el manejo de la información de los jugadores de un equipo de béisbol. El servidor almacena la información de los jugadores en una base de datos MongoDB, a través de la librería mongoose. También hace uso de una base de datos redis en caché para almacenar la información más al instante. 


## Instrucciones para ejecutar correctamente el proyecto 

Los siguientes pasos te ayudarán para que puedas ejecutar el código del repositorio de manera local sin ningún problema. 

### Clonar el repositorio

Puedes utilizar el siguiente comando para clonar este repositorio.

```shell
git clone https://github.com/JulioCarpio4/Lab5-PrograWeb
```


### Instalación de node.js y npm

[Node] Puedes dirigirte al siguiente link para la instalación de node http://nodejs.org/. La instalación de node.js por defecto incluye la instalación de npm. 
Al finalizar la instalación, podrás correr los siguientes comandos para comprobar que la instalación se realizó de manera correcta. 

    $ node --version
    v0.10.24

    $ npm --version
    1.3.21


### Ejecutar proyecto localmente

Primero, necesitas tener todas las dependencias del proyecto instaladas. Puedes instalarlas ejecutando el siguiente comando desde la consola

    $ npm install 

Una vez instaladas las dependencias, deberás ejecutar el siguiente comando en la consola para correr el proyecto. 

    $ npm start server.js

Este comanzo iniciará un servidor escuchando en el puerto 3001. Cualquier aplicación podrá realizar peticiones HTTP a este servidor y éste deberá responder sin inconvenientes. 

## Indicaciones Importantes

Este repositorio utiliza una base de datos de mongo para almacenar la información, así que debes colocar una url de mongodb válida en las llamadas a la base de datos. 

Puedes utilizar una base de datos de mongo local, o puedes crear alguna desde cualquier servicio cloud, incluso desde la misma página de mongo. Con una cuenta gratuita se podrá utilizar el repositorio sin ningún problema. Puedes consultar este link para realizar la instalación `https://docs.mongodb.com/v3.2/administration/install-community/`

Adicional a la base de datos, este proyecto consume un servidor de redis para almacenar información en caché. Primero deberás instalar de manera local el servidor de redis. Puedes consultar este link para realizar la instalación `https://github.com/ServiceStack/redis-windows`