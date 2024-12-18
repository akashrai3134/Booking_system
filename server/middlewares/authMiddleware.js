const jwt = require("jsonwebtoken");
const userModel = require('../models/userModel')

const authMiddleware = (req, res, next) => {
  try {
    // Check if Authorization header exists
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    // Extract the token from the Authorization header
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token missing from header" });
    }

    // Verify the token
    const verifiedToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log('verifiedToken', verifiedToken);

    // Attach the verified token payload to the request object
    req.body.userId = verifiedToken.userId;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle token verification errors
    console.error("JWT verification failed:", error.message);
    return res.status(401).json({ success : false, message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
