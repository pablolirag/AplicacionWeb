var mongoose = require('mongoose');
 
var Schema = mongoose.Schema;

var sucursalModel = new Schema({
    sucursalCodigo: {
        type: String,
        required: true
    },
    sucursalNombre: {
        type: String,
		required: true
    },
    sucursalDescripcion: {
        type: String,
		required: true
    }
});

module.exports = mongoose.model('Sucursal', sucursalModel);