import express from "express";
const app = express();
import routes from "./routes/index";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import dns from "dns";
import { env } from "./config/envConfig";
import { errorHandler } from "./middleware/errorHandler";

dns.setServers(["1.1.1.1", "1.0.0.1"]);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", 1);
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: [
      env.CLIENT_URL1,
      env.CLIENT_URL2,
      env.CLIENT_URL3,
      env.CLIENT_URL4,
    ].filter(Boolean),
    credentials: true,
  }),
);
app.use(routes);

app.use(errorHandler);

export default app;
