const jwt = require('jsonwebtoken');

module.exports = (res, req, next) => {
    // get headers
    const bearerHeaders = req.headers['authorization'];

    // checkif bearer is undefined
    if(typeof bearerHeaders !== 'undefined'){
        // split at space
        const bearer = bearerHeader.split(' ');
        // get token from array
        const bearerToken = bearer[1];
        // set token
        req.token = bearerToken
        // next middleware
        next();

    }else{
        return res.sendStatus(401).json({
            message: 'Auth Failed'
        });
    }

    const decoded = jwt.verify(req.body.token, 'secretjaey');
        req.userData = decoded;
        next();

    // try {
    //     const decoded = jwt.verify(req.body.token, 'secretjaey');
    //     req.userData = decoded;
    //     next();
    // }
    // catch (error) {
    //     return res.sendStatus(401).json({
    //         message: 'Auth Failed'
    //     });
    // }
}