import express from "express";
import todoController from "../controller/todoController.js";

const router = express.Router();

router.post("/", todoController.postTodo);
router.put("/:id", todoController.putTodo);
router.patch("/:id", todoController.patchTodo);
router.delete("/:id", todoController.deleteTodo);
router.get("/", todoController.getTodo);
router.get("/:id", todoController.getTodoById);
router.post("/bulk", todoController.postBulkTodo);
router.delete("/", todoController.multipleDeleteTodo);

export default router;
