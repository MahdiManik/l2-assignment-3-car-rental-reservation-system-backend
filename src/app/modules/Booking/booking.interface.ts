import { Types } from 'mongoose';

export type TBooking = {
  date: string;
  startTime: string;
  endTime: string | null;
  user: Types.ObjectId;
  carId: Types.ObjectId;
  totalCost: number;
};

export type TCarBooking = {
  carId: Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string | null;
};

export type TQuery = {
  car?: Types.ObjectId;
  date?: string;
};
