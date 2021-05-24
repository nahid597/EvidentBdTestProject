const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req,res,next) {
    const token = req.header('x-auth-token');

    if(!token) {
        return res.status(200).send({
            successful: false,
            message: "Access denied. Invalid token",
            data: ""
        })
    }

    try{
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    } catch(ex) {
        res.status(200).send({
            successful: false,
            message: "Access denied. Invalid token",
            data: ""
        }) 
    }
}
