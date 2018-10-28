class jugador {
    constructor(id, nombre, jersey, estatura, peso, fec_nacimiento, posicion, batea, atrapa) {
        this.id = id;
        this.nombre = nombre;
        this.jersey = jersey;
        this.estatura = estatura;
        this.peso = peso;
        this.fec_nacimiento = fec_nacimiento;
        this.posicion = posicion;
        this.batea = batea;
        this.atrapa = atrapa;
    }
}

module.exports = jugador;