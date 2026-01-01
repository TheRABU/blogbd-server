import { Router } from "express";
import { AuthControllers } from "./auth.controller";

const authRouter = Router();

authRouter.post("/login", AuthControllers.loginWithCredentials);
authRouter.post("/logout", AuthControllers.logOut);

export default authRouter;
