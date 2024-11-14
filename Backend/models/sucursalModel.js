var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var sucursalModel = new Schema({
    sucursalNombre: {
        type: String,
        required: true
    },
    sucursalDireccion: {
        type: String,
        required: true
    },
    sucursalCiudad: {
        type: String,
        required: true
    },

});

module.exports = mongoose.model('Sucursal', sucursalModel);
