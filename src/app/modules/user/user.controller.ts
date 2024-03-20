import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin } = req.body;
  console.log({ password });
  const result = await UserService.createAdminIntoDB(password, admin, req.file);

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
