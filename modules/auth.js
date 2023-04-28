const jwt = require("jsonwebtoken");

module.exports = (req, roles) => {
  if (req.headers.authorization?.includes("Bearer "))
    req.headers.authorization = req.headers.authorization.replace(
      "Bearer ",
      ""
    );

  const token = req.headers.authorization;
  if (!token) return false;
  jwt.verify(token, process.env.JWT_SECRET);
  const decoded = jwt.decode(token, process.env.JWT_SECRET);
  for (let i = 0; i < roles.length; i++) {
    if (decoded.user.roles.includes(roles[i])) return true;
  }
  return false;
};
