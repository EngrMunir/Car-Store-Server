/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { TRole, TStatus, USER_ROLE } from "./user.constant";


export type TUser = {
  name: string;
  email: string;
  password: string;
  photo?: string | null;
  role: TRole;
  status: TStatus;
  shippingAddress?: string;
  passwordChangedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  isBlocked?: boolean;
};

export interface UserModel extends Model<TUser>{
 
  isUserExistsByEmail(email:string):Promise<TUser>;

  isPasswordMatched(
    plainTextPassword:string,
    hashedPassword:string,
  ): Promise<boolean>;
};

export type TUserRole = keyof typeof USER_ROLE;