import { Router } from "express";
import { PostControllers } from "./post.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../../types/User";

const postRouter = Router();

postRouter.get("/stats", PostControllers.getBlogStat);

postRouter.post("/", checkAuth(Role.USER), PostControllers.createPost);
postRouter.get("/", PostControllers.getAllPosts);
postRouter.get("/:id", PostControllers.getPostById);
postRouter.patch("/:id", PostControllers.updatePost);
postRouter.delete("/:id", PostControllers.deletePost);

export default postRouter;
