var mongoose = require('mongoose');
 
var Schema = mongoose.Schema;

var stockModel = new Schema({
    
    sucursalCodigo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sucursal',
        required: true
        
    },
    
    productoCodigo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto',
        required: true
    },
    
    cantidad: {
        type: Number,
        required: true
    }
    
});

module.exports = mongoose.model('Stock', stockModel);