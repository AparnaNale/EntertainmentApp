const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Bookmark routes सारखे protected routes साठी - हा middleware
// "Authorization: Bearer <token>" header तपासतो आणि req.user सेट करतो
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // password सोडून बाकी user info request वर attach करतो
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      return next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, invalid token" });
    }
  }

  return res.status(401).json({ message: "Not authorized, no token provided" });
};

module.exports = { protect };
