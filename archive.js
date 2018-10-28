var player = require('./jugador');

//Conexión a la base de datos con mongoose. 
const mongoose = require('mongoose');

//Importación del modelo de jugadores
var dbJugador = require('./modelos/db_jugador');

module.exports = {
    jugadores: [],

    GuardarElemento: async function GuardarElemento(lid, l_jugador) {

        //Conexión con mongoose. 
        mongoose.connect('mongodb://localhost/Beisbol', { useNewUrlParser: true });
        var loperacion = false;
        var db = mongoose.connection;

        db.on('error', () => loperacion = false);
        db.once('open', function () {

            //Realizar la inserción del nuevo elemento. 
            var newPlayer = new dbJugador({
                id: lid, nombre: l_jugador.nombre,
                jersey: l_jugador.jersey, estatura: l_jugador.estatura, peso: l_jugador.peso,
                fec_nacimiento: l_jugador.fec_nacimiento, posicion: l_jugador.posicion, batea: l_jugador.batea, 
                atrapa: l_jugador.atrapa
            });

            console.log(newPlayer);
            newPlayer.save(function (err, newPlayer) {
                if (err) loperacion = false;
                loperacion = true;
            })
        });

        //db.close();

        return loperacion
    },

    ConsultaTodos: async function Consulta() {

        //Conexión con mongoose. 
        mongoose.connect('mongodb://localhost/Beisbol', { useNewUrlParser: true });
        var loperacion;
        var db = mongoose.connection;
        try {
            loperacion = await dbJugador.find().exec();
            return loperacion;
        } catch (err) {
            return false;
        }
    },

    Consulta: async function Consulta(l_id) {

        //Conexión con mongoose
        mongoose.connect('mongodb://localhost/Beisbol', { useNewUrlParser: true });
        var ljugador;
        var db = mongoose.connection;

        try {
            ljugador = await dbJugador.findOne({ 'id': l_id }).exec();
            //console.log(ljugador);
            return ljugador;
        } catch (err) {
            return false;
        }

    },


    Actualizar: async function Actualizar(l_id, l_jugador) {

        //Conexión con mongoose. 
        mongoose.connect('mongodb://localhost/Beisbol', { useNewUrlParser: true });
        var loperacion;
        var db = mongoose.connection;
        try {
            loperacion = await dbJugador.updateOne({ 'id': l_id }, {
                "$set": {
                    'nombre': l_jugador.nombre, 'jersey': l_jugador.jersey,
                    'estatura': l_jugador.estatura, 'peso': l_jugador.peso, 'fec_nacimiento': l_jugador.fec_nacimiento, 
                    'posicion': l_jugador.posicion, 'batea': l_jugador.batea, 'atrapa': l_jugador.atrapa
                }
            },
                function (err) {
                    if (err) return handleError(err);
                    return true;
                })

            return loperacion;
        } catch (err) {

        }
    },

    Eliminar: async function Eliminar(l_id) {

        //Conexión con mongoose. 
        mongoose.connect('mongodb://localhost/Beisbol', { useNewUrlParser: true });
        var loperacion;
        var db = mongoose.connection;
        try {
            loperacion = await dbJugador.deleteOne({ 'id': l_id }, function (err) {
                if (err) return handleError(err);

                return true;
            })
            return loperacion;

        } catch (err) {
            return false;
        }

    }
}



