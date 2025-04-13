// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const authMiddleware =
  (roles = []) =>
  (req, res, next) => {
    // Accept roles as an array (e.g., ["admin", "user"]) or as a single role
    if (typeof roles === "string") {
      roles = [roles];
    }

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, token missing" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      // Check if user's role is allowed
      if (roles.length && !roles.includes(req.user.role)) {
        return res
          .status(403)
          .json({ message: "Forbidden, insufficient privileges" });
      }

      next();
    } catch (error) {
      res.status(403).json({ message: "Forbidden, token invalid" });
    }
  };

module.exports = authMiddleware;
