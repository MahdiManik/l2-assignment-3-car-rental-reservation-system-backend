import { Schema, model } from 'mongoose';
import { TCarBooking } from './booking.interface';

const bookingSchema = new Schema<TCarBooking>(
  {
    carId: { type: Schema.Types.ObjectId, required: true, ref: 'Car' },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String },
  },
  {
    timestamps: true,
  },
);

export const Bookings = model<TCarBooking>('Bookings', bookingSchema);
