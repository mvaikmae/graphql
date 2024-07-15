const jwt = require('jsonwebtoken');

// Middleware to verify JWT
function verifyToken(req, res, next) {
    const token = req.cookies.jwt;

    if (!token) {
        // res.send('no token at auth')
        return res.status(401).redirect('/');
    }

    try {

        next();
    } catch (error) {
        // console.error('JWT verification error:', error);

        res.send('error with verifying the token at auth')
        // res.status(401).redirect('/');
    }
}

module.exports = verifyToken;
