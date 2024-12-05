 var mongoose = require('mongoose');
 
 var Schema = mongoose.Schema;
 
 var productoModel = new Schema({
	productoCodigo: {
		type: mongoose.Schema.Types.ObjectId
	},
	productoNombre: {
		type: String
	}, 
	productoDescripcion: {	 
		type: String
	} 
 });
 
 module.exports = mongoose.model('Producto', productoModel);