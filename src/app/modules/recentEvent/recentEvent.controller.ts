import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { RecentEventService } from "./recentEvent.service";

const createRecentEvent = catchAsync(async (req: Request, res: Response) => {
  const result = await RecentEventService.createRecentEvent(req.files);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "event created",
    data: result,
  });
});

const getAllRecentEvent = catchAsync(async (req: Request, res: Response) => {
  const result = await RecentEventService.getALLRecentEvent();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "all recent event retrieved",
    data: result,
  });
});
const deleteRecentEvent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await RecentEventService.deleteRecentEvent(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "recent event deleted successfully",
    data: result,
  });
});

export const RecentController = {
  createRecentEvent,
  getAllRecentEvent,
  deleteRecentEvent,
};
