import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import { TLogin, TUser } from './user.interface';
import config from '../../config';
import { Users } from './user.model';
import bcrypt from 'bcrypt';
import AppError from '../../errors/AppError';

const createUserIntoDB = async (payload: TUser) => {
  const { password, ...userinfo } = payload;
  const hashedPassword = await bcrypt.hash(password, config.bcrypt_salt_rounds);
  const result = await Users.create({ password: hashedPassword, ...userinfo });
  return result;
};

const loginUserIntoDB = async (payload: TLogin) => {
  // Check if the user exists
  const isUserExist = await Users.findOne({ email: payload.email }).select(
    '+password',
  );
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exist!');
  }

  // Compare the provided password with the stored hashed password
  const matchPassword = await bcrypt.compare(
    payload.password,
    isUserExist.password,
  );

  if (!matchPassword) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
  }

  // If password matches, create a JWT token
  const data = {
    email: isUserExist.email,
    role: isUserExist.role,
  };
  const token = jwt.sign(data, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });

  // Return the user data and token
  return { data: isUserExist, token };
};

export const userServices = {
  createUserIntoDB,
  loginUserIntoDB,
};
