const jwt = require("jsonwebtoken");

module.exports = function Auths(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json("Application rejected due to lack of token");
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(400).json("Invalid token");
    }
  }
};
