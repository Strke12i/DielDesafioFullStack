import { Router } from "express";
import authRouter from "./AuthRoute";
import taskRouter from "./TaskRoute";
import userRouter from "./UserRoute";

const routes = Router();

routes.use("/auth", authRouter);
routes.use("/task", taskRouter);
routes.use("/user", userRouter);

export default routes;