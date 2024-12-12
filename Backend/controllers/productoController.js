var productoController = function(Producto) {	

	var post = async function(req, res){
		var checkProducto = await Producto.findOne({ 'productoCodigo' : req.body.productoCodigo });
		if (checkProducto) {
			res.status(400).send('Código de producto ya existe');
		} else {
			var producto = new Producto({
				productoCodigo: req.body.productoCodigo,
				productoNombre: req.body.productoNombre,
				productoDescripcion: req.body.productoDescripcion
			});
			await producto.save();
			res.status(200).send('Producto agregado');
		}
	};
	
	var get = async function(req, res){	
		var query = {};
		var productos = await Producto.find(query);
		var returnProductos = [];
		productos.forEach(function(element){	
			var newProducto = element.toJSON();
			newProducto.links = {};
			newProducto.links.self = 'http://' + req.headers.host + '/api/Producto/' + newProducto._id;
			returnProductos.push(newProducto);
		});
		
		res.json(returnProductos);
	};
	
	return {
		post: post,
		get: get
	};
};

module.exports = productoController;