import { Router } from "express";
import { TagController } from "../controller/TagController";

const tagRouter = Router();

const tagController = new TagController();

tagRouter.get("/", tagController.getTags);
tagRouter.get("/:id", tagController.getTag);
tagRouter.post("/", tagController.createTag);
tagRouter.put("/:id", tagController.updateTag);
tagRouter.delete("/:id", tagController.deleteTag);

export default tagRouter;