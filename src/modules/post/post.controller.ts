import { NextFunction, Request, Response } from "express";
import { PostServices } from "./post.service";

const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await PostServices.createPostService(req.body);

    res.status(200).json({
      success: true,
      message: "Post created successfully!",
      post,
    });
  } catch (error: any) {
    console.log("Could not create post", error.message);
    return res.status(500).json({
      success: false,
      message: "could not create user some error occurred!",
    });
  }
};

export const PostControllers = {
  createPost,
};
