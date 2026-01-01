import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../utils/jwt";
import { prisma } from "../config/db";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken =
        req.cookies.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

      if (!accessToken) {
        res.status(404).json({
          success: false,
          message: "Please login again! No token found",
        });
        throw new Error("No Token Received");
      }
      const verifiedToken = verifyToken(
        accessToken,
        process.env.JWT_VERIFY_SECRET as string
      ) as JwtPayload;
      if (!verifiedToken) {
        res.status(404).json({
          success: false,
          message: "Could not verify user!",
        });
        throw new Error(
          "Could not verify user...maybe the token expired! login again!"
        );
      }
      const isUserExist = await prisma.user.findUnique({
        where: {
          email: verifiedToken.email,
        },
      });
      if (!isUserExist) {
        res.status(404).json({
          success: false,
          message: "User does not exist",
        });
      }

      if (!authRoles.includes(verifiedToken.role)) {
        res.status(403).json({
          success: false,
          message: "You are not permitted to view this route!!!",
        });
        throw new Error("You are not permitted to view this route!!!");
      }
      req.user = verifiedToken;
      next();
    } catch (error: any) {
      console.log("jwt error", error.message);
      next(error);
    }
  };
