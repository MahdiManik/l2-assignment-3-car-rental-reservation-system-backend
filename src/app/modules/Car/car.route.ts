import { Router } from 'express';
import validateRequest from '../../config/middleware/validateRequest';
import { carValidationSchema } from './car.validation';
import auth from '../../config/middleware/auth';
import { userRole } from '../users/user.constant';
import { carController } from './car.controller';

const route = Router();

// car create route
route.post(
  '/',
  validateRequest(carValidationSchema.createCarValidationSchema),
  auth(userRole.admin),
  carController.createCar,
);

// all car get route
route.get('/', carController.getAllCar);

// single car get route
route.get('/:id', carController.getSingleCar);

// update car route
route.put(
  '/:id',
  validateRequest(carValidationSchema.updateCarValidationSchema),
  auth(userRole.admin),
  carController.updateCar,
);

// return car route
route.put('/return', validateRequest(carValidationSchema.returnCarValidationSchema), auth(userRole.admin), carController.returnCar);

// delete car route
route.delete('/:id', auth(userRole.admin), carController.deleteCar);

export const carRouter = route;
