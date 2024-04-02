import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { AuthService } from "./auth.service";

const userLogin = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.userLoginIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "login successful",
    data: null,
  });
});

export const AuthController = {
  userLogin,
};
