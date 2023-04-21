const jwt = require("jsonwebtoken");

module.exports = (roles) => {
  return (req, res, next) => {
    if (req.method === "OPTIONS") next();
    try {
      const token = req.headers.authorization;
      if (!token) return res.status(401).json({ message: "Token required" });
      jwt.verify(token, process.env.JWT_SECRET);
      const decoded = jwt.decode(token, process.env.JWT_SECRET);
      for (let i = 0; i < roles.length; i++) {
        if (decoded.user.roles.includes(roles[i])) return next();
      }
      return res.status(401).json({ message: "Access denied" });
    } catch (error) {
      console.log(error);
      res.status(403).json({ message: "Token error" });
    }
  };
};
