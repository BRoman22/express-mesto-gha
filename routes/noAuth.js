import { Router } from 'express';
import {
  loginValidation,
  createUserValidation,
} from '../middlewares/requestValidation';
import { login, createUser } from '../controllers/users';

const noAuthRouter = Router();

noAuthRouter.post('/signin', loginValidation, login);
noAuthRouter.post('/signup', createUserValidation, createUser);

export default noAuthRouter;
