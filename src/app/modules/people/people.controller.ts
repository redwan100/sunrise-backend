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

const getSinglePeople = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PeopleService.getSinglePeopleFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "successfully retrieved user",
    data: result,
  });
});

const updatePeople = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PeopleService.updateSinglePeopleIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "successfully update user",
    data: result,
  });
});

const deletePeople = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PeopleService.deletePeopleIntoDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "successfully deleted user",
    data: result,
  });
});

export const PeopleController = {
  getAllPeople,
  getSinglePeople,
  updatePeople,
  deletePeople,
};
