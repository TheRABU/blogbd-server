import { NextFunction, Request, Response } from "express";
import { PostServices } from "./post.service";

const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.user.email;
    const { id: authorId } = req.user;
    if (!email) {
      return res.status(404).json({
        success: false,
        message: "No user email found!!!!!",
      });
    }
    const postData = {
      ...req.body,
      authorId: authorId,
    };

    const post = await PostServices.createPostService(postData);

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
