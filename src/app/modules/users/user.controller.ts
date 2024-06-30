import httpStatus from 'http-status';
import catchAsync from '../../config/utils/catchAsync';
import sendResponse from '../../config/utils/sendResponse';
import { userServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const result = await userServices.createUserIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK || 201,
    message: 'User registered successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await userServices.loginUserIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK || 201,
    message: 'User logged in successfully!',
    data: result,
  });
});

export const userController = {
  createUser,
  loginUser,
};
