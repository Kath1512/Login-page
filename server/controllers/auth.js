const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateAccessToken(user, exp){
    return jwt.sign({...user}, process.env.ACCESS_KEY, {
        expiresIn: exp
    })
}

function generateRefreshToken(user, exp){
    return jwt.sign({...user}, process.env.REFRESH_KEY, {
        expiresIn: exp
    })
}

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    if(!token) return res.status(401).json({message: "No token provided", status: false});
    jwt.verify(token, process.env.ACCESS_KEY, (err, user) => {
        if(err) return res.status(403).json({message: "Invalid token", status: false});
        req.user = user;
        next();
    }); 
}

module.exports = {generateAccessToken, generateRefreshToken, authenticateToken};