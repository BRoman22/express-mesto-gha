import { Router } from "express";
import userRouter from "./users.js";
import cardRouter from "./cards.js";
const routes = Router();

routes.use("/users", userRouter);
routes.use("/cards", cardRouter);
routes.use("*", (req, res) =>
  res.status(404).send({ message: "Такой ресурс еще не создан" })
);

export default routes;
