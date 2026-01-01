import { Router } from "express";
import { UserController } from "./user.controller";

const userRouter = Router();

userRouter.post("/", UserController.createUser);
userRouter.get("/", UserController.getAllUsers);
userRouter.get("/:id", UserController.getSingleUserById);

export default userRouter;
