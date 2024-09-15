import jwt, { JwtPayload } from 'jsonwebtoken';
import httpStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../../errors/AppError';
import config from '..';
import { Users } from '../../modules/users/user.model';

export interface CustomRequest extends Request {
  user?: string | JwtPayload;
  token?: string;
}

const auth = (requiredRole?: string) => {
  return catchAsync(
    async (req: CustomRequest, res: Response, next: NextFunction) => {
      const token = req.header('Authorization')?.replace('Bearer ', '');

      if (!token) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          'You have no access to this route',
        );
      }

      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
      const { role, email } = decoded;

      // Check if the user exists
      const user = await Users.isUserExist(email);

      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
      }

      // Check role if required
      if (requiredRole && requiredRole !== role) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          'You have no access to this route',
        );
      }

      // Attach the token and user info to the request object
      req.token = token;
      req.user = decoded;

      next();
    },
  );
};

export default auth;
