import { Router } from 'express';
import auth from '../../config/middleware/auth';
import { userRole } from '../users/user.constant';
import validateRequest from '../../config/middleware/validateRequest';
import { bookingValidationSchema } from './booking.validation';
import { bookingController } from './booking.controller';

const route = Router();

route.post(
  '/',
  auth(userRole.user),
  validateRequest(bookingValidationSchema.createBookingValidationSchema),
  bookingController.createBooking,
);

route.get('/', auth(userRole.admin), bookingController.getAllBooking);

route.get(
  '/my-bookings',
  auth(userRole.user),
  bookingController.getBookingByEmail,
);

export const bookingRouter = route;
