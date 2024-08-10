import { Router } from 'express';
import { userRouter } from '../../modules/users/user.route';
import { carRouter } from '../../modules/Car/car.route';
import { bookingRouter } from '../../modules/Booking/booking.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: userRouter,
  },
  {
    path: '/cars',
    route: carRouter,
  },
  {
    path: '/bookings',
    route: bookingRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
