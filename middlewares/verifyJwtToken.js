
const jwt = require("jsonwebtoken");

const verifyJwtToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({
        message: "Authentication failed",
      });
    }
  } else {
    res.status(401).json({
      message: "Authentication failed",
    });
    // next('Authentication failed');
  }
};

module.exports = { verifyJwtToken };