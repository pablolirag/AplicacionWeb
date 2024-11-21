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

		var stock = await Stock.findOne(stockToFind);
		
		if (stock) {
			req.stock = stock;
			next();
		}
		else {
			res.status(404).send('no stock found');
		}
		
	});
	
	stockRouter.route('/:stockId')
		.get(function(req, res){
			
			var returnStock = req.stock.toJSON();
			
			res.json(returnStock);
			
		})
		.put(async function(req, res){
			
			req.stock._id = req.body._id;

			req.stock.sucursalCodigo = req.body.sucursalCodigo;
					
			req.stock.productoCodigo = req.body.productoCodigo;
			
			req.stock.cantidad = req.body.cantidad;

			var stockToFind = new Stock();

			stockToFind._id = req.stock._id;

			var result = await Stock.updateOne(stockToFind, req.stock);
			
			if (!result.acknowledged) {
			
				res.status(500).send('Stock no modificado');
			
			}
			else {
			
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
			
				res.status(500).send('Stock no modificado');
			
			}
			else {
			
				res.json(req.body);
		
			}
			
		})
		.delete(async function(req, res){
			
			var stockToFind = new Stock();

			stockToFind._id = req.stock._id;

			var result = await Stock.deleteOne(stockToFind);
			
			if (!result.acknowledged) {
			
				res.status(500).send('Stock no eliminado');
			
			}
			else {
			
				res.status(200).send('Stock eliminado');
		
			}
			
		});
			
		 return stockRouter;
	 
 };
 
 module.exports = routes;