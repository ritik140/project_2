import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public")); //To store the images and favicon
app.use(cookieParser());

//Routes Import
import userRouter from "./routes/user.routes.js";
import tweetRouter from "./routes/tweet.routes.js";

//routes Declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tweet", tweetRouter);
// https://localhost:80000/api/v1/users/register

export { app };
