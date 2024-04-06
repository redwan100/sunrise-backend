import bcrypt from "bcrypt";
import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../utils/AppError";
import { jwtHelpers } from "../../utils/jwtHelpers";
import sendEmailToResetPassLink from "../../utils/sendEmailToResetPassLink";
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
  decodedUser: any,
  payload: {
    oldPassword: string;
    newPassword: string;
  },
) => {
  const user = await User.findOne({ email: decodedUser.email });
  const status = user?.status;
  const isDeleted = user?.isDelete;

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "user not found");
  }

  if (status === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "user is blocked");
  }
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "user is deleted");
  }

  const isPasswordCorrect = await User.isPasswordMatch(
    payload.oldPassword,
    user?.password as string,
  );

  if (!isPasswordCorrect) {
    throw new AppError(httpStatus.FORBIDDEN, "incorrect password");
  }

  const newHashedPassword: string = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_round),
  );

  const updatedUser = await User.updateOne(
    { email: user.email },
    { password: newHashedPassword, needPasswordChange: false },
    { new: true },
  );

  user.password = "";

  return updatedUser;
};

const forgetPassword = async (payload: { email: string }) => {
  const user = await User.findOne({ email: payload.email });
  const status = user?.status;
  const isDeleted = user?.isDelete;

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "user not found");
  }

  if (status === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "user is blocked");
  }
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "user is deleted");
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = jwtHelpers.generateToken(
    jwtPayload,
    config.jwt.jwt_secret as string,
    "10m",
  );

  const generateUILink = `${config.client_side_url}?id=${user._id}&token=${accessToken}`;

  await sendEmailToResetPassLink(generateUILink, user?.email);
};

const resetPassword = async (
  token: string,
  payload: { email: string; newPassword: string },
) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "user not found");
  }

  const status = user?.status;
  const isDeleted = user?.isDelete;

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "user not found");
  }

  if (status === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "user is blocked");
  }
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "user is deleted");
  }

  const decoded = jwtHelpers.verifyToken(
    token,
    config.jwt.jwt_secret as string,
  );

  if (!decoded) {
    throw new AppError(httpStatus.UNAUTHORIZED, "unauthorized access");
  }

  if (decoded.email !== payload.email) {
    throw new AppError(httpStatus.NOT_FOUND, "user not found");
  }

  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_round),
  );

  await User.findOneAndUpdate(
    { email: user.email },
    { password: newHashedPassword },
  );
};

export const AuthService = {
  userLoginIntoDB,
  refreshToken,
  changePassword,
  forgetPassword,
  resetPassword,
};
