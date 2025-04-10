import app from "./app.js";
import { connectDB } from "./data/database.js";

connectDB();

app.get("/", (req, res) => {
  res.send("Home");
});

app.listen(process.env.PORT, () => {
  console.log(
    `Server Is Working On Port ${process.env.PORT} In ${process.env.NODE_ENV} Mode`
  );
});
