import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { HomeSliderService } from "./home.slider.service";

const createSlider = catchAsync(async (req: Request, res: Response) => {
  const result = await HomeSliderService.createSlider(req.files);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "slider created",
    data: result,
  });
});

export const HomeSliderController = {
  createSlider,
};
