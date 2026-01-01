import { Router } from "express";
import { UserController } from "./user.controller";

const userRouter = Router();

userRouter.post("/", UserController.createUser);
userRouter.get("/", UserController.getAllUsers);
userRouter.get("/:id", UserController.getSingleUserById);
userRouter.patch("/:id", UserController.updateUserById);
userRouter.delete("/:id", UserController.deleteUserById);

export default userRouter;
