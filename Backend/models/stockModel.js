var mongoose = require('mongoose');
 
var Schema = mongoose.Schema;

var stockModel = new Schema({
    
    sucursalCodigo: {
        type: ObjectId,
        ref: 'Sucursal',
        required: true
        
    },
    
    productoCodigo: {
        type: ObjectId,
        ref: 'Producto',
        required: true
    },
    
    cantidad: {
        type: Number,
        required: true
    }
    
});

module.exports = mongoose.model('Stock', stockModel);