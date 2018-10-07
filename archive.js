var player = require('./jugador');

module.exports = {
    jugadores: [],

    GuardarElemento: function GuardarElemento(id, nombre) {

        let dummyjugador = new player(id, nombre);
        this.jugadores.push(dummyjugador);
        return true;
    },

    ConsultaTodos: function Consulta() {
        return this.jugadores;
    },

    Consulta: function Consulta(l_id) {

        var existe = this.jugadores.find(pl => pl.id === l_id)
        console.log(existe);
    },


    Actualizar: function Actualizar(l_id, l_nombre) {

        var existe = this.jugadores.findIndex( pl => pl.id == l_id);
        
        if (existe != -1)
        {
            this.jugadores[existe].nombre = l_nombre;
            return true;
        }

        else 
        {
            return false;
        }
    },

    Eliminar: function Eliminar(l_id) {

        var existe = this.jugadores.findIndex( pl => pl.id == l_id);
        
        if (existe != -1)
        {
            this.jugadores.pop(existe);
            return true;
        }

        else 
        {
            return false;
        }

    }
}



