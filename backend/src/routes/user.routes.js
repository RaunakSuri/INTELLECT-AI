import { Router } from "express";
import { getAnswer } from "../controllers/user.controller.js";
const userRouter = Router();

userRouter.post("/ask", getAnswer);

export { userRouter };
