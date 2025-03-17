import status from 'http-status';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { TUser } from '../User/user.interface';
import { User } from '../User/user.model';
import AppError from '../../app/errors/AppError';
import config from '../../app/config';


const registerUser = async (payload: TUser) => {

  const user = await User.isUserExistByEmail(payload?.email);

  if (user) throw new AppError(status.CONFLICT, 'User already exists!');

  
  const result = await User.create(payload);

  return result;
};

// Login user
const loginUser = async (payload: TLoginUser) => {
  
  const user = await User.isUserExistByEmail(payload?.email);

  if (!user) throw new AppError(status.NOT_FOUND, 'User not found!');

  const isActive = user?.status;
  if (isActive === 'inactive')
    throw new AppError(status.UNAUTHORIZED, 'User not active!');

  
  const isBlocked = user?.isBlocked;
  if (isBlocked) throw new AppError(status.FORBIDDEN, 'User is blocked!');


  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(status.FORBIDDEN, 'Password not match!');
  }

  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

 
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
  );

 
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};


const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  
  const user = await User.isUserExistByEmail(userData?.email);
  if (!user) {
    throw new AppError(status.NOT_FOUND, 'This user is not found !');
  }

  
  const isBlocked = user?.isBlocked;
  if (isBlocked) {
    throw new AppError(status.FORBIDDEN, 'This user is already blocked !');
  }

  const userStatus = user?.status;
  if (userStatus === 'inactive') {
    throw new AppError(status.FORBIDDEN, 'This user is not active !');
  }

  if (!(await User.isPasswordMatched(payload?.oldPassword, user?.password))) {
    throw new AppError(status.FORBIDDEN, 'Password does not match !');
  }

  const newHashedPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      id: userData?.userId,
      role: userData?.role,
    },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    },
    { new: true },
  );

  return null;
};


const refreshToken = async (token: string) => {
 
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { email, iat } = decoded;

  
  const user = await User.isUserExistByEmail(email);
  if (!user) {
    throw new AppError(status.NOT_FOUND, 'This user is not found !');
  }

  const isBlocked = user?.isBlocked;
  if (isBlocked) {
    throw new AppError(status.FORBIDDEN, 'This user is already deleted !');
  }

  
  const userStatus = user?.status;
  if (userStatus === 'inactive') {
    throw new AppError(status.FORBIDDEN, 'This user is not active !');
  }

 

  if (
    user.passwordChangedAt &&
    User.isJwtIssuedBeforePasswordChange(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(
      status.UNAUTHORIZED,
      "You're unauthorized to perform this action!",
    );
  }

  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
  );

  return {
    accessToken,
  };
};


const forgetPassword = async (email: string) => {
  
  const user = await User.isUserExistByEmail(email);
  if (!user) {
    throw new AppError(status.NOT_FOUND, 'This user is not found !');
  }

  const isBlocked = user?.isBlocked;
  if (isBlocked) {
    throw new AppError(status.FORBIDDEN, 'This user is already blocked !');
  }

  // checking if the user is active or not
  const userStatus = user?.status;
  if (userStatus === 'inactive') {
    throw new AppError(status.FORBIDDEN, 'This user is blocked !');
  }

  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };


  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
  );

  const resetLink = `${config.reset_password_ui_link}?email=${user.email}&token=${resetToken}`;

  sendEmail(user.email, resetLink);
};


const resetPassword = async (
  payload: { email: string; newPassword: string },
  token: string,
) => {
  
  const user = await User.isUserExistByEmail(payload?.email);
  if (!user) {
    throw new AppError(status.NOT_FOUND, 'This user is not found !');
  }

 
  const isBlocked = user?.isBlocked;
  if (isBlocked) {
    throw new AppError(status.FORBIDDEN, 'This user is already deleted !');
  }

 
  const userStatus = user?.status;
  if (userStatus === 'inactive') {
    throw new AppError(status.FORBIDDEN, 'This user is not active !');
  }

  
  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  if (decoded?.email !== payload?.email) {
    throw new AppError(
      status.FORBIDDEN,
      'You are forbidden to perform this action!',
    );
  }


  const newhashedPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      id: decoded?.userId,
      role: decoded?.role,
    },
    {
      password: newhashedPassword,
      passwordChangedAt: new Date(),
    },
    { new: true },
  );
};

const logoutUser = async (refreshToken: string) => {
  const result = await User.findOneAndUpdate(
    { refreshToken },
    { refreshToken: null },
    { new: true },
  );
  return result;
};

export const AuthService = {
  registerUser,
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
  logoutUser,
};
