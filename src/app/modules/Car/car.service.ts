/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { TCar, TCarReturn } from './car.interface';
import { Car } from './car.model';
import AppError from '../../errors/AppError';
import { Bookings } from '../Booking/booking.model';

const createCarIntoDB = async (payload: TCar) => {
  const result = await Car.create(payload);
  return result;
};

const getAllCarIntoDB = async () => {
  const result = await Car.find();
  return result;
};

const getSingleCarIntoDB = async (id: string) => {
  const result = await Car.findById(id);
  return result;
};

const updateCarFromDB = async (id: string, payload: Partial<TCar>) => {
  const result = await Car.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteCarIntoDB = async (id: string) => {
  const result = await Car.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id);

const returnCarFromDB = async (payload: TCarReturn) => {
  console.log('Payload received:', payload);

  if (!isValidObjectId(payload.bookingId)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid booking ID format');
  }

  const isBookingExist = await Bookings.findById(payload.bookingId);
  if (!isBookingExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking not Exist!');
  }

  const bookingCar = await Car.findById(isBookingExist.car);
  if (!bookingCar) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car not Exist!');
  }

  const startTime = new Date(`1970-01-01T${isBookingExist.startTime}:00Z`);
  const endTime = new Date(`1970-01-01T${payload.endTime}:00Z`);

  if (endTime < startTime) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'This time is not valid!');
  }

  let diff = (endTime.getTime() - startTime.getTime()) / 1000;
  diff /= 60 * 60;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const carStatusChange = await Car.findByIdAndUpdate(
      bookingCar._id,
      { status: 'available' },
      {
        new: true,
        session: session,
      },
    );

    const result = await Bookings.findByIdAndUpdate(
      payload.bookingId,
      {
        endTime: payload.endTime,
        totalCost: diff * (bookingCar.pricePerHour as number),
      },
      {
        new: true,
        runValidators: true,
        session: session,
      },
    )
      .populate('user')
      .populate('car');
    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const carServices = {
  createCarIntoDB,
  getAllCarIntoDB,
  getSingleCarIntoDB,
  updateCarFromDB,
  deleteCarIntoDB,
  returnCarFromDB,
};
