import { Router } from "express";
import { PostControllers } from "./post.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../../types/User";

const postRouter = Router();

postRouter.post("/", checkAuth(Role.USER), PostControllers.createPost);

export default postRouter;
