'use strict';
const express = require('express');
//const bodyParser = require('body-parser');
const app = express();

const archivo = require("./archive");
const player = require('./jugador');

app.use(express.json());

app.listen(3001, function() {
    console.log('Escuchando en el puerto 3001!');
})

app.get('/api/v1/jugadores/:id', (req, res) => {

    var player_id = req.params.id;
    var JugadorBuscado = archivo.Consulta(player_id)

    if (JugadorBuscado == undefined) {

        res.status(404).json("No se ha encontrado el id solicitado");
    }

    else {
        res.status(200).json(JugadorBuscado);
    }
});

app.get('/api/v1/jugadores/', async (req, res) => {

    //Se retorna el listado completo de jugadores. 
    var respuesta = await archivo.ConsultaTodos();
    
    if(!respuesta)
    {
        res.status(500).json("Ocurrió un error inesperado");
    }
    
    res.status(200).json(respuesta);
});

app.post('/api/v1/jugadores', (req, res) => {

    if (archivo.GuardarElemento(req.body.id, req.body.name))
    {
        res.status(201).json("Jugador almacenado con éxito");
    } 
    else 
    {
        res.status(500).json("Ocurrión un error inesperado");
    }
});

app.delete('/api/v1/jugadores/:id', (req, res) => {

    if(archivo.Eliminar(req.params.id))
    {
        res.status(204).json("Jugador eliminado con éxito");
    }

    else 
    {
        res.status(404).json("Jugador no encontrado");
    }
});

app.put('/api/v1/jugadores/:id', (req, res) => {

    if(archivo.Actualizar(req.params.id, req.body.name))
    {
        res.status(204).json("Jugador actualizado con éxito");
    }

    else 
    {
        res.status(404).json("Jugador no encontrado");
    }
});