const Productos = require('../models/Productos');
const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');

//Configuración de multer
const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + '../../uploads/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Formato No válido'));
        }
    }
}

//Pasar la configuración y el campo
const upload = multer(configuracionMulter).single('imagen');

//Sube un archivo
exports.subirUnArchivo = (req, res, next) => {
    upload(req, res, function(error) {
        if (error) {
            res.json({mensaje: error});
        }
        return next();
    })
}

//Agrega nuevos productos
exports.nuevoProducto = async (req, res, next) => {
    const producto = new Productos(req.body);

    try {
        if (req.file.filename) {
            producto.imagen = req.file.filename
        }
        await producto.save();
        res.json({mensaje: 'Se agregó un nuevo producto'});
    } catch (error) {
        console.log(error);
        next();
    }
}

//Mostrar los productos
exports.mostrarProductos = async (req, res, next) => {

    try {
        //Obtener todos los productos
        const productos = await Productos.find({});
        res.json(productos);
    } catch (error) {
        console.log(error);
        next();
    }
}

//Muestra un producto en específico por su id
exports.mostrarProducto = async (req, res, next) => {
    const producto = await Productos.findById(req.params.idProducto);

    if (!producto) {
        res.json({mensaje: 'Producto no encontrado'});
        return next();
    }

    //Mostrar el producto
    res.json(producto);
}

//Actualiza un producto vía id
exports.actualizarProducto = async (req, res, next) => {
    try {

        //Actualizar imagen en caso de
        let productoAnterior = await Productos.findById(req.params.idProducto);

        //Construir nuevo producto
        let nuevoProducto = req.body;

        //Verificar si hay imagen nueva
        if (req.file) {
            //Obtener ruta de imagen anterior
            const imagenAnteriorPath = __dirname + `/../uploads/${productoAnterior.imagen}`; 
            
            //Eliminar imagen anterior
            fs.unlink(imagenAnteriorPath, (error) => {
                if (error) {
                    console.log(error);
                }
                return;
            })

            //Almacenar nueva Imagen
            nuevoProducto.imagen = req.file.filename;
        } else {
            nuevoProducto = productoAnterior.imagen;
        }

        let producto = await Productos.findOneAndUpdate({
            _id: req.params.idProducto
        }, nuevoProducto, {
            new: true
        });
        res.json(producto);
    } catch (error) {
        console.log(error);
        next();
    }
}

//Elimina un producto via ID
exports.eliminarProducto = async (req, res, next) => {
    try {

        //Obtener la imagen anterior
        let imagenAnterior = await Productos.findById(req.params.idProducto);

        if (imagenAnterior) {
            const imagenAnteriorPath = __dirname + `/../uploads/${imagenAnterior.imagen}`; 
                
            //Eliminar imagen anterior
            fs.unlink(imagenAnteriorPath, (error) => {
                if (error) {
                    console.log(error);
                }
                return;
            })
        }

        await Productos.findByIdAndDelete({_id: req.params.idProducto});
        res.json({mensaje: 'El producto se ha eliminado'});
    } catch(error) {
        console.log(error);
        next();
    }
}
