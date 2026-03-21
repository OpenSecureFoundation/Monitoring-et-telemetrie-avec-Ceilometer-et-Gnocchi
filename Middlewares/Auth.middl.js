// Importation des modules
import jwt from "jsonwebtoken";
import formatError from "../Utils/format-error.js";
import { decrypt } from "../Utils/crypto.js";

// Export de la fonction authMiddleware
export const authMidll = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log("token form front-end: ", token);
  if (!token) {
    return next(new formatError("Unauthorized", 401));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const username = decoded.username;
    req.user = {
      username: username,
      password: decrypt(decoded.password),
      id: decoded.userId,
    };
    next();
  } catch (error) {
    next(error);
  }
};
