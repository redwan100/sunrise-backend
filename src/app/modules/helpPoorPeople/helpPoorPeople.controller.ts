import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { HelpPoorPeopleService } from "./helpPoorPeople.service";

const createHelpPoorPeople = catchAsync(async (req: Request, res: Response) => {
  const result = await HelpPoorPeopleService.createHelpPoorPeople(req.files);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "event created",
    data: result,
  });
});

const getHelpPoorPeople = catchAsync(async (req: Request, res: Response) => {
  const result = await HelpPoorPeopleService.getAllHelpPoorPeople();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "all poor people retrieved",
    data: result,
  });
});
const deleteHelpPoorPeople = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await HelpPoorPeopleService.deleteHelpPoorPeople(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "poor people deleted successfully",
    data: result,
  });
});

export const HelpPoorPeopleController = {
  createHelpPoorPeople,
  getHelpPoorPeople,
  deleteHelpPoorPeople,
};
