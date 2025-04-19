// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const authMiddleware =
  (roles = []) =>
  (req, res, next) => {
    // Accept roles as an array (e.g., ["admin", "user"]) or as a single role
    if (typeof roles === "string") {
      roles = [roles];
    }

    // Get token from cookies
    const token = req.cookies.token;  // Token stored in the 'token' cookie

    if (!token) {
      return res.status(401).json({ message: "Unauthorized, token missing" });
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach the decoded user info to the request object

      // Check if user's role is allowed
      // if (roles.length && !roles.includes(req.user.role)) {
      //   return res
      //     .status(403)
      //     .json({ message: "Forbidden, insufficient privileges" });
      // }

      next(); // Allow the request to proceed
    } catch (error) {
      res.status(403).json({ message: "Forbidden, token invalid" });
    }
  };

module.exports = authMiddleware;
