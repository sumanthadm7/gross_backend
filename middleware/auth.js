const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    const userToken = req.header('Authorization');
    const token = userToken.split(' ')[1]; 
    if (!userToken) {
        return res.status(401).json({ message: 'Authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
}

module.exports = auth;