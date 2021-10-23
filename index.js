const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');

//Conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restapis', {
    useNewURLParser: true
})

//Crear el servidor
const app = express();

//Habilitar bodyparser
app.use(express.json()); //BodyParser is deprecated, this works as well
app.use(express.urlencoded({extended: true}));

//Rutas de la app
app.use('/', routes());

//Puerto
app.listen(5000);