import express from "express";
import {
  checkAuth,
  login,
  signup,
  updateProfile,
} from "../controllers/userController";
import { protectRoutes } from "../middleware/auth";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.put("/update-profile", protectRoutes, updateProfile);
userRouter.get("/check-auth", protectRoutes, checkAuth);

export default userRouter;
