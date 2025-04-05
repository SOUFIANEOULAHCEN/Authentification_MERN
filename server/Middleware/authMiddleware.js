// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// import User from "../model/UserModel.js";

// dotenv.config();
// const secretKey = process.env.JWT_SECRET;

// export const authMiddleware = (req, res, next) => {
//   //   const token = req.header("Authorization")?.replace("Bearer ", "");
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) {
//     return res.status(401).send("Access denied");
//   }
//   try {
//     const decoded = jwt.verify(token, secretKey);
//     req.userId = decoded.userId;
//     req.role = decoded.role;
//     next();
//   } catch (error) {
//     res.status(400).send("Invalid token");
//   }
// };

// export const adminMiddleware = (req, res, next) => {
//   if (req.role !== "admin") {
//     return res.status(403).send("Access denied");
//   }
//   next();
// };


import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.JWT_SECRET;

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(401).json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, secretKey);
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid token" });
  }
};

export const adminMiddleware = (req, res, next) => {
  if (req.role !== "admin")
    return res.status(403).json({ message: "Access denied. Admins only." });

  next();
};
