import { Request, Response } from "express";
import httpStatus from "http-status";
import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { TUser } from "../user/user.types";
import { AuthService } from "./auth.service";

const userLogin = catchAsync(async (req: Request, res: Response) => {
  const { accessToken, refreshToken } = await AuthService.userLoginIntoDB(
    req.body,
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: config.node_env === "development",
    secure: config.node_env === "production",
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "login successful",
    data: { accessToken },
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await AuthService.refreshToken(refreshToken);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "access token retrieved successfully",
    data: {
      accessToken: result,
    },
  });
});

const changePassword = catchAsync(
  async (req: Request & { user?: TUser }, res: Response) => {
    const { user, body } = req;

    const result = await AuthService.changePassword(user, body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: " successfully changed password",
      data: result,
    });
  },
);

const forgetPassword = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.forgetPassword(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " successfully send reset link ",
    data: result,
  });
});
const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const token = req?.headers?.authorization;
  const result = await AuthService.resetPassword(token as string, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " successfully reset password ",
    data: result,
  });
});

export const AuthController = {
  userLogin,
  refreshToken,
  changePassword,
  forgetPassword,
  resetPassword,
};
