import dotenv from "dotenv";
// import express from "express";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./env",
});

connectDB();

// const app = express();

// app.get("/", (req, res) => {
//   res.send("Hello there!");
// });

// app.listen(process.env.PORT, () => {
//   console.log(`Server is Listen to the Port: ${process.env.PORT}`);
// });
