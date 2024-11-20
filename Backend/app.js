var express = require('express');

var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var path = require('path');



var db = mongoose.connect('mongodb://mongo:27017/AplicacionWeb');

var Producto = require('./models/productoModel');

var app = express();

var port = process.env.PORT || 3000;



app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());


var productoRouter = require('./Routes/productoRoutes')(Producto);

app.use('/api/Producto', productoRouter);


app.get('/', function(req, res){
	
	res.send('Hola Mundo!');
	
});

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