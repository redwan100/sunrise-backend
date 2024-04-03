import { Request, Response } from "express";
import httpStatus from "http-status";
import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";

const userLogin = catchAsync(async (req: Request, res: Response) => {
  const { accessToken, refreshToken } = await AuthService.userLoginIntoDB(
    req.body,
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: config.node_env === "production",
    secure: config.node_env === "production",
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "login successful",
    data: accessToken,
  });
});

export const AuthController = {
  userLogin,
};
