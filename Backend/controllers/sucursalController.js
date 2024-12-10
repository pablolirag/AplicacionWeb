var sucursalesController = function(Sucursal) {
	
		var post = async function(req, res){
		var sucursal = new Sucursal({
			sucursalCodigo: req.body.sucursalCodigo,
			sucursalNombre: req.body.sucursalNombre,
			sucursalDescripcion: req.body.sucursalDescripcion
		});	
		await sucursal.save();
		res.status(200).send('Sucursal agregada');
	};
	
	var get = async function(req, res){
		var query = {};
		var sucursales = await Sucursal.find(query);
		var returnSucursales = [];
		sucursales.forEach(function(element){
			var newSucursal = element.toJSON();
			newSucursal.links = {};
			newSucursal.links.self = 'http://' + req.headers.host + '/api/Sucursal/' + newSucursal._id;
			returnSucursales.push(newSucursal);
		});
		res.json(returnSucursales);
	};
	
	return {
		post: post,
		get: get
	};
};

module.exports = sucursalesController;