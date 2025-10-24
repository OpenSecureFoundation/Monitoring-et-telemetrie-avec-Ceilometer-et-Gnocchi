// Importation des modules
const jwt = require("jsonwebtoken");
const AppError = require("../Utils/Error-formatter.util");

// Export de la fonction authMiddleware
module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return next(new AppError("Unauthorized", 401));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const username = decoded.username;
    req.user = {
      username: username,
    };
    next();
  } catch (error) {
    next(error);
  }
};
