const express = require('express');
const router = express.Router();

//Importar controladores
const clienteController = require('../controllers/clienteController');
const productosController = require('../controllers/productosController');
const pedidosController = require('../controllers/pedidosController');

module.exports = function() {

    /** CLIENTES */

    //Agrega nuevos clientes via post
    router.post('/clientes', 
        clienteController.nuevoCliente
    );

    //Obtener todos los clientes
    router.get('/clientes', 
        clienteController.mostrarClientes
    );

    //Muestra un cliente en específico
    router.get('/clientes/:idCliente',
        clienteController.mostrarCliente
    );

    //Actualizar cliente
    router.put('/clientes/:idCliente',
        clienteController.actualizarCliente
    );

    //Eliminar Cliente
    router.delete('/clientes/:idCliente',
        clienteController.eliminarCliente
    );

    /** PRODUCTOS */

    //Nuevos productos
    router.post('/productos',
        productosController.subirUnArchivo,
        productosController.nuevoProducto
    );

    //Muestra todos los productos
    router.get('/productos', 
        productosController.mostrarProductos
    );

    // Muestra un producto en específico por su id
    router.get('/productos/:idProducto', 
        productosController.mostrarProducto
    );

    //Actualizar producto
    router.put('/productos/:idProducto', 
        productosController.subirUnArchivo,
        productosController.actualizarProducto
    );

    //Eliminar productos
    router.delete('/productos/:idProducto',
        productosController.eliminarProducto
    );

    /** PEDIDOS */

    //Crear nuevo pedido
    router.post('/pedidos', 
        pedidosController.nuevoPedido
    );
    
    //Mostrar todos los pedidos
    router.get('/pedidos', 
        pedidosController.mostrarPedidos
    );

    //Mostrar un pedido por id
    router.get('/pedidos/:idPedido', 
        pedidosController.mostrarPedido
    );

    //Actualizar pedidos
    router.put('/pedidos/:idPedido', 
        pedidosController.actualizarPedido
    );

    //Eliminar un pedido
    router.delete('/pedidos/:idPedido',
        pedidosController.eliminarPedido
    );

    return router;
}