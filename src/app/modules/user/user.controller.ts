import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { password, admin } = req.body;
  const result = await UserService.createAdminIntoDB(password, admin, req.file);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "admin successfully created",
    data: result,
  });
});

const createPeople = catchAsync(async (req: Request, res: Response) => {
 
  const { password, people } = req.body;
  const result = await UserService.createPeopleIntoDB(
    password,
    people,
    req.file,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "user successfully created",
    data: result,
  });
});

export const UserController = {
  createAdmin,
  createPeople,
};
