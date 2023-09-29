import express, { json } from "express";
import mongoose from "mongoose";
//import "dotenv/config";
import routes from "./routes/index.js";

const { PORT = 3000, MONGO_URL = "mongodb://127.0.0.1:27017/mestodb" } =
  process.env;

const app = express();

app.use(json());

app.use((req, res, next) => {
  req.user = {
    _id: "6511852e414b3637f848e584",
  };
  next();
});

app.use("/", routes);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("");
    console.log("Mongo connect");
    app.listen(PORT);
    console.log(`App listening on port ${PORT}`);
  })
  .catch(() => console.log("Mongo dont connect"));
