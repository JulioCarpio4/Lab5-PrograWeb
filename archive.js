var player = require('./jugador');

//Conexión a la base de datos con mongoose. 
const mongoose = require('mongoose');

//Importación del modelo de jugadores
var dbJugador = require('./modelos/db_jugador');

module.exports = {
    jugadores: [],

    GuardarElemento: async function GuardarElemento(lid, lnombre) {

        //almacenamiento en local. 
        //let dummyjugador = new player(lid, lnombre);
        //this.jugadores.push(dummyjugador);

        //Conexión con mongoose. 
        mongoose.connect('mongodb://localhost/Beisbol', { useNewUrlParser: true });
        var loperacion = false;
        var db = mongoose.connection;

        db.on('error', () => loperacion = false);
        db.once('open', function () {

            //console.log("hola");
            //Realizar la inserción del nuevo elemento. 
            var newPlayer = new dbJugador({ id: lid, nombre: lnombre });
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
        try
        {
            loperacion = await dbJugador.find().exec();
            console.log(loperacion);
            return loperacion;
        } catch(err){
            return 'Ocurrió error';
        }
    },

    Consulta: function Consulta(l_id) {

        var existe = this.jugadores.find(pl => pl.id === l_id)
        console.log(existe);
    },


    Actualizar: function Actualizar(l_id, l_nombre) {

        var existe = this.jugadores.findIndex(pl => pl.id == l_id);

        if (existe != -1) {
            this.jugadores[existe].nombre = l_nombre;
            return true;
        }

        else {
            return false;
        }
    },

    Eliminar: function Eliminar(l_id) {

        var existe = this.jugadores.findIndex(pl => pl.id == l_id);

        if (existe != -1) {
            this.jugadores.pop(existe);
            return true;
        }

        else {
            return false;
        }

    }
}



