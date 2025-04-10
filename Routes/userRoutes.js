import express from "express";
import {
  login,
  logout,
  myProfile,
  register,
} from "../Controller/userController.js";
import { isAuthenticatedUser } from "../Middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/myprofile", isAuthenticatedUser, myProfile);
router.get("/logout", logout);
export default router;
