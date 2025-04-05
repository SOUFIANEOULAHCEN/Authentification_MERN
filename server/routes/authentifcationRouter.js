import express from "express";
import { LoginUser, RegisterUser } from "../controller/UserController.js";
import {
  adminMiddleware,
  authMiddleware,
} from "../Middleware/authMiddleware.js";

export const authentifcationRouter = express.Router();

authentifcationRouter.get("/hello", (req, res) => {
  res.send("Hello from authentifcationRouter");
});
authentifcationRouter.post("/register", RegisterUser);
authentifcationRouter.post("/login", LoginUser);

// authentifcationRouter.get(
//   "/dashbordAdmin",
//   authMiddleware,
//   adminMiddleware,
//   (req, res) => {
//     res.send(`Hello Admin ${req.userId} ${req.role}`);
//   }
// );

authentifcationRouter.get("/dashbordAdmin", authMiddleware, adminMiddleware, (req, res) => {
  res.json(`Hello Admin - ID: ${req.userId}, Role: ${req.role}`);
});
authentifcationRouter.get("/register", (req, res) => {
  res.json("Hello from authentifcationRouter register");
});
