/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { Request } from 'express';
import { Types } from 'mongoose';
import { TCarBooking, TQuery } from './booking.interface';
import { Car } from '../Car/car.model';
import AppError from '../../errors/AppError';
import { Bookings } from './booking.model';
import { Users } from '../users/user.model';

const createABookingIntoDB = async (
  payload: TCarBooking,
  userEmail: string,
) => {
  const { carId, ...others } = payload;

  const isCarExist = await Car.findById(carId);
  if (!isCarExist || isCarExist.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car does not exist!');
  }

  if (isCarExist.status !== 'available') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Car is not available at this time!!',
    );
  }

  const bookingCars = await Bookings.findOne({
    car: new Types.ObjectId(carId),
  }).sort({ createdAt: -1 });

  if (bookingCars) {
    const carBookedEndTime = new Date(`1970-01-01T${bookingCars.endTime}:00Z`);
    const carBookRequestStartTime = new Date(
      `1970-01-01T${payload.startTime}:00Z`,
    );

    if (
      bookingCars.date === payload.date &&
      carBookedEndTime >= carBookRequestStartTime
    ) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Car is not available at this time!!',
      );
    }
  }

  const user = await Users.findOne({ email: userEmail });
  const findBooking = await Bookings.findOne({ date: payload.date }).sort({
    date: -1,
  });

  if (payload.date === findBooking?.date) {
    if (user?.email === userEmail) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'You already booked at this date!',
      );
    }
  }

  const result = await Bookings.create({
    car: carId,
    ...others,
    user: user,
  });

  return result;
};

const getAllBookingFromDB = async (req: Request) => {
  const queryObj: TQuery = {};

  if (req.query.carId) {
    queryObj['car'] = new Types.ObjectId(req.query.carId as string);
  }
  if (req.query.date) {
    queryObj.date = req.query.date as string;
  }

  const result = await Bookings.find(queryObj)
    .populate('user')
    .populate('car')
    .sort({ createdAt: 'desc' });

  return result;
};

const getBookingByEmailFromDB = async (email: string) => {
  const user = await Users.findOne({ email });
  const result = await Bookings.find({ user: new Types.ObjectId(user?._id) })
    .populate('user')
    .populate('car')
    .sort({ createdAt: 'desc' });
  return result;
};

export const bookingService = {
  createABookingIntoDB,
  getAllBookingFromDB,
  getBookingByEmailFromDB,
};
