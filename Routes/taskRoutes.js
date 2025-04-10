import express from "express";
import {
  deleteTask,
  myTasks,
  newTask,
  updateTask,
} from "../Controller/taskController.js";
import { isAuthenticatedUser } from "../Middlewares/auth.js";

const router = express.Router();

router.post("/newtask", isAuthenticatedUser, newTask);
router.get("/mytasks", isAuthenticatedUser, myTasks);

router
  .route("/:id")
  .put(isAuthenticatedUser, updateTask)
  .delete(isAuthenticatedUser, deleteTask);

export default router;
