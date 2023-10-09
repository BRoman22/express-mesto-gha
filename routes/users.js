import { Router } from 'express';
import {
  getUsers,
  getUserById,
  userUpdateProfile,
  userUpdateAvatar,
} from '../controllers/users';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:userId', getUserById);
userRouter.patch('/me', userUpdateProfile);
userRouter.patch('/me/avatar', userUpdateAvatar);

export default userRouter;
