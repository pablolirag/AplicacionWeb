var mongoose = require('mongoose');
 
var Schema = mongoose.Schema;
 
var productoModel = new Schema({
	productoCodigo: {
		type: String,
        required: true
	},
	productoNombre: {
		type: String,
		required: true
	}, 
	productoDescripcion: {	 
		type: String,
		required: true
	} 
});
 
 module.exports = mongoose.model('Producto', productoModel);