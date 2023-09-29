import { Router } from "express";
import userRouter from "./users.js";
import cardRouter from "./cards.js";
const routes = Router();

routes.use("/users", userRouter);
routes.use("/cards", cardRouter);

export default routes;
