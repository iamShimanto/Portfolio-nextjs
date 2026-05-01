import mongoose from "mongoose";
import { env } from "./envConfig";

const dbConfig = async () => {
  await mongoose.connect(env.MONGODB_URI);
};

export default dbConfig;
