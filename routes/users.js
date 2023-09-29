import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  userUpdateProfile,
  userUpdateAvatar,
} from '../controllers/users';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:userId', getUserById);
userRouter.post('/', createUser);
userRouter.patch('/me', userUpdateProfile);
userRouter.patch('/me/avatar', userUpdateAvatar);

export default userRouter;
