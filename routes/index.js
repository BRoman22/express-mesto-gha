import { Router } from 'express';
import userRouter from './users';
import cardRouter from './cards';
import { NOT_FOUND } from '../utils/statusCodes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/cards', cardRouter);
routes.use('*', (req, res) => res.status(NOT_FOUND)
  .send({ message: 'Такой ресурс еще не создан' }));

export default routes;
