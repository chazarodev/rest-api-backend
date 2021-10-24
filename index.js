const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');

//Importar cors para permitir el consumo de la api en un tercero
const cors = require('cors');

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

//Habilitar cors
app.use(cors());

//Rutas de la app
app.use('/', routes());

//Puerto
app.listen(5000);