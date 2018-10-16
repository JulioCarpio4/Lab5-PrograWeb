var mongoose = require('mongoose');
var uniqueValidator = require ('mongoose-unique-validator');

const JugadorSchema = mongoose.Schema({
    id: {type: Number, required: true, index: true, unique:true},
    nombre: {type: String, required: true}
});

JugadorSchema.plugin(uniqueValidator);
module.exports = mongoose.model('dbJugador', JugadorSchema);