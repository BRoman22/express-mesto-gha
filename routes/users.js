import { Router } from 'express';
import {
  getUserByIdValidation,
  updateUserProfileValidation,
  updateUserAvatarValidation,
} from '../middlewares/requestValidation';
import {
  getUsers,
  getCurrentUserInfo,
  getUserById,
  userUpdateProfile,
  userUpdateAvatar,
} from '../controllers/users';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/users/me', getCurrentUserInfo);
userRouter.get('/users/:userId', getUserByIdValidation, getUserById);
userRouter.patch('/users/me', updateUserProfileValidation, userUpdateProfile);
userRouter.patch('/users/me/avatar', updateUserAvatarValidation, userUpdateAvatar);

export default userRouter;
