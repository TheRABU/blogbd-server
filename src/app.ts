import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import compression from "compression";
import userRouter from "./modules/user/user.routes";
import authRouter from "./modules/auth/auth.routes";
import postRouter from "./modules/post/post.routes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(compression());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/post", postRouter);

app.get("/", (req, res) => {
  res.send("API is running");
});

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

export default app;
