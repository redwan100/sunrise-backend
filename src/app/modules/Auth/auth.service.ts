import bcrypt from "bcrypt";
import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../utils/AppError";
import { jwtHelpers } from "../../utils/jwtHelpers";
import User from "../user/user.model";

const userLoginIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
  const user = await User.isUserExists(payload.email);
  const isPasswordMatch = await User.isPasswordMatch(
    payload.password,
    user.password,
  );

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "user not found");
  }
  const { isDelete } = user;
  if (isDelete) {
    throw new AppError(httpStatus.FORBIDDEN, "user is deleted");
  }

  const { status } = user;
  if (status === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "user is blocked");
  }

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, "password not match");
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = jwtHelpers.generateToken(
    jwtPayload,
    config.jwt.jwt_secret as string,
    config.jwt.jwt_expires_in as string,
  );

  const refreshToken = jwtHelpers.generateToken(
    jwtPayload,
    config.jwt.jwt_refresh as string,
    config.jwt.refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  let decodedUser;
  try {
    decodedUser = jwtHelpers.verifyToken(
      token,
      config.jwt.jwt_refresh as string,
    );
  } catch (error: any) {
    throw new Error("you are not authorized");
  }

  const user = await User.findOne({ email: decodedUser?.email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "user not found");
  }
  const jwtPayload = {
    email: user?.email as string,
    role: user?.role as string,
  };

  const accessToken = jwtHelpers.generateToken(
    jwtPayload,
    config.jwt.jwt_secret as string,
    config.jwt.jwt_expires_in as string,
  );

  return accessToken;
};

const changePassword = async (
  token: string,
  payload: {
    oldPassword: string;
    newPassword: string;
  },
) => {
  let decodedUser;
  try {
    decodedUser = jwtHelpers.verifyToken(
      token,
      config.jwt.jwt_refresh as string,
    );
  } catch (error) {
    throw new AppError(httpStatus.UNAUTHORIZED, "unauthorized access");
  }

  const user = await User.findOne({ email: decodedUser.email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "user not found");
  }

  const isPasswordCorrect = await User.isPasswordMatch(
    payload.oldPassword,
    user?.password as string,
  );
  if (!isPasswordCorrect) {
    throw new AppError(httpStatus.FORBIDDEN, "password is incorrect");
  }

  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_round),
  );

  await User.updateOne(
    { email: user.email },
    { password: newHashedPassword },
    { new: true },
  );

  user.password = "";

  return user;
};

export const AuthService = {
  userLoginIntoDB,
  refreshToken,
  changePassword,
};
