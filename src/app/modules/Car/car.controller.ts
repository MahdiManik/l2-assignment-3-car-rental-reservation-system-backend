import httpStatus from 'http-status';
import catchAsync from '../../config/utils/catchAsync';
import sendResponse from '../../config/utils/sendResponse';
import { carServices } from './car.service';

const createCar = catchAsync(async (req, res) => {
  const result = await carServices.createCarIntoDB(req.body);
  sendResponse(res, {
    data: result,
    success: true,
    statusCode: httpStatus.OK,
    message: 'Car created successfully!',
  });
});

const getAllCar = catchAsync(async (req, res) => {
  const result = await carServices.getAllCarIntoDB();
  sendResponse(res, {
    data: result,
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cars retrieved successfully!',
  });
});

const getSingleCar = catchAsync(async (req, res) => {
  const result = await carServices.getSingleCarIntoDB(req.params.id);
  if (!result) {
    res.status(404).json({
      success: false,
      statusCode: 404,
      message: 'No Data Found',
      data: [],
    });
  }
  sendResponse(res, {
    data: result,
    success: true,
    statusCode: httpStatus.OK,
    message: 'A Car retrieved successfully!',
  });
});

const updateCar = catchAsync(async (req, res) => {
  const result = await carServices.updateCarFromDB(req.params.id, req.body);
  sendResponse(res, {
    data: result,
    success: true,
    statusCode: httpStatus.OK,
    message: 'Car updated successfully',
  });
});

const deleteCar = catchAsync(async (req, res) => {
  const result = await carServices.deleteCarIntoDB(req.params.id);
  sendResponse(res, {
    data: result,
    success: true,
    statusCode: httpStatus.OK,
    message: 'Car Deleted successfully',
  });
});

const returnCar = catchAsync(async (req, res) => {
  const result = await carServices.returnCarFromDB(req.body);
  sendResponse(res, {
    data: result,
    success: true,
    statusCode: httpStatus.OK,
    message: 'Car returned  successfully',
  });
});

export const carController = {
  createCar,
  getAllCar,
  getSingleCar,
  updateCar,
  deleteCar,
  returnCar,
};
