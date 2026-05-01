import mongoose from "mongoose";
import { env } from "./envConfig";
import { prisma } from "./prisma";

const dbConfig = async () => {
  await mongoose.connect(env.MONGODB_URI);
  console.log("MongoDB connected successfully");

  await prisma.$connect();
  await prisma.$queryRaw`SELECT 1`;
  console.log("PostgreSQL connected successfully");

  return {
    mongoose,
    prisma,
  };
};

export default dbConfig;
