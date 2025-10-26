const jwt = require("jsonwebtoken");

exports.authRequired = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "No token provided!" });

  const token = authHeader.split(" ")[1]; // "Bearer token"

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token!" });

    req.user = decoded;
    next();
  });
};

exports.adminOnly = (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Admin only!" });

  next();
};
