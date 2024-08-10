import jwt, { JwtPayload } from 'jsonwebtoken';
import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import AppError from '../../errors/AppError';
import config from '..';
import { Users } from '../../modules/users/user.model';

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

const auth = (requiredRole?: string) => {
  return catchAsync(async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      );
    }
    const decoded = jwt.verify(token, config.jwt_access_secret as string);
    const { role, email } = decoded as JwtPayload;

    // checking if the user is exist
    const user = await Users.isUserExist(email);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }

    if (requiredRole && requiredRole !== role) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      );
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
