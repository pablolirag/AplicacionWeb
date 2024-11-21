var sucursalesController = function(Stock) {
	
	var post = async function(req, res){
		
		var sucursal = new Sucursal(req.body);
		
		await sucursal.save();
		
		res.status(200).send('Sucursal agregada');
		
	};
	
	var get = async function(req, res){
			
		var query = {};
		
		var sucursales = await Stock.find(query);

		var returnSucursales = [];
				
		sucursales.forEach(function(element){
			
			var newSucursal = element.toJSON();
			
			newSucursal.links = {};
			
			newSucursal.links.self = 'http://' + req.headers.host + '/api/Sucursal/' + newSucursal._id;
			
			returnSucursal.push(newSucursal);
			
		});
		
		res.json(returnSucursales);
		
	};
	
	return {
		
		post: post,
		
		get: get
		
	};
	
};

module.exports = stocksController;