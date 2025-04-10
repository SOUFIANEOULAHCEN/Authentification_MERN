import express from "express";
import cors from "cors";
import connectDb from "./lib/ConnectDb.js";
import { authentifcationRouter } from "./routes/authentifcationRouter.js";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

connectDb();
app.use(
  cors({
    origin: "http://localhost:5173", // ou le port que Vite utilise
    credentials: true,
  })
);
// app.use(
//   cors({
//     origin: "http://client", // ou "http://localhost" selon votre configuration
//     credentials: true,
//   })
// );
app.use(express.json());

app.use("/auth", authentifcationRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
