import { Router } from "express";
import { PostControllers } from "./post.controller";

const postRouter = Router();

postRouter.post("/", PostControllers.createPost);

export default postRouter;
