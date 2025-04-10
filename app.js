import { config } from "dotenv";
import express from "express";
import { errorMiddleware } from "./Middlewares/error.js";
import userRouter from "./Routes/userRoutes.js";
import taskRouter from "./Routes/taskRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

config({
  path: "./data/config.env",
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/task", taskRouter);

app.use(errorMiddleware);
export default app;
