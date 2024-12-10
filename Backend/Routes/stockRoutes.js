var express = require('express');

var routes = function(Stock){
	var stockRouter = express.Router();
	var stockController = require('../controllers/stockController')(Stock);
	stockRouter.route('/')
		.post(stockController.post)
		.get(stockController.get);
	stockRouter.use('/:stockId', async function(req, res, next){
		var stockToFind = new Stock();
		stockToFind._id = req.params.stockId;
		var stock = await Stock
			.findOne(stockToFind)
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
		console.log(stock);
		if (stock) {
			req.stock = stock;
			next();
		} else {
			res.status(404).send('Stock no encontrado');
		}
	});
	stockRouter.route('/:stockId')
		.get(function(req, res){
			var returnStock = req.stock.toJSON();
			res.json(returnStock);
		})
		.put(async function(req, res){
			var result = await Stock.updateOne({ _id: req.stock._id }, { cantidad: req.body.cantidad });
			if (!result.acknowledged) {
				res.status(500).send('Error modificando stock');
			} else {
				res.status(200).send('Stock modificado');
			}
		})
		.patch(async function(req, res){
			var stockToFind = new Stock();
			stockToFind._id = req.body._id;
			if (req.body._id) {
				delete req.body._id;
			}
			var result = await Stock.findOneAndUpdate(stockToFind, req.body, {
				includeResultMetadata: true
			});
			if (result.ok === 0) {
				res.status(500).send('Error modificando stock');
			} else {
				res.json(req.body);
			}
		})
		.delete(async function(req, res){
			var stockToFind = new Stock();
			stockToFind._id = req.stock._id;
			var result = await Stock.deleteOne(stockToFind);
			if (!result.acknowledged) {
				res.status(500).send('Error eliminando stock');
			} else {
				res.status(200).send('Stock eliminado');
			}
		});
		return stockRouter;
	 
 };
 
 module.exports = routes;