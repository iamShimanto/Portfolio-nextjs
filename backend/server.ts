import dotenv from "dotenv";
dotenv.config();
import app from "./app";

import dbConfig from "./config/dbConfig";
import { env } from "./config/envConfig";
import redis from "./config/redis";
import {
  startContactMailQueueWorker,
  stopContactMailQueueWorker,
} from "./services/contactMailQueue";

async function startServer() {
  try {
    await dbConfig();

    await redis.ping();
    await startContactMailQueueWorker();

    const server = app.listen(env.PORT, () => {
      console.log(`Server running on http://localhost:${env.PORT}`);
    });

    const gracefulShutdown = async () => {
      console.log("Shutting down gracefully...");
      server.close(async () => {
        await stopContactMailQueueWorker();
        process.exit(0);
      });
    };

    process.on("SIGTERM", gracefulShutdown);
    process.on("SIGINT", gracefulShutdown);
  } catch (error) {
    console.log("Failed to connect Database");

    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.log(error);
    }

    process.exit(1);
  }
}

startServer();
