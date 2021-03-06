var mongoose = require('mongoose');
var uniqueValidator = require ('mongoose-unique-validator');

var JugadorSchema = mongoose.Schema({
    
    id: {type: Number, required: true, index: true, unique:true},
    nombre: {type: String, required: true},
    jersey: {type: String, required: true},
    estatura: {type: Number, required: true},
    peso: {type: Number, required: true},
    fec_nacimiento: {type: Date, required: true},
    posicion: {type: String, required: true},
    batea: {type: String, required: true},
    atrapa: {type: String, required: true}
});

JugadorSchema.plugin(uniqueValidator);
module.exports = mongoose.model('dbJugador', JugadorSchema);