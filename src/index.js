import express from "express";
import "dotenv/config";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello there!");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is Listen to the Port: ${process.env.PORT}`);
});
