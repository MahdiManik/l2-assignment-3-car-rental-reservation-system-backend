import { Router } from 'express';
import { userRouter } from '../../modules/users/user.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: userRouter,
  },
  // {
  //   path: '/cars',
  //   route: carRoute,
  // },
  // {
  //   path: '/bookings',
  //   route: bookingRouter,
  // },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
