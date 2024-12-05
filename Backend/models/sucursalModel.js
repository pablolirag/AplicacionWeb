var mongoose = require('mongoose');
 
var Schema = mongoose.Schema;

var sucursalModel = new Schema({
    
    sucursalCodigo: {
        type: mongoose.Schema.Types.ObjectId
    },
    
    sucursalNombre: {
        type: String
    },
    
    sucursalDescripcion: {
        type: String
    }
    
});

module.exports = mongoose.model('Sucursal', sucursalModel);