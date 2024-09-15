import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, required: true, enum: ['user', 'admin'] },
  },
  {
    timestamps: true,
  },
);

// Post-save hook to remove password from the returned object
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// Custom static method
userSchema.statics.isUserExist = async function (email: string) {
  return await this.findOne({ email });
};

// Remove password from JSON response
userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});

export const Users = model<TUser, UserModel>('Users', userSchema);
