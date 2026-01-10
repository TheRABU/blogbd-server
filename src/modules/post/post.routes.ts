import { Router } from "express";
import { PostControllers } from "./post.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../../types/User";

const postRouter = Router();

postRouter.get("/stats", PostControllers.getBlogStat);

// getMyPosts
postRouter.get("/my-posts", checkAuth(Role.USER), PostControllers.getMyPosts);

postRouter.post("/", PostControllers.createPost);
postRouter.get("/", PostControllers.getAllPosts);
postRouter.get(
  "/:id",
  checkAuth(Role.USER, Role.ADMIN),
  PostControllers.getPostById
);
postRouter.patch("/:id", PostControllers.updatePost);
postRouter.delete("/:id", PostControllers.deletePost);

export default postRouter;
