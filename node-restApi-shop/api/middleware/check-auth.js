const jwt = require('jsonwebtoken');

module.exports = (res, req, next) => {
    const token = req.body.token;
    const decoded = jwt.verify(token, 'secretjaey');
        req.userData = decoded;
        next();;

    // try {
    //     const decoded = jwt.verify(req.body.token, 'secretjaey');
    //     req.userData = decoded;
    //     next();
    // }
    // catch (error) {
    //    return res.sendStatus(401).json({
    //         message: 'Auth Failed'
    //     });
    // }
}