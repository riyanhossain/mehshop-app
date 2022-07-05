const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config();

const decodeToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET_KEY)
}

module.exports = { decodeToken };