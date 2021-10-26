const express = require('express');
const router = express.Router();

//Importar controladores
const clienteController = require('../controllers/clienteController');
const productosController = require('../controllers/productosController');
const pedidosController = require('../controllers/pedidosController');
const usuariosController = require('../controllers/usuariosController');

//Middleware para proteger las rutas
const auth = require('../middleware/auth');

module.exports = function() {

    /** CLIENTES */

    //Agrega nuevos clientes via post
    router.post('/clientes',
        auth,
        clienteController.nuevoCliente
    );

    //Obtener todos los clientes
    router.get('/clientes',
        auth, 
        clienteController.mostrarClientes
    );

    //Muestra un cliente en específico
    router.get('/clientes/:idCliente',
        auth,
        clienteController.mostrarCliente
    );

    //Actualizar cliente
    router.put('/clientes/:idCliente',
        auth,
        clienteController.actualizarCliente
    );

    //Eliminar Cliente
    router.delete('/clientes/:idCliente',
        auth,
        clienteController.eliminarCliente
    );

    /** PRODUCTOS */

    //Nuevos productos
    router.post('/productos',
        auth,
        productosController.subirUnArchivo,
        productosController.nuevoProducto
    );

    //Muestra todos los productos
    router.get('/productos', 
        auth,
        productosController.mostrarProductos
    );

    // Muestra un producto en específico por su id
    router.get('/productos/:idProducto', 
        auth,
        productosController.mostrarProducto
    );

    //Actualizar producto
    router.put('/productos/:idProducto', 
        auth,
        productosController.subirUnArchivo,
        productosController.actualizarProducto
    );

    //Eliminar productos
    router.delete('/productos/:idProducto',
        auth,
        productosController.eliminarProducto
    );

    //Búsqueda de productos
    router.post('/productos/busqueda/:query',
        auth,
        productosController.buscarProducto
    );

    /** PEDIDOS */

    //Crear nuevo pedido
    router.post('/pedidos/nuevo/:idCliente', 
        auth,
        pedidosController.nuevoPedido
    );
    
    //Mostrar todos los pedidos
    router.get('/pedidos', 
        auth,
        pedidosController.mostrarPedidos
    );

    //Mostrar un pedido por id
    router.get('/pedidos/:idPedido', 
        auth,
        pedidosController.mostrarPedido
    );

    //Actualizar pedidos
    router.put('/pedidos/:idPedido', 
        auth,
        pedidosController.actualizarPedido
    );

    //Eliminar un pedido
    router.delete('/pedidos/:idPedido',
        auth,
        pedidosController.eliminarPedido
    );

    /** USUARIOS */
    router.post('/crear-cuenta', 
        usuariosController.registrarUsuario
    );
    router.post('/iniciar-sesion',
        usuariosController.autenticarUsuario
    );

    return router;
}