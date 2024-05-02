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
taskRouter.post("/user/:taskId/:userId", taskController.assignTask);
taskRouter.delete("/user/:taskId/:userId", taskController.unassignTask);
taskRouter.get("/tag/:id", taskController.getTaskTags);
taskRouter.post("/tag/:taskId/:tagId", taskController.addTag);
taskRouter.delete("/tag/:taskId/:tagId", taskController.removeTag);

export default taskRouter;


