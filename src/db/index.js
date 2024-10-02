import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    console.log(process.env.MONGODB_URI);

    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI} /${DB_NAME}`
    );
    console.log(`MonogoDB Connected !! ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("MONGO_DB ERROR:", error);
    process.exit(1);
  }
};

export default connectDB;
