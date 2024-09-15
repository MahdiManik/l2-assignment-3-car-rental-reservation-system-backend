import { Model } from 'mongoose';

export type TUser = {
  name: string;
  email: string;
  role: 'user' | 'admin';
  password: string;
  phone: string;
  address: string;
};

export type TLogin = {
  email: string;
  password: string;
};

export interface UserModel extends Model<TUser> {
  isUserExist(email: string): Promise<TUser | null>;
}
