import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import User from "../modules/user/user.model";
import AppError from "../utils/AppError";
import catchAsync from "../utils/catchAsync";

const auth = (...requiredRole: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req?.headers?.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "unauthorized access");
    }

    const decoded = jwt.verify(
      token,
      config.jwt.jwt_secret as string,
    ) as JwtPayload;
    const { role, email } = decoded;

    if (!decoded) {
      throw new AppError(httpStatus.UNAUTHORIZED, "unauthorized access");
    }

    const isUserExists = await User.isUserExists(email);

    if (!isUserExists) {
      throw new AppError(httpStatus.NOT_FOUND, "user not found");
    }

    const { isDelete } = isUserExists;
    if (isDelete) {
      throw new AppError(httpStatus.FORBIDDEN, "user deleted");
    }

    const blocked = isUserExists.status;
    if (blocked === "blocked") {
      throw new AppError(httpStatus.FORBIDDEN, "user blocked");
    }

    if (requiredRole && !requiredRole.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "unauthorized access");
    }

    req.user = decoded;
    next();
  });
};

export default auth;
