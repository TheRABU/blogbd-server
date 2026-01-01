import { Request, Response } from "express";
import { AuthServices } from "./auth.service";

const loginWithCredentials = async (req: Request, res: Response) => {
  try {
    const isProduction = process.env.NODE_ENV === "production";
    const login = await AuthServices.loginCredentialsService(req.body);

    res.cookie("accessToken", login.accessToken, {
      httpOnly: true,
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction,
      path: "/",
    });

    res.status(201).json({
      success: true,
      message: "Logged In successfully!",
      login,
    });
  } catch (error: any) {
    console.log("failed to login! sorry", error.message);
    return res.status(401).json({
      success: false,
      message: error.message || "Internal server issue!",
    });
  }
};

const logOut = async (req: Request, res: Response) => {
  try {
    const isProduction = process.env.NODE_ENV === "production";
    res.clearCookie("accessToken", {
      httpOnly: true,
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction,
      path: "/",
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully!",
    });
  } catch (error: any) {
    console.log("could not logout error", error.message);
    return res.status(401).json({
      success: false,
      message: error.message || "Internal server issue!",
    });
  }
};

export const AuthControllers = {
  loginWithCredentials,
  logOut,
};
