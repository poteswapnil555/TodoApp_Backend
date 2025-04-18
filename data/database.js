import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "TodoList",
    })
    .then((c) => console.log(`Database Connected With ${c.connection.host}`))
    .catch((e) => console.log(e));
};
