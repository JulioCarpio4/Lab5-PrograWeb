class jugador {
    constructor(id, nombre, jersey, estatura, peso, fec_nacimiento, posicionF, posicionB) {
        this.id = id;
        this.nombre = nombre;
        this.jersey = jersey;
        this.estatura = estatura;
        this.peso = peso;
        this.fec_nacimiento = fec_nacimiento;
        this.posicionF = posicionF;
        this.posicionB = posicionB;
    }
}

module.exports = jugador;