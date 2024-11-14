var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var stockModel = new Schema({
    sucursalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sucursal',
        required: true
    },
    productoId: {
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
