 var mongoose = require('mongoose');
 
 var Schema = mongoose.Schema;
 
 var productoModel = new Schema({
	id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	productoCodigo: {
		type: String,
        required: true
	},
	productoNombre: {
		type: String
	}, 
	productoDescripcion: {	 
		type: String
	} 
 });
 
 module.exports = mongoose.model('Producto', productoModel);