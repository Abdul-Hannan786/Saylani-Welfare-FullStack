import dotenv from "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => res.send("Hello World"));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter)

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`⚙️  Server is running at port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB connection failed !!! ", err);
  });
