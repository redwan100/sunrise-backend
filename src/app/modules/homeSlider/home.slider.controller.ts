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

const getAllSlider = catchAsync(async (req: Request, res: Response) => {
  const result = await HomeSliderService.getALLSlider();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "all sliders retrieved",
    data: result,
  });
});
const deleteSlider = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await HomeSliderService.deleteSlider(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "slider deleted successfully",
    data: result,
  });
});

export const HomeSliderController = {
  createSlider,
  getAllSlider,
  deleteSlider,
};
