import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserService.createUserService(req.body);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      result,
    });
  } catch (error) {
    console.log("failed to create user", error);
    return res.status(500).json({
      success: false,
      message: "Internal server issue!",
    });
  }
};

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await UserService.getAllUsersService();
    res.status(201).json({
      success: true,
      message: "Users fetched successfully!",
      users,
    });
  } catch (error) {
    console.log("failed to get all users! sorry", error);
    return res.status(500).json({
      success: false,
      message: "Internal server issue!",
    });
  }
};

const getSingleUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserService.getSingleUserService(Number(req.params.id));

    res.status(201).json({
      success: true,
      message: "User fetched successfully!",
      user,
    });
  } catch (error) {
    console.log("failed to get user! sorry", error);
    return res.status(500).json({
      success: false,
      message: "Internal server issue!",
    });
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUserById,
};
