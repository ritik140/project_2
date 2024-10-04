import dotenv from "dotenv";
import app from './app.js'
import connectDB from "./db/index.js";

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000);
  })
  .catch((error) => {
    console.log("Error", error);
  });
