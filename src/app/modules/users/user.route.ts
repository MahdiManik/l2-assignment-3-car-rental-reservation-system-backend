import { Router } from 'express';
import validateRequest from '../../config/middleware/validateRequest';
import { userValidationSchema } from './user.validation';
import { userController } from './user.controller';

const route = Router();

route.post(
  '/signup',
  validateRequest(userValidationSchema.createUserValidationSchema),
  userController.createUser,
);

route.post(
  '/signin',
  validateRequest(userValidationSchema.loginUserValidationSchema),
  userController.loginUser,
);

export const userRouter = route;
