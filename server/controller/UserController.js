import User from "../model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.JWT_SECRET;

export const RegisterUser = async (req, res) => {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password || !role)
      return res.status(400).json({ message: "Please fill all the fields" });
    if (!email.includes("@"))
      return res.status(400).json({ message: "Please enter a valid email" });
    if (password.length < 4)
      return res
        .status(400)
        .json({ message: "Password should be at least 4 characters long" });
    if (role !== "admin" && role !== "user")
      return res
        .status(400)
        .json({ message: "Role should be either admin or user" });
    try {
      const existUser = await User.findOne({ email }).exec();
      if (existUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      const hashedPAssword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        email,
        password: hashedPAssword,
        role,
      });
      await newUser.save();
      return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };


// export const LoginUser = async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password)
//     return res.status(400).json({ message: "Please fill all the fields" });
//   if (!email.includes("@"))
//     return res.status(400).json({ message: "Please enter a valid email" });
//   if (password.length < 4)
//     return res
//       .status(400)
//       .json({ message: "Password should be at least 4 characters long" });
//   try {
//     const userExist = await User.findOne({ email }).exec();
//     if (!userExist) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }
//     const isMatch = await bcrypt.compare(password, userExist.password);
//     if (isMatch) {
//       const payload = {
//         userId: userExist._id,
//         role: userExist.role,
//       };
//       const token = jwt.sign(payload, secretKey, {
//         expiresIn: "1d",
//       });
//       return res.status(200).json({
//         message: "Login successful",
//         user: {
//           username: userExist.username,
//           email: userExist.email,
//           role: userExist.role,
//           token: token,
//         },
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };




export const LoginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Please fill all fields" });
  
    try {
      const user = await User.findOne({ email });
      if (!user)
        return res.status(400).json({ message: "Invalid credentials" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ message: "Invalid credentials" });
  
      const payload = {
        userId: user._id,
        role: user.role,
      };
  
      const token = jwt.sign(payload, secretKey, { expiresIn: "1d" });
  
      return res.status(200).json({
        message: "Login successful",
        user: {
          username: user.username,
          email: user.email,
          role: user.role,
          token: token,
        },
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  };