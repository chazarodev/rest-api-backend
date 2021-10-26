const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    //Autorización por el header
    const authHeader = req.get('Authorization');

    if (!authHeader) {
        const error = new Error('No autenticado, ausencia de JWT');
        error.statusCode = 401;
        throw error;
    }

    //Obtener el token y verificar su validez
    const token = authHeader.split(' ')[1];
    let revisarToken;
    try {
        revisarToken = jwt.verify(token, 'LLAVESECRETA');
    } catch (error) {
        error.statusCode = 500;
        throw error;
    }

    //Token para válido pero hay un error
    if (!revisarToken) {
        const error = new Error('No autenticado');
        error.statusCode = 401;
        throw error;
    }

    //Pasa toda la verificación
    next();
}