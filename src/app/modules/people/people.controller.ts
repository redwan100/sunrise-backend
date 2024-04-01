import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PeopleService } from "./people.service";

const getAllPeople = catchAsync(async (req: Request, res: Response) => {
  const result = await PeopleService.getAllPeopleFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "successfully retrieved all users",
    data: result,
  });
});

export const PeopleController = {
  getAllPeople,
};
