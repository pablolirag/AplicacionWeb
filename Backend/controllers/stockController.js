var stockController = function(Stock) {
	
	var post = async function(req, res){
		
		var stock = new Stock(req.body);
		
		await stock.save();
		
		res.status(200).send('Stock agregado');
		
	};
	
	var get = async function(req, res){
			
		var query = {};
		
		var stocks = await Stock.find(query);

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

module.exports = stocksController;