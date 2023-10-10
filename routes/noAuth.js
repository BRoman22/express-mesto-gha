import { Router } from 'express';
import {
  createUserValidation,
  loginValidation,
} from '../middlewares/requestValidation';
import { createUser, login } from '../controllers/users';

const noAuthRouter = Router();

noAuthRouter.post('/signup', createUserValidation, createUser);
noAuthRouter.post('/signin', loginValidation, login);

export default noAuthRouter;
