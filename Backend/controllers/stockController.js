var mongoose = require('mongoose');

var stockController = function(Stock) {
	
	var post = async function(req, res){
		var sucursalCodigo = req.body.sucursalCodigo
		var productoCodigo = req.body.productoCodigo
		var checkStock = await Stock.findOne({ 
			'sucursalCodigo': sucursalCodigo, 
			'productoCodigo' : productoCodigo 
		});
		if (checkStock) {
			res.status(400).send('Stock ya existe para ese Producto y Sucursal');
		} else {
			var stock = new Stock({
				sucursalCodigo: new mongoose.Types.ObjectId(sucursalCodigo),
				productoCodigo: new mongoose.Types.ObjectId(productoCodigo),
				cantidad: req.body.cantidad
			});
			await stock.save();
			res.status(200).send('Stock agregado');
		}
	};
	
	var get = async function(req, res){
		var query = {};
		var stocks = await Stock
			.find(query)
			.populate(
				{
					path: 'productoCodigo',
					model: 'Producto'
				}
			).populate(
				{
					path: 'sucursalCodigo',
					model: 'Sucursal'
				}
			);
		var returnStocks = [];	
		stocks.forEach(function(element){
			var newStock = element.toJSON();
			newStock.links = {};
			newStock.links.self = 'http://' + req.headers.host + '/api/Stock/' + newStock._id;
			returnStocks.push(newStock);
		});
		res.json(returnStocks);
	};
	
	return {
		post: post,
		get: get
	};
};

module.exports = stockController;