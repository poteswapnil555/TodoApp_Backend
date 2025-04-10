import { catchAsyncErrors } from "../Middlewares/catchAsyncErrors.js";
import ErrorHandler from "../Middlewares/error.js";
import { Task } from "../Model/taskModel.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../Utils/jwtToken.js";

export const newTask = catchAsyncErrors(async (req, res, next) => {
  const { title, description } = req.body;

  if (!title || !description)
    return next(new ErrorHandler("title and description required", 400));

  if (!req.user)
    return next(new ErrorHandler("user authentication failed", 401));

  await Task.create({ title, description, user: req.user._id });

  res.status(201).json({
    success: true,
    message: "Task Added Successfully",
  });
});

export const myTasks = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;

  const tasks = await Task.find({ user: userId });

  res.status(200).json({
    success: true,
    count: tasks.length,
    tasks,
  });
});

export const updateTask = catchAsyncErrors(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) return next(new ErrorHandler("Task Not Found", 404));

  task.isCompleted = !task.isCompleted;

  await task.save();

  res.status(200).json({
    success: true,
    message: "Task Updated Successfully",
  });
});

export const deleteTask = catchAsyncErrors(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) return next(new ErrorHandler("Task Not Found", 404));

  await task.deleteOne();

  res.status(200).json({
    success: true,
    message: "Task Deleted Successfully",
  });
});
