var express = require('express');

var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var path = require('path');

var db = mongoose.connect('mongodb://localhost:27017/AplicacionWeb');

var Producto = require('./models/productoModel');
var Stock = require('./models/stockModel');
var Sucursal = require('./models/sucursalModel');

var app = express();

var port = process.env.PORT || 3000;



app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());


var productoRouter = require('./Routes/productoRoutes')(Producto);

app.use('/api/Producto', productoRouter);

var sucursalRouter = require('./Routes/sucursalRoutes')(Sucursal);

app.use('/api/Sucursal', sucursalRouter);

var stockRouter = require('./Routes/stockRoutes')(Stock);

app.use('/api/Stock', stockRouter);


app.get('/', function(req, res){
	
	res.send('Hola Mundo!');
	
});

/////////////////// PRODUCTOS ///////////////////

app.get('/productos.html', function(req, res){
	
    res.sendFile(path.resolve('../Frontend/productos.html'));
	
});

app.get('/agregarProducto.html', function(req, res){
	
    res.sendFile(path.resolve('../Frontend/agregarProducto.html'));
	
});

app.get('/modificarProducto.html', function(req, res){
	
    res.sendFile(path.resolve('../Frontend/modificarProducto.html'));
	
});


///////////////////////////////


app.get('/jquery-1.12.1.min.js', function(req, res){
	
    res.sendFile(path.resolve('../Frontend/jquery-1.12.1.min.js'));
	
});

app.listen(port, function(){
	
	console.log('Running on PORT: ' + port);
	
});