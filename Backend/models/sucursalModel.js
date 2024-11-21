var mongoose = require('mongoose');
 
var Schema = mongoose.Schema;

var sucursalModel = new Schema({
    
    sucursalCodigo: {
        
        type: String
        
    },
    
    sucursalNombre: {
        
        type: String
        
    },
    
    sucursalDescripcion: {
        
        type: String
        
    }
    
});

module.exports = mongoose.model('Sucursal', sucursalModel);