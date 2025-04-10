import { catchAsyncErrors } from "../Middlewares/catchAsyncErrors.js";
import ErrorHandler from "../Middlewares/error.js";
import { User } from "../Model/userModel.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../Utils/jwtToken.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return next(new ErrorHandler("Please Fill Full Form", 400));

  let existingUser = await User.findOne({ email });

  if (existingUser) return next(new ErrorHandler("User Already Exists", 400));

  const hashpassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ name, email, password: hashpassword });

  sendCookie(newUser, res, "User Registered Successfully", 201);
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorHandler("Enter Both email & password", 400));

  const existingUser = await User.findOne({ email }).select("+password");

  if (!existingUser)
    return next(new ErrorHandler("Invalid email or password", 400));

  const isMatch = await bcrypt.compare(password, existingUser.password);

  if (!isMatch) return next(new ErrorHandler("Invalid email or password", 400));

  sendCookie(existingUser, res, ` Welcome Back ${existingUser.name}`, 200);
});

export const myProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),

      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })

    .json({
      success: true,
      user: req.user,
      message: "Logout Successfully",
    });
};
