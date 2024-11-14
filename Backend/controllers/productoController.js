var productoController = function(Producto) {
	
	var post = async function(req, res){
		
		var producto = new Producto(req.body);
		
		await producto.save();
		
		res.status(200).send('Producto agregado');
		
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
	

    // Método DELETE: Eliminar un producto por ID
    var del = async function (req, res) {
        const id = req.params.id;
        const producto = await Producto.findByIdAndDelete(id);

        if (!producto) {
            res.status(404).send('Producto no encontrado');
        } else {
            res.status(200).send('Producto eliminado');
        }
    };

    // Método PATCH: Actualizar parcialmente un producto por ID
    var patch = async function (req, res) {
        const id = req.params.id;
        const updates = req.body;

        const producto = await Producto.findById(id);

        if (!producto) {
            res.status(404).send('Producto no encontrado');
        } else {
            Object.keys(updates).forEach((key) => {
                producto[key] = updates[key];
            });

            await producto.save();
            res.status(200).send('Producto actualizado parcialmente');
        }
    };

    // Método PUT: Actualizar completamente un producto por ID
    var put = async function (req, res) {
        const id = req.params.id;
        const updatedData = req.body;

        const producto = await Producto.findByIdAndUpdate(id, updatedData, {
            new: true, // Devuelve el documento actualizado
            runValidators: true // Ejecuta las validaciones del modelo
        });

        if (!producto) {
            res.status(404).send('Producto no encontrado');
        } else {
            res.status(200).send('Producto actualizado completamente');
        }
    };

    return {
        post: post,
        get: get,
        delete: del,
        patch: patch,
        put: put
    };
	
};

module.exports = productoController;