import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";

const createAdmin = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await UserService.createAdminIntoDB(data, req.file);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "admin successfully created",
    data: result,
  });
});

export const UserController = {
  createAdmin,
};
