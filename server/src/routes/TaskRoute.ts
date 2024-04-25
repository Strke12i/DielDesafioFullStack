import { Router } from "express";
import { TaskController } from "../controller/TaskController";

const taskRouter = Router();

const taskController = new TaskController();

taskRouter.get("/", taskController.getTasks);
taskRouter.get("/:id", taskController.getTask);
taskRouter.post("/", taskController.createTask);
taskRouter.put("/:id", taskController.updateTask);
taskRouter.delete("/:id", taskController.deleteTask);
taskRouter.get("/user/:id", taskController.getTaskUsers);

export default taskRouter;


