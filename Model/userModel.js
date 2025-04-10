import mongoose from "mongoose";
import validator from "validator";
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter Your Name"],
    minLength: [4, "Name Must Contain Atleast 4 Characters"],
    maxLength: [30, "Name Cannot Exceed 30 Characters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Enter valid Email"],
  },

  password: {
    type: String,
    required: true,
    minLength: [8, "Password Must Contain 8 Characters"],
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model("User", schema);
