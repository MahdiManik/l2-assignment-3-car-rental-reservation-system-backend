import httpStatus from 'http-status';
import sendResponse from '../../config/utils/sendResponse';
import catchAsync from '../../config/utils/catchAsync';
import { bookingService } from './booking.service';

const createBooking = catchAsync(async (req, res) => {
  const { email } = req.user;
  const result = await bookingService.createABookingIntoDB(req.body, email);
  sendResponse(res, {
    data: result,
    success: true,
    statusCode: httpStatus.OK,
    message: 'Car booked successfully',
  });
});

const getAllBooking = catchAsync(async (req, res) => {
  const result = await bookingService.getAllBookingFromDB(req);
  sendResponse(res, {
    data: result,
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bookings retrieved successfully',
  });
});

const getBookingByEmail = catchAsync(async (req, res) => {
  const email = req?.user?.email;
  const result = await bookingService.getBookingByEmailFromDB(email);
  sendResponse(res, {
    data: result,
    success: true,
    statusCode: httpStatus.OK,
    message: 'My Bookings retrieved successfully',
  });
});

export const bookingController = {
  createBooking,
  getAllBooking,
  getBookingByEmail,
};
