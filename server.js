'use strict';
const express = require('express');
const cors = require('cors');
const redis = require('redis');
const app = express();

const archivo = require("./archive");
const player = require('./jugador');

//Cliente local de redis. 
const client = redis.createClient(6379, "hostredis");

app.use(express.json());

const whiteList = ['http://localhost:4200']
var corsOptions = {
    origin: function (origin, callback){
        if(whiteList.indexOf(origin) !== -1){
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}

app.listen(3001, function() {
    console.log('Escuchando en el puerto 3001!');
})

app.get('/api/v1/jugadores/:id', cors(), async (req, res) => {

    var player_id = req.params.id;

    //Irlo a traer a Redis antes si está
    return client.get('Jugador' + player_id, async(err, result) =>{
        if (result){
            const JsonResult = JSON.parse(result);
            console.log("Encontré al jugador " + player_id + "en redis!");
            res.status(200).json(JsonResult);
        }

        else{
            var PlayerBuscado = await archivo.Consulta(player_id);
            if (PlayerBuscado){
                client.setex('Jugador' + player_id, 5, JSON.stringify(PlayerBuscado));
                console.log("Encontré al jugador " + player_id + " en mongoDB!");
                res.status(200).json(PlayerBuscado);
            }
            else{
                res.status(500).json("Ocurrió un error inesperado");
            }
        }
    })
});

app.get('/api/v1/jugadores/', cors(), async (req, res) => {

    //Irlo a traer a Redis antes si está. 
    return client.get('allPlayers', async (err, result) => {
        if (result){
            const JsonResult = JSON.parse(result);
            console.log("Vengo de redis!");
            res.status(200).json(JsonResult);
        }
        else{
             //Se retorna el listado completo de jugadores. 
             var respuesta = await archivo.ConsultaTodos();
             if (respuesta){
                client.setex('allPlayers', 5, JSON.stringify(respuesta));
                console.log("Vengo de mongo!");
                res.status(200).json(respuesta);
             }

            else {
                res.status(500).json("Ocurrió un error inesperado");
            }

        } 
    })
});

app.post('/api/v1/jugadores', cors(), (req, res) => {

    if (archivo.GuardarElemento(req.body.id, req.body))
    {
        //console.log(req.body);
        res.status(201).json("Jugador almacenado con éxito");
    } 
    else 
    {
        res.status(500).json("Ocurrión un error inesperado");
    }
});

app.delete('/api/v1/jugadores/:id', cors(), async (req, res) => {

    if(await archivo.Eliminar(req.params.id))
    {
        res.status(204).json("Jugador eliminado con éxito");
    }

    else 
    {
        res.status(404).json("Jugador no encontrado");
    }
});

app.put('/api/v1/jugadores/:id', cors(), async (req, res) => {

    if(await archivo.Actualizar(req.params.id, req.body))
    {
        res.status(204).json("Jugador actualizado con éxito");
    }

    else 
    {
        res.status(404).json("Jugador no encontrado");
    }
});