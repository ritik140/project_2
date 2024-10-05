import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //Cloudnary Url
      required: true,
    },
    coverImage: {
      type: String,
    },
    watchhistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video", //Likhna hai
      },
    ],
    password: {
      type: String,
      required: [true, "password is Required"],
    },
    refereshToken: {
      type: String,
    },
  },
  { timestamps: true }
);
// Middleware which is bcrypt the password
userSchema.pre("save", async function (next) {
  // IF PASSWORD FIELD IS MODIFY
  if (this.isModified("password")) {
    this.password = bcrypt.hash(this.password, 10);
    next();
  }
  return;
});
//This is comparing the password of the userInput and bycrpted password
userSchema.methods.isPasswordCorrect = async function (password) {
  bcrypt.compare(password, this.password);
};
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFERSH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};
export const User = mongoose.model("User", userSchema);
