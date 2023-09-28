import express, { json } from "express";
import mongoose from "mongoose";
import "dotenv/config";
import userRouter from "./routes/users.js";
import cardRouter from "./routes/cards.js";

const { PORT, MONGO_URL } = process.env;

const app = express();

app.use(json());

app.use((req, res, next) => {
  req.user = {
    _id: "6511852e414b3637f848e584",
  };
  next();
});

app.use("/users", userRouter);
app.use("/cards", cardRouter);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("");
    console.log("Mongo connect");
    app.listen(PORT);
    console.log(`App listening on port ${PORT}`);
  })
  .catch(() => console.log("Mongo dont connect"));
