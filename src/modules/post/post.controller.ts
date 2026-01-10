import { NextFunction, Request, Response } from "express";
import { PostServices } from "./post.service";

const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const email = req.user.email;
    // const { id: authorId } = req.user;
    // if (!email) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "No user email found!!!!!",
    //   });
    // }
    const postData = {
      ...req.body,
      // authorId: authorId,
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

const getAllPosts = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = (req.query.search as string) || "";
    const isFeatured = req.query.isFeatured
      ? req.query.isFeatured === "true"
      : undefined;
    const tags = req.query.tags ? (req.query.tags as string).split(",") : [];

    const result = await PostServices.getAllPosts({
      page,
      limit,
      search,
      isFeatured,
      tags,
    });

    res.status(200).json({
      success: true,
      message: "fetched All Posts successfully!",
      result,
    });
  } catch (error: any) {
    console.log("error at getAllPosts::", error.message);
    return res.status(500).json({
      success: false,
      message: "could not get posts error occurred!",
    });
  }
};

const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await PostServices.getPostById(Number(req.params.id));
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.status(200).json({
      success: true,
      message: "fetched post data successfully!",
      post,
    });
  } catch (error: any) {
    console.log("error at getPostById::", error.message);
    return res.status(500).json({
      success: false,
      message: "could not get post details error occurred!",
    });
  }
};
const updatePost = async (req: Request, res: Response) => {
  try {
    const post = await PostServices.updatePost(Number(req.params.id), req.body);
    res.status(200).json({
      success: true,
      message: "updated post data successfully!",
      post,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "could not update post details error occurred!",
    });
  }
};

const deletePost = async (req: Request, res: Response) => {
  await PostServices.deletePost(Number(req.params.id));
  res.json({ message: "Post deleted" });
};

const getBlogStat = async (req: Request, res: Response) => {
  try {
    const result = await PostServices.getBlogStat();
    res.status(200).json({
      success: true,
      message: "Data fetched for stat of blog posts",
      result,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stats", details: err });
  }
};

const getMyPosts = async (req: Request, res: Response) => {
  try {
    const email = req.user.email;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const result = await PostServices.getMyPostsService({
      email,
      page,
      limit,
    });
    res.status(200).json({
      success: true,
      message: "User posts fetched successfully",
      data: result,
      pagination: result.pagination,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stats", details: error });
  }
};

export const PostControllers = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getBlogStat,
  //user
  getMyPosts,
};
